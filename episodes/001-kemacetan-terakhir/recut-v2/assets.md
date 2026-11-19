# Assets · version 2 recut

- **Narration:** `public/assets/kemacetan-terakhir/narration-recut-120.wav`, created from the owner-supplied `narration.mp3` by `ffmpeg -n -i public/assets/kemacetan-terakhir/narration.mp3 -af atempo=1.2 -c:a pcm_s16le public/assets/kemacetan-terakhir/narration-recut-120.wav`. It is 69.112 seconds. The original remains unchanged. Voice and release rights remain as recorded in [the episode asset ledger](../assets.md).
- **Raster art:** Reuses the existing illustrated plates described in [the episode asset ledger](../assets.md), except the photographed supplies plate is omitted. The supply card is editable SVG/React-style markup. The previously layered driver shots use existing baked plates in the recut because the prototype mask did not convincingly establish seat contact. The engine also supports separately authored alpha foreground art for future masked shots; the white `seat-occluder.png` is a test matte, not final colored foreground art.
- **Sound:** Existing local effects and ambience under `public/sfx/`, with credit and license details in [LICENSES.md](../../../public/sfx/LICENSES.md). Cues were retimed to the recut.
- **Caption font:** `public/fonts/theboldfont.ttf`, copied with `theboldfont-license.rtf` from the local parent project. The included notice says the font is free to use; verify distribution and release rights before publishing.
- **Graphics and grain:** Original Remotion markup in `src/components/hud/` and the frame-driven noise filter in `src/components/RasterScene.tsx`.

The source model, sound and voice permissions are not asserted to be cleared for release. No new voice, generated illustration or third-party soundtrack was added.
