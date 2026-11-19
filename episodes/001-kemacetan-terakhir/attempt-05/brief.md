# Kemacetan Terakhir · Attempt 05

**Builder draft for Agent 2.** The owner closed Attempt 04 with the [balanced render](../../../out/KemacetanTerakhirMotionComicRecut-balanced.mp4) at 70.67 seconds. Its sampled frames show a male-coded driver in shots that put the audience in the role of `kamu`. The owner also reported hearing the narrator pronounce the knocks. This draft addresses both issues before the next picture build.

## Story and point of view

The viewer is in the right-hand driver’s seat of the maroon sedan during a fictional outbreak. Two numbered tactics establish the threat outside. The final knock makes the viewer realize that the danger is already in the rear seat. Keep the Indonesian second person and Jejak’s close delivery. The viewer-character has no assigned gender or named identity.

- Open from eye level at the window or door. Use the hand and sleeve only where they carry an action. Keep the sleeve plain and consistent. Keep the driver’s face, haircut, body silhouette and mirror reflection out of frame.
- Show the tackle from the windshield and the gridlock from above. Check the driver behind the windshield in any wide shot. Crop, replace or redraw any inherited plate that identifies the driver, including the opening, reach, hiding, reaction and turn angles. Preserve the car’s geography.
- For hiding, lower the camera below the dash or window line. For the turn, move the viewer’s gaze from side glass to headrest to rear bench. Show the infected passenger on the last angle. Apply the [character staging guidance](../../../.agents/skills/cartoon-character-development/SKILL.md) to hand position, seating and the reveal composition.

## Build beats

| Story window | Picture and audio |
| --- | --- |
| 0–3 s | Close view of the window or handle from the driver’s eye line. State the rule immediately. |
| 3–12 s | Show the jam and movement around the car. Promise two tactics and leave the direction of the sound unresolved. |
| 12–55 s | Speak both step numbers. Show the boxed-in car, reach, recoil and lock. Use the controls and window line for the hiding tactic. Show water and battery in the supply card. |
| 55–70 s | Establish 03:00. Two knocks at the side glass. Show the empty window. A separate knock comes from behind. Move the gaze to the headrest and reveal the passenger before or with the last line. |

## Builder delivery

- [Spoken source](narasi.txt) · [Narration and cue timing](script-id.md) · [Asset and rights record](assets.md) · [Review](review.md)
- Register the new v2 composition as `KemacetanTerakhirMotionComicAttempt05` in `src/Root.tsx`. Place the manifest and captions in this folder. Copy the supplied clean MP3 to `public/assets/kemacetan-terakhir/attempt-05/narration-jejak.mp3` for Remotion and reference that served path in the manifest.
- Use the 1080 × 1920, 30 fps engine. Map the narration and picture to 60–72 seconds total and land the twist by 70 seconds. Keep the shared HUD, four-word caption limit and 2.5-second plain-still limit from the [style guide](../../../STYLE_GUIDE.md).
- Create fresh speech captions from the supplied master. Use the scene-local SFX track for knocks. Play the draft once with the narration soloed, once with the effects, and once as a full mix while checking point of view, cue order and readability at phone size.

## Implemented preview

- `KemacetanTerakhirMotionComicAttempt05`: 1080 × 1920, 30 fps, 2,136 frames / 71.20 s. It uses [manifest.json](manifest.json) and [captions.json](captions.json) with the shared `src/Episode.tsx`, `src/components/` and `src/Root.tsx` in this repository. Source and served media are documented in [assets.md](assets.md).
- Studio: run `npm run dev` in the repository root, then open `http://localhost:3001/KemacetanTerakhirMotionComicAttempt05` or the port printed by Studio. `showCaptions`, `soundOn`, `narrationOn` and `effectsOn` allow separate review. The last two default to on and are optional for prior compositions.
- The supplied 70.5 s voice master remains at original speed. The side-window knocks are at 59.10 and 59.70 s; the rear-seat knock and first visible fingertip contact are at 64.00 s. The passenger is revealed at 66.00 s, with the final spoken line. The 03:00 shot begins at 55.00 s.
- The pose and staging reference is the anonymous hand, door and window relationship in [POV contact sheet 1](pov-final-contact-1.jpg), the lower-window and headrest relationship in [sheet 2](pov-final-contact-2.jpg), and [the passenger reveal](pov-final-contact-3.jpg). These are frame samples, not a complete acting test. The reach/recoil are cuts between drawn hand poses with animated directional overlays; the rear contact is a held illustration beginning at the cue, not a separately animated finger.
- The first POV atlas's outside infected looked more realistic than the illustrated cast and was revised to the selected opening image. The viewer's own face and body were removed from the selected plates; see [review.md](review.md) for actual checks, mix levels and limitations.
