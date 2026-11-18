"""Generate Indonesian auditions using an existing synthetic reference.

Install gradio_client==2.7.2 and ffmpeg. The online demo receives the script
and chosen synthetic reference. Existing outputs are preserved.
"""
from pathlib import Path
import subprocess
import tempfile

from gradio_client import Client, handle_file

HERE = Path(__file__).resolve().parent
ENGLISH_REFERENCE_TEXT = (
    "The forest fell silent that night. Ahead of me stood a door that had not "
    "been there before. When I touched it, the light around me went out."
)
AUDITION_TEXT = (
    "Malam itu, hutan tiba-tiba menjadi sunyi. Di depan saya, ada sebuah "
    "pintu yang tidak ada kemarin. Saat saya menyentuhnya, seluruh cahaya "
    "di sekitar saya padam."
)


def main():
    client = Client("k2-fsa/OmniVoice")
    jobs = (
        ("candidate-a.mp3", "reference-a.wav", ENGLISH_REFERENCE_TEXT),
        ("candidate-b.mp3", "reference-b.wav", ENGLISH_REFERENCE_TEXT),
        ("candidate-a-indonesian-reference.mp3", "reference-a-indonesian.wav", AUDITION_TEXT),
    )
    for output_name, reference_name, reference_text in jobs:
        destination = HERE / output_name
        if destination.exists():
            print(f"Skipping existing {destination.name}", flush=True)
            continue
        reference = HERE / reference_name
        audio, status = client.predict(
            text=AUDITION_TEXT,
            lang="Indonesian",
            ref_aud=handle_file(str(reference)),
            ref_text=reference_text,
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
            raise RuntimeError(f"No audio for {output_name}: {status}")
        with tempfile.TemporaryDirectory(dir=HERE) as temp_dir:
            temp_output = Path(temp_dir) / destination.name
            subprocess.run(
                ["ffmpeg", "-v", "error", "-i", audio, "-codec:a", "libmp3lame", "-q:a", "2", str(temp_output)],
                check=True,
            )
            temp_output.replace(destination)
        print(f"Created {destination.name}: {status}", flush=True)


if __name__ == "__main__":
    main()
