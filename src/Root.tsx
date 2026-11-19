import {Composition} from "remotion";
import {Episode, type PreviewOptions} from "./Episode";
import type {CaptionBeat, EpisodeManifest, EpisodeManifestV2} from "./manifest-types";
import kemacetan from "../episodes/001-kemacetan-terakhir/manifest.json";
import kemacetanCaptions from "../episodes/001-kemacetan-terakhir/captions.json";
import recut from "../episodes/001-kemacetan-terakhir/recut-v2/manifest.json";
import recutCaptions from "../episodes/001-kemacetan-terakhir/recut-v2/captions.json";
import alternate from "../episodes/001-kemacetan-terakhir/recut-v2-alternate/manifest.json";
import alternateCaptions from "../episodes/001-kemacetan-terakhir/recut-v2-alternate/captions.json";
import attempt05 from "../episodes/001-kemacetan-terakhir/attempt-05/manifest.json";
import attempt05Captions from "../episodes/001-kemacetan-terakhir/attempt-05/captions.json";

const KemacetanTerakhir = (options: PreviewOptions) => <Episode
  manifest={kemacetan satisfies EpisodeManifest}
  captions={kemacetanCaptions}
  {...options}
/>;
const KemacetanRecut = (options: PreviewOptions) => <Episode
  manifest={recut as EpisodeManifestV2}
  captions={recutCaptions as CaptionBeat[]}
  {...options}
/>;
const KemacetanAlternate = (options: PreviewOptions) => <Episode manifest={alternate as EpisodeManifestV2} captions={alternateCaptions as CaptionBeat[]} {...options} />;
const KemacetanAttempt05 = (options: PreviewOptions) => <Episode manifest={attempt05 as EpisodeManifestV2} captions={attempt05Captions as CaptionBeat[]} {...options} />;

export const Root = () => <><Composition
  id="KemacetanTerakhirMotionComic"
  component={KemacetanTerakhir}
  width={1080}
  height={1920}
  fps={kemacetan.fps}
  durationInFrames={kemacetan.duration}
  defaultProps={{showCaptions: true, soundOn: true}}
/>
<Composition id="KemacetanTerakhirMotionComicRecut" component={KemacetanRecut} width={1080} height={1920} fps={30} durationInFrames={2120} defaultProps={{showCaptions: true, soundOn: true}} />
<Composition id="KemacetanTerakhirMotionComicAlternate" component={KemacetanAlternate} width={1080} height={1920} fps={30} durationInFrames={2120} defaultProps={{showCaptions: true, soundOn: true}} />
<Composition id="KemacetanTerakhirMotionComicAttempt05" component={KemacetanAttempt05} width={1080} height={1920} fps={30} durationInFrames={2136} defaultProps={{
  showCaptions: true,
  soundOn: true,
  narrationOn: true,
  effectsOn: true,
}} />
</>;
