# Engine upgrade for Agent 2

## Active ticket · Episode 001, Attempt 06 final lock

1. Use the owner-supplied [ShortZ Gemini Flash narration](public/assets/001-kemacetan-terakhir/attempt-06/episode-001-cloud-investigator.mp3). Carry over Attempt 05’s written script, caption style, HUD beat order and separate knock effects. Rebuild their timing against the new take using the [Attempt 06 audio handoff](episodes/001-kemacetan-terakhir/attempt-06/brief.md).
2. Rebuild Attempt 04’s character-driven sequence in one fresh gritty, dark-shaded anime/comic batch. Show a consistent, gender-open protagonist in the hook with the threat, in at least two mid-episode reaction or action shots, and in the shot immediately before the passenger reveal. The protagonist must be visible in at least 40% of shots. Use POV inserts between acting beats.
3. Generate the protagonist, hand inserts, car interior and infected passenger together. Put every raster in `public/assets/001-kemacetan-terakhir/attempt-06/`. Every shot must show character emotion, threat proximity or a tactical HUD diagram. Cut the abstract dashboard vent and give the two window beats distinct images. Keep at least 15 seconds between uses of the same static plate.
4. Use the existing v2 engine. Preserve `scripts/build-attempt05.mjs` and `src/components/`. Fill in each shot’s `editorial` fields, run `npm run check` and `npm run build`, then compare the full cut to Attempts 04 and 05 in Studio at phone size. Review the hook, two middle actions and the cut into the scare with captions off.

[Attempt 05 script and timing](episodes/001-kemacetan-terakhir/attempt-05/script-id.md) · [Attempt 05 manifest](episodes/001-kemacetan-terakhir/attempt-05/manifest.json) · [Attempt 05 captions](episodes/001-kemacetan-terakhir/attempt-05/captions.json) · [Attempt 04 recut and review](episodes/001-kemacetan-terakhir/recut-v2/review.md)

**Attempt 06 audio lock · 20 November 2026.** The owner replaced the Jejak take for this cut. The supplied Gemini take is 73.68 seconds and has different speech and pause timings. Use the source unchanged as an input and prepare a separate edit that fits the 60–72 second cut. ShortZ’s report flagged three of six chunks, so listen to the supplied file and check the flagged words before finalizing captions. Place the separate knocks in deliberate gaps in the edited timeline.

The owner preferred Attempt 05’s script and captions but found the whole cut weaker. The all-POV coverage reduced the protagonist’s presence, and the old `lock.webp` and `handle.webp` clashed with the new shaded images. The production gates below address both issues across the pipeline.

## Objective

Build a reusable Remotion pipeline for **2–3 videos per day**. The owner’s comparison of Episode 001 (`video_1.mp4`, 84.8 s) with the target (`video_2.mp4`, 71.6 s) favored our illustrated backgrounds and identified gaps in pacing, motion, script structure, art consistency and captions. Use the comparison to judge the next cut at normal speed and phone size. Throughput and creative quality are acceptance targets. [Production rules](STYLE_GUIDE.md)

## Story and delivery contract

Every new episode and recut runs **60–72 seconds inclusive**, including fades and tails. Use **Survival-Tactics + Curiosity Gap** for the Indonesian script.

| Window | Required execution |
| --- | --- |
| 0–3 s | State an immediate survival rule or a counter-intuitive hook. |
| 3–12 s | Make a promise and open a question that the viewer wants answered. An example is *“…asalkan kamu tidak melakukan satu kesalahan fatal ini.”* |
| 12–55 s | Deliver numbered steps such as *Pertama… Kedua…* Each step gives a concrete tactic and a detail the viewer can see in the picture or diagram. |
| 55–70 s | Build quietly, then land a sharp twist that resolves the open loop. The twist must land before the final frame boundary, by 70.0 s at the latest. |

The four existing Episode 001 manifests remain comparison cuts under their existing checks. The additional production gates apply to all new v2 manifests and to edits of the v2 comparisons. The original 84.8-second cut remains the sole unversioned comparison. Comparison eligibility is pinned to the existing manifest path and data fingerprint.

