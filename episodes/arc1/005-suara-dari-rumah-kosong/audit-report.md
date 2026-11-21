# Episode 005 ? independent post-MP4 audit, 21 November 2026

**Verdict: FAIL.** Return the caption timing issue below to Agent 04, then independently audit the revised export. The human orchestrator records the verdict in pipeline state; this review changed no captions, audio, images, render or state. The prior image-stage reviews are retained below as history.

## Blocking finding

**Agent 04 ? the caption displays the girl's whispered words before her separate voice begins.** At exported frame **2010 (01:07.000)**, the full caption `DIA BERBISIK KALAU KACA` is already visible. `DIA BERBISIK` belongs to the Investigator narrator, but `KALAU KACA` begins the girl's separately generated quote. The caption beat begins at **66.848 s**, and the actual word-caption renderer displays every word in the beat at once; the whisper asset is not scheduled until **68.500 s**. The quote therefore appears at least **1.65 s before the whisper clip even starts**. Its principal waveform onset is approximately **68.9 s**. This is an evidenced caption/speaker timing mismatch and reveals the next voice's words prematurely.

Split the narrator's `DIA BERBISIK` and the girl's `KALAU KACA` into separate caption beats, aligned to the actual source voices, and check the remaining whispered words against the final mix. Preserve the approved narration and the separate whisper; do not regenerate or rewrite the script. Re-render and verify the resulting caption frames and audio.

## Measurements and completed checks

- **Export:** `out/ep005-suara-dari-rumah-kosong.mp4`, composition `Arc01Episode05`: H.264, 1080 ? 1920, 30 fps, **2,214 frames / 73.800 s**; AAC stream reports 73.800 s. Both streams report start 0. The first AAC packet has PTS ?0.021333 s and specifies 1,024 skip samples; the decoded PCM timing below accounts for that priming. The decoded AAC contains approximately 73.728 s; the shortfall is within the final black tail.
- **Jolt and silence:** Independently decoded frame **2178 at 72.600 s** still shows the reflection; frame **2179 at 72.633333 s** is the first flash and jolt. The finished AAC first exceeds ?60 dBFS in the stinger window at **72.633333 s** (?40 dBFS at 72.633438 s), a signed audio-minus-picture offset of **0.000 ms** at the ?60 dBFS threshold, within ?33 ms. The last pre-sting sample above ?60 dBFS is at **72.499979 s**; near-silence lasts approximately **133.4 ms**, within 120?180 ms. Last audible whisper release still needs a human ear-check; the amplitude boundary alone is not an intelligibility assessment.
- **Ending and loudness:** The jolt lasts 27 frames (0.900 s); black starts at frame 2206 (73.533333 s) and lasts eight frames (0.267 s). The assembler's ?40 dBFS estimate places the whisper end near 72.473 s, approximately 1.327 s before video end. Independent FFmpeg EBU R128 measures **?14.0 LUFS integrated and ?1.5 dBTP**, within the ? ?1.0 dBTP limit. The recorded relative peak is a comparison with a narration-plus-effects window, not an isolated narrator stem.
- **Script and voice handoff:** Script and captions each contain 131 normalized tokens. The only textual differences are the intended numeric formatting of `hari kelima, pukul lima pagi` as `HARI 5, PUKUL 05:00`. The Investigator derivative ends at 68.500 s and pads the rest with silence; independent decoding shows a quiet interval at that cut. The separately sourced whisper is scheduled at 68.500 s. Existing ASR reports the intended quote, but does not prove intelligibility, voice character or edit quality. The owner-accepted prepared Investigator take is not a listening review.
- **Cue evidence:** The manifest repeats the same processed plea file at 4.5 s onset intervals and stops it at 58.667 s; vibration is scheduled at 51.3 s and three glass-knock cues at 61.500, 61.767 and 62.000 s. These are timing records, not a claim that the sounds are correctly perceived or balanced by ear. The early house-window clue has no dedicated accent in the manifest.
- **Cover, HUD and text:** Actual frame 6 (00:00.2) shows `JANGAN SAHUT SUARA ITU` in the upper portion of the centered 3:4 crop, without a flash; the component schedules the title through 1.8 s. Entry HUD specifies 14:00 / water 40% / battery 18%; exit HUD specifies 14:10 / water 40% / battery 14%. Sampled SMS overlay and captions agree on `HARI 5, PUKUL 05:00`. Sampled supply HUD frames avoid the protagonist's face. Continuous caption readability, platform UI and all-frame face clearance were not checked.
- **Five visual checks, from sampled actual MP4 frames:** (1) Alley, barred window, JPO and dark-framed booth recur appropriately; reveal and jolt retain the same booth-glass context. (2) Revised panels 03 and 05 crop above the house-door bottom; sampled upper-body poses and arms do not show an obvious stretched anatomy defect. (3) Panel 05 stays on the wall-side view; booth reveal and jolt remain near the survivor's shoulder, although motion and precise eyeline need playback. (4) In exported frames around 26?28 s the revised figure is larger and identifiable as the teen, layered with reflected exterior and curtain detail; it is a quiet clue. The reflected positions and the girl's side of the pane at the jolt remain geometrically ambiguous in stills, so no definite barrier violation is asserted. (5) Required SMS spelling and numbers match in sampled frames; no other story-bearing environmental sign is mandated. Locked faces, hair and clothing remain recognizable. No vehicle interior is present, so RHD/windshield geometry is not applicable.
- **Automated checks:** `npm run check` passed TypeScript, episode validation and **23/23 tests**. Warnings are from older comparison cuts. These checks do not verify audio or caption sync by ear.

