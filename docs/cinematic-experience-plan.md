# MERALUX GARAGE — Plan de Experiencia Cinematográfica 3D

Documento de dirección creativa, arquitectura técnica y **orden de ejecución**.

**Versión:** 1.1  
**Fecha:** Junio 2026  
**Dominio:** [meralux.mariodepablo.es](https://meralux.mariodepablo.es)  
**Stack actual:** Next.js 16 · React 19 · Three.js · Motion · Tailwind 4 · Blender MCP  
**Modo de ejecución:** Una sola iteración — el plan completo se implementa de principio a fin sin repartir en sprints ni entregas parciales.

---

## 1. Objetivo del proyecto

No construir una landing tradicional de taller.

Construir una **experiencia cinematográfica interactiva** donde el scroll es la línea de tiempo de una película sobre **transformación exterior**.

| Principio | Descripción |
|-----------|-------------|
| Protagonista | El coche 3D (Supra MK4 u otro vehículo icónico) como **canvas**, no como producto de marca |
| Narrativa | Meralux no vende coches; vende **wrap, PPF y acabado impecable** |
| Sensación | Apple Launch × Porsche Digital × reveal de wrap premium |
| Límites | Elegante, premium, minimal. Nunca abrumador, caótico ni flashy sin propósito |
| Conversión | Presupuesto · Llamada · Visita Nave 57, Rivas-Vaciamadrid |

---

## 2. Contexto de marca

Fuente de verdad: `src/lib/site-data.ts` · `docs/informacion-negocio.md`

| Elemento | Valor |
|----------|-------|
| Nombre | Meralux Garage |
| Tagline | Car Wrapping & PPF Madrid |
| Propuesta | *Vinilado que brilla. Diseñado contigo.* |
| Ubicación | C. el Electrodo, 66, Nave 57 · 28522 Rivas-Vaciamadrid |
| Teléfono | +34 711 20 78 63 |
| Instagram | [@meraluxgarage](https://www.instagram.com/meraluxgarage/) |
| Rating | 5.0 Google |
| Premio | 4.º World Wrap Masters España 2026 |

### Servicios a integrar en la narrativa

1. **Wrapping integral** — mate, satinado, brillo, cromo, carbono  
2. **Wrapping parcial** — techo, capó, retrovisores, franjas, acentos  
3. **PPF** — protección transparente  
4. **Custom color** — color único definido antes de instalar  
5. **Vinilado de llantas**  
6. **Tintado de lunas**

### Proceso Meralux (4 pasos)

1. Consulta → 2. Diseño → 3. Instalación → 4. Entrega

---

## 3. Experiencia global

La página **no debe sentirse como secciones separadas**.

Una sola secuencia cinematográfica continua. El usuario **nunca abandona el entorno 3D**. El HTML aparece **dentro de la historia**.

Conexión entre capítulos mediante:

- Movimiento de cámara (splines, no orbit controls)
- Iluminación (estudio → nave → exterior)
- Entorno (vacío → taller → golden hour Madrid)
- Materiales (pintura original → vinilo → reveal)
- Tipografía editorial (Syne + Montserrat)
- Motion design morado/negro Meralux

**Reglas de transición**

- Invisibles · sin saltos · sin apariciones bruscas  
- Todo funde naturalmente en la escena siguiente  

---

## 4. Viaje emocional

```
Curiosidad       →  “¿Qué es esto?”
     ↓
Descubrimiento   →  “No es un taller cualquiera”
     ↓
Admiración       →  “Qué precisión tiene el acabado”
     ↓
Excitación       →  “Quiero ver la transformación”
     ↓
Confianza        →  “Son profesionales de verdad”
     ↓
Deseo            →  “Quiero eso en mi coche”
     ↓
Conversión       →  Presupuesto · Llamada · Visita
```

---

## 5. Mapa de escenas (scroll = timeline)

Scroll total estimado: **~600–800vh** (pinned + scrub).  
Hero actual (100vh) se sustituye por **track cinematográfico**.

| Scroll % | Escena | ID | Contenido negocio |
|----------|--------|-----|-------------------|
| 0–12 | Llegada | `arrival` | Marca, tagline, vehículo en sombras |
| 12–25 | Descubrimiento | `discovery` | Propuesta boutique, acercamiento cámara |
| 25–40 | Detalles | `details` | Close-ups: faros, llantas, líneas, interior |
| 40–55 | Oficio | `craftsmanship` | 6 servicios Meralux vinculados a materiales |
| 55–68 | Proceso | `process` | 4 pasos consulta → entrega |
| 68–85 | Transformación | `transformation` | Pintura original → wrap → reveal |
| 85–100 | Finale | `finale` | CTA, reseñas, contacto, mapa |

---

## 6. Dirección por escena

### Escena 1 — Llegada (0–12%)

- Web casi oscura; solo reflejos revelan capó, faros, parachoques, llanta, perfil  
- Entorno infinito, suelo glossy sutil, partículas mínimas  
- Rotación del coche extremadamente lenta  
- Cámara: casi estática, drift mínimo, breathing  
- Ratón: parallax 3–5° máx.; **sin rotación directa del modelo**  
- Luz: estudio oscuro, rim morado Meralux sutil, bloom mínimo  
- Copy: tagline + *Vinilado que brilla. Diseñado contigo.* + Rivas-Vaciamadrid  

### Escena 2 — Descubrimiento (12–25%)

- Primer scroll inicia la historia  
- Cámara se acerca con easing cinematográfico  
- Reflejos recorren pintura original  
- Órbita lenta; líneas del bodykit emergen  
- Fondo evoluciona: vacío → sombra de nave industrial  
- Copy: *Transformación exterior con precisión de taller boutique.*  

### Escena 3 — Detalles (25–40%)

Secuencia de close-ups (spline, nunca teleport):

```
Faros → Llanta/pinza → Retrovisor → Junta de panel →
Alerón → Pilotos traseros → Interior (volante/cuero)
```

- DOF suave solo en primeros planos  
- Narrativa: superficie preparada para el vinilo  

### Escena 4 — Oficio (40–55%)

- Cámara desacelera; calidad de material  
- Reflejos sobre metal, cristal, carbono, cuero, cromo  

| Momento visual | Servicio |
|----------------|----------|
| Carrocería completa | Wrapping integral |
| Techo / capó / retrovisores | Wrapping parcial |
| Capa invisible sobre pintura | PPF |
| Paleta en transición | Custom color |
| Llanta en primer plano | Vinilado de llantas |
| Cristal oscureciéndose | Tintado de lunas |

- Micro-animaciones: polvo, niebla sutil, HDRI animado  
- Copy overlay: *4.º World Wrap Masters España 2026*  

### Escena 5 — Proceso (55–68%)

- Ritmo más dinámico pero premium (timelapse de taller, no carreras)  
- Órbita con más energía; micro-movimientos de suspensión y rueda  
- Timeline sincronizado con cámara: Consulta → Diseño → Instalación → Entrega  

### Escena 6 — Transformación (68–85%)

**Capítulo central del negocio.**

Entorno:

```
Estudio oscuro → Nave Meralux → Amanecer →
Arquitectura Madrid → Exterior premium
```

Vehículo:

```
Pintura original → Transición de vinilo (timelapse abstracto) →
Wrap / acabado elegido → Detalles (franjas, acentos) →
Resultado bajo luz cálida
```

Referencia emocional: reveals de @meraluxgarage en Instagram.

### Escena 7 — Finale (85–100%)

- Cámara retrocede; composición hero completa  
- CTA: *¿Listo para transformar tu coche?* · Presupuesto · Teléfono  
- Trust: 5.0 Google · reseñas · horario · Maps · Instagram  
- Desaceleración total; frame digno de poster  

---

## 7. Dirección técnica transversal

### Cámara

- Comportamiento de cámara de cine, no demo 3D  
- Spline paths · interpolación suave · ease in-out  
- Handheld y breathing mínimos  
- Nunca snap · nunca teleport  

### Iluminación

- Físicamente correcta: HDRI, area lights, sombras suaves  
- ACES tone mapping · bloom mínimo  
- Rim morado Meralux como acento (nunca neón)  
- Sensación: foto de estudio + nave real  

### Ratón

- Parallax de cámara/luz/profundidad únicamente  
- Máximo 3–5°  

### Scroll

- GSAP ScrollTrigger · secciones pinned · scrub  
- Animaciones ligadas a `scrollProgress`  
- Sin saltos de layout  

### Tipografía

- Syne (display) · Montserrat (body)  
- Grande, minimal, mucho whitespace  
- Fade lento; texto parte del entorno  

### Paleta

| Token | Valor |
|-------|-------|
| Fondo | `#050505` |
| Acento | `#7c3aed` → `#a855f7` |
| Texto | Blanco · zinc-300 |
| Premium | Plata · dorado sutil (estrellas, premios) |

### Sonido (opcional)

- Ambiente sutil, muted por defecto  
- Toggle visible · respetar accesibilidad  
- Incluir en la misma iteración si el tiempo lo permite; si no, dejar hook preparado  

---

## 8. Arquitectura de código (objetivo)

```
src/
  app/
    _components/
      cinematic/
        MeraluxCinematicExperience.tsx   # Orquestador principal
        CinematicCanvas.tsx              # R3F canvas full-viewport
        CinematicOverlay.tsx             # HTML tipografía sobre 3D
        CinematicCTA.tsx                 # Finale + conversión
        scenes/
          arrival-scene.ts
          discovery-scene.ts
          details-scene.ts
          craftsmanship-scene.ts
          process-scene.ts
          transformation-scene.ts
          finale-scene.ts
        rigs/
          camera-rig.ts                  # Splines + scroll binding
          lighting-rig.ts                # HDRI + rim morado
          material-controller.ts         # Wrap transition / PPF
        ui/
          scroll-progress.tsx
          scene-caption.tsx
          service-caption.tsx
  lib/
    cinematic/
      scroll-timeline.ts                 # Mapa scroll % → escena
      scene-config.ts                    # Keyframes por escena
      easing.ts
    site-data.ts                         # Copy Meralux (fuente única)
public/
  models/
    hero-car.glb                         # Supra MK4 (actual)
    hero-car-draco.glb                   # Objetivo comprimido
  hdri/
    studio-dark.hdr
    workshop.hdr
    golden-hour.hdr
docs/
  cinematic-experience-plan.md           # Este documento
```

### Separación de responsabilidades

| Capa | Responsabilidad |
|------|-----------------|
| `scroll-timeline.ts` | Progreso global, cambio de escena |
| `camera-rig.ts` | Posición/rotación cámara por progress |
| `lighting-rig.ts` | HDRI, luces, rim morado |
| `material-controller.ts` | Transición pintura → wrap |
| `CinematicOverlay.tsx` | Copy HTML sincronizado |
| `site-data.ts` | Textos, servicios, contacto |

---

## 9. Stack técnico

### Añadir (planificado)

| Paquete | Uso |
|---------|-----|
| `@react-three/fiber` | Canvas React + Three.js |
| `@react-three/drei` | Orbit alternativo, Environment, ScrollControls helpers |
| `gsap` + `@gsap/react` | ScrollTrigger, scrub, timeline |
| `@react-three/postprocessing` | Bloom mínimo, DOF selectivo (opcional) |

### Mantener

- Three.js (ya en proyecto vía hero-car-3d)  
- Motion/react (UI overlays, no scroll 3D)  
- Blender MCP (preparación GLB, materiales)  
- Tailwind 4 + tokens morado/negro actuales  

### Assets 3D

| Asset | Estado | Notas |
|-------|--------|-------|
| `toyota_supra_mk4.glb` | ✅ En uso | ~11 MB, 142 mallas, color original |
| Versión Draco | 🔲 Pendiente | Objetivo < 8 MB |
| LOD / sin interior móvil | 🔲 Pendiente | Reducir draw calls en móvil |
| HDRI set | 🔲 Pendiente | 3 entornos mínimo |

---

## 10. Rendimiento y accesibilidad

### Objetivos

| Plataforma | FPS | Notas |
|------------|-----|-------|
| Desktop | 60 | Post-processing selectivo |
| Móvil | 30 estable | DPR cap 1.25, sin interior 3D, menos partículas |

### Optimizaciones

- Draco compression · KTX2 texturas  
- Lazy load del scene graph  
- Frustum culling · LOD  
- `prefers-reduced-motion`: hero estático + landing scroll normal sin pin  
- Fallback sin WebGL: imagen poster + copy + CTA  

---

## 11. Orden de ejecución (una sola iteración)

Checklist secuencial. Cada paso se completa antes de pasar al siguiente. **No hay entregas parciales:** al terminar la lista, la experiencia está completa y production-ready.

### A — Setup y assets

- [x] Instalar `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`  
- [ ] Comprimir GLB con Draco (`gltf.report` o Blender MCP) → `hero-car-draco.glb` *(pendiente: usa `hero-car.glb` actual)*  
- [x] Preparar HDRI mínimo: estudio oscuro, taller, golden hour (o RoomEnvironment + gradientes si no hay HDR)  
- [x] Definir keyframes de cámara para las 7 escenas (`scene-config.ts` + splines en `camera-rig.ts`)  

### B — Infraestructura cinematográfica

- [x] Crear estructura `src/app/_components/cinematic/` según §8  
- [x] `scroll-timeline.ts` — mapa scroll % → escena activa  
- [x] `MeraluxCinematicExperience` — orquestador; reemplaza hero + landing scroll clásico  
- [x] `CinematicCanvas` — canvas R3F full-viewport, persistente, no desmontar entre escenas  
- [x] ScrollTrigger pinned (~700vh) + scrub en todo el track  
- [x] `camera-rig.ts` + `lighting-rig.ts` — binding scroll → cámara + HDRI + rim morado  
- [x] `CinematicOverlay` — tipografía HTML sincronizada con progress  
- [x] Navbar fija compatible con pin  

### C — Las 7 escenas (scroll 0–100%)

- [x] **Escena 1 — Llegada:** oscuridad, reflejos, copy marca, parallax mínimo  
- [x] **Escena 2 — Descubrimiento:** acercamiento cámara, órbita lenta, propuesta boutique  
- [x] **Escena 3 — Detalles:** secuencia close-ups (faros → llanta → retrovisor → alerón → interior)  
- [x] **Escena 4 — Oficio:** 6 servicios Meralux vinculados a materiales + premio WWM  
- [x] **Escena 5 — Proceso:** 4 pasos (consulta → diseño → instalación → entrega)  
- [x] **Escena 6 — Transformación:** `material-controller` pintura original → wrap + evolución entorno  
- [x] **Escena 7 — Finale:** pull-back hero, CTA, reseñas, contacto, mapa, teléfono  

### D — Integración negocio

- [x] Todo el copy desde `site-data.ts` (servicios, proceso, reseñas, horario, contacto)  
- [x] Eliminar o absorber componentes legacy: `hero-section`, `hero-car-3d`, `services-showcase`, secciones sueltas de `landing-page`  
- [x] Mantener `globals.css` tokens morado/negro  

### E — Polish, rendimiento y accesibilidad

- [x] Microinteracciones CTA (shimmer, hover luz)  
- [x] Mobile: DPR cap, menos partículas, ocultar interior 3D si hace falta  
- [x] `prefers-reduced-motion`: experiencia estática + scroll sin pin  
- [x] Fallback sin WebGL: poster + copy + CTA  
- [ ] Post-processing mínimo (bloom/DOF solo donde aporte)  
- [ ] Verificar ≥ 60 FPS desktop · ≥ 30 FPS móvil mid-range *(requiere prueba en navegador)*  
- [x] `pnpm build` sin errores  

### F — Opcional en la misma iteración (si cabe)

- [ ] Sonido ambiente muted por defecto + toggle  
- [ ] `@react-three/postprocessing` DOF en close-ups  

**Resultado final:** landing = una sola experiencia cinematográfica continua. Sin secciones clásicas debajo.

---

## 12. Criterios de éxito

| Criterio | Medida |
|----------|--------|
| Inmersión | Usuario no percibe “secciones”, percibe una película |
| Marca | Identidad morado/negro Meralux coherente en 3D y UI |
| Negocio | Los 6 servicios y 4 pasos son comprensibles sin grid tradicional |
| Conversión | CTA visible en finale; teléfono y presupuesto accesibles |
| Rendimiento | ≥ 60 FPS desktop · ≥ 30 FPS móvil mid-range |
| Accesibilidad | Reduced motion funcional · fallback sin WebGL |

---

## 13. Referencias de tono (no copiar)

- Apple Product Launch — claridad  
- Porsche / Polestar digital — cinematografía automotriz  
- Tesla reveal — momento de transformación  
- @meraluxgarage Instagram — resultado real del taller  
- World Wrap Masters — credibilidad de oficio  

---

## 14. Decisiones cerradas para la iteración

| # | Decisión | Resolución |
|---|----------|------------|
| 1 | Alcance landing | **Full cinematic** — toda la página es el film; finale = contacto/conversión |
| 2 | Wrap escena 6 | **Transición fija** pintura original → reveal (morado Meralux o acabado elegido) |
| 3 | Scroll 3D | **GSAP ScrollTrigger** — scrub preciso del timeline |
| 4 | Renderer | **React Three Fiber** — migrar desde Three.js vanilla del hero actual |
| 5 | Sonido | **Opcional** — muted default; incluir si cabe en la iteración |

---

## 15. Relación con código actual

| Archivo actual | Destino en plan |
|----------------|-----------------|
| `hero-section.tsx` | Sustituido por `MeraluxCinematicExperience` |
| `hero-car-3d.tsx` | Lógica migrada a `CinematicCanvas` + rigs |
| `services-showcase.tsx` | Contenido absorbido en escena 4 (oficio) |
| `landing-page.tsx` secciones | Proceso → escena 5; reseñas/contacto → escena 7 |
| `scroll-effects.tsx` | Overlays UI; scroll 3D pasa a GSAP |
| `globals.css` tokens morado | Se mantienen |

---

*Este plan es la especificación de ejecución. Se implementa íntegramente en una sola iteración.*
