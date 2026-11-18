# Narrator audition: firmer voice direction

The owner found the first [Ardi samples](../voice-samples/README.md) too soft-spoken and judged this second candidate still too soft and too young. See the [new mature voice candidates](../voice-samples-v3/README.md). This set remains available for comparison. It is an original synthetic voice design, not Tom Lembong's voice or a claim of a voice match.

| Sample | Passage | Approximate duration |
| --- | --- | --- |
| [01 — Hutan sunyi](01-hutan-sunyi.mp3) | A strange discovery | 9.8 s |
| [01b — Hutan sunyi, second take](01b-hutan-sunyi.mp3) | Same passage and voice reference, regenerated | 9.8 s |
| [02 — Menara lonceng](02-menara-lonceng.mp3) | A dangerous rule | 12.0 s |
| [03 — Air dan bayangan](03-air-dan-bayangan.mp3) | Scarcity and mystery | 11.0 s |
| [04 — Jembatan kabut](04-jembatan-kabut.mp3) | An impossible cost | 11.8 s |
| [05 — Pilihan terakhir](05-pilihan-terakhir.mp3) | Urgency and a decision | 11.0 s |

These versions use shorter passages than the initial set. Sample 01 uses the same first three sentences as the initial sample 01 for a direct comparison.

## Generation and consistency

- Date: 2026-11-18. Service: [OmniVoice public demo](https://huggingface.co/spaces/k2-fsa/OmniVoice), via `gradio_client` 2.7.2. The demo is an online service; scripts and the reference clip are uploaded to it. The demo source revision observed at generation was `64deef91cf1f7bfdfc97ff07502b4cd47a0e361e`; the exact deployed model weights and seed were not exposed.
- Sample 01 was generated in voice-design mode with Indonesian language, male, middle-aged, low pitch, and no special accent or whisper style. Synthesis: 32 steps, guidance 2, denoise on, speed 1.0, automatic duration, preprocessing and postprocessing on. The model generated a synthetic voice from these attributes; no recording of a person was used.
- The exact generated [reference.wav](reference.wav) was retained. Samples 01b and 02–05 were generated with the same reference and its transcript, using the demo's reference-conditioned mode, Indonesian, 32 steps, guidance 2, denoise on, speed 1.0, automatic duration, preprocessing and postprocessing on. Their scripts and the reproducible calls are in [generate.py](generate.py). Different generations can still vary in tone or pronunciation.
- MP3s are 24 kHz mono, encoded with `libmp3lame -q:a 2` from the generated WAV; no music or separate sound processing. Full decoding, duration and non-silent signal were checked. The agent has not subjectively listened to the recordings, and similarity, firmness, intelligibility and continuity still require listening.
- [OmniVoice's code repository](https://github.com/k2-fsa/OmniVoice) states an Apache 2.0 license; that alone does not establish the demo service terms or every right relevant to publication. Check model, service and asset terms for the intended use before publishing.

## Reference transcript

Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam.

## Automatic wording check

Two local multilingual Whisper models (`faster-whisper` 1.2.1, `base` and `small`, Indonesian selected) transcribed the five original clips on 2026-11-18. Both misrecognized “Di depan saya” in sample 01; this could be a pronunciation issue or a recognition error. A second take, 01b, was generated using the same reference and exact text. The `small` model transcribed that phrase correctly, while `base` still did not. The `small` model also misrecognized the first word “Di” of sample 02; it otherwise produced the intended wording of samples 02–05, ignoring punctuation and capitalization. This is a machine check, not proof of pronunciation or a substitute for listening. Review these moments and the voice personality before adopting a narrator.

## Reproduce

Install `gradio_client==2.7.2` in a Python environment and make `ffmpeg` available. From this directory run `python generate.py`; existing MP3s are skipped. The script generates samples 01b and 02–05 from the saved reference, not a new design for sample 01. The demo can change or impose quotas, and reruns may not match exactly. Save and reuse the reference if this voice is selected; do not assume the model or sample is approved until reviewed.
