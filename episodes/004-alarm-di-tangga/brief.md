# Episode 004 · Alarm di Tangga

**Draft naskah dan panel · tahap pra-audio.** [Naskah ShortZ · 143 kata](narasi.txt)

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 4 of 7** — False Sanctuary
- **Entry State** — HARI 2 • 21:00 · 80% air · 30% baterai · ruko kosong dekat pintu keluar tol. Senter masih berfungsi.
- **Exit State sementara** — HARI 2 • 23:30 · 70% air · 25% baterai · kamar lantai dua ruko. Pengemudi memegang senter dan melihat gadis di sudut gelap.
- **Jembatan dari episode sebelumnya** — Tampilkan HP dan botol pada kedatangan. Sejak keluar dari minimarket, perjalanan dan menunggu menghabiskan sebagian air dan daya. Botol kosong lama disimpan untuk alarm. [Draft episode sebelumnya](../003-bel-minimarket/brief.md)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `JANGAN TIDUR DI BAWAH`
- **Hook lisan** — Sembunyi di ruko kosong, jauhi lantai satu.
- **Pilihan dan payoff** — Botol kosong bertutup merah dipasang di tangga untuk mendengar orang naik. Gadis ternyata sudah di lantai dua dan mengembalikan botol itu ke samping sepatu tanpa menjatuhkannya.
- **Petunjuk visual** — Sekitar 00:29–00:32, jejak kaki berlumpur mengarah ke atas di anak tangga setelah titik alarm. Letakkan di tepi cahaya senter, tanpa efek.

## 2. Audio

Master [narration-investigator.mp3](narration-investigator.mp3) dibuat dari [narasi.txt](narasi.txt) menggunakan ShortZ `gemini-cloud`, model `gemini-3.8-flash-tts`, dan suara Investigator (`voice_71a5a701-796e-421d-840e-0adc00b0816a`). Durasi 81.450 detik. Satu perintah ShortZ memproses 6 potongan internal. [Timestamp hasil ASR](narration-investigator-timestamps.json) dan [laporan pemeriksaan](narration-investigator-report.json). ShortZ menandai 4 potongan gagal dan penyelarasan akhir belum lulus. Periksa teks dan pengucapan dengan mendengarkan sebelum mengunci timestamp atau membuat caption. Periksa juga jeda untuk efek dan campuran audio. Master ini melampaui batas akhir 72 detik. Susun edit waktu yang alami sebelum mengunci durasi cut. Durasi juga melampaui batas tinjauan 80 detik untuk narasi.

**Foley** — Gesek plastik pelan di lantai, lalu napas pengemudi. Botol tidak jatuh di tangga. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi menahan napas di depan deretan ruko. Stiker `DISEWAKAN` yang pudar menempel di kaca depan. Bayangan orang bergerak di trotoar.
2. Ia memilih tangga belakang dan membiarkan rolling door berkarat di posisi semula.
3. Sebelum menutup pintu lantai dua, pengemudi mengintip lewat jendela berteralis besi ke balkon jemuran sempit.
4. Ia membuka tas kain. Botol kosong bertutup merah mudah dikenali.
5. Pengemudi memasang botol di anak tangga dan memeriksa naik-turun jalurnya.
6. Senter singkat menangkap jejak berlumpur di atas botol. Pengemudi menatap pijakannya sendiri.
7. Pengemudi duduk menghadap pintu dan memadamkan layar. HUD 70% air dan baterai 25%.
8. Waktu 23:30. Ia mendengar plastik bergesek dari arah yang salah dan meraih senter.
9. Botol bertutup merah berada tepat di samping sepatu. Jari gadis menarik diri ke sudut gelap.
10. Klimaks rapat. Tutup merah terlihat di depan frame. Dari sudut gelap di belakang botol, senyum tertutup gadis itu mulai terlihat. Tatapannya tetap tak berkedip.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode04`. Target akhir 61–72 detik. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
