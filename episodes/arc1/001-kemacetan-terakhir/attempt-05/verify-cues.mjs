import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(here, "manifest.json"), "utf8"));
const captions = JSON.parse(readFileSync(join(here, "captions.json"), "utf8"));
assert.equal(manifest.narration.asset, "assets/kemacetan-terakhir/attempt-05/narration-jejak.mp3");
assert.equal(manifest.narration.at, 0);
assert.equal(manifest.narration.duration, 2115);
const knocks = manifest.scenes.flatMap(scene => (scene.cues ?? []).filter(cue => ["sfx/glass-tick.wav", "sfx/glass-knock.wav"].includes(cue.asset)).map(cue => ({frame: scene.at + cue.at, asset: cue.asset})));
assert.deepEqual(knocks, [
  {frame: 1773, asset: "sfx/glass-tick.wav"},
  {frame: 1791, asset: "sfx/glass-tick.wav"},
  {frame: 1920, asset: "sfx/glass-knock.wav"},
]);
assert.equal(manifest.scenes.find(s => s.id === "behind-knock").at, 1920);
assert.equal(manifest.scenes.find(s => s.id === "passenger").at, 1980);
const forbidden = new Set(["door-threat.webp", "boxed-in.webp", "tackle.webp", "headrest.webp", "hide.webp", "look-ahead.webp", "look-back.webp", "lean.webp", "ignition.webp"]);
for (const scene of manifest.scenes) assert(!forbidden.has(scene.plate.split("/").at(-1)), `${scene.id}: inherited viewer-identifying plate`);
assert(!captions.some(c => c.words.some(w => /^tok[.!?,]*$/i.test(w.text))), "Spoken captions contain an imitated knock");
console.log("Attempt 05: voice master path and timing verified; knock cues at frames 1773, 1791, 1920; contact 1920; passenger 1980; no forbidden inherited plates or voiced 'tok' captions.");
console.log("Image anonymity and spoken-audio quality still require visual/listening review.");
