# Kemacetan Terakhir · attempt 4 remake task

Make a new Indonesian Remotion preview that captures the reference's fast alternation between story, animated explanatory graphics and character reactions. The owner found attempt 3 far from the reference. Start with the [reviewer's visual comparison](../attempt-03/reference-audit.md) and the [original written story](../production-brief.md). The next viewer should understand the situation through the images on a phone.

Tell this attempt as a viewer-facing scenario. The Indonesian narration addresses the viewer as `kamu`, who experiences the events. The earlier brief and assets use the name Damar; treat that name as historical context for the visual design. The new narration and on-screen text should address the viewer and leave the driver unnamed. Use first-person views of the door, hands and window alongside exterior and explanatory views so the viewer can follow the action.

An earlier `KemacetanTerakhirV4` preview already exists, documented in [brief-review.md](brief-review.md). Create a separate composition `KemacetanTerakhirV4Remake` with source under `src/KemacetanTerakhirV4Remake/` and new assets under `public/kemacetan-terakhir-v4-remake/`. Keep the existing compositions and assets available for comparison. Use the parent Remotion project, 1080 × 1920 and 30 fps, and follow the installed Remotion skills. Deliver a Studio preview and a handoff beside this task. Export an MP4 if the owner explicitly requests one.

## Narration input

The owner will convert the [Indonesian voice-over draft](voice-over-id.txt) to MP3 and place it in this episode folder. Use the supplied MP3 as the narration master when it is available. The suggested filename is `voice-over-id.mp3`, but use the actual supplied filename if it differs. Preserve the owner's file. Copy it into the parent project's `public/kemacetan-terakhir-v4-remake/` for Remotion and record both paths. If no MP3 has been supplied yet, the narration-dependent build remains pending.

Listen to or locally transcribe the supplied recording and compare it with the draft. Create captions from the words actually spoken, align them to the audio and time the shots to the recording. Adjust the episode duration and scene timings to fit natural speech and pauses. Report any differences or unverified listening and keep the draft and master available for editing.

## Creative direction

Use a cohesive, simplified 2D cartoon world with clear side views of the red sedan. The reference characters have large round heads, compact torsos and limbs, small dot eyes, short curved eyebrows and minimal mouths. Use flat rounded shapes with subtle soft shading and expressive poses. Keep the driver's neck short and connected to the shoulders. The owner requests this cartoon direction for the remake. Make the car, window, door and driver's position recognizable across cuts. Use readable faces, clear light and dark states, and bold Indonesian text. Show the infected as an immediate threat without graphic injury. Create original artwork and wording from the story. The reference files and their frames, music, fonts and footage remain outside the producer's inputs.

## Character design comes first

Read the project [cartoon character development skill](../../../.agents/skills/cartoon-character-development/SKILL.md) for the design and acting test.

The owner flagged the long, narrow neck in attempt 3. Design the viewer's on-screen driver as a complete seated character before building the full sequence. Prepare a model sheet with front, three-quarter, side and seated views showing head, jaw, neck, shoulders, torso and collar together. Inspect proportions and attachment points at full resolution and at phone size. Include the seat back and steering-wheel relationship in the seated view. Follow the simplified cartoon direction above and the [cartoon design study](damar-cartoon-study.png). The study is a starting point that needs owner review. Verify that the character stays recognizable across views. The earlier realistic study was rejected by the owner.

Create a short moving test of the driver sitting, looking outside, reaching for the handle and turning toward the tapping. Check the still poses and the movement for believable neck length, shoulder connection, contact with the seat, consistent facial identity, clear expression and clean transitions. Revise the design and replay the test if any issue is obvious. Log its composition, replay interval, stills and remaining issues in the handoff. Then reuse the chosen design throughout the episode. A working animation rig and successful render are technical checks; they do not establish that the drawing looks good.

The cartoon study was generated on 18 November 2026 with the built-in image generation tool from a prompt describing a simplified 2D cartoon Indonesian man with round head, dot eyes, green jacket and seated car pose. Its model version was not exposed. The earlier `damar-design-study.png` was rejected for being too realistic. Record prompts, tool and version where available for the designs and outputs actually used.

Give each beat an action and an understandable visual result. Use first-person shots, driver views, full-car side views, top-down road views, close-ups and short explanatory graphics. Keep each change anchored to the same red car or driver. Animate diagrams in stages so a viewer can see what changes. Avoid a long sequence of the same cabin bust. Captions must follow the supplied recording.

## Storyboard

Time ranges are planning estimates. Pace scenes around clear actions and intelligible Indonesian, then record actual timings.

| Approximate time | Picture and motion | Viewer takeaway |
| --- | --- | --- |
| Opening | From the driver's seat, show the door and infected figures outside. As the narration names the only way out, show a hand approaching the handle. An infected figure attacks a fleeing driver, prompting the hand to stop and lock the door. | The same door separates the viewer from the infected and offers a way out. |
| Trapped | Give the traffic a readable side or overhead view, with the red car blocked front and back. | The viewer cannot drive away. |
| Darkness | Show a hand turning the key, lights and radio off. Pair each action with the gauge, light beam or dial changing. Cut to a side view of the red car darkening among stationary traffic and then a wider overhead view as night falls. | The car becomes quiet and dark. |
| Hiding | A cutaway shows the driver lowering below the window. A figure stops next to the car, its shadow crosses the glass, then it moves away. Hold the spatial relationship before returning to the driver. | The danger pauses outside while the viewer hides. |
| Inventory | Present the half bottle, one pack of gum and 60% phone battery clearly, one at a time, then bring them together in a brief readable summary. | Resources are limited and the viewer is preparing to wait. |
| Ending | Transition from fading outside activity to a prominent clock reaching 03.00. Show the taps, the empty side window, then the source behind the driver. Reveal the passenger and hold long enough to read the face. | The apparent safety gives way to a threat in the back seat. |

Use the original sequence as the starting story, while keeping Indonesian phrasing natural and avoiding factual claims that the car is guaranteed safe. A small continuation cue is optional after the reveal.

## Motion and verification

Prototype the door decision, hiding cutaway and final reveal before polishing the full sequence. The driver should move as one character with connected head, neck and shoulder poses. Inspect adjacent frames of any head turn for the flip reported in v2. If a full turn cannot be drawn convincingly, cut on a motivated movement to another drawn angle. Use Remotion's frame clock for motion and keep narrative text, diagram labels and major scene layers editable.

Play a rough cut at 270 × 480 with audio and captions, and replay the decision, hiding and reveal muted with captions hidden. Write down what a viewer can see at each point, including when the source of the tapping becomes clear. Compare the resulting sequence with the v3 audit, and identify remaining gaps. Review the rendered audio by listening when available. If audio input is unavailable, keep it on disk, use local checks, and state that subjective listening remains open. Verify caption timing against actual speech and retest after edits.

Run lint and build. Open Studio and play through the timeline while checking for visible track-overlap or missing-asset errors. In the handoff record composition ID, runtime, code and asset paths, actual beat timestamps, narration changes, asset sources and rights status, checks performed and limitations. Include a phone-size contact sheet and playback intervals for the three prototype sequences.
