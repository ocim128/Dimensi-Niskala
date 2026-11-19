// Episode-specific draft generator. Never overwrites an existing cut.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {resolve} from "node:path";

const root = resolve("episodes/001-kemacetan-terakhir");
const destination = resolve(root, "recut-v2");
if (existsSync(destination)) throw new Error(`Refusing to overwrite ${destination}`);
const baseline = JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8"));
const oldCaptions = JSON.parse(readFileSync(resolve(root, "captions.json"), "utf8"));
const rate = 1.2;
const frame = (n) => Math.round(n / rate);
const duration = frame(baseline.duration);
const foreground = "assets/kemacetan-terakhir/seat-occluder.png";
const box = {x: .09, y: .15, width: .82, height: .24};
const makeCallout = (id, text, at, dur, guide) => ({id, type: "tacticalCallout", text, at, duration: dur, revealFrames: Math.min(16, dur), box, ...(guide ? {guide} : {})});
const hudMap = {
  threat: [{id: "time-sunset", type: "timestampBadge", text: "HARI 1 · SENJA", at: 0, duration: 50, revealFrames: 12}],
  hold: [makeCallout("danger", "JANGAN KELUAR", 5, 60)],
  panic: [makeCallout("outbreak", "WABAH DI JALAN TOL", 10, 75)],
  reach: [makeCallout("instinct", "INSTING: LARI", 0, 18)],
  recoil: [makeCallout("step-one", "01: KUNCI PINTU", 5, 30)],
  gridlock: [makeCallout("blocked", "TERJEBAK", 5, 55), {id: "traffic-diagram", type: "radarDiagram", at: 70, duration: 45, revealFrames: 20, box: {x: .12, y: .19, width: .7, height: .28}, paths: [{points: [{x: .12, y: .5}, {x: .45, y: .5}], arrow: true}, {points: [{x: .88, y: .5}, {x: .55, y: .5}], arrow: true}]}],
  ignition: [makeCallout("engine", "MESIN MATI", 65, 32), makeCallout("lights", "LAMPU MATI", 102, 28), makeCallout("radio", "RADIO MATI", 133, 20)],
  duck: [makeCallout("sill", "02: DI BAWAH JENDELA", 4, 55, [{x: .1, y: .8}, {x: .95, y: .8}])],
  breath: [makeCallout("breath", "TAHAN NAPAS", 55, 55)],
  supplies: [{id: "inventory", type: "supplyChecklist", at: 0, duration: 184, revealFrames: 180, box: {x: .09, y: .22, width: .82, height: .36}, items: [{label: "AIR", value: .5, display: "½ botol"}, {label: "PERMEN KARET", value: 1, display: "1 bungkus"}, {label: "BATERAI", value: .6, display: "60%"}]}],
  night: [{id: "nighttime", type: "timestampBadge", text: "HARI 1 · MALAM", at: 0, duration: 55, revealFrames: 12}, makeCallout("quiet", "SUARA MULAI HILANG", 80, 48)],
  clock: [{id: "time-three", type: "timestampBadge", text: "03:00 · DINI HARI", at: 0, duration: 70, revealFrames: 12}],
  empty: [makeCallout("empty", "KACA KOSONG", 30, 50)],
  contact: [{id: "finger-path", type: "blueprintOverlay", at: 5, duration: 45, revealFrames: 20, box: {x: .15, y: .18, width: .68, height: .35}, paths: [{points: [{x: .7, y: .15}, {x: .58, y: .43}, {x: .48, y: .62}], arrow: true}]}],
  reveal: [makeCallout("backseat", "KURSI BELAKANG", 68, 42)],
  eyes: [makeCallout("infected", "TERINFEKSI", 35, 52)],
};

