# Episode 006 — assembler review, 21 November 2026

## Revision after independent audit

The auditor found that the first tap overlapped non-silent narration-source audio and judged the static-panel treatment acceptable for this format; the earlier request below for additional image poses is superseded. The revised export is `out/ep006-gema-di-underpass-knock-revision.mp4`. Its first tap begins at 71.766667 s, after the entire 71.745 s narration file. Three separate waveform transients, the 133 ms vacuum, flash/stinger alignment and final levels were measured; see [mix measurements](mix-measurements.md). The picture stream is unchanged. **Fresh independent post-MP4 QA and human listening remain necessary**, especially to assess whether the shorter, faster taps sound distinct and follow the final spoken release. No listening or owner approval is claimed.

The remaining observations below describe the earlier export; use the revision and measurements above for current cue timing and status.

## Story and experience

- The opening panel shows the survivor in the tunnel with her flashlight down, accompanied by `SENTER KE LANTAI` and `HARI 4 • 22:00`. The estimated end of the spoken first sentence is 3.56 seconds; the picture and callout establish the rule earlier. Actual speech timing needs listening.
- Entry card shows water 15%, phone 3%; the exit card shows water 15%, phone 0% at `HARI 4 • 22:12`. The separate flashlight is not identified as the phone battery. Final continuity remains provisional until the cut is accepted.
- The shot before the reveal shows the survivor looking back near the emergency stairs. The next shot shows the girl and glass under `PINTU KELUAR`. The change in apparent distance and resulting sightline need real-time review.
- **Needs work / assessment:** Panel 06 contains the second shadow, with no dedicated sound effect, but is a baked still. The cut cannot establish that it stops later than the survivor. Panel 10 shows knuckles against glass and three separate audible tap cues are timed to the tail, but the still does not show three separate hand movements. Do not claim those two animated actions have been demonstrated. Route any necessary additional poses to the image role and reassemble; an independent reviewer should judge whether the intended actions read from the cut.
- First-viewer understanding, animated acting and full cause-and-effect playback: **not checked**; no independent viewer feedback is available.

## Picture, sound and accessibility

- `verification/contact-review-final.jpg` samples the opening, entry and exit HUDs, shadow, reaction, reveal, jolt and blackout. The first render exposed an exit HUD over the face; it was moved left, and the revised sampled frame shows the face clear. The platform crop remains unchecked.
- Captions contain 121 words in script order, in groups of at most four. Misspelled ASR words were corrected, and `Dilorong` was split using an estimated word boundary. Alignment, pronunciation, edit joins, the three knocks and mix balance are **not checked by listening**. Owner acceptance of Investigator does not imply a listening review.
- Survivor footstep cues end as she stops; a second set continues to the front. The baked shadow has no special SFX accent. The fast three knocks, silence, stinger, flash, blackout and their fit with the final spoken word need listening and frame-by-frame examination. See `mix-measurements.md` for measured timing and technical limitations.
- Full real-time playback, final captions in sync, phone-size readability through the whole cut, and platform UI / three-column preview are **not checked**. A standalone animation model or acting test was not part of this handoff.

## Technical, rights and delivery

- `Arc01Episode06` uses the repository-root Remotion project. Manifest, word captions, audio and image paths are recorded in the episode folder; see `mix-measurements.md` for reproduction and final measurements. `npm run check` passes; older Episode 001 warnings remain.
- [Asset and rights record](asset-rights.md) and [shared sound licenses](../../public/sfx/LICENSES.md) identify sources and required dklon CC BY credit. Image-service and voice-service publication rights are not independently verified; platform disclosures were not checked.
- No full-cut listening, independent post-MP4 QA, owner review of this cut, or publication authorization is claimed. Independent viewer feedback: unavailable.

**Verdict: needs revision or independent assessment of the two baked-panel motion limitations; not a publishing approval.**
