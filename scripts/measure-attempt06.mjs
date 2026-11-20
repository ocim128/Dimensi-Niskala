// Report measurements of the encoded output and independent source-side cue levels.
import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
const file=process.argv[2];
if (!file) throw Error('Usage: node scripts/measure-attempt06.mjs <rendered.mp4> [report.json]');
function ff(args) {const p=spawnSync('ffmpeg',['-hide_banner',...args],{encoding:'utf8'}); if(p.status!==0) throw Error(p.stderr); return p.stderr;}
function peak(input,start,duration,filter='anull') {
 const log=ff(['-ss',String(start),'-t',String(duration),'-i',input,'-af',`${filter},volumedetect`,'-f','null','-']);
 const n=Number(log.match(/max_volume:\s*(-?[\d.]+) dB/)?.[1]); if(!Number.isFinite(n)) throw Error(`Missing peak: ${input}`); return n;
}
const loud=ff(['-i',file,'-filter_complex','ebur128=peak=true','-f','null','-']);
const summary=loud.slice(loud.lastIndexOf('Summary:'));
const lufs=Number(summary.match(/I:\s*(-?[\d.]+) LUFS/)?.[1]);
const truePeak=Number(summary.match(/Peak:\s*(-?[\d.]+) dBFS/)?.[1]);
const windows=[['hook',0,.8],['climax',60,1.5],['headrest',65,1],['reveal',67,1.5]].map(([name,start,duration])=>({name,start,duration,mixPeakDbfs:peak(file,start,duration)}));
const manifest=JSON.parse(readFileSync('episodes/001-kemacetan-terakhir/attempt-06/manifest.json','utf8'));
const voice='public/'+manifest.narration.asset;
const voicePeaks=[];
for(let sec=0;sec<70;sec++){const p=peak(voice,sec,1,`volume=${manifest.narration.gain}`);if(p>-45) voicePeaks.push(p);}
const avg=voicePeaks.reduce((a,b)=>a+b,0)/voicePeaks.length;
const bus=manifest.effectBusGain??1;
const sources=[['hook','hook'],['climax','two-taps'],['headrest','rear-knock'],['reveal','passenger']].map(([name,id])=>{
 const cue=manifest.scenes.find(s=>s.id===id).cues[0];const p=peak('public/'+cue.asset,0,cue.duration/manifest.fps,`volume=${cue.gain*bus}`);
 return {name,cuePeakBeforeMasterDbfs:p,relativeToAverageNarrationDb:p-avg};
});
const report={file,integratedLufs:lufs,truePeakDbtp:truePeak,windows,averageActiveOneSecondNarrationPeakDbfs:avg,sourceSideCuePeaks:sources,method:'Window peaks are from the finished encoded mix and can include voice or bed. Cue-to-voice comparisons are from the pre-master sources, before mix compression/encoding; they do not isolate the cue from the final mix. Average excludes one-second narration windows peaking below -45 dBFS.'};
console.log(JSON.stringify(report,null,2));
if(process.argv[3]) writeFileSync(process.argv[3],JSON.stringify(report,null,2)+'\n');
