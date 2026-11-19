import type {Caption} from "@remotion/captions";

export type EpisodeCaption = Caption & {emphasis?: string};

type Camera = {scale: number; x: number; y: number};

export type Action = {
  name: string;
  asset: string;
  at: number;
  duration: number;
  gain: number;
};

export type Bed = Action & {fadeIn: number; fadeOut: number; loop?: boolean};

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
  layers?: RasterLayer[];
  hit?: {at: number; duration: number; strength: number};
  blackout?: {at: number; duration: number; opacity: number};
  label?: {text: string; at: number; x: number; y: number};
  cues?: Action[];
};

export type EpisodeManifest = {
  id: string;
  fps: number;
  duration: number;
  captions: string;
  narration: {asset: string; at: number; duration: number; gain: number};
  beds: Bed[];
  scenes: Scene[];
};
