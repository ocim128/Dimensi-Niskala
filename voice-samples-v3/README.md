# Mature Indonesian narrator auditions

The owner said the [previous candidate](../voice-samples-v2/README.md) was still too soft and too young, and requested a voice around age 40. These are two new **candidates**, generated with different descriptions and the same Indonesian script for a direct comparison. Their perceived age, firmness and suitability have not yet been assessed by the owner; the age and personality below describe generation intent, not a verified result or a real person.

- [Candidate A — lower-mid register](candidate-a.mp3): requested a mature, firm and resonant voice with measured conversational energy.
- [Candidate B — middle register](candidate-b.mp3): requested an assertive, expressive public-speaking delivery with clear articulation.

## Indonesian audition text

Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam.

## How the samples were made

On 2026-11-18, each reference was **synthetically designed from text** with the [Qwen3-TTS voice design demo](https://huggingface.co/spaces/Qwen/Qwen3-TTS), via `gradio_client` 2.7.2. No recording of Tom Lembong or any other person was used. Qwen's documented supported languages do not include Indonesian; a direct Indonesian trial omitted words, so the references were instead generated in English and sent with their transcripts to the Indonesian-capable [OmniVoice demo](https://huggingface.co/spaces/k2-fsa/OmniVoice). Cross-language conversion can change the accent, perceived age or vocal delivery and needs listening review.

Both English references say: “The forest fell silent that night. Ahead of me stood a door that had not been there before. When I touched it, the light around me went out.”

| Candidate | Preserved reference | Voice-design instruction |
| --- | --- | --- |
| A | [reference-a.wav](reference-a.wav) | A mature Indonesian man aged around 40, a confident low-mid baritone, rich and slightly textured resonance. His voice is firm and grounded with decisive articulation and persuasive conversational energy, naturally paced and controlled, not whispery, not soft-spoken, not a dramatic announcer. |
| B | [reference-b.wav](reference-b.wav) | An Indonesian man around 40 years old with a mature, masculine middle-register voice. Clear, assertive, assured and expressive, like a thoughtful public speaker talking directly to an audience. Solid forward projection and crisp diction; no softness, no whispering, no shouting, no theatrical affectation. |

For both Indonesian outputs, OmniVoice was given the corresponding synthetic reference and its English transcript, Indonesian language, 32 steps, guidance 2, denoise enabled, speed 1.0, automatic duration and default preprocessing/postprocessing. WAV results were converted to mono 24 kHz MP3 using `libmp3lame -q:a 2`, with no music or added processing. The demos send text and audio to their respective servers. Their versions and outputs may change, and neither generated voice has a fixed provider voice ID; preserve the chosen reference file. See [generate.py](generate.py) for the Indonesian generation call.

## Verification and limitations

Both MP3s were decoded with FFmpeg. `faster-whisper` 1.2.1 with the multilingual `small` model and Indonesian selected recognized the intended audition text in both outputs, ignoring punctuation. This checks wording approximately; it does not establish natural pronunciation, age, forcefulness, consistency across future generations or similarity to a particular person's voice. The agent could not listen to the recordings. Owner feedback is needed before selecting either candidate.

The upstream model and demo service terms should be checked for the intended platform and commercial use before publishing. The samples are provided for creative evaluation, not as a verified rights clearance.

## Reproduce

Install `gradio_client==2.7.2` in a Python environment and put `ffmpeg` on the PATH, then run `python generate.py` from this directory. Existing MP3s are skipped. The script uses the saved synthetic references; it does not reproduce their original design. Outputs may differ and the online demo may impose quotas.
