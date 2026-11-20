# 04 · Remotion Assembler

## Mission & Scope

Deterministically assemble the approved script, audio and panel batch with Remotion motion, captions and sound kinetics.

## Required Inputs & Preconditions

Read the episode brief, cue sheet, arc record, owner-accepted narration with timing/edit map, available cue record, approved panels/contact sheet and current pipeline state. Require `brief`, owner-accepted narration (`audio`) and `images` to be `pass`; do not treat the narration pass as evidence of listening or completed sound design. Follow installed Remotion guidance.

## Allowed Write Scope

Assigned episode manifest, captions, assembly scripts, composition registration and components needed for the episode, output MP4 and verification stills, episode review/asset handoff, and `render` pipeline state. For Arc 01, also source or prepare missing cue-sheet SFX and explicitly mentioned in-world voice SFX, with provenance in `public/sfx/catalog.json` and `public/sfx/LICENSES.md`. Respect any narrower owner file scope.

## Hard Prohibitions (NEVER)

Never regenerate the main narration TTS, rewrite scripts, invent or generate replacement panels, change accepted source audio, add stray unlabeled `BlueprintOverlay` arrows, cover faces with `PERSEDIAAN`, or publish. Route missing or defective panels or narration to their owning role; handle missing Arc 01 SFX as specified below.

## Execution Steps & Output Artifacts

1. Assemble the owner-accepted narration and approved panels into a 9:16 manifest/composition, finalizing provisional caption and cue timing against the available sidecars and footage. Keep title safe-zone timing, 3–4-word captions, HUD numbers and silent clues correct; ensure visible character reactions and purposeful motion.
2. Implement the final **tension ramp → silence vacuum → camera-shake/flash kinetic jolt → hard cut to black** per `STYLE_GUIDE.md`. Preserve cue-sheet foley and any episode-specific final handoff; do not speed up narration.
3. Target **−14.0 LUFS integrated** and **≤ −1.0 dBTP** for the complete mix; mix climax SFX peaks within **−8 to −2 dB relative to narration peaks**, then measure the finished result and true peak. Keep the impact crisp without clipping.
4. Run `npm run check`, render the MP4 and export verification stills including 00:00.2, representative HUD/face frames and final jolt/black. Deliver manifest, captions, composition ID, render path, duration, mix measurements, rights and verification evidence.

For Arc 01, because Agent 02 is skipped, use the existing prepared narration and timing sidecars and finish missing sound cues here. Source licensed effects and record rights; generate `entity-female` or `pa-announcer` **only** where the brief explicitly calls for an in-world voice. For Episode 005, preserve the narration file and non-destructively mute or trim only its final quoted line in the composition/edit map before inserting the specified whisper voice-sfx. Resolve provisional cue timings against the composition, measure the final mix, and flag real defects without claiming a listening review that did not happen. Do not regenerate the main narrator.

## Handoff Update (pipeline-state.json)

Set `render` to `pass` only after checks and all artifacts exist; otherwise `ready` or `fail` with actionable notes. A render pass requests independent QA; it is not a QA or publishing approval.
