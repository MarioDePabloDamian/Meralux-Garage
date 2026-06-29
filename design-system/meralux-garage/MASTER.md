# Design System — Meralux Garage

> **LOGIC:** Page overrides live in `design-system/pages/[page].md`. Otherwise follow this file.

**Project:** Meralux Garage  
**Stack:** Next.js 16, Tailwind 4, motion/react, Lucide icons

---

## Brand (override generated palette)

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#050505` | Page base |
| Surface | `#0a0a0a` – `#111` | Sections, cards |
| Primary accent | `#a855f7` | CTAs, icons, beams |
| Secondary accent | `#7c3aed` | Borders, hover |
| Text primary | `#fafafa` | Headings |
| Text muted | `#a1a1aa` | Body (min contrast on dark) |

**Do not** use light `#F8FAFC` cards on landing — dark glass only.

---

## Landing patterns

- **Sin fotos ni vídeos** — solo logo; hero con SVG + glass + Light Pillar; servicios en **Bento Grid**
- **Bento Grid Showcase** — scannable services, Lucide icons, border-beam, no emoji
- **CTAs** — hero + after services + after reviews + contact; `ShimmerButton` primary
- **Social proof** — rating before final CTA
- **Motion** — respect `prefers-reduced-motion`; no layout-shifting scale on hover

---

## Components

- **SectionHeader** — eyebrow + display title + optional lead
- **Hero** — una columna: titular, lead, CTAs, pills de confianza (sin configurador ni ilustraciones)
- **BentoCard** — glass surface, icon badge, category pill, link to contact
- **CtaBanner** — full-width conversion strip between sections
- **ProcessCard / ReviewCard** — cohesive glass + purple accent

---

## Anti-patterns

- ❌ Emojis as icons  
- ❌ `bg-white/[0.03]` alone as “premium” (too flat)  
- ❌ Tiny gradient bars as sole accent  
- ❌ Hero text background panels  
- ❌ Hover scale that shifts layout  
