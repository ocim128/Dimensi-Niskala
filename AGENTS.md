# Agent instructions for Survival Fantasy Content

- Before working on content, read [README.md](README.md), [STYLE_GUIDE.md](STYLE_GUIDE.md), and the relevant episode brief and [decision history](archive/playbook/experiments.md). Earlier guidance lives in [the archived playbook](archive/playbook/). The owner's current instructions override these working assumptions.
- Make new videos with the Remotion project in this repository root. Follow the applicable installed Remotion skills. Preserve existing user files and the reference video.
- For a cartoon character design or acting test, follow the project [cartoon character development skill](.agents/skills/cartoon-character-development/SKILL.md).
- Indonesian narration and captions and a masculine Indonesian male narrator are the owner's current choices. The owner wants viewers to have an unbelievable experience; the storytelling format remains open. Make assumptions explicit and do not invent established canon, results, permissions or feedback.
- For an episode, maintain a brief, script, asset and rights record, and review using the templates. Record the composition ID and any external dependencies. Update the decision log when evidence exists.
- Creating a video, rendering an export and publishing are distinct actions. Follow the owner's request and applicable Remotion skill instructions. Do not post, schedule, message people or change accounts without authorization.

## Dimensi Niskala character arcs

- Keep one locked protagonist for up to seven episodes, then rotate to a new survivor on the same outbreak timeline. Read the arc record and canonical character sheets before writing. Use the current stage and the preceding episode’s exit clock, inventory and location to fill the brief’s entry state. After the cut is accepted, write its exit state and hook back to the same arc record. [Arc 01](arcs/01-kemacetan-terakhir/arc.json)
- Aim for 80% standalone FYP and 20% serialized continuity. Start with the immediate emergency and rule. Carry the previous state through the opening scene, `TimestampBadge` and `PERSEDIAAN`. Keep recap lines out of the hook. End with a quiet `niskala` reveal that exposes a blind spot in the rule the survivor followed.
- The sole visual and audio benchmark is Episode 001 Attempt 06, [the teenage passenger cut](out/kemacetan-terakhir-attempt06-teen-zombie.mp4). Use the shared sheets and generation records named in the arc record. Treat Attempts 02–05 as production history.

## Episode 002+ factory loop

1. Write **130–155 spoken Indonesian words**. Sentence one establishes both the scenario and the survival rule within three seconds. Use second-person narration with the arc’s locked survivor.
2. Generate the whole script in **one ShortZ `gemini-3.8-flash-tts` call**. Lock the master, measured duration and word timestamps before generating visuals or building the timeline. Review takes outside 61–80 seconds before proceeding.
3. Plan **10–12 unique 9:16 panels** and assign each to a story beat. Keep Indonesian vehicle interiors right-hand drive across all angles.
4. Assemble against the locked narration. Set the manifest’s `openingTitle` to 3–4 punchy words and show it from 00:00.0 to 00:01.8 in the upper-center 3:4 safe zone. Use frame 00:00.2 for the cover and prohibit flash-frame thumbnails. Match caption numbers to the HUD, run the validator and complete the [final review](templates/review.md).
