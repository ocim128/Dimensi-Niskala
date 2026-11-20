# Style guide

Give viewers an unbelievable survival experience in an imagined world. Show the danger, the character’s choice and its consequence clearly enough to follow without prior episodes. Treat continuity as established only when the episode brief explicitly adopts it. The following rules are mandatory for new episodes and recuts.

## Format and script

Use **Survival-Tactics + Curiosity Gap** in every episode. The full cut runs **60–72 seconds**, with a hard maximum of **72 seconds** including any tail. Flat play-by-play narration is prohibited.

| Time | Required story beat |
| --- | --- |
| 0–3 s | Open with an immediate survival rule or a counter-intuitive hook. |
| 3–12 s | Make a promise and open a loop, for example *“…asalkan kamu tidak melakukan satu kesalahan fatal ini.”* |
| 12–55 s | Present numbered tactical steps in Indonesian, starting with *Pertama… Kedua…* Give each step a concrete survival detail and show it in the shot or diagram. |
| 55–70 s | Build quietly, then land a sharp twist that answers the open loop. At 60–69 seconds total, land the twist before the cut ends. |

## Protagonist and shot purpose

- A visible protagonist must appear in **at least 40% of shots**. Show them during the **first three seconds** to establish whose experience this is and where the threat is. Show at least **two reaction or action shots from 12–55 seconds**. The shot immediately before the final reveal must show the protagonist anticipating or reacting to the threat. An empty object or window must never cut straight to the scare.
- Hearing `kamu` should still let any viewer occupy the role. Use one consistent, gender-open design and show readable expressions or posture. Interleave eye-line inserts with embodied acting. Detached hands, dashboard inserts and empty windows do not count toward protagonist coverage.
- Every shot must have a readable primary purpose at 270 × 480. Show **character emotion**, **threat proximity**, or a **tactical HUD diagram**. Drop unreadable abstract close-ups. Never return to the same static plate less than **15 seconds** after its previous shot began. A different crop, HUD or filename does not make it a new plate.

## Picture and motion

- Preserve the illustrated raster backgrounds. Never hold a plain still for more than **2.5 seconds**. Use motivated cuts, visible action or animated graphics to direct attention. A quiet beat can still change visually. Caption changes, a static badge and subtle drift alone leave the underlying shot a plain still.
- Use reusable Remotion overlays on top of the artwork. Use `TimestampBadge` in the upper left for time or day, such as `• HARI 1 • 18:42`. Use `TacticalCallout` for a decision, state change or dashed guide such as `INSTING PERTAMA: LARI`, `RADIO MATI` or `GARIS JENDELA`.
- Show supplies with an animated `SupplyChecklist` notepad or card. Show water, food and battery with progress bars when those resources matter to the story. Use `RadarDiagram` or `BlueprintOverlay` for simple SVG schematics of tactics such as crowd movement or a locked door. Introduce graphics where they clarify the action.
- Lock one fresh raster batch per cut in the **gritty, dark-shaded anime/comic** style. The protagonist, hands, props, environment and threats must share the same linework, shading and level of detail. Flat dot-eye characters and cartoon inserts cannot be mixed into the batch. Previous attempts are staging references. Regenerate their plates and poses in the new style.
- Keep manifest media in the matching episode or attempt folder under `public/assets/`. Only shared sound effects and ambience may reference `public/sfx/`. Give the batch the `gritty-dark-anime-comic` style ID and assign that ID to every raster in the manifest. The validator checks paths and duplicate file contents. Confirm actual stylistic consistency in Studio.
- Bake characters into the scene or cleanly mask them behind an authored foreground seat, dashboard or other occluder. **Soft bottom-feathered character cutouts are prohibited.** Review seat contact and edges through the movement, especially for poses like the driver at 00:03 and 00:16 in the comparison cut.
- Show constraints and consequences in the picture. In *Kemacetan Terakhir*, the cars visibly block the driver and a hand contacts the headrest before the reveal. Sync the sound cue to the event.

## Narration, captions and sound

- Write natural conversational Bahasa Indonesia. Keep the delivery masculine and mature, with clear articulation and deliberate pauses. Use the owner’s recording when supplied. When generating a new take, use **Jejak** (`jejak`) in ShortZ for close, understated narration with a mysterious edge. Keep a clean master. [ShortZ CLI and handoff](ENGINE_UPGRADE_TICKET.md#narration-source-and-handoff)
- Time the captions to the final narration. Aim for **3–4 words per beat**, with an absolute maximum of four. Use **bold uppercase condensed type** with a crisp dark stroke or drop shadow. Place captions in the **lower-middle safe zone above TikTok UI**. Dark semi-transparent pill backgrounds are prohibited.
- Set semantic color per word in `captions.json`. Use `white` by default, `yellow` for key survival terms and `red` for danger or scare words. Check readability and sync at phone size.
- Start with recorded location tone and foley, then add a restrained tension cue where it serves the scene. Leave room for the narration and let a quiet beat hold before a knock or reveal. Use the shared recordings or add new assets with an explicit redistribution license and source credit.
- Keep narration text and sound directions separate. Send only spoken words to ShortZ. Put diegetic sounds such as door knocks in scene SFX cues and reserve audible space for them in the clean voice track. Caption the spoken line from the take. If a sound needs an accessibility caption, mark it as a sound cue timed to the effect.

## Finish a cut

Keep one brief, script, asset record and review. Reuse the engine’s graphic components and shared audio to support a production target of **2–3 videos per day**. Run the episode checks, then review the full cut at normal speed and phone size. Record asset provenance, voice rights and required credit before release. Check the actual platform preview and current disclosure rules when publishing is authorized. [Builder implementation ticket](ENGINE_UPGRADE_TICKET.md)
