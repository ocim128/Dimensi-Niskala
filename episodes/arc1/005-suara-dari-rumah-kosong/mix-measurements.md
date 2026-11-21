# Episode 005 — assembly and mix measurements

## Post-audit caption revision — current export

`out/ep005-suara-dari-rumah-kosong-caption-revision.mp4` is the current file; the earlier export below is retained. The new MP4 stream-copies the video from `out/ep005-suara-dari-rumah-kosong-caption-revision-v2-video.mp4` and the mastered AAC from `out/ep005-suara-dari-rumah-kosong.mp4`. All **3,457 AAC packets**, their PTS/DTS/durations and SHA-256 packet hashes match; both ffprobe packet-list comparisons have SHA-256 `084c26b3eb46db1b743e58ada36b91c43cf387fee8e53cfd61ecd41c1d7a5cbe`. Both streams start at 0, report 73.800 s, and video has 2,214 frames at 30 fps. As the audit noted, decoded AAC is approximately 73.728 s, with the shortfall within the black tail.

Fresh EBU R128 measurement: **−14.0 LUFS integrated, −1.5 dBTP**, LRA 3.5 LU. In `verification/caption-revision-mix-48k.wav`, the last sample above −60 dBFS before the strike is 72.499979 s, and the first stinger sample above −60 dBFS is 72.633333 s: **133.354 ms vacuum**. Video frame **2179** presents at **72.633333 s**, yielding **0.000 ms audio-minus-video**. Black starts at frame 2206, 73.533333 s. Audio was not re-encoded or retimed.

The processed whisper file's first principal onset is approximately 0.401 s after its 68.500 s start; the second is approximately 2.334 s after the same start. The caption beats begin at 68.900 and 70.833 s respectively. These waveform observations complement provisional ASR timing; they do not establish word-by-word intelligibility or substitute for listening.

Reproduce by running `node episodes/005-suara-dari-rumah-kosong/build-assembly.cjs` and `npm run check`, then render a new silent video with `npx remotion render src/index.ts Arc01Episode05 <new-video.mp4> --codec h264 --concurrency 4 --muted`. Mux that video and the retained earlier master's AAC using FFmpeg `-map 0:v:0 -map 1:a:0 -c copy` into a new file. Recheck caption frames, packet equality, loudness, decoded stinger onset and flash PTS after rebuilding.

## Original export measurements — retained history

`Arc01Episode05`, `out/ep005-suara-dari-rumah-kosong.mp4`: 1080 × 1920, 30 fps, 2,214 frames, 73.800 seconds. Both MP4 streams start at 0 and are 73.800 seconds long.

- FFmpeg EBU R128 on the final AAC: **−14.0 LUFS integrated, −1.5 dBTP**, LRA 3.5 LU. This is a measurement, not a listening review.
- Final AAC decoded to `verification/final-mix-48k.wav`. True peak in the 0–68.5 s narrator-plus-effects window is −1.5 dBTP; the isolated 72.633–73.533 s stinger window is −5.3 dBTP, **−3.8 dB relative**. The first measurement includes ambience and effects, so it is not an isolated narration-stem peak.
- The same plea derivative starts at 0.000 s and every 4.500 s thereafter; it is hard-cut at 58.667 s during “berhenti.” No separate cue accents the house-window clue. Vibration begins 51.300 s; three glass taps begin 61.500, 61.750 and 62.000 s. The replacement whisper clip begins 68.500 s; its waveform rises above −40 dBFS at approximately 68.901 s and falls below that threshold at approximately 72.473 s. The prior Investigator quote is cut at 68.500 s, in a detected quiet interval; the original prepared MP3 remains intact. Word boundaries from ASR and the join are provisional until heard.
- Ambience and tension bed stop at 72.500 s. The 72.500–72.633 s vacuum has −74.18 dBFS RMS and −60.48 dBFS sample peak after AAC decoding. The first flash is **frame 2179**, exported presentation timestamp **72.633333 s**. In the decoded AAC, the first sample exceeding −60 dBFS after 72.500 s is **72.633333 s**: audio minus video **0.000 ms**; at −40 dBFS it is 72.633438 s, +0.104 ms. AAC priming is accounted for by decoding the exported stream, whose presentation start is zero. Black begins frame 2206 at 73.533333 s and lasts eight frames (0.267 s). From the whisper's approximate −40 dBFS ending to the cut is 1.327 s.
- The prepared MP3's 3,015 audio packets have no PTS discontinuity above 0.1 ms. The working PCM was generated with sample-count timestamps and silent padding; SFX are PCM WAVs. ASR estimates and waveform thresholds do not establish intelligibility or artistic quality.

## Reproduction and mastering

`node episodes/005-suara-dari-rumah-kosong/build-assembly.cjs`, `npm run check`, then `npx remotion render src/index.ts Arc01Episode05 <new-premaster.mp4> --codec h264 --concurrency 4`. The served narration derivative was created from the existing prepared MP3 using `atrim=end=68.5,asetpts=N/SR/TB,apad=whole_dur=72.566667,atrim=duration=72.566667`; no speed change. The derivative and voice sources are retained. Use new output names to preserve existing artifacts.

Loudnorm first pass on `out/ep005-suara-dari-rumah-kosong-premaster-v3.mp4`: I −13.62, TP −0.33, LRA 4.00, threshold −24.43, target offset +0.27. The final export stream-copies video and uses `loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-13.62:measured_TP=-0.33:measured_LRA=4.00:measured_thresh=-24.43:offset=0.27:linear=false`, AAC 256 kb/s at 48 kHz and 73.8 s. Re-measure loudness and sync after any change.
