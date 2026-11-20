# Episode 006 · Gema di Underpass

**Draft naskah dan panel · tahap pra-audio.** [Naskah ShortZ · 121 kata](narasi.txt)

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 6 of 7** — Rule Breakdown
- **Entry State** — HARI 4 • 22:00 · 15% air · 3% baterai HP · mulut terowongan menuju stasiun. Senter terpisah masih berfungsi.
- **Exit State sementara** — HARI 4 • 22:12 · 15% air · 0% baterai HP · cekungan tangga darurat di luar terowongan. Senter mulai redup.
- **Jembatan dari episode sebelumnya** — Gunakan penanda waktu dan cuplikan peta yang disimpan dari SMS. Setelah satu hari berpindah dan menunggu, air dan daya turun. Senter memakai daya sendiri. [Draft episode sebelumnya](../005-suara-dari-rumah-kosong/brief.md)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `ATURAN TEROWONGAN GELAP`
- **Hook lisan** — Kalau terowongan gelap, arahkan senter ke lantai.
- **Pilihan dan payoff** — Saat kamu berhenti, langkah lain melewati gelap di sisimu. Kamu mundur ke tangga darurat, lalu gadis di bawah lampu hijau stasiun mengetuk kaca tiga kali.
- **Petunjuk visual** — Sekitar 00:29–00:33, ujung bayangan kedua berhenti sedikit terlambat di batas sorot lantai. Letakkan di sudut frame tanpa aksen.

## 2. Audio

Master aktif [narration-investigator-revised.mp3](narration-investigator-revised.mp3), ShortZ Gemini 3.8 Flash TTS Investigator: 76,75 detik. [Laporan ASR](narration-investigator-revised-report.json). Edit tanpa perubahan kecepatan: [narration-prepared.mp3](narration-prepared.mp3) 71,745 detik; [timestamp](narration-timestamps.json) dan [peta edit](audio-edit-map.json). Bagian langkah kaki dan pengungkapan dilindungi mulai 56,86 detik pada sumber. Masih perlu pemeriksaan pendengaran untuk kata yang ditandai, batas edit, jeda dan tarikan napas. [Edit sebelumnya](previous-audio-edit/narration-prepared.mp3) disimpan sebagai arsip.

**Foley** — Mulai dengan langkah dan gema yang bisa dihitung. Hentikan gema normal saat pengemudi berhenti, lalu sisakan ritme langkah kedua. Akhiri dengan tiga ketukan kaca dari arah pos. Beri ruang untuk bunyi ketukan dalam master. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

### Mandatory Audio & Foley Cue Sheet

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| Aturan berjalan di terowongan | foley: langkah stabil di beton basah | Slapback terowongan rapat | Ikuti ritme langkah pengemudi dan jaga narator tetap terbaca. |
| “Kamu berhenti mengambil napas. Langkah di lorong terus berjalan...” | bed-cut + foley: dua set langkah terpisah | Set kedua melewati sisi gelap yang dekat, lalu berhenti di depan | Hentikan langkah pengemudi tepat saat ia berhenti; biarkan hanya set kedua berlanjut, melewati sampingnya dan berhenti di depan. Lindungi jeda dan jangan membuang ekor gema secara tidak sengaja. |
| Setelah “mengetuk kaca tiga kali.” | foley: callback ketukan kaca Episode 001 | Kaca jelas dari arah pos | Picu **tok-tok-tok**, tiga ketukan, pada tail sesudah kalimat; jaga ruang dari narator. |
| Bayangan kedua terlambat berhenti | bed-cut: larangan aksen | Ambience dan langkah cerita tetap alami | **Nol aksen SFX** khusus pada petunjuk rewatch. |

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi memeriksa ujung gelap dari mulut terowongan. Senter mengarah ke lantai.
2. HP menampilkan jalur ke stasiun dan baterai 3% sebelum layar dimatikan.
3. Medium pengemudi memakai garis dinding untuk menjaga arahnya.
4. Sepatu pengemudi melewati pangkal tiang beton berikutnya. Jarak antartiang terbaca di gambar.
5. Pengemudi mengurangi langkah saat gema bertumpuk. Jaga wajah baca jelas.
6. Di ujung lingkaran senter, bayangan kedua terlambat berhenti.
7. Ia melewati tanda `TANGGA DARURAT`. Papan penunjuk stasiun berwarna hijau bertuliskan `PINTU KELUAR / STASIUN` terlihat di kejauhan.
8. HP padam. Pengemudi menurunkan senter ketika langkahnya sendiri berhenti.
9. Bunyi langkah berlanjut melewati gelap di sisi pengemudi. Ia mundur pelan ke cekungan tangga darurat. HUD air tetap 15%, HP 0%.
10. Di bawah lampu hijau stasiun, gadis itu menatap ke arah tangga darurat dan mengetuk kaca pos tiga kali.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode06`. Target narasi siap 65–72 detik dan video akhir 62–75 detik. Angka di HUD dan takarir harus sama. Konfirmasi penonton baru memahami ancaman, pilihan, hasil dan petunjuk tanpa menonton episode sebelumnya. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
