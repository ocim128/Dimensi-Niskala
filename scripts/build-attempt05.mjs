// Assemble the supplied Attempt 05 voice and anonymous POV assets.
// Refuses to overwrite the manifest or captions; use a fresh episode folder.
import {existsSync, readFileSync, writeFileSync} from "node:fs";
import {resolve} from "node:path";

const dir = resolve("episodes/001-kemacetan-terakhir/attempt-05");
const manifestPath = resolve(dir, "manifest.json");
const captionsPath = resolve(dir, "captions.json");
if (existsSync(manifestPath) || existsSync(captionsPath)) throw new Error("Refusing to overwrite Attempt 05 manifest or captions");
const p = "assets/kemacetan-terakhir/attempt-05/";
const old = "assets/kemacetan-terakhir/";
const box = {x: .08, y: .16, width: .84, height: .23};
const callout = (id, text, at, duration, revealFrames = 14, guide) => ({id, type: "tacticalCallout", text, at, duration, revealFrames, box, ...(guide ? {guide} : {})});
const timestamp = (id, text, at, duration) => ({id, type: "timestampBadge", text, at, duration, revealFrames: 12});
const cue = (name, asset, at, duration, gain) => ({name, asset: `sfx/${asset}.wav`, at, duration, gain});
const camera = (scale = 1.05, x = 0, y = 0) => ({from: {scale, x, y}, to: {scale: scale + .08, x: x + 10, y: y - 18}});
const shot = (id, name, at, plate, options = {}) => ({id, name, at, plate, camera: options.camera ?? camera(), characters: {mode: "baked"}, hud: options.hud ?? [], ...(options.cameraPreset ? {cameraPreset: options.cameraPreset} : {}), ...(options.cues ? {cues: options.cues} : {}), ...(options.hit ? {hit: options.hit} : {}), ...(options.blackout ? {blackout: options.blackout} : {})});

