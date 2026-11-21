# Kemacetan Terakhir V3 · Production Handoff

[Play the MP4](kemacetan-terakhir-v3.mp4) · [Review eight sampled frames](review-frames.jpg) · [Inspect adjacent head-turn frames](head-turn-strip.jpg) · [Open composition in Studio](http://localhost:3000/KemacetanTerakhirV3)

Attempt 03 addresses the owner’s primary defect from v2: the flat cutout flipping of Damar's head during the seated turn. The character rig was reconstructed with continuous geometric rotation, consistent directional window lighting, connected shoulder weight shift, and a dedicated rear three-quarter angle. Editorial ordering was also refined so that visual causes (the outside pursuit and the tapping finger on the headrest) precede their respective narrative confirmations.

---

## Studio Preview & Replay Intervals

To launch Studio from the project root:
```powershell
npm run dev
```
Navigate to: `http://localhost:3000/KemacetanTerakhirV3`

### Exact Replay Intervals for Review

- **Full Seated Turn & Interior Discovery (v3)**: `56.00 s – 65.30 s` (frames 1680–1959)
  - **Taps & Freeze**: `56.00 s – 58.97 s` (frames 1680–1769, `Profile beat="listen"`). First tap at 56.20 s halts hand; second tap at 58.57 s snaps eyes toward interior.
  - **Continuous Head Turn**: `58.97 s – 61.63 s` (frames 1769–1849, `Profile beat="turn"`). Eyes lead, chin follows smoothly from yaw −0.12 through 0 to +1.24, weight shifts into right shoulder against seat.
  - **Rear Three-Quarter & Tapping Finger**: `61.63 s – 65.30 s` (frames 1849–1959, `RearQuarter`). Cut on shoulder weight to rear view looking at passenger headrest; pale finger taps inside headrest at 61.90 s (frame 1857).
  - **Passenger Payoff**: `65.30 s – 69.53 s` (frames 1959–2086, `Payoff`). Infected passenger leans forward into the light.
- **Comparison Baseline (v2 defect interval)**: `63.33 s – 66.20 s` (frames 1900–1986 in v2). In v2, at frame 1951–1952 (65.033–65.067 s), nose, ear, highlights, and hair silhouette swapped sides in a single frame via `scale(-1, 1)`.

> **Owner Feedback Prompt**:
> Please review the turn interval (`58.97 s – 65.30 s`) first muted at phone size (270 × 480), then with captions and audio enabled.
> *Question for owner*: Which movement first caught your attention during the turn, and does Damar now read as a single solid character rotating in cabin space?

---

## What Changed in the Drawing & Motion

1. **Elimination of Cutout Flipping & Piecewise Mirroring**:
   - In v2 and the initial draft, `scale(-1, 1)` and sign-based branching (`k = yaw >= 0 ? 1 : -1`) caused facial features, nose tips, and cheek shadows to jump 6+ pixels and swap sides at the zero-crossing.
   - In v3, all facial coordinates in `src/KemacetanTerakhirV3/damar.tsx` are calculated from continuous trigonometric functions of `yaw` (`s = sin(yaw)`, `c = cos(yaw)`).
2. **Fixed Directional Window Lighting**:
   - Window light enters consistently from screen-left.
   - The cheek shadow plane (`plane`) stays anchored on the screen-right side (away from the window) and continuously deepens (`opacity = 0.18 + 0.26 * f(yaw, -0.2, 1.1)`) as Damar turns away from the window into the cabin. It never flips across the face.
   - The nose bridge highlight remains on the screen-left facet catching window illumination.
3. **Continuous Facial Feature Occlusion & Anatomy**:
   - Sclera, pupils, catchlights, and brows are tracked as distinct left and right anatomical structures.
   - As yaw increases towards cabin interior, the screen-left eye foreshortens and smoothly tucks behind the projecting nose bridge without disappearing prematurely.
   - Left and right ears blend smoothly based on viewing angle, eliminating one-frame pops.
   - Skull contour (`useHead`) preserves occipital skull volume on screen-left while the jaw contour on screen-right shifts into profile; the skull apex remains fixed at y = −98 and the neck root remains anchored at y = 52.
4. **Shoulder Weight & Landmark Anchoring**:
   - `DamarBust` lifts the right shoulder and gathers jacket folds proportionally (`weight = 0.0 -> 0.9`) as his back presses against the seat.
   - The cabin headrest is drawn identically across all profile beats, giving the viewer a fixed spatial landmark to judge head rotation.
5. **Cut to Rear Three-Quarter Angle**:
   - Rather than attempting an impossible 180° rotation on a single 2D vector frontal bust, the continuous turn carries the gaze to screen-right, cutting on the shoulder settling (frame 1849) to a dedicated rear three-quarter view (`DamarRear`). The gaze vector and neck alignment are preserved across the cut.

### Remaining Awkwardness / Producer Notes
- The cut at frame 1849 from frontal-turn to `RearQuarter` is an editorial camera change. While eyeline and shoulder angle are matched, the jump in camera perspective requires viewer acceptance.
- The breathing cycle in `RearQuarter` (`Math.sin(frame * 0.21) * 2`) is intentionally subtle; during silent inspection without audio, the body can read slightly rigid between taps.

---

## Editorial & Story Ordering Improvements

1. **Door Decision (Frames 307–523 / 10.23 s – 17.43 s)**:
   - In v2, the narration stated Damar chose to stay inside before the viewer saw any outside panic.
   - In v3, Damar's hand reaches for the handle while the fleeing runner (frame 40..95) and pursuing threat (frame 95..150) race past the door glass. Damar sees the danger first; fingers, wrist, and elbow retract together in a connected kinematic gesture. Damar depresses the lock pin at frame 470 (cue.lock) and withdraws his hand, leaving the pin visibly down.
   - Take 2 ("Untuk saat ini, ia memilih tetap di dalam mobil...") follows at frame 496, narrating the decision after the viewer has witnessed its visual cause.
2. **First Clue to Tapping Origin (Frames 1680–1959)**:
   - In v2, "dari kursi belakang" was captioned over the mirror at 66.8 s before the passenger was visually revealed.
   - In v3:
     - First clue: Frame 1686 (56.20 s) – muted outside tap; hand freezes.
     - Second clue: Frame 1757 (58.57 s) – second tap; attention snaps from window towards interior.
     - **Clear disclosure**: Frame 1857 (61.90 s) in `RearQuarter` – the tapping finger physically strikes the inner cushion of the front passenger headrest, connected by a pale wrist and dark sleeve to the rear seat.
     - Spoken phrase "Ketukan itu berasal dari kursi belakang" is retimed to frame 1959 (65.30 s), landing exactly as the passenger leans forward into the cabin light.
3. **Change Requiring Most Rework**:
   - Rebuilding `damar.tsx` to eliminate all discrete conditional flipping (`k = yaw >= 0 ? 1 : -1`) across the nose, dual-eye foreshortening, and cheek shadow plane while maintaining the graphic novel aesthetic and skull silhouette across continuous yaw rotation.

---

## Technical Verification & Export Audit

- **Lint & TypeScript**: `npm run lint` passed with 0 errors and 0 warnings.
- **Build / Bundle**: `npm run build` compiled the Webpack bundle cleanly without errors.
- **Timeline & Track Overlap Audit**:
  - `Ilustrasi`: 22 contiguous sequences across 2,151 frames. Every sequence abuts with 0 frame overlap and 0 gaps.
  - `Narator v4`: 12 takes ordered `[0, 1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11]`; no overlaps.
  - `Suasana` & `Efek sinkron`: Ambient sound beds and 11 synchronized sound effects (lock, key, lamps, radio, 3 footsteps, 3 taps, reveal tone) placed on dedicated non-overlapping slots.
  - `Takarir Indonesia`: 40 caption phrases verified with zero temporal collisions or overlaps.
- **Audio Stream Analysis**:
  - Sample rate: 48,000 Hz stereo AAC.
  - Level check: Mean volume −27.1 dBFS, maximum peak volume −6.5 dBFS (6.5 dB headroom, no digital clipping).
- **Exported Video File**:
  - File: `kemacetan-terakhir-v3.mp4` (22,235,439 bytes / 22.2 MB).
  - Format: H.264 High profile, progressive 1080 × 1920 (9:16 vertical), 30.0 fps.
  - Duration: Exactly 2,151 frames (71.70 seconds).
  - Integrity: FFmpeg decoded both video and audio streams end-to-end with 0 dropped frames and 0 decode errors.
