// A second, alternate edit of episode 001; shares its authorized voice and media.
// It is a reuse demonstration, not evidence of independent-episode throughput.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {resolve} from "node:path";

const episode = resolve("episodes/001-kemacetan-terakhir");
const source = resolve(episode, "recut-v2");
const target = resolve(episode, "recut-v2-alternate");
if (existsSync(target)) throw new Error(`Refusing to overwrite ${target}`);
const manifest = JSON.parse(readFileSync(resolve(source, "manifest.json"), "utf8"));
const captions = JSON.parse(readFileSync(resolve(source, "captions.json"), "utf8"));
manifest.id = "KemacetanTerakhirMotionComicAlternate";
const scene = (id) => manifest.scenes.find((s) => s.id === id);
scene("hold").plate = "assets/kemacetan-terakhir/lean.webp";
scene("hold").hud[0].text = "KELUAR = TERLIHAT";
scene("witness").at -= 6;
scene("witness").plate = "assets/kemacetan-terakhir/tollway-panic.webp";
scene("gridlock").at += 6;
scene("gridlock").hud[1].type = "blueprintOverlay";
scene("night").at += 6;
scene("turn").at -= 5;
for (const s of manifest.scenes) {
  manifest.art.rasterAssets[s.plate] = manifest.art.styleId;
  if (s.characters.mode === "masked") {
    manifest.art.rasterAssets[s.characters.foreground] = manifest.art.styleId;
    for (const layer of s.characters.layers) manifest.art.rasterAssets[layer.asset] = manifest.art.styleId;
  }
}
mkdirSync(target);
writeFileSync(resolve(target, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
writeFileSync(resolve(target, "captions.json"), JSON.stringify(captions, null, 2) + "\n");
console.log(`${manifest.id}: ${manifest.scenes.length} scenes, ${manifest.duration} frames`);
