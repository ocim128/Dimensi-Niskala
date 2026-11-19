import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {validateEpisode} from "./check-episodes.mjs";

const publicDir = resolve("public");
const opts = {publicDir, manifestPath: "fixture/manifest.json"};
const plateA = "assets/kemacetan-terakhir/door-threat.webp";
const plateB = "assets/kemacetan-terakhir/boxed-in.webp";
const camera = {from: {scale: 1, x: 0, y: 0}, to: {scale: 1, x: 0, y: 0}};
const base = {
  id: "FixtureV2", schemaVersion: 2, fps: 30, duration: 2100,
  captions: "captions.json", narration: {asset: "assets/kemacetan-terakhir/narration.mp3", at: 0, duration: 2100, gain: 0.7}, beds: [],
  art: {styleId: "painted", rasterAssets: {[plateA]: "painted", [plateB]: "painted"}},
  script: {format: "survival-tactics-curiosity-gap", hook: {at: 0, line: "Wabah datang"}, promise: {at: 90, line: "Apa bahayanya?", openLoop: "Apa di belakang?"}, tactics: {at: 360, steps: [{number: 1, at: 370, line: "Kunci", detail: "pintu"}, {number: 2, at: 800, line: "Sembunyi", detail: "jendela"}]}, ending: {at: 1650, twistAt: 1900, payoff: "Ada seseorang"}},
  scenes: Array.from({length: 30}, (_, i) => ({id: `s${i}`, name: `Shot ${i}`, at: i * 70, plate: i % 2 ? plateA : plateB, camera, characters: {mode: "baked"}, hud: []})),
};
const captions = [{startMs: 0, endMs: 1000, timestampMs: null, confidence: null, words: [{text: "Ada"}, {text: "bahaya", color: "danger"}]}];
const clone = () => structuredClone(base);
const validate = (manifest, cap = captions) => validateEpisode(manifest, cap, opts);

test("valid v2 and the exact comparison baseline", () => {
  assert.doesNotThrow(() => validate(clone()));
  const old = JSON.parse(readFileSync("episodes/001-kemacetan-terakhir/manifest.json"));
  const oldCaps = JSON.parse(readFileSync("episodes/001-kemacetan-terakhir/captions.json"));
  assert.doesNotThrow(() => validateEpisode(old, oldCaps, {publicDir, manifestPath: "001-kemacetan-terakhir/manifest.json"}));
  assert.throws(() => validateEpisode(old, oldCaps, opts), /schema version/);
});
test("duration over 72 seconds and missing promise fail", () => {
  const a = clone(); a.duration = 2161; assert.throws(() => validate(a), /duration/);
  const b = clone(); b.script.promise.line = ""; assert.throws(() => validate(b), /promise/);
});
test("out-of-order tactical steps fail", () => {
  const a = clone(); a.script.tactics.steps[1].at = 369; assert.throws(() => validate(a), /tactical step/);
});
test("76 static frames crossing repeated shots fail", () => {
  const a = clone(); a.scenes[1].at = 38; a.scenes[1].plate = a.scenes[0].plate; a.scenes[2].at = 76; a.scenes[2].plate = plateA;
  assert.throws(() => validate(a), /plain still 0–76/);
});
test("75 static frames crossing repeated shots pass", () => {
  const a = clone();
  a.scenes = [{...a.scenes[0], id: "first", at: 0}, {...a.scenes[0], id: "same", at: 37}];
  for (let at = 75, i = 0; at < 2100; at += 70, i++) a.scenes.push({id: `tail${i}`, name: `tail${i}`, at, plate: i % 2 ? plateB : plateA, camera, characters: {mode: "baked"}, hud: []});
  assert.doesNotThrow(() => validate(a));
});
test("settled HUD does not excuse an overlong hold", () => {
  const a = clone(); a.scenes.splice(1, 1); a.scenes[0].hud = [{id: "badge", type: "timestampBadge", text: "03.00", at: 0, duration: 140, revealFrames: 5}];
  assert.throws(() => validate(a), /plain still/);
});
test("HUD box, foreground and mixed style errors fail", () => {
  const a = clone(); a.scenes[0].hud = [{id: "x", type: "tacticalCallout", text: "Bahaya", at: 0, duration: 30, revealFrames: 10, box: {x: .9, y: .1, width: .2, height: .2}}];
  assert.throws(() => validate(a), /out-of-bounds/);
  const b = clone(); b.scenes[0].characters = {mode: "masked", layers: [{asset: plateA, x: 0, y: 0, width: 50}], foreground: "missing.png"};
  assert.throws(() => validate(b), /missing asset/);
  const c = clone(); c.art.rasterAssets[plateA] = "photograph"; assert.throws(() => validate(c), /mixed style/);
});
test("masked character accepts an alpha foreground and rejects an opaque plate", () => {
  const a = clone();
  const fg = "assets/kemacetan-terakhir/seat-occluder.png";
  a.art.rasterAssets[fg] = "painted";
  a.scenes[0].characters = {mode: "masked", layers: [{asset: plateA, x: 10, y: 10, width: 50}], foreground: fg};
  assert.doesNotThrow(() => validate(a));
  a.scenes[0].characters.foreground = plateA;
  assert.throws(() => validate(a), /not alpha-capable/);
});
test("five-word captions, invalid colors and missing assets fail", () => {
  assert.throws(() => validate(clone(), [{...captions[0], words: Array.from({length: 5}, () => ({text: "satu"}))}]), /1–4 words/);
  assert.throws(() => validate(clone(), [{...captions[0], words: [{text: "bahaya", color: "blue"}]}]), /invalid word or color/);
  const a = clone(); a.scenes[0].plate = "missing.webp"; assert.throws(() => validate(a), /missing asset/);
});
test("animated infographics break up an otherwise long still", () => {
  const a = clone(); a.scenes.splice(1, 2);
  a.scenes[0].hud = [60, 130].map((at, i) => ({id: `diagram-${i}`, type: "blueprintOverlay", at, duration: 15, revealFrames: 10, box: {x: .1, y: .1, width: .7, height: .4}, paths: [{points: [{x: 0, y: 0}, {x: 1, y: 1}], arrow: true}]}));
  assert.doesNotThrow(() => validate(a));
});
