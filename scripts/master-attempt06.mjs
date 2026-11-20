// Two-pass loudness normalization; preserve the rendered video stream.
import {spawnSync} from 'node:child_process';
const [input,output]=process.argv.slice(2);
if(!input||!output||input===output) throw Error('Usage: node scripts/master-attempt06.mjs input.mp4 output.mp4');
function ff(args){const p=spawnSync('ffmpeg',['-hide_banner','-nostdin',...args],{encoding:'utf8'});if(p.status!==0)throw Error(p.stderr);return p.stderr;}
const first=ff(['-i',input,'-af','loudnorm=I=-14:TP=-1.7:LRA=11:print_format=json','-f','null','-']);
const json=first.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0];if(!json)throw Error('loudnorm did not report measurements');
const m=JSON.parse(json);
const filter=`loudnorm=I=-14:TP=-1.7:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true:print_format=summary`;
console.log(ff(['-n','-i',input,'-map','0:v:0','-map','0:a:0','-c:v','copy','-af',filter,'-ar','48000','-c:a','aac','-b:a','192k','-movflags','+faststart',output]).slice(-1500));
