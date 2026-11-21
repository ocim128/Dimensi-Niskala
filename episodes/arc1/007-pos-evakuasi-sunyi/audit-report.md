# Episode 007 ? post-MP4 re-audit, 21 November 2026

**Verdict: PASS WITH NOTES** for `out/ep007-pos-evakuasi-sunyi-qa-revision.mp4`. Both demonstrated picture/timing blockers from the earlier export are resolved in the sampled current export. The human orchestrator records `audit: pass` and carries forward the notes. This verdict is not publication authorization; no pipeline state or production artifact was edited by this auditor.

## Resolution of earlier blockers

- **Exit:** In the current export the view progressively reframes along the outside rail path. At frame **1895 (63.167 s)** and frame **1909 (63.633 s)**, during the captioned `POS HILANG` beat, the station, gate and its lights are outside the frame. The survivor and rail path remain visible. The earlier contradictory image at 63.633 s is therefore resolved in this export. A red railway signal remains in the background; it is not the station post.
- **Guard flashlight:** Guard handoff frames **2186?2189 (72.867?72.967 s)** show the beam hidden; frame **2190 (73.000 s)** exposes the beam and wall warning. The decoded AAC has a transient at 73.000 s consistent with the scheduled click; the physical switch-on is no longer shown before that cue. The complete handoff remains 0.4 s, so its readability and the dark-mask transition still require normal-speed viewing.

## Measured technical gates and checks

- **Export and sync:** 1080 ? 1920, 30 fps, **2,204 frames / 73.466667 s**, with both streams starting at 0. Exported frame **2165 / 72.166667 s** is the first jolt/flash; independently decoded AAC first exceeds ?60 dBFS in the stinger window at **72.166667 s**, audio-minus-picture **0.000 ms** (? ?33 ms). Its last pre-sting sample above ?60 dBFS is **72.007854 s**, giving approximately **158.8 ms** of near-silence (required 120?180 ms). Frame 2186 begins the guard handoff and frame 2198 begins the 0.2 s blackout. From the 72.004 s prepared narration file end to video end is **1.463 s**.
- **Loudness:** Independent FFmpeg EBU R128 measures **?14.0 LUFS integrated and ?1.5 dBTP**, meeting the ? ?1.0 dBTP limit. Decoded waveform results account for AAC priming; exact final-word intelligibility is not established by a threshold alone.
- **Script, picture and checks:** The approved script and caption text each contain **116 normalized words in the same order**. The current export's sampled 00:00.2 cover, early teen clue, gate reveal, route transition, jolt, guard and blackout were inspected at phone-sized dimensions; the earlier audit contains the other sampled panel and HUD evidence. `npm run check` passed **24/24 tests**; warnings concern older comparison cuts. Text equality is not proof of caption-to-speech sync.

## Notes and review limits

The current `mix-measurements.md` reproduction recipe refers to `out/ep007-pos-evakuasi-sunyi.mp4` as the earlier master, but that exact path was not present during this re-audit; the current revision is present and its final AAC was independently measured. Reconcile the archived source location or update the reproduction handoff before relying on that command. No claim is made about why the earlier file is absent.

The 0.4 s night handoff and off-to-on mask were checked in individual exported frames, not in real-time playback; caption sync, spoken final-word release, click/footstep character, PA and siren balance, full playback, first-viewer comprehension and platform preview remain unchecked. The owner's acceptance of Investigator does not imply a listening review.

**Human listening:** Check the full narration and caption sync, PA/siren stop, gate, guard footstep and click, stinger and final mix in context.<br>
**Rights and release:** Verify generated voice/image and font terms, CC BY effect attribution, platform disclosure and explicit publication authorization.

---

## Previous audit of the earlier export ? historical and superseded for the two corrected picture findings

# Episode 007 ? independent post-MP4 audit, 21 November 2026

**Verdict: FAIL.** Return the finished cut to **Agent 04** for the two picture/story defects below, then run a fresh independent audit on the revised export. The earlier image-only reviews are retained below as history; this is the first post-MP4 verdict. The human orchestrator records the result in pipeline state. No source, audio, render or pipeline state was changed by this reviewer.

