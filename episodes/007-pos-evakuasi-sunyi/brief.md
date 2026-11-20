# Episode 007 · Pos Evakuasi Sunyi

**Draft naskah dan panel · tahap pra-audio.** [Naskah ShortZ · 116 kata](narasi.txt)

## Arc Context

- **Arc ID** — [01-kemacetan-terakhir](../../arcs/01-kemacetan-terakhir/arc.json)
- **Episode 7 of 7** — Finale & Handoff to Arc 02
- **Entry State** — HARI 5 • 05:00 · 15% air · 0% baterai HP · sisi luar Pos Evakuasi Stasiun, akses dari tangga darurat. Senter redup.
- **Exit State sementara** — HARI 5 • 05:12 · 0% air · 0% baterai HP · pengemudi mencapai jalan setapak samping rel di luar pos. Peringatan tertinggal di beton luar.
- **Jembatan dari episode sebelumnya** — Pengemudi menunggu di cekungan tangga darurat sampai jadwal pembukaan yang diumumkan. Tunjukkan air tersisa saat pagi tiba, lalu ia menghabiskan sisanya sebelum bergerak. [Draft episode sebelumnya](../006-gema-di-underpass/brief.md)
- **Locked Character Sheet Paths** — `assets/characters/arc-01-driver/sheet.png` dan `assets/characters/arc-01-passenger-teen/sheet.png`

## 1. Cerita dan aturan

- **Judul pembuka** — `JANGAN IKUT BARISAN`
- **Hook lisan** — Di pos evakuasi, jauhi barisan yang membisu.
- **Pilihan dan payoff** — Pagar pos terbuka tepat saat kamu ragu. Gadis dan barisan mengawasi satu orang yang belum masuk. Pengemudi meninggalkan peringatan dan keluar lewat jalan setapak samping rel. Malamnya, sepatu bot PDL seorang satpam muncul di depan tulisan.
- **Petunjuk visual** — Sekitar 00:21–00:25, gadis terlihat di ujung barisan dekat pagar, tersenyum tanpa berkedip. Biarkan penonton fokus pada gerakan pengemudi di depan frame.

## 2. Audio

Master aktif [narration-investigator-final.mp3](narration-investigator-final.mp3), ShortZ Gemini 3.8 Flash TTS Investigator: 73.795 detik. [Laporan ASR](narration-investigator-final-report.json). Edit tanpa perubahan kecepatan: [narration-prepared.mp3](narration-prepared.mp3) 72.004 detik; [timestamp](narration-timestamps.json) dan [peta edit](audio-edit-map.json). Masih perlu pemeriksaan pendengaran untuk kata yang ditandai, batas edit, jeda dan tarikan napas sebelum dikunci. [Master sebelumnya](narration-investigator.mp3) dan laporannya tetap disimpan sebagai arsip; naskahnya berbeda.

**Foley** — Mulai dengan sirene dan pengumuman berulang dari toa pos. Barisan tetap membisu. Gesekan serpihan batu di beton terdengar sebelum sirene putus. Sisakan momen tenang saat senter satpam menyapu tulisan pada akhir. [Pustaka dan atribusi](../../public/sfx/LICENSES.md)

### Mandatory Audio & Foley Cue Sheet

