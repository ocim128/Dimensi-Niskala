"""Master and measure the jolt review exports. Requires FFmpeg and NumPy.

Prepare these local inputs sequentially (use --overwrite only for task-owned files):
  npx remotion render src/index.ts KemacetanTerakhirMotionComicAttempt06 out/ep001-jolt-render-raw-v2.mp4 --bundle-cache=false
  npx remotion render src/index.ts Arc01Episode02 out/ep002-jolt-render-raw-v2.mp4 --bundle-cache=false
  npx remotion render src/index.ts KemacetanTerakhirMotionComicAttempt06 out/ep001-jolt-audio.wav --codec=wav --bundle-cache=false
  npx remotion render src/index.ts Arc01Episode02 out/ep002-jolt-audio.wav --codec=wav --bundle-cache=false

Then run python scripts/master-jolt.py. It overwrites the two named final jolt
exports and their verification stills and measurements, not the source media.
"""
import json, math, re, subprocess
from pathlib import Path
import numpy as np

JOBS = [
    ("ep001", "out/ep001-jolt-render-raw-v2.mp4", "out/ep001-kemacetan-terakhir-jolt.mp4", 70.733333, 1.0, 63.0, "public/assets/001-kemacetan-terakhir/attempt-06/narration-edit.wav"),
    ("ep002", "out/ep002-jolt-render-raw-v2.mp4", "out/ep002-kabur-dari-mobil-jolt.mp4", 68.133333, 1.1, 63.2, "public/assets/002-kabur-dari-mobil/narration-prepared.mp3"),
]
def run(args):
    return subprocess.run(args, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).stderr.decode(errors="replace")

def pcm(path):
    return np.frombuffer(subprocess.run(["ffmpeg","-v","error","-i",path,"-vn","-ac","2","-ar","48000","-f","f32le","-"],check=True,stdout=subprocess.PIPE).stdout,dtype="<f4")

def peak(a):
    x=float(np.max(np.abs(a))) if a.size else 0
    return 20*math.log10(x) if x else -100

for name, raw, output, trigger, dur, ramp, narration in JOBS:
    audio = f"out/{name}-jolt-audio.wav"
    first=run(["ffmpeg","-hide_banner","-nostats","-i",audio,"-vn","-af","loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json","-f","null","-"])
    measured=json.loads(re.findall(r"\{[^{}]+\}",first)[-1])
    filt="loudnorm=I=-14:TP=-1.5:LRA=11:linear=true:measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:measured_thresh={input_thresh}:offset={target_offset}".format(**measured)
    run(["ffmpeg","-hide_banner","-loglevel","error","-y","-i",raw,"-i",audio,"-map","0:v:0","-map","1:a:0","-c:v","copy","-af",filt,"-c:a","aac","-b:a","256k",output])
    log=run(["ffmpeg","-hide_banner","-nostats","-i",output,"-vn","-filter_complex","ebur128=peak=true","-f","null","-"])
    summary=log.rsplit("Summary:",1)[-1]
    loud=float(re.search(r"I:\s*(-?[\d.]+) LUFS",summary).group(1))
    tp=float(re.search(r"Peak:\s*(-?[\d.]+) dBFS",summary).group(1))
    data=pcm(output); voice=pcm(narration)
    # Measure finished-mix windows containing voice, excluding timed effects.
    # Beds may remain audible; nonlinear mastering prevents exact source isolation.
    manifest_path = ("episodes/001-kemacetan-terakhir/attempt-06/manifest.json" if name == "ep001" else "episodes/002-kabur-dari-mobil/manifest.json")
    manifest = json.loads(Path(manifest_path).read_text(encoding="utf8"))
    cues = [((scene["at"] + c["at"]) / manifest["fps"], (scene["at"] + c["at"] + c["duration"]) / manifest["fps"]) for scene in manifest["scenes"] for c in scene.get("cues", [])]
    active=[]
    for i in range(min(len(voice),len(data)) // 96000):
        if i + 1 > trigger or any(start < i + 1 and end > i for start,end in cues): continue
        if peak(voice[i*96000:(i+1)*96000]) > -35:
            active.append(peak(data[i*96000:(i+1)*96000]))
    avg=sum(active)/len(active)
    shock=peak(data[int(trigger*96000):int((trigger+dur)*96000)])
    outdir=Path("out/jolt-verification")/name;outdir.mkdir(parents=True,exist_ok=True)
    for label,time in [("cover",.2),("ramp",ramp),("flash",trigger),("jolt",trigger+.133333),("black",trigger+dur+.1)]:
        run(["ffmpeg","-hide_banner","-loglevel","error","-y","-ss",str(time),"-i",output,"-frames:v","1",str(outdir/(label+".png"))])
    duration=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",output],text=True))
    evidence={"file":output,"durationSeconds":duration,"integratedLufs":loud,"truePeakDbtp":tp,"joltWindowSamplePeakDbfs":round(shock,2),"averageMixedNarrationWindowPeakDbfs":round(avg,2),"narrationWindows":len(active),"joltMinusMixedNarrationPeakDb":round(shock-avg,2),"method":"FFmpeg ebur128 true peak on final AAC. Sample peaks from decoded stereo. Narration reference is the mean of 1-second finished-mix windows with active source voice and no timed effects; ambient beds can still contribute. It is not an isolated narration stem.","firstPass":measured}
    (outdir/"measurements.json").write_text(json.dumps(evidence,indent=2)+"\n",encoding="utf8")
    print(json.dumps(evidence,indent=2),flush=True)
