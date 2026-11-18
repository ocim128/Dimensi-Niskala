# Indonesian-trained narrator audition

The owner selected these v4 recordings as the working narrator for now. They were unsure whether the accent was better or the same and noted that the delivery might sound faster. The recordings use a speech model trained on Indonesian, with [Candidate A](../voice-samples-v3/candidate-a.mp3)'s synthetic Indonesian audio as the reference. Accent improvement and voice similarity remain subjective; retain the prior samples for future comparisons.

| Sample | Purpose | Script |
| --- | --- | --- |
| [01 — Hutan sunyi](01-hutan-sunyi.mp3) | Same words as Candidate A for comparison | Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam. |
| [02 — Aturan menara](02-aturan-menara.mp3) | Check the voice on a different passage | Ada satu aturan. Jangan pernah membunyikan lonceng di puncak menara. Jika lonceng itu berbunyi, api akan padam. |

## Generation record

- Generated locally on 2026-11-18 with `pocket-tts` 3.1.0 and the Indonesian-trained [anak10thn/pocket-tts-indonesian](https://huggingface.co/anak10thn/pocket-tts-indonesian) model, using its six-layer configuration pinned to revision `17257664e384561c957b02ac92edd1a24807f0e5` and EOS threshold `-6.0`.
- Reference: [Candidate A's Indonesian synthetic WAV](../voice-samples-v3/reference-a-indonesian.wav), with no recording of a real person. The model attempts to carry its voice over; it can change timbre, prosody or perceived age. The model's author reports that its voice conditioning can make different voices sound more alike and that output is bandwidth-limited by its training data.
- Clean audio only; source WAV converted to 24 kHz mono MP3 with FFmpeg `libmp3lame -q:a 2`. Do not assume the same voice or accent is retained across future generations without listening.
- Both files decode successfully. `faster-whisper` 1.2.1 with the multilingual `small` model transcribed the intended words in these two short samples, allowing for punctuation. A separate, longer tower passage was misrecognized and was not included. This is an approximate wording check, not verification of accent, voice quality or speech accuracy by ear.
- The model card lists CC BY 4.0 and credits the LEMAS dataset and Kyutai. The owner's creative selection does not resolve usage rights; verify model, training-data and other applicable terms for the intended use and provide required attribution before publishing.

## Reproduce

From the content repository root, with Python, `uvx` and FFmpeg installed, the first sample can be regenerated to a **new** WAV path with:

```powershell
uvx --from pocket-tts==3.1.0 pocket-tts generate --config 'hf://anak10thn/pocket-tts-indonesian/indonesian_6l.yaml@17257664e384561c957b02ac92edd1a24807f0e5' --voice 'voice-samples-v3/reference-a-indonesian.wav' --text 'Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam.' --eos-threshold -6.0 --output-path 'voice-samples-v4/new-take.wav'
```

The first use downloads the model; output can vary between runs. The model card recommends spelling out numbers, checking longer passages and using short, clear script segments. Preserve the samples and reference above when experimenting.