## Blocking findings

1. **Agent 04 ? the exit picture contradicts the narrated and captioned destination.** At 01:02.829?01:03.689 the locked line and captions say the survivor retreats until the post lights disappear (`SAMPAI LAMPU POS HILANG`). In the actual export, frame 1909 (01:03.633) still shows the brightly illuminated station, gate and `POS EVAKUASI` banner immediately beside her; the same station remains visibly lit through the route shot up to the jolt (frame 2164, 01:12.133). This is a material visual contradiction, not a demand for continuous walking animation. Stage an identifiable route-away view in which the station lights have disappeared by that narrative beat, while preserving the approved path geography and the explicitly required post-narration crowd jolt and night-guard handoff. Use the existing approved art if possible; if a new picture is essential, route its creation to Agent 03. Do not rewrite or regenerate the locked narration. Recheck the exported frames and timing.

2. **Agent 04 ? the guard's flashlight is already visibly on before its switch-on cue.** The brief and cue sheet require the guard's boots to stop and the flashlight to turn on, with the click timed to that event. In the actual export the first guard frame, 2186 (01:12.867), already contains a distinct bright cone from the flashlight and illuminated wall text. The click is placed at 01:13.000, frame 2190, after the cone is already present. The later sweep brightens it, but an already-lit flashlight does not convey the required switch-on. Make the initial handoff image read unlit, then reveal the beam on the click; keep the existing 0.4 s handoff legible and retain the required jolt ? night handoff ? blackout order and overall 1.0?1.5 s tail. Reinspect the actual frames and final mix.

## Measurements and completed checks

- **Export:** `out/ep007-pos-evakuasi-sunyi.mp4`, composition `Arc01Episode07`, H.264 1080 ? 1920, 30 fps, 2,204 frames, video 73.466667 s; AAC 73.466 s. Both streams report start 0. The first AAC packet has PTS ?0.021333 s and a 1,024-sample skip; waveform measurements below use FFmpeg's decoded, priming-trimmed audio on the MP4 presentation timeline.
- **First jolt and vacuum:** In independently decoded video, frame 2164 at 72.133333 s still shows the route, and frame **2165 at 72.166667 s** is the first jolt/flash. Stereo PCM decoded from the finished AAC first exceeds ?60 dBFS at **72.166667 s** (?40 dBFS at 72.166833 s): audio-minus-video offset **0.000 ms** at the ?60 dBFS threshold, within ?33 ms. The last pre-vacuum sample above ?60 dBFS occurs at approximately **72.007854 s**; the interval to the stinger is **158.8 ms**, within 120?180 ms. This is an amplitude-based boundary, not a listening judgment of the final consonant. The narrator source has signal through its 72.004 s file end, consistent with the final speech being at that boundary. Re-measure after any revision.
- **Ending:** Jolt frames 2165?2185 last 0.700 s; guard handoff frames 2186?2197 last 0.400 s; black starts at frame 2198 (73.266667 s) and lasts 0.200 s. From the 72.004 s narration file end to final video end is 1.463 s. The static samples establish a crowd image, flash and blackout, not whether the movement or short guard handoff reads at normal speed.
- **Loudness:** Independent FFmpeg EBU R128 on the final exported AAC reports **?14.0 LUFS integrated** and **?1.5 dBTP**; the limit is ? ?1.0 dBTP. The handoff records a ?5.9 dB peak difference between the mixed pre-jolt window and isolated jolt window; it is not an isolated narrator-stem comparison.
- **Text and captions:** Normalized script-to-caption comparison yields 116 words in each, in the same order without substitutions. This does not verify whether every source word is intelligible or whether ASR-derived timings match the sound. The opening frame 6 (00:00.2) shows `JANGAN IKUT BARISAN` and `POS EVAKUASI` within the centered 3:4 crop, without a flash; the title component schedules 0?1.8 s. Sampled HUDs show entry water 15% / battery 0%, later water 0% / battery 0%, and timestamps `HARI 5 ? 05:00`, `05:12` and `MALAM`; sampled faces are clear of the supply card. The inscription is readable in enlarged exported samples. Continuous caption spacing, actual platform UI and entire-cut face clearance remain unverified.
- **Cue evidence:** Manifest uses the same PA clip at 6.5 s intervals; the PA and siren both end at 48.0 s and gate sound is scheduled at 49.4 s. This is timeline evidence, not an audible verification of intelligibility, mixing or source identity by ear. No dedicated clue accent is scheduled at the early teen image. The prepared narration is owner-accepted without claiming listening.
- **Five visual checks:** Actual MP4 samples across all ten story panels plus the jolt retain the station fence, banner and outer wall; reveal (panel 08) and jolt show the crowd beyond the open gate from the outside. Panel 08 crops out the gate base; wide exterior views show complete figures or intentionally cropped foreground views. The early girl is small but distinguishable in the sampled 21?24 s frames, behind the bars without a marker. The wall warning is correctly spelled `JANGAN IKUT BARISAN` in enlarged stills; banner reads `POS EVAKUASI`. Gate geometry, face/clothing consistency and sightline are plausible in the sampled stills, subject to real-time transition review. No vehicle is shown, so RHD and traffic direction are not applicable.
- **Automated checks:** `npm run check` passed TypeScript, episode validation and **23/23 tests**. Warnings concern older comparison cuts; they do not establish perceptual quality or cue sync.

