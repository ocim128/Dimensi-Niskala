import json, os, time, wave
import numpy as np
import torch
from pocket_tts import TTSModel

texts = [
'Saat wabah zombie merebak, Damar terjebak di tengah kemacetan jalan tol. Mobil-mobil tidak bergerak.',
'Orang-orang mulai keluar dan berlari. Damar menahan tangannya di dekat pintu.',
'Untuk saat ini, ia memilih tetap di dalam mobil. Tapi pilihan itu belum tentu membuatnya aman.',
'Naluri pertamanya menyuruhnya ikut kabur. Di luar, kepanikan membuat orang-orang mudah terlihat.',
'Ia mematikan mesin, lampu, dan radio. Suara di dalam mobil perlahan menghilang.',
'Dalam deretan kendaraan yang gelap, mobilnya hampir tidak terlihat. Damar menunggu tanpa bergerak.',
'Ia merunduk di bawah jendela. Di luar, langkah kaki bergerak melewati mobilnya.',
'Ia menghitung persediaannya: setengah botol air, sebungkus permen karet, dan baterai ponsel enam puluh persen.',
'Mungkin ia bisa bertahan sampai pagi. Di luar, jeritan perlahan menghilang.',
'Lalu, pukul tiga dini hari, ia mendengar ketukan. Pelan. Teratur.',
'Bukan dari jendela di sampingnya. Ketukan itu berasal dari kursi belakang.',
'Saat ia menoleh, seseorang sudah menunggunya di sana.'
]
torch.set_num_threads(4)
model=TTSModel.load_model(config='hf://anak10thn/pocket-tts-indonesian/indonesian_6l.yaml@17257664e384561c957b02ac92edd1a24807f0e5',eos_threshold=-6.0)
state=model.get_state_for_audio_prompt('brief/narrator-v4-reference.wav')
for i,t in enumerate(texts):
 print('Generating',i,t,flush=True)
 a=model.generate_audio(state,t).detach().cpu().numpy().reshape(-1)
 a=np.clip(a,-1,1)
 p=f'public/survival-blind/voice-{i:02}.wav'
 with wave.open(p,'wb') as w:
  w.setnchannels(1); w.setsampwidth(2); w.setframerate(model.sample_rate); w.writeframes((a*32767).astype('<i2').tobytes())
 print('done',i,len(a)/model.sample_rate,flush=True)
