import {interpolate, useCurrentFrame} from "remotion";
import type {DiagramPath, HudBox} from "../../manifest-types";

export function BlueprintOverlay({box, paths, revealFrames, radar = false}: {box: HudBox; paths: DiagramPath[]; revealFrames: number; radar?: boolean}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, revealFrames], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{position: "absolute", left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%`, overflow: "visible"}}>
    {radar && <><circle cx="500" cy="500" r="430" fill="#112d36bb" stroke="#82c9c0" strokeWidth="6"/><circle cx="500" cy="500" r="260" fill="none" stroke="#82c9c088" strokeWidth="4"/><path d="M70 500 H930 M500 70 V930" stroke="#82c9c088" strokeWidth="4"/></>}
    {paths.map((path, i) => {
      const points = path.points.map(p => `${p.x * 1000},${p.y * 1000}`).join(" ");
      const last = path.points[path.points.length - 1];
      const prev = path.points[path.points.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) * 180 / Math.PI;
      return <g key={i}><polyline points={points} fill="none" stroke="#e8c27f" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray={path.dashed ? ".035 .02" : "1 1"} strokeDashoffset={path.dashed ? 0 : 1 - progress} opacity={path.dashed ? progress : 1}/>{path.arrow && <path d="M-35 -22 L0 0 L-35 22" transform={`translate(${last.x * 1000} ${last.y * 1000}) rotate(${angle})`} fill="none" stroke="#e8c27f" strokeWidth="10" opacity={progress}/>} {path.label && <text x={last.x * 1000} y={last.y * 1000 - 25} fill="#f7ecd8" fontSize="65" fontWeight="bold" fontFamily="Arial" opacity={progress}>{path.label}</text>}</g>;
    })}
  </svg>;
}

export function RadarDiagram(props: Omit<Parameters<typeof BlueprintOverlay>[0], "radar">) {return <BlueprintOverlay {...props} radar />;}
