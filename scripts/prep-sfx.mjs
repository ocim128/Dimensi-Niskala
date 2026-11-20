// Rebuild prepared derivatives; originals and their license record stay intact.
import {readFileSync, mkdirSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

// Optional world-voice treatment; leave the catalog rebuild unchanged when no
// arguments are supplied. Keep each source intact and refuse to overwrite output.
const profiles = {
  'behind-wall': 'highpass=f=300,lowpass=f=1800,aecho=0.8:0.2:45:0.15',
  'close-whisper': 'highpass=f=140,equalizer=f=3200:t=q:w=1:g=2',
  'toa-megaphone': 'highpass=f=500,lowpass=f=2800,asoftclip=type=tanh:threshold=0.8:oversample=2,aecho=0.8:0.25:85:0.18',
};
const args = process.argv.slice(2);
// Rebuild only the new climax derivatives; never overwrite the established library.
if (args.length === 1 && args[0] === '--climax') {
  const build = (inputs, graph, output) => {
    const temp = `public/sfx/prepared/_${output}.wav`;
    const dest = `public/sfx/prepared/${output}.wav`;
    const invoke = a => { const p = spawnSync('ffmpeg', ['-hide_banner', '-nostdin', ...a], {encoding:'utf8'}); if (p.status !== 0) throw Error(p.stderr); return p.stderr; };
    invoke(['-y','-loglevel','error', ...inputs.flatMap(i => ['-i',i]), '-filter_complex', graph, '-c:a','pcm_s24le',temp]);
    const peak = Number(invoke(['-i',temp,'-af','volumedetect','-f','null','-']).match(/max_volume:\s*(-?[\d.]+) dB/)?.[1]);
    if (!Number.isFinite(peak)) throw Error(`No peak: ${output}`);
    invoke(['-y','-loglevel','error','-i',temp,'-af',`volume=${-1-peak}dB`,'-c:a','pcm_s24le',dest]);
    rmSync(temp);
    console.log(`${dest}: normalized to approximately -1 dBFS`);
  };
  build(['public/sfx/tension-rise.wav'], '[0:a]silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB,atrim=duration=3.8,asetpts=PTS-STARTPTS,highpass=f=55,lowpass=f=5000,equalizer=f=1400:t=q:w=0.7:g=-8,afade=t=in:st=0:d=2.8,afade=t=out:st=3.65:d=0.15', 'climax-riser');
  build(['public/sfx/body-fall.wav','public/sfx/metal-resonance.wav','public/sfx/sub-drone.wav'], '[0:a]atrim=duration=0.55,asetpts=PTS-STARTPTS,highpass=f=65,lowpass=f=3500,volume=0.8[a];[1:a]atrim=duration=0.9,asetpts=PTS-STARTPTS,highpass=f=500,equalizer=f=2200:t=q:w=1:g=5,afade=t=out:st=0.1:d=0.8,volume=0.9[b];[2:a]atrim=start=3:duration=0.9,asetpts=PTS-STARTPTS,lowpass=f=180,afade=t=out:st=0.1:d=0.8,volume=1.4[c];[a][b][c]amix=inputs=3:duration=longest:normalize=0,silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB', 'climax-stinger');
  process.exit(0);
}
if (args.length) {
  const validKeys = new Set(['--profile', '--input', '--output']);
  if (args.length !== 6 || args.some((arg, i) => i % 2 === 0 && !validKeys.has(arg)))
    throw Error('Usage: node scripts/prep-sfx.mjs --profile <behind-wall|close-whisper|toa-megaphone> --input <source> --output <new-file>');
  const options = Object.fromEntries([0, 2, 4].map(i => [args[i], args[i + 1]]));
  const filter = Object.hasOwn(profiles, options['--profile']) ? profiles[options['--profile']] : null;
  if (!filter || !options['--input'] || !options['--output'] || resolve(options['--input']) === resolve(options['--output']))
    throw Error('Choose a valid profile and distinct input and output files');
  const result = spawnSync('ffmpeg', ['-hide_banner', '-nostdin', '-n', '-loglevel', 'error', '-i', options['--input'], '-af', filter, options['--output']], {encoding: 'utf8'});
  if (result.error || result.status !== 0) throw Error(result.error ?? result.stderr);
  console.log(`Applied ${options['--profile']} to ${options['--output']}`);
  process.exit(0);
}
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
