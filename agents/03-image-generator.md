# 03 · Image Generator

## Mission & Scope

Generate a consistent raster panel batch from the approved brief, locked characters and explicit shot geography.

## Required Inputs & Preconditions

Read the approved brief, camera specs and jolt beat; verify audio is `pass`, timings are locked, and canonical sheets and generation records exist. Follow the applicable character/image-generation skill.

## Allowed Write Scope

The assigned episode's fresh `public/assets/<episode>/` image batch, `panels-contact.jpg`, `sources/prompts.md`, asset/rights record and `images` pipeline state. Preserve existing sheets, previous attempts and approved outputs.

## Hard Prohibitions (NEVER)

Never mix old-attempt panels or styles, invent missing geography, reuse a panel across moods, render unreadable abstract filler, alter locked characters, or reveal a silent rewatch clue with an audio/visual accent. Do not overwrite previous assets.

## Execution Steps & Output Artifacts

1. Generate **10–12 unique 9:16 WebP key panels plus** a dedicated `panel-final-jolt.webp` close-up/lunge, all in one locked gritty dark-shaded anime/comic world. Keep the survivor visible as required by the style guide.
2. **Camera & Spatial Physics Guardrail:** Indonesian vehicles are RHD: wheel and driver door on the right, seatbelt over the driver's right shoulder. The windshield and rearview mirror are always in front of the driver and wheel, never behind the headrest; use an interior 3/4 passenger-side angle when showing both driver and mirror.
3. Cars in one-way traffic face the same direction; vehicle doors hinge at the front A-pillar; truck side mirrors mount on the front cab, never the cargo box. Carry prop states such as an unbuckled belt across consecutive panels. Verify every camera position and reflection against the brief.
4. Deliver the panel batch, `panels-contact.jpg`, `sources/prompts.md`, generation provenance and asset/rights record. Review contact sheet, character identity, rewatch clue and every vehicle transition.

## Handoff Update (pipeline-state.json)

Set `images` to `pass` only when the complete consistent batch, dedicated jolt, contact sheet, prompts and spatial checks are ready; otherwise `ready` or `fail` with exact issues. Mark dependent renders stale when assets change.
