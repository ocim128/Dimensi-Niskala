# Kemacetan Terakhir · Attempt 06 audio handoff

**20 November 2026 · Prepared for Agent 2.** The owner selected a new ShortZ take to replace Jejak for this cut. Use Attempt 05’s [written script](../attempt-05/narasi.txt) and beat order with the character-driven picture in the [active ticket](../../../ENGINE_UPGRADE_TICKET.md#active-ticket--episode-001-attempt-06-final-lock). Proposed composition ID `KemacetanTerakhirMotionComicAttempt06`.

## Source and verification

- [Owner-supplied MP3](../../../public/assets/001-kemacetan-terakhir/attempt-06/episode-001-cloud-investigator.mp3) · [ShortZ timestamps](episode-001-cloud-investigator-timestamps.json) · [ShortZ QA report](episode-001-cloud-investigator-report.json)
- Original source `C:/Users/user/Documents/Repo/tiktok-repost/shortz/output/narrator-sample/episode-001-cloud-investigator.mp3`. The served copy is byte-identical. SHA-256 `315E66340C167853C0C40CB36355E45515BA655A784B0EC8D96D3C770E1EBF3A`.
- ShortZ records provider `gemini-cloud`, model `gemini-3.8-flash-tts`, and voice ID `voice_71a5a701-796e-421d-840e-0adc00b0816a`. The mastered MP3 is 48 kHz mono and 73.68 s. Release rights are unconfirmed.
- ShortZ marked 3 of 6 chunks failed. Compare the spoken audio with the script, especially “di sela mobil,” “garis jendela,” “baterai,” “pukul,” and “jendelanya.” The reported differences are ASR findings. Use the sidecar times as alignment hints and verify them by ear.

## Proposed timing for the builder

Keep the supplied MP3 as the source. Save any timing edit under a separate filename. The source exceeds the 72-second limit, and the final words are aligned through roughly 73.54 s. Fit the runtime by tightening pauses and, where needed, apply modest pitch-preserving tempo changes. Leave clean gaps for all three knocks. Verify the audio in and out points before editing, since the times below are provisional estimates from the sidecars and waveform.

| Beat | Source range | Proposed timeline start | Approximate starting tempo |
| --- | --- | ---: | ---: |
| Hook and promise | 0.00–10.80 s | 0.00 s | 1.00× |
| First tactic | 10.80–33.04 s | 12.00 s | 1.12× |
| Second tactic | 33.04–59.83 s | 32.00 s | 1.17× |
| 03:00 setup | 59.83–65.70 s | 55.00 s | 1.15× |
| Empty window line | 65.70–68.45 s | 62.00 s | 1.10× |
| Rear-seat reveal line | 68.45–73.68 s | 66.00 s | 1.12× |

Start the two side-window taps around **60.60 and 61.20 s**. Place the rear knock around **65.00 s**, then show the protagonist’s reaction before the reveal. These replace Attempt 05’s absolute cue times. The proposed map leaves room for a **71.20-second** cut. Confirm that the shortened delivery still sounds natural and that the knocks sit in quiet gaps. Use the [shared foley files and credits](../../../public/sfx/LICENSES.md). Align captions and HUD to the edited audio, with the passenger reveal by 70.00 s.

Build acceptance is pending. Review the edited narration solo, then the effects and full mix, and verify the 60–72 s runtime, caption sync and protagonist coverage in Studio. Record the exact edit timing and rights status in the episode review.


### Jolt recut audio cue sheet ? 20 November 2026

The existing opening and 01:00 taps, 01:05 headrest impact, reveal sting and narration are retained. The new CC0-derived `climax-riser` starts at 01:03.00 and ends before the 01:07.30 reveal; ambient beds fall silent before that reveal. The existing narrated line continues through approximately 01:10.56, so the new layered CC BY/CC0 `climax-stinger` and final snap-zoom occur at 01:10.73, after the last word. Black begins at 01:11.73. This deliberately differs from a 01:07 jolt to avoid blacking out the locked captions and narration. Check the timing and sound by listening.
