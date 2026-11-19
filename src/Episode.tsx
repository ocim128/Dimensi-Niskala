import {Audio} from "@remotion/media";
import {AbsoluteFill, Sequence, staticFile, Track} from "remotion";
import {Captions} from "./components/Captions";
import {EpisodeAudio} from "./components/EpisodeAudio";
import {RasterScene} from "./components/RasterScene";
import type {EpisodeCaption, EpisodeManifest} from "./manifest-types";

export type PreviewOptions = {
  showCaptions: boolean;
  soundOn: boolean;
};

type Props = PreviewOptions & {
  manifest: EpisodeManifest;
  captions: EpisodeCaption[];
};

export function Episode({manifest, captions, showCaptions, soundOn}: Props) {
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
    {soundOn && <EpisodeAudio manifest={manifest} />}
    {(soundOn || showCaptions) && <Sequence name="Narasi dan takarir" from={narration.at} durationInFrames={narration.duration}>
      {soundOn && <Audio src={staticFile(narration.asset)} volume={narration.gain} />}
      {showCaptions && <Captions captions={captions} />}
    </Sequence>}
  </AbsoluteFill>;
}
