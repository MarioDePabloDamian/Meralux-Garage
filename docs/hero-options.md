# Opciones hero BMW — taller + neón + morado

Generadas con **nano_banana_pro** · **21:9** · **1K** (21 jun 2026).

Elige una opción (A, B, C o D) y la escalamos a desktop, mobile y 4K para el hero responsive. Después podremos animar neón/humo en bucle desde la elegida.

| Opción | Archivo | Estilo |
|--------|---------|--------|
| **A** | `public/media/hero-options/opcion-a-taller-lujo-21x9.png` | Taller premium, BMW en elevador, neón morado/magenta en paredes, vinilos y herramientas |
| **A + luces** | `opcion-a-luces-xenon-v1-21x9.png` · `opcion-a-luces-xenon-v2-21x9.png` | Misma escena A con faros xenon encendidos, DRL, pilotos traseros y underglow morado |
| **B** | `public/media/hero-options/opcion-b-noche-neon-21x9.png` | Garaje nocturno, suelo mojado, underglow neón, humo, vinilo iridiscente |
| **C** | `public/media/hero-options/opcion-c-studio-premium-21x9.png` | Estudio detailing limpio, anillos LED, paredes `#050505`, look comercial |
| **D** | `public/media/hero-options/opcion-d-scifi-garage-21x9.png` | Taller futurista, brazos robóticos, rejilla láser, niebla cinematográfica |

## Vista rápida en dev

Con `pnpm dev`, abre en el navegador:

- http://localhost:3000/media/hero-options/opcion-a-taller-lujo-21x9.png
- http://localhost:3000/media/hero-options/opcion-b-noche-neon-21x9.png
- http://localhost:3000/media/hero-options/opcion-c-studio-premium-21x9.png
- http://localhost:3000/media/hero-options/opcion-d-scifi-garage-21x9.png

## Imagen base UV (4K)

`public/media/hero-options/opcion-a-uv-4k-21x9.png` — faros, intermitentes y frenos en **ultravioleta**.

## Vídeos hero en bucle (Enhanced Seedance 2.0 Fast · **720p nativo** · 21:9 · 5s · sin audio)

> **Modelo obligatorio:** `seedance_2_0` + `mode: "fast"` (UI: Enhanced Seedance 2.0 Fast UNLIMITED) con `"resolution": "720p"`. Promo UNLIMITED ~1 mes. No usar Kling. No escalar 720p→Topaz (blur).

Luces UV dinámicas, coche estático, humo/reflejos animados.

| Vídeo | Archivo | Enfoque |
|-------|---------|---------|
| **1** | `hero-loop-v1-uv-2k-humo.mp4` | Humo + UV pulsante + underglow |
| **2** | `hero-loop-v2-uv-2k-caustics.mp4` | UV dinámico + caustics suelo + humo |
| **3** | `hero-loop-v3-uv-2k-godrays.mp4` | God rays UV + neón paredes |
| **4** | `hero-loop-v4-uv-2k-breathing.mp4` | Niebla + UV “respirando” + specular |

## Corvette ZR1X — ángulo bajo referencia (1080p · 21:9)

Referencia: `corvette-zr1x-angle-reference.png` (3/4 bajo, lado conductor).

Imagen: `corvette-zr1x-lowangle-position-1080p-21x9.png`  
Vídeo bucle: `hero-loop-corvette-zr1x-lowangle-position-1080p.mp4`  
Solo **luces de posición/DRL** (sin cruce, largas ni intermitentes) · xenon circulante · pinzas **negras** · reflejos path tracing.

Versión anterior (faros apagados): `corvette-zr1x-lowangle-1080p-21x9.png` / `hero-loop-corvette-zr1x-lowangle-xenon-chase-1080p.mp4`



Referencia de pose: `corvette-zr1x-reference.png` (3/4 delantero) **espejada** → cámara desde la **otra rueda delantera** (lado pasajero).

Imagen: `public/media/hero-options/corvette-zr1x-landing-mirror-4k-21x9.png`  
Vídeo: `public/media/hero-loops/hero-loop-corvette-zr1x-mirror-uv-2k.mp4`  
Logo Corvette (banderas cruzadas) visible · sin matrícula · luces UV · 5120×2160.

Versión anterior (frontal genérico): `corvette-zr1x-landing-4k-21x9.png` / `hero-loop-corvette-zr1x-landing-uv-2k.mp4`

## Corvette ZR1X — hero derecho (720p nativo · 21:9)

Poster: `corvette-zr1x-hero-right-1080p-21x9.png` (2560×1080)  
Vídeo bucle: `hero-loop-corvette-zr1x-hero-right-uv-720p.mp4`  
Enhanced Seedance 2.0 Fast · resolution 720p · UV xenon · cámara estática.



Vista en dev: `/media/hero-loops/hero-loop-v1-uv-2k-humo.mp4` (etc.)


