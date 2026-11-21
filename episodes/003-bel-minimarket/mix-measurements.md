# Episode 003 — mix and technical measurements

- `Arc01Episode03`: 2190 frames, 30 fps, 1080 × 1920, 73.000 s video and audio. Prepared narration file: 71.666 s, unchanged; the served copy has identical SHA-256 `3DFB81BBECB173C0D4AFEFCA6BC9B37E4C706BAF6CEE8B5AA2173A86D9F421B5`.
- FFmpeg `ebur128=peak=true` on the finished AAC mix: **−14.0 LUFS integrated, −1.5 dBTP**, LRA 3.4 LU. This is a measurement, not a listening review.
- Finished decoded stereo PCM: the 0–71.667 s narration-and-bed window peaks at −1.5 dBTP; the isolated 71.833–72.733 s post-narration climax window peaks at −7.3 dBTP, **−5.8 dB relative**. The first window includes quiet ambience and foley, so this is a window comparison rather than a separated narration stem measurement. The climax window has no overlapping narration or bed.
- The unchanged narration has measurable signal through about 71.66 s; ASR's final-word end of 71.576 s is optimistic. Its file ends at 71.666 s. The jolt starts at frame 2155, 71.833 s. From 71.667–71.833 s the decoded mix measures −90.3 dBFS mean and −68.0 dBFS peak: a 166 ms near-silent vacuum. Black runs from frame 2182 to 2189 inclusive (8 frames, 0.267 s).
- Cover is frame 6. Other sampled stills are in `verification/`: frame 300 entry HUD, 910 chiller, 1040 exit HUD, 2156 jolt flash, 2186 blackout. Images and narration were neither regenerated nor modified.

## Mastering procedure

Render `Arc01Episode03` to `out/ep003-bel-minimarket-premaster-v3.mp4`. FFmpeg first pass `loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json` reported input I −13.80, TP −0.89, LRA 3.70, threshold −24.65, target offset +0.09. The second pass copied video, encoded 48 kHz AAC at 256 kb/s, limited output to 73 s, and used:

`loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=-13.80:measured_TP=-0.89:measured_LRA=3.70:measured_thresh=-24.65:offset=0.09:linear=false`

Re-measure after encoding. For interval measurements, decode the finished AAC to a fresh 48 kHz stereo PCM WAV first, then use `atrim` against that WAV; MP4 timestamp offsets made direct interval measurements misleading in this environment. Asset provenance and credit are recorded in `asset-rights.md` and `public/sfx/LICENSES.md`.

## Panel 10 reassembly — 21 November 2026

Final `out/ep003-bel-minimarket.mp4` has 2193 video frames at 30 fps (73.100 s). The previously mastered AAC stream was copied from `out/ep003-bel-minimarket-before-panel10-revision.mp4`; all 3424 packets and their PTS, DTS, duration and SHA-256 packet hashes match. FFmpeg `ebur128=peak=true` on the new MP4 reports −14.0 LUFS integrated and −1.5 dBTP. Its jolt remains on frame 2158. The historical 73.000 s measurements above describe an earlier version, not this export.
