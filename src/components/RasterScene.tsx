import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import type {RasterLayer, Scene} from "../manifest-types";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const smooth = Easing.inOut(Easing.quad);

function Foreground({layer, progress}: {layer: RasterLayer; progress: number}) {
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
      maskImage: "linear-gradient(#000 78%, transparent)",
    }}
  />;
}

export function RasterScene({scene, duration}: {scene: Scene; duration: number}) {
  const frame = useCurrentFrame();
  const {from, to} = scene.camera;
  const {hit, blackout, label} = scene;
  const progress = Math.min(Math.max(frame / Math.max(duration - 1, 1), 0), 1);
  const shake = hit
    ? Math.sin((frame - hit.at) * 1.36) * interpolate(frame, [hit.at, hit.at + 1, hit.at + hit.duration], [0, hit.strength, 0], clamp)
    : 0;
  const darkness = blackout
    ? interpolate(frame, [blackout.at, blackout.at + blackout.duration], [0, blackout.opacity], clamp)
    : 0;

  return <AbsoluteFill data-scene={scene.id} style={{overflow: "hidden"}}>
    <AbsoluteFill style={{
      scale: String(interpolate(progress, [0, 1], [from.scale, to.scale], {easing: smooth})),
      translate: `${interpolate(progress, [0, 1], [from.x, to.x]) + shake}px ${interpolate(progress, [0, 1], [from.y, to.y])}px`,
    }}>
      <Img src={staticFile(scene.plate)} style={{width: "100%", height: "100%", objectFit: "cover"}} />
      {scene.layers?.map((layer) => <Foreground key={layer.asset} layer={layer} progress={progress} />)}
      {label && frame >= label.at && <span style={{
        position: "absolute", left: `${label.x}%`, top: `${label.y}%`, translate: "-50% -50%",
        fontFamily: "monospace", fontSize: 58, fontWeight: 700, letterSpacing: 3,
        color: "#ffd99f", textShadow: "0 2px 15px #000, 0 0 20px #322215",
      }}>{label.text}</span>}
    </AbsoluteFill>
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 48% 41%, transparent 36%, rgba(4, 8, 17, .65) 100%), linear-gradient(transparent 58%, rgba(4, 8, 17, .78) 100%)",
    }} />
    <AbsoluteFill style={{backgroundColor: "#040811", opacity: darkness}} />
  </AbsoluteFill>;
}