const scenes = baseline.scenes.map((old, index) => {
  const at = frame(old.at);
  const length = frame(baseline.scenes[index + 1]?.at ?? baseline.duration) - at;
  const scene = {...old, at, plate: old.id === "supplies" ? "assets/kemacetan-terakhir/cabin-plate.webp" : old.plate, characters: old.layers ? {mode: "masked", layers: old.layers.map(layer => ({...layer, ...(layer.enter ? {enter: {...layer.enter, at: frame(layer.enter.at), duration: Math.max(1, frame(layer.enter.duration))}} : {})})), foreground} : {mode: "baked"}, hud: hudMap[old.id] ?? [], cameraPreset: old.id === "tackle" ? "impact-shake" : old.id === "reveal" ? "punch-in" : ["shadow", "breath", "night"].includes(old.id) ? "dread-drift" : "slow-push"};
  delete scene.layers; delete scene.label;
  // The available baked plates maintain believable seat contact. Keep the
  // general masked-character path in the engine for authored future artwork.
  if (old.id === "hold") {scene.plate = "assets/kemacetan-terakhir/door-threat.webp"; scene.characters = {mode: "baked"};}
  if (old.id === "reach" || old.id === "recoil") {scene.plate = "assets/kemacetan-terakhir/lean.webp"; scene.characters = {mode: "baked"};}
  for (const key of ["hit", "blackout"]) if (scene[key]) scene[key] = {...scene[key], at: frame(scene[key].at), duration: Math.min(Math.max(1, frame(scene[key].duration)), length - frame(scene[key].at))};
  if (scene.cues) scene.cues = scene.cues.map(cue => ({...cue, at: frame(cue.at), duration: Math.max(1, frame(cue.duration))}));
  for (const item of scene.hud) {item.duration = Math.min(item.duration, length - item.at); item.revealFrames = Math.min(item.revealFrames, item.duration);}
  return scene;
});
const rasterAssets = {};
for (const scene of scenes) {
  rasterAssets[scene.plate] = "kemacetan-illustrated-v1";
  if (scene.characters.mode === "masked") {rasterAssets[scene.characters.foreground] = "kemacetan-illustrated-v1"; for (const layer of scene.characters.layers) rasterAssets[layer.asset] = "kemacetan-illustrated-v1";}
}
const beds = baseline.beds.map(b => ({...b, at: frame(b.at), duration: Math.min(frame(b.duration), duration - frame(b.at)), fadeIn: frame(b.fadeIn), fadeOut: frame(b.fadeOut)}));
const manifest = {
  schemaVersion: 2, id: "KemacetanTerakhirMotionComicRecut", fps: 30, duration, captions: "captions.json",
  narration: {asset: "assets/kemacetan-terakhir/narration-recut-120.wav", at: 0, duration: 2074, gain: .71}, beds,
  art: {styleId: "kemacetan-illustrated-v1", rasterAssets},
  script: {format: "survival-tactics-curiosity-gap", hook: {at: 0, line: "Di luar pintu mobilmu, ada zombie."}, promise: {at: 90, line: "Kalau kamu keluar sekarang, mereka akan melihatmu.", openLoop: "Apakah diam di mobil cukup untuk menghindari ancaman?"}, tactics: {at: 360, steps: [{number: 1, at: 457, line: "Kamu menarik tanganmu dan mengunci pintu.", detail: "Pintu dikunci setelah melihat serangan."}, {number: 2, at: 813, line: "Lalu kamu merunduk di bawah jendela.", detail: "Posisi tersembunyi di bawah garis jendela."}]}, ending: {at: 1650, twistAt: frame(2285), payoff: "Seseorang duduk di kursi belakang. Dia sudah terinfeksi."}},
  scenes,
};

const red = /zombie|diterkam|terjebak|ketukan|terinfeksi/i;
const yellow = /mengunci|jendela|persediaan|air|baterai|belakang|napas/i;
const captions = [];
for (const cue of oldCaptions) {
  const words = cue.text.trim().split(/\s+/u);
  const count = Math.ceil(words.length / 4);
  let start = 0;
  for (let i = 0; i < count; i++) {
    const groupSize = Math.ceil((words.length - start) / (count - i));
    const group = words.slice(start, start + groupSize);
    const from = cue.startMs + (cue.endMs - cue.startMs) * start / words.length;
    const to = cue.startMs + (cue.endMs - cue.startMs) * (start + groupSize) / words.length;
    captions.push({startMs: Math.round(from / rate), endMs: Math.round(to / rate), timestampMs: null, confidence: null, words: group.map(text => ({text, ...(red.test(text) ? {color: "danger"} : yellow.test(text) ? {color: "highlight"} : {})}))});
    start += groupSize;
  }
}
mkdirSync(destination);
writeFileSync(resolve(destination, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
writeFileSync(resolve(destination, "captions.json"), JSON.stringify(captions, null, 2) + "\n");
console.log(`${manifest.id}: ${duration} frames, ${scenes.length} shots, ${captions.length} caption beats`);
