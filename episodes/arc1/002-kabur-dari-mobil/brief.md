# Episode 002 · Kabur dari Mobil

> **Audio lock · 20 November 2026:** The 138-word draft below predates the current 115–130-word requirement and is retained as production history. The active [118-word script](narasi-v3.txt) uses the [64.850 s ShortZ take](narration-investigator-v3.mp3), without speed changes. One ShortZ CLI invocation submitted the whole script; ShortZ internally split it into six chunks and retried some chunks. The [report](narration-investigator-v3-report.json) marks three chunks failed. The owner listened to the three flagged clips and confirmed “spion,” “membentur” and “sela mobil” sounded correct without cut-off words. The [reviewed timestamps](narration-investigator-v3-reviewed-timestamps.json) place the end of “jangan buka pintu” at 2.70 s and match the script structurally; two merged token boundaries are estimated and full-take listening/caption-sync review remains open. See [the lock record](audio-lock-v3.json). The earlier 120-word v2 take failed verification and its opening rule ended around 3.94 s. No episode-2 exit state has been accepted or written back to the arc.

**Produksi Episode 002.** Naskah lama 138 kata, rincian waktu dan urutan panel di bawah merupakan draf historis; naskah dan timing aktif tercatat pada catatan audio di atas dan `manifest.json`.

**Cue sheet produksi aktif** (`Arc01Episode02`, 30 fps; waktu perkiraan):

| Pemicu | Sumber dan perlakuan | Aturan mix |
| --- | --- | --- |
| Sepanjang ancaman dan pelarian, 00:00–00:59.4 | `sfx/prepared/traffic-bed.wav` dan `sfx/prepared/sub-drone.wav` | Ambience jalan dan tekanan rendah; turun ke hening sebelum kalimat terakhir. |
| Pengait ditahan, 00:33.25 | `sfx/prepared/door-lock.wav` | Stand-in bunyi mekanis pendek dan pelan; perlu ditinjau apakah terbaca sebagai sabuk. |
| Kunci pintu, 00:36.90 | `sfx/prepared/door-lock.wav` | Klik mekanis pelan di bawah narasi. |
| Tas bergerak, sekitar 00:44.47 | `sfx/prepared/coat-shift.wav` | Gerakan kain pendek, tidak menutupi narasi. |
| Pantulan pintu belakang, 00:48.2–00:50.7 | Ambience saja | Petunjuk tanpa aksen: tidak ada klik, sting, atau sorotan. Waktu draf 00:28–00:31 dipindah karena tokoh baru keluar sekitar 00:44–00:48. |
| Sabuk di kursi belakang, 00:64.75–00:65.95 | `sfx/prepared/door-lock.wav`, `sfx/prepared/coat-shift.wav`, `sfx/prepared/reveal-sting.wav` | Klik setelah kata terakhir, lalu tarikan kain dan sting rendah singkat; identitas bunyi dan mix perlu didengar. |

Air dan baterai masuk 50% / 60%; setelah minum dan memeriksa peta ditampilkan 40% / 57%. Waktu keluar HARI 1 • 03:20 dan state final baru masuk ke arc setelah cut diterima.

**Panel produksi aktif** (semua berasal dari `public/assets/002-kabur-dari-mobil/`; waktu frame lihat manifest):

| Mulai | Panel | Beat |
| --- | --- | --- |
| 00:00.0 | `01-hook.png` | Pengemudi dan gadis di mobil; judul serta state awal. |
| 00:05.8 | `02-gridlock.png` | MPV terjepit, jalur ke truk. |
| 00:12.0 | `02b-gap.png` | Celah terancam tertutup. |
| 00:18.6 | `03-dashboard.png` | Hindari spion; gadis terlihat di pantulan. |
| 00:30.0 | `04-belt.png` | Tahan pengait sabuk. |
| 00:36.0 | `05-door.png` | Buka kunci pintu dan bersiap mengambil tas. |
| 00:44.2 | `06-escape.png` | Keluar merunduk di sela kendaraan. |
| 00:48.2 | `07-mirror-clue.png` | Pintu belakang dalam pantulan spion truk; tanpa aksen suara. |
| 00:50.7 | `08-drink.png` | Minum dalam posisi berjongkok. |
| 00:52.0 | `09-phone-v2.png` | Periksa peta di luar kendaraan. |
| 00:54.2 | `10-notice.png` | Antisipasi dan state persediaan keluar. |
| 01:00.0 | `11-empty-seat.png` | Kursi belakang kosong dan bunyi sabuk. |

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 2 of 7** — Immediate Escape
- **Entry State** — HARI 1 • 03:05 · 50% air · 60% baterai · mobil RHD terkunci di jalan tol macet. Gadis masih di kursi belakang.
- **Exit State sementara** — HARI 1 • 03:20 · 40% air · 57% baterai · masih berjongkok di balik truk boks di bahu tol. Botol dan HP dibawa dalam tas kain.
- **Jembatan dari episode sebelumnya** — Gadis terlihat pada akhir Episode 001. Lima menit berlalu di dalam mobil saat pengemudi menunggu kesempatan keluar. [Episode 001 yang dikunci](../../arcs/01-kemacetan-terakhir/arc.json)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `KABUR DARI MOBIL`
- **Hook lisan** — Ada yang duduk di belakangmu, jangan langsung buka pintu.
- **Pilihan dan payoff** — Kamu tetap berjongkok di balik truk boks. Bunyi lepas sabuk terdengar dari kursi belakang yang gelap di mobil kosong tepat di sebelahmu. Kacanya setengah terbuka.
- **Petunjuk visual** — Sekitar 00:28–00:31, spion truk memuat pantulan pintu belakang yang terbuka sedikit. Tahan sekitar 2,5 detik tanpa pembesaran atau aksen suara.

