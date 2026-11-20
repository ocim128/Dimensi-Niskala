import test, {after} from "node:test";
import assert from "node:assert/strict";
import {copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname, join, resolve} from "node:path";
import {checkAll, validateEpisode} from "./check-episodes.mjs";

const tempRoot = mkdtempSync(join(tmpdir(), "episode-gates-"));
after(() => rmSync(tempRoot, {recursive: true, force: true}));
const publicDir = join(tempRoot, "public");
const opts = {publicDir, manifestPath: "fixture/attempt-06/manifest.json"};
const assetDir = "assets/fixture/attempt-06";
const styleId = "gritty-dark-anime-comic";
const originalPlate = readFileSync("public/assets/kemacetan-terakhir/door-threat.webp");
const plates = Array.from({length: 30}, (_, i) => `${assetDir}/shot-${i}.webp`);
const plateA = plates[0];
const fg = `${assetDir}/seat.png`;
mkdirSync(join(publicDir, assetDir), {recursive: true});
mkdirSync(join(publicDir, "sfx"), {recursive: true});
mkdirSync(join(publicDir, "fonts"), {recursive: true});
for (const [i, plate] of plates.entries()) writeFileSync(join(publicDir, plate), Buffer.concat([originalPlate, Buffer.from([i])]));
copyFileSync("public/assets/kemacetan-terakhir/seat-occluder.png", join(publicDir, fg));
writeFileSync(join(publicDir, assetDir, "narration.mp3"), "");
writeFileSync(join(publicDir, "fonts/theboldfont.ttf"), "");
writeFileSync(join(publicDir, "sfx/knock.wav"), "");
const camera = {from: {scale: 1, x: 0, y: 0}, to: {scale: 1, x: 0, y: 0}};
const base = {
  id: "FixtureV2", schemaVersion: 2, fps: 30, duration: 2100,
  captions: "captions.json", narration: {asset: `${assetDir}/narration.mp3`, at: 0, duration: 2100, gain: 0.7}, beds: [],
  art: {styleId, rasterAssets: Object.fromEntries(plates.map(plate => [plate, styleId]))},
  script: {format: "survival-tactics-curiosity-gap", hook: {at: 0, line: "Wabah datang"}, promise: {at: 90, line: "Apa bahayanya?", openLoop: "Apa di belakang?"}, tactics: {at: 360, steps: [{number: 1, at: 370, line: "Kunci", detail: "pintu"}, {number: 2, at: 800, line: "Sembunyi", detail: "jendela"}]}, ending: {at: 1650, twistAt: 1890, payoff: "Ada seseorang"}},
  scenes: plates.map((plate, i) => ({
    id: `s${i}`, name: `Shot ${i}`, at: i * 70, plate, camera, characters: {mode: "baked"}, hud: [],
    editorial: {
      protagonist: [6, 12, 26].includes(i) ? "reaction" : i < 10 ? "visible" : "absent",
      purpose: "threat-proximity",
      evidence: "Figure closes the distance from the driver's door",
    },
  })),
};
const captions = [{startMs: 0, endMs: 1000, timestampMs: null, confidence: null, words: [{text: "Ada"}, {text: "bahaya", color: "danger"}]}];
const clone = () => structuredClone(base);
const validate = (manifest, cap = captions) => validateEpisode(manifest, cap, opts);

test("valid v2 and the exact comparison baseline", () => {
  assert.doesNotThrow(() => validate(clone()));
  const old = JSON.parse(readFileSync("episodes/001-kemacetan-terakhir/manifest.json"));
  const oldCaps = JSON.parse(readFileSync("episodes/001-kemacetan-terakhir/captions.json"));
  assert.doesNotThrow(() => validateEpisode(old, oldCaps, {publicDir: resolve("public"), manifestPath: "001-kemacetan-terakhir/manifest.json"}));
  assert.throws(() => validateEpisode(old, oldCaps, opts), /schema version/);
  const path = "001-kemacetan-terakhir/attempt-05/manifest.json";
  const closed = JSON.parse(readFileSync(join("episodes", path)));
  const closedCaptions = JSON.parse(readFileSync(join("episodes", dirname(path), "captions.json")));
  const closedOptions = {publicDir: resolve("public"), manifestPath: path};
  assert.equal(validateEpisode(closed, closedCaptions, closedOptions).comparison, true);
  closed.scenes[0].name += " revised";
  assert.throws(() => validateEpisode(closed, closedCaptions, closedOptions), /art.styleId/);
});
test("duration over 72 seconds and missing promise fail", () => {
  const a = clone(); a.duration = 2161; assert.throws(() => validate(a), /duration/);
  const b = clone(); b.script.promise.line = ""; assert.throws(() => validate(b), /promise/);
});
test("out-of-order tactical steps fail", () => {
  const a = clone(); a.script.tactics.steps[1].at = 369; assert.throws(() => validate(a), /tactical step/);
});
test("76 static frames crossing repeated shots fail", () => {
  const a = clone(); a.scenes[1].at = 38; a.scenes[1].plate = a.scenes[0].plate; a.scenes[2].at = 76;
  assert.throws(() => validate(a), /plain still 0–76/);
});
test("a single 75-frame still passes", () => {
  const a = clone();
  a.scenes[1].at = 75;
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
  a.art.rasterAssets[fg] = styleId;
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
  for (const scene of a.scenes.filter(scene => ["s16", "s17"].includes(scene.id))) scene.editorial.protagonist = "visible";
  a.scenes[0].hud = [60, 130].map((at, i) => ({id: `diagram-${i}`, type: "blueprintOverlay", at, duration: 15, revealFrames: 10, box: {x: .1, y: .1, width: .7, height: .4}, paths: [{points: [{x: 0, y: 0}, {x: 1, y: 1}], arrow: true}]}));
  assert.doesNotThrow(() => validate(a));
});

