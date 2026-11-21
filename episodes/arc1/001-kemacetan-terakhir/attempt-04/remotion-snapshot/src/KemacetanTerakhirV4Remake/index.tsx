import {Audio} from '@remotion/media';
import {AbsoluteFill, Sequence, staticFile, Track, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Caption} from '@remotion/captions';
import captionsData from './captions.json';
import {ShotArt} from './art';

const asset = (name:string) => staticFile(`kemacetan-terakhir-v4-remake/${name}`);

function Captions() {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const caption=(captionsData as Caption[]).find(c=>frame*1000/fps>=c.startMs && frame*1000/fps<c.endMs);
 return caption ? <AbsoluteFill style={{justifyContent:'flex-end',alignItems:'center',paddingBottom:250,pointerEvents:'none'}}><div style={{maxWidth:850,textAlign:'center',fontFamily:'Arial, sans-serif',fontWeight:800,fontSize:66,lineHeight:1.13,color:'#fff5e6',background:'rgba(8,13,20,.8)',padding:'15px 26px',borderRadius:12,textShadow:'0 3px 7px #000'}}>{caption.text}</div></AbsoluteFill> : null;
}

export function KemacetanTerakhirV4Remake({showCaptions, soundOn}: {showCaptions:boolean;soundOn:boolean}) {
 return <AbsoluteFill style={{background:'#101923'}}>
  <Track name="Gambar · cerita">
   <Sequence name="Pintu dan ancaman di luar" durationInFrames={203}><ShotArt shot="door"/></Sequence>
   <Sequence name="Wabah di jalan tol" from={203} durationInFrames={159}><ShotArt shot="escape"/></Sequence>
   <Sequence name="Tangan meraih gagang" from={362} durationInFrames={55}><ShotArt shot="door"/></Sequence>
   <Sequence name="Pengendara diterkam" from={417} durationInFrames={132}><ShotArt shot="chase"/></Sequence>
   <Sequence name="Tarik tangan dan kunci" from={549} durationInFrames={92}><ShotArt shot="lock"/></Sequence>
   <Sequence name="Mobil terjebak" from={641} durationInFrames={150}><ShotArt shot="grid"/></Sequence>
   <Sequence name="Mesin, lampu, radio" from={791} durationInFrames={184}><ShotArt shot="controls"/></Sequence>
   <Sequence name="Bersembunyi di bawah jendela" from={975} durationInFrames={427}><ShotArt shot="hide"/></Sequence>
   <Sequence name="Persediaan" from={1402} durationInFrames={225}><ShotArt shot="supplies"/></Sequence>
   <Sequence name="Malam makin sunyi" from={1627} durationInFrames={164}><ShotArt shot="wait"/></Sequence>
   <Sequence name="Pukul tiga" from={1791} durationInFrames={59}><ShotArt shot="clock"/></Sequence>
   <Sequence name="Ketukan dan jendela kosong" from={1850} durationInFrames={290}><ShotArt shot="window"/></Sequence>
   <Sequence name="Menoleh ke belakang" from={2140} durationInFrames={145}><ShotArt shot="turn"/></Sequence>
   <Sequence name="Penumpang terinfeksi" from={2285} durationInFrames={235}><ShotArt shot="reveal"/></Sequence>
  </Track>
  {soundOn && <>
   <Track name="Narasi · master pemilik"><Audio name="kemacetan2-diperbaiki" src={asset('narration.mp3')} volume={0.72}/></Track>
   <Track name="Suasana"><Audio name="Dengung dan udara malam" src={asset('dread.wav')} volume={0.42}/></Track>
   <Track name="Isyarat aksi">
    <Audio name="Benturan luar" src={asset('impact.wav')} from={485} volume={0.35}/>
    <Audio name="Kunci pintu" src={asset('switch.wav')} from={608} volume={0.55}/>
    <Audio name="Kontak" src={asset('switch.wav')} from={881} volume={0.45}/>
    <Audio name="Lampu" src={asset('switch.wav')} from={920} volume={0.45}/>
    <Audio name="Radio" src={asset('switch.wav')} from={949} volume={0.45}/>
    <Audio name="Langkah satu" src={asset('step.wav')} from={1055} volume={0.42}/>
    <Audio name="Langkah dua" src={asset('step.wav')} from={1076} volume={0.5}/>
    <Audio name="Langkah tiga" src={asset('step.wav')} from={1097} volume={0.58}/>
    <Audio name="Langkah pergi" src={asset('step.wav')} from={1365} volume={0.28}/>
    <Audio name="Ketuk pertama" src={asset('tap.wav')} from={1915} volume={0.5}/>
    <Audio name="Ketuk kedua" src={asset('tap.wav')} from={1940} volume={0.5}/>
    <Audio name="Ketuk belakang" src={asset('tap.wav')} from={2115} volume={0.55}/>
    <Audio name="Wajah terlihat" src={asset('sting.wav')} from={2285} volume={0.4}/>
   </Track>
  </>}
  {showCaptions && <Captions/>}
 </AbsoluteFill>;
}
