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

Master aktif [narration-investigator.mp3](narration-investigator.mp3), ShortZ Gemini 3.8 Flash TTS Investigator: 73.07 detik. [Laporan ASR](narration-investigator-report.json). Edit tanpa perubahan kecepatan: [narration-prepared.mp3](narration-prepared.mp3) 71.666 detik; [timestamp](narration-timestamps.json) dan [peta edit](audio-edit-map.json). Masih perlu pemeriksaan pendengaran untuk kata yang ditandai, batas edit, jeda dan tarikan napas sebelum dikunci.

**Foley** — Ding-dong dari bel gerak di atas pintu kaca terdengar saat gadis mendorong pintu dari dalam. Sisakan ruang untuk bunyinya setelah pengemudi keluar. Biarkan pantulan di kulkas tanpa aksen audio. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

### Mandatory Audio & Foley Cue Sheet

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| Setelah keluar lewat gudang belakang: “bel depan berbunyi” | foley: chime gerak minimarket Indonesia `ding-dong`, lalu derit dorongan pintu kaca | Sedikit teredam dari perspektif luar | Bunyi bel tepat saat pengemudi sudah keluar; ikuti dengan derit kaca halus saat pintu didorong dari dalam. Sisakan ruang untuk narator. |
| Sosok pada pantulan kaca kulkas | bed-cut: larangan aksen | Ambience berlanjut alami | **Nol aksen SFX** pada petunjuk rewatch; tidak ada sting atau suara khusus. |

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

### Post-Narration Jolt Beat

Dorong perlahan ke kaca pintu depan setelah pengemudi bereaksi; sesudah narasi dan vacuum, snap-cut ke tangan gadis menghantam kaca dari dalam dengan sting pendek.
Tahan chime dan derit sesuai cue sheet, tanpa aksen pada petunjuk kulkas; akhiri hard cut ke hitam dalam tail 1,0–1,5 detik.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode03`. Target video akhir 62–75 detik termasuk tail. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
