# Attempt 05 assets and rights

| Asset | Source and status |
| --- | --- |
| [Clean narration](narration-jejak.mp3) | Generated locally from [the Indonesian script](narasi.txt) with ShortZ’s VoxCPM2 worker and **Jejak** (`jejak`, preset seed 707). MP3, 48 kHz mono, 70.500 seconds. Voice and publication rights remain open. SHA-256 `653B812BC85DB8B8D927B7C56AAEFC353260FE5EFAE86F05681099C1C4AE94DA`. |
| Side-glass knocks and rear knock | Use `public/sfx/glass-tick.wav` (rubberduck, CC0) for two bright side-window taps and `public/sfx/glass-knock.wav` (dklon, CC BY 3.0) for the single duller knock behind the seat. [Sources and required credit](../../../public/sfx/LICENSES.md) |
| Raster replacements | Agent 2 will author or reframe anonymous POV shots in the existing illustrated look. Record new files, prompts, tools and usage rights here during the build. [Earlier illustration sources](../assets.md) |
| Comparison | Use the [owner-closed Attempt 04 render](../../../out/KemacetanTerakhirMotionComicRecut-balanced.mp4) to compare point of view and sound. |

Generate each spoken paragraph separately in ShortZ from a UTF-8 text file. Use the CLI below from the ShortZ repo and place the clips on the [timing grid](script-id.md). Preserve the gaps during mix assembly.

```powershell
pnpm cli tts --voice jejak --text-file "take-1.txt" --output "take-1.mp3"
```

For this draft, FFmpeg placed the seven takes at the listed offsets, attenuated the joined narration by 3 dB, and padded the voice track to 70.500 seconds. There was no speed change. The output was encoded with `libmp3lame -q:a 2`.

## Builder assets · 19 November 2026

- The supplied master is copied byte-for-byte to `public/assets/kemacetan-terakhir/attempt-05/narration-jejak.mp3`; SHA-256 matches the original above. It plays at normal speed. The timeline applies gain 0.9; the master itself is untouched.
- Two new four-panel illustration atlases and an edited opening plate were made with the built-in image-generation tool. [Source images and complete prompts](sources/prompts.md); model version not exposed. Six selected 512 × 768 WebP crops and the selected opening PNG are served from `public/assets/kemacetan-terakhir/attempt-05/`. The initial, more realistic opening crop and unused empty-headrest option are retained there but not used in the composition. The generated art retains an anonymous viewer and an olive sleeve in hand inserts. Verify usage and publication rights before release.
- Reused existing anonymous plates: `handle.webp`, `lock.webp`, `tollway-panic.webp`, `boots.webp`, `window-shadow.webp`, `empty-window.webp`, `night-traffic.webp`, `clock.webp` and `rear-passenger.webp`. Their earlier provenance is in [the episode asset ledger](../assets.md). The visible passenger is the supporting infected character, not the viewer.
- Audio uses existing `traffic-bed`, `engine-idle`, `sub-drone`, `night-air`, `tension-rise`, `door-lock`, `body-fall`, `coat-shift`, `ignition-click`, `console-switch`, `shoe-left`, `shoe-right`, `glass-tick`, `glass-knock` and `metal-resonance` from [the shared ledger](../../../public/sfx/LICENSES.md). The dklon CC BY 3.0 credit in that ledger applies to the used `glass-knock`, `body-fall` and `coat-shift` excerpts.
- The narrator-solo WAV, effects-solo WAV and full-mix WAV in this folder are local review artifacts, not new narration masters or an MP4 export. The latter two are the `-v2` files after the knock gain was raised; the earlier WAVs are retained for comparison. [Objective audio measurements](audio-review-measurements-v2.json) are described in [review.md](review.md).
