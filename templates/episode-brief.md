# Episode brief — [episode ID and working title]

Copy this into `episodes/<episode-id>-<slug>/brief.md`. Complete each step before starting the next.

## Arc Context

- **Arc ID** — [ID and link to `arcs/<arc-id>/arc.json`]
- **Part and scope** — [Part 001 Pilot or later approved part. In Single-Part Pilot Mode, add a three-line arc premise and scope the brief to Part 001.]
- **Pipeline Version (v2)** — [set manifest `pipelineVersion: 2` for Arc 02 onward]
- **Target Runtime (1.5–3.5m)** — [90–210 s target, including silence and final tail]
- **Entry State** — [clock, inventory and location from the preceding exit, or the established opening state for Episode 1]
- **Exit State** — [clock, inventory, location and ending hook to write back to the arc record once the cut is accepted]
- **Locked Character Sheet Paths** — [public-relative paths from `characters[].sheetPath` in the arc record]

Read the record before writing. If the story changes the carried state, show how it changed. Set the manifest’s `arcEpisode` to the episode number and copy the sheet paths into `characterSheets`.

## 1. Write the script

- **Narrative Engine (Branch-Rewind | Earned Consequence)** — [one or both]
- **Core Dilemma & Bad-Decision Payoff** — [temptation, choice and visible consequence. For rewind, mark the reset and harder path with a cost. For earned consequence, name the immediate or permanent cost.]
- **Survivor** — [locked identity and visual traits from the arc, and the survivor’s goal in this episode]. Keep the Indonesian narration in second person, using `kamu` and forms like `mobilmu`. Rotate protagonists at the next arc on the same outbreak timeline.
- **First sentence** — [immediate emergency and survival rule that both read within three seconds for a first-time FYP viewer]. Use the opening scene, `TimestampBadge` and `PERSEDIAAN` for the 20% serialized continuity.
- **Spoken script** — [link and count]. Target roughly **200–480 spoken Indonesian words**. Let decisions and consequences carry the story instead of numbered survival lectures.
- **Story beats** — [hook in the first three seconds, choice, consequence, survival cost and final reveal]

## 2. Lock one ShortZ master

- Reuse the existing prepared Investigator take when available; otherwise generate the whole script in **one ShortZ `gemini-3.8-flash-tts` request**. Record [master path], [voice ID and settings], [generation date] and [word timestamps]. Keep the master and timing sidecar with the episode. The owner accepts this narrator automatically; do not require a separate listening approval or claim a review was performed.
- **Measured narration duration** — [___ s]. Allow room for dialogue, foley and deliberate silences in the target runtime. Lock source, duration and word timing before assembly.
- **Diegetic World Voices / Dialogue** — [multiple beats with speaker, line or action, cue time, acoustic perspective, 1–3 s dread silences and caption label or color]
- **Audio handoff** — [owner-accepted narration, known ASR uncertainties, pauses and gaps reserved for independent SFX; report any review actually performed]

### Mandatory Audio & Foley Cue Sheet

Audit the final narration for every described in-world sound and stop. Keep `investigator` as the sole storytelling narrator; only generate a separate `entity-female` or `pa-announcer` voice-sfx when an in-scene voice or PA is explicitly mentioned. Record asset paths, exact trigger timing, repeat intervals, rights and the intended silence in the manifest handoff. Mark visual clues that require zero SFX accent. See the [world-audio profiles](../STYLE_GUIDE.md#heard-if-mentioned-world-audio).

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| [Narrated phrase or visual beat and time] | [Asset path and cue type; voice preset if applicable] | [Profile or natural perspective] | [Timing, level/duck, stop, repeat interval or no accent] |

## 3. Plan the panels

### Spatial & Camera Layout

- **Floor plan and route** — [entry, exit, stairs or landings, connecting spaces, and each character’s position at the reveal]
- **Openings and barriers** — [door and window type, hinge and swing direction, bars or glass, which side each character is on, and exact plot-bearing signage]
- **Camera and sightlines** — [where the camera stands, what it looks toward, and which corner, barrier or reflection conceals or reveals the threat. Carry that geometry through the reveal and final jolt.]

For a 2–3 minute cut, plan **roughly 16–26 purposeful 9:16 panels** in Urban Silhouette Noir. Allow 5–9 s for atmospheric shots with slow motion or flicker and cut tightly on action. Keep Indonesian vehicles right-hand drive.

**Show-What-You-Say Panel Lock** — [exact narrated threat or action line | transcript time | panel ID | subject and action visible on screen]. Include each narrated threat and visible action.

| Beat and time | Unique panel and narrative purpose | Motion, HUD or effect |
| --- | --- | --- |
| Hook | [protagonist, situation and threat] | [title and action] |
| Decision and consequence | [choice and visible outcome, one row per panel] | [branch color and any rewind cue] |
| Anticipation and reveal | [protagonist reaction followed by payoff] | [precise sound hit] |
| Post-Narration Final Jolt (1.0–1.5s) | [dedicated close-up/lunge panel or snap-zoom; concrete threat action] | [final 3–4 s narration ramp; 120–180 ms silence; 0.7–1.1 s jolt with shake, 1–2-frame flash and limited stinger; 0.2–0.3 s hard black] |

- **Asset and rights record** — [batch path, prompts, tools, voice rights, credits and any external dependencies]

## 4. Assemble and review

- **Composition** — [ID, manifest, FPS, frame duration, 9:16 dimensions, output version and preview]. Measure the cut against the **90–210 s** target.
- **Opening cover** — Set `openingTitle` to [3–4 punchy, conversational words]. Show it **00:00.0–00:01.8** in the upper center of the centered **3:4** safe zone. Use **00:00.2** for the TikTok cover. Flash-frame thumbnails are prohibited.
- **Captions and HUD** — Align to the locked narration. Record matching numeric strings such as `60%`, `03:00` or `PUKUL 3 PAGI`.
- **Review and delivery** — [validator result, review link and export path if requested]. Complete the [pre-publish review](review.md) and record any owner feedback or decision.
