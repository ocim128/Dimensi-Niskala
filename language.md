# Language, captions and audio

**Owner's choice:** Indonesian narration and Indonesian captions. Write natural, conversational Bahasa Indonesia rather than literal translations. Do not mix languages randomly. If the owner later requests translated versions, adapt the script naturally and review timing and pronunciation separately.

## Voice and writing

Write plainly, vividly and conversationally. Prefer concrete verbs and visible details: “Loncengnya berbunyi. Apinya langsung padam.” Explain an unfamiliar fantasy rule through action, then let the choice reveal its cost. Use short sentences and vary rhythm. Tension should come from uncertainty and consequence, not constant shouting, gore, false urgency or a long list of invented names.

The script should stand on its own, match what the visuals show, and end with an actual outcome. A question is welcome when it follows naturally; do not demand likes or create a cliffhanger in place of a payoff. Choose the point of view to suit the episode and keep it consistent.

## Captions

Captions should match the final spoken audio, including important sound cues when useful. Time them to the real speech, split at natural phrases and allow enough time to read. Use high contrast and large, legible text, with restrained emphasis for key words. Check spelling, punctuation, names, overlap with UI and the final frame. If no speech is used, supply the information in intentional on-screen text rather than inventing a transcript. Keep an editable transcript or caption source with the episode.

The parent project's `npm run create-subtitles` uses Whisper and is configured with `WHISPER_MODEL = "medium.en"` and `WHISPER_LANG = "en"`. Indonesian requires a multilingual model and the appropriate language setting in `whisper-config.mjs`; inspect the current tooling and its inputs before changing shared configuration. It may install Whisper and download a model, processes all of `public/` when run without arguments, and is not a substitute for a human/agent correction pass. Prefer targeting only the intended source file and avoid overwriting other work.

## Voice and sound

Use the masculine Indonesian narrator defined in [voice-profile.md](voice-profile.md). The profile contains the delivery direction, audition passage, continuity procedure and registry for the voice once selected. Review generated pronunciation, unnatural pauses, clipping and factual mismatch after rendering or previewing. Music and effects support the story, never obscure speech; use silence intentionally. Check intelligibility with phone speakers and headphones when available and inspect the mix throughout, not just at the opening. Record source, license and attribution for voice, music and effects in the episode brief.
