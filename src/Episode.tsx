import {Audio} from "@remotion/media";
import {AbsoluteFill, Easing, interpolate, Sequence, staticFile, Track, useCurrentFrame, useVideoConfig} from "remotion";
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
  const visibleScenes = scenes.filter(scene => scene.at < durationInFrames);
  const title = typeof manifest.openingTitle === "string" ? {text: manifest.openingTitle} : manifest.openingTitle;
  const titleStart = Math.max(0, Math.round((title?.startSec ?? 0) * fps));
  const titleEnd = Math.min(durationInFrames, Math.round((title?.endSec ?? 1.8) * fps));
  return <AbsoluteFill style={{backgroundColor: "#080c16"}}>
    <Track name="Gambar">
      {visibleScenes.map((scene, index) => {
        const duration = Math.min(visibleScenes[index + 1]?.at ?? durationInFrames, durationInFrames) - scene.at;
        return <Sequence key={scene.id} name={scene.name} from={scene.at} durationInFrames={duration} premountFor={12}>
          <AbsoluteFill style={{filter: scene.brightness === undefined ? undefined : `brightness(${scene.brightness})`}}><RasterScene scene={scene} duration={duration} /></AbsoluteFill>
        </Sequence>;
      })}
    </Track>
    {title && titleEnd > titleStart && <Sequence name="Opening title" from={titleStart} durationInFrames={titleEnd - titleStart}><OpeningTitle title={title.text} duration={titleEnd - titleStart} /></Sequence>}
    {soundOn && effectsOn && <EpisodeAudio manifest={manifest} />}
    {(soundOn || showCaptions) && <Sequence name="Narasi dan takarir" from={narration.at} durationInFrames={narrationDurationInFrames ?? narration.duration}>
      {soundOn && narrationOn && <Narration narration={narration} />}
      {showCaptions && <Captions captions={captions} />}
    </Sequence>}
  </AbsoluteFill>;
}