## Review limits and retest

This review compared the approved brief, script, timing and edit records, manifest/captions, locked sheets, image handoff and rights record. It sampled actual MP4 frames across all ten panels, the whisper, jolt and black; it did not play the entire export at normal speed or listen to it. Whisper and plea delivery, caption-to-speech alignment beyond the demonstrated early beat, narrator edit joins, tap/phone realism, mix balance, flash comfort, in-motion reflection geometry and a first-viewer/platform preview remain unverified. Owner acceptance of Investigator is not a claim of listening.

Agent 04 should correct the caption beat, check the whole handoff in context, and deliver a newly rendered MP4 with rechecked flash/stinger offset, post-whisper vacuum and final loudness/true peak. Obtain a fresh independent post-MP4 audit; the orchestrator records `audit: fail` and routes the fix. This report is not authorization to publish.

**Human listening:** Check the narrator-to-whisper join, both entity voices, repeated plea and stop, vibration, glass knocks, caption sync, final-word release and complete mix.<br>
**Rights and release:** Verify generated voice/image and font terms, required CC BY attribution, platform disclosure and explicit publication authorization.

---

## Earlier image-stage advisory audits ? historical

# Re-audit ? 21 November 2026

**Advisory still-image result: FAIL.** This is an image-stage assessment, not a post-MP4 verdict. Pipeline state remains unchanged.

- **Resolved:** Revised panels 03 and 05 crop above the bottom of the gate and ground while retaining the survivor's upper body and the wall-side vantage. The previous framing finding is closed.
- **Outstanding ? Agent 03, panel 05:** The figure is larger in the window than before, and the full-size image shows a mauve-clad profile. At the 270 ? 480 contact-sheet scale I cannot confidently identify the figure as the locked teen, and it can still read as a person behind the barred window rather than a reflected person. The producer reports two directed attempts without resolving it. Route a further directed solution through the orchestrator: make identity and reflection physically legible without adding a glow, graphic or sound accent. Recheck the actual crop and preserve the approved script and voice.
- **In-cut check for Agent 04:** Once corrected, verify booth reflection/hand sides and the SMS wording in the rendered sequence.

**Review scope:** The revised contact sheet for each episode, critical full-size revised panels, brief, prior audit, recorded retries and pipeline state were compared. Each batch contains 11 unique 1080 ? 1920 panel files. No MP4, manifest or captions were found for these episodes: cover, final SFX, actual cuts, caption/HUD parity, jolt synchronization, vacuum, true peak and normal-speed playback remain unchecked. `npm run check` passed all 22 tests, but does not validate these unregistered future compositions. The prepared Investigator narration is owner-accepted without a claimed listening review. A separate independent post-MP4 audit remains required.

