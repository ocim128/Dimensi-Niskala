"""Generate audition clips from our synthetic OmniVoice reference.

Uses the public OmniVoice demo and sends the reference and script to it. Install
gradio_client and ffmpeg before running. Existing files are preserved.
"""

from pathlib import Path
import subprocess
import tempfile

from gradio_client import Client, handle_file

HERE = Path(__file__).resolve().parent
REFERENCE_TEXT = (
    "Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah "
    "pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya "
    "di sekitar saya padam."
)
SAMPLES = {
    "02-menara-lonceng.mp3": (
        "Di puncak menara ini, ada api yang tidak pernah padam. Tapi ada satu "
        "aturan: jangan pernah membunyikan loncengnya. Ketika badai datang, "
        "saya mendengar seseorang meminta pertolongan dari bawah."
    ),
    "03-air-dan-bayangan.mp3": (
        "Air terakhir saya tinggal setengah botol. Di tengah gurun, saya "
        "menemukan sebuah sumur dengan air yang jernih. Tapi setiap kali "
        "saya mendekat, bayangan saya bergerak lebih dulu."
    ),
    "04-jembatan-kabut.mp3": (
        "Untuk keluar dari lembah ini, saya harus menyeberangi jembatan "
        "sebelum matahari terbit. Masalahnya, setiap langkah menghapus satu "
        "ingatan. Saat sampai di tengah, saya lupa kenapa harus pergi."
    ),
    "05-pilihan-terakhir.mp3": (
        "Pintu batu itu hanya bisa dibuka sekali. Di belakang saya, makhluk "
        "itu semakin dekat. Di depan saya, seorang anak terjebak di sisi "
        "lain. Saya harus memilih siapa yang akan keluar."
    ),
}


def main():
    client = Client("k2-fsa/OmniVoice")
    for filename, text in SAMPLES.items():
        destination = HERE / filename
        if destination.exists():
            print(f"Skipping existing {filename}", flush=True)
            continue
        print(f"Generating {filename}", flush=True)
        audio, status = client.predict(
            text=text,
            lang="Indonesian",
            ref_aud=handle_file(str(HERE / "reference.wav")),
            ref_text=REFERENCE_TEXT,
            instruct="",
            ns=32,
            gs=2,
            dn=True,
            sp=1,
            du=None,
            pp=True,
            po=True,
            api_name="/_clone_fn",
        )
        if not audio:
            raise RuntimeError(f"No audio for {filename}: {status}")
        with tempfile.TemporaryDirectory() as temporary_dir:
            temp_mp3 = Path(temporary_dir) / filename
            subprocess.run(
                ["ffmpeg", "-v", "error", "-i", audio, "-codec:a", "libmp3lame", "-q:a", "2", str(temp_mp3)],
                check=True,
            )
            temp_mp3.replace(destination)
        print(f"Created {filename}: {status}", flush=True)


if __name__ == "__main__":
    main()