## 2. Audio

Master aktif [narration-investigator.mp3](narration-investigator.mp3), ShortZ Gemini 3.8 Flash TTS Investigator: 70.95 detik. [Laporan ASR](narration-investigator-report.json). Edit tanpa perubahan kecepatan: [narration-prepared.mp3](narration-prepared.mp3) 67.623 detik; [timestamp](narration-timestamps.json) dan [peta edit](audio-edit-map.json). Masih perlu pemeriksaan pendengaran untuk kata yang ditandai, batas edit, jeda dan tarikan napas sebelum dikunci.

**Foley** — Klik sabuk pertama sangat pelan, klik terakhir bersih dan terpisah dari suara narator. Tahan napas sebelum bunyi terakhir. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

### Mandatory Audio & Foley Cue Sheet

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| Act 1: melepas sabuk dan membuka kunci pintu | foley: pengait sabuk manual dan pergeseran kunci | Dekat, teredam, halus | Gerakkan sesuai tangan; jangan gunakan dentang logam keras atau menutupi narator. |
| Sebelum kalimat terakhir, lalu sabuk di kursi belakang mobil kosong terlepas | bed-cut + foley: klik pengait logam dan tarikan pendek sabuk + sting rendah | Klik terisolasi dengan kehadiran 1,5–3 kHz yang terdengar di ponsel | Turunkan ambience hingga hampir hening sebelum kalimat terakhir; beri ruang pada narator, bunyikan klik dan strap retract dari MPV kosong di sebelah, lalu sting low-end singkat. |
| Pantulan pintu belakang di spion truk | bed-cut: larangan aksen | Pertahankan ambience alami | **Nol aksen SFX** pada petunjuk rewatch; jangan beri sting, klik, atau penekanan suara. |

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi di sisi kanan dan gadis di belakang terlihat dalam satu komposisi. Tahan ekspresi saat garis pandang hampir bertemu di spion.
2. Pengemudi memalingkan mata ke kisi dasbor. Hanya tepi spion menangkap wajah gadis.
3. Truk boks dan celah sempit terbaca lewat jendela dengan satu skema jalur singkat.
4. Bahu pengemudi tertahan sabuk. Tangannya menahan pengait agar tidak membentur pintu.
5. Tuas kunci pintu pengemudi bergerak. Pengemudi mengernyit saat kunci bergeser.
6. Pengemudi meraih tas kain berisi botol dan HP, lalu merunduk keluar ke sela kendaraan.
7. Setelah ia keluar, pantulan spion truk menunjukkan pintu belakang mobilnya terbuka sedikit. Pengemudi mengawasi depan.
8. Ia berjongkok di balik truk dengan tas kain di pangkuannya. Perlihatkan air 40% dan baterai 57% sesudah ia memeriksa peta.
9. Masih berjongkok, pengemudi melihat mobil kosong dengan siluet MPV keluarga Indonesia beratap tinggi. Kaca sampingnya setengah terbuka.
10. Dari balik truk, terlihat kursi belakang MPV yang gelap. Interior dan setir kanan tetap konsisten. Pengait sabuk terlepas.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode02`. Target akhir 61–72 detik. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.

### Jolt recut cue sheet ? 20 November 2026

The recut preserves the silent mirror clue. A CC0-derived `climax-riser` runs 01:03.60?01:07.40 and then cuts out. The existing lock and cloth stand-ins begin at 01:07.80 and 01:07.87, after the prepared take; the layered CC BY/CC0 `climax-stinger` begins at 01:08.13. The footage cuts to black at 01:09.23. The separate seatbelt stand-ins are not confirmed to sound like a buckle and retract; in-context listening is still required. The slam is an edited body-impact source, not a verified recording of a vehicle door.
