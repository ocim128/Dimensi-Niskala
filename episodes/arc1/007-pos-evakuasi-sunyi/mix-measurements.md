# Episode 007 — assembly and mix measurements

## Post-audit picture revision — current export

`out/ep007-pos-evakuasi-sunyi-qa-revision.mp4` is the current file; the earlier export below is preserved. It stream-copies the video from `out/ep007-pos-evakuasi-sunyi-qa-revision-v2-video.mp4` and the already-mastered AAC from `out/ep007-pos-evakuasi-sunyi.mp4`. All **3,444 AAC packets**, their PTS/DTS/durations and SHA-256 packet data hashes match; the hash of the full ffprobe packet-list comparison is `db7f7dd8cd4a610bf9587f3098be51b080d8569b20ea62e6032945d7f6a4eaa7` for both. Both streams start at 0; video has 2,204 frames and duration 73.466667 s, audio 73.466 s.

Fresh FFmpeg EBU R128 on this export: **−14.0 LUFS integrated, −1.5 dBTP**, LRA 3.6 LU. From AAC decoded to `verification/qa-revision-mix-48k.wav`, the last sample above −60 dBFS before the strike is 72.007854 s and the first stinger sample above −60 dBFS is 72.166667 s: **158.813 ms vacuum**. Video frame **2165** presents at **72.166667 s**, so audio-minus-video offset is **0.000 ms**. Frame 2186 begins the guard handoff, frame 2190 at 73.000000 s is the click/beam reveal, and frame 2198 begins blackout. Source narration and the final AAC were not re-encoded or retimed.

Reproduction: build the manifest with `node episodes/007-pos-evakuasi-sunyi/build-assembly.cjs`, run `npm run check`, then render a new silent video using `npx remotion render src/index.ts Arc01Episode07 <new-video.mp4> --codec h264 --concurrency 4 --muted`. Mux that video with the earlier master's AAC using FFmpeg `-map 0:v:0 -map 1:a:0 -c copy` and a new output path. Recheck audio packet equality, output loudness, flash PTS and decoded stinger onset after rebuilding. The optional `lightUp.offMask` darkens the selected baked beam before the click; it does not alter scenes without this field.

## Original export measurements — retained history

`Arc01Episode07`, `out/ep007-pos-evakuasi-sunyi.mp4`: 1080 × 1920, 30 fps, 2,204 frames, 73.466667 s video. Both streams start at zero; AAC duration is 73.466 s (0.667 ms shorter than video due to mux timing).

- FFmpeg EBU R128 on final AAC: **−14.0 LUFS integrated, −1.5 dBTP**, LRA 3.6 LU. This is a technical measurement, not a listening review.
- The final AAC was decoded to `verification/final-mix-48k.wav`. The 0–72 s narration-and-world-audio window measures −1.5 dBTP, while the isolated 72.166667–72.866667 s jolt window measures −7.4 dBTP, **−5.9 dB relative**. The earlier window includes other sound, so this is not an isolated narration-stem comparison.
- Source narration is the existing 72.004 s MP3; the served copy is byte-identical (SHA-256 `594499C34BF92E5353967C3D91AC69E7DFA1E18127DB792974A67BA6A9D546D1`). Its 3,002 encoded packets show no PTS discontinuity above 0.1 ms. SFX are PCM with continuous sample timelines. The source final syllable remains measurable close to the file end; whether its ending is natural must be checked by ear, rather than inferred from ASR.
- Ambient tension stops at frame 2161 (72.033333 s). The 72.033333–72.166667 s vacuum measures −93.31 dBFS RMS and −65.7 dBFS sample peak in the decoded AAC. The first flash is **frame 2165** at exported PTS **72.166667 s**; the decoded AAC first exceeds −60 dBFS at **72.166667 s**, audio-minus-video offset **0.000 ms** (−40 dBFS threshold: +0.167 ms). Decoding the zero-start exported audio accounts for AAC priming and trim.
- The jolt lasts 21 frames (0.700 s), followed by the guard handoff at frames 2186–2197 (0.400 s). The flashlight click and start of the sweep are at handoff frame 4; blackout begins frame 2198 at 73.266667 s and lasts 6 frames (0.200 s). From the 72.004 s narration-file end to video end is 1.463 s. The two earlier steps accompany the narrated guard reference; a final footstep and click occur in the short handoff. Playback is needed to assess whether the compressed beat reads clearly.
- Identical PA file starts at 0 s and every 6.5 s until 48.0 s; the siren is hard-cut at the same frame, during “berhenti.” The gate cue begins at 49.4 s; stone scrapes begin at 41.5 and 43.033 s. The silent queue and early teen clue receive no dedicated voice or scare accent.

## Reproduction and mastering

`node episodes/007-pos-evakuasi-sunyi/build-assembly.cjs`, `npm run check`, then `npx remotion render src/index.ts Arc01Episode07 <new-premaster.mp4> --codec h264 --concurrency 4`. Preserve source files and use new output names. The shot-to-handoff engine now supports an optional `handoffSec` and a scene `lightUp` sweep; episodes without those fields retain their previous timing and rendering.

First loudnorm pass on `out/ep007-pos-evakuasi-sunyi-premaster-v2.mp4`: I −13.42, TP −0.04, LRA 3.80, threshold −24.23, offset +0.05. The final export stream-copies video and applies `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-13.42:measured_TP=-0.04:measured_LRA=3.80:measured_thresh=-24.23:offset=0.05:linear=false`, AAC 256 kb/s at 48 kHz, limited to 73.466667 s. Re-measure the finished export and flash/stinger sync after any change.
