const fs=require('node:fs');
const dir='episodes/007-pos-evakuasi-sunyi';
const raw=JSON.parse(fs.readFileSync(`${dir}/narration-timestamps.json`,'utf8')).words;
const words=raw.map(w=>({...w,word:w.word.toLowerCase()==='anterian'?'antrean':w.word.toLowerCase()==='center'?'senter':w.word}));
const captions=[]; let group=[];
for(const w of words){
  group.push(w);
  if(group.length===4 || /[.,!?]$/.test(w.word)){
    const ws=group.map(x=>({text:x.word.toUpperCase(),startMs:Math.round(x.start*1000),endMs:Math.round(x.end*1000),...(/^(BARISAN|GADIS|MENOLEH)/i.test(x.word)?{color:'red'}:/^(JAUHI|PAGAR|TOA|ANTREAN|JALAN|KELUAR|REL|TANDA|BATU|SENTER)/i.test(x.word)?{color:'yellow'}:{})}));
    captions.push({startMs:ws[0].startMs,endMs:ws.at(-1).endMs,timestampMs:null,confidence:null,words:ws});group=[];
  }
}
if(group.length)throw Error('unfinished caption group');
fs.writeFileSync(`${dir}/captions.json`,JSON.stringify(captions,null,2)+'\n');
const fps=30, f=s=>Math.round(s*fps), duration=2204;
const asset=n=>`assets/007-pos-evakuasi-sunyi/${n}`;
const starts=[0,6.1,12.7,21,28.3,40.4,46.4,49.4,58.4,2186/30].map(f);
const names=['Pos dan barisan','Air terakhir','Sirene dan toa','Mengintip antrean','Rute di luar pagar','Peringatan di beton','Sirene berhenti','Gerbang terbuka','Jalur samping rel','Penjaga malam'];
const notes=['Survivor di luar pagar dan barisan diam','Survivor meminum air terakhir','Survivor mendengar toa di pagar','Survivor mengintip barisan dari luar','Survivor berada di jalur luar pagar','Survivor menulis peringatan di dinding','Survivor tegang setelah sirene berhenti','Survivor bereaksi di luar gerbang','Survivor berjalan pergi di samping rel','Sepatu dan senter satpam di depan tulisan'];
const scenes=starts.map((at,i)=>{
  const len=(starts[i+1]??duration)-at,hud=[],reframes=[];
  for(let t=65;t<=len-18;t+=64) reframes.push({at:t,duration:12,scale:reframes.length%2===0?1.065:1.0,x:reframes.length%2===0?-12:0,y:reframes.length%2===0?6:0});
  if(i===8){
    // Turn toward the existing rail-side path before "lampu pos hilang".
    // Keep the station and its lights outside the left-hand crop thereafter.
    reframes.length=0;
    reframes.push({at:65,duration:12,scale:1.065,x:-12,y:6},{at:120,duration:30,scale:1.72,x:405,y:-425});
    for(let t=195;t<=len-18;t+=64)reframes.push({at:t,duration:12,scale:reframes.length%2===0?1.74:1.72,x:reframes.length%2===0?410:405,y:-425});
  }
  if(i===0){hud.push({id:'clock-entry',type:'timestampBadge',text:'HARI 5 • 05:00',at:0,duration:135,revealFrames:8});hud.push({id:'opening-rule',type:'tacticalCallout',text:'JAUHI BARISAN MEMBISU',box:{x:.07,y:.24,width:.86,height:.08},at:58,duration:110,revealFrames:8});}
  if(i===1)hud.push({id:'entry-supplies',type:'supplyChecklist',box:{x:.53,y:.08,width:.45,height:.23},at:8,duration:125,revealFrames:14,items:[{label:'AIR',value:.15,display:'15%'},{label:'BATERAI',value:0,display:'0%'}]});
  if(i===2)hud.push({id:'empty-supplies',type:'supplyChecklist',box:{x:.54,y:.06,width:.44,height:.23},at:8,duration:130,revealFrames:14,items:[{label:'AIR',value:0,display:'0%'},{label:'BATERAI',value:0,display:'0%'}]});
  if(i===4) hud.push({id:'route-diagram',type:'blueprintOverlay',box:{x:.49,y:.10,width:.46,height:.21},at:5,duration:165,revealFrames:22,paths:[{points:[{x:.9,y:.2},{x:.08,y:.2}],label:'PAGAR'},{points:[{x:.85,y:.75},{x:.08,y:.65}],label:'JALUR REL',arrow:true}]});
  if(i===8){hud.push({id:'clock-exit',type:'timestampBadge',text:'HARI 5 • 05:12',at:0,duration:100,revealFrames:8});hud.push({id:'arc-exit',type:'tacticalCallout',text:'ARC 01 • KELUAR JALUR',box:{x:.06,y:.18,width:.88,height:.09},at:8,duration:120,revealFrames:10});}
  if(i===9)hud.push({id:'night',type:'timestampBadge',text:'HARI 5 • MALAM',at:0,duration:len,revealFrames:1});
  return {id:`panel-${String(i+1).padStart(2,'0')}`,name:names[i],at,plate:asset(`panel-${String(i+1).padStart(2,'0')}.webp`),camera:{from:{scale:1.01,x:0,y:0},to:{scale:i===9?1.01:1.06,x:0,y:-6}},reframes,characters:{mode:'baked'},hud,editorial:{protagonist:i===9?'absent':([2,3,5,6,7].includes(i)?'reaction':'visible'),purpose:i===9?'threat-proximity':'character-emotion',evidence:notes[i]},...(i===9?{brightness:1.35,lightUp:{at:4,duration:7,minBrightness:.5,sweep:{fromX:.35,toX:.62,y:.62},offMask:{x:.5,y:.6,radiusX:.43,radiusY:.45}}}:{}),cues:[]};
});
scenes[5].cues.push({name:'Batu pada beton pertama',asset:'sfx/prepared/ep007-stone-scrape.wav',at:f(41.5)-starts[5],duration:43,gain:.28,fadeOut:3},{name:'Batu pada beton kedua',asset:'sfx/prepared/ep007-stone-scrape.wav',at:f(43.05)-starts[5],duration:43,gain:.24,fadeOut:4});
scenes[7].cues.push({name:'Pagar besi membuka',asset:'sfx/prepared/ep007-gate-open.wav',at:0,duration:35,gain:.32,fadeOut:3});
scenes[8].cues.push({name:'Langkah satpam pertama',asset:'sfx/prepared/shoe-left.wav',at:f(65.35)-starts[8],duration:10,gain:.18,fadeOut:2},{name:'Langkah satpam kedua',asset:'sfx/prepared/shoe-right.wav',at:f(66.15)-starts[8],duration:10,gain:.18,fadeOut:2},{name:'Jolt barisan',asset:'sfx/prepared/climax-stinger.wav',at:2165-starts[8],duration:21,gain:.52,fadeOut:4});
scenes[9].cues.push({name:'Langkah terakhir satpam',asset:'sfx/prepared/shoe-left.wav',at:0,duration:7,gain:.15,fadeOut:2},{name:'Klik senter',asset:'sfx/prepared/console-switch.wav',at:4,duration:6,gain:.21,fadeOut:1});
const beds=[{name:'Sirene jauh',asset:'sfx/prepared/ep007-siren-mixready.wav',at:0,duration:1440,gain:.25,fadeIn:12,fadeOut:0,loop:true},{name:'Tension rise',asset:'sfx/prepared/climax-riser.wav',at:f(68.2),duration:115,gain:.14,fadeIn:10,fadeOut:0}];
for(let at=0;at<1440;at+=195) beds.push({name:`TOA ${at}`,asset:'sfx/prepared/ep007-pa-mixready.wav',at,duration:Math.min(177,1440-at),gain:.18,fadeIn:0,fadeOut:0});
const art={};for(let i=1;i<=10;i++)art[asset(`panel-${String(i).padStart(2,'0')}.webp`)]='gritty-dark-anime-comic';art[asset('panel-final-jolt.webp')]='gritty-dark-anime-comic';
const m={schemaVersion:2,id:'Arc01Episode07',arcEpisode:7,characterSheets:['assets/characters/arc-01-driver/sheet.png','assets/characters/arc-01-passenger-teen/sheet.png'],fps,duration,captions:'captions.json',openingTitle:'JANGAN IKUT BARISAN',narration:{asset:asset('narration-prepared.mp3'),at:0,duration:2161,gain:1},effectBusGain:1,beds,art:{styleId:'gritty-dark-anime-comic',rasterAssets:art},script:{format:'survival-tactics-curiosity-gap',hook:{at:0,line:'Di pos evakuasi, jauhi barisan yang membisu.'},promise:{at:90,line:'Orang di dalam berdiri tanpa bicara.',openLoop:'Mengapa tak ada yang menyahut?'},tactics:{at:360,steps:[{number:1,at:f(18.323),line:'Cari orang yang memberi arahan.',detail:'Dengar nomor antrean yang diulang.'},{number:2,at:f(28.386),line:'Cek jalan keluar sebelum maju.',detail:'Susuri tembok luar menuju jalur samping rel.'},{number:3,at:f(36.111),line:'Tinggalkan tanda untuk orang berikutnya.',detail:'Tulis peringatan dengan serpihan batu putih.'}]},ending:{at:1650,twistAt:starts[8],payoff:'Survivor mundur lewat jalur rel; jolt barisan baru terjadi setelah narasi.'}},scenes,tensionRamp:{startSec:68.2,endSec:72.033,extraScale:.065,vignetteStrength:.42},finalJolt:{triggerSec:2165/30,durationSec:21/30,handoffSec:12/30,joltImageSrc:asset('panel-final-jolt.webp'),zoomFrom:1,zoomTo:1.18,shakePx:16,shakeDecayMs:320,flashFrames:2,rgbSplitPx:8,blackoutSec:6/30}};
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(m,null,2)+'\n');