## Remotion work

- Add reusable `TimestampBadge`, `TacticalCallout`, `SupplyChecklist`, `RadarDiagram` and `BlueprintOverlay` components. Render them from scene data and drive their animation with the Remotion frame clock. Position time badges in the upper left. Support text callouts and dashed guides. Animate inventory progress for resources such as water, food and battery. Generate simple SVG paths, arrows and markers from diagram data for action such as locked doors and crowd movement.
- Cap uninterrupted **plain stills at 2.5 s**. Build in motivated cuts, visible changes in action, purposeful reframing and changes in the HUD or infographic. A static HUD, caption change, sound cue or subtle background drift does not reset the visual hold. A long shot can pass through distinct visual events inside it.
- Use one art direction across characters, props and scenery. Assign a single style ID to the raster set and implement two character paths in `RasterScene`. For baked shots, use the illustrated plate. For masked shots, composite the plate, character layer, then the authored raster foreground occluder. Remove the character bottom-gradient mask. Check the jumps in style at 00:46 and the visible cutout feather at 00:03 and 00:16 of the comparison cut.
- Replace the caption pill in `Captions.tsx` with bold condensed uppercase lettering and a crisp dark stroke or drop shadow. Use a locally available, reproducible font and verify the same font loads in Studio and export. Place the block in the lower-middle safe zone above TikTok UI. Display at most four words per beat. Aim for three or four wherever the phrasing allows. Use `white` by default, `yellow` for key survival terms and `red` for danger or scare words. Keep caption timing anchored to the final narration.

## Narration source and handoff

Episode 001’s earlier version used **Jejak** (`jejak`) in **ShortZ**. Its voice description is “Close, understated narration with a mysterious edge.” For work that calls for that preset, run the CLI from the ShortZ repository with the final script as a UTF-8 plain-text file. Attempt 06 uses the owner-supplied Gemini MP3 specified above.

```powershell
pnpm cli tts --voice jejak --text-file "C:/path/to/narasi.txt" --output "C:/path/to/narasi.mp3"
```

ShortZ also supports generating the take from the desktop app. If it is already open, use that session. The Windows launcher below restarts the app.

```cmd
C:\Windows\System32\cmd.exe /d /s /c ""C:\Users\user\Documents\Repo\tiktok-repost\shortz\run.bat""
```

Save the clean take as episode-specific media. Record the voice preset and settings used. Point the manifest at the ShortZ MP3, then time the script beats and captions against that recording and recheck the total duration. Replace any temporary narration before the Studio acceptance review.

For a viewer-as-protagonist script, intercut eye-line inserts with a visible, gender-open protagonist. Review the entire cut with captions off, including mirrors, windshield views, wide shots and the reveal.

Send only spoken lines to ShortZ. Put diegetic sounds on their own scene cues and record the reserved voice gaps in the episode timing handoff. Verify the knocks on the SFX track and the corresponding silence with the narration soloed. Keep the narration captions aligned to spoken text. [Attempt 05 brief](episodes/001-kemacetan-terakhir/attempt-05/brief.md)

## JSON and TypeScript contract

Use these v2 types in `src/manifest-types.ts`. Keep the current `Action`, `Bed`, `RasterLayer` and `Camera` shapes. Reuse the current shot fields for `id`, `name`, `at`, `plate`, `camera`, `hit`, `blackout` and `cues`. Replace the generic layer and label fields in v2 with the structured character and HUD fields below.

