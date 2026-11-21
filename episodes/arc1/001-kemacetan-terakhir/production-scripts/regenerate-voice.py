import wave, numpy as np, torch
from pocket_tts import TTSModel
torch.set_num_threads(4)
m=TTSModel.load_model(config='hf://anak10thn/pocket-tts-indonesian/indonesian_6l.yaml@17257664e384561c957b02ac92edd1a24807f0e5',eos_threshold=-6.0)
s=m.get_state_for_audio_prompt('brief/narrator-v4-reference.wav')
lines={5:['Dalam deretan kendaraan yang gelap, mobilnya hampir tidak terlihat.','Damar menunggu tanpa bergerak.'],6:['Ia merunduk di bawah jendela.','Di luar, langkah kaki bergerak melewati mobilnya.'],7:['Ia menghitung persediaannya.','Setengah botol air, sebungkus permen karet,','dan baterai ponsel enam puluh persen.'],11:['Saat ia menoleh,','seseorang sudah menunggunya di sana.']}
for i,parts in lines.items():
 print('Generating',i,flush=True)
 arr=[]
 for part in parts:
  a=m.generate_audio(s,part).detach().cpu().numpy().reshape(-1); arr.append(a); arr.append(np.zeros(4000,dtype=np.float32))
 a=np.clip(np.concatenate(arr),-1,1)
 with wave.open(f'public/survival-blind/voice-{i:02}.wav','wb') as w:
  w.setnchannels(1); w.setsampwidth(2); w.setframerate(m.sample_rate); w.writeframes((a*32767).astype('<i2').tobytes())
 print('done',i,len(a)/m.sample_rate,flush=True)
