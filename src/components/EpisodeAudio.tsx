import {Audio} from "@remotion/media";
import {interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import type {Action, Bed, EpisodeManifest, EpisodeManifestV2} from "../manifest-types";

function Ambience({bed}: {bed: Bed}) {
  const frame = useCurrentFrame();
  const attack = bed.fadeIn ? frame / bed.fadeIn : 1;
  const release = bed.fadeOut ? (bed.duration - frame - 1) / bed.fadeOut : 1;
  const envelope = bed.envelope && bed.envelope.length > 1 ? interpolate(frame, bed.envelope.map(p => p.frame), bed.envelope.map(p => p.gain), {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 1;
  const volume = bed.gain * envelope * Math.max(0, Math.min(1, attack, release));
  return <Audio src={staticFile(bed.asset)} volume={volume} loop={bed.loop} />;
}

function Effect({cue, busGain}: {cue: Action; busGain: number}) {
  const frame = useCurrentFrame();
  const attack = cue.fadeIn ? frame / cue.fadeIn : 1;
  const release = cue.fadeOut ? (cue.duration - frame - 1) / cue.fadeOut : 1;
  const volume = cue.gain * busGain * Math.max(0, Math.min(1, attack, release));
  return <Audio src={staticFile(cue.asset)} trimBefore={cue.trimBefore} volume={volume} />;
}

export function EpisodeAudio({manifest}: {manifest: EpisodeManifest | EpisodeManifestV2}) {
  return <>
    {manifest.beds.map((bed) => <Sequence key={bed.name} name={bed.name} from={bed.at} durationInFrames={bed.duration} layout="none">
      <Ambience bed={bed} />
    </Sequence>)}
    {manifest.scenes.flatMap((scene) => (scene.cues ?? []).map((cue) => <Sequence
      key={`${scene.id}/${cue.name}`}
      name={cue.name}
      from={scene.at + cue.at}
      durationInFrames={cue.duration}
      layout="none"
    ><Effect cue={cue} busGain={manifest.effectBusGain ?? 1} /></Sequence>))}
  </>;
}
