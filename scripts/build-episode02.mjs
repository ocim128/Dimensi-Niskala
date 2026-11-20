// Assemble Episode 002 from the reviewed audio lock and one-off illustrated panels.
// Refuse to replace an existing episode manifest or captions.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const dir='episodes/002-kabur-dari-mobil/', asset='assets/002-kabur-dari-mobil/',fps=30;
if(existsSync(dir+'manifest.json')||existsSync(dir+'captions.json'))throw Error('Refusing to overwrite an existing Episode 002 manifest or captions');
const lock=JSON.parse(readFileSync(dir+'audio-lock-v3.json','utf8'));if(lock.status!=='production-locked')throw Error('Audio is not locked');
const data=JSON.parse(readFileSync(dir+lock.timestamps,'utf8'));const duration=Math.ceil((lock.durationSec+1.2)*fps),narrationDuration=Math.ceil(lock.durationSec*fps),f=s=>Math.round(s*fps);
const key=new Set(['zombie','pintu','bunyi','spion','sabuk','tas','celah','truk','kosong','belakangnya']);
const danger=new Set(['zombie','panik','kosong']);
const clean=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
let groups=[], group=[];
for(const word of data.words){if(group.length && (group.length>=4||word.start-group.at(-1).end>.36||/[.!?]$/.test(group.at(-1).word))){groups.push(group);group=[];}group.push(word);}if(group.length)groups.push(group);
const captions=groups.map((g,i)=>{const words=g.map(w=>{const k=clean(w.word);return {text:k==='tiga'?'3':w.word,...(danger.has(k)?{color:'red'}:key.has(k)?{color:'yellow'}:{}),startMs:Math.round(w.start*1000),endMs:Math.round(w.end*1000)};});return {startMs:Math.round(g[0].start*1000),endMs:Math.round(Math.min(i+1<groups.length?groups[i+1][0].start:g.at(-1).end+.12,g.at(-1).end+.18)*1000),timestampMs:null,confidence:null,words};});
const box={x:.08,y:.18,width:.84,height:.18};
const call=(id,text,at,duration=50)=>({id,type:'tacticalCallout',text,at,duration,revealFrames:5,box});
const route=(id,at,duration,revealFrames=60)=>({id,type:'blueprintOverlay',at,duration,revealFrames,box:{x:.08,y:.3,width:.66,height:.20},paths:[{points:[{x:.15,y:.8},{x:.35,y:.55},{x:.76,y:.55},{x:.88,y:.18}],arrow:true}]});
const badge=(id,text,at=0,duration=45)=>({id,type:'timestampBadge',text,at,duration,revealFrames:5});
const inventory=(id,at,water,battery)=>({id,type:'supplyChecklist',at,duration:75,revealFrames:55,box:{x:.08,y:.36,width:.58,height:.2},items:[{label:'AIR',value:water/100,display:`${water}%`},{label:'BATERAI',value:battery/100,display:`${battery}%`}]});
const cue=(name,path,at,duration,gain)=>({name,asset:'sfx/'+path,at,duration,gain});
function shot(id,name,s,file,purpose,protagonist,hud=[],extra={}) {return {id,name,at:f(s),plate:asset+file+'.png',camera:{from:{scale:1.02,x:0,y:0},to:{scale:1.075,x:0,y:-5}},characters:{mode:'baked'},hud,editorial:{protagonist,purpose:purpose==='tactical'?'tactical-hud':purpose,evidence:name},...extra};}
const scenes=[
shot('hook','Pengemudi dan gadis di kursi belakang',0,'01-hook','character-emotion','reaction',[badge('clock','HARI 1 · 03:05',0,52),inventory('entry',60,50,60)]),
shot('gridlock','Mobil terjepit di tol',5.8,'02-gridlock','tactical','visible',[route('route',0,155,130)]),
shot('closing-gap','Celah di samping truk terancam',12,'02b-gap','tactical','reaction',[call('gap-label','CELAH MENUTUP',4,55),route('gap-route',58,100,85)]),
shot('look-away','Pengemudi menghindari spion',18.6,'03-dashboard','character-emotion','reaction',[call('one','01 · JANGAN MENATAP',5,65),route('sightline',84,105,90),call('wait','TATAP DASBOR',212,55),call('smile','DIA TERSENYUM',285,45)]),
shot('belt','Tahan pengait sabuk',30,'04-belt','character-emotion','reaction',[call('two','02 · TAHAN PENGAIT',2,60),route('belt-guide',60,100,85)],{cues:[cue('Pengait sabuk tertahan','prepared/door-lock.wav',f(3.25),13,.24)]}),
shot('door','Buka hanya kunci pintu pengemudi',36,'05-door','character-emotion','reaction',[call('unlock','BUKA KUNCI PINTUMU',3,55),route('unlock-guide',65,100,90),call('three','03 · RAIH TAS',165,56)],{cues:[cue('Kunci pintu','prepared/door-lock.wav',f(.9),14,.22)]}),
shot('escape','Merunduk keluar dari mobil',44.2,'06-escape','tactical','reaction',[route('escape-route',1,70,65),call('low','TETAP RENDAH',75,40)],{cues:[cue('Tas bergerak','prepared/coat-shift.wav',8,10,.1)]}),
shot('clue','Pantulan pintu belakang terbuka',48.2,'07-mirror-clue','character-emotion','reaction',[]),
shot('water','Berjongkok di balik truk dan minum',50.7,'08-drink','character-emotion','reaction',[]),
shot('map','Memeriksa peta di balik truk',52,'09-phone-v2','character-emotion','reaction',[badge('clock-end','HARI 1 · 03:20',0,45)]),
shot('notice','Pengemudi menyadari MPV kosong di sampingnya',54.2,'10-notice','character-emotion','reaction',[inventory('exit',1,40,57),call('empty','MOBIL KOSONG',90,55)]),
shot('reveal','Pengait sabuk di kursi belakang kosong',60,'11-empty-seat','threat-proximity','absent',[call('backseat','KURSI BELAKANG',70,50)],{cues:[cue('Pengait sabuk terlepas','prepared/door-lock.wav',f(4.75),16,.70),cue('Tarikan sabuk','prepared/coat-shift.wav',f(4.95),9,.30),cue('Dengung akhir','prepared/reveal-sting.wav',f(5.15),25,.25)]})
];
const beds=[{name:'Hujan jalan tol',asset:'sfx/prepared/traffic-bed.wav',at:0,duration:f(60),gain:.45,fadeIn:6,fadeOut:35,loop:true,envelope:[{frame:0,gain:.8},{frame:f(35),gain:.8},{frame:f(48),gain:.55},{frame:f(58),gain:.4},{frame:f(59.4),gain:0},{frame:f(59.9),gain:0}]},{name:'Tekanan rendah',asset:'sfx/prepared/sub-drone.wav',at:0,duration:f(60),gain:.4,fadeIn:25,fadeOut:20,loop:true,envelope:[{frame:0,gain:.45},{frame:f(18),gain:.7},{frame:f(40),gain:.65},{frame:f(52),gain:.4},{frame:f(59.4),gain:0},{frame:f(59.9),gain:0}]}];
const rasters=Object.fromEntries(scenes.map(s=>[s.plate,'gritty-dark-anime-comic']));
const m={schemaVersion:2,id:'Arc01Episode02',arcEpisode:2,characterSheets:['assets/characters/arc-01-driver/sheet.png','assets/characters/arc-01-passenger-teen/sheet.png'],fps,duration,captions:'captions.json',openingTitle:'KABUR DARI MOBIL',narration:{asset:asset+'narration-v3.mp3',at:0,duration:narrationDuration,gain:.9},effectBusGain:.5,beds,art:{styleId:'gritty-dark-anime-comic',rasterAssets:rasters},script:{format:'survival-tactics-curiosity-gap',hook:{at:0,line:'Ada zombie, jangan buka pintu.'},promise:{at:f(3),line:'Satu bunyi bisa membuatnya tahu kapan kamu bergerak.',openLoop:'Apa yang terdengar setelah kamu kabur?'},tactics:{at:f(12),steps:[{number:1,at:f(18.72),line:'Pertama, alihkan pandangan dari spion.',detail:'Tatap dasbor dan jangan menarik perhatian.'},{number:2,at:f(30.34),line:'Kedua, tahan pengait sabuk.',detail:'Lepas sabuk tanpa membentur pintu.'},{number:3,at:f(40.98),line:'Ketiga, raih tas.',detail:'Merunduk keluar melalui sela kendaraan.'}]},ending:{at:f(55),twistAt:f(60),payoff:'Bunyi sabuk pengaman terlepas dari kursi belakang mobil kosong.'}},scenes};
for(const s of scenes)if(!existsSync('public/'+s.plate))throw Error('Missing panel '+s.plate);
writeFileSync(dir+'captions.json',JSON.stringify(captions,null,2)+'\n');writeFileSync(dir+'manifest.json',JSON.stringify(m,null,2)+'\n');console.log(`${m.id}: ${scenes.length} unique panels, ${captions.length} captions, ${duration} frames`);
