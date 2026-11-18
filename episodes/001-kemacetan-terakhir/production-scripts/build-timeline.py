import json, math, wave, random
from array import array
parts=[['Saat wabah zombie merebak,','Damar terjebak di tengah kemacetan jalan tol. Mobil-mobil tidak bergerak.'],['Orang-orang mulai keluar dan berlari.','Damar menahan tangannya di dekat pintu.'],['Untuk saat ini, ia memilih tetap di dalam mobil.','Tapi pilihan itu belum tentu membuatnya aman.'],['Naluri pertamanya menyuruhnya ikut kabur.','Di luar, kepanikan membuat orang-orang mudah terlihat.'],['Ia mematikan mesin, lampu, dan radio.','Suara di dalam mobil perlahan menghilang.'],['Dalam deretan kendaraan yang gelap, mobilnya hampir tidak terlihat.','Damar menunggu tanpa bergerak.'],['Ia merunduk di bawah jendela.','Di luar, langkah kaki bergerak melewati mobilnya.'],['Ia menghitung persediaannya. Setengah botol air.','Sebungkus permen karet. Baterai ponselnya enam puluh persen.'],['Mungkin ia bisa bertahan sampai pagi.','Di luar, jeritan perlahan menghilang.'],['Lalu, pukul tiga dini hari, ia mendengar ketukan.','Pelan. Teratur.'],['Bukan dari jendela di sampingnya.','Ketukan itu berasal dari kursi belakang.'],['Saat ia menoleh,','seseorang sudah menunggunya di sana.']]
timeline=[]; captions=[]; start=0
for i, p in enumerate(parts):
 with wave.open(f'public/survival-blind/voice-{i:02}.wav') as w: sec=w.getnframes()/w.getframerate()
 dur=math.ceil((sec+.3)*30); split=round(sec*30*len(p[0])/(len(p[0])+len(p[1])))
 timeline.append(dict(start=start,duration=dur,parts=p))
 for j,t in enumerate(p):
  a=start+(0 if j==0 else split); b=start+(split if j==0 else math.ceil(sec*30))
  captions.append(dict(text=t,startMs=round(a/30*1000),endMs=round(b/30*1000),timestampMs=None,confidence=None))
 start+=dur
open('src/SurvivalBlind/timeline.json','w',encoding='utf8').write(json.dumps(timeline,ensure_ascii=False,indent=2))
open('src/SurvivalBlind/captions.json','w',encoding='utf8').write(json.dumps(captions,ensure_ascii=False,indent=2))
# Original synthesized sound, mono 24k: a low evolving oscillator, filtered noise, switch clicks, footsteps, and taps.
sr=24000; total=(start+60)/30; random.seed(31); out=array('h'); noise=0.0
clicks=[timeline[4]['start']/30+x for x in (.67,1.84,3.0)]
feet=[timeline[6]['start']/30+x for x in (1.0,1.8,2.6,3.4)]
taps=[timeline[9]['start']/30+x for x in (2.0,3.0,4.0)]
reveal=timeline[11]['start']/30
for i in range(int(total*sr)):
 t=i/sr; noise=.985*noise+.015*(random.random()*2-1)
 traffic=max(0,1-t/(timeline[4]['start']/30+4)); night=.55 if t<timeline[8]['start']/30 else .25
 sound=(.018*math.sin(2*math.pi*55*t)+.009*math.sin(2*math.pi*82.3*t))*night + .12*noise*traffic
 for c in clicks:
  dt=t-c
  if 0<=dt<.07:sound+=.09*math.exp(-dt*75)*math.sin(2*math.pi*1200*dt)
 for c in feet:
  dt=t-c
  if 0<=dt<.18:sound+=.055*math.exp(-dt*22)*math.sin(2*math.pi*95*dt)
 for c in taps:
  dt=t-c
  if 0<=dt<.18:sound+=.14*math.exp(-dt*32)*(math.sin(2*math.pi*380*dt)+.3*math.sin(2*math.pi*730*dt))
 dt=t-reveal
 if 0<=dt<1.3:sound+=.035*math.exp(-dt*2)*math.sin(2*math.pi*(68+35*math.exp(-dt))*dt)
 out.append(int(max(-1,min(1,sound))*32767))
with wave.open('public/survival-blind/ambience.wav','wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(out.tobytes())
print('frames',start+60,'seconds',total)

