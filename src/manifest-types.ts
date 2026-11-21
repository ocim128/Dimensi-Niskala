import type {Caption} from "@remotion/captions";

export type EpisodeCaption = Caption & {emphasis?: string};
export type CaptionColor = "white" | "yellow" | "red" | "default" | "highlight" | "danger";
export type CaptionBeat = Omit<Caption, "text"> & {words: {text: string; color?: CaptionColor; startMs?: number; endMs?: number}[]};

type Camera = {scale: number; x: number; y: number};

export type Action = {
  name: string;
  asset: string;
  at: number;
  duration: number;
  gain: number;
  trimBefore?: number;
  fadeIn?: number;
  fadeOut?: number;
};

export type Bed = Action & {fadeIn: number; fadeOut: number; loop?: boolean; envelope?: {frame: number; gain: number}[]};

export type RasterLayer = {
  asset: string;
  x: number;
  y: number;
  width: number;
  enter?: {at: number; duration: number; x: number; y: number};
  drift?: {x: number; y: number};
};

export type Scene = {
  id: string;
  name: string;
  at: number;
  plate: string;
  camera: {from: Camera; to: Camera};
  reframes?: {at: number; duration: number; scale: number; x: number; y: number}[];
  layers?: RasterLayer[];
  hit?: {at: number; duration: number; strength: number};
  blackout?: {at: number; duration: number; opacity: number};
  lightUp?: {at: number; duration: number; minBrightness: number; sweep?: {fromX: number; toX: number; y: number}; offMask?: {x: number; y: number; radiusX: number; radiusY: number}};
  label?: {text: string; at: number; x: number; y: number};
  cues?: Action[];
  brightness?: number;
};

export type EpisodeManifest = {
  id: string;
  fps: number;
  duration: number;
  captions: string;
  narration: {asset: string; at: number; duration: number; gain: number; ducks?: {startSec: number; endSec: number; gainDb: number; fadeSec?: number}[]};
  openingTitle?: string | {text: string; startSec?: number; endSec?: number};
  tensionRamp?: {startSec: number; endSec: number; extraScale: number; vignetteStrength: number};
  finalJolt?: {triggerSec: number; durationSec: number; handoffSec?: number; joltImageSrc?: string; zoomFrom: number; zoomTo: number; shakePx: number; shakeDecayMs: number; flashFrames: number; rgbSplitPx: number; blackoutSec: number};
  effectBusGain?: number;
  beds: Bed[];
  scenes: Scene[];
};

export type Point = {x: number; y: number};
export type HudBox = Point & {width: number; height: number};
export type DiagramPath = {points: Point[]; label?: string; arrow?: boolean; dashed?: boolean};
export type HudTiming = {id: string; at: number; duration: number; revealFrames: number};
export type Hud =
  | (HudTiming & {type: "timestampBadge"; text: string})
  | (HudTiming & {type: "tacticalCallout"; text: string; box: HudBox; guide?: [Point, Point]})
  | (HudTiming & {type: "supplyChecklist"; box: HudBox; items: {label: string; value: number; display: string}[]})
  | (HudTiming & {type: "radarDiagram" | "blueprintOverlay"; box: HudBox; paths: DiagramPath[]});
export type CameraPreset = "slow-push" | "punch-in" | "dread-drift" | "impact-shake";
export type CharacterComposite = {mode: "baked"} | {mode: "masked"; layers: RasterLayer[]; foreground: string};
export type SceneV2 = Omit<Scene, "layers" | "label"> & {characters: CharacterComposite; hud: Hud[]; cameraPreset?: CameraPreset};
export type EpisodeManifestV2 = Omit<EpisodeManifest, "scenes"> & {
  schemaVersion: 2;
  art: {styleId: string; rasterAssets: Record<string, string>};
  script: {
    format: "survival-tactics-curiosity-gap";
    hook: {at: number; line: string};
    promise: {at: number; line: string; openLoop: string};
    tactics: {at: number; steps: {number: number; at: number; line: string; detail: string}[]};
    ending: {at: number; twistAt: number; payoff: string};
  };
  scenes: SceneV2[];
};