| Beat / Trigger Phrase | Asset Type (foley / voice-sfx / bed-cut) | Acoustic Treatment | Mix Rule |
| --- | --- | --- | --- |
| Pembuka dan Rule 1: pengumuman toa berulang | voice-sfx `pa-announcer`: satu klip “Nomor antrean empat puluh dua... silakan masuk...” + foley/bed sirene peringatan | `toa-megaphone`; sirene jauh | Loop klip PA yang **sama** secara identik di bawah pembuka dan Rule 1, bersama bed sirene jauh; pengumuman dan sirene tetap di bawah Investigator, orang dalam barisan tetap bisu. |
| Rule 3: menulis `JANGAN IKUT BARISAN` | foley: serpihan batu pada beton | Gesekan kasar, dekat | Sinkronkan dengan gerakan menulis tanpa menutupi narasi. |
| “Suara peringatan berhenti.” → “Pagar terbuka.” | bed-cut + foley: gerbang besi berat | Hening mendadak, lalu derit gerbang | **Hard-cut bersamaan** sirene dan loop TOA menjadi hening tepat pada kalimat berhenti; picu derit berat pada “Pagar terbuka.” |
| Handoff `HARI 5 • MALAM`: sepatu berhenti, senter menyala | foley: sepatu PDL dan klik mekanis senter | Langkah lambat berat di beton/kerikil, klik jelas dekat | Hentikan langkah di depan tulisan, lalu picu klik senter bersih; sisakan ruang dari narasi. |

## 3. Sepuluh panel 9:16

Urutan panel awal; waktu harus disesuaikan dengan master yang dipilih. Tampilkan penanda waktu dan persediaan dari entry dan exit state. Jadikan panel pembuka latar judul 00:00.0–00:01.8, dengan frame cover di 00:00.2. Ciptakan perubahan aksi atau framing di dalam panel yang menahan beberapa detik. Gunakan batch gambar baru berdasarkan dua lembar karakter yang dikunci.

1. Pengemudi dari sisi pos dan barisan orang diam di balik pagar. Pastikan spanduk vinil `POS EVAKUASI` yang diikat tali ke pagar terbaca di latar pada frame 00:00.2 bersama judul `JANGAN IKUT BARISAN`. Tunjukkan jam 05:00.
2. Pengemudi mengamati pos, menghabiskan air dan mengecek HP yang sudah mati.
3. Lampu suar berkedip. Sirene menyala dan toa pos mengulang nomor antrean. Pengemudi mencari orang yang benar-benar menyahut.
4. Ia mengintip barisan dari samping; gadis di ujungnya hanya terlihat sebentar.
5. HUD taktik memetakan pagar dan jalan setapak samping rel yang terlihat dari posisi pengemudi.
6. Pengemudi mengendap ke dinding beton luar dan menulis `JANGAN IKUT BARISAN` dengan serpihan batu putih dari puing.
7. Sirene mendadak berhenti. Lampu suar padam dan gagang pagar mulai bergerak.
8. Pagar terbuka tanpa penjaga, barisan menoleh serentak ke tempatnya tadi. Tahan reaksinya sebelum berbalik.
9. Pengemudi tiba di jalan setapak samping rel di luar pos. Tahan satu momen lega dan tampilkan status singkat `ARC 01 • KELUAR JALUR`.
10. HARI 5 • MALAM. Sepatu bot PDL hitam dan ujung celana seragam satpam shift malam berhenti menghadap tembok beton di samping spanduk `POS EVAKUASI`. Sorot senternya menyapu tulisan yang sama, pembuka Arc 02.

**Aset dan hak pakai** — Lembar karakter dan pustaka foley tercatat di atas. Catat prompt, file terpilih, sumber bunyi baru dan status hak pakai setelah produksi.

### Post-Narration Jolt Beat

Tunda sentakan kepala serentak panel 8 sampai setelah kata terakhir narasi: vacuum, lalu barisan sunyi snap serentak dengan shake, flash, dan sting.
Setelah jolt tampilkan handoff tenang `HARI 5 • MALAM` satpam dan senter, lalu hard cut ke hitam; muat seluruh urutan dalam tail 1,0–1,5 detik.

## 4. Handoff dan review

Usulan ID komposisi `Arc01Episode07`. Target video akhir 62–75 detik termasuk tail. Angka di HUD dan takarir harus sama. Konfirmasi pengemudi benar-benar meninggalkan pos sebelum handoff. Penjaga muncul melalui sepatu dan senter saja. Review audio, gambar dan hak pakai masih menunggu produksi. Catat kontinuitas final di arc record setelah cut diterima.
