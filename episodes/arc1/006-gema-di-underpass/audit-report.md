# Episode 006 ? post-MP4 re-audit, 21 November 2026

**Verdict: PASS WITH NOTES** for `out/ep006-gema-di-underpass-knock-revision.mp4`. The previous knock-overlap blocker is resolved by the current timing. The human orchestrator records `audit: pass` and carries forward the unchecked items. This verdict is not publication authorization; no pipeline state or production artifact was edited by this auditor.

## Resolution and measured gates

- **Earlier blocker resolved:** The accepted narration and working PCM end at **71.745 s**. The revised manifest schedules the first, second and third knocks at **71.766667, 71.866667 and 71.966667 s**, all after the entire narration file ends. In independently decoded final AAC, three local peaks occur at **71.768354, 71.868354 and 71.968354 s** (approximately ?11.52, ?11.13 and ?11.08 dBFS). These show separate waveform transients; they do not establish that the fast 100 ms-spaced taps sound distinct by ear.
- **Flash, vacuum and loudness:** The exported visual remains frame **2165 / 72.166667 s** for the first flash; the first stinger sample above ?60 dBFS in independently decoded AAC is at **72.166667 s**, audio-minus-video **0.000 ms** (? ?33 ms). The last pre-sting sample above ?60 dBFS is **72.033312 s**, for approximately **133.4 ms** near-silence after the taps (required 120?180 ms). Independent FFmpeg EBU R128 gives **?14.0 LUFS integrated / ?1.3 dBTP** (limit ? ?1.0 dBTP).
- **Picture and delivery:** The revised and original 006 exports have the same 2,192 video packets including PTS, DTS, durations and SHA-256 data hashes; the visual findings from the previous post-MP4 audit therefore still apply to the revised picture. Current video is 1080 ? 1920, 30 fps, 2,192 frames / **73.066667 s**; video and AAC streams report start 0. The first flash is frame 2165 and black starts at frame 2186. Video end is **1.322 s after the entire narration file ends**. No source speech speed change is claimed.
- **Script and automated checks:** Script and captions each contain **121 normalized words in the same order**. `npm run check` passed **24/24 tests**; warnings concern older comparison cuts. Caption text equality is not proof of audible synchronization.

## Notes and review limits

The new timing clears the entire non-silent narration source before the first tap; it does not depend on the provisional ASR word-end estimate. The fixed illustration shows the girl's knuckles at the glass and the shadow clue; continuous animation is not independently required by the QA rubric. The three rapid taps' sound, the final spoken release, spatial separation of footsteps, full narration and caption sync remain unverified without listening. The current MP4's audio was decoded independently; the unchanged video was checked by packet hashes and the previously sampled exported frames. No full normal-speed playback, first-viewer test or platform preview was performed. Owner acceptance of Investigator does not imply a listening review.

**Human listening:** Check the final spoken release and the three rapid glass knocks, footsteps, narration edits, captions and complete mix in context.<br>
**Rights and release:** Verify voice/image and font terms, CC BY effect attribution, platform disclosure and explicit publication authorization.

---

## Previous audit of the earlier export ? historical and superseded for the knock timing

# Episode 006 ? independent post-MP4 audit, 21 November 2026

**Verdict: FAIL ? the mandatory post-speech knock timing is not established.** Agent 04 must resolve the overlap described below and deliver a rechecked export for a fresh independent audit. The human orchestrator records the verdict in pipeline state. This review changed no audio, pictures, render or state.

## Blocking finding

**Agent 04 ? first glass knock overlaps the non-silent end of the prepared narration; its placement after the spoken phrase remains unverified.** The brief requires three glass knocks **after** ?mengetuk kaca tiga kali,? without masking the narrator. The ASR sidecar estimates the final word ends at 71.595 s, but that estimate is provisional. The first knock is scheduled at **71.633333 s** (frame 2149); the prepared narration continues until **71.745 s**, and independent decoding finds source peaks above ?40 dBFS as late as **71.736625 s**. Thus the first cue starts approximately **112 ms before the narration file ends**, with substantial narration-source signal still present. The finished AAC has a transient in the 71.63?71.64 s window, consistent with that cue. These measurements establish overlap with the non-silent source, not whether every late sample is speech: a final consonant, breath or reverb cannot be distinguished reliably here without listening. Do not present the 71.595 s ASR estimate as proof that the required post-speech placement is satisfied.

Agent 04 should determine the actual last spoken release against the prepared source and final mix, then move the first knock after that release if needed and verify three distinct glass knocks, intelligibility, post-foley vacuum, stinger sync and the 1.0?1.5 s tail on the revised MP4. Preserve the accepted narration and speed. If verification demonstrates the existing placement already follows the spoken release, document that evidence and retain it; an unperformed listening review must not be claimed. Re-measure the exported AAC after any change.

## Measurements and completed checks

