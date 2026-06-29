/**
 * Prompts Higgsfield para vídeos de scroll por servicio.
 * Modelo: nano_banana (start/end frame) + seedance_2_0 + mode fast (vídeo UNLIMITED).
 * Ver docs/video-workflow.md
 */
import { frameLock, mediaPipeline } from "./media-pipeline";

export const serviceScrollModels = mediaPipeline.serviceScroll;

export type ServiceScrollPrompt = {
  slug: string;
  /** Frame inicial (estado "antes") — generate_image con nano_banana */
  imagePrompt: string;
  /** Frame final (estado "después") — generate_image con nano_banana */
  endImagePrompt: string;
  /** Motion prompt — generate_video con start_image + end_image */
  videoPrompt: string;
};

export type ServiceScrollMediaRole = "start_image" | "end_image";

export type ServiceScrollImageParams = {
  model: string;
  aspect_ratio: string;
  prompt: string;
};

/** Parámetros MCP generate_image para start o end frame de un servicio. */
export function buildServiceScrollImageParams(
  entry: ServiceScrollPrompt,
  frame: "start" | "end",
): ServiceScrollImageParams {
  const { image, aspectRatio } = serviceScrollModels;
  return {
    model: image,
    aspect_ratio: aspectRatio,
    prompt: frame === "start" ? entry.imagePrompt : entry.endImagePrompt,
  };
}

export type ServiceScrollVideoParams = {
  model: string;
  mode?: string;
  resolution: string;
  aspect_ratio: string;
  duration: number;
  prompt: string;
  medias: Array<{ role: ServiceScrollMediaRole; value: string }>;
};

/** Parámetros MCP generate_video para un servicio (tras importar start/end con media_import_url). */
export function buildServiceScrollVideoParams(
  entry: ServiceScrollPrompt,
  startMediaId: string,
  endMediaId: string,
): ServiceScrollVideoParams {
  const { video, mode, resolution, aspectRatio, duration } = serviceScrollModels;
  return {
    model: video,
    mode,
    resolution,
    aspect_ratio: aspectRatio,
    duration,
    prompt: entry.videoPrompt,
    medias: [
      { role: "start_image", value: startMediaId },
      { role: "end_image", value: endMediaId },
    ],
  };
}

const studio =
  "premium automotive studio, pure black floor and background #050505, soft purple rim light, photorealistic product photography, no text, no logos, no people";

export const serviceScrollPrompts: ServiceScrollPrompt[] = [
  {
    slug: "wrapping-integral",
    imagePrompt: `Sports sedan three-quarter front view, factory silver paint, ${studio}`,
    endImagePrompt: `Sports sedan three-quarter front view, ${frameLock.endPrefix} glossy deep purple vinyl wrap fully applied, ${studio}`,
    videoPrompt:
      `Smooth cinematic transition from factory silver paint to glossy deep purple full-body vinyl wrap, slow progressive motion ideal for scroll scrubbing, ${frameLock.motionSuffix}, black studio #050505, no people, no text, silent loop`,
  },
  {
    slug: "wrapping-parcial",
    imagePrompt: `Black sports coupe three-quarter front view, factory paint, roof and mirrors unpainted, ${studio}`,
    endImagePrompt: `Black sports coupe three-quarter front view, ${frameLock.endPrefix} satin black vinyl on roof and side mirrors only, rest unchanged, ${studio}`,
    videoPrompt:
      `Smooth timelapse applying satin black vinyl to roof and mirrors only, car body otherwise unchanged, slow scrub-friendly motion, ${frameLock.motionSuffix}, black studio #050505, no people, no text, silent loop`,
  },
  {
    slug: "ppf",
    imagePrompt: `Luxury sedan front three-quarter view, glossy factory paint, hood and bumper unprotected, ${studio}`,
    endImagePrompt: `Luxury sedan front three-quarter view, ${frameLock.endPrefix} transparent PPF film on hood and front bumper with subtle gloss shift, ${studio}`,
    videoPrompt:
      `Slow motion transparent protective film spreading across hood and front bumper, subtle gloss increase, progressive change for scroll scrubbing, ${frameLock.motionSuffix}, black studio #050505, no people, no text, silent loop`,
  },
  {
    slug: "custom-color",
    imagePrompt: `Sports car three-quarter view, neutral gray factory paint, ${studio}`,
    endImagePrompt: `Sports car three-quarter view, ${frameLock.endPrefix} iridescent purple-blue custom paint finish, ${studio}`,
    videoPrompt:
      `Car paint morphs smoothly from neutral gray to iridescent purple-blue custom finish, slow cinematic motion suited to scroll scrubbing, ${frameLock.motionSuffix}, black studio #050505, no text, no people, silent loop`,
  },
  {
    slug: "vinilado-llantas",
    imagePrompt: `Close three-quarter view of performance car, silver alloy wheels, ${studio}`,
    endImagePrompt: `Close three-quarter view of performance car, ${frameLock.endPrefix} matte black vinyl wrap on alloy wheels, ${studio}`,
    videoPrompt:
      `Matte black vinyl wrap applied smoothly onto alloy wheels with subtle rotation feel, slow progressive motion for scroll scrubbing, ${frameLock.motionSuffix}, black studio #050505, no people, no text, silent loop`,
  },
  {
    slug: "tintado-lunas",
    imagePrompt: `Sedan side profile, clear untinted glass windows, ${studio}`,
    endImagePrompt: `Sedan side profile, ${frameLock.endPrefix} uniformly dark legal window tint on all side glass, ${studio}`,
    videoPrompt:
      `Side windows gradually darken with uniform legal window tint, smooth progressive change ideal for scroll scrubbing, ${frameLock.motionSuffix}, black studio #050505, no people, no text, silent loop`,
  },
];
