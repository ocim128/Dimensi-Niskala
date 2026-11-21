const fs = require('node:fs');
const dir = 'episodes/005-suara-dari-rumah-kosong';
const source = JSON.parse(fs.readFileSync(`${dir}/narration-timestamps.json`, 'utf8')).words;
const voice = JSON.parse(fs.readFileSync(`${dir}/world-voice-asr.json`, 'utf8')).whisper.words;
const words = [];
for (let i = 0; i < source.length; i++) {
  let w = {...source[i], speaker:'narrator'};
  if (w.chunk === 6) continue;
  const s = w.word.toLowerCase();
  if (s === 'kejembatan') {const mid = w.start + (w.end - w.start) * .25; words.push({...w, word:'ke', end:mid}); w = {...w, word:'jembatan', start:mid};}
  else if (s.startsWith('penyebrangan')) w.word = 'penyeberangan.';
  else if (s.startsWith('disebrang')) {const mid = w.start + (w.end - w.start) * .2; words.push({...w, word:'di', end:mid}); w = {...w, word:s.endsWith('.') ? 'seberang.' : 'seberang,', start:mid};}
  else if (s === 'di' && source[i+1]?.word.toLowerCase() === 'ketuk') {w.word='diketuk.'; w.end=source[++i].end;}
  else if (s === 'hari' && source[i+1]?.word.toLowerCase() === 'kelima') {words.push({...w, word:'HARI'}); w={...source[++i], speaker:'narrator', word:'5,'};}
  else if (s === 'pukul' && source[i+1]?.word.toLowerCase() === 'lima' && source[i+2]?.word.toLowerCase() === 'pagi') {words.push({...w, word:'PUKUL'}); w={...source[i+1],speaker:'narrator',word:'05:00.',end:source[i+2].end}; i+=2;}
  words.push(w);
}
// Caption the actual separate whisper, not the removed Investigator quote.
for (const w of voice) {
  // The processed waveform's principal onsets follow the verifier's early estimates.
  const onset = w.start === 0 ? .4 : w.word.toLowerCase() === 'kenapa' ? Math.max(w.start, 2.333) : w.start;
  words.push({...w, speaker:'whisper', start:68.5 + onset, end:68.5+w.end});
}
const captions=[]; let group=[];
function flushCaption() {
  if (!group.length) return;
  const ws=group.map(w=>({text:w.word.toUpperCase(),startMs:Math.round(w.start*1000),endMs:Math.round(w.end*1000),...(/^(TERIAKAN|GADIS|DIKETUK)/i.test(w.word)?{color:'red'}:/^(JANGAN|SAHUT|TOLONG|JPO|TEMBOK|PONSELMU|EVAKUASI|HARI 5|PUKUL)/i.test(w.word)?{color:'yellow'}:{})}));
  captions.push({startMs:ws[0].startMs,endMs:ws.at(-1).endMs,timestampMs:null,confidence:null,words:ws}); group=[];
}
for (const word of words) {
  // The renderer shows a whole beat at once, so a beat cannot cross voices.
  if (group.length && group[0].speaker !== word.speaker) flushCaption();
  group.push(word);
  if (group.length===4 || /[.,!?]$/.test(word.word)) flushCaption();
}
flushCaption();
fs.writeFileSync(`${dir}/captions.json`,JSON.stringify(captions,null,2)+'\n');
const fps=30, f=s=>Math.round(s*fps), duration=2214;
const asset=n=>`assets/005-suara-dari-rumah-kosong/${n}`;
const starts=[0,6,10,18.1,25,30,44.5,50.5,59.3,62.5].map(f);
const names=['Gang dan aturan','Rumah terkunci','Isyarat seberang','Menghitung suara','Pantulan senyap','Isyarat JPO','Pos di tangga','SMS pos evakuasi','Ketukan di belakang','Pantulan gadis'];
const notes=['Pengemudi berhenti di depan rumah terkunci','Pengemudi mengintip dari balik tembok','Orang seberang memberi isyarat','Pengemudi menghitung jeda dengan jari','Pengemudi dan pantulan pada kaca rumah','Keduanya menunjuk arah JPO','Pengemudi tiba di pos','Pengemudi memeriksa HP','Pengemudi terkejut di depan kaca','Gadis terlihat di pantulan'];
const scenes=starts.map((at,i)=>{
  const len=(starts[i+1]??duration)-at, hud=[];
  const reframes=[]; for(let t=65;t<=len-18;t+=64) reframes.push({at:t,duration:12,scale:reframes.length%2===0?1.08:1.02,x:reframes.length%2===0?-16:0,y:reframes.length%2===0?8:0});
  if(i===0) {
    hud.push({id:'clock-entry',type:'timestampBadge',text:'HARI 3 • 14:00',at:0,duration:115,revealFrames:10});
    hud.push({id:'rule',type:'tacticalCallout',text:'RUMAH TERKUNCI: JANGAN SAHUT',box:{x:.08,y:.24,width:.84,height:.08},at:6,duration:82,revealFrames:8});
    hud.push({id:'entry-supplies',type:'supplyChecklist',box:{x:.55,y:.12,width:.43,height:.23},at:99,duration:76,revealFrames:12,items:[{label:'AIR',value:.4,display:'40%'},{label:'BATERAI',value:.18,display:'18%'}]});
  }
  if(i===6) {
    hud.push({id:'clock-exit',type:'timestampBadge',text:'HARI 3 • 14:10',at:0,duration:105,revealFrames:10});
    hud.push({id:'exit-supplies',type:'supplyChecklist',box:{x:.53,y:.035,width:.45,height:.23},at:18,duration:155,revealFrames:14,items:[{label:'AIR',value:.4,display:'40%'},{label:'BATERAI',value:.14,display:'14%'}]});
  }
  if(i===7) hud.push({id:'sms',type:'tacticalCallout',text:'SMS POS EVAKUASI STASIUN • HARI 5, PUKUL 05:00',box:{x:.06,y:.18,width:.88,height:.2},at:45,duration:176,revealFrames:10});
  return {id:`panel-${String(i+1).padStart(2,'0')}`,name:names[i],at,plate:asset(`panel-${String(i+1).padStart(2,'0')}.webp`),camera:{from:{scale:1.02,x:0,y:0},to:{scale:1.065,x:0,y:-8}},reframes,characters:{mode:'baked'},hud,editorial:{protagonist:[2,3,5,8].includes(i)?'reaction':'visible',purpose:i===9?'threat-proximity':'character-emotion',evidence:notes[i]},cues:[]};
});
scenes[7].cues.push({name:'Ponsel bergetar',asset:'sfx/prepared/ep005-phone-vibration.wav',at:f(51.3)-starts[7],duration:26,gain:.38,fadeOut:3});
for(const t of [61.5,61.75,62]) scenes[8].cues.push({name:`Ketuk kaca ${t}`,asset:'sfx/prepared/glass-knock.wav',at:f(t)-starts[8],duration:9,gain:.35,fadeOut:2});
scenes[9].cues.push({name:'Bisikan gadis',asset:'sfx/prepared/ep005-entity-whisper.wav',at:f(68.5)-starts[9],duration:125,gain:.75},{name:'Jolt stinger',asset:'sfx/prepared/climax-stinger.wav',at:2179-starts[9],duration:27,gain:.5,fadeOut:3});
const beds=[{name:'Gang ambience',asset:'sfx/prepared/night-air.wav',at:0,duration:2175,gain:.055,fadeIn:15,fadeOut:0,loop:true},{name:'Tension rise',asset:'sfx/prepared/climax-riser.wav',at:f(68.7),duration:114,gain:.15,fadeIn:12,fadeOut:0}];
for(let at=0;at<f(58.667);at+=135) beds.push({name:`Plea ${at}`,asset:'sfx/prepared/ep005-entity-plea.wav',at,duration:Math.min(121,f(58.667)-at),gain:.095,fadeIn:0,fadeOut:0});
const art={}; for(let i=1;i<=10;i++) art[asset(`panel-${String(i).padStart(2,'0')}.webp`)]='gritty-dark-anime-comic'; art[asset('panel-final-jolt.webp')]='gritty-dark-anime-comic';
const manifest={schemaVersion:2,id:'Arc01Episode05',arcEpisode:5,characterSheets:['assets/characters/arc-01-driver/sheet.png','assets/characters/arc-01-passenger-teen/sheet.png'],fps,duration,captions:'captions.json',openingTitle:'JANGAN SAHUT SUARA ITU',narration:{asset:asset('narration-quote-muted.wav'),at:0,duration:2177,gain:1},effectBusGain:1,beds,art:{styleId:'gritty-dark-anime-comic',rasterAssets:art},script:{format:'survival-tactics-curiosity-gap',hook:{at:0,line:'Saat dengar teriakan dari rumah terkunci, jangan sahut.'},promise:{at:90,line:'Kamu perlu lewat gang ini untuk sampai ke jembatan penyeberangan.',openLoop:'Siapa di balik suara yang berulang?'},tactics:{at:360,steps:[{number:1,at:f(18.235),line:'Dengarkan sampai kalimatnya selesai.',detail:'Hitung pengulangan dan jeda.'},{number:2,at:f(29.359),line:'Cari siapa yang bisa melihatmu dari tempat aman.',detail:'Tunjuk arah JPO.'},{number:3,at:f(41.212),line:'Susuri tembok gang itu tanpa bersuara.',detail:'Berhenti di samping pos berkaca.'}]},ending:{at:1650,twistAt:starts[9],payoff:'Gadis sudah berdiri dekat di pantulan kaca pos.'}},scenes,tensionRamp:{startSec:68.7,endSec:72.5,extraScale:.07,vignetteStrength:.48},finalJolt:{triggerSec:2179/30,durationSec:.9,joltImageSrc:asset('panel-final-jolt.webp'),zoomFrom:1,zoomTo:1.18,shakePx:16,shakeDecayMs:320,flashFrames:2,rgbSplitPx:8,blackoutSec:8/30}};
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
