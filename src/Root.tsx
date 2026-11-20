import {Composition, staticFile, type CalculateMetadataFunction} from "remotion";
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
import attempt06 from "../episodes/001-kemacetan-terakhir/attempt-06/manifest.json";
import attempt06Captions from "../episodes/001-kemacetan-terakhir/attempt-06/captions.json";
import episode02 from "../episodes/002-kabur-dari-mobil/manifest.json";
import episode02Captions from "../episodes/002-kabur-dari-mobil/captions.json";

// Use for new episode registrations: the source file, not a fixed cap or the
// editable manifest's potentially stale narration.duration, sets the runtime.
export const audioFirstMetadata = (manifest: EpisodeManifest | EpisodeManifestV2): CalculateMetadataFunction<PreviewOptions> => async ({props, abortSignal}) => {
  const seconds = await new Promise<number>((resolve, reject) => {
    const audio = document.createElement("audio");
    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", onMetadata);
      audio.removeEventListener("error", onError);
      abortSignal.removeEventListener("abort", onAbort);
      audio.removeAttribute("src");
      audio.load();
    };
    const onMetadata = () => {const duration = audio.duration; cleanup(); if (Number.isFinite(duration) && duration > 0) resolve(duration); else reject(new Error("Invalid narration duration"));};
    const onError = () => {cleanup(); reject(new Error(`Cannot read narration metadata: ${manifest.narration.asset}`));};
    const onAbort = () => {cleanup(); reject(new DOMException("Metadata request aborted", "AbortError"));};
    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", onMetadata);
    audio.addEventListener("error", onError);
    abortSignal.addEventListener("abort", onAbort, {once: true});
    if (abortSignal.aborted) {onAbort(); return;}
    audio.src = staticFile(manifest.narration.asset);
    audio.load();
  });
  return {
    durationInFrames: manifest.narration.at + Math.ceil((seconds + 1.2) * manifest.fps),
    props: {...props, narrationDurationInFrames: Math.ceil(seconds * manifest.fps)},
  };
};

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
const KemacetanAttempt06 = (options: PreviewOptions) => <Episode manifest={attempt06 as EpisodeManifestV2} captions={attempt06Captions as CaptionBeat[]} {...options} />;
const Arc01Episode02 = (options: PreviewOptions) => <Episode manifest={episode02 as EpisodeManifestV2} captions={episode02Captions as CaptionBeat[]} {...options} />;

export const Root = () => <><Composition
  id="KemacetanTerakhirMotionComic"
  component={KemacetanTerakhir}
  width={1080}
  height={1920}
  fps={kemacetan.fps}
  durationInFrames={kemacetan.duration}
  defaultProps={{showCaptions: true, soundOn: true}}
/>
<Composition id="KemacetanTerakhirMotionComicRecut" component={KemacetanRecut} width={1080} height={1920} fps={recut.fps} durationInFrames={recut.duration} defaultProps={{showCaptions: true, soundOn: true}} />
<Composition id="KemacetanTerakhirMotionComicAlternate" component={KemacetanAlternate} width={1080} height={1920} fps={alternate.fps} durationInFrames={alternate.duration} defaultProps={{showCaptions: true, soundOn: true}} />
<Composition id="KemacetanTerakhirMotionComicAttempt05" component={KemacetanAttempt05} width={1080} height={1920} fps={attempt05.fps} durationInFrames={attempt05.duration} defaultProps={{
  showCaptions: true,
  soundOn: true,
  narrationOn: true,
  effectsOn: true,
}} />
<Composition id="KemacetanTerakhirMotionComicAttempt06" component={KemacetanAttempt06} width={1080} height={1920} fps={attempt06.fps} durationInFrames={attempt06.duration} calculateMetadata={audioFirstMetadata(attempt06 as EpisodeManifestV2)} defaultProps={{
  showCaptions: true,
  soundOn: true,
  narrationOn: true,
  effectsOn: true,
}} />
<Composition id="Arc01Episode02" component={Arc01Episode02} width={1080} height={1920} fps={episode02.fps} durationInFrames={episode02.duration} calculateMetadata={audioFirstMetadata(episode02 as EpisodeManifestV2)} defaultProps={{showCaptions: true, soundOn: true, narrationOn: true, effectsOn: true}} />
</>;