## Review limits and retest

This audit compared the brief, script, timing records, manifest, captions, locked sheets, contact sheet, assembly and rights records, and sampled decoded frames from the final export at all story panels and key ending frames. No full normal-speed playback or listening was performed, and no first-time viewer or platform preview was available. Thus narration pronunciation, actual caption-to-speech sync, world-audio balance, siren/PA suitability, flash comfort, transition smoothness, readable 0.4 s handoff and subjective impact remain unverified. Owner acceptance of the Investigator narrator is not evidence of a listening review.

After correcting both blockers, Agent 04 should render and master a fresh MP4, inspect all changed picture/audio relationships and deliver fresh PTS-aligned onset, vacuum, integrated loudness and true-peak measurements. The next independent reviewer must audit the revised file and report all remaining unchecked mandatory gates. The orchestrator should record `audit: fail` and route the fixes; this report is not authorization to publish.

**Human listening:** Check full narration and edits, caption sync, repeated PA, siren, gate, guard steps/click, final-word release, stinger and overall mix in context.<br>
**Rights and release:** Verify generated voice/image and font terms, required effect attribution, platform disclosure and explicit publication authorization.

---

## Earlier image-stage advisory audits ? historical

# Re-audit ? 21 November 2026

**Advisory still-image result: PASS WITH NOTES.** The earlier panel 04, panel 08 and jolt image findings below are superseded by this recheck. This is not a post-MP4 verdict and does not change pipeline state.

- **Resolved:** Panel 04 now shows a small, recognizable dark-haired, mauve-clad teen inside the queue while the outer wall remains blank; the clue is visible on the contact sheet and her face and clothing are clearer at full size. Panel 08 now crops above the ground and gate base. The jolt's leftmost queue member no longer has the survivor's beige tote and blue-capped bottle. The exterior wall, gate and warning remain present in the later stills.
- **Notes for Agent 04:** Verify the teen clue remains readable after the actual crop, that the gate and outsider vantage stay coherent, and that the synchronized head turn occurs after final speech. The quiet guard handoff must follow the jolt within the prescribed tail. The stills do not prove those timings.
- **State note:** `images: pass` is recorded, but the `render: pending` note still says the image stage failed; that note is stale. The human orchestrator owns pipeline-state updates.

**Review scope:** The revised contact sheet for each episode, critical full-size revised panels, brief, prior audit, recorded retries and pipeline state were compared. Each batch contains 11 unique 1080 ? 1920 panel files. No MP4, manifest or captions were found for these episodes: cover, final SFX, actual cuts, caption/HUD parity, jolt synchronization, vacuum, true peak and normal-speed playback remain unchecked. `npm run check` passed all 22 tests, but does not validate these unregistered future compositions. The prepared Investigator narration is owner-accepted without a claimed listening review. A separate independent post-MP4 audit remains required.

