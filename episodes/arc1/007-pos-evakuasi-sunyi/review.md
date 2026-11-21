# Episode 007 — assembler review, 21 November 2026

## Revision after independent audit failure

**Current handoff:** `out/ep007-pos-evakuasi-sunyi-qa-revision.mp4`, composition `Arc01Episode07`. The prior MP4 remains at `out/ep007-pos-evakuasi-sunyi.mp4`; the audit report remains the historical FAIL on that previous file. A fresh independent post-MP4 audit is required.

- **Exit contradiction:** the existing panel 09 reframes toward the survivor and outside rail path before the word `HILANG`. Exported frame 1909 (63.633 s) and the later pre-jolt frame 2164 show the survivor and path with the station, gate and its lights outside the view. `verification/qa-revision-route-transition.jpg` samples frames 1894, 1895, 1900 and 1909; the visible red track signal belongs to the railway path, not the post. The original art and narration were not replaced. Inspect the animated move and continuing framing at normal speed.
- **Flashlight switch:** an opt-in darkened-image mask hides the baked beam on guard frames 2186–2189; it clears on frame 2190 (73.000 s), aligned with the existing click, exposing the beam and subsequent sweep. Exported `verification/qa-revision-frame-05.png` and `-06.png` show off; `-07.png` and `-08.png` show the click/on and later sweep. The guard handoff remains 12 frames (0.4 s); its darkness, readability and the transition need normal-speed independent review.
- **Technical recheck:** 2,204 frames at 30 fps; the final AAC stream has all 3,444 packets, hashes and timestamps identical to the earlier master. Fresh output measurement is −14.0 LUFS / −1.5 dBTP; decoded stinger onset is 72.166667 s, matching the first flash frame 2165 (0.000 ms). Last pre-jolt sample above −60 dBFS is 72.007854 s, giving a 158.813 ms vacuum. `npm run check` passes 23 tests. The [updated measurement record](mix-measurements.md) provides reproduction and exact limits.
- **Still unchecked:** full normal-speed playback and listening, audible click and final speech release, caption sync, the 0.4 s handoff's readability, and the platform preview. This producer review does not replace the fresh independent audit or establish publication clearance.

**Render handoff: ready for independent post-MP4 QA.** This is not an audit or publication approval. The prepared Investigator narration is owner-accepted; that acceptance does not establish a listening review. Composition `Arc01Episode07` uses the approved panels, locked narration, its captions and separately prepared world audio.

## Story and experience

- **Pass, sampled visual assembly:** the opening shows the survivor outside the marked evacuation post and the rule in the title. The spoken rule's ASR estimate ends at 3.92 s; its audible timing is not verified. The entry card shows water 15% and phone 0%; the next card shows both at 0% after the drinking panel. The final route scene shows the survivor leaving beside the tracks, with `HARI 5 • 05:12` and `ARC 01 • KELUAR JALUR`.
- **Ordering:** the narrator describes the guard before its last word, but the guard image is deliberately held until after the post-narration crowd jolt as specified. The 0.4-second night handoff has a footstep, click and animated light sweep, then blackout. Its brevity and how well this narration/picture ordering reads need normal-speed review.
- **Needs independent review:** the subtle teen clue at phone size, gate geometry, synchronized head turn, the route diagram's small labels, and legibility of the night guard and wall warning during the brief handoff. No first-time viewer or owner has reviewed this cut.

## Picture, sound and accessibility

- **Pass, sampled exported stills:** `verification/frame-01.png` is cover frame 6 (00:00.2); frames 02–08 sample inventory, the teen clue, diagram, wall, gate and exit. Frame 09 is the first post-narration flash, frames 10–11 show the guard before and during the light sweep, and frame 12 is blackout. `verification/montage-v2.jpg` presents the corresponding pre-master frames at 270 × 480; the final export stream-copies that video. The real platform profile preview and UI remain unchecked.
- **Pass, timing evidence:** the same formal PA clip repeats under the scene, and the PA and siren stop together; the crowd remains silent. The image-stage clue has no separate scare accent. The approved speech source is unchanged. ASR and cue positions are recorded in `pa-asr.json`, the manifest and `mix-measurements.md`.
- **Not checked by listening:** the full export, PA delivery and intelligibility, siren character, scrape and gate realism, guard footsteps, final-word release, voice/effects balance, narration edits, captions and sync. The siren is taken from a storm recording and its suitability requires listening. ASR and waveform analysis are not listening reviews.

## Technical, rights and handoff

- **Pass:** 73.466667 s, 1080 × 1920, 30 fps. `npm run check` passes 23 tests. The finished AAC measures −14.0 LUFS and −1.5 dBTP; the decoded stinger onset and first flash frame coincide at 72.166667 s, and the near-silent vacuum lasts 133 ms. `mix-measurements.md` records the details, reproduction and limits.
- **Recorded, not cleared for publication:** `asset-rights.md` and `public/sfx/LICENSES.md` identify sources and the required dklon CC BY credit. Generated image, generated voice and font terms remain to be verified. Platform preview, disclosure and publication were not requested or checked.
