import {interpolate, useCurrentFrame} from "remotion";

export function TimestampBadge({text, revealFrames}: {text: string; revealFrames: number}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, revealFrames], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <div style={{position: "absolute", left: "8%", top: "8%", opacity: progress, translate: `${-18 * (1 - progress)}px 0`, padding: "14px 20px", background: "rgba(12,23,30,.72)", color: "#f4d394", borderLeft: "6px solid #e5ad62", font: "bold 36px Arial, sans-serif", letterSpacing: 3}}>{text.toUpperCase()}</div>;
}
