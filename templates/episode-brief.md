# Episode brief — [episode ID and working title]

Copy this into `episodes/<episode-id>-<slug>/brief.md`. Complete each step before starting the next.

## Arc Context

- **Arc ID** — [ID and link to `arcs/<arc-id>/arc.json`]
- **Episode X of 7** — [number and stage from the arc record]
- **Entry State** — [clock, inventory and location from the preceding exit, or the established opening state for Episode 1]
- **Exit State** — [clock, inventory, location and ending hook to write back to the arc record once the cut is accepted]
- **Locked Character Sheet Paths** — [public-relative paths from `characters[].sheetPath` in the arc record]

Read the record before writing. If the story changes the carried state, show how it changed. Set the manifest’s `arcEpisode` to the episode number and copy the sheet paths into `characterSheets`.

## 1. Write the script

- **Premise and payoff** — [scenario, survival rule, choice, consequence and final reveal]
- **Survivor** — [locked identity and visual traits from the arc, and the survivor’s goal in this episode]. Keep the Indonesian narration in second person, using `kamu` and forms like `mobilmu`. Rotate protagonists at the next arc on the same outbreak timeline.
- **First sentence** — [immediate emergency and survival rule that both read within three seconds for a first-time FYP viewer]. Use the opening scene, `TimestampBadge` and `PERSEDIAAN` for the 20% serialized continuity.
- **Spoken script** — [link to final script]. Count [___] spoken Indonesian words. Required range **115–130**.
- **Story beats** — [promise and open loop, at least two numbered tactics, quiet build and a `niskala` reveal that exposes a blind spot in the rule the survivor followed]

## 2. Lock one ShortZ master

- Generate the whole script in **one ShortZ `gemini-3.8-flash-tts` request**. Record [master path], [voice ID and settings], [generation date] and [word timestamps]. Keep the master and timing sidecar with the episode.
- **Measured narration duration** — [___ s]. Target 60–73 s prepared narration; flag narration or video below 61 s or above 78 s. Tighten dead air without speeding up the voice; preserve dramatic and foley pauses. Confirm the opening sentence fits within three seconds and lock the source, duration and word timing before building the timeline.
- **Audio review** — [pronunciation, pauses, delivery and gaps reserved for independent SFX]

### Mandatory Audio & Foley Cue Sheet

Audit the final narration for every described in-world sound and stop. Keep `investigator` as the sole storytelling narrator; only generate a separate `entity-female` or `pa-announcer` voice-sfx when an in-scene voice or PA is explicitly mentioned. Record asset paths, exact trigger timing, repeat intervals, rights and the intended silence in the manifest handoff. Mark visual clues that require zero SFX accent. See the [world-audio profiles](../STYLE_GUIDE.md#heard-if-mentioned-world-audio).

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| [Narrated phrase or visual beat and time] | [Asset path and cue type; voice preset if applicable] | [Profile or natural perspective] | [Timing, level/duck, stop, repeat interval or no accent] |

## 3. Plan the panels

Target **10–12 unique 9:16 key panels**, roughly **5–6 seconds per beat**. Keep each image path unique and avoid shot reuse across moods. For an Indonesian vehicle interior, specify **right-hand drive** in every relevant prompt. Keep the wheel, driver and cabin layout consistent.

| Beat and time | Unique panel and narrative purpose | Motion, HUD or effect |
| --- | --- | --- |
| Hook | [protagonist, situation and threat] | [title and action] |
| Tactics | [one row per panel] | [HUD and numeric strings] |
| Anticipation and reveal | [protagonist reaction followed by payoff] | [precise sound hit] |
| Post-Narration Final Jolt (1.0–1.5s) | [dedicated close-up/lunge panel or snap-zoom; concrete threat action] | [final 3–4 s narration ramp; 120–180 ms silence; 0.7–1.1 s jolt with shake, 1–2-frame flash and limited stinger; 0.2–0.3 s hard black] |

- **Asset and rights record** — [batch path, prompts, tools, voice rights, credits and any external dependencies]

## 4. Assemble and review

- **Composition** — [ID, manifest, FPS, frame duration, 9:16 dimensions, output version and preview]. Lock the final runtime within **62–75 seconds**.
- **Opening cover** — Set `openingTitle` to [3–4 punchy, conversational words]. Show it **00:00.0–00:01.8** in the upper center of the centered **3:4** safe zone. Use **00:00.2** for the TikTok cover. Flash-frame thumbnails are prohibited.
- **Captions and HUD** — Align to the locked narration. Record matching numeric strings such as `60%`, `03:00` or `PUKUL 3 PAGI`.
- **Review and delivery** — [validator result, review link and export path if requested]. Complete the [pre-publish review](review.md) and record any owner feedback or decision.
