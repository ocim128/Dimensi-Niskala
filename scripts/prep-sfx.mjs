// Rebuild prepared derivatives; originals and their license record stay intact.
import {readFileSync, mkdirSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const catalog = JSON.parse(readFileSync('public/sfx/catalog.json', 'utf8').replace(/^\uFEFF/, ''));
mkdirSync(catalog.outputDirectory, {recursive:true});
function run(args) { const p=spawnSync('ffmpeg',['-hide_banner','-nostdin','-y',...args],{encoding:'utf8'}); if(p.status!==0) throw Error(p.stderr); return p.stderr; }
for (const item of catalog.oneShots) {
  const tmp=`${catalog.outputDirectory}/_${item.name}.wav`;
  const out=`${catalog.outputDirectory}/${item.name}.wav`;
  const filters=['silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB',item.filters].filter(Boolean).join(',');
  run(['-loglevel','error','-i',item.source,'-af',filters,'-c:a','pcm_s24le',tmp]);
  const log=run(['-i',tmp,'-af','volumedetect','-f','null','-']);
  const peak=Number(log.match(/max_volume:\s*(-?[\d.]+) dB/)?.[1]);
  if (!Number.isFinite(peak)) throw Error(`No peak for ${item.name}`);
  run(['-loglevel','error','-i',tmp,'-af',`volume=${-1-peak}dB`,'-c:a','pcm_s24le',out]);
  rmSync(tmp);
  console.log(`${item.name}: ${peak} dBFS before normalization`);
}
for (const item of catalog.beds) run(['-loglevel','error','-i',item.source,'-af','equalizer=f=1400:t=q:w=0.7:g=-3','-c:a','pcm_s24le',`${catalog.outputDirectory}/${item.name}.wav`]);
// Existing CC0 drone and CC0 metal hit form a short, filtered reveal sting.
const sting=`${catalog.outputDirectory}/reveal-sting.wav`;
run(['-loglevel','error','-i','public/sfx/sub-drone.wav','-i','public/sfx/metal-resonance.wav','-filter_complex','[0:a]atrim=start=3:duration=1.4,asetpts=PTS-STARTPTS,lowpass=f=180,afade=t=out:st=0.15:d=1.25,volume=1.3[a];[1:a]atrim=duration=1.4,asetpts=PTS-STARTPTS,highpass=f=350,lowpass=f=4500,afade=t=out:st=0.15:d=1.25,volume=0.65[b];[a][b]amix=inputs=2:duration=longest:normalize=0,silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB[out]','-map','[out]','-c:a','pcm_s24le',`${catalog.outputDirectory}/_sting.wav`]);
const log=run(['-i',`${catalog.outputDirectory}/_sting.wav`,'-af','volumedetect','-f','null','-']);
const peak=Number(log.match(/max_volume:\s*(-?[\d.]+) dB/)?.[1]);
if(!Number.isFinite(peak)) throw Error('No sting peak');
run(['-loglevel','error','-i',`${catalog.outputDirectory}/_sting.wav`,'-af',`volume=${-1-peak}dB`,'-c:a','pcm_s24le',sting]);
rmSync(`${catalog.outputDirectory}/_sting.wav`);
