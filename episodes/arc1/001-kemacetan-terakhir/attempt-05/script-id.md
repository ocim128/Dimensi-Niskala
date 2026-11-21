# Attempt 05 · narration and effects timing

[Spoken script for ShortZ](narasi.txt) · [Clean Jejak master](narration-jejak.mp3)

The clean master is laid out on a 30 fps timeline starting at frame 0. Use these anchors for the edit and align captions to the delivered speech. Each paragraph is a separate ShortZ take. The extra space around the final cues belongs to the window, the empty view and the slow turn.

| Take | Start | Frame | Opening line |
| --- | ---: | ---: | --- |
| Hook | 0.00 s | 0 | Kalau kaca diketuk |
| Promise and open loop | 3.30 s | 99 | Saat wabah menutup jalan tol |
| First tactic | 12.00 s | 360 | Pertama, kunci semua pintu |
| Second tactic | 32.00 s | 960 | Kedua, hilangkan tanda |
| Quiet build | 55.00 s | 1650 | Pukul tiga pagi |
| Empty view | 61.60 s | 1848 | Jendelanya kosong |
| Payoff | 66.00 s | 1980 | Yang mengetuk duduk tepat di belakangmu |

## Effects for Agent 2

| Start | Frame | Effect and staging |
| ---: | ---: | --- |
| 59.10 s | 1773 | First short hit from `sfx/glass-tick.wav`. Keep the camera at the side glass. |
| 59.70 s | 1791 | Second hit from `sfx/glass-tick.wav`. Reframe on the empty view after the hit. |
| 64.00 s | 1920 | Single lower, duller hit from `sfx/glass-knock.wav`. Show contact at or just after the sound, then turn from the window toward the rear bench. |

The first pair sits inside the reserved 57.60–61.60 s narration gap. The rear knock sits inside 62.90–66.00 s. Drop the ambience beneath the impacts and keep the source change legible on mono phone speakers. Match the visible headrest contact to the rear cue. Use scene-local `at` values equal to the listed frame minus the start of the containing scene. Let the last line land with the passenger visible. The master ends at 70.50 s, or 2,115 frames. Retain the 60–72 s total duration and put the twist at or before 70.00 s.

Caption the actual speech in beats of up to four words. Keep spoken imitations of knocks out of the script and spoken-caption data. If a sound caption is needed for accessibility, attach it to the actual effect. Reveal captions only when their words are spoken.
