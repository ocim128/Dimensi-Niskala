# Survival Fantasy Content

A standalone Remotion project for illustrated Indonesian survival-fantasy shorts. The first composition is *Kemacetan Terakhir* at 1080 × 1920, 30 fps and 84.8 seconds.

## Preview and check

From this directory, use Node 22.13 or newer in the Node 22 line, or another version listed in `package.json`.

```powershell
npm ci
npm run dev
npm run check
npm run build
```

Open `KemacetanTerakhirMotionComic` in Studio. Use the composition props to toggle sound or captions for review. The terminal prints the Studio URL.

Use Studio’s Render button or the following command to export an approved cut.

```powershell
npx remotion render src/index.ts KemacetanTerakhirMotionComic out/kemacetan-terakhir.mp4
```

## Add an episode

1. Copy [Episode 001’s manifest](episodes/001-kemacetan-terakhir/manifest.json) and [caption JSON](episodes/001-kemacetan-terakhir/captions.json) into a new episode directory. Use a unique composition ID.
2. Put raster plates, transparent poses and the clean narration under `public/assets/<episode>/`. Reuse [the shared foley library](public/sfx/LICENSES.md). Keep the [brief and review](templates/) with the episode, alongside the script and asset sources.
3. Import the manifest and captions in [`src/Root.tsx`](src/Root.tsx). Follow Episode 001’s registration and keep the composition ID in sync with the manifest. The same scene, caption and audio components assemble the episode.
4. Run `npm run check`, then preview the whole cut in Studio. Verify the opening, major choices and final reveal at phone size, then check narration, captions and audio cues together.

Manifest media paths are relative to `public/`. A scene starts at its `at` frame and ends at the next scene or the composition’s `duration`. Camera positions use composition pixels, and transparent layer positions and widths use percentages. Scene cue offsets are local to the scene. Narration and ambience start on the composition timeline. Captions use milliseconds relative to the narration start. The [style guide](STYLE_GUIDE.md) covers artwork, voice and review.

[Episode 001](episodes/001-kemacetan-terakhir/brief.md) includes the script, asset record and review. Earlier attempts are retained with the episode. The [earlier playbook and decision history](archive/playbook/experiments.md) document the parent-based workflow.
