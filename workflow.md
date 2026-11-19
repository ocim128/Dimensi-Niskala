# Episode workflow

Use this process when the owner asks for an episode. The AI agent performs the creative and Remotion production work; the owner provides direction and decides whether and when to publish. Do not present an unreviewed draft as finished.

## 1. Choose and brief

Read the current thesis and experiment log. Select one premise with a clear survival problem, an extraordinary fantasy element and a consequential choice. If a creative preference is unspecified, choose a reasonable starting assumption and label it; do not invent established canon or claim audience evidence. Copy [the episode brief](templates/episode-brief.md) into the episode folder and fill in the audience promise, hypothesis, story, language, visual plan and constraints. Identify one primary thing to learn. For a series, record continuity before and after the episode.

## 2. Script and rough cut

Write the Indonesian narration and matching on-screen text, then map each scene to its purpose, visual, narration, timing, audio and asset. For each important story constraint, specify what a viewer must be able to see, not only what narration says. Read the script aloud at a natural pace; adjust duration for clarity. Check that the first seconds create curiosity, the world rule is understandable, the action causes the outcome, and the promised experience is delivered. Flag real-world survival claims for verification or identify the work as fiction.

Name the moment the viewer should remember and what they need to know just before it. Try the cheapest version that tests what you are unsure about. Two panels can show whether a strange rule makes sense. A sound cue over a still can test whether the listener recognizes what has changed. Rough poses can test whether a gesture reads.

Play the storyboard as a timed rough cut at phone size before polishing the assets. Use simple stills or existing shots, scratch or retained Indonesian narration, temporary captions and whichever sounds carry the story. Watch once at normal speed. Where does the clue first register? When does the viewer get the answer? Adjust the cut while it is cheap to move a line, hold a frame or drop a shot. Continue in the same Studio composition.

## 3. Prepare assets

Create or source only what the storyboard needs. When the owner supplies narration, use their recording and keep the spoken script synchronized with it. Otherwise, follow [the voice profile](voice-profile.md) to audition or reuse the narrator and keep a clean sample, voice settings and pronunciation choices. Track prompts, chosen versions, paths, permissions, licenses and attribution in the brief; mark unknown rights as unresolved and do not publish with unresolved rights. Record character and prop references so the next scene or episode can stay consistent. Put web-served media under the parent project's `public/` as described in [remotion-production.md](remotion-production.md); preserve source material and use project-relative paths.

### Develop the character before animation

Treat the drawing as a production asset that needs its own review. Before building the full rig, make a model sheet showing the character's head, neck, shoulders and torso together in front, three-quarter, side and seated views. Keep hair, face, clothing, body proportions and lighting coherent across views. Include the actual chair or other contact point where the story needs it. Check that the jaw connects naturally through the neck into the shoulders, the collar sits at the neck base, and the torso supports the head. Compare silhouette and proportions at full size and at phone size.

Build a short moving test from that design in the real composition. Include a neutral hold, a look or turn, and one story action with head, neck, shoulders and seat visible. Review its start, middle and end frames at full size, then play it at normal speed at phone size. Check anatomy, drawing appeal, identity, contact with the seat, pose transitions and expression. A smooth rig can still carry an unattractive or malformed design. If the test has a visible design defect, revise the model sheet and repeat before propagating it into the episode. Record the chosen reference, test location, observations and any unverified checks in the handoff. Owner review is valuable when available; the agent should also make its own visual judgment and fix clear defects.

Choose the technique for the shot after the design works: drawn poses, layered artwork, a rigged model or a combination. Test a representative movement before committing the whole story to that technique. Keep Remotion as the episode assembly and preview environment. Record any supporting tools, assets and reproducibility requirements.

## 4. Build and preview

Implement an editable composition in the existing parent Remotion project; add a unique composition ID without replacing unrelated work. Follow the installed Remotion skills for creating markup, interactivity, captions, Studio and render as applicable. Run the project from the parent folder, launch Studio and review the actual composition. Keep the episode's brief synchronized with the implemented scene timings, assets and any assumptions. See [remotion-production.md](remotion-production.md) for paths and commands.

## 5. Review and revise

Copy [the review checklist](templates/review.md) into the episode folder. Check the complete story, picture, sound, captions, consistency, rights and platform presentation. Align caption boundaries to actual speech, then review timing and pronunciation; proportional timing based on character counts is an estimate, not a sync check. Automatic transcription can flag dropped words but cannot replace listening. Inspect key frames at phone display size. Document problems and revisions. Ask the owner for creative feedback when appropriate; apply it and review the affected portions again. Run `npm run lint` and the relevant build check after code changes. If a check fails, distinguish a new issue from a pre-existing one and report it. If preview or listening is unavailable, state exactly what remains unverified; do not mark that check as passed.

## 6. Deliver or publish

If the agent's session accepts only text and images, keep audio files on disk. Decode the exported mix locally with FFmpeg, inspect its audio stream with ffprobe, and use local Indonesian speech recognition or compare it with the narration clips. Return timestamps, measurements and transcript excerpts as text. Leave pronunciation and mix judgments pending for a listener. If a session repeatedly reports “Audio input is not available” after a tool returns audio, resume from the saved workspace in a fresh text-only conversation. An ordinary “continue” can replay the rejected input.

Provide the composition ID, preview instructions, episode files, test results, asset/rights status and open issues. Document reproducible commands, inputs, model versions and exact paths, and ensure scripts default to a new output or refuse to overwrite retained assets. Mark archived, environment-specific scripts clearly rather than presenting them as ready to rerun. If the owner explicitly requests a rendered video, render the approved composition to that episode's folder and play back the actual export, including audio and captions. An ordinary request to make a video means prepare a Studio preview by default under the installed Remotion skill; don't automatically render. Creating the episode is not permission to upload, schedule, or alter an account. If publication is separately authorized, follow [publishing.md](publishing.md) and record platform, URL, timestamp and packaging.

## 7. Learn and update

Record pre-publish comments and, after publication, available platform observations using [the feedback loop](feedback-loop.md). Compare against the stated hypothesis and choose one next test. Update durable guidance only when justified, preserving a dated decision and rationale in [experiments.md](experiments.md). If unpublished or data is unavailable, record that limitation rather than inventing results.

## Episode file layout

When requested, create a new child inside the `episodes/` folder, for example:

```text
episodes/
  001-short-episode-slug/
    brief.md                  # copy from templates/episode-brief.md
    review.md                 # copy from templates/review.md
    performance.md            # copy when collecting feedback
    script-id.md              # final script and editable caption text
    sources/                  # source assets, prompts, rights records as needed
    final.mp4                 # only when an export is requested
```

Folder names and the episode ID should be stable and descriptive. The playable Remotion code lives in the parent `src/` and served media in parent `public/`; link their relative paths in the brief so the episode can be reconstructed. For blind tests, keep reference media outside the producer's supplied working project and have a separate reviewer compare it afterward. Do not present this as a security boundary: agents have the filesystem access granted by their environment.
