const fs = require('node:fs');
const dir = 'episodes/006-gema-di-underpass';
const source = JSON.parse(fs.readFileSync(`${dir}/narration-timestamps.json`, 'utf8')).words;
const words = [];
for (let i=0; i<source.length; i++) {
  let w = {...source[i]};
  const s = w.word.toLowerCase();
  if (s.startsWith('terwongan')) w.word = w.word.replace(/^terwongan/i, 'terowongan');
  if (s === 'center') w.word = 'senter';
  if (s === 'liat') w.word = 'lihat';
  if (s === 'dilorong') { const mid=w.start+(w.end-w.start)*.25; words.push({...w,word:'di',end:mid}); w={...w,word:'lorong',start:mid}; }
  words.push(w);
}
const captions=[]; let group=[];
function flush() { if (!group.length) return; const ws=group.map(w=>({text:w.word.toUpperCase(),startMs:Math.round(w.start*1000),endMs:Math.round(w.end*1000),...(/^(GADIS|GELAP|MATI)/i.test(w.word)?{color:'red'}:/^(SENTER|LANTAI|TANGGA|DARURAT|LANGKAH|PERTAMA|KEDUA|KETIGA)/i.test(w.word)?{color:'yellow'}:{})})); captions.push({startMs:ws[0].startMs,endMs:ws.at(-1).endMs,timestampMs:null,confidence:null,words:ws}); group=[]; }
for (const w of words) {group.push(w); if(group.length===4 || /[.,!?]$/.test(w.word)) flush();} flush();
fs.writeFileSync(`${dir}/captions.json`,JSON.stringify(captions,null,2)+'\n');
const fps=30, f=s=>Math.round(s*fps), duration=2192, asset=n=>`assets/006-gema-di-underpass/${n}`;
const starts=[0,4,15.4,22,25,29.4,33.5,46.5,50,64.3].map(f);
const names=['Mulut terowongan','Peta stasiun','Sorot lantai','Pijakan basah','Tiang beton','Bayangan kedua','Lorong bertiang','Ponsel padam','Mundur ke tangga','Gadis di kaca'];
const notes=['Pengemudi memeriksa mulut terowongan','Ponsel menunjukkan peta','Pengemudi menyusuri dinding','Kaki melangkah melewati tiang','Pengemudi memperlambat langkah','Bayangan kedua di batas cahaya','Tangga darurat dan pintu stasiun','Pengemudi dan ponsel padam','Pengemudi bereaksi dan mundur di dekat tangga','Gadis menyentuh kaca stasiun'];
const scenes=starts.map((at,i)=>{
 const len=(starts[i+1]??duration)-at, hud=[], reframes=[];
 for(let t=65;t<=len-18;t+=64) reframes.push({at:t,duration:12,scale:reframes.length%2===0?1.08:1.02,x:reframes.length%2===0?-16:0,y:reframes.length%2===0?8:0});
 if(i===0) {hud.push({id:'clock-entry',type:'timestampBadge',text:'HARI 4 • 22:00',at:0,duration:115,revealFrames:10}); hud.push({id:'rule',type:'tacticalCallout',text:'SENTER KE LANTAI',box:{x:.08,y:.24,width:.84,height:.08},at:5,duration:85,revealFrames:8});}
 if(i===1) hud.push({id:'entry-supplies',type:'supplyChecklist',box:{x:.53,y:.035,width:.45,height:.23},at:8,duration:130,revealFrames:12,items:[{label:'AIR',value:.15,display:'15%'},{label:'BATERAI',value:.03,display:'3%'}]});
 if(i===8) {hud.push({id:'clock-exit',type:'timestampBadge',text:'HARI 4 • 22:12',at:f(10.7),duration:105,revealFrames:10}); hud.push({id:'exit-supplies',type:'supplyChecklist',box:{x:.04,y:.12,width:.40,height:.23},at:f(10.7),duration:100,revealFrames:12,items:[{label:'AIR',value:.15,display:'15%'},{label:'BATERAI',value:0,display:'0%'}]});}
 return {id:`panel-${String(i+1).padStart(2,'0')}`,name:names[i],at,plate:asset(`panel-${String(i+1).padStart(2,'0')}.webp`),camera:{from:{scale:1.02,x:0,y:0},to:{scale:1.065,x:0,y:-8}},reframes,characters:{mode:'baked'},hud,editorial:{protagonist:[1,3,5,9].includes(i)?'absent':([4,8].includes(i)?'reaction':'visible'),purpose:i===1?'tactical-hud':([3,5,9].includes(i)?'threat-proximity':'character-emotion'),evidence:notes[i]},cues:[]};
});
function cue(time,name,file,durationFrames,gain) {const frame=f(time); let i=starts.findLastIndex(x=>x<=frame); scenes[i].cues.push({name,asset:`sfx/prepared/${file}`,at:frame-starts[i],duration:durationFrames,gain});}
// A deliberate, regularly spaced walk and its tunnel slapback; the last echo is allowed to decay.
for(let t=.4,n=0;t<49.6;t+=1.05,n++) cue(t,`Langkah pengemudi ${n+1}`,n%2?'ep006-step-right.wav':'ep006-step-left.wav',22,.14);
// A different, separately timed set continues alone after the survivor stops.
for(const [n,t] of [53.0,54.1,55.2,56.3,57.4,58.5].entries()) cue(t,`Langkah kedua ${n+1}`,n%2?'ep006-step-left.wav':'ep006-step-right.wav',22,.15);
// Begin after the entire accepted 71.745 s narration file. Two-frame taps,
// three frames apart, retain the four-frame vacuum before the unchanged jolt.
for(const [n,t] of [71.766667,71.866667,71.966667].entries()) cue(t,`Ketuk kaca ${n+1}`,'glass-knock.wav',2,.32);
cue(72.166667,'Jolt stinger','climax-stinger.wav',21,.5);
const beds=[{name:'Tunnel ambience',asset:'sfx/prepared/night-air.wav',at:0,duration:f(72.033333),gain:.045,fadeIn:12,fadeOut:0,loop:true},{name:'Tension rise',asset:'sfx/prepared/climax-riser.wav',at:f(68.3),duration:f(3.733333),gain:.14,fadeIn:12,fadeOut:0}];
const art={}; for(let i=1;i<=10;i++) art[asset(`panel-${String(i).padStart(2,'0')}.webp`)]='gritty-dark-anime-comic'; art[asset('panel-final-jolt.webp')]='gritty-dark-anime-comic';
const manifest={schemaVersion:2,id:'Arc01Episode06',arcEpisode:6,characterSheets:['assets/characters/arc-01-driver/sheet.png','assets/characters/arc-01-passenger-teen/sheet.png'],fps,duration,captions:'captions.json',openingTitle:'ATURAN TEROWONGAN GELAP',narration:{asset:asset('narration-prepared.wav'),at:0,duration:f(71.745),gain:1},effectBusGain:1,beds,art:{styleId:'gritty-dark-anime-comic',rasterAssets:art},script:{format:'survival-tactics-curiosity-gap',hook:{at:0,line:'Kalau terowongan gelap, arahkan senter ke lantai.'},promise:{at:f(3),line:'Peta menunjukkan stasiun di ujung terowongan.',openLoop:'Siapa lagi di sana?'},tactics:{at:f(12),steps:[{number:1,at:f(15.44),line:'Sorot lantai dekat kakimu.',detail:'Lihat pijakan berikutnya.'},{number:2,at:f(24.5),line:'Susuri dinding dan hitung tiang beton.',detail:'Ingat letak tangga darurat.'},{number:3,at:f(33.51),line:'Hitung langkahmu sendiri.',detail:'Dengarkan gema dan ritmenya.'}]},ending:{at:f(55),twistAt:starts[9],payoff:'Gadis mengetuk kaca stasiun.'}},scenes,tensionRamp:{startSec:68.3,endSec:72.033333,extraScale:.07,vignetteStrength:.48},finalJolt:{triggerSec:72.166667,durationSec:.7,joltImageSrc:asset('panel-final-jolt.webp'),zoomFrom:1,zoomTo:1.18,shakePx:16,shakeDecayMs:320,flashFrames:2,rgbSplitPx:8,blackoutSec:6/30}};
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
