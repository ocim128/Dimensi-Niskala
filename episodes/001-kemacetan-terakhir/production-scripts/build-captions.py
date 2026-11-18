import json, math, wave
parts=[['Saat wabah zombie merebak,','Damar terjebak di tengah','kemacetan jalan tol.','Mobil-mobil tidak bergerak.'],['Orang-orang mulai keluar dan berlari.','Damar menahan tangannya','di dekat pintu.'],['Untuk saat ini, ia memilih','tetap di dalam mobil.','Tapi pilihan itu belum tentu','membuatnya aman.'],['Naluri pertamanya','menyuruhnya ikut kabur.','Di luar, kepanikan membuat','orang-orang mudah terlihat.'],['Ia mematikan mesin,','lampu, dan radio.','Suara di dalam mobil','perlahan menghilang.'],['Dalam deretan kendaraan yang gelap,','mobilnya hampir tidak terlihat.','Damar menunggu tanpa bergerak.'],['Ia merunduk di bawah jendela.','Di luar, langkah kaki bergerak','melewati mobilnya.'],['Ia menghitung persediaannya.','Setengah botol air.','Sebungkus permen karet.','Baterai ponselnya enam puluh persen.'],['Mungkin ia bisa bertahan sampai pagi.','Di luar, jeritan perlahan menghilang.'],['Lalu, pukul tiga dini hari,','ia mendengar ketukan.','Pelan. Teratur.'],['Bukan dari jendela di sampingnya.','Ketukan itu berasal','dari kursi belakang.'],['Saat ia menoleh,','seseorang sudah menunggunya','di sana.']]
timeline=[]; captions=[]; start=0
for i,p in enumerate(parts):
 with wave.open(f'public/survival-blind/voice-{i:02}.wav') as w: sec=w.getnframes()/w.getframerate()
 dur=math.ceil((sec+.3)*30); timeline.append(dict(start=start,duration=dur,parts=p)); total=sum(map(len,p)); prev=0
 for j,t in enumerate(p):
  nex=prev+len(t); a=start+round(sec*30*prev/total); b=start+round(sec*30*nex/total)
  captions.append(dict(text=t,startMs=round(a/30*1000),endMs=round(b/30*1000),timestampMs=None,confidence=None)); prev=nex
 start+=dur
open('src/SurvivalBlind/timeline.json','w',encoding='utf8').write(json.dumps(timeline,ensure_ascii=False,indent=2))
open('src/SurvivalBlind/captions.json','w',encoding='utf8').write(json.dumps(captions,ensure_ascii=False,indent=2))
print(start+60)
