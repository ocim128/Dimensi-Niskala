import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// A small, consistent drawn character: round head, short neck and connected collar.
export function Person({x = 0, y = 0, scale = 1, infected = false, side = false, threeQuarter = false}: {x?: number; y?: number; scale?: number; infected?: boolean; side?: boolean; threeQuarter?: boolean}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-117 210 Q-110 110 -48 100 L-37 82 H37 L48 100 Q110 110 117 210Z" fill={infected ? '#414a47' : '#526d5b'} stroke="#172028" strokeWidth="8"/>
    <path d="M-42 93 L0 133 42 93 32 80 -32 80Z" fill={infected ? '#869388' : '#e9c9a1'} stroke="#172028" strokeWidth="7"/>
    <path d="M-42 98 L0 133 -23 160 -69 110 M42 98 L0 133 23 160 69 110" fill="#77927b" stroke="#172028" strokeWidth="6"/>
    <ellipse cy="0" rx="96" ry="104" fill={infected ? '#a9b8a6' : '#edc99e'} stroke="#172028" strokeWidth="8"/>
    <path d="M-94 -22 Q-104 -105 -27 -110 Q65 -125 94 -53 L91 -26 Q49 -58 7 -58 Q-41 -58 -94 -22Z" fill={infected ? '#363f3b' : '#272b2c'}/>
    {side ? <><circle cx="38" cy="-5" r="7" fill="#172028"/><path d="M27 -29 q15 -10 29 -4 M50 42 q-16 -8 -26 0" fill="none" stroke="#172028" strokeWidth="6" strokeLinecap="round"/></> : infected ? <><ellipse cx="-35" cy="-6" rx="18" ry="15" fill="#4b5a53"/><ellipse cx="35" cy="-6" rx="18" ry="15" fill="#4b5a53"/><circle cx="-35" cy="-5" r="6" fill="#d8d3b4"/><circle cx="35" cy="-5" r="6" fill="#d8d3b4"/><path d="M-54 -34 l33 12 M21 -22 l33 -12 M-25 43 h50 M-11 38 v9 M11 38 v9" fill="none" stroke="#172028" strokeWidth="7" strokeLinecap="round"/></> : threeQuarter ? <><ellipse cx="-5" cy="-5" rx="5" ry="7" fill="#172028"/><circle cx="52" cy="-5" r="7" fill="#172028"/><path d="M-15 -29 q10 -9 21 -4 M40 -33 q13 -6 24 5 M10 43 q18 -10 36 0" fill="none" stroke="#172028" strokeWidth="6" strokeLinecap="round"/></> : <><circle cx="-35" cy="-5" r="7" fill="#172028"/><circle cx="35" cy="-5" r="7" fill="#172028"/><path d="M-52 -28 q15 -12 29 -5 M23 -33 q15 -7 29 5 M-18 43 q18 -10 36 0" fill="none" stroke="#172028" strokeWidth="6" strokeLinecap="round"/></>}
  </g>;
}

function Car({x=0,y=0,scale=1, dark=false}: {x?:number;y?:number;scale?:number;dark?:boolean}) {
 return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#18232c" strokeWidth="9" strokeLinejoin="round">
  <path d="M25 205 Q35 167 113 155 L180 77 Q202 53 250 53 H460 Q512 53 546 87 L609 152 685 175 Q714 184 719 211 L708 254 H26Z" fill={dark ? '#743c3d' : '#b95048'}/>
  <path d="M164 157 L211 94 Q222 80 250 80 H340 V157Z M366 80 H458 Q493 80 520 110 L561 157 H366Z" fill="#8fa5a2"/>
  <path d="M355 79 V241 M565 160 V225" fill="none"/><path d="M405 178 h49" stroke="#e7b5a4"/>
  <circle cx="155" cy="248" r="52" fill="#18232c"/><circle cx="155" cy="248" r="22" fill="#859694"/><circle cx="584" cy="248" r="52" fill="#18232c"/><circle cx="584" cy="248" r="22" fill="#859694"/>
 </g>;
}

