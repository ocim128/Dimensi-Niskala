# Narration voice profile

**Owner's direction:** a masculine Indonesian male narrator who sounds around 40, inspired by Tom Lembong's speaking style, with a confident, firm and authoritative presence. The earlier samples were judged too soft-spoken, and the second set too young. The practical interpretation below is a creative direction, not a claim that a voice has been matched to him. Use an original or properly licensed voice rather than representing the narration as his or cloning his voice without permission.

## Sound and delivery

- **Language and accent:** natural Bahasa Indonesia with clear, broadly understandable Indonesian pronunciation. Avoid forced regional accents and unnatural translated phrasing.
- **Voice:** mature male, around 40 in perceived age, masculine, low-to-mid register, warm and resonant without an artificially deep or gravelly effect. Prioritize clarity over pitch.
- **Personality:** confident, intellectually engaged, firm and persuasive. Project clear presence and conviction; avoid a soft-spoken or sleepy narrator. Sound curious about the strange world and serious about the stakes.
- **Pacing:** conversational but purposeful, with decisive phrase endings and short natural pauses at sentence boundaries and before important revelations. Maintain forward momentum; slow down only where clarity or tension benefits.
- **Expression:** audible, deliberate stress and varied intonation, especially on the rule, decision and consequence. Build tension with controlled energy and clarity; avoid whispering, shouting, monotonous delivery or exaggerated advertising-announcer theatrics.
- **Consistency:** use one recognizable narrator voice across episodes unless the owner asks for a change. Characters may have distinct dialogue, but the main narrator should remain identifiable.

Reusable production direction, adapted to the selected tool:

> Narator pria Indonesia dengan kesan usia sekitar 40 tahun, suara maskulin dan matang, tegas, percaya diri dan berwibawa. Bahasa Indonesia alami dan jelas. Bicaralah dengan energi terkendali, artikulasi tegas dan intonasi hidup; beri tekanan yang jelas pada aturan, pilihan dan konsekuensinya. Gunakan jeda seperlunya, tanpa berbisik, berteriak atau terdengar seperti penyiar iklan.

This is a style prompt, not a fixed provider setting. Do not use a public figure's name as a voice-cloning instruction.

## Voice selection and continuity

The first [Ardi samples](voice-samples/README.md) were rejected by the owner as too soft-spoken. The [second candidate](voice-samples-v2/README.md) was still too soft and young. The owner prefers Candidate A from the [new mature-voice auditions](voice-samples-v3/README.md) and wants an improved Indonesian accent without losing its character. An Indonesian-reference take is available for comparison; its accent and voice similarity require listening. When an episode is requested:

1. Audition available voices with rights suitable for the intended platforms. Compare the same short Indonesian passage for clarity, masculine tone, measured delivery and natural pronunciation. Select the closest suitable option, rather than claiming a match to a specific person.
2. Keep the selected sample and a record of the provider, model/version, voice name and stable ID, applicable voice settings, language, output format and license/usage terms. Include the generation date, script and any seed or reproducibility setting only if the tool actually exposes it. Never record API keys or credentials. The provider may change a model, so these settings do not guarantee identical output.
3. Save the approved clean sample and voice record in a reusable project location and link them here and from the episode brief. Reuse the same voice ID and settings for later episodes, adjusting only what the episode needs. If a voice must change or is no longer available, compare candidates against the saved sample, record the change and get owner feedback when practical.
4. Generate from the final script in manageable phrases. Listen across joins for timbre, pacing, loudness and room tone; regenerate awkward portions, then recheck the complete narration. Preserve a clean narration master apart from the music and effects.
5. Maintain a pronunciation list for recurring names and invented words, with a readable spelling and a phonetic or tool-specific rendering if needed. Update it as canon develops. Keep captions faithful to what is actually spoken.

## Audition passage

Use the same passage for initial comparisons and future voice replacements. It is a test script, not episode canon:

> Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam. Sekarang, saya harus memilih: masuk, atau menunggu sesuatu datang dari kegelapan.

Evaluate whether each sentence is easy to understand on a phone, whether pauses feel natural, and whether the reveal feels intriguing without overacting. Record impressions and any owner's feedback; do not mark the voice approved without a real audition.

## Voice registry

| Field | Current value |
| --- | --- |
| Status | Candidate A preferred; Indonesian accent refinement under review. Earlier candidates rejected as too soft; second set also too young. |
| Provider / model and version | Qwen3-TTS voice-design demo and OmniVoice demo; weights not pinned; client `gradio_client` 2.7.2 |
| Voice name / stable ID | Two synthetic voice designs, no fixed provider voice IDs; use the saved reference for the selected candidate |
| Language / supported settings / output format | Indonesian; details in the sample record; MP3, 24 kHz, mono |
| Clean reference sample / script / date | [Candidates A and B, references and scripts](voice-samples-v3/README.md), generated 2026-11-18 |
| License / attribution / intended use | Creative evaluation; verify applicable model and demo service terms for publication |
| Pronunciation list | TBD; create when recurring terms exist |
| Last continuity review / owner feedback | Owner prefers Candidate A and wants a more natural Indonesian accent without degrading it; comparison take awaits feedback. |

Do not fill TBD fields with invented values. Update this registry after listening and selection, and log meaningful changes in [experiments.md](experiments.md).
