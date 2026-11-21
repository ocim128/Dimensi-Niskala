# Episode 003 · Audio producer handoff

Status: **narration accepted by the owner; Agent 03 is next**. No whole-take, pronunciation, edit, effect, or in-context listening review has been performed; owner acceptance does not claim one. The owner-designated brief is passed; its existing 140-word script is a documented exception to the 115–130-word budget. No script, narration master, or existing derivative was changed.

## Narration and review

- Source: [Investigator master](narration-investigator.mp3), 73.070 s per existing report; ShortZ `gemini-cloud`, `gemini-3.8-flash-tts`, voice `voice_71a5a701-796e-421d-840e-0adc00b0816a`. [ShortZ report](narration-investigator-report.json) and [source timestamps](narration-investigator-timestamps.json) are preserved. Access to the configured voice is not independent confirmation of publication rights.
- Prepared: [narration-prepared.mp3](narration-prepared.mp3), measured 71.666 s; [provisional remapped words](narration-timestamps.json), [existing edit map](audio-edit-map.json). Existing map records four quiet-gap cuts, 10 ms crossfades, and no speed change. Its protected region starts at source 54 s. The owner accepts the narrator without a separate listening gate.
- ASR reports 3 of 6 chunks failed and gives possible zero-onset clipping warnings. Final-alignment differences include `rest`/`res`, `bel`/`bell`, `krat`/`kerat`, and `senter`/`center`; these could be recognition or spelling differences but pronunciation cannot be established without listening. Timing contains ASR forms such as `kerat`, `center`, and merged `ketas`; captions must use the approved script and available timing, not silently copy these spellings. The owner accepts the take without requiring an additional listening gate.
- Optional listening excerpts: [opening, first edit and rest](audio-review-clips/01-opening-and-rest.mp3), [krat and boundary](audio-review-clips/02-krat-and-chunk-boundary.mp3), [Kedua edit](audio-review-clips/03-kedua-edit.mp3), [senter and boundary](audio-review-clips/04-senter-and-boundary.mp3), [Ketiga edit](audio-review-clips/05-ketiga-edit.mp3), [waktu edit](audio-review-clips/06-waktu-edit.mp3), [ending](audio-review-clips/07-ending.mp3). A listening review has not been performed and is not required to start Agent 03.
- Provisional timestamps put `jauhi` at 2.40 s and the end of `pintu depan` at 3.68 s. This suggests the full rule lands outside the three-second goal, but remains unverified. The approved script must not be silently changed; establish the rule visually within three seconds. The map has 139 ASR word entries versus 140 script words, so align the captions to the script and record any uncertain boundaries.

## Candidate effects and provisional cue plan

All times are relative to the prepared narration starting at 0; retime against the actual picture, spoken words, and full mix after audio is approved.

| Trigger | Candidate asset / suggested placement | Mix and review |
| --- | --- | --- |
| Opening rest-area tone | `public/sfx/prepared/night-air.wav` | Restrained existing CC0 bed; judge whether suitable for the 05:30 location; duck beneath narration. |
| Silent timer | None | No timer beep. |
| Refrigerator reflection | None | Keep bed natural; no accent. |
| Bell as front door begins to open, after survivor has exited | `public/sfx/prepared/minimarket-doorbell-outside.wav`; provisional onset ~55.6 s, matching `bel` | 1.1755 s; -1.0 dBFS sample, -1.0 dBTP measured. Candidate from CC0 source, low-pass for outside perspective; listen for a suitable ding-dong. The cue overlaps speech; mix below the narrator and retain intelligibility. |
| Glass door begins moving | `public/sfx/prepared/minimarket-door-creak-outside.wav`; provisional onset ~56.0 s, aligned to picture | 1.5452 s; -1.0 dBFS sample, -1.0 dBTP measured. CC0 candidate; keep subtle and verify it reads as the pictured door without masking speech. |
| Final narration tension | `public/sfx/prepared/climax-riser.wav`; candidate starting ~67.8 s | 3.8 s, -1.0 dBFS sample and -1.0 dBTP measured; ride low under narration and cut for the vacuum. Existing CC0 source. |
| Post-word hand strike | `public/sfx/prepared/climax-stinger.wav`; tentative onset 71.726 s, only after the actual last word and 150 ms silence | 0.900 s, -1.0 dBFS sample and -1.0 dBTP measured. Contains body impact, filtered metal and sub; listen to decide whether a crisp screech or uncanny breath is sufficiently present. CC BY attribution required. |
| Blackout | Tentatively 72.626–72.876 s | 0.25 s black. Relative to provisional ASR last-word end 71.576 s, tail is 1.30 s; video is 72.876 s. Audio end and last-word boundary remain unverified; adjust these timings against the available evidence. |

The above peak measurements used FFmpeg `volumedetect` and `ebur128=peak=true`, rounded to 0.1 dB. Asset peaks do not establish finished-mix compliance: measure the final rendered mix at ≤ -1.0 dBTP and adjust gains if needed. Check the bed cut and stinger in the finished mix where possible, and record any unperformed audible review. The source/derivative provenance, CC0 links and required dklon CC BY 3.0 credit are in [shared licenses](../../public/sfx/LICENSES.md); candidate effects are in [catalog](../../public/sfx/catalog.json). No in-world voice or PA is mentioned, so no optional voice asset was generated.

The owner accepts the Investigator narration for production without a separate listening review. Agent 04 can copy the prepared narration into the episode public asset batch and finalize the provisional effect placement, caption timings, source credits and final-mix measurements. Keep unavailable audible checks marked unverified; this handoff does not claim they occurred.