```ts
import type {Caption} from "@remotion/captions";

type CaptionColor = "white" | "yellow" | "red";

interface CaptionWord {
  text: string;
  color?: CaptionColor;
}

export interface CaptionBeat extends Omit<Caption, "text"> {
  words: CaptionWord[];
}

interface EpisodeScript {
  format: "survival-tactics-curiosity-gap";
  hook: {at: number; line: string};
  promise: {at: number; line: string; openLoop: string};
  tactics: {
    at: number;
    steps: Array<{number: number; at: number; line: string; detail: string}>;
  };
  ending: {at: number; twistAt: number; payoff: string};
}

type Point = {x: number; y: number};
type HudBox = Point & {width: number; height: number};
type DiagramPath = {points: Point[]; label?: string; arrow?: boolean; dashed?: boolean};

interface HudTiming {
  id: string;
  at: number;
  duration: number;
  revealFrames: number;
}

type Hud =
  | (HudTiming & {type: "timestampBadge"; text: string})
  | (HudTiming & {type: "tacticalCallout"; text: string; box: HudBox; guide?: [Point, Point]})
  | (HudTiming & {
      type: "supplyChecklist";
      box: HudBox;
      items: Array<{label: string; value: number; display: string}>;
    })
  | (HudTiming & {
      type: "radarDiagram" | "blueprintOverlay";
      box: HudBox;
      paths: DiagramPath[];
    });

type CharacterComposite =
  | {mode: "baked"}
  | {mode: "masked"; layers: RasterLayer[]; foreground: string};

export interface SceneV2 extends Omit<Scene, "layers" | "label"> {
  characters: CharacterComposite;
  hud: Hud[];
  editorial: {
    protagonist: "absent" | "visible" | "reaction";
    purpose: "character-emotion" | "threat-proximity" | "tactical-hud";
    evidence: string;
  };
}

export interface EpisodeManifestV2 extends Omit<EpisodeManifest, "scenes"> {
  schemaVersion: 2;
  art: {styleId: "gritty-dark-anime-comic"; rasterAssets: Record<string, "gritty-dark-anime-comic">};
  script: EpisodeScript;
  scenes: SceneV2[];
}
```

Definitions for the JSON fields

- The phase and step `at` values and `twistAt` use composition frames. Set the four phase anchors at exactly 0, 3, 12 and 55 seconds. Scene starts also use composition frames. HUD `at`, `duration` and `revealFrames` use scene-local frames. All intervals are start-inclusive and end-exclusive.
- `HudBox` is normalized to the video canvas, with `x` and `y` at its top-left. Guide and diagram points are normalized to their box. Draw the badge at a shared upper-left anchor. Draw diagrams progressively through `revealFrames` and animate checklist items from zero to their `value`, which is normalized to 0–1. `display` is the on-screen detail, such as `60%` or `½ botol`.
- `art.rasterAssets` maps each referenced raster path to its style ID. For masked characters, `foreground` is a full-plate, alpha-capable raster in the plate’s coordinates. It must cover the relevant character boundary, such as the waist behind a seat or dashboard. Baked scenes include both character-in-plate and environment-only shots.
- `editorial` is validator metadata on the v2 JSON. Use one scene per shot. Mark `visible` for an embodied protagonist and `reaction` for a readable protagonist reaction or action. Mark detached hands and object inserts `absent`. Describe what the shot visibly communicates in `evidence`, such as “shoulders drop below the window as the shadow stops.” The renderer uses the existing visual fields.
- Derive the media root from the manifest directory. For `episodes/<episode>/<attempt>/manifest.json`, use `public/assets/<episode>/<attempt>/`. The same mapping applies to an episode-level manifest. Store plates, masks, poses and narration in that root. Beds and scene cues may also reference `public/sfx/`.
- `captions.json` remains an array. `startMs` and `endMs` are relative to the narration start. Each `words` item is one spoken token with its punctuation attached. Preserve script casing in JSON and uppercase at render time. Join the tokens with spaces when adapting a beat to display text. The word array addresses repeated words independently and replaces substring-based `emphasis`.

```json
[
  {
    "startMs": 12060,
    "endMs": 13120,
    "timestampMs": null,
    "confidence": null,
    "words": [
      {"text": "Pertama,"},
      {"text": "kunci", "color": "yellow"},
      {"text": "pintunya."}
    ]
  }
]
```

## Automated fail-checks in `scripts/check-episodes.mjs`

Keep the existing composition ID, asset, clip and ambience checks. Run the following checks on v2 JSON at runtime through `npm run check`. Errors should identify the episode and offending scene, cue or field, with the relevant frame or millisecond range.

