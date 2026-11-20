import {AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import type {RasterLayer, Scene, SceneV2} from "../manifest-types";
import {TimestampBadge} from "./hud/TimestampBadge";
import {TacticalCallout} from "./hud/TacticalCallout";
import {SupplyChecklist} from "./hud/SupplyChecklist";
import {BlueprintOverlay, RadarDiagram} from "./hud/BlueprintOverlay";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const smooth = Easing.inOut(Easing.quad);

function HudExit({duration, children}: {duration: number; children: React.ReactNode}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [Math.max(0, duration - 5), duration], [1, 0], clamp);
  return <AbsoluteFill style={{opacity, pointerEvents: "none"}}>{children}</AbsoluteFill>;
}

function CharacterLayer({layer, progress, legacy}: {layer: RasterLayer; progress: number; legacy: boolean}) {
  const frame = useCurrentFrame();
  const {asset, x, y, width, enter, drift} = layer;
  const entrance = enter
    ? interpolate(frame, [enter.at, enter.at + enter.duration], [1, 0], {...clamp, easing: smooth})
    : 0;

  return <Img
    src={staticFile(asset)}
    style={{
      position: "absolute",
      left: `${x + (enter?.x ?? 0) * entrance + (drift?.x ?? 0) * progress}%`,
      top: `${y + (enter?.y ?? 0) * entrance + (drift?.y ?? 0) * progress}%`,
      width: `${width}%`,
      height: "auto",
      maskImage: legacy ? "linear-gradient(#000 78%, transparent)" : undefined,
    }}
  />;
}

export function RasterScene({scene, duration}: {scene: Scene | SceneV2; duration: number}) {
  const frame = useCurrentFrame();
  const {from, to} = scene.camera;
  const {hit, blackout} = scene;
  const legacy = !("characters" in scene);
  const label = legacy ? (scene as Scene).label : undefined;
  const layers = legacy ? (scene as Scene).layers : (scene as SceneV2).characters.mode === "masked" ? ((scene as SceneV2).characters as Extract<SceneV2["characters"], {mode: "masked"}>).layers : [];
  const foreground = !legacy && (scene as SceneV2).characters.mode === "masked" ? ((scene as SceneV2).characters as Extract<SceneV2["characters"], {mode: "masked"}>).foreground : undefined;
  const preset = legacy ? undefined : (scene as SceneV2).cameraPreset;
  const progress = Math.min(Math.max(frame / Math.max(duration - 1, 1), 0), 1);
  const shake = hit
    ? Math.sin((frame - hit.at) * 1.36) * interpolate(frame, [hit.at, hit.at + 1, hit.at + hit.duration], [0, hit.strength, 0], clamp)
    : 0;
  const darkness = blackout
    ? interpolate(frame, [blackout.at, blackout.at + blackout.duration], [0, blackout.opacity], clamp)
    : 0;
  const punch = preset === "punch-in" ? interpolate(frame, [0, 16], [1, 1.12], clamp) : preset === "slow-push" ? interpolate(progress, [0, 1], [1, 1.035]) : 1;
  const presetShake = preset === "impact-shake" ? Math.sin(frame * 1.7) * interpolate(frame, [0, 1, 14], [0, 15, 0], clamp) : 0;
  const drift = preset === "dread-drift" ? Math.sin(frame / 45) * 8 : 0;

  return <AbsoluteFill data-scene={scene.id} style={{overflow: "hidden"}}>
    <AbsoluteFill style={{
      scale: String(interpolate(progress, [0, 1], [from.scale, to.scale], {easing: smooth}) * punch),
      translate: `${interpolate(progress, [0, 1], [from.x, to.x]) + shake + presetShake + drift}px ${interpolate(progress, [0, 1], [from.y, to.y])}px`,
    }}>
      <Img src={staticFile(scene.plate)} style={{width: "100%", height: "100%", objectFit: "cover"}} />
      {layers?.map((layer) => <CharacterLayer key={layer.asset} layer={layer} progress={progress} legacy={legacy} />)}
      {foreground && <Img src={staticFile(foreground)} style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover"}} />}
      {label && frame >= label.at && <span style={{
        position: "absolute", left: `${label.x}%`, top: `${label.y}%`, translate: "-50% -50%",
        fontFamily: "monospace", fontSize: 58, fontWeight: 700, letterSpacing: 3,
        color: "#ffd99f", textShadow: "0 2px 15px #000, 0 0 20px #322215",
      }}>{label.text}</span>}
    </AbsoluteFill>
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 48% 41%, transparent 36%, rgba(4, 8, 17, .65) 100%), linear-gradient(transparent 58%, rgba(4, 8, 17, .78) 100%)",
    }} />
    {!legacy && <svg style={{position: "absolute", width: "100%", height: "100%", opacity: .03, pointerEvents: "none"}}><filter id={`film-grain-${scene.id}`}><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed={frame % 8} /></filter><rect width="100%" height="100%" filter={`url(#film-grain-${scene.id})`} /></svg>}
    {!legacy && (scene as SceneV2).hud.map((hud) => <Sequence key={hud.id} name={hud.id} from={hud.at} durationInFrames={hud.duration}>
      <HudExit duration={hud.duration}>{hud.type === "timestampBadge" && <TimestampBadge text={hud.text} revealFrames={hud.revealFrames}/>}
      {hud.type === "tacticalCallout" && <TacticalCallout text={hud.text} box={hud.box} guide={hud.guide} revealFrames={hud.revealFrames}/>}
      {hud.type === "supplyChecklist" && <SupplyChecklist box={hud.box} items={hud.items} revealFrames={hud.revealFrames}/>}
      {hud.type === "blueprintOverlay" && <BlueprintOverlay box={hud.box} paths={hud.paths} revealFrames={hud.revealFrames}/>}
      {hud.type === "radarDiagram" && <RadarDiagram box={hud.box} paths={hud.paths} revealFrames={hud.revealFrames}/>}</HudExit>
    </Sequence>)}
    <AbsoluteFill style={{backgroundColor: "#040811", opacity: darkness}} />
  </AbsoluteFill>;
}
