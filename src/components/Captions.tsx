import {loadFont} from "@remotion/fonts";
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import type {CaptionBeat, EpisodeCaption} from "../manifest-types";

loadFont({family: "TheBoldFont", url: staticFile("fonts/theboldfont.ttf")});

export function Captions({captions}: {captions: EpisodeCaption[] | CaptionBeat[]}) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame * 1000 / fps;
  const cue = captions.find(({startMs, endMs}) => time >= startMs && time < endMs);
  if (!cue) return null;

  if ("words" in cue) return <AbsoluteFill style={{justifyContent: "flex-end", paddingBottom: 350, pointerEvents: "none"}}>
    <div data-caption style={{alignSelf: "center", maxWidth: 860, textAlign: "center", fontFamily: "TheBoldFont, sans-serif", fontSize: 80, lineHeight: 1.05, fontWeight: 900, color: "#fff9ee", WebkitTextStroke: "3px #080c10", paintOrder: "stroke fill", textShadow: "0 5px 4px #000, 0 0 16px #000", textTransform: "uppercase"}}>
      {cue.words.map((word, i) => <span key={i} style={{display: "inline-block", whiteSpace: "nowrap", marginLeft: i ? ".22em" : 0, color: word.color === "red" || word.color === "danger" ? "#f2544e" : word.color === "yellow" || word.color === "highlight" ? "#ffd052" : "#fff9ee"}}>{word.text}</span>)}
    </div>
  </AbsoluteFill>;

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
