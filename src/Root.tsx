import {Composition} from "remotion";
import {Episode, type PreviewOptions} from "./Episode";
import type {EpisodeManifest} from "./manifest-types";
import kemacetan from "../episodes/001-kemacetan-terakhir/manifest.json";
import kemacetanCaptions from "../episodes/001-kemacetan-terakhir/captions.json";

const KemacetanTerakhir = (options: PreviewOptions) => <Episode
  manifest={kemacetan satisfies EpisodeManifest}
  captions={kemacetanCaptions}
  {...options}
/>;

export const Root = () => <Composition
  id="KemacetanTerakhirMotionComic"
  component={KemacetanTerakhir}
  width={1080}
  height={1920}
  fps={kemacetan.fps}
  durationInFrames={kemacetan.duration}
  defaultProps={{showCaptions: true, soundOn: true}}
/>;
