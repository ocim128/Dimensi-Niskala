# Episode workflow

Use this process when the owner asks for an episode. The AI agent performs the creative and Remotion production work; the owner provides direction and decides whether and when to publish. Do not present an unreviewed draft as finished.

## 1. Choose and brief

Read the current thesis and experiment log. Select one premise with a clear survival problem, an extraordinary fantasy element and a consequential choice. If a creative preference is unspecified, choose a reasonable starting assumption and label it; do not invent established canon or claim audience evidence. Copy [the episode brief](templates/episode-brief.md) into the episode folder and fill in the audience promise, hypothesis, story, language, visual plan and constraints. Identify one primary thing to learn. For a series, record continuity before and after the episode.

## 2. Script and storyboard

Write the Indonesian narration and matching on-screen text, then map each scene to its purpose, visual, narration, timing, audio and asset. Read the script aloud at a natural pace; adjust duration for clarity. Check that the first seconds create curiosity, the world rule is understandable, the action causes the outcome, and the promised experience is delivered. Flag real-world survival claims for verification or identify the work as fiction.

## 3. Prepare assets

Create or source only what the storyboard needs. Follow [the voice profile](voice-profile.md) to audition or reuse the narrator and keep a clean sample, voice settings and pronunciation choices. Track prompts, chosen versions, paths, permissions, licenses and attribution in the brief; mark unknown rights as unresolved and do not publish with unresolved rights. Record character and prop references so the next scene or episode can stay consistent. Put web-served media under the parent project's `public/` as described in [remotion-production.md](remotion-production.md); preserve source material and use project-relative paths.

## 4. Build and preview

Implement an editable composition in the existing parent Remotion project; add a unique composition ID without replacing unrelated work. Follow the installed Remotion skills for creating markup, interactivity, captions, Studio and render as applicable. Run the project from the parent folder, launch Studio and review the actual composition. Keep the episode's brief synchronized with the implemented scene timings, assets and any assumptions. See [remotion-production.md](remotion-production.md) for paths and commands.

## 5. Review and revise

Copy [the review checklist](templates/review.md) into the episode folder. Check the complete story, picture, sound, captions, consistency, rights and platform presentation. Document problems and revisions. Ask the owner for creative feedback when appropriate; apply it and review the affected portions again. Run `npm run lint` and the relevant build check after code changes. If a check fails, distinguish a new issue from a pre-existing one and report it. If preview or listening is unavailable, state exactly what remains unverified; do not mark that check as passed.

## 6. Deliver or publish

Provide the composition ID, preview instructions, episode files, test results, asset/rights status and open issues. If the owner explicitly requests a rendered video, render the approved composition to that episode's folder and play back the actual export, including audio and captions. An ordinary request to make a video means prepare a Studio preview by default under the installed Remotion skill; don't automatically render. Creating the episode is not permission to upload, schedule, or alter an account. If publication is separately authorized, follow [publishing.md](publishing.md) and record platform, URL, timestamp and packaging.

## 7. Learn and update

Record pre-publish comments and, after publication, available platform observations using [the feedback loop](feedback-loop.md). Compare against the stated hypothesis and choose one next test. Update durable guidance only when justified, preserving a dated decision and rationale in [experiments.md](experiments.md). If unpublished or data is unavailable, record that limitation rather than inventing results.

## Episode file layout

When requested, create a new child inside the existing `example content/` folder, for example:

```text
example content/
  Day 1 on the 10th floor.mp4  # existing reference; preserve
  001-short-episode-slug/
    brief.md                  # copy from templates/episode-brief.md
    review.md                 # copy from templates/review.md
    performance.md            # copy when collecting feedback
    script-id.md              # final script and editable caption text
    sources/                  # source assets, prompts, rights records as needed
    final.mp4                 # only when an export is requested
```

Folder names and the episode ID should be stable and descriptive. The playable Remotion code lives in the parent `src/` and served media in parent `public/`; link their relative paths in the brief so the episode can be reconstructed. Do not move, overwrite or edit the reference video. This layout is a proposal for future work; it does not indicate these episode files already exist.
