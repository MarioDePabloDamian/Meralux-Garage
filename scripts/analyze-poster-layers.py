from PIL import Image
import os

base = r"C:\Users\mario\Documents\GitHub\Meralux Garage\public\poster-layers"
files = [
    "01-jl.webp",
    "06-gator.webp",
    "04-boobie.webp",
    "03-gal.webp",
    "02-biker.webp",
    "00-heli.webp",
    "07-raul.webp",
    "05-lambo.webp",
    "08-speedboat.webp",
]

for f in files:
    im = Image.open(os.path.join(base, f)).convert("RGBA")
    w, h = im.size
    px = im.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    count = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if a > 10 and lum > 18:
                count += 1
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    print(
        f"{f}: size={w}x{h} bbox=({minx},{miny},{maxx},{maxy}) "
        f"pct=({minx/w*100:.2f},{miny/h*100:.2f},{(maxx-minx)/w*100:.2f},{(maxy-miny)/h*100:.2f})"
    )
