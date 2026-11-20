// Assemble the Attempt 06 editorial data from its own fresh artwork and audio.
// Does not overwrite an existing manifest.
import {existsSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const target = 'episodes/001-kemacetan-terakhir/attempt-06/manifest.json';
if (existsSync(target)) throw Error('Refusing to overwrite existing Attempt 06 manifest');
const root = 'assets/001-kemacetan-terakhir/attempt-06/';
const frame = s => Math.round(s*30);
const box = {x:.08,y:.16,width:.84,height:.23};
const call = (id,text,at=5,duration=45,guide) => ({id,type:'tacticalCallout',text,at,duration,revealFrames:12,box,...(guide?{guide}:{})});
const stamp = (id,text,at=0,duration=50) => ({id,type:'timestampBadge',text,at,duration,revealFrames:12});
const cue = (name,asset,at,duration,gain) => ({name,asset:`sfx/${asset}.wav`,at,duration,gain});
const step = (id,name,s,plate,protagonist,purpose,evidence,extra={}) => ({
  id,name,at:frame(s),plate:root+plate+'.webp',
  camera:{from:{scale:1.03,x:0,y:0},to:{scale:1.10,x:0,y:-8}},
  characters:{mode:'baked'},hud:[],editorial:{protagonist,purpose,evidence},...extra,
});
const scenes = [
 step('hook','Ketukan di kaca',0,'hook-character','reaction','character-emotion','Driver visibly tense beside the threatened window.',{hud:[stamp('day','HARI 1 Â· MALAM')],cues:[cue('Ketukan pembuka satu','glass-knock',0,6,.18),cue('Ketukan pembuka dua','glass-knock',7,6,.18)]}),
 step('driver','Terjebak di kursi pengemudi',2.2,'sheet-sit','visible','character-emotion','Driver seated and alert.'),
 step('traffic','Jalan tertutup',4.4,'traffic-character','reaction','character-emotion','Driver observes blocked traffic.'),
 step('attack-early','Ancaman di luar',6.7,'attack-window','reaction','character-emotion','Driver reacts to attack beyond side glass.'),
 step('listen','Bunyi dari luar',9.0,'waiting-character','reaction','character-emotion','Driver listens tensely beside the window.'),
 step('rule-one','Pertama: kunci pintu',11.2,'lock-hand','absent','tactical-hud','Lock and approaching silhouette are shown with a guide.',{hud:[call('one','01 Â· KUNCI SEMUA PINTU',8,45,[{x:.1,y:.72},{x:.9,y:.72}])]}),
 step('lock-action','Mengunci pintu',13.5,'lock-character','reaction','character-emotion','Driver acts on the door lock.',{cues:[cue('Kunci pintu','door-lock',30,18,.15)]}),
 step('boxed','Mobil berhimpitan',15.8,'behind-character','visible','threat-proximity','Driver and blocked road establish the trapped car.'),
 step('handle','Sejengkal dari gagang',18.0,'reach-character','reaction','character-emotion','Driver reaches toward the door under pressure.',{hud:[call('distance','GAGANG SEJENGKAL',5,50)]}),
 step('attack','Serangan di sela mobil',20.4,'attack-character','reaction','character-emotion','Driver sees violence between cars.',{hit:{at:15,duration:12,strength:10},cues:[cue('Benturan di jalan','body-fall',15,19,.15)]}),
 step('withdraw','Tarik tangan',22.6,'recoil-character','reaction','character-emotion','Driver pulls away from the handle.',{hud:[call('withdraw','TARIK TANGAN',4,45)],cues:[cue('Gerakan lengan','coat-shift',7,9,.08)]}),
 step('lock','Tekan kunci',24.8,'lock-press-character','reaction','character-emotion','Driver presses the door lock.',{cues:[cue('Klik kunci','door-lock',3,18,.15)]}),
 step('blocked','Tidak bisa maju',27.0,'traffic-character','reaction','character-emotion','Driver watches blocked traffic.'),
 step('barrier','Pintu sebagai batas',29.2,'hook-character','reaction','character-emotion','Driver remains inside against the threat.',{hud:[call('barrier','PINTU TERTUTUP',5,45)]}),
 step('between','Jalan di balik pintu',31.4,'lock-hand','absent','threat-proximity','The hand is separated from the outside figure by the locked door.'),
 step('rule-two','Kedua: hilangkan tanda',33.6,'attack-window','reaction','character-emotion','Driver looks toward the danger while remaining hidden.',{hud:[call('two','02 Â· HILANGKAN TANDA',5,45)]}),
 step('engine','Mesin dimatikan',35.8,'ignition-character','reaction','character-emotion','Driver reaches to shut off the ignition.',{hud:[call('engine-label','MESIN Â· LAMPU Â· RADIO',8,50)],cues:[cue('Kontak mesin','ignition-click',15,6,.13),cue('Lampu','console-switch',40,6,.12),cue('Radio','console-switch',58,6,.1)]}),
 step('hide-prepare','Bersiap merunduk',38.0,'sheet-sit','reaction','character-emotion','Driver braces before ducking.'),
 step('duck','Di bawah jendela',40.2,'duck-character','reaction','tactical-hud','Visible driver ducks below the plotted window line.',{hud:[call('window-line','DI BAWAH GARIS JENDELA',6,52,[{x:.05,y:.72},{x:.95,y:.72}])]}),
 step('footsteps','Langkah mendekat',42.4,'boots','absent','threat-proximity','Boots are immediately outside the door.',{cues:[cue('Langkah mendekat','shoe-left',25,12,.12),cue('Langkah di samping','shoe-right',43,10,.13)]}),
 step('shadow','Bayangan lewat',44.6,'shadow-character','reaction','character-emotion','Driver watches the threat pass.'),
 step('wait-low','Tunggu bayangan',46.8,'waiting-character','reaction','character-emotion','Driver watches and waits for the threat to pass.'),
 step('supplies','Air dan baterai',49.0,'traffic-character','visible','tactical-hud','Checklist shows remaining water and battery below the driverâ€™s face.',{hud:[{id:'inventory',type:'supplyChecklist',at:2,duration:65,revealFrames:55,box:{x:.07,y:.42,width:.60,height:.20},items:[{label:'AIR',value:.5,display:'Â½ botol'},{label:'BATERAI',value:.6,display:'60%'}]}]}),
 step('wait','Menunggu pagi',51.4,'supplies-character','reaction','character-emotion','The driver waits quietly with limited water and battery.',{cameraPreset:'slow-push'}),
 step('stay','Bertahan dalam mobil',53.7,'sheet-recoil','reaction','character-emotion','Driver keeps still and alert.'),
 step('clock','Pukul tiga pagi',56.0,'sheet-sit','reaction','character-emotion','Driver remains awake in the car.',{hud:[stamp('time','03:00 Â· DINI HARI')]}),
 step('silence','Jalan menjadi sunyi',58.3,'window-wide','absent','threat-proximity','The dark empty side window suggests a quiet road.',{cameraPreset:'slow-push',brightness:.72}),
 step('two-taps','Tiga ketukan di kaca',60.5,'window-close','absent','threat-proximity','The side glass fills the frame as three dull knocks draw attention there.',{cues:[cue('Ketukan kaca satu','glass-knock',3,12,.32),cue('Ketukan kaca dua','glass-knock',15,12,.30),cue('Ketukan kaca tiga','glass-knock',27,12,.32)]}),
 step('empty-window','Jendela kosong',62.5,'waiting-character','reaction','character-emotion','The driver studies the empty window.',{hud:[call('empty','KACA KOSONG',15,40)]}),
 step('rear-knock','Ketukan dari belakang',65.0,'headrest-knock','absent','threat-proximity','An infected hand contacts the headrest on the rear-knock frame.',{cues:[cue('Ketukan dari belakang','glass-knock',0,13,.45)]}),
 step('turn','Reaksi sebelum melihat',65.5,'turn-character','reaction','character-emotion','The driver recoils and turns toward the rear seat.'),
 step('passenger','Penumpang di belakang',67.3,'passenger-distinct','absent','threat-proximity','The infected passenger is revealed in the back seat.',{cameraPreset:'punch-in',hud:[call('reveal','DI BELAKANGMU',53,35)],blackout:{at:90,duration:25,opacity:1},cues:[cue('Gema penemuan','metal-resonance',0,23,.11),{...cue('Dentum rendah','sub-drone',0,45,.38),trimBefore:90,fadeIn:2,fadeOut:40}]}),
];
// Apply the owner's approved teenage passenger design to the reveal.
const passenger = scenes.find(scene => scene.id === 'passenger');
passenger.plate = root + 'passenger-teen-v1.png';
passenger.editorial.evidence = 'The infected teenage passenger is revealed in the back seat.';
const fps=30;
const probe=spawnSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1','public/'+root+'narration-edit.wav'],{encoding:'utf8'});
const audioDurationSeconds=Number(probe.stdout?.trim());
if(probe.status!==0 || !Number.isFinite(audioDurationSeconds) || audioDurationSeconds<=0) throw Error('Cannot read narration duration with ffprobe');
const duration=Math.ceil((audioDurationSeconds+1.2)*fps);
const rasterAssets=Object.fromEntries(scenes.map(s=>[s.plate,'gritty-dark-anime-comic']));
const manifest={schemaVersion:2,id:'KemacetanTerakhirMotionComicAttempt06',fps,duration,captions:'captions.json',
 openingTitle:'ATURAN MACET ZOMBIE',
 narration:{asset:root+'narration-edit.wav',at:0,duration:Math.ceil(audioDurationSeconds*fps),gain:.9,ducks:[{startSec:62.06,endSec:62.62,gainDb:-3.5,fadeSec:.06}]},
 beds:[
  {name:'Lalu lintas',asset:'sfx/traffic-bed.wav',at:0,duration:1080,gain:.1,fadeIn:0,fadeOut:80,loop:true},
  {name:'Mesin',asset:'sfx/engine-idle.wav',at:0,duration:1080,gain:.065,fadeIn:8,fadeOut:30,loop:true},
  {name:'Tekanan di jalan',asset:'sfx/sub-drone.wav',at:360,duration:550,gain:.12,fadeIn:20,fadeOut:75},
  {name:'Udara malam',asset:'sfx/night-air.wav',at:1140,duration:580,gain:.13,fadeIn:35,fadeOut:80,loop:true},
  {name:'Munculnya penumpang',asset:'sfx/tension-rise.wav',at:frame(65),duration:140,gain:.11,fadeIn:20,fadeOut:20},
 ],
 art:{styleId:'gritty-dark-anime-comic',rasterAssets},
 script:{format:'survival-tactics-curiosity-gap',hook:{at:0,line:'Kalau kaca diketuk, jangan langsung menoleh.'},promise:{at:90,line:'Saat wabah menutup jalan tol, dua langkah ini bisa menyembunyikanmu.',openLoop:'Satu bunyi bisa membuatmu salah melihat arah.'},tactics:{at:360,steps:[{number:1,at:360,line:'Pertama, kunci semua pintu.',detail:'Mobil di depan dan belakang sudah rapat.'},{number:2,at:960,line:'Kedua, hilangkan tanda kalau ada orang di dalam.',detail:'Matikan mesin, lampu, dan radio; merunduk di bawah jendela.'}]},ending:{at:1650,twistAt:frame(67.3),payoff:'Yang mengetuk duduk tepat di belakangmu.'}},scenes};
for(const scene of scenes) if(!existsSync('public/'+scene.plate)) throw Error('Missing art '+scene.plate);
writeFileSync(target,JSON.stringify(manifest,null,2)+'\n');
console.log(`${manifest.id}: ${scenes.length} shots, ${duration/30}s`);

