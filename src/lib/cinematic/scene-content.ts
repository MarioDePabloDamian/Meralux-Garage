import { site } from "@/lib/site-data";
import type { SceneId } from "@/lib/cinematic/types";

export type SceneContent = {
  eyebrow?: string;
  title: string;
  description?: string;
  items?: string[];
  align?: "left" | "center" | "right";
};

export const SCENE_CONTENT: Record<SceneId, SceneContent> = {
  arrival: {
    eyebrow: site.tagline,
    title: "Meralux Garage",
    description: "Vinilado que brilla. Diseñado contigo.",
    items: [site.city.split(",")[1]?.trim() ?? "Madrid", "Taller boutique"],
    align: "left",
  },
  discovery: {
    eyebrow: "Descubrimiento",
    title: "Transformación exterior con precisión de taller boutique.",
    description:
      "Vista frontal: cada línea del coche cuenta antes del primer vinilo.",
    align: "left",
  },
  details: {
    eyebrow: "Detalles",
    title: "Cada superficie cuenta.",
    description:
      "Acercamiento al perfil delantero: faros, llantas y líneas de carrocería bajo la luz del taller.",
    items: ["Faros", "Llantas", "Líneas de carrocería", "Interior"],
    align: "left",
  },
  craftsmanship: {
    eyebrow: "Oficio",
    title: site.award,
    description:
      "Perfil lateral completo: seis servicios, un mismo estándar de acabado.",
    items: site.services.map((s) => s.title),
    align: "left",
  },
  process: {
    eyebrow: "Proceso",
    title: "De la idea a la entrega.",
    description:
      "Trasera en tres cuartos: cuatro pasos claros, sin sorpresas.",
    items: site.process.map((p) => `${p.step} · ${p.title}`),
    align: "left",
  },
  transformation: {
    eyebrow: "Transformación",
    title: "Tu coche, reinventado.",
    description:
      "Vista trasera: spoiler, difusor y wrap premium que reaccionan a la luz como en la calle.",
    align: "center",
  },
  finale: {
    eyebrow: "Contacto",
    title: "¿Listo para transformar tu coche?",
    description: "Cuéntanos tu idea y te preparamos un presupuesto sin compromiso.",
    align: "left",
  },
};

export const FINALE_REVIEWS = site.reviews.slice(0, 3);
export const FINALE_HOURS = site.hours;
