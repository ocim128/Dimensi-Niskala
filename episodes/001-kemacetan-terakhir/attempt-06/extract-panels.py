"""Extract the four independent storyboard drawings from a generated atlas.

Usage: python extract-panels.py atlas.png name1 name2 name3 name4
The output is a new set of WebP files; no existing file is replaced.
"""
import sys
from pathlib import Path
from PIL import Image

source = Path(sys.argv[1])
names = sys.argv[2:]
if len(names) != 4:
    raise SystemExit("supply four output names")
target = Path("public/assets/001-kemacetan-terakhir/attempt-06")
im = Image.open(source).convert("RGB")
w, h = im.size
for index, name in enumerate(names):
    destination = target / (name + ".webp")
    if destination.exists():
        raise SystemExit(f"refusing to replace {destination}")
    x, y = index % 2, index // 2
    # Exclude only the panel divider; do not reframe the drawing.
    box = (x*w//2+5, y*h//2+5, (x+1)*w//2-5, (y+1)*h//2-5)
    im.crop(box).save(destination, "WEBP", quality=94, method=6)
    print(destination)
