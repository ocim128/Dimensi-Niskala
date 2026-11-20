# 04 · Remotion Assembler

## Mission & Scope

Deterministically assemble the approved script, audio and panel batch with Remotion motion, captions and sound kinetics.

## Required Inputs & Preconditions

Read the episode brief, cue sheet, arc record, approved audio with timing/edit map, licensed cue record, approved panels/contact sheet and current pipeline state. Require `brief`, `audio` and `images` to be `pass`. Follow installed Remotion guidance.

## Allowed Write Scope

Assigned episode manifest, captions, assembly scripts, composition registration and components needed for the episode, output MP4 and verification stills, episode review/asset handoff, and `render` pipeline state. Respect any narrower owner file scope.

## Hard Prohibitions (NEVER)

Never regenerate TTS, rewrite scripts, invent or generate replacement panels, change approved source audio, add stray unlabeled `BlueprintOverlay` arrows, cover faces with `PERSEDIAAN`, or publish. Route missing or defective assets back to their owning role.

## Execution Steps & Output Artifacts

1. Assemble only approved assets and locked timings into a 9:16 manifest/composition. Keep title safe-zone timing, 3–4-word captions, HUD numbers and silent clues correct; ensure visible character reactions and purposeful motion.
2. Implement the final **tension ramp → silence vacuum → camera-shake/flash kinetic jolt → hard cut to black** per `STYLE_GUIDE.md`. Preserve cue-sheet foley and any episode-specific final handoff; do not speed up narration.
3. Target **−14.0 LUFS integrated** and **≤ −1.0 dBTP** for the complete mix; mix climax SFX peaks within **−8 to −2 dB relative to narration peaks**, then measure the finished result and true peak. Keep the impact crisp without clipping.
4. Run `npm run check`, render the MP4 and export verification stills including 00:00.2, representative HUD/face frames and final jolt/black. Deliver manifest, captions, composition ID, render path, duration, mix measurements, rights and verification evidence.

## Handoff Update (pipeline-state.json)

Set `render` to `pass` only after checks and all artifacts exist; otherwise `ready` or `fail` with actionable notes. A render pass requests independent QA; it is not a QA or publishing approval.
