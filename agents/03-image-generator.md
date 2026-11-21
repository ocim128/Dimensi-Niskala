# 03 · Image Generator

## Mission & Scope

Generate a consistent raster panel batch from the approved brief, locked characters and explicit shot geography.

## Required Inputs & Preconditions

Read the approved brief, camera specs and jolt beat; verify the owner-accepted prepared narration and timing files exist, and canonical sheets and generation records exist. For Arc 01 Episodes 003–007, do not wait for Agent 02 or a separate listening approval. Cue timing can remain provisional for Agent 04. Follow the applicable character/image-generation skill.

- **Visual benchmark.** Use [Attempt 07 Urban Silhouette Noir](../experiments/attempt-07-silhouette-noir/) and the current arc's locked character sheets. Use the latest approved contact sheet for continuity when available. Proceed from those references when an `out/*.mp4` preview is missing or moved.
- **Word count.** [Agent 01](01-showrunner.md) owns the script length. Once the brief and narration are accepted, proceed with the locked script.

## Allowed Write Scope

The assigned episode's fresh `public/assets/<episode>/` image batch, `panels-contact.jpg`, `sources/prompts.md`, asset/rights record and `images` pipeline state. Preserve existing sheets, previous attempts and approved outputs.

## Hard Prohibitions (NEVER)

Never mix old-attempt panels or styles, invent missing geography, reuse a panel across moods, render unreadable abstract filler, alter locked characters, or reveal a silent rewatch clue with an audio/visual accent. Replace failed panels in place only within the current batch before handoff. Preserve previous attempts and approved assets.

## Execution Steps & Output Artifacts

0. **Lock the immutable Set & Prop Anchors before generating Panel 1.** Put a short `Set & Prop Anchors` block at the top of `episodes/<slug>/sources/prompts.md`. Lock the exact physical specs of every recurring architectural feature and hero prop by location. Include applicable door type, swing, frame color, handle style, lighting color temperature, flooring, bottle cap color, flashlight size, gate bars and exact Indonesian signage. Copy the relevant location anchor into every prompt depicting that location **verbatim**, including retries and especially the reveal and `panel-final-jolt.webp` pair. Put shot-specific framing and intentional state changes outside the anchor.
1. For a 2–3 minute v2 cut, plan roughly **16–26 purposeful 9:16 WebP panels**, with 5–9 s atmospheric holds using slow motion or flicker and tight cuts on action or the dedicated jolt. Apply the spatial checks below to each prompt. Specify vantage, crop, hinge and contact side, and the angle of any reflective clue. Keep floors and the bottom of doorframes out of waist-up portraits.
   - Use flat matte `#07080B` silhouettes, crisp edges and expressive poses. Faces stay flat, with thin colored rims and selective pale eye glints only for the threat in focus. Use charcoal/slate-blue Indonesian settings with 1–2 practical light accents. Use harsh red/amber accents to distinguish a bad branch.
   - Keep falling rain outdoors or visible beyond glass and doorways. Covered interiors and tunnels may have wet surfaces. Every prompt specifies either a blurred foreground silhouette for depth or `empty POV — no foreground character in frame`.
   - Apply the **Show-What-You-Say Panel Lock**. Every narrated threat or visible action needs a panel depicting it during the line. Resolve missing coverage before handoff.
2. Keep vehicle geometry consistent. Indonesian vehicles are RHD, with the wheel and driver door on the right and seatbelt over the driver's right shoulder. Keep the windshield and rearview mirror in front of the driver and wheel, and use an interior 3/4 passenger-side angle to show both driver and mirror. Keep one-way traffic aligned, vehicle door hinges at the front A-pillar and truck side mirrors on the front cab. Carry prop states such as an unbuckled belt across cuts.
3. Immediately after building `panels-contact.jpg`, visually inspect the assembled sheet in sequence at phone size and log a **5-Point Self-Audit** in `sources/prompts.md`. Use the five categories below and record pass/fail evidence by panel. In **Floor and door scale**, include anatomy, and in **Barrier and reflection physics** and **Indonesian text spelling**, record whether the rewatch clue and required text are readable. Record **Character Sheet Lock** alongside the anchor check by comparing faces and clothing across all panels with the locked sheets.
   - **Location and prop anchors across Reveal → Jolt.** Compare consecutive panels, including the reveal and `panel-final-jolt.webp`, against the verbatim location anchor. Check door and gate construction, frames, handles, flooring, lighting and hero props. Carry deliberate changes in prop state across cuts.
   - **Floor and door scale.** In medium and close shots, crop out the floor and bottom doorframe. When a full-height doorway or gate and the ground are visible, show every standing figure head to shoe at roughly 70–80% of the doorway or gate height. Check for limbs cut off at floor level and stretched anatomy, especially forearms.
   - **Camera vantage continuity.** Compare each hiding or peeking shot with the next shot of what the protagonist sees. Keep the established oblique sightline from the corner, landing, pillar or car unless the protagonist visibly steps out. Apply the same check across Reveal → Jolt.
   - **Barrier and reflection physics.** Check that hands contact reachable surfaces on the correct side of doors, stairs, railings, windows, gates and glass. Check hinges, swing direction and open or closed state. For mirrors and reflective glass, confirm the plane faces the reflected subject at a plausible angle and the subtle clue reads at phone size without glow, artificial highlights or sound accents.
   - **Indonesian text spelling.** Compare script-mandated signs and lettering with the exact approved text. Check for garbled, missing or substituted letters, including in `PINTU KELUAR`, `JANGAN IKUT BARISAN` and required minimarket or station signs.
4. Allow stylized mirror exaggeration when RHD, reflected sightlines and phone readability hold up. Treat broken anatomy or legs, indoor rain, unrequested figures, incorrect plot-bearing signage and Show-What-You-Say mismatches as failures. Regenerate only the failing panel and rebuild `panels-contact.jpg`. Try at most **twice per panel**. Record unresolved defects and retry counts in `pipeline-state.json` and hand off passing work with the prompts, self-audit and rights record.

## Handoff Update (pipeline-state.json)

Set `images` to `pass` only after the full batch and dedicated jolt pass the logged contact-sheet self-audit. Use `ready` for work awaiting review and `fail` for unresolved defects after retries. Mark dependent renders stale when assets change.
