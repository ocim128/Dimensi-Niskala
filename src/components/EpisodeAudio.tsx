import {Audio} from "@remotion/media";
import {Sequence, staticFile, useCurrentFrame} from "remotion";
import type {Bed, EpisodeManifest, EpisodeManifestV2} from "../manifest-types";

function Ambience({bed}: {bed: Bed}) {
  const frame = useCurrentFrame();
  const attack = bed.fadeIn ? frame / bed.fadeIn : 1;
  const release = bed.fadeOut ? (bed.duration - frame - 1) / bed.fadeOut : 1;
  const volume = bed.gain * Math.max(0, Math.min(1, attack, release));
  return <Audio src={staticFile(bed.asset)} volume={volume} loop={bed.loop} />;
}

export function EpisodeAudio({manifest}: {manifest: EpisodeManifest | EpisodeManifestV2}) {
  return <>
    {manifest.beds.map((bed) => <Sequence key={bed.name} name={bed.name} from={bed.at} durationInFrames={bed.duration} layout="none">
      <Ambience bed={bed} />
    </Sequence>)}
    {manifest.scenes.flatMap((scene) => (scene.cues ?? []).map((cue) => <Audio
      key={`${scene.id}/${cue.name}`}
      name={cue.name}
      src={staticFile(cue.asset)}
      from={scene.at + cue.at}
      durationInFrames={cue.duration}
      volume={cue.gain}
    />))}
  </>;
}
