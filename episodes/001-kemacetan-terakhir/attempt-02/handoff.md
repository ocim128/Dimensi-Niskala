# Kemacetan Terakhir V2

[Play the MP4](kemacetan-terakhir-v2.mp4) · [Review eight timestamped frames](review-frames.jpg) · [Open the composition in Studio](http://localhost:3000/KemacetanTerakhirV2)

The independent producer built the composition. Its session stopped when an audio tool returned an MP3 excerpt to a model that rejected audio input. The recovery session used the saved composition for the export. To reopen Studio later, run `npm run dev` from the parent `tiktok-video` workspace and select `KemacetanTerakhirV2` at the address Studio prints.

## Export checks

- The picture runs for 72.50 seconds, with 2,175 H.264 frames at 1080 × 1920 and 30 fps. The stereo AAC stream is 48 kHz. FFmpeg decoded both streams end to end without errors. Lint, TypeScript and the Remotion bundle passed.
- Eight frames sampled from the MP4 at 270 × 480 show the blocked highway at 1.33 s, the pursuit at 19.27 s, the pin press at 23.40 s, readable inventory at 46.27–50.20 s and the passenger inside the cabin at 70.50 s. To judge the motion, play 22.07–24.43 s for the hand and lock, then 63.33–72.07 s for the turn and reveal.
- A waveform spot check found a matching excerpt from each of the twelve clean narration takes in the encoded mix at its expected placement. Indonesian speech recognition recovered the story through the final line. Its rendering of the inventory words was uncertain. A listener should hear the passage at 42.7–51.0 s to judge “permen karet” and “enam puluh persen”. Full subjective listening, normal-speed human viewing, and first-viewer comprehension remain open.

## Source and assets

In the parent project, `src/Root.tsx` registers the composition. Scene artwork and animation are in `src/KemacetanTerakhirV2/`. The same folder contains the frame cues, caption timings and the producer's effect-generation script. The script writes the existing v2 asset filenames if rerun. The MP4 uses the retained local assets directly.

The Indonesian v4 WAVs come from `public/survival-blind/` and the caption phrases from `src/SurvivalBlind/timeline.json`. The v2 effects and generated paper texture are in `public/kemacetan-terakhir-v2/`. Caption styling requests system Arial with a sans-serif fallback. The [voice profile](../../../voice-profile.md) records the narrator settings and outstanding publication-rights review.
