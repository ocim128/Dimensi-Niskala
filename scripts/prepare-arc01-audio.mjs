// Pitch-preserving Arc 01 narration preparation. Run from the repository root.
// Keep the ShortZ source and sidecars; output timing is provisional until heard.
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const run = (program, args) => {
  const result = spawnSync(program, args, {encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
  if (result.error || result.status !== 0) throw Error(`${program}: ${result.error ?? result.stderr}`);
  return result;
};
const round = n => Math.round(n * 1000) / 1000;
const fade = .01;
for (const number of process.argv.slice(2)) {
  if (!/^00[2-7]$/.test(number)) throw Error(`Invalid episode: ${number}`);
  const dirname = readdirSync('episodes').find(name => name.startsWith(number + '-'));
  if (!dirname) throw Error(`Missing episode ${number}`);
  const dir = join('episodes', dirname);
  const stem = number === '007' ? 'narration-investigator-final' : ['004', '006'].includes(number) ? 'narration-investigator-revised' : 'narration-investigator';
  const source = join(dir, `${stem}.mp3`);
  const sourceTimes = join(dir, `${stem}-timestamps.json`);
  const output = join(dir, 'narration-prepared.mp3');
  const mapPath = join(dir, 'audio-edit-map.json');
  const timingsPath = join(dir, 'narration-timestamps.json');
  if ([output, mapPath, timingsPath].some(existsSync)) throw Error(`Refusing to overwrite prepared output in ${dir}`);
  const timing = JSON.parse(readFileSync(sourceTimes, 'utf8'));
  const duration = timing.durationSec;
  const minimumGap = number === '006' ? .45 : .5;
  const detected = run('ffmpeg', ['-hide_banner', '-i', source, '-af', `silencedetect=noise=-38dB:d=${minimumGap}`, '-f', 'null', '-']).stderr;
  const gaps = [...detected.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)\s*\|\s*silence_duration: ([\d.]+)/g)]
    .map(match => ({start: +match[1], end: +match[2], duration: +match[3]}));
  // Protect each episode's foley/reveal section, including early foley cues.
  // Keep 0.35–0.4 seconds of each detected silent gap; if the take is still long,
  // shorten other genuinely silent gaps above 0.5 seconds by the same rule.
  const footstep = number === '006' ? timing.words.findLast(word => word.word.toLowerCase().replace(/[^\p{L}]/gu, '') === 'langkah') : null;
  if (number === '006' && !Number.isFinite(footstep?.start)) throw Error('Episode 006 footstep onset not found; determine the protected section by listening');
  const protectedStart = Math.min(duration - 12, number === '006' ? Math.max(0, footstep.start - 1) : ({'003': 54, '005': 63, '007': 47})[number] ?? duration);
  const retainedGap = number === '006' ? .35 : number === '005' ? .38 : .4;
  const candidates = gaps.filter(g => g.start > .5 && g.end < protectedStart);
  const major = candidates.filter(g => g.duration > .65);
  let selected = major;
  const targetCeiling = number === '006' ? 71.95 : 72.3;
  if (duration - major.reduce((sum, g) => sum + g.duration - retainedGap, 0) > targetCeiling)
    selected = candidates;
  const cuts = selected.map(g => {
    const midpoint = (g.start + g.end) / 2;
    const length = g.duration - retainedGap - fade;
    return {start: round(midpoint - length / 2), end: round(midpoint + length / 2)};
  });
  const ranges = [];
  let pos = 0;
  for (const cut of cuts) { ranges.push({start: pos, end: cut.start}); pos = cut.end; }
  ranges.push({start: pos, end: duration});
  const chains = ranges.map((r, i) => `[0:a]atrim=start=${r.start}:end=${r.end},asetpts=PTS-STARTPTS[a${i}]`);
  let last = 'a0';
  for (let i = 1; i < ranges.length; i++) {
    const out = `x${i}`;
    chains.push(`[${last}][a${i}]acrossfade=d=${fade}:c1=tri:c2=tri[${out}]`);
    last = out;
  }
  run('ffmpeg', ['-n', '-hide_banner', '-loglevel', 'error', '-i', source, '-filter_complex', chains.join(';'), '-map', `[${last}]`, '-ar', '48000', '-ac', '1', '-codec:a', 'libmp3lame', '-q:a', '2', output]);
  const mapTime = t => {
    let removed = 0;
    for (const cut of cuts) {
      if (t < cut.start) break;
      if (t < cut.end) return round(cut.start - removed - fade / 2);
      removed += cut.end - cut.start + fade;
    }
    return round(Math.max(0, t - removed));
  };
  const outDuration = round(duration - cuts.reduce((sum, cut) => sum + cut.end - cut.start + fade, 0));
  const mapObject = item => ({...item, start: mapTime(item.start), end: mapTime(item.end)});
  const edited = {...timing, durationSec: outDuration, chunks: timing.chunks.map(mapObject), words: timing.words.map(mapObject), sfx: timing.sfx?.map(mapObject), source: stem + '-timestamps.json', note: 'Remapped ASR timing is provisional; listen for cut consonants and verify captions before use.'};
  writeFileSync(timingsPath, JSON.stringify(edited, null, 2) + '\n');
  writeFileSync(mapPath, JSON.stringify({source, output, sourceDurationSec: duration, preparedDurationSec: outDuration, silenceThresholdDb: -38, minimumGapSec: minimumGap, retainedGapSec: retainedGap, crossfadeSec: fade, protectedFromSec: protectedStart, cuts, playbackDucks: [], notes: 'No playback speed change; only quiet gap centers removed. Inhales were not automatically ducked: review by ear. ASR timestamps and cuts require listening review.'}, null, 2) + '\n');
  console.log(`${number}: ${duration.toFixed(2)} → ${outDuration.toFixed(2)} s; ${cuts.length} cuts`);
}