| Check | Fail when |
| --- | --- |
| Version and duration | Schema version is missing or unsupported outside the explicit comparison cut. FPS and duration are invalid integers or `duration < 60 * fps` or `duration > 72 * fps`. |
| Script anchors | Format or phase anchors differ from the contract. A hook, promise, open loop or payoff is blank. There are fewer than two steps, numbering skips or repeats, step starts are unordered or outside `[12 * fps, 55 * fps)`, or any step lacks a line or detail. `twistAt` must be strictly after `55 * fps`, at or before `70 * fps`, and before `duration`. |
| HUD timing and payload | A HUD type is unknown, an ID is blank or repeats within a scene, or a required payload is empty. Require integer frame offsets with `at >= 0`, `duration > 0` and `at + duration <= sceneDuration`. `revealFrames` must be a positive integer no longer than the HUD duration. Reject out-of-range normalized coordinates, boxes outside the canvas, progress outside 0–1, and paths with fewer than two points or with no distinct points. |
| Plain stills | Walk the visual timeline and fail for any uninterrupted span longer than 2.5 s without a qualifying picture change. Build activity intervals from actual rendered timing for character entrances, purposeful camera motion, HUD animation and other authored visual action, with boundaries for distinct visual cuts and graphic reveals. Merge intervals and carry uncovered gaps across scene boundaries when the picture repeats. Identical camera endpoints, captions, audio, a settled overlay and background drift provide no activity. A HUD’s declared lifetime provides no activity beyond its actual animation or visual changes. Use integer comparison `2 * holdFrames > 5 * fps`. At 30 fps, 75 quiet frames pass and 76 fail. |
| Art and compositing | A referenced raster is missing, absent from the style map or assigned a different style ID. A character mode is invalid, a baked shot declares cutouts, a masked shot has no character layers or alpha-capable foreground asset, or a v2 scene uses the legacy `layers` or `label` fields. Apply path and asset checks to foregrounds and cutouts as well as plates. |
| Single asset batch | The manifest uses a style ID other than `gritty-dark-anime-comic`, or a manifest media path resolves outside its own batch. Beds and SFX cues may use the shared `public/sfx/` library. The repository scan rejects byte-identical rasters reused across different attempts of the same episode, including renamed copies. |
| Protagonist and reveal | The protagonist is visible in fewer than 40% of shots, has no shot within 0–3 s, or has fewer than two reaction/action shots starting in `[12, 55)` seconds. The shot at `twistAt` must immediately follow a visible protagonist reaction shot. |
| Purpose and repeat plates | A shot lacks a supported purpose, protagonist tag or visible evidence. A character-emotion shot needs the visible protagonist. A tactical HUD shot needs a diagram, checklist or plotted guide in its HUD payload. Reject byte-identical static plates when shot starts are less than 15 seconds apart, even under different filenames. |
| Caption content and timing | The caption array is empty, beats are unordered or overlap, the times are non-finite, a beat is outside the narration or contains no displayable frame, or it contains zero or more than four words. A beat displays on at least one frame if `ceil(startMs * fps / 1000) < ceil(endMs * fps / 1000)`. Reject blank or whitespace-containing tokens, punctuation-only tokens, colors outside the enum, and legacy `text` or `emphasis` fields. |

The checker fixtures cover threshold failures and passing cuts, including exactly 40% protagonist coverage, the immediate pre-reveal reaction, out-of-batch and copied rasters, and repeated plates under different filenames. The older timing, HUD and caption checks still run.

## Acceptance in Studio

The validator checks declared timing and data. Review the content to decide whether the hook reads in three seconds, steps are concrete and audible, the quiet build earns its twist, and all visual motion reads at phone size. Verify that art has one visual language, each foreground actually occludes its cutout, and captions fit with a legible outline, semantic colors and clearance from TikTok UI. Replay the asset and caption examples at 270 × 480 and listen across the spoken cue boundaries.

For Attempt 06, verify each `editorial.evidence` claim on screen and confirm the rebuilt shots actually share a style. The gate detects path and byte reuse. Studio review catches visual duplicates after re-encoding, unreadable inserts and inconsistent rendering within the batch. Record the playback findings in the episode review.
