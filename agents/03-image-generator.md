# 03 · Image Generator

## Mission & Scope

Generate a consistent raster panel batch from the approved brief, locked characters and explicit shot geography.

## Required Inputs & Preconditions

Read the approved brief, camera specs and jolt beat; verify the owner-accepted prepared narration and timing files exist, and canonical sheets and generation records exist. For Arc 01 Episodes 003–007, do not wait for Agent 02 or a separate listening approval. Cue timing can remain provisional for Agent 04. Follow the applicable character/image-generation skill.

## Allowed Write Scope

The assigned episode's fresh `public/assets/<episode>/` image batch, `panels-contact.jpg`, `sources/prompts.md`, asset/rights record and `images` pipeline state. Preserve existing sheets, previous attempts and approved outputs.

## Hard Prohibitions (NEVER)

Never mix old-attempt panels or styles, invent missing geography, reuse a panel across moods, render unreadable abstract filler, alter locked characters, or reveal a silent rewatch clue with an audio/visual accent. Replace failed panels in place only within the current batch before handoff. Preserve previous attempts and approved assets.

## Execution Steps & Output Artifacts

0. **Lock the immutable Set & Prop Anchors before generating Panel 1.** Put a short `Set & Prop Anchors` block at the top of `episodes/<slug>/sources/prompts.md`. Lock the exact physical specs of every recurring architectural feature and hero prop by location. Include applicable door type, swing, frame color, handle style, lighting color temperature, flooring, bottle cap color, flashlight size, gate bars and exact Indonesian signage. Copy the relevant location anchor into every prompt depicting that location **verbatim**, including retries and especially the reveal and `panel-final-jolt.webp` pair. Put shot-specific framing and intentional state changes outside the anchor.
1. Generate **10–12 unique 9:16 WebP key panels plus** a dedicated `panel-final-jolt.webp` close-up/lunge, all in one locked gritty dark-shaded anime/comic world. Keep the survivor visible as required by the style guide. Apply the spatial checks below to the prompt for every applicable shot. Specify camera position and crop, hinge and contact side, and for reflection clues the angle of the reflective plane toward the subject. A waist-up portrait must never call for a full doorway or gate down to the floor. An already-open outward-swinging door cannot be struck from inside as though it were still closed.
2. Keep vehicle geometry consistent. Indonesian vehicles are RHD, with the wheel and driver door on the right and seatbelt over the driver's right shoulder. Keep the windshield and rearview mirror in front of the driver and wheel, and use an interior 3/4 passenger-side angle to show both driver and mirror. Keep one-way traffic aligned, vehicle door hinges at the front A-pillar and truck side mirrors on the front cab. Carry prop states such as an unbuckled belt across cuts.
3. Immediately after building `panels-contact.jpg`, visually inspect the assembled sheet in sequence at phone size and log a **5-Point Self-Audit** in `sources/prompts.md`. Use the five categories below and record pass/fail evidence by panel. In **Floor and door scale**, include anatomy, and in **Barrier and reflection physics** and **Indonesian text spelling**, record whether the rewatch clue and required text are readable. Record **Character Sheet Lock** alongside the anchor check by comparing faces and clothing across all panels with the locked sheets.
   - **Location and prop anchors across Reveal → Jolt.** Compare consecutive panels, including the reveal and `panel-final-jolt.webp`, against the verbatim location anchor. Check door and gate construction, frames, handles, flooring, lighting and hero props. Carry deliberate changes in prop state across cuts.
   - **Floor and door scale.** In medium and close shots, crop out the floor and bottom doorframe. When a full-height doorway or gate and the ground are visible, show every standing figure head to shoe at roughly 70–80% of the doorway or gate height. Check for limbs cut off at floor level and stretched anatomy, especially forearms.
   - **Camera vantage continuity.** Compare each hiding or peeking shot with the next shot of what the protagonist sees. Keep the established oblique sightline from the corner, landing, pillar or car unless the protagonist visibly steps out. Apply the same check across Reveal → Jolt.
   - **Barrier and reflection physics.** Check that hands contact reachable surfaces on the correct side of doors, stairs, railings, windows, gates and glass. Check hinges, swing direction and open or closed state. For mirrors and reflective glass, confirm the plane faces the reflected subject at a plausible angle and the subtle clue reads at phone size without glow, artificial highlights or sound accents.
   - **Indonesian text spelling.** Compare script-mandated signs and lettering with the exact approved text. Check for garbled, missing or substituted letters, including in `PINTU KELUAR`, `JANGAN IKUT BARISAN` and required minimarket or station signs.
4. For any failure, regenerate the specific panel in place in the current batch, rebuild `panels-contact.jpg` and repeat the affected checks before handoff. Limit automatic retries to **two per panel**. If a failure remains, set `images: fail` and record the panel, failed checks and retry count in `pipeline-state.json`. Deliver the passing panel batch, updated contact sheet, prompts and self-audit, generation provenance and asset/rights record to Agent 04.

## Handoff Update (pipeline-state.json)

Set `images` to `pass` only after the full batch and dedicated jolt pass the logged contact-sheet self-audit. Use `ready` for work awaiting review and `fail` for unresolved defects after retries. Mark dependent renders stale when assets change.
