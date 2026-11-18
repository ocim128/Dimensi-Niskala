# Audit — Kemacetan Terakhir, first blind production test

**Date:** 2026-11-18. **Status:** review preview; not approved for publication. The producer built from the written brief in a separate working copy. The reviewer studied sampled reference frames and an automatic transcription, then inspected the producer's preview, source, and generated audio metadata. The separation was procedural, not an enforced filesystem sandbox.

## Result

The 69.2-second vertical Remotion composition presents the intended driver, red car, outbreak, decision to remain inside, switches, inventory, 03.00 tapping and back-seat reveal. The original footage was not supplied to the producer. Its story is broadly recognizable from the brief, and the recovered v4 reference was used for the generated Indonesian narration.

The preview is available in the parent Remotion project at `http://localhost:3000/KemacetanTerakhirBlind` while Studio is running. Its editable source is `src/SurvivalBlind/`, registered in `src/Root.tsx`; audio is in `public/survival-blind/`. The episode folder itself is not a standalone Remotion project. [Preview contact sheet](preview-contact.jpg) shows sampled frames, not the full motion or sound.

## Findings

| Area | Finding and evidence | Next action |
| --- | --- | --- |
| Story | **Mostly present.** The expected sequence and ½ bottle, gum, 60% battery and rear-seat reveal appear in the preview. | Keep the clear cause-and-consequence structure. |
| Opening and geography | **Needs improvement.** Around 00:03 the highway shows five widely spaced cars rather than an obvious immobile traffic jam; the script's central constraint is therefore hard to see. The sampled reference uses densely packed vehicles. | Next brief/review must require a recognizably blocked multi-lane road on the opening phone-size frame, not just the words “traffic jam.” |
| Visual storytelling | **Needs improvement.** Reused flat scenes and slow scale changes communicate the story but offer less scene depth, character action and escalating tension than the sampled reference. Some decisions appear as dashboard/diagram states rather than visible character actions. | Require an action or visual change per story beat, varied shot scale, and a scene-specific visual checkpoint; avoid equating a pan or zoom with new action. |
| Text and language | **Needs improvement.** Inventory labels use 27–29 px text at 1080 px width (roughly 7 px when the video is viewed 270 px wide), and the gum package says “GUM” despite Indonesian guidance. | Test the actual frame at phone display size; increase essential label size and localize visible copy. |
| Captions | **Needs improvement; exact synchronization unverified.** `production-scripts/build-captions.py` estimates phrase boundaries by character count, not speech alignment. In the inventory scene, automatic word timestamps put “baterai” around 0.7 seconds after the corresponding estimated caption starts. Automatic alignment itself can be wrong. | Align to actual speech, inspect difficult boundaries and listen; never claim caption sync from text-proportional estimates. |
| Narration | **Partially verified.** WAV files exist and decode. Automated Indonesian transcription recognized the revised half-bottle and 60% details, but still rendered “permen karet” imperfectly. The owner-selected v4 voice was used. | Listen to all lines, particularly inventory and pronunciation, and compare against captions. ASR is a useful warning, not a listening review. |
| Editing | **Partially editable.** Scenes are named sequences and source files are editable, but repeated SVG shapes and JSON-driven captions are not all individually selectable/editable in Studio. | Next production should expose the elements the owner is likely to revise as editable layers or explicitly document source-only controls. |
| Reproduction | **Needs improvement.** The producer's archived scripts were written for the temporary working copy, refer to `brief/`, and can overwrite narration, timeline or ambience files if run unchanged. | Do not run them blindly. For the next attempt, use explicit inputs, output locations, a no-overwrite default, and a versioned manifest. |
| Rights and publishing | **Not verified.** The model/dataset, supplied synthetic voice reference and any platform use/attribution still require review. No account was modified and no video was uploaded. | Complete rights and platform checks before any publication. |

## Checks actually performed

- The producer reported `npm run lint`, `npm run build`, and `npx tsc --noEmit` passing in its isolated copy. The reviewer reran `npm run lint` and `npm run build` successfully in the parent project after integration.
- The reviewer opened the composition in a separate headless Chrome session, inspected frames around 3, 10, 19, 28, 37, 47, 56, 64 and 68 seconds, and saw no page or failed-HTTP errors in the playback session. Playback advanced through at least 60 seconds and had returned to the start by the 70-second observation.
- `faster-whisper` small provided approximate Indonesian transcripts for the 12 voice clips and word-time spot checks for scenes 0, 7 and 11. The model may mishear correctly spoken audio.
- A structural check verified that all 12 narration WAVs fit within their scenes, scene boundaries are contiguous, the final frame count matches the composition, and all 40 caption intervals have positive duration without overlap. This does not establish speech synchronization.
- **Not verified:** a human listening to the full soundtrack; subjective voice quality and accent; phone-app UI overlay on either platform; exact caption timing; all motion between sampled frames; publication rights. The reviewer cannot assert those checks passed.

## Improvements applied before the next attempt

The visual guide now requires a visible proof of each important environmental constraint and an actual phone-size text check. The workflow now calls for alignment against audio, a no-overwrite reproduction handoff, and a review that distinguishes automated checks from listening. These are hypotheses based on this one test, not evidence of audience performance. See [experiment history](../../experiments.md).
