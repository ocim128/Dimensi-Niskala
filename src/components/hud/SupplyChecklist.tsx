import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import type {HudBox} from "../../manifest-types";

export function SupplyChecklist({box, items, revealFrames}: {box: HudBox; items: {label: string; value: number; display: string}[]; revealFrames: number}) {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const entry = interpolate(frame, [0, 5], [0, 1], {easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <div style={{position: "absolute", left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%`, opacity: entry, transform: `translateY(${(1-entry)*16}px)`, boxSizing: "border-box", background: "rgba(19,31,37,.93)", border: "3px solid #9eaa9d", padding: "28px 34px", borderRadius: 18, color: "#f4ecd9", fontFamily: "Arial, sans-serif", boxShadow: "0 12px 35px #07101799"}}>
    <div style={{fontSize: 52, fontWeight: 900, letterSpacing: 3, marginBottom: 25}}>PERSEDIAAN</div>
    {items.map((item, index) => {
      const delay = index * revealFrames / Math.max(items.length, 1);
      const p = spring({frame: Math.max(0, frame - delay), fps, config: {damping: 18}, durationInFrames: Math.max(1, Math.round(revealFrames / Math.max(items.length, 1)))});
      return <div key={item.label} style={{marginBottom: 22, opacity: interpolate(frame, [delay, delay + 5], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}><div style={{display: "flex", justifyContent: "space-between", fontSize: 46, fontWeight: 800}}><span>{item.label.toUpperCase()}</span><span>{item.display}</span></div><div style={{height: 14, marginTop: 9, background: "#546461", borderRadius: 8, overflow: "hidden"}}><div style={{width: `${Math.max(0, Math.min(1, p)) * item.value * 100}%`, height: "100%", background: "#e9b86d"}} /></div></div>;
    })}
  </div>;
}
