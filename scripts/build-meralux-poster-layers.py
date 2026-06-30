"""
Compone fotos de public/intro-poster/ en capas 1:1 compatibles con el póster GTA de Aceternity.
Usa public/poster-layers/ solo como máscara de forma (alpha); nunca copia RGB de referencia.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REF_DIR = ROOT / "public" / "poster-layers"
SRC_DIR = ROOT / "public" / "intro-poster"
OUT_DIR = ROOT / "public" / "poster-layers-meralux"
CANVAS = 1920
INSET = 7  # grosor del borde oscuro alrededor de cada panel
# Fondo del póster / UI — evita bleed rosa-morado del cielo GTA en gutters
GUTTER_RGBA = (10, 6, 18, 255)
ALPHA_MASK_MIN = 10

# Capa Aceternity -> (archivo fuente, punto focal del recorte cover)
# 9 fotos distintas en public/intro-poster/
PANEL_SOURCES: dict[str, tuple[str, str]] = {
    "01-jl.webp": ("01-hero-center.png", "center"),
    "00-heli.webp": ("02-atmosphere-topleft.png", "top"),
    "02-biker.webp": ("09-drift-wheelie.png", "top"),
    "03-gal.webp": ("04-side-left-tall.png", "center"),
    "04-boobie.webp": ("05-rear-portrait.png", "center"),
    "06-gator.webp": ("06-street-detail.png", "top"),
    "05-lambo.webp": ("07-side-bottom-left.png", "center"),
    "07-raul.webp": ("08-rear-bottom-center.png", "center"),
    "08-speedboat.webp": ("03-rear-wide.png", "center"),
}


def cover_crop(img: Image.Image, tw: int, th: int, focal: str) -> Image.Image:
    sw, sh = img.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)

    focal_x = {"left": 0.0, "center": 0.5, "right": 1.0}.get(focal, 0.5)
    focal_y = {"top": 0.0, "center": 0.5, "bottom": 1.0}.get(focal, 0.5)

    left = int((nw - tw) * focal_x)
    top = int((nh - th) * focal_y)
    return resized.crop((left, top, left + tw, top + th))


def panel_bbox(ref: Image.Image) -> tuple[int, int, int, int]:
    w, h = ref.size
    px = ref.load()
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if a > 10 and lum > 18:
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    return minx, miny, maxx, maxy


def apply_alpha_mask(panel: Image.Image, ref_crop: Image.Image) -> Image.Image:
    """Recorta la silueta del panel con el alpha de referencia (sin RGB GTA)."""
    masked = Image.new("RGBA", panel.size, (0, 0, 0, 0))
    panel_px = panel.load()
    ref_px = ref_crop.load()
    out_px = masked.load()

    for y in range(panel.height):
        for x in range(panel.width):
            ref_a = ref_px[x, y][3]
            if ref_a <= ALPHA_MASK_MIN:
                continue
            r, g, b, _ = panel_px[x, y]
            out_px[x, y] = (r, g, b, ref_a)

    return masked


def compose_layer(ref_name: str, src_name: str, focal: str) -> Image.Image:
    ref = Image.open(REF_DIR / ref_name).convert("RGBA")
    src = Image.open(SRC_DIR / src_name).convert("RGBA")

    minx, miny, maxx, maxy = panel_bbox(ref)
    panel_w, panel_h = maxx - minx + 1, maxy - miny + 1
    inner_w = max(1, panel_w - 2 * INSET)
    inner_h = max(1, panel_h - 2 * INSET)

    photo = cover_crop(src, inner_w, inner_h, focal)

    # Panel local: gutter oscuro + foto interior (sin RGB de referencia)
    panel = Image.new("RGBA", (panel_w, panel_h), GUTTER_RGBA)
    panel.paste(photo, (INSET, INSET), photo)

    ref_crop = ref.crop((minx, miny, maxx + 1, maxy + 1))
    masked_panel = apply_alpha_mask(panel, ref_crop)

    out = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    out.paste(masked_panel, (minx, miny), masked_panel)
    return out


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for ref_name, (src_name, focal) in PANEL_SOURCES.items():
        src_path = SRC_DIR / src_name
        if not src_path.exists():
            raise FileNotFoundError(f"Falta la foto fuente: {src_path}")

        layer = compose_layer(ref_name, src_name, focal)
        out_path = OUT_DIR / ref_name
        layer.save(out_path, "WEBP", quality=92, method=6)
        print(f"OK {out_path.name} <- {src_name}")

    logohole = REF_DIR / "09-logohole.webp"
    if logohole.exists():
        # Capa GTA descartada: artefacto rosa en zona del logo
        transparent = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
        transparent.save(OUT_DIR / "09-logohole.webp", "WEBP", quality=95)
        print("OK 09-logohole.webp (transparente)")

    print(f"\nCapas listas en {OUT_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
