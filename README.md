# Survival Fantasy Content

A standalone Remotion project for illustrated Indonesian survival-fantasy shorts. *Kemacetan Terakhir* has an 84.8-second comparison composition and a 70.67-second version-2 recut, both at 1080 × 1920 and 30 fps.

## Preview and check

From this directory, use Node 22.13 or newer in the Node 22 line, or another version listed in `package.json`.

```powershell
npm ci
npm run dev
npm run check
npm run build
```

Open `KemacetanTerakhirMotionComicRecut` in Studio, `KemacetanTerakhirMotionComicAlternate` for the second data-driven preview, or `KemacetanTerakhirMotionComic` for the original comparison. Use the composition props to toggle sound or captions for review. The terminal prints the Studio URL. `npm run build` runs the checks before bundling.

Use Studio’s Render button or the following command to export an approved cut.

```powershell
npx remotion render src/index.ts KemacetanTerakhirMotionComic out/kemacetan-terakhir.mp4
```

## Add an episode

1. Use [Episode 001’s version-2 manifest](episodes/001-kemacetan-terakhir/recut-v2/manifest.json) and [word-tagged captions](episodes/001-kemacetan-terakhir/recut-v2/captions.json) as examples for a new episode directory. Use a unique composition ID. The unversioned 84.8-second manifest is grandfathered only as the original comparison cut.
2. Put raster plates, transparent poses and the clean narration under `public/assets/<episode>/`. Reuse [the shared foley library](public/sfx/LICENSES.md). Keep the [brief and review](templates/) with the episode, alongside the script and asset sources.
3. Import the manifest and captions in [`src/Root.tsx`](src/Root.tsx). Follow the recut registration and keep the composition ID in sync with the manifest. Set `schemaVersion: 2`, `art.styleId` and `art.rasterAssets`, and add the script anchors required in [the engine ticket](ENGINE_UPGRADE_TICKET.md). Use baked plates or `characters: {mode: "masked", layers: [...], foreground: "..."}` with a full-plate alpha foreground. Foreground pixels are drawn after the characters and share the plate’s framing. The same scene, caption and audio components assemble the episode.
4. Run `npm run check`, then preview the whole cut in Studio. Verify the opening, major choices and final reveal at phone size, then check narration, captions and audio cues together.

Manifest media paths are relative to `public/`. A scene starts at its `at` frame and ends at the next scene or the composition’s `duration`. Camera positions use composition pixels, and transparent layer positions and widths use percentages. Scene cue offsets are local to the scene. Narration and ambience start on the composition timeline. Captions use milliseconds relative to the narration start; each caption has a `words` array, with optional `white`/`default`, `yellow`/`highlight` or `red`/`danger` color tags. HUD timing uses scene-local frames; HUD boxes and diagram points are normalized to the canvas or their enclosing box. The manifest drives timestamp badges, callouts, checklists, radar diagrams and blueprint overlays. JSON-driven HUD and caption content is edited in source. The [style guide](STYLE_GUIDE.md) covers artwork, voice and review.

[Episode 001](episodes/001-kemacetan-terakhir/brief.md) includes the script, asset record and review. Earlier attempts are retained with the episode. The [earlier playbook and decision history](archive/playbook/experiments.md) document the parent-based workflow.
