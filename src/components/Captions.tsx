import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import type {EpisodeCaption} from "../manifest-types";

export function Captions({captions}: {captions: EpisodeCaption[]}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame * 1000 / fps;
  const cue = captions.find(({startMs, endMs}) => time >= startMs && time < endMs);
  if (!cue) return null;

  const emphasized = cue.emphasis ? cue.text.indexOf(cue.emphasis) : -1;
  const text = cue.emphasis && emphasized >= 0 ? <>
    {cue.text.slice(0, emphasized)}<strong style={{color: "#ffd081"}}>{cue.emphasis}</strong>
    {cue.text.slice(emphasized + cue.emphasis.length)}
  </> : cue.text;

  return <AbsoluteFill style={{justifyContent: "flex-end", paddingBottom: 327, pointerEvents: "none"}}>
    <div data-caption style={{
      alignSelf: "center",
      maxWidth: 810,
      textAlign: "center",
      fontFamily: "system-ui, sans-serif",
      fontSize: 65,
      lineHeight: 1.12,
      fontWeight: 800,
      color: "#fff8ea",
      padding: "10px 19px 14px",
      borderRadius: 14,
      backgroundColor: "rgba(8, 12, 22, .78)",
      textShadow: "0 3px 10px #03050a",
      textWrap: "balance",
      translate: `0 ${interpolate(time - cue.startMs, [0, 120], [12, 0], {extrapolateRight: "clamp"})}px`,
    }}>{text}</div>
  </AbsoluteFill>;
}