- **Export:** `out/ep006-gema-di-underpass.mp4`, `Arc01Episode06`: H.264 1080 ? 1920, 30 fps, 2,192 frames, 73.066667 s video; AAC stream 73.066 s. Both stream starts are reported at zero. The initial AAC packet has PTS ?0.021333 s with 1,024 skip samples; the decoded PCM measurements account for that priming and are on the video presentation timeline. The last approximately 21 ms of decoded audio falls in the black tail.
- **Flash and stinger:** Independently decoded frame **2164 at 72.133333 s** still shows the glass reveal; frame **2165 at 72.166667 s** is the first jolt/flash. Final AAC first exceeds ?60 dBFS in the stinger window at **72.166688 s**, audio-minus-video **+0.021 ms**, within ?33 ms. The last sample above ?60 dBFS before it is at **72.033333 s**, yielding approximately **133.4 ms** of near-silence after the knock/riser tail and before the stinger, within 120?180 ms. This interval is after the three scheduled knocks; the first knock's relationship to speech remains the blocker above.
- **Ending and loudness:** Jolt lasts 21 frames (0.700 s), and black starts at frame 2186 (72.866667 s) for six frames (0.200 s). End minus the ASR-estimated final-word boundary is 1.472 s; the actual speech release remains unverified. Independent EBU R128 analysis of the final AAC reports **?14.0 LUFS integrated and ?1.4 dBTP**, meeting the ? ?1.0 dBTP limit. The assembler's relative peak comparison uses a narration-plus-effects window, not an isolated narration stem.
- **Script/captions and voice:** A normalized comparison finds 121 approved script words and 121 caption words in the same order without substitutions. The final caption uses the script spelling; ASR word timings and the split `Di lorong` boundary are provisional. Independent decoding of the prepared MP3 and served 48 kHz WAV gives equal 71.745 s sample length and a peak difference of approximately 1.53 ? 10??, consistent with a PCM conversion and no speed change. Owner acceptance of the Investigator narrator is not a listening review.
- **Cover and continuity:** Exported frame 6 (00:00.2) shows `ATURAN TEROWONGAN GELAP` and the rule callout in the upper portion of the centered 3:4 crop; title implementation schedules 0?1.8 s. Entry HUD specifies water 15% and battery 3%; exit HUD specifies water 15% and battery 0%, with `HARI 4 ? 22:00` and `22:12`. In sampled frames the HUD does not cover a face. Continuous caption sync and platform UI remain unverified.
- **Five visual checks, sampled from the actual MP4:** (1) The repeated wet corridor, stair alcove, glass station entrance and green lighting give a consistent setting; reveal and jolt show the same teen behind glass, although the tight jolt crop limits architectural comparison. (2) Wide shots show the survivor with plausible anatomy; panel 06 is a deliberate floor/boots insert and the reveal/jolt crop the lower doorway. (3) Panel 09 shows the survivor at the alcove; panel 10 cuts closer along the corridor toward the station glass. Actual transition feel needs playback. (4) The teen's raised knuckles meet the glass in panel 10, and the head-and-shoulder shadow is visible at the edge of the flashlight pool in the 30 s sample. (5) The reveal sign reads `PINTU KELUAR`, and sampled alcove signage reads `TANGGA DARURAT`; check final platform readability. Locked hair, clothing and the teen's mismatched eyes are recognizable in the sampled frames. No vehicle is shown, so RHD and traffic direction are not applicable.
- **Static-panel treatment:** Agent 04 marked render fail because the stills do not show a shadow stopping late or three separate hand movements. Under the current QA severity rubric, static WebP panels and camera movement are the intended format; missing continuous animation alone is not a blocker. The still shadow, visible fist and three separate scheduled cues are evidence of the intended beats, but delayed-shadow timing and the taps' audible character remain unverified without real-time playback. Do not create extra poses solely to satisfy a requirement for continuous motion.
- **Other cue evidence:** The manifest schedules the survivor's last footstep at 48.7 s and six second-footstep cues from 53.0?58.5 s; there is no dedicated accent on the shadow. This is timeline evidence rather than a listening judgment that two sets and their spatial progression are perceptually distinct.
- **Automated checks:** `npm run check` passed TypeScript, episode validation and **23/23 tests**. Existing warnings concern comparison cuts. These checks do not establish timing by ear or visual comprehension.

## Review limits and retest

This assessment compared the approved brief, script, timestamps, edit map, manifest, captions, locked sheets, contact sheet, asset records and assembler review. It sampled decoded exported frames across all ten panels, the final reveal, jolt and black, rather than playing the whole film continuously. No listening, full normal-speed playback, first-viewer test or actual platform preview was available. Caption-to-speech synchronization, exact final word release, tap intelligibility, mix balance, motion comfort and subjective impact remain unchecked. An accepted voice is not evidence of listening.

Resolve the blocker, remeasure the final file if changed, and send the cut for a fresh independent post-MP4 audit. The orchestrator should record `audit: fail` and route the verification or correction to Agent 04; no publication is authorized by this report.

**Human listening:** Verify the final spoken release relative to all three taps, the independent footsteps and echoes, caption sync, source edit joins, stinger and full mix.<br>
**Rights and release:** Verify generated image and voice terms, required CC BY effect attribution, platform disclosure and explicit publication authorization.

---

## Earlier image-stage advisory audits ? historical

# Re-audit ? 21 November 2026

