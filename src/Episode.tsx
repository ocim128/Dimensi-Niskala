import {Audio} from "@remotion/media";
import {AbsoluteFill, Sequence, staticFile, Track} from "remotion";
import {Captions} from "./components/Captions";
import {EpisodeAudio} from "./components/EpisodeAudio";
import {RasterScene} from "./components/RasterScene";
import type {CaptionBeat, EpisodeCaption, EpisodeManifest, EpisodeManifestV2} from "./manifest-types";

export type PreviewOptions = {
  showCaptions: boolean;
  soundOn: boolean;
  narrationOn?: boolean;
  effectsOn?: boolean;
};

type Props = PreviewOptions & {
  manifest: EpisodeManifest | EpisodeManifestV2;
  captions: EpisodeCaption[] | CaptionBeat[];
};

export function Episode({manifest, captions, showCaptions, soundOn, narrationOn = true, effectsOn = true}: Props) {
  const {narration, scenes} = manifest;
  return <AbsoluteFill style={{backgroundColor: "#080c16"}}>
    <Track name="Gambar">
      {scenes.map((scene, index) => {
        const duration = (scenes[index + 1]?.at ?? manifest.duration) - scene.at;
        return <Sequence key={scene.id} name={scene.name} from={scene.at} durationInFrames={duration} premountFor={12}>
          <RasterScene scene={scene} duration={duration} />
        </Sequence>;
      })}
    </Track>
    {soundOn && effectsOn && <EpisodeAudio manifest={manifest} />}
    {(soundOn || showCaptions) && <Sequence name="Narasi dan takarir" from={narration.at} durationInFrames={narration.duration}>
      {soundOn && narrationOn && <Audio src={staticFile(narration.asset)} volume={narration.gain} />}
      {showCaptions && <Captions captions={captions} />}
    </Sequence>}
  </AbsoluteFill>;
}
