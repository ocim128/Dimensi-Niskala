# Episode 005 — assembler review, 21 November 2026

## Caption revision after independent audit failure

**Current handoff:** `out/ep005-suara-dari-rumah-kosong-caption-revision.mp4`, composition `Arc01Episode05`. The earlier MP4 is preserved at `out/ep005-suara-dari-rumah-kosong.mp4`, and the independent audit report remains the historical FAIL for that earlier file. A fresh independent post-MP4 audit is required.

- The Investigator beat `DIA BERBISIK` now runs 66.848–68.408 s. The separate whisper beat `KALAU KACA DIKETUK,` runs 68.900–70.220 s, beginning at the first phrase's approximate waveform onset. `KENAPA KAMU MASIH MENOLEH?` runs 70.833–72.520 s; its start was adjusted from the ASR estimate to the processed whisper waveform's second principal onset (approximately 70.834 s). Remaining word boundaries are provisional ASR estimates and need listening.
- Exported frame 2010 (67.000 s) shows only `DIA BERBISIK`; frames 2058 and 2066 show no caption before the whisper; frame 2067 (68.900 s) shows the first whispered beat. Frames 2107 and 2124 show no caption between whisper phrases; frame 2125 (70.833333 s) shows the second beat. The corresponding images are `verification/caption-revision-frame-02.png`, `-04.png` through `-09.png`, and `caption-revision-montage.jpg`.
- The manifest and accepted voice assets remain unchanged. All 3,457 mastered AAC packets and their timestamps match the earlier export. Seven sampled video frames outside the changed caption interval (6, 600, 900, 1500, 1900, 2179 and 2206) have identical decoded pixel hashes. The new export measures −14.0 LUFS / −1.5 dBTP, with stinger and flash aligned at 72.633333 s and a 133.354 ms measured vacuum. `npm run check` passes 24 tests, including a regression check for the speaker boundary. See `mix-measurements.md`.
- Full-speed playback and listening, including the narrator-to-whisper join, all remaining word timings and the complete mix, remain unchecked. The sample-frame and waveform checks do not replace the independent audit or imply publication clearance.

**Render handoff: ready for independent post-MP4 QA.** This is an assembly result, not an audit verdict or permission to publish. The owner automatically accepts the prepared Investigator narrator; that acceptance does not claim a listening review. The 131-word script is the owner's recorded exception. Composition `Arc01Episode05` uses this episode's `manifest.json`, `captions.json`, approved still batch, existing prepared narration and separately sourced world audio.

## Story and experience

- **Pass, assembly inspection:** opening title and rule establish the locked-house scenario visually. ASR estimates the spoken opening rule ends after three seconds; the precise audible timing remains unchecked. Entry and exit clocks and supply cards use 14:00 / 40% / 18% and 14:10 / 40% / 14%; the SMS and captions use `HARI 5, PUKUL 05:00`.
- **Needs independent review:** standalone comprehension, the subtle window reflection's identity and optical geometry at phone size, glass-hand contact side and continuity from panel 10 to jolt. The last image producer's revised panel 05 has not been independently re-audited.
- **Not checked:** first-time viewer feedback, acting in real-time playback and all transitions; stills alone do not establish these.

## Picture, sound and accessibility

- **Pass, sampled exported stills:** `verification/frame-01.png` is cover frame 6 (00:00.2), frames 02–06 show entry supply, silent clue, exit supply, SMS and reveal, frame 07 shows the first jolt flash and frame 08 blackout. `verification/montage-final.jpg` shows them at 270 × 480. The exit supply card was moved above the survivor after a first-frame review found an overlap. The actual platform profile preview and UI have not been checked.
- **Pass, timeline evidence:** only the final Investigator quote is removed from the PCM derivative; a separate female whisper replaces it. The same plea file repeats at a fixed 4.5-second interval and is cut during the narrated stop. No cue is specially added to the window clue. `world-voice-asr.json`, `audio-edit-map.json` and `mix-measurements.md` contain the timings and limitations.
- **Not checked by listening:** full export, narration and whisper performance, join, voice identity, realism of synthesized phone vibration and glass knocks, balance, caption sync and pronunciation. ASR and waveform measurements cannot substitute for playback. The title, inventory and SMS have only sampled still inspection, not a full phone-size playback.

## Technical, rights and handoff

- **Pass:** final file 1080 × 1920, 30 fps, 73.800 s; `npm run check` passes all 22 tests and validates Episode 005. Existing historical comparison-cut warnings remain. The exported mix measures −14.0 LUFS / −1.5 dBTP. The decoded stinger onset and exported flash frame coincide at 72.633333 s; the vacuum measures 133 ms. Full measurement and reproduction details are in `mix-measurements.md`.
- **Recorded, not cleared for publication:** `asset-rights.md` and `public/sfx/LICENSES.md` contain sources, treatments and the dklon CC BY attribution. Applicable generated-voice, generated-image and font terms remain to be verified. Platform disclosure and publication were not requested or checked.
- **Owner / independent viewer feedback:** no feedback on this assembled cut and no independent viewer result available.