function World({night=false}: {night?:boolean}) { return <><rect width="1080" height="1920" fill={night ? '#101d2d' : '#a65f55'}/><circle cx="800" cy="315" r="160" fill={night ? '#bac4b7' : '#efb476'} opacity=".5"/><path d="M0 760 L0 535 110 535 110 446 180 446 180 600 250 600 250 390 348 390 348 562 446 562 446 467 544 467 544 617 640 617 640 514 745 514 745 633 833 633 833 480 920 480 920 590 1080 590 V850Z" fill="#36404a" opacity=".7"/><path d="M0 1100 H1080 V1920 H0Z" fill="#303b42"/><path d="M0 1410 H1080" stroke="#acaaa0" strokeWidth="12" strokeDasharray="100 100" opacity=".3"/></>; }

export type Shot = 'door'|'escape'|'chase'|'lock'|'grid'|'controls'|'night'|'hide'|'supplies'|'wait'|'clock'|'window'|'turn'|'reveal';
export function ShotArt({shot}: {shot: Shot}) {
 const f=useCurrentFrame();
 const move=interpolate(f,[0,45],[0,1],clamp);
 const hand=shot==='lock' ? interpolate(f,[0,28,55],[0,-210,-290],clamp) : interpolate(f,[0,48],[-160,0],clamp);
 const hide=interpolate(f,[5,45],[0,135],clamp);
 const shadow=interpolate(f,[40,105,200,290],[-250,800,800,1450],clamp);
 const lunge=interpolate(f,[24,70],[0,190],clamp);
 const item = f < 80 ? 0 : f < 130 ? 1 : 2;
 return <AbsoluteFill style={{background:'#101923'}}><svg viewBox="0 0 1080 1920" width="100%" height="100%">
  {(shot==='door'||shot==='lock') && <>
    <World/><rect x="70" y="260" width="940" height="680" rx="65" fill="#a0a9a0" stroke="#172028" strokeWidth="36"/>
    <g transform="translate(0 -5)"><Person x={740} y={570} scale={1.8} infected/><Person x={370} y={720} scale={1.1} infected/></g>
    <path d="M0 930 Q450 850 1080 920 V1920 H0Z" fill="#762f30" stroke="#172028" strokeWidth="35"/>
    <rect x="520" y="1090" width="340" height="125" rx="60" fill="#202c33" stroke="#be7470" strokeWidth="12"/><path d="M565 1151 H810" stroke="#c7cebf" strokeWidth="25" strokeLinecap="round"/>
    <g transform={`translate(${hand} 0)`}><path d="M-90 1570 Q185 1340 380 1265 L565 1165 Q620 1135 648 1160 Q661 1180 630 1200 L540 1260 Q680 1220 690 1250 Q692 1272 595 1322 L431 1424 Q275 1525 95 1680Z" fill="#eac49b" stroke="#18232c" strokeWidth="12"/></g>
    {shot==='lock' && <><rect x="185" y="1000" width="105" height="120" rx="18" fill="#1b2228"/><rect x="210" y={1055+move*25} width="55" height="45" rx="9" fill="#e1b27d"/></>}
  </>}
  {shot==='escape' && <><World/><Car x={-105} y={905} scale={.82}/><Car x={575} y={905} scale={.82} dark/><g transform={`translate(${move*160} 0)`}><Person x={360} y={700} scale={1.05}/><Person x={800} y={700} scale={1.05} infected/></g><path d="M100 1310 H970" stroke="#e8b982" strokeWidth="4" opacity=".5"/></>}
  {shot==='chase' && <><World/><Car x={-90} y={1100} scale={.65}/><Car x={650} y={1100} scale={.65}/><g transform={`translate(${move*80} ${lunge*.2}) rotate(${lunge*.1} 320 1050)`}><Person x={300} y={860} scale={1.5}/></g><g transform={`translate(${-lunge} ${lunge*.2}) rotate(${-lunge*.1} 620 1050)`}><Person x={620} y={850} scale={1.5} infected/><path d="M590 940 Q510 870 445 900" fill="none" stroke="#a9b8a6" strokeWidth="37" strokeLinecap="round"/></g></>}
  {shot==='grid' && <><World/><Car x={-300} y={870} scale={.57} dark/><Car x={293} y={835} scale={.67}/><Car x={770} y={870} scale={.57} dark/><path d="M185 1300 L335 1300 M320 1270 L355 1300 320 1330 M895 1300 H745 M760 1270 L725 1300 760 1330" stroke="#e9ad76" strokeWidth="13" fill="none"/><text x="540" y="650" textAnchor="middle" fill="#f6e7d0" fontFamily="Arial" fontSize="76" fontWeight="bold">TERJEBAK</text></>}
  {shot==='controls' && <><World night/><rect x="80" y="360" width="920" height="850" rx="80" fill="#202c33" stroke="#708287" strokeWidth="15"/><circle cx="320" cy="750" r="145" fill="#101a24" stroke="#9baba7" strokeWidth="16"/><path d={`M320 750 L${f<55?405:290} ${f<55?670:850}`} stroke="#efb477" strokeWidth="15"/><rect x="580" y="585" width="260" height="110" rx="20" fill={f<80?'#e8aa6d':'#39494b'}/><rect x="580" y="780" width="260" height="110" rx="20" fill={f<115?'#e8aa6d':'#39494b'}/><text x="540" y="1100" textAnchor="middle" fill="#e5e3d5" fontFamily="Arial" fontSize="50" fontWeight="bold">MESIN · LAMPU · RADIO</text></>}
  {shot==='night' && <><World night/><Car x={130} y={850} scale={1.1} dark/><rect width="1080" height="1920" fill="#0a1625" opacity={.3*move}/></>}
  {shot==='hide' && <><World night/><Car x={-10} y={920} scale={1.5} dark/><g transform={`translate(0 ${hide})`}><Person x={380} y={975} scale={.48} side/></g><rect x="170" y="1153" width="700" height="100" fill="#743c3d"/><g transform={`translate(${shadow} 0)`}><Person x={-120} y={950} scale={1.05} infected/></g><path d="M0 1208 H1080" stroke="#f2c28c" strokeWidth="6" strokeDasharray="20 16" opacity=".6"/></>}
  {shot==='supplies' && <><rect width="1080" height="1920" fill="#142431"/><circle cx="540" cy="790" r="365" fill="#243c49" stroke="#50666c" strokeWidth="7"/>
    {item===0 && <><rect x="435" y="550" width="210" height="480" rx="55" fill="#a8cece" stroke="#e3e2d2" strokeWidth="13"/><path d="M447 820 H633 V972 Q633 1019 585 1019 H495 Q447 1019 447 972Z" fill="#6c9ca4"/><rect x="482" y="500" width="116" height="60" rx="8" fill="#d7e0d6"/><text x="540" y="1180" textAnchor="middle" fill="#fff4df" fontFamily="Arial" fontSize="70" fontWeight="bold">AIR ½ BOTOL</text></>}
    {item===1 && <><rect x="340" y="640" width="400" height="260" rx="32" fill="#d1af75" stroke="#f0d9aa" strokeWidth="12"/><path d="M340 720 H740" stroke="#8b4a43" strokeWidth="25"/><text x="540" y="830" textAnchor="middle" fill="#27383a" fontFamily="Arial" fontSize="62" fontWeight="bold">PERMEN</text><text x="540" y="1180" textAnchor="middle" fill="#fff4df" fontFamily="Arial" fontSize="66" fontWeight="bold">1 BUNGKUS</text></>}
    {item===2 && <><rect x="390" y="530" width="300" height="530" rx="48" fill="#1a272e" stroke="#a7b8b2" strokeWidth="12"/><rect x="470" y="690" width="150" height="240" rx="12" fill="none" stroke="#eef2d9" strokeWidth="12"/><rect x="482" y="788" width="126" height="130" fill="#b1c78f"/><text x="540" y="1180" textAnchor="middle" fill="#fff4df" fontFamily="Arial" fontSize="72" fontWeight="bold">BATERAI 60%</text></>}
  </>}
  {shot==='wait' && <><World night/><Car x={95} y={875} scale={1.2} dark/><circle cx="835" cy="310" r="145" fill="#d7d2b8" opacity=".18"/></>}
  {shot==='clock' && <><rect width="1080" height="1920" fill="#111e2a"/><rect x="160" y="560" width="760" height="410" rx="75" fill="#17232a" stroke="#71858a" strokeWidth="14"/><text x="540" y="830" textAnchor="middle" fill="#e8b57b" fontFamily="monospace" fontSize="190" fontWeight="bold">{f<25?'02:59':'03:00'}</text></>}
  {shot==='window' && <><World night/><rect x="90" y="300" width="900" height="760" rx="60" fill="#263f4b" stroke="#18232c" strokeWidth="35"/><path d="M0 1040 Q540 970 1080 1040 V1920 H0Z" fill="#422e36"/><path d="M690 495 q50 -60 100 0 M740 445 v120" stroke="#c2d0c3" strokeWidth="6" opacity={f<85?.45:0} fill="none"/></>}
  {shot==='turn' && <><rect width="1080" height="1920" fill="#111d29"/><rect x="140" y="320" width="480" height="900" rx="160" fill="#303a3e"/><g transform={`rotate(${interpolate(f,[75,110],[0,5],clamp)} 460 1180)`}><Person x={460} y={770} scale={2.3} side={f<105} threeQuarter={f>=105}/></g><path d="M960 920 Q850 810 700 850 L635 895" fill="none" stroke="#a6b3a3" strokeWidth="35" strokeLinecap="round" opacity={move}/></>}
  {shot==='reveal' && <><rect width="1080" height="1920" fill="#111b25"/><path d="M0 380 H1080 V1160 H0Z" fill="#26343b"/><rect x="120" y="540" width="840" height="800" rx="100" fill="#30393c"/><g transform={`translate(0 ${interpolate(f,[0,30],[180,0],clamp)})`}><Person x={540} y={770} scale={2.7} infected/></g><rect x="0" y="1200" width="1080" height="720" fill="#161f27"/></>}
  <rect width="1080" height="1920" fill="none" stroke="#080d16" strokeWidth="100" opacity=".22"/>
 </svg></AbsoluteFill>;
}

export function CharacterSheet() {return <AbsoluteFill style={{background:'#e8ddc7'}}><svg viewBox="0 0 1080 1920" width="100%" height="100%"><text x="540" y="180" textAnchor="middle" fontSize="60" fontFamily="Arial" fill="#23313a" fontWeight="bold">MODEL KARAKTER</text><Person x={270} y={470} scale={1.3}/><Person x={780} y={470} scale={1.3} threeQuarter/><Person x={270} y={1050} scale={1.3} side/><rect x="570" y="870" width="370" height="470" rx="80" fill="#444f4e"/><Person x={750} y={1050} scale={1.3} side/><path d="M850 1100 a110 110 0 1 0 0 220 a110 110 0 1 0 0 -220" fill="none" stroke="#202a2c" strokeWidth="22"/><text x="270" y="800" textAnchor="middle" fontSize="40" fontFamily="Arial">DEPAN</text><text x="780" y="800" textAnchor="middle" fontSize="40" fontFamily="Arial">TIGA PEREMPAT</text><text x="270" y="1400" textAnchor="middle" fontSize="40" fontFamily="Arial">SAMPING</text><text x="780" y="1450" textAnchor="middle" fontSize="40" fontFamily="Arial">DUDUK</text></svg></AbsoluteFill>}
