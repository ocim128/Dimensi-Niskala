# Episode 005 · Suara dari Rumah Kosong

**Draft naskah dan panel · tahap pra-audio.** [Naskah ShortZ · 131 kata](narasi.txt)

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 5 of 7** — Human Variable
- **Entry State** — HARI 3 • 14:00 · 40% air · 18% baterai · gang permukiman dekat JPO. Senter ikut dibawa.
- **Exit State sementara** — HARI 3 • 14:10 · 40% air · 14% baterai · di samping pos berkaca di kaki tangga JPO. HP menyimpan SMS pos stasiun.
- **Jembatan dari episode sebelumnya** — Di sela episode, pengemudi keluar dari kamar melalui balkon belakang dan turun lewat tangga luar. Air dan baterai berkurang sebelum ia tiba di gang. Senter tetap di tas. [Draft episode sebelumnya](../004-alarm-di-tangga/brief.md)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `JANGAN SAHUT SUARA ITU`
- **Hook lisan** — Saat dengar teriakan dari rumah terkunci, jangan sahut.
- **Pilihan dan payoff** — Pengemudi mengikuti isyarat orang di seberang sampai ke JPO. Setelah teriakan berhenti, ketukan di kaca pos dan bisikan dari belakang memancingnya menoleh.
- **Petunjuk visual** — Sekitar 00:25–00:28, bayangan gadis di kaca rumah tetap menghadap pagar sementara suara meminta tolong terdengar. Jangan beri aksen saat bayangannya terlihat.

## 2. Audio

Master [narration-investigator.mp3](narration-investigator.mp3) dibuat dari [narasi.txt](narasi.txt) menggunakan ShortZ `gemini-cloud`, model `gemini-3.8-flash-tts`, dan suara Investigator (`voice_71a5a701-796e-421d-840e-0adc00b0816a`). Durasi 76.955 detik. Satu perintah ShortZ memproses 7 potongan internal. [Timestamp hasil ASR](narration-investigator-timestamps.json) dan [laporan pemeriksaan](narration-investigator-report.json). ShortZ menandai 4 potongan gagal dan penyelarasan akhir belum lulus. Periksa teks dan pengucapan dengan mendengarkan sebelum mengunci timestamp atau membuat caption. Periksa juga jeda untuk efek dan campuran audio. Master ini melampaui batas akhir 72 detik. Susun edit waktu yang alami sebelum mengunci durasi cut. Periksa khusus apakah kalimat langsung terakhir terdengar seperti bisikan yang diminta di brief.

**Foley dan delivery** — Suara minta tolong sebagai sumber suara terpisah, dua putaran dengan jeda identik. Sesudah hening, sisakan ruang untuk satu ketukan kaca. Bacakan kalimat terakhir sebagai bisikan langsung dalam satu permintaan Gemini yang sama. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi berhenti di gang beton yang sempit saat mendengar teriakan dari rumah terkunci. Kabel semrawut menyilang dari tiang listrik di atas gang.
2. Dari balik tembok, ia melihat pintu rumah, pagar besi dan teralis jendelanya.
3. Isyarat kecil dari orang di seberang terlihat dari sudut mata; pengemudi ragu.
4. Suara yang sama terulang. Pengemudi menghitung sela pendeknya.
5. Dari sisi pagar, bayangan di kaca rumah tetap diam selama teriakan.
6. Pengemudi dan orang seberang saling menunjuk JPO, lalu mundur lewat sisi tembok berbeda.
7. Pengemudi tiba di pos berkaca di kaki tangga JPO dan meredam getaran HP. HUD air 40%, baterai 14%.
8. Tampilkan SMS Pos Evakuasi Stasiun. Gunakan `HARI 5, PUKUL 05:00` di HUD SMS dan takarir. Pengemudi menegang saat teriakan berhenti.
9. Terdengar ketukan pada kaca pos di belakang pengemudi. Ia berhenti sebelum spontan menoleh.
10. Pantulan kaca pos menunjukkan gadis berdiri tepat di belakang pengemudi. Tahan pantulan saat kalimat bisikan terdengar.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode05`. Target akhir 61–72 detik. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
