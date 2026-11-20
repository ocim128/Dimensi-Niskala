import {Easing, interpolate, useCurrentFrame} from "remotion";
import type {HudBox, Point} from "../../manifest-types";

export function TacticalCallout({text, box, guide, revealFrames}: {text: string; box: HudBox; guide?: [Point, Point]; revealFrames: number}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, Math.min(revealFrames, 5)], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <div style={{position: "absolute", left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%`}}>
    {guide && <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{position: "absolute", width: "100%", height: "100%", overflow: "visible"}}><line x1={guide[0].x * 1000} y1={guide[0].y * 1000} x2={guide[1].x * 1000} y2={guide[1].y * 1000} pathLength={1} stroke="#f1c376" strokeWidth="8" strokeDasharray=".025 .02" opacity={progress}/></svg>}
    <div style={{position: "relative", display: "flex", alignItems: "center", gap: 14, opacity: progress, translate: `${(1 - progress) * -30}px 0`}}><div style={{width: 8, height: 56, backgroundColor: "#e6ad64"}}/><div style={{font: "900 52px Arial, sans-serif", lineHeight: 1.1, color: "#f8e9d0", textShadow: "0 3px 8px #05080d"}}>{text.toUpperCase()}</div></div>
  </div>;
}
