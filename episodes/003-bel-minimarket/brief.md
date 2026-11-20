# Episode 003 · Bel Minimarket

**Draft naskah dan panel · tahap pra-audio.** [Naskah ShortZ · 140 kata](narasi.txt)

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 3 of 7** — Resource Crisis
- **Entry State** — HARI 1 • 05:30 · 40% air · 48% baterai · jalur menuju minimarket rest area.
- **Exit State sementara** — HARI 1 • 05:40 · 100% air · 45% baterai · pojok tembok dekat gudang belakang minimarket. Membawa senter dari meja kasir.
- **Jembatan dari episode sebelumnya** — Dari balik truk boks, pengemudi membawa tas belanja kain dari mobil. Peta dibuka selama berjalan ke rest area sehingga baterai 57% turun ke 48%. Tampilkan rute atau ponsel di pembuka. [Draft episode sebelumnya](../002-kabur-dari-mobil/brief.md)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `ATURAN MINIMARKET KOSONG`
- **Hook lisan** — Cari air saat wabah, jauhi pintu depan.
- **Pilihan dan payoff** — Kamu membawa air keluar lewat gudang belakang. Setelah kamu sampai di luar, bel gerak di atas pintu depan berbunyi saat gadis itu mendorong pintu kaca manual dari dalam hingga terbuka sedikit.
- **Petunjuk visual** — Sekitar 00:25–00:29, pintu kaca kulkas memantulkan gadis berdiri di ujung lorong. Wajah tampak tipis di pantulan. Fokus utama tetap pengemudi dan air.

## 2. Audio

Master [narration-investigator.mp3](narration-investigator.mp3) dibuat dari [narasi.txt](narasi.txt) menggunakan ShortZ `gemini-cloud`, model `gemini-3.8-flash-tts`, dan suara Investigator (`voice_71a5a701-796e-421d-840e-0adc00b0816a`). Durasi 73.070 detik. Satu perintah ShortZ memproses 6 potongan internal. [Timestamp hasil ASR](narration-investigator-timestamps.json) dan [laporan pemeriksaan](narration-investigator-report.json). ShortZ menandai 3 potongan gagal dan penyelarasan akhir belum lulus. Periksa teks dan pengucapan dengan mendengarkan sebelum mengunci timestamp atau membuat caption. Periksa juga jeda untuk efek dan campuran audio. Master ini melampaui batas akhir 72 detik. Susun edit waktu yang alami sebelum mengunci durasi cut.

**Foley** — Ding-dong dari bel gerak di atas pintu kaca terdengar saat gadis mendorong pintu dari dalam. Sisakan ruang untuk bunyinya setelah pengemudi keluar. Biarkan pantulan di kulkas tanpa aksen audio. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi di samping minimarket rest area, melihat pintu kaca berengsel dengan stiker `TARIK` di sisi luar dan bel gerak kecil di atas kusen.
2. Botol belum separuh. Dari parkiran, pengemudi melihat tumpukan galon air di dekat gudang belakang. Baterai 48%.
3. Pengemudi memeriksa celah pintu gudang belakang di samping galon dan krat minuman. Wajahnya terlihat jelas.
4. Ia memasang pengatur waktu tanpa suara dan mengecek layar HP sekali.
5. Pengemudi mengambil jalur rak belakang dan memeriksa cermin cembung.
6. Ia mengambil botol air yang masih tersegel. Sosok gadis terlihat samar di pantulan kaca kulkas.
7. Pengemudi memasukkan botol ke tas belanja kain dari mobil dan mengambil senter di meja kasir. Tunjukkan air 100%.
8. Pengemudi memeriksa lorong dan keluar melalui pintu gudang belakang. Baterai 45%.
9. Dari pojok tembok di samping gudang, ia bisa melihat bagian depan toko. Ia menoleh saat bel berbunyi.
10. Gadis mendorong pintu kaca manual dari dalam hingga terbuka sedikit, lalu memandang ke arah pengemudi. Bunyi ding-dong jatuh saat pintu mulai terbuka.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode03`. Target akhir 61–72 detik. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
