# Vídeos Meralux — flujo único

Canvas: [Meralux Garage](https://higgsfield.ai/canvas/65628483-977d-48a2-93cb-a95a9f902005)

### Estructura limpia del Canvas

Solo deben quedar **2 carpetas**:

| Carpeta | Contenido |
|---------|-----------|
| **HERO** | 1 pipeline 21:9 → `hero-corvette-wrap-scroll.mp4` |
| **SERVICIOS** | 6 subgrafos 16:9 (un slug cada uno) |

**Purga manual** (Higgsie no puede borrar nodos):

1. Selecciona el HERO suelto/duplicado de la izquierda → `Delete node`
2. Selecciona la carpeta **SERVICIOS** vieja (prompts genéricos) → `Delete node`
3. Conserva el grupo **HERO + SERVICIOS — Fixed Prompts** (o el HERO/SERVICIOS actuales tras aplicar)
4. `Return to content` → **Fit** en cada carpeta

**Sincronizar prompts desde el repo** (tras cambiar TS):

```bash
pnpm sync-canvas-prompts    # genera docs/canvas-prompts.txt
```

Copia los textos **PROMPTS EXACTOS** en cada nodo Prompt del Canvas.

---

## Qué hace el flujo

Generas un MP4 **antes → después** (wrap, PPF, tintado…) y la web lo usa de dos formas:

| Destino | Ratio | Comportamiento en web |
|---------|-------|------------------------|
| **Hero** Corvette | 21:9 | Scroll **scrub** — el vídeo no reproduce, avanza con el scroll |
| **Servicios** (×6) | 16:9 | **Bucle** cuando la sección entra en pantalla |

### Grafo en Canvas (siempre igual)

```
Upload → Prompt START → Image START ─┐
       → Prompt END   → Image END   ─┼→ Video (Seedance 2.0 Fast) → MP4
              Prompt MOTION ──────────┘
```

| Nodo | Hero | Servicios |
|------|------|-----------|
| Imagen | Nano Banana **Pro** | Nano Banana |
| Ratio | 21:9 | 16:9 |
| Vídeo | Seedance 2.0 **Fast** · 720p · 5 s · sin audio | Igual |

**Regla:** START = estado inicial (pintura fábrica en hero, no wrap). MOTION = el **wrap/film** es el protagonista. Cámara estática, movimiento lento.

### Misma foto en START y END (obligatorio)

El **primer y último frame del vídeo deben ser la misma toma**: misma pose del coche, mismo ángulo, mismo encuadre y misma luz. Solo cambia el estado (pintura → wrap, cristal claro → tintado, etc.).

| Paso | Qué hacer |
|------|-----------|
| **Prompt END** | Incluye `Exact same photograph as the start frame… only change:` (constante `frameLock` en `media-pipeline.ts`) |
| **Prompt MOTION** | Cámara bloqueada: `same framing from first to last frame` |
| **Canvas — Image END** | Conecta **imgSTART** como referencia de pose/encuadre al nodo Image Gen de END (ademá del Upload si aplica) |

Si START y END no coinciden, el scroll scrub del hero y los bucles de servicios se ven a saltos.

---

## Cómo usarlo (4 pasos)

### 1. Editar prompts (si hace falta)

Fuente de verdad en código:

- Hero → `src/lib/hero-scroll-prompts.ts`
- Servicios → `src/lib/service-scroll-prompts.ts`
- Modelos y rutas → `src/lib/media-pipeline.ts`

### 2. Sincronizar textos para Canvas

```bash
pnpm sync-canvas-prompts
```

Genera `docs/canvas-prompts.txt` — copia los bloques **PROMPTS EXACTOS** en los nodos Prompt del Canvas (Higgsie suele equivocarse en START y ratio).

### 3. Generar en Canvas

1. Abre el canvas → carpeta **HERO** o subgrafo de **SERVICIOS**
2. Sube foto en **Upload**
3. **Run all** (imgSTART → imgEND → video)
4. Descarga MP4 y colócalo en:

| Vídeo | Ruta en repo |
|-------|----------------|
| Hero desktop | `public/media/desktop/hero-corvette-wrap-scroll.mp4` |
| Hero móvil | `public/media/mobile/hero-corvette-wrap-scroll.mp4` (mismo archivo o recorte) |
| Servicio | `public/media/services/{slug}.mp4` |

Slugs: `wrapping-integral`, `wrapping-parcial`, `ppf`, `custom-color`, `vinilado-llantas`, `tintado-lunas`

### 4. Comprobar

```bash
pnpm verify-media   # qué MP4 faltan
pnpm dev            # scroll en hero + bucles en servicios
```

---

## Comandos

| Comando | Qué hace |
|---------|----------|
| `pnpm sync-canvas-prompts` | TS → `docs/canvas-prompts.txt` |
| `pnpm verify-media` | Lista MP4 esperados vs `public/` |
| `pnpm dev` | Probar landing |

---

## Archivos que importan

```
src/lib/hero-scroll-prompts.ts      # prompts hero
src/lib/service-scroll-prompts.ts   # prompts servicios
src/lib/media-pipeline.ts           # modelos, scrollTrackVh, rutas
docs/canvas-prompts.txt             # generado — no editar a mano
src/app/_components/landing/scroll-effects.tsx   # HeroScrollSection (scrub)
src/app/_components/landing/service-scroll-showcase.tsx  # bucles servicios
```

---

## Canvas vs MCP (Cursor)

Mismo resultado: `nano_banana(_pro)` → `seedance_2_0` + `mode: "fast"`.  
Canvas para iterar visualmente; MCP para repetir desde el repo sin abrir el navegador.

Helpers MCP: `buildHeroWrapScrollVideoParams()`, `buildServiceScrollVideoParams()` en los archivos de prompts.