**Advisory still-image result: PASS WITH NOTES.** The prior panel 06 and 10 image findings below are superseded by this recheck. This is not a post-MP4 verdict and does not change pipeline state.

- **Resolved:** Revised panel 06 shows a distinguishable head-and-shoulder shadow at the edge of the flashlight pool at contact-sheet scale. Revised panel 10 places the teen's raised knuckles against the glass above the crossbar; `PINTU KELUAR` remains correctly spelled. The teen and doorway remain recognizable against the following jolt still.
- **Notes for Agent 04:** A single shadow still cannot establish that it stops later than the survivor; stage the beat without a special audio or visual accent. A single fist pose cannot establish three discrete knocks; align the separate three-knock cue to the pictured event and keep the cue-sheet timing, speech and tail requirements. Verify the 09 ? 10 sightline and reveal ? jolt continuity in the exported cut.

**Review scope:** The revised contact sheet for each episode, critical full-size revised panels, brief, prior audit, recorded retries and pipeline state were compared. Each batch contains 11 unique 1080 ? 1920 panel files. No MP4, manifest or captions were found for these episodes: cover, final SFX, actual cuts, caption/HUD parity, jolt synchronization, vacuum, true peak and normal-speed playback remain unchecked. `npm run check` passed all 22 tests, but does not validate these unregistered future compositions. The prepared Investigator narration is owner-accepted without a claimed listening review. A separate independent post-MP4 audit remains required.

**Human listening:** Narration, effects, caption sync and final mix remain unchecked.<br>
**Rights and release:** Voice, generated-image and other applicable rights, and publication authorization, remain for the orchestrator.

---

## Earlier advisory audit ? historical; superseded where stated above

# Episode 006 ? Agent 03 advisory image audit, 21 November 2026

**Image-stage assessment: FAIL / not ready for a passing image handoff.** This is an assessment of the selected stills, not a post-render verdict.

## Scope and checks

This is the owner's requested **early Agent 03 image-stage review**, not the independent post-MP4 gate. No episode MP4, manifest or captions were found; consequently the exported-pixel, sound, 00:00.2 cover, caption/HUD, ?1-frame jolt sync, 120?180 ms vacuum and true-peak gates are **not checked**. Do not enter this advisory result as a final `audit` verdict. `npm run check` passed (22 tests); it does not validate these as-yet-unregistered episodes. The locked driver and teen sheets, episode brief and script, selected contact sheet, selected critical images, generation record and pipeline state were reviewed. Each batch has ten distinct 1080 ? 1920 WebP panels plus a distinct jolt, verified by SHA-256. Prepared narration, timestamps and edit map exist; owner acceptance does not imply listening.

## Findings and routing

1. **Agent 03 ? panel 06, second-shadow clue:** At phone-size contact-sheet scale the small dark form at the flashlight edge is not reliably identifiable as a second person's shadow; even in the enlarged image it is ambiguous against the wet floor. Correct the shadow so it is distinguishable from floor texture while remaining unaccented and preserving the intended one-beat-late stop for assembly. The source record states that 2/2 retries have been used; route a directed correction through the orchestrator.
2. **Agent 03 ? panel 10, narrated glass knock:** The girl's fingers rest on the horizontal metal crossbar; clear hand-to-glass contact is absent. The script and cue sheet specifically call for three knocks on glass. Provide a view or compatible additional pose that clearly places the hand on the glass on the correct side while retaining the sign, doorway, vantage and identity. The selected jolt should remain continuous with that geometry. Panel 10 has exhausted its recorded 2/2 retries. Agent 04 must subsequently time the separate three-knock foley against the pictured event and final speech; a still cannot prove three discrete impacts.

## Five checks and assembly handoff

- **Set/props:** Repeating wet corridor, columns, emergency stair and green exit sign give a consistent setting. Reveal and jolt share the girl and glass; the closer jolt crop limits exact frame comparison.
- **Scale/anatomy:** Wide 01 and 07 show the survivor's full body; floor-only 06 is a deliberate POV insert. No additional clear stretched-arm defect was established in the selected contact sheet.
- **Vantage:** 09 establishes the survivor near the stair alcove; 10 changes to a much closer view of the distant station glass. Verify that the cut reads as her oblique sightline rather than an unexplained relocation.
- **Barrier/clue:** The critical 06 shadow and 10 hand contact fail as described. Glass continuity and the exit-door side remain for actual-cut review.
- **Text/identity:** The enlarged panel 10 visibly spells `PINTU KELUAR`; distant signage is too small to rely on in all shots. The driver and teen retain the principal locked face, hair and clothing cues. Opening/exit HUDs and exact caption numbers are assembly checks.

The cue sheet also requires distinct survivor and second footsteps, their proper stop sequence, and three separate glass knocks. Agent 04 must fit these, the vacuum, post-narration jolt and blackout into the required tail and measure the exported timing. Obtain a fresh independent post-MP4 audit. No state or artwork was edited.

**Human listening:** Final narration, effects, caption sync and mix remain unchecked; the orchestrator must arrange the final ear-check.<br>
**Rights and release:** Verify voice, generated-image and other asset rights and obtain TikTok publication authorization before release.
