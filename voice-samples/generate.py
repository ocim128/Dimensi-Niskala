"""Generate the five Indonesian narrator references with edge-tts 7.3.1.

Run from this directory after installing edge-tts. This sends the scripts to
Microsoft's online speech service. Existing MP3 files are not overwritten.
"""

import asyncio
from pathlib import Path

import edge_tts

VOICE = "id-ID-ArdiNeural"
RATE = "-8%"
PITCH = "-3Hz"
VOLUME = "+0%"
SAMPLES = {
    "01-hutan-sunyi.mp3": (
        "Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah "
        "pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya "
        "di sekitar saya padam. Sekarang, saya harus memilih: masuk, atau "
        "menunggu sesuatu datang dari kegelapan."
    ),
    "02-menara-lonceng.mp3": (
        "Di puncak menara ini, ada api yang tidak pernah padam. Tapi ada satu "
        "aturan: jangan pernah membunyikan loncengnya. Ketika badai datang, "
        "saya mendengar seseorang meminta pertolongan dari bawah. Untuk "
        "menyelamatkannya, saya harus melanggar aturan itu."
    ),
    "03-air-dan-bayangan.mp3": (
        "Air terakhir saya tinggal setengah botol. Di tengah gurun, saya "
        "menemukan sebuah sumur dengan air yang jernih. Tapi setiap kali "
        "saya mendekat, bayangan saya bergerak lebih dulu. Saya mundur, "
        "dan bayangan itu tetap berdiri di tepi sumur."
    ),
    "04-jembatan-kabut.mp3": (
        "Untuk keluar dari lembah ini, saya harus menyeberangi jembatan "
        "sebelum matahari terbit. Masalahnya, setiap langkah menghapus satu "
        "ingatan. Saat sampai di tengah, saya lupa kenapa harus pergi. "
        "Lalu saya melihat nama saya tertulis di telapak tangan."
    ),
    "05-pilihan-terakhir.mp3": (
        "Pintu batu itu hanya bisa dibuka sekali. Di belakang saya, makhluk "
        "itu semakin dekat. Di depan saya, seorang anak terjebak di sisi "
        "lain. Saya menarik tuasnya dan mendorong anak itu keluar. Pintu "
        "tertutup, sementara saya masih di dalam."
    ),
}


async def main():
    directory = Path(__file__).resolve().parent
    for filename, script in SAMPLES.items():
        output = directory / filename
        if output.exists():
            print(f"Skipping existing file: {output.name}")
            continue
        speech = edge_tts.Communicate(
            script, VOICE, rate=RATE, pitch=PITCH, volume=VOLUME
        )
        temporary = output.with_suffix(".mp3.partial")
        try:
            await speech.save(str(temporary))
            temporary.replace(output)
        finally:
            temporary.unlink(missing_ok=True)
        print(f"Created: {output.name}")


if __name__ == "__main__":
    asyncio.run(main())
