# Kemacetan Terakhir · reference comparison revision

The owner found attempt 03 far from the reference and authorized improvements. This preview tests whether clearer changes in viewpoint and explanatory visuals bring the storytelling closer to the reference's pacing. It retains the story and selected Indonesian narrator. The judgment of whether the result is close enough remains with the owner.

## Comparison

The reference is `Survival-Fantasy-References/zombie apocalypse.mp4`, outside this project. A contact sheet sampled at five-second intervals showed changes between character shots, outside action, simple diagrams and inventory illustrations. The attempt 03 contact sheet showed longer stretches of similar cabin views. The comparison is based on sampled pictures and the existing reviewer notes. Full reference audio was not reviewed.

## Preview

- Composition `KemacetanTerakhirV4`, 1080 × 1920, 30 fps, 2,151 frames, 71.7 seconds. Open `http://localhost:3000/KemacetanTerakhirV4` while Studio is running.
- The wider pursuit runs at 11.83–14.77 seconds and makes the danger outside more visible before the hand withdraws.
- An overhead traffic insert runs at 21.10–24.43 seconds, marking the trapped car. A cutaway at 36.37–38.00 seconds shows Damar ducking below the window.
- Captions are larger. Tap captions have their own vertical position.
- Code is `src/KemacetanTerakhirV4/` in the parent project and the composition is registered in `src/Root.tsx`. It imports existing attempt 03 scene components, cues and caption timings. It uses the existing media from `public/kemacetan-terakhir-v3/` and the narrator takes in `public/survival-blind/`.
- Script, source asset records and voice settings remain linked in the [production brief](../production-brief.md), [attempt 03 handoff](../attempt-03/handoff.md) and [voice profile](../../../voice-profile.md). The two new diagrams are original SVG markup in `src/KemacetanTerakhirV4/sightline.tsx`. Voice model and asset rights remain unresolved for publication.

## Review

Lint and build passed. Studio loaded the new composition. The chase and both diagrams were inspected at preview size, and playback advanced through the revised passages. The wider pursuit now shows two figures, while the cutaway shows the character moving beneath the window. Studio reported no console errors during the spot check.

The remaining shots, character drawing, voice, mix and most timing come from attempt 03. The new visual inserts do not establish that the full experience matches the reference. Full listening, detailed caption sync, platform overlays and independent viewer feedback remain unverified. The owner has yet to review this revision.
