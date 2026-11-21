import {Audio} from "@remotion/media";
import {AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, Track, useCurrentFrame, useVideoConfig} from "remotion";
import {Captions} from "./components/Captions";
import {EpisodeAudio} from "./components/EpisodeAudio";
import {RasterScene} from "./components/RasterScene";
import type {CaptionBeat, EpisodeCaption, EpisodeManifest, EpisodeManifestV2} from "./manifest-types";

export type PreviewOptions = {
  showCaptions: boolean;
  soundOn: boolean;
  narrationOn?: boolean;
  effectsOn?: boolean;
  narrationDurationInFrames?: number;
};

type Props = PreviewOptions & {
  manifest: EpisodeManifest | EpisodeManifestV2;
  captions: EpisodeCaption[] | CaptionBeat[];
};

function Narration({narration}: {narration: EpisodeManifest["narration"]}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const gain = (narration.ducks ?? []).reduce((volume, duck) => {
    const fade = Math.min(duck.fadeSec ?? .08, (duck.endSec - duck.startSec) / 2);
    if (fade <= 0) return volume;
    const multiplier = Math.pow(10, duck.gainDb / 20);
    return volume * interpolate(frame / fps, [duck.startSec, duck.startSec + fade, duck.endSec - fade, duck.endSec], [1, multiplier, multiplier, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  }, narration.gain);
  return <Audio src={staticFile(narration.asset)} volume={gain} />;
}

function OpeningTitle({title, duration}: {title: string; duration: number}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fade = Math.min(Math.round(.35 * fps), duration);
  const opacity = interpolate(frame, [Math.max(0, duration - fade), duration], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const entry = interpolate(frame, [0, Math.max(1, Math.round(.14 * fps))], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateRight: "clamp"});
  return <div style={{position: "absolute", top: "14.5%", left: "5%", width: "90%", textAlign: "center", color: "#fff9ee", fontFamily: "TheBoldFont, sans-serif", fontSize: 86, fontWeight: 900, lineHeight: 1.05, WebkitTextStroke: "5px #080c10", paintOrder: "stroke fill", textShadow: "0 5px 6px #000, 0 0 20px #000", background: "radial-gradient(ellipse, rgba(0,0,0,.65), transparent 72%)", opacity: opacity * (.5 + .5 * entry), transform: `translateY(${(1-entry)*-12}px)`, pointerEvents: "none"}}>{title.toUpperCase()}</div>;
}

export function Episode({manifest, captions, showCaptions, soundOn, narrationOn = true, effectsOn = true, narrationDurationInFrames}: Props) {
  const {narration, scenes} = manifest;
  const {durationInFrames, fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const ramp = manifest.tensionRamp;
  const jolt = manifest.finalJolt;
  const p = ramp ? interpolate(frame / fps, [ramp.startSec, ramp.endSec], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 0;
  const joltFrame = jolt ? frame - Math.round(jolt.triggerSec * fps) : -1;
  const activeJolt = !!jolt && joltFrame >= 0 && joltFrame < Math.round(jolt.durationSec * fps);
  const episode03Flash = manifest.id === "Arc01Episode03" && activeJolt && !!jolt && joltFrame < jolt.flashFrames;
  const blackout = !!jolt && joltFrame >= Math.round(jolt.durationSec * fps);
  const decay = activeJolt && jolt ? Math.max(0, 1 - joltFrame / Math.max(1, jolt.shakeDecayMs * fps / 1000)) : 0;
  const snap = activeJolt && jolt ? interpolate(joltFrame, [0, Math.max(1, Math.round(.14 * fps))], [jolt.zoomFrom, jolt.zoomTo], {extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)}) : 1;
  const x = activeJolt && jolt ? Math.sin(joltFrame * 2.4 + 1.1) * jolt.shakePx * decay : Math.sin(frame * 1.9) * p;
  const y = activeJolt && jolt ? Math.sin(joltFrame * 3.1 + .7) * jolt.shakePx * decay : Math.cos(frame * 1.7) * p;
  const activeIndex = scenes.filter(scene => scene.at <= frame).length - 1;
  const activeScene = scenes[activeIndex];
  const activeDuration = activeScene ? Math.min(scenes[activeIndex + 1]?.at ?? durationInFrames, durationInFrames) - activeScene.at : 0;
  const visibleScenes = scenes.filter(scene => scene.at < durationInFrames);
  const title = typeof manifest.openingTitle === "string" ? {text: manifest.openingTitle} : manifest.openingTitle;
  const titleStart = Math.max(0, Math.round((title?.startSec ?? 0) * fps));
  const titleEnd = Math.min(durationInFrames, Math.round((title?.endSec ?? 1.8) * fps));
  return <AbsoluteFill style={{backgroundColor: "#080c16"}}>
    <AbsoluteFill style={{overflow: "hidden"}}><AbsoluteFill style={{transform: `translate(${x}px, ${y}px) scale(${(1 + p * (ramp?.extraScale ?? 0)) * snap})`}}><Track name="Gambar">
      {visibleScenes.map((scene, index) => {
        const duration = Math.min(visibleScenes[index + 1]?.at ?? durationInFrames, durationInFrames) - scene.at;
        return <Sequence key={scene.id} name={scene.name} from={scene.at} durationInFrames={duration} premountFor={12}>
          <AbsoluteFill style={{filter: scene.brightness === undefined ? undefined : `brightness(${scene.brightness})`}}><RasterScene scene={scene} duration={duration} /></AbsoluteFill>
        </Sequence>;
      })}
    </Track>{activeJolt && jolt?.joltImageSrc && <Img src={staticFile(jolt.joltImageSrc)} style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", filter: episode03Flash ? "brightness(1.5) contrast(1.55)" : undefined}} />}
    {activeJolt && jolt && decay > 0 && activeScene && <AbsoluteFill style={{transform: `translateX(${jolt.rgbSplitPx * decay}px)`, opacity: .28 * decay, mixBlendMode: "screen", filter: "sepia(1) saturate(8) hue-rotate(315deg)", pointerEvents: "none"}}>{jolt.joltImageSrc ? <Img src={staticFile(jolt.joltImageSrc)} style={{width: "100%", height: "100%", objectFit: "cover"}} /> : <Sequence from={activeScene.at} durationInFrames={activeDuration}><AbsoluteFill style={{filter: activeScene.brightness === undefined ? undefined : `brightness(${activeScene.brightness})`}}><RasterScene scene={activeScene} duration={activeDuration} /></AbsoluteFill></Sequence>}</AbsoluteFill>}</AbsoluteFill>
    {p > 0 && <AbsoluteFill style={{background: `radial-gradient(ellipse, transparent 38%, rgba(0,0,0,${p * (ramp?.vignetteStrength ?? 0)}) 100%)`, pointerEvents: "none"}} />}
    {activeJolt && jolt && joltFrame < jolt.flashFrames && <AbsoluteFill style={{backgroundColor: "white", opacity: episode03Flash ? .25 : .65, mixBlendMode: "screen", pointerEvents: "none"}} />}</AbsoluteFill>
    {title && titleEnd > titleStart && <Sequence name="Opening title" from={titleStart} durationInFrames={titleEnd - titleStart}><OpeningTitle title={title.text} duration={titleEnd - titleStart} /></Sequence>}
    {soundOn && effectsOn && <EpisodeAudio manifest={manifest} />}
    {(soundOn || showCaptions) && <Sequence name="Narasi dan takarir" from={narration.at} durationInFrames={narrationDurationInFrames ?? narration.duration}>
      {soundOn && narrationOn && <Narration narration={narration} />}
      {showCaptions && <Captions captions={captions} />}
    </Sequence>}
    {blackout && <AbsoluteFill style={{backgroundColor: "black", pointerEvents: "none"}} />}
  </AbsoluteFill>;
}