**Human listening:** Narration, effects, caption sync and final mix remain unchecked.<br>
**Rights and release:** Voice, generated-image and other applicable rights, and publication authorization, remain for the orchestrator.

---

## Earlier advisory audit ? historical; superseded where stated above

# Episode 007 ? Agent 03 advisory image audit, 21 November 2026

**Image-stage assessment: FAIL / not ready for a passing image handoff.** This is an assessment of the selected stills, not a post-render verdict.

## Scope and checks

This is the owner's requested **early Agent 03 image-stage review**, not the independent post-MP4 gate. No episode MP4, manifest or captions were found; consequently the exported-pixel, sound, 00:00.2 cover, caption/HUD, ?1-frame jolt sync, 120?180 ms vacuum and true-peak gates are **not checked**. Do not enter this advisory result as a final `audit` verdict. `npm run check` passed (22 tests); it does not validate these as-yet-unregistered episodes. The locked driver and teen sheets, episode brief and script, selected contact sheet, selected critical images, generation record and pipeline state were reviewed. Each batch has ten distinct 1080 ? 1920 WebP panels plus a distinct jolt, verified by SHA-256. Prepared narration, timestamps and edit map exist; owner acceptance does not imply listening.

## Findings and routing

1. **Agent 03 ? panel 04, early teen clue:** In the selected 270 ? 480 contact tile, the distant people behind the bars are not sufficiently identifiable as the locked teenage girl. The record says retry 2 made the girl clearer but prematurely introduced the warning before it was written; the selected retry 1 avoids the premature writing but leaves the clue unreadable. Create a restrained, recognizable teen at the end of the queue behind the gate, keeping the wall blank at this stage and adding no accent. Both retries are recorded as exhausted; route a directed correction through the orchestrator.
2. **Agent 03 ? panel 08, framing:** The selected shot includes gate base and ground while cropping the standing survivor below her legs, contrary to the image role's full-door/ground framing rule. Show her complete at plausible scale, or crop above the ground and gate bottom while preserving her position outside the open gate and the queue inside. The record says 2/2 retries have been used.
3. **Agent 03 ? final jolt, survivor continuity:** The leftmost person inside the queue wears an olive-looking jacket and carries a pale bag and blue-capped bottle, which resembles the locked survivor's visual signature. At contact-sheet size this creates a plausible duplicate-survivor reading just after panel 09 shows her escaping outside. Differentiate that queue member's clothing and props without changing the synchronized turn, fixed vantage, gate or warning. The recorded 2/2 retries are exhausted; route a directed correction.

## Five checks and assembly handoff

- **Set/props:** The dark fence, external wall, banner and rail-side path recur through the selected sequence; the 08 ? jolt images depict the open gate from outside. Verify the gate swing and survivor's location in the actual cut.
- **Scale/anatomy:** Panel 08 fails the image-role framing check above. Panel 10 intentionally shows only the guard's boots and a flashlight, with no guard face.
- **Vantage:** The survivor observes from outside the barrier; the jolt remains on the outer side. Whether the assembled head-snap reads as a single motivated action is not established by stills.
- **Barrier/clue:** The early clue in 04 is unreadable as described; no reflection is required here. Check the open gate's side and direction in context.
- **Text/identity:** The selected opening banner reads `POS EVAKUASI` and the wall warning reads `JANGAN IKUT BARISAN` in the larger selected images. Check their exact spelling, phone-size visibility and cover crop in the exported frames. The survivor generally matches the locked sheet; the jolt duplicate ambiguity remains.

Agent 04 must keep the identical PA loop and siren bed per cue sheet, synchronize their stop and gate creak, and place the queue jolt after the last speech followed by the quiet night-guard handoff and blackout within the required tail. The still panel shows a flashlight already lit; actual switching, foley and timing remain unverified. Obtain a fresh independent post-MP4 audit. No state or artwork was edited.

**Human listening:** Final narration, effects, caption sync and mix remain unchecked; the orchestrator must arrange the final ear-check.<br>
**Rights and release:** Verify voice, generated-image and other asset rights and obtain TikTok publication authorization before release.