const scenes = [
  shot("window-rule", "Aturan · kaca di samping", 0, p+"door-threat-pov-stylized.png", {hud:[timestamp("day", "HARI 1 · SENJA", 0, 55), callout("rule", "JANGAN LANGSUNG MENOLEH", 18, 55)]}),
  shot("blocked-start", "Mobil terjepit · jendela gelap", 80, p+"gridlock-opaque.webp", {hud:[callout("blocked", "TERKUNCI DI TENGAH MACET", 6, 60)]}),
  shot("flee", "Orang-orang di jalan tol", 155, old+"tollway-panic.webp", {camera:camera(1.07,-6,10)}),
  shot("unknown-sound", "Asal bunyi belum diketahui", 230, p+"door-threat-pov-stylized.png", {hud:[callout("where", "DARI MANA BUNYINYA?", 10, 50)]}),
  shot("route-closed", "Jalan tertutup", 300, p+"gridlock-opaque.webp", {camera:camera(1.15,0,-20)}),
  shot("tactic-one", "Pertama · kunci pintu", 360, old+"lock.webp", {hud:[callout("step-one", "01 · KUNCI SEMUA PINTU", 5, 55)], cues:[cue("Kunci pintu pertama", "door-lock", 28, 18, .13)]}),
  shot("blocked", "Terjepit depan dan belakang", 435, p+"gridlock-opaque.webp", {hud:[{id:"traffic-diagram",type:"blueprintOverlay",at:20,duration:50,revealFrames:20,box:{x:.12,y:.2,width:.76,height:.3},paths:[{points:[{x:.1,y:.5},{x:.43,y:.5}],arrow:true},{points:[{x:.9,y:.5},{x:.57,y:.5}],arrow:true}]}]}),
  shot("reach", "Tangan dekat gagang", 515, old+"handle.webp", {hud:[callout("handle-distance", "GAGANG SEJENGKAL", 15, 54),{id:"reach-arrow",type:"blueprintOverlay",at:6,duration:32,revealFrames:16,box:{x:.15,y:.25,width:.72,height:.3},paths:[{points:[{x:.24,y:.72},{x:.75,y:.28}],arrow:true}]}]}),
  shot("attack", "Serangan lewat kaca depan", 595, p+"tackle-pov.webp", {hit:{at:30,duration:12,strength:10},cues:[cue("Benturan di jalan", "body-fall", 30, 19, .15)]}),
  shot("withdraw", "Tangan mundur dari gagang", 660, p+"hand-withdraw.webp", {camera:{from:{scale:1.2,x:8,y:-10},to:{scale:1.06,x:-20,y:12}},hud:[callout("withdraw-label","TARIK TANGAN",2,35,10),{id:"withdraw-arrow",type:"blueprintOverlay",at:8,duration:30,revealFrames:15,box:{x:.14,y:.27,width:.72,height:.3},paths:[{points:[{x:.75,y:.25},{x:.25,y:.75}],arrow:true}]}],cues:[cue("Gerakan lengan", "coat-shift", 5, 9, .08)]}),
  shot("lock", "Kunci ditekan", 705, old+"lock.webp", {hit:{at:2,duration:8,strength:5},cues:[cue("Klik kunci pintu", "door-lock", 2, 18, .15)]}),
  shot("cannot-move", "Tak ada jalan maju", 765, p+"gridlock-opaque.webp", {camera:camera(1.12,4,-14)}),
  shot("barrier", "Pintu sebagai batas", 835, old+"lock.webp", {hud:[callout("barrier-text", "PINTU TERTUTUP", 8, 55)]}),
  shot("outside", "Jalan di balik kaca", 905, p+"door-threat-pov-stylized.png", {camera:camera(1.17,-8,16)}),
  shot("tactic-two", "Kedua · hilangkan tanda", 960, p+"ignition-pov.webp", {hud:[callout("step-two", "02 · HILANGKAN TANDA", 5, 50)]}),
  shot("inside-still", "Hening di balik kaca", 1020, p+"door-threat-pov-stylized.png", {camera:camera(1.12,0,0)}),
  shot("controls", "Mesin, lampu dan radio", 1075, p+"ignition-pov.webp", {hud:[callout("engine", "MESIN MATI", 16, 25, 8),callout("lamps", "LAMPU MATI", 47, 20, 8),callout("radio", "RADIO MATI", 68, 18, 7)], cues:[cue("Kontak mesin", "ignition-click", 16, 6, .13),cue("Lampu", "console-switch", 47, 6, .12),cue("Radio", "console-switch", 68, 6, .1)]}),
  shot("hide-low", "Pandangan turun di bawah jendela", 1165, p+"hide-low-pov.webp", {hud:[callout("window-line", "DI BAWAH GARIS JENDELA", 16, 60, 16,[{x:.05,y:.8},{x:.95,y:.8}])]}),
  shot("steps", "Langkah di sisi mobil", 1255, old+"boots.webp", {cues:[cue("Langkah mendekat", "shoe-left", 27, 12, .12),cue("Langkah di samping", "shoe-right", 46, 10, .13)]}),
  shot("shadow-low", "Bayangan terlihat di atas kaca", 1315, p+"hide-low-pov.webp", {camera:camera(1.12,-6,-20)}),
  shot("passing-shadow", "Bayangan bergeser", 1380, old+"window-shadow.webp", {camera:camera(1.1,0,0)}),
  shot("supplies", "Air dan baterai", 1400, old+"empty-window.webp", {hud:[{id:"inventory",type:"supplyChecklist",at:4,duration:92,revealFrames:88,box:{x:.09,y:.22,width:.82,height:.32},items:[{label:"AIR",value:.5,display:"½ botol"},{label:"BATERAI",value:.6,display:"60%"}]}]}),
  shot("wait-night", "Menunggu sampai pagi", 1500, old+"night-traffic.webp", {camera:camera(1.06,0,0)}),
  shot("quiet-window", "Dunia di luar sunyi", 1570, old+"empty-window.webp", {hud:[callout("wait", "MENUNGGU PAGI", 20, 45)]}),
  shot("clock", "Pukul tiga pagi", 1650, old+"clock.webp", {hud:[timestamp("three-am", "03:00 · DINI HARI", 0, 65)]}),
  shot("two-taps", "Dua ketukan di kaca", 1728, old+"empty-window.webp", {hud:[callout("tap-caption-one", "[KETUKAN]",45,12,3),callout("tap-caption-two", "[KETUKAN]",63,12,3)],cues:[cue("Ketukan kaca satu", "glass-tick",45,6,.5),cue("Ketukan kaca dua", "glass-tick",63,6,.5)]}),
  shot("empty-glass", "Jendelanya kosong", 1810, old+"empty-window.webp", {camera:camera(1.18,-15,5),hud:[callout("empty-glass-text", "KACA KOSONG",35,55,14)]}),
  shot("behind-knock", "Satu ketukan di sandaran", 1920, p+"headrest-touch.webp", {hud:[callout("back-knock", "[KETUKAN]",0,15,3)],cues:[cue("Ketukan dari belakang", "glass-knock",0,13,.45)]}),
  shot("passenger", "Penumpang kursi belakang", 1980, old+"rear-passenger.webp", {cameraPreset:"punch-in",cues:[cue("Gema penemuan", "metal-resonance",0,23,.11)]}),
  shot("passenger-close", "Tatapan terakhir", 2055, old+"rear-passenger.webp", {camera:camera(1.4,0,90),blackout:{at:46,duration:35,opacity:1}}),
];

