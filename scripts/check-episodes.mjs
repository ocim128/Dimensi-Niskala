import assert from "node:assert/strict";
import {existsSync, readFileSync, readdirSync, statSync} from "node:fs";
import {join, resolve, sep} from "node:path";

const publicDir = resolve("public");
const episodeDir = resolve("episodes");
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const isFrame = (value) => Number.isInteger(value) && value >= 0;

function checkAsset(asset) {
  const path = resolve(publicDir, asset);
  assert(path.startsWith(publicDir + sep) && statSync(path, {throwIfNoEntry: false})?.isFile(), `Missing public asset: ${asset}`);
}

function checkClip({asset, at, duration, gain}, availableFrames, name) {
  checkAsset(asset);
  assert(isFrame(at) && isFrame(duration) && duration > 0 && at + duration <= availableFrames, `Invalid timing for ${name}`);
  assert(Number.isFinite(gain) && gain >= 0 && gain <= 1, `Invalid gain for ${name}`);
}

const compositionIds = new Set();
for (const entry of readdirSync(episodeDir, {withFileTypes: true})) {
  const directory = join(episodeDir, entry.name);
  const manifest = join(directory, "manifest.json");
  if (!entry.isDirectory() || !existsSync(manifest)) continue;

  const {id, duration, fps, narration, beds, scenes, captions: captionPath} = readJson(manifest);
  assert(/^[a-zA-Z0-9-]+$/.test(id) && !compositionIds.has(id), `Invalid or duplicate composition id: ${id}`);
  compositionIds.add(id);
  assert(isFrame(duration) && duration > 0 && isFrame(fps) && fps > 0, `Invalid duration or fps: ${id}`);
  assert(scenes[0]?.at === 0, `${id} must start with a scene at frame zero`);
  checkClip(narration, duration, "narration");

  const sceneIds = new Set();
  for (const [index, scene] of scenes.entries()) {
    const sceneDuration = (scenes[index + 1]?.at ?? duration) - scene.at;
    assert(isFrame(scene.at) && sceneDuration > 0, `Scenes must be in ascending order: ${scene.id}`);
    assert(scene.id && !sceneIds.has(scene.id), `Duplicate or missing scene id: ${scene.id}`);
    sceneIds.add(scene.id);
    checkAsset(scene.plate);
    for (const layer of scene.layers ?? []) checkAsset(layer.asset);
    for (const cue of scene.cues ?? []) {
      assert(cue.at < sceneDuration, `Cue starts outside its scene: ${scene.id}/${cue.name}`);
      checkClip(cue, duration - scene.at, `${scene.id}/${cue.name}`);
    }
  }
  for (const bed of beds) {
    checkClip(bed, duration, bed.name);
    assert(isFrame(bed.fadeIn) && isFrame(bed.fadeOut) && bed.fadeIn + bed.fadeOut <= bed.duration, `Invalid fades: ${bed.name}`);
  }

  assert(/^[\w-]+\.json$/.test(captionPath), `Captions must be JSON in the episode folder: ${id}`);
  const captions = readJson(join(directory, captionPath));
  let previousEnd = 0;
  for (const {text, startMs, endMs, emphasis} of captions) {
    assert(typeof text === "string" && text.trim(), `Empty caption: ${id}`);
    assert(Number.isFinite(startMs) && startMs >= previousEnd && endMs > startMs && endMs <= narration.duration * 1000 / fps, `Invalid caption timing: ${text}`);
    assert(emphasis === undefined || (emphasis.length > 0 && text.includes(emphasis)), `Invalid caption emphasis: ${text}`);
    previousEnd = endMs;
  }

  console.log(`${id}: ${scenes.length} scenes, ${captions.length} captions, ${duration} frames`);
}
assert(compositionIds.size > 0, "No episode manifests found");