test("protagonist coverage, hook, middle reactions and direct anticipation are required", () => {
  const hidden = clone();
  hidden.scenes.find(scene => scene.id === "s4").editorial.protagonist = "absent";
  assert.throws(() => validate(hidden), /11\/30 shots.*40%/);
  const hook = clone();
  hook.scenes[0].editorial.protagonist = hook.scenes[1].editorial.protagonist = "absent";
  hook.scenes[16].editorial.protagonist = hook.scenes[17].editorial.protagonist = "visible";
  assert.throws(() => validate(hook), /opening 0–3 s/);
  const mid = clone();
  mid.scenes[12].editorial.protagonist = "visible";
  assert.throws(() => validate(mid), /two protagonist reaction/);
  const reveal = clone();
  reveal.scenes[26].editorial.protagonist = "visible";
  assert.throws(() => validate(reveal), /immediately preceding shot/);
});

test("shot purpose requires visible evidence and a tactical shot needs an actual diagram", () => {
  const a = clone();
  a.scenes[4].editorial.evidence = " ";
  assert.throws(() => validate(a), /visible evidence/);
  a.scenes[4].editorial = {protagonist: "absent", purpose: "tactical-hud", evidence: "Diagram plots both exits"};
  assert.throws(() => validate(a), /requires a diagram/);
  a.scenes[16].editorial.protagonist = "visible";
  a.scenes[4].hud = [{id: "map", type: "radarDiagram", at: 0, duration: 40, revealFrames: 10, box: {x: .1, y: .1, width: .8, height: .6}, paths: [{points: [{x: 0, y: 0}, {x: 1, y: 1}]}]}];
  a.scenes[27].cues = [{name: "Knock", asset: "sfx/knock.wav", at: 0, duration: 10, gain: .5}];
  assert.doesNotThrow(() => validate(a));
});

test("rejects assets from an older attempt and shared paths for narration or art", () => {
  const oldPlate = "assets/fixture/attempt-05/shot.webp";
  mkdirSync(join(publicDir, dirname(oldPlate)), {recursive: true});
  copyFileSync(join(publicDir, plateA), join(publicDir, oldPlate));
  const a = clone();
  a.art.rasterAssets[oldPlate] = styleId;
  assert.throws(() => validate(a), /must be in public\/assets\/fixture\/attempt-06/);
  const b = clone();
  b.narration.asset = "sfx/knock.wav";
  assert.throws(() => validate(b), /narration: asset/);
  const c = clone();
  c.scenes[0].plate = "sfx/knock.wav";
  assert.throws(() => validate(c), /s0 plate: asset/);
  const d = clone();
  d.art.rasterAssets[oldPlate] = styleId;
  assert.throws(() => validateEpisode(d, captions, {publicDir, manifestPath: "fixture/manifest.json", batchRoots: ["assets/fixture/attempt-05"]}), /nested attempt's batch/);
});

test("rejects a repeated static plate under another filename within 15 seconds", () => {
  const duplicate = `${assetDir}/copied.webp`;
  copyFileSync(join(publicDir, plateA), join(publicDir, duplicate));
  const a = clone();
  a.art.rasterAssets[duplicate] = styleId;
  a.scenes[6].plate = duplicate;
  assert.throws(() => validate(a), /repeats the static plate.*within 15 s/);
  a.scenes[6].plate = plates[6];
  a.scenes[7].plate = duplicate;
  assert.doesNotThrow(() => validate(a));
});

test("repository scan rejects raster copies placed in a different attempt's own folder", () => {
  const earlier = "fixture/attempt-05";
  const earlierManifest = JSON.parse(JSON.stringify(base).replaceAll("attempt-06", "attempt-05"));
  earlierManifest.id = "EarlierFixture";
  mkdirSync(join(publicDir, "assets", earlier), {recursive: true});
  for (const asset of [...plates, base.narration.asset]) {
    copyFileSync(join(publicDir, asset), join(publicDir, asset.replace("attempt-06", "attempt-05")));
  }
  for (const [folder, manifest] of [[earlier, earlierManifest], ["fixture/attempt-06", base]]) {
    const dir = join(tempRoot, "episodes", folder);
    mkdirSync(dir, {recursive: true});
    writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest));
    writeFileSync(join(dir, "captions.json"), JSON.stringify(captions));
  }
  assert.throws(() => checkAll(tempRoot), /same raster bytes in different attempts/);
});
