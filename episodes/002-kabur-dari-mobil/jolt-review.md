# Episode 002 ? jolt recut review ? 20 November 2026

**Verdict: preview export; independent QA, normal-speed listening and upstream handoff verification remain open.** Composition `Arc01Episode02`; export `out/ep002-kabur-dari-mobil-jolt.mp4`. The silent mirror clue is untouched. Lock and cloth stand-ins begin at 67.80 s and 67.87 s; the jolt begins at 68.13 s. The stand-ins and the body-impact slam have not been confirmed by ear as a seatbelt release or vehicle slam.

## Story and experience

- **Partially checked:** Existing scene and caption assets remain; jolt stills show the intended reveal. Viewer comprehension and owner acceptance are not assessed.
- **Not checked:** Full playback, acting continuity, timing by ear and first-viewer response. No arc exit state was changed.

## Picture, sound and accessibility

- **Pass, sampled:** Cover at 00:00.2; ramp, flash, zoom and blackout frames exported in `out/jolt-verification/ep002/`. The simulated three-column profile crop is a local preview, not a TikTok platform preview. Black is encoded as black; the Episode 002 sampled PNG has 156 color-channel values of 1/255 from compression.
- **Partially checked:** Final jolt visual inspected as sampled frames. Full-speed motion, HUD/face clearance across all frames, actual platform UI and caption synchronization remain open.
- **Not checked:** Full mix and seatbelt/impact identity by listening; phone-speaker reproduction and pronunciation. The clean narration asset and captions remain unchanged.

## Technical, rights and delivery

- **Pass, measured:** 69.500 s, -14.0 LUFS integrated, -1.4 dBTP. Jolt sample peak -1.53 dBFS; average one-second narration-containing mix-window peak -2.27 dBFS, difference +0.75 dB. Windows exclude scene effects but can include ambient beds, so this is not an isolated-voice measurement. Full evidence: `out/jolt-verification/ep002/measurements.json`.
- **Pass, automated:** `npm run check` passes 22 tests; older comparison-cut warnings remain.
- **Needs work:** Voice and generated artwork publication rights are unconfirmed. The new stinger uses dklon's CC BY 3.0 body impact and requires the attribution in the shared SFX ledger. No publication is authorized.
- **Partially checked:** Current manifest and local assets are used. Rebuild dependencies: Node/Remotion, FFmpeg, Python with NumPy and Pillow. Render video; separately render WAV using `--codec=wav --bundle-cache=false` and run `python scripts/master-jolt.py`. The separate WAV rebuild avoids a cache inconsistency observed during parallel renders. The mastering script uses its named raw inputs under `out/` and overwrites this task's jolt exports and evidence.

## Final pre-publish checklist

- **Pass, sampled:** Opening cover title, unchanged HUD/caption source, impact frame and blackout.
- **Not checked:** Real TikTok three-column preview, full shot repeat and caption-safe-zone review, full-speed audio-visual review and platform disclosure.
- **Owner / independent viewer feedback:** None recorded for this recut.
