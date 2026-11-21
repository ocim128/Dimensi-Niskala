// Run `npx remotion compositions episodes/001-kemacetan-terakhir/attempt-06/metadata-probe.tsx`.
// The deliberately stale one-frame manifest duration must not cap either source.
import {Composition, registerRoot} from "remotion";
import {audioFirstMetadata} from "../../../src/Root";
import type {PreviewOptions} from "../../../src/Episode";
import type {EpisodeManifestV2} from "../../../src/manifest-types";
import original from "./manifest.json";

const base = original as EpisodeManifestV2;
const short = {...base, duration: 1, narration: {...base.narration, asset: "sfx/glass-knock.wav", at: 0, duration: 1}};
const long = {...base, duration: 1, narration: {...base.narration, asset: "assets/001-kemacetan-terakhir/attempt-06/episode-001-cloud-investigator.mp3", at: 30, duration: 1}};
const Empty = (_props: PreviewOptions) => null;
const defaults = {showCaptions: false, soundOn: false};
registerRoot(() => <>
  <Composition id="DurationProbeShort" component={Empty} width={1080} height={1920} fps={30} durationInFrames={1} defaultProps={defaults} calculateMetadata={audioFirstMetadata(short)} />
  <Composition id="DurationProbeLongWithOffset" component={Empty} width={1080} height={1920} fps={30} durationInFrames={1} defaultProps={defaults} calculateMetadata={audioFirstMetadata(long)} />
</>);
