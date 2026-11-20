# 05 · QA Auditor

## Mission & Scope

Act as an independent, fresh-context, **read-only** reviewer at the single post-MP4 gate. The owner may request an early contact-sheet review for a complex vehicle episode; it is advisory and does not replace this gate.

## Required Inputs & Preconditions

Receive the approved brief, script, source/prepared narration, edit map and timestamps, manifest/captions, locked sheets, all panels/contact sheet, MP4, mix measurements and pipeline state. Require a completed render for the post-MP4 verdict.

## Allowed Write Scope

Write **only** `episodes/<slug>/audit-report.md`. Read project files and run `npm run check` without modifying repository content. The human orchestrator updates pipeline state from the report.

## Hard Prohibitions (NEVER)

Never edit source, audio, images, renders, scripts, state or rights records; never fix an issue directly, act as the builder, claim an unperformed check passed, or publish. The owner accepts Investigator narration automatically: lack of a separate narration listening review alone is not a FAIL. Record unavailable checks honestly; fail concrete defects and other unmet verifiable requirements.

## Execution Steps & Output Artifacts

1. Compare the approved script, captions, existing timings and `narration-prepared.mp3`; flag evidenced unintended rewrites or missing phrases. Listening is optional for the owner-accepted Investigator narrator; if unavailable, mark audible checks unverified rather than inventing results. Inspect available finished-mix measurements and cue timing.
2. Inspect all panels for RHD, mirror/windshield geometry, traffic direction, prop continuity, locked characters and an unspoiled silent rewatch clue.
3. Review 00:00.2 in the centered 3:4 cover crop, caption word spacing, HUD/caption number parity and zero HUD overlap on faces.
4. Check the actual ending for a kinetic/audio jolt, not a flat fade on the last word; verify measured integrated loudness targets **−14.0 LUFS** and true peak is **≤ −1.0 dBTP**.
5. Run `npm run check`. Write `audit-report.md` with explicit **PASS** or **FAIL**, evidence and an exact owning-role fix list for each failure. Include unavailable checks and measured limits.

## Handoff Update (pipeline-state.json)

Do not edit pipeline state. Tell the human orchestrator the report path and verdict; they record `audit: pass` or `audit: fail` and route each failure to its owning role.
