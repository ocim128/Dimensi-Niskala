# Episode 002 review · 20 November 2026

**Verdict: ready for owner preview; not yet ready to publish.** Composition `Arc01Episode02`; 1080 × 1920, 30 fps, 1,982 frames (66.07 s of video). [Preview export](../../out/episode02-kabur-dari-mobil-preview.mp4).

## Story and experience

- **Not checked:** First-time-viewer understanding of the threat, rule, choice and reveal. The script addresses the viewer directly and the current cut has twelve unique generated panels; no independent viewer response is available.
- **Needs work / review:** The prior state is shown as HARI 1 • 03:05, air 50%, battery 60% and the proposed exit state as HARI 1 • 03:20, air 40%, battery 57%. The chronology and effectiveness of the tactical sequence need a normal-speed review. No episode-2 acceptance or arc exit update has been recorded.
- **Pass, still-frame review:** At 00:48.2–00:50.7 the truck mirror contains a slightly open rear door; it receives no dedicated SFX or highlight. Its subtlety and readability at actual phone size remain a creative judgment.

## Picture, sound and accessibility

- **Partially checked:** The two locked character sheets and generated panels were compared at contact-sheet size. The phone-check panel was replaced because its first version put the driver back inside the car. Identity and style across all frames, right-hand-drive geography, hand anatomy, seat contact and full-size consistency still need complete review.
- **Not checked:** Normal-speed neutral hold, turning and escape acting; all scene boundaries and the final frame; actual TikTok UI/three-column profile preview; subtitle synchronization against the full audio.
- **Pass, sampled stills:** The 00:00.2 title is visible in the upper-center 3:4 crop; sampled 00:03 inventory shows 50% / 60%; later shots show the woman outside the car. [Phone-size contact sheet](../../out/episode02-review-stills/contact.jpg). This is not a real platform preview.
- **Partially checked:** The owner reported that the three flagged “spion,” “membentur” and “sela mobil” clips sounded correct without cut-off words. ShortZ nevertheless marked three internal chunks as failed. No full-take listening, evaluation of voice delivery, effects, music balance or final mix has been performed.
- **Needs work / review:** Word timestamps were compared with the 118-word script; the two split merged tokens use estimated subdivisions and all other word timing originates with ASR. Captions need a listening-based synchronization pass.

## Technical, rights and delivery

- **Pass, automated:** `npm run check` passed all 20 tests; `node scripts/check-episodes.mjs` accepted this 12-scene episode. Earlier episode comparison warnings remain in the full log. [Check log](../../out/episode02-check.log).
- **Pass, measured:** Encoded mix measured −14.0 LUFS integrated and −1.5 dBTP by FFmpeg ebur128. [Measurements](../../out/episode02-audio-measurements.json). The mix has not been judged by ear.
- **Needs work:** Voice and generated-art publication rights remain unconfirmed. Shared foley licenses and the required CC BY attribution are recorded in [assets.md](assets.md). The lock and cloth sounds stand in for a seatbelt release and need a listening check for recognizable sound identity.
- **Partially checked:** Sources and generation prompts are recorded in [assets.md](assets.md); the episode build script refuses to overwrite an existing manifest or captions. The output has not been played through in real time.
- **Not checked:** AI disclosure and platform-specific publication requirements; no publication was requested or performed.

## Final pre-publish checklist

- **Pass, sampled:** Opening title at 00:00.2; timing is 00:00.0–00:01.8 in the manifest.
- **Not checked:** Normal-speed shot repeats and mood continuity; real platform safe-zone clearance.
- **Partially checked:** Entry and exit HUD values match the arc's numeric states; the exit state remains provisional until acceptance.
- **Not checked:** Whether the final click and strap sound read clearly over the mix on phone speakers, or land naturally after the narration.

## Findings and feedback

- **Owner feedback:** The three isolated narration clips sounded correct. No owner verdict on the complete episode or new panels has been received.
- **Independent viewer:** Not available.
- **Self-review:** The sampled opening shows the driver and the seated girl, the middle shows the driver controlling her buckle, and the payoff shows an apparently empty back seat. The intended unlatched-buckle identity and the subtle mirror clue need a real-time, phone-size comprehension check.
- **Known limitations:** The source uses ShortZ's internal multi-chunk synthesis despite one CLI invocation; the caption timing is not ear-verified. Rights, in-context audio listening, action continuity and platform preview are unresolved.
