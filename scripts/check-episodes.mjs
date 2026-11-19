import assert from "node:assert/strict";
import {readFileSync, readdirSync, statSync} from "node:fs";
import {join, relative, resolve, sep} from "node:path";
import {fileURLToPath} from "node:url";

const isFrame = (v) => Number.isInteger(v) && v >= 0;
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
const unit = (v) => Number.isFinite(v) && v >= 0 && v <= 1;
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

function alphaCapable(path) {
  const data = readFileSync(path);
  if (data.length >= 26 && data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return [4, 6].includes(data[25]) || data.includes(Buffer.from("tRNS"));
  if (data.length >= 25 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    const chunk = data.toString("ascii", 12, 16);
    if (chunk === "VP8X") return !!(data[20] & 0x10);
    if (chunk === "VP8L" && data.length >= 25) return !!(data[24] & 0x10);
  }
  return false;
}

export function validateEpisode(manifest, captions, {publicDir, manifestPath} = {}) {
  const {id, duration, fps, narration, beds, scenes} = manifest;
  const prefix = `${id ?? manifestPath ?? "episode"}: `;
  const fail = (condition, message) => assert(condition, prefix + message);
  const asset = (name, context) => {
    fail(nonempty(name) && typeof publicDir === "string", `${context}: invalid asset path`);
    const full = resolve(publicDir, name);
    fail(full.startsWith(resolve(publicDir) + sep) && statSync(full, {throwIfNoEntry: false})?.isFile(), `${context}: missing asset ${name}`);
    return full;
  };
  const clip = (c, available, name) => {
    fail(c && typeof c === "object", `${name}: missing clip`);
    asset(c.asset, name);
    fail(isFrame(c.at) && isFrame(c.duration) && c.duration > 0 && c.at + c.duration <= available, `${name}: invalid frame interval ${c.at}+${c.duration}/${available}`);
    fail(Number.isFinite(c.gain) && c.gain >= 0 && c.gain <= 1, `${name}: invalid gain`);
  };
  fail(nonempty(id) && /^[a-zA-Z0-9-]+$/.test(id), "invalid composition id");
  fail(isFrame(fps) && fps > 0 && isFrame(duration) && duration > 0, "invalid duration/fps");
  const baseline = manifest.schemaVersion === undefined && manifestPath === "001-kemacetan-terakhir/manifest.json" && id === "KemacetanTerakhirMotionComic" && fps === 30 && duration === 2544;
  const v2 = manifest.schemaVersion === 2;
  fail(baseline || v2, "unsupported or missing schema version (only the exact comparison cut is grandfathered)");
  if (v2) {
    asset("fonts/theboldfont.ttf", "caption font");
    fail(duration >= 60 * fps && duration <= 72 * fps, `duration ${duration} frames must be 60–72 s`);
    const s = manifest.script;
    fail(s?.format === "survival-tactics-curiosity-gap", "invalid script format");
    fail(s.hook?.at === 0 && nonempty(s.hook.line), "invalid hook at frame 0");
    fail(s.promise?.at === 3 * fps && nonempty(s.promise.line) && nonempty(s.promise.openLoop), `invalid promise at frame ${3 * fps}`);
    fail(s.tactics?.at === 12 * fps && Array.isArray(s.tactics.steps) && s.tactics.steps.length >= 2, "invalid tactical steps");
    let previous = 12 * fps - 1;
    s.tactics.steps.forEach((step, i) => {
      fail(step.number === i + 1 && isFrame(step.at) && step.at > previous && step.at >= 12 * fps && step.at < 55 * fps && nonempty(step.line) && nonempty(step.detail), `invalid tactical step ${i + 1} at ${step.at}`);
      previous = step.at;
    });
    fail(s.ending?.at === 55 * fps && isFrame(s.ending.twistAt) && s.ending.twistAt > 55 * fps && s.ending.twistAt <= 70 * fps && s.ending.twistAt < duration && nonempty(s.ending.payoff), "invalid ending/twist");
    fail(nonempty(manifest.art?.styleId) && manifest.art.rasterAssets && typeof manifest.art.rasterAssets === "object", "missing art style map");
    for (const [path, style] of Object.entries(manifest.art.rasterAssets)) {
      asset(path, "art style map");
      fail(style === manifest.art.styleId, `art style map: missing or mixed style ID for ${path}`);
    }
  }
  fail(Array.isArray(scenes) && scenes[0]?.at === 0 && Array.isArray(beds), "missing scenes, beds, or scene at frame zero");
  clip(narration, duration, "narration");
  const sceneIds = new Set();
  const activity = [];
  const activityInterval = (start, end) => {if (end > start) activity.push([start, end]);};
  const point = (p) => p && unit(p.x) && unit(p.y);
  const box = (b) => point(b) && unit(b.width) && unit(b.height) && b.width > 0 && b.height > 0 && b.x + b.width <= 1 && b.y + b.height <= 1;
  const raster = (path, context) => {
    const full = asset(path, context);
    if (v2) fail(manifest.art.rasterAssets[path] === manifest.art.styleId, `${context}: missing or mixed style ID for ${path}`);
    return full;
  };
  for (const [index, scene] of scenes.entries()) {
    const end = scenes[index + 1]?.at ?? duration;
    const length = end - scene.at;
    fail(isFrame(scene.at) && isFrame(end) && length > 0 && end <= duration, `${scene.id}: invalid scene interval ${scene.at}–${end}`);
    fail(nonempty(scene.id) && !sceneIds.has(scene.id), `duplicate/missing scene id ${scene.id}`); sceneIds.add(scene.id);
    raster(scene.plate, `${scene.id} plate`);
    fail(scene.camera?.from && scene.camera?.to && [scene.camera.from, scene.camera.to].every(c => Number.isFinite(c.scale) && c.scale > 0 && Number.isFinite(c.x) && Number.isFinite(c.y)), `${scene.id}: invalid camera`);
    let layers = scene.layers ?? [];
    if (v2) {
      fail(!("layers" in scene) && !("label" in scene), `${scene.id}: legacy layers/label are forbidden`);
      fail(scene.characters?.mode === "baked" || scene.characters?.mode === "masked", `${scene.id}: invalid character mode`);
      fail(Array.isArray(scene.hud), `${scene.id}: hud must be an array`);
      if (scene.characters.mode === "baked") fail(!("layers" in scene.characters) && !("foreground" in scene.characters), `${scene.id}: baked scene has cutouts`);
      if (scene.characters.mode === "masked") {
        layers = scene.characters.layers;
        fail(Array.isArray(layers) && layers.length > 0, `${scene.id}: masked scene needs character layers`);
        const fg = raster(scene.characters.foreground, `${scene.id} foreground`);
        fail(alphaCapable(fg), `${scene.id}: foreground is not alpha-capable`);
      }
      fail(scene.cameraPreset === undefined || ["slow-push", "punch-in", "dread-drift", "impact-shake"].includes(scene.cameraPreset), `${scene.id}: invalid camera preset`);
      if (scene.cameraPreset === "punch-in") activityInterval(scene.at, scene.at + Math.min(16, length));
      if (scene.cameraPreset === "impact-shake") activityInterval(scene.at, scene.at + Math.min(14, length));
      const hudIds = new Set();
      for (const h of scene.hud) {
        const where = `${scene.id}/${h.id ?? "HUD"}`;
        fail(nonempty(h.id) && !hudIds.has(h.id), `${where}: duplicate/missing HUD id`); hudIds.add(h.id);
        fail(["timestampBadge", "tacticalCallout", "supplyChecklist", "radarDiagram", "blueprintOverlay"].includes(h.type), `${where}: unknown HUD type`);
        fail(isFrame(h.at) && isFrame(h.duration) && h.duration > 0 && h.at + h.duration <= length && Number.isInteger(h.revealFrames) && h.revealFrames > 0 && h.revealFrames <= h.duration, `${where}: invalid HUD timing ${h.at}+${h.duration} of ${length}`);
        if (h.type === "timestampBadge" || h.type === "tacticalCallout") fail(nonempty(h.text), `${where}: missing text`);
        if (h.type !== "timestampBadge") fail(box(h.box), `${where}: out-of-bounds box`);
        if (h.type === "tacticalCallout" && h.guide !== undefined) fail(Array.isArray(h.guide) && h.guide.length === 2 && h.guide.every(point) && JSON.stringify(h.guide[0]) !== JSON.stringify(h.guide[1]), `${where}: invalid guide`);
        if (h.type === "supplyChecklist") fail(Array.isArray(h.items) && h.items.length > 0 && h.items.every(item => nonempty(item.label) && nonempty(item.display) && unit(item.value)), `${where}: invalid checklist`);
        if (h.type === "radarDiagram" || h.type === "blueprintOverlay") fail(Array.isArray(h.paths) && h.paths.length > 0 && h.paths.every(path => Array.isArray(path.points) && path.points.length >= 2 && path.points.every(point) && path.points.some(p => p.x !== path.points[0].x || p.y !== path.points[0].y)), `${where}: invalid diagram path`);
        activityInterval(scene.at + h.at, scene.at + h.at + h.revealFrames);
        if (h.at + h.duration < length) activityInterval(scene.at + h.at + h.duration, scene.at + h.at + h.duration + 1);
      }
    }
    fail(Array.isArray(layers), `${scene.id}: invalid character layers`);
    for (const l of layers) {
      raster(l.asset, `${scene.id} layer`);
      fail(Number.isFinite(l.x) && Number.isFinite(l.y) && Number.isFinite(l.width) && l.width > 0, `${scene.id}: invalid layer geometry`);
      if (l.enter) {
        fail(isFrame(l.enter.at) && Number.isInteger(l.enter.duration) && l.enter.duration > 0 && l.enter.at + l.enter.duration <= length && Number.isFinite(l.enter.x) && Number.isFinite(l.enter.y), `${scene.id}: invalid layer entrance`);
        if (l.enter.x !== 0 || l.enter.y !== 0) activityInterval(scene.at + l.enter.at, scene.at + l.enter.at + l.enter.duration);
      }
    }
    for (const cue of scene.cues ?? []) {
      fail(cue.at < length, `${scene.id}/${cue.name}: cue starts outside scene`);
      clip(cue, duration - scene.at, `${scene.id}/${cue.name}`);
    }
    for (const [name, event] of [["hit", scene.hit], ["blackout", scene.blackout]]) if (event) {
      fail(isFrame(event.at) && Number.isInteger(event.duration) && event.duration > 0 && event.at + event.duration <= length, `${scene.id}: invalid ${name} interval`);
      if ((name === "hit" && event.strength > 0) || (name === "blackout" && event.opacity > 0)) activityInterval(scene.at + event.at, scene.at + event.at + event.duration);
    }
    if (v2 && index > 0) {
      const prev = scenes[index - 1];
      const distinct = prev.plate !== scene.plate || JSON.stringify(prev.characters) !== JSON.stringify(scene.characters) || JSON.stringify(prev.camera.to) !== JSON.stringify(scene.camera.from);
      if (distinct) activityInterval(scene.at, scene.at + 1);
    }
  }
  for (const bed of beds) {clip(bed, duration, bed.name); fail(isFrame(bed.fadeIn) && isFrame(bed.fadeOut) && bed.fadeIn + bed.fadeOut <= bed.duration, `${bed.name}: invalid fades`);}
  if (v2) {
    activity.sort((a, b) => a[0] - b[0]);
    let cursor = 0;
    for (const [start, end] of [...activity, [duration, duration]]) {
      fail(2 * (start - cursor) <= 5 * fps, `plain still ${cursor}–${start} (${start - cursor} frames) exceeds 2.5 s`);
      cursor = Math.max(cursor, end);
    }
  }
  fail(Array.isArray(captions) && captions.length > 0, "caption array is empty");
  let previousEnd = 0;
  for (const [i, c] of captions.entries()) {
    fail(Number.isFinite(c.startMs) && Number.isFinite(c.endMs) && c.startMs >= previousEnd && c.endMs > c.startMs && c.endMs <= narration.duration * 1000 / fps && Math.ceil(c.startMs * fps / 1000) < Math.ceil(c.endMs * fps / 1000), `caption ${i}: invalid timing ${c.startMs}–${c.endMs} ms`);
    if (v2) {
      fail(!("text" in c) && !("emphasis" in c), `caption ${i}: legacy text/emphasis forbidden`);
      fail(Array.isArray(c.words) && c.words.length > 0 && c.words.length <= 4, `caption ${i}: requires 1–4 words`);
      for (const word of c.words) fail(nonempty(word.text) && !/\s/u.test(word.text) && /[\p{L}\p{N}]/u.test(word.text) && (word.color === undefined || ["white", "yellow", "red", "default", "highlight", "danger"].includes(word.color)), `caption ${i}: invalid word or color`);
    } else {
      fail(nonempty(c.text), `caption ${i}: empty text`);
      fail(c.emphasis === undefined || (nonempty(c.emphasis) && c.text.includes(c.emphasis)), `caption ${i}: invalid emphasis`);
    }
    previousEnd = c.endMs;
  }
  return {id, scenes: scenes.length, captions: captions.length, duration, fps, baseline};
}

function findManifests(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? findManifests(join(dir, entry.name)) : entry.name === "manifest.json" ? [join(dir, entry.name)] : []);
}
export function checkAll(root = process.cwd()) {
  const episodeDir = resolve(root, "episodes"), publicDir = resolve(root, "public"), ids = new Set();
  const paths = findManifests(episodeDir).sort();
  assert(paths.length > 0, "No episode manifests found");
  return paths.map(path => {
    const manifest = readJson(path);
    assert(typeof manifest.captions === "string" && /^[\w-]+\.json$/.test(manifest.captions), `Invalid captions path: ${path}`);
    assert(!ids.has(manifest.id), `Duplicate composition ID: ${manifest.id}`); ids.add(manifest.id);
    const result = validateEpisode(manifest, readJson(join(path, "..", manifest.captions)), {publicDir, manifestPath: relative(episodeDir, path).split(sep).join("/")});
    console.log(`${result.id}: ${result.scenes} scenes, ${result.captions} captions, ${result.duration} frames (${(result.duration / result.fps).toFixed(2)} s)${result.baseline ? " [comparison baseline]" : " [v2]"}`);
    return result;
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) checkAll();
