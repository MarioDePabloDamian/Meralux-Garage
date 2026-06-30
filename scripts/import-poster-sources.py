"""Copia las 9 fotos a public/intro-poster/ con nombres del póster."""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "intro-poster"
DOWNLOADS = Path(r"C:\Users\mario\Downloads")

HF = {
    "corvette": DOWNLOADS / "hf_20260630_104355_754233ac-50cd-40f0-a784-9e30a84fdfcb.png",
    "fog": DOWNLOADS / "hf_20260630_103752_a1ac21cf-e123-4210-a7af-c966a1c398a1.png",
    "silvia": DOWNLOADS / "hf_20260630_104944_05d3b0ab-91d2-45de-a1cf-bb8ed37e34de.png",
    "gtr": DOWNLOADS / "hf_20260630_111650_3431cdf8-dbf7-4dce-a513-c80430d37909.png",
    "itasha": DOWNLOADS / "hf_20260630_104606_7bf2ee0d-5a19-48d5-a429-c0f504f0f571.png",
    "mclaren": DOWNLOADS / "hf_20260630_114200_05a823b6-0684-43a8-9010-373545da8dbf.png",
    "ferrari": DOWNLOADS / "hf_20260630_122722_e711fbc9-3c71-433a-a808-7c24bd4f81e6.png",
    "lambo": DOWNLOADS / "hf_20260630_133851_9a131977-8bcb-4e32-94b7-7f598feaab44.png",
}

# Novena foto: 350Z wheelie (ya en el proyecto)
WHEELIE = OUT / "02-drift-front.png"

MAPPING = {
  # Panel GTA          # Archivo destino           # Fuente
  "01-hero-center.png": HF["corvette"],       # centro grande — vertical C8
  "02-atmosphere-topleft.png": HF["fog"],     # arriba izq — calle neón
  "09-drift-wheelie.png": WHEELIE,            # arriba der — 350Z drift (tu novena)
  "04-side-left-tall.png": HF["silvia"],      # izq alta — Silvia koi vertical
  "05-rear-portrait.png": HF["gtr"],          # der media — GT-R trasera
  "06-street-detail.png": HF["itasha"],       # abajo centro — 350Z itasha acción
  "07-side-bottom-left.png": HF["mclaren"],   # abajo izq — McLaren puertas
  "08-rear-bottom-center.png": HF["ferrari"], # franja ancha — Ferrari fénix
  "03-rear-wide.png": HF["lambo"],            # abajo der grande — Lambo túnel
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    if not WHEELIE.exists():
        raise FileNotFoundError(
            f"Falta la novena foto (350Z wheelie): {WHEELIE}\n"
            "Copia tu drift a public/intro-poster/02-drift-front.png o 09-drift-wheelie.png"
        )

    for name, src in MAPPING.items():
        if not src.exists():
            raise FileNotFoundError(f"Falta: {src}")
        shutil.copy2(src, OUT / name)
        print(f"OK {name} <- {src.name}")


if __name__ == "__main__":
    main()
