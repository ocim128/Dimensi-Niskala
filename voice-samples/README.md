# Indonesian narrator samples

Five clean narration references for the voice direction in [voice-profile.md](../voice-profile.md). They are auditions, not finished videos or established story canon. All five use the same voice and synthesis settings; different scripts provide examples of discovery, a rule, mystery, a dilemma and a consequence.

| Sample | Focus | Approximate duration |
| --- | --- | --- |
| [01 — Hutan sunyi](01-hutan-sunyi.mp3) | First encounter and suspense | 19.3 s |
| [02 — Menara lonceng](02-menara-lonceng.mp3) | A dangerous rule and a choice | 18.1 s |
| [03 — Air dan bayangan](03-air-dan-bayangan.mp3) | Resource scarcity and mystery | 17.6 s |
| [04 — Jembatan kabut](04-jembatan-kabut.mp3) | A fantasy cost and a reveal | 17.7 s |
| [05 — Pilihan terakhir](05-pilihan-terakhir.mp3) | Urgency and consequence | 18.8 s |

## Generation record

- Generated 2026-11-18 with the Microsoft Edge online text-to-speech service, accessed through the third-party `edge-tts` Python package, version `7.3.1`.
- Voice: `id-ID-ArdiNeural`, Indonesian (Indonesia), male. Rate `-8%`, pitch `-3Hz`, volume `+0%` for every sample. The service did not expose a pinned model version or seed for this workflow.
- Files: MP3, mono, 24 kHz, with no music or sound effects. No loudness processing was applied after generation.
- The scripts are sent to the online speech service. The service and voice can change over time; the same settings do not guarantee identical future output. Preserve these files as the listening reference.
- Usage rights for these Edge-service outputs in published or monetized content have **not been verified**. These files are for creative evaluation; verify applicable service terms before publication or use a voice with confirmed rights. The license of the `edge-tts` client is separate from the service's terms.
- The audio files were checked for successful MP3 decoding, duration and non-silent signal. They have not been subjectively auditioned by the agent or approved by the owner; listen for pronunciation, delivery, similarity to the desired character and any defects before treating them as the final narrator.

## Scripts

### 01 — Hutan sunyi

Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya di sekitar saya padam. Sekarang, saya harus memilih: masuk, atau menunggu sesuatu datang dari kegelapan.

### 02 — Menara lonceng

Di puncak menara ini, ada api yang tidak pernah padam. Tapi ada satu aturan: jangan pernah membunyikan loncengnya. Ketika badai datang, saya mendengar seseorang meminta pertolongan dari bawah. Untuk menyelamatkannya, saya harus melanggar aturan itu.

### 03 — Air dan bayangan

Air terakhir saya tinggal setengah botol. Di tengah gurun, saya menemukan sebuah sumur dengan air yang jernih. Tapi setiap kali saya mendekat, bayangan saya bergerak lebih dulu. Saya mundur, dan bayangan itu tetap berdiri di tepi sumur.

### 04 — Jembatan kabut

Untuk keluar dari lembah ini, saya harus menyeberangi jembatan sebelum matahari terbit. Masalahnya, setiap langkah menghapus satu ingatan. Saat sampai di tengah, saya lupa kenapa harus pergi. Lalu saya melihat nama saya tertulis di telapak tangan.

### 05 — Pilihan terakhir

Pintu batu itu hanya bisa dibuka sekali. Di belakang saya, makhluk itu semakin dekat. Di depan saya, seorang anak terjebak di sisi lain. Saya menarik tuasnya dan mendorong anak itu keluar. Pintu tertutup, sementara saya masih di dalam.

## Reproduce

The scripts and settings are also in [generate.py](generate.py). With Python and an internet connection, install `edge-tts==7.3.1` in an appropriate environment, then run `python generate.py` from this folder. Existing MP3s are skipped to preserve the reference. Regenerating missing files requires access to the online voice service; it may return different audio over time.