**Human listening:** Narration, effects, caption sync and final mix remain unchecked.<br>
**Rights and release:** Voice, generated-image and other applicable rights, and publication authorization, remain for the orchestrator.

---

## Earlier advisory audit ? historical; superseded where stated above

# Episode 005 ? Agent 03 advisory image audit, 21 November 2026

**Image-stage assessment: FAIL / not ready for a passing image handoff.** This is an assessment of the selected stills, not a post-render verdict. The 131-word script is an approved exception; do not rewrite the locked narration.

## Scope and checks

This is the owner's requested **early Agent 03 image-stage review**, not the independent post-MP4 gate. No episode MP4, manifest or captions were found; consequently the exported-pixel, sound, 00:00.2 cover, caption/HUD, ?1-frame jolt sync, 120?180 ms vacuum and true-peak gates are **not checked**. Do not enter this advisory result as a final `audit` verdict. `npm run check` passed (22 tests); it does not validate these as-yet-unregistered episodes. The locked driver and teen sheets, episode brief and script, selected contact sheet, selected critical images, generation record and pipeline state were reviewed. Each batch has ten distinct 1080 ? 1920 WebP panels plus a distinct jolt, verified by SHA-256. Prepared narration, timestamps and edit map exist; owner acceptance does not imply listening.

## Findings and routing

1. **Agent 03 ? panel 05, silent reflected figure:** On the 270 ? 480 contact tile the figure in the barred window is too faint to identify confidently as the locked girl or distinguish clearly from someone behind the glass. The full-resolution art shows a small profile, but that does not establish phone-size readability or reflection geometry. Correct it as a quiet, plausibly reflected figure facing the gate, with no highlight, glow, marker or dedicated sound accent; retest the actual phone-size crop. The record says 2/2 targeted retries have been used.
2. **Agent 03 ? panels 03 and 05, framing:** Both selected panels show the bottom of a full-height door/gate and the ground while cropping the foreground survivor below the legs. This fails the image-generator contract's explicit crop/full-figure rule. Reframe above the ground and door bottom, or show a complete plausibly scaled figure, while preserving the established opposite-side sightline and scene geography. Both panels have reached the recorded 2/2 retry limit; route a directed correction cycle through the orchestrator.

## Five checks and assembly handoff

- **Set/props:** The alley/house and the JPO booth remain recognizably related across their respective panels. The 09 ? 10 ? jolt pictures retain the booth pane, dark frame and overcast setting; a final transition review remains needed.
- **Scale/anatomy:** 03 and 05 fail the specified framing rule as above. Other sampled faces and arms generally read naturally; stills do not establish an acting performance.
- **Vantage:** 02?06 frame the woman from the wall side looking toward the house and the other person; booth shots put the pane behind her shoulder. The shift from the reflection to the close jolt needs in-cut review.
- **Barrier/reflection:** Panel 05 is the unresolved reflection clue above. Panel 09's hand/contact side and panel 10's mirrored positions remain ambiguous from stills and require a physically coherent in-context review; do not claim an impossible geometry without an established camera/subject layout.
- **Text/identity:** No narrative-required message is legibly baked into panel 08's blank phone. Agent 04 must supply `HARI 5, PUKUL 05:00` in the SMS/HUD and keep numeric captions consistent. The two locked leads remain recognizable in the selected shots. Image provenance for 04, 06, 07 and 08 is explicitly inferred in the source record, not independently proven.

Agent 04 must implement the separately sourced repeated plea and close whisper according to the cue sheet, including the authorized narration-quote edit and retiming, once a passing image handoff exists. A new independent post-MP4 audit is still required. No state or artwork was edited.

**Human listening:** Final narration, effects, caption sync and mix remain unchecked; the orchestrator must arrange the final ear-check.<br>
**Rights and release:** Verify voice, generated-image and other asset rights and obtain TikTok publication authorization before release.
