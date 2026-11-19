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
