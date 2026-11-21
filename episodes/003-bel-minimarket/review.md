# Episode 003 — assembler review, 21 November 2026

Verdict: **ready for independent QA**, not publication approval. Owner accepts the prepared Investigator narrator automatically; no listening review is implied. Composition `Arc01Episode03` uses the Remotion project at repository root, `manifest.json`, `captions.json`, the matching public asset batch and the shared fonts and sound library. Source narration, remapped timestamps and edit map remain in this episode folder.

## Story and experience

- **Pass, assembly evidence:** the first panel shows the survivor at the store; the first caption states the emergency and the `JAUHI PINTU DEPAN` graphic supplies the rule during the opening. ASR estimates the spoken rule ends at 3.68 s; it has not been checked by listening.
- **Pass, continuity data:** clock 05:30 to 05:40, water 40% to 100%, battery 48% to 45%. Panel 6 carries the reflection without an SFX accent. The revised owner-approved final panel shows the doorway lunge.
- **Not checked:** first-viewer comprehension, real-time character acting and whether each visual change reads clearly on a phone. There is no independent viewer feedback.

## Picture, sound and accessibility

- **Pass, sampled stills:** see `verification/` for cover, entry and exit inventory, refrigerator, flash-frame jolt and blackout. The supply cards are placed clear of the sampled faces. The title is within the centered 3:4 crop; a real platform profile preview has not been checked.
- **Pass, timeline inspection:** captions use the approved script's spellings, with `REST`, `MINIMARKET`, `KRAT` and `SENTER` normalized. `ketas` and `disamping` were split with estimated midpoints. Beats of up to four words use the existing spaced-word caption component. The ASR report flags three chunks; alignment, pronunciation, edits, and full caption sync are not verified by listening.
- **Pass, cue placement:** exterior chime 55.600 s, creak 63.100 s, riser 67.833–71.600 s, jolt 71.833–72.733 s, black 72.733–73.000 s. The remapped final-word end at 71.576 s underestimates the waveform: decoded narration has substantial signal through approximately 71.66 s. The jolt follows the 71.666 s file end by 167 ms; waveform inspection, not listening, supports that boundary. No accented cue on the refrigerator.
- **Not checked:** full export played at normal speed, transitions in motion, subjective narration intelligibility, chime character, creak realism, sound-effect balance and flash comfort. Independent QA should listen and inspect the complete finished cut, including all scene boundaries and the 270 × 480 crop.

## Technical, rights and delivery

- **Pass:** 1080 × 1920, 30 fps, 2190 video frames; asset and caption validation, TypeScript, and validator tests via `npm run check`. Earlier comparison manifests emit existing duplicate-image/duration warnings.
- **Pass for attribution record, not publication clearance:** `asset-rights.md`, `audio-handoff.md` and `public/sfx/LICENSES.md` identify sources and the required CC BY credit. Voice, generated art account terms, and font publication rights need independent verification. No current platform disclosure review or platform preview was requested.
- **Reproduction:** `node episodes/003-bel-minimarket/build-assembly.cjs`, then `npx remotion render src/index.ts Arc01Episode03 out/ep003-bel-minimarket-premaster-v3.mp4 --codec h264 --concurrency 4`. Reproduction uses the existing local assets and requires a fresh destination because overwrite is disabled. The final MP4 additionally receives the documented FFmpeg loudness pass in `mix-measurements.md`.
- **Owner / viewer feedback:** no feedback on this assembled cut and no independent viewer result available. Owner acceptance of the narrator is not evidence of listening.



## Panel 10 reassembly — 21 November 2026

- **Render ready for independent QA:** `Arc01Episode03`, `out/ep003-bel-minimarket.mp4`, 2193 frames at 30 fps, 1080 × 1920, 73.100 s of video. The prior export is preserved at `out/ep003-bel-minimarket-before-panel10-revision.mp4`.
- **Revised shot:** frame 1866 (62.200 s) through frame 2157 uses the revised Panel 10; frame 2158 remains the first jolt/flash frame and frame 2185 begins the 8-frame blackout. Selected stills are in `verification/reassembled-*.png`. The unchanged chiller reflection retains no cue accent.
- **Preservation:** FFmpeg frame hashes show all 1866 frames before the reveal are pixel-identical to the previous export. The replacement and transition were rendered from the existing composition; the 27 jolt frames were re-encoded but retain the prior artwork and effect timing (measured average PSNR 46.0 dB versus the previous jolt). The 8 black frames are pixel-identical. All 3424 AAC packets, including timestamps and durations, match the previous export exactly, preserving the narration, captions' audio alignment, bell, creak, riser and mastered stinger.
- **Audio measurement:** final FFmpeg EBU R128 integrated −14.0 LUFS, true peak −1.5 dBTP. Existing presentation timestamps and frame-2158 strike synchronization are preserved with the copied audio stream.
- **Reproduction method:** preserve the previous MP4; render `npx remotion render src/index.ts Arc01Episode03 <new-tail.mp4> --codec h264 --concurrency 4 --frames 1866-2192`; stream-copy the first 1866 frames from the preserved MP4, concatenate them with the rendered tail, and mux the preserved MP4's AAC audio stream without re-encoding. Because the approved render contains B-frames, verify frame counts and frame hashes rather than assuming an arbitrary stream-copy seek lands precisely on a frame. The Remotion composition alone does not reproduce the previously mastered, timestamped export.
- **Limitations:** representative stills were inspected; full normal-speed playback, listening, phone-size platform preview and independent QA remain unperformed. The prior owner's approval of other episode material does not constitute approval of this revised cut.