const art = {};
for (const s of scenes) art[s.plate] = "kemacetan-illustrated-v1";
const manifest = {
  schemaVersion:2,id:"KemacetanTerakhirMotionComicAttempt05",fps:30,duration:2136,captions:"captions.json",
  narration:{asset:p+"narration-jejak.mp3",at:0,duration:2115,gain:.9},
  beds:[
    {name:"Lalu lintas",asset:"sfx/traffic-bed.wav",at:0,duration:1090,gain:.10,fadeIn:0,fadeOut:80,loop:true},
    {name:"Mesin",asset:"sfx/engine-idle.wav",at:0,duration:1091,gain:.065,fadeIn:8,fadeOut:30,loop:true},
    {name:"Tekanan di jalan",asset:"sfx/sub-drone.wav",at:360,duration:550,gain:.12,fadeIn:20,fadeOut:75},
    {name:"Udara malam",asset:"sfx/night-air.wav",at:1140,duration:580,gain:.13,fadeIn:35,fadeOut:80,loop:true},
    {name:"Munculnya penumpang",asset:"sfx/tension-rise.wav",at:1932,duration:140,gain:.11,fadeIn:20,fadeOut:20},
  ],
  art:{styleId:"kemacetan-illustrated-v1",rasterAssets:art},
  script:{format:"survival-tactics-curiosity-gap",hook:{at:0,line:"Kalau kaca diketuk, jangan langsung menoleh."},promise:{at:90,line:"Saat wabah menutup jalan tol, dua langkah ini bisa menyembunyikanmu.",openLoop:"Satu bunyi bisa membuatmu salah melihat arah."},tactics:{at:360,steps:[{number:1,at:360,line:"Pertama, kunci semua pintu.",detail:"Mobil di depan dan belakang sudah rapat."},{number:2,at:960,line:"Kedua, hilangkan tanda kalau ada orang di dalam.",detail:"Matikan mesin, lampu, dan radio; merunduk di bawah jendela."}]},ending:{at:1650,twistAt:1980,payoff:"Yang mengetuk duduk tepat di belakangmu."}},
  scenes,
};

// Phrase timings are grounded in local multilingual speech recognition of the
// owner-supplied master, manually corrected against narasi.txt. Listening remains
// necessary to confirm the exact wording and individual cue boundaries.
const phrases = [
  [0,860,"Kalau kaca diketuk,"],[1380,2680,"jangan langsung menoleh."],
  [3300,4180,"Saat wabah menutup"],[4180,4820,"jalan tol,"],[5420,6100,"dua langkah ini"],[6100,7260,"bisa menyembunyikanmu."],
  [7860,8640,"Satu bunyi bisa"],[8640,9420,"membuatmu salah"],[9420,10480,"melihat arah."],
  [12060,14100,"Pertama, kunci semua pintu."],[14720,15800,"Mobil di depan"],[15800,17140,"dan belakang sudah rapat."],
  [17360,18320,"Gagang pintu tinggal"],[18320,19420,"sejengkal dari tanganmu"],[19960,21000,"saat seseorang diterkam"],[21000,21700,"di sela mobil."],
  [22260,23000,"Tarik tanganmu."],[23500,24260,"Tekan kunci."],[24760,25420,"Kalau mobil tak"],[25420,26020,"bisa maju,"],
  [26780,27760,"pintu tertutup itu"],[28540,29640,"satu-satunya batas"],[29640,30680,"antara kamu dan jalan."],
  [32000,32750,"Kedua,"],[32980,33680,"hilangkan tanda"],[33680,34620,"kalau ada orang"],[34620,35040,"di dalam."],
  [35900,36800,"Matikan mesin,"],[37400,38700,"lampu, dan radio."],
  [39180,40260,"Turunkan badan sampai"],[40260,41000,"garis jendela"],[41000,42260,"ada di atas kepalamu."],
  [42760,43420,"Kalau langkah berhenti"],[43420,44320,"di samping pintu,"],[45080,46360,"biarkan bayangannya lewat dulu."],
  [46800,48220,"Air tinggal setengah botol,"],[48460,49520,"baterai enam puluh persen."],
  [50140,50840,"Kamu cuma perlu"],[50840,52020,"bertahan sampai pagi."],
  [55000,55920,"Pukul tiga pagi,"],[56460,57400,"jalan akhirnya sunyi."],
  [61600,62580,"Jendelanya kosong."],[66000,67140,"Yang mengetuk duduk"],[67480,68440,"tepat di belakangmu."],
];
const red = /diketuk|mengetuk|diterkam/i;
const yellow = /kunci|pintu|mesin|lampu|radio|jendela|air|baterai|belakangmu/i;
const captions = phrases.map(([startMs,endMs,text]) => ({startMs,endMs,timestampMs:null,confidence:null,words:text.split(/\s+/u).map(word => ({text:word,...(red.test(word)?{color:"danger"}:yellow.test(word)?{color:"highlight"}:{})}))}));
const script = readFileSync(resolve(dir,"narasi.txt"),"utf8").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim().split(/\s+/u);
const cap = captions.flatMap(c => c.words.map(w => w.text)).join(" ").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim().split(/\s+/u);
if (JSON.stringify(script) !== JSON.stringify(cap)) throw new Error("Caption words differ from narasi.txt; correct before writing");
writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+"\n");
writeFileSync(captionsPath,JSON.stringify(captions,null,2)+"\n");
console.log(`${manifest.id}: ${scenes.length} shots, ${captions.length} captions, ${manifest.duration} frames`);
