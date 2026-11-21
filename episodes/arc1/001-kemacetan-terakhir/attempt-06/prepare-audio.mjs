// Prepare a separate, pitch-preserved edit of the owner's supplied source.
// Run from the repository root. The original MP3 is never modified.
import {existsSync, readFileSync, writeFileSync, copyFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const folder = 'episodes/001-kemacetan-terakhir/attempt-06/';
const input = 'public/assets/001-kemacetan-terakhir/attempt-06/episode-001-cloud-investigator.mp3';
const output = 'public/assets/001-kemacetan-terakhir/attempt-06/narration-edit.wav';
const ranges = [
  {start:0, end:10.65, out:0, speed:1},
  {start:10.65, end:33.10, out:12, speed:1.14},
  {start:33.10, end:59.80, out:32, speed:1.16},
  {start:59.80, end:65.70, out:55.30, speed:1.15},
  {start:65.70, end:68.43, out:62, speed:1.10},
  {start:68.43, end:73.68, out:66, speed:1.12},
];
const captionsOnly = process.argv.includes('--rebuild-captions');
if (!captionsOnly && (existsSync(output) || existsSync(folder+'captions.json'))) throw Error('Refusing to overwrite audio or captions');
if (captionsOnly && !existsSync(folder+'audio-edit-map.json')) throw Error('No existing edit map');
const parts = ranges.map((r,i) => `[0:a]atrim=start=${r.start}:end=${r.end},asetpts=PTS-STARTPTS,atempo=${r.speed},adelay=${Math.round(r.out*1000)}:all=1[a${i}]`).join(';');
const filter = `${parts};${ranges.map((_,i)=>`[a${i}]`).join('')}amix=inputs=${ranges.length}:duration=longest:normalize=0[mix]`;
if (!captionsOnly) {
  const ff = spawnSync('ffmpeg', ['-n','-hide_banner','-loglevel','error','-i',input,'-filter_complex',filter,'-map','[mix]','-ar','48000','-ac','1','-c:a','pcm_s16le',output], {stdio:'inherit'});
  if (ff.status !== 0) throw Error('ffmpeg failed');
}

// Align the exact scripted words and Attempt 05 phrase breaks to the new take's
// ShortZ ASR timestamps. ASR remains a hint: pronunciation must be heard by a person.
const sidecar = JSON.parse(readFileSync(folder+'episode-001-cloud-investigator-timestamps.json','utf8'));
const words = sidecar.words.map(w=>({...w}));
const combine = (i) => {words[i].word+=words[i+1].word;words[i].end=words[i+1].end;words.splice(i+1,1)};
combine(2); // di + ketuk
combine(words.findIndex(w=>w.word==='-satunya')-1);
const number = words.findIndex(w=>w.word==='60%.');
const n = words[number], step=(n.end-n.start)/3;
words.splice(number,1,...['enam','puluh','persen'].map((word,i)=>({word,start:n.start+i*step,end:n.start+(i+1)*step})));
const captions05 = JSON.parse(readFileSync('episodes/001-kemacetan-terakhir/attempt-05/captions.json','utf8'));
const scripted = captions05.flatMap(c=>c.words);
if (words.length !== scripted.length) throw Error('word counts do not align');
const allowed = new Set([0,44,50,81,100,110,116]);
const norm = s=>s.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
for(let i=0;i<words.length;i++) {
  if (i===2) words[i].word='diketuk';
  if (norm(words[i].word)==='3') words[i].word='tiga';
  if(norm(words[i].word)!==norm(scripted[i].text) && !allowed.has(i)) throw Error(`Unexpected word mismatch at ${i}: ${words[i].word}/${scripted[i].text}`);
}
const mapTime = t => {const r=ranges.find((x,i)=>t>=x.start && (t<x.end || i===ranges.length-1)); if(!r) throw Error(`Missing source time ${t}`); return (r.out+(t-r.start)/r.speed)*1000;};
let index=0;
const captions=captions05.map(c=>{const first=index;index+=c.words.length;const last=words[index-1];const r=ranges.find((x,i)=>last.start>=x.start&&(last.start<x.end||i===ranges.length-1));const end=r.out+(Math.min(last.end,r.end)-r.start)/r.speed;return {startMs:Math.round(mapTime(words[first].start)),endMs:Math.round(end*1000),timestampMs:null,confidence:null,words:c.words.map((word,i)=>({...word,startMs:Math.round(mapTime(words[first+i].start)),endMs:Math.round(mapTime(Math.min(words[first+i].end, r.end)))}))};});
// Sidecar timestamps can overrun a chunk or overlap the next phrase.
for(let i=0;i<captions.length-1;i++) captions[i].endMs=Math.min(captions[i].endMs,captions[i+1].startMs);
for (const caption of captions) for (const word of caption.words) word.endMs = Math.min(word.endMs, caption.endMs);
// Display the spoken numbers consistently with the inventory and time HUD.
for (const caption of captions) {
  const text = caption.words.map(word => norm(word.text));
  if (text.join(' ') === 'baterai enam puluh persen') caption.words = [caption.words[0], {text:'60%',color:'highlight',startMs:caption.words[1].startMs,endMs:caption.words[3].endMs}];
  if (text.join(' ') === 'pukul tiga pagi') caption.words[1] = {...caption.words[1],text:'3'};
}
writeFileSync(folder+'captions.json',JSON.stringify(captions,null,2)+'\n');
if (!captionsOnly) copyFileSync('episodes/001-kemacetan-terakhir/attempt-05/narasi.txt',folder+'narasi.txt');
writeFileSync(folder+'audio-edit-map.json',JSON.stringify({source:input,output,ranges,playbackDucks:[{startSec:62.06,endSec:62.62,gainDb:-3.5,fadeSec:.06,implementedIn:'manifest narration.ducks'}],notes:'ASR-based alignment is provisional and requires listening.'},null,2)+'\n');
console.log(`Created ${output} and ${captions.length} provisional caption beats.`);
