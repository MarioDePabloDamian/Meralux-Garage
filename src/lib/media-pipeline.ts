/**
 * Modelos, rutas y parámetros de vídeo para hero + servicios.
 * Ver docs/video-workflow.md
 *
 * Vídeo: Seedance 2.0 Fast (`seedance_2_0` + `mode: "fast"`) · 720p · sin audio.
 */
export const seedanceEnhancedFast = {
  model: "seedance_2_0",
  mode: "fast",
  resolution: "720p",
} as const;

/**
 * Regla de encuadre: START y END deben ser la misma toma (misma pose, ángulo, crop).
 * Solo cambia el estado (pintura, wrap, tintado…). Ver docs/video-workflow.md
 */
export const frameLock = {
  endPrefix:
    "Exact same photograph as the start frame, identical car pose, wheel angle, camera position, lens, crop and studio lighting, only change:",
  motionSuffix:
    "camera locked static, no pan zoom or cut, same framing from first to last frame",
} as const;

/** Slugs con vídeo en public/media/services/{slug}.mp4 */
export const serviceVideoSlugs = [
  "wrapping-integral",
  "wrapping-parcial",
  "ppf",
  "custom-color",
  "vinilado-llantas",
  "tintado-lunas",
] as const;

export const mediaPipeline = {
  backgroundColor: "#050505",
  models: {
    image: "nano_banana_pro",
    video: seedanceEnhancedFast.model,
    imageDraft: "nano_banana",
  },
  videoParams: {
    model: seedanceEnhancedFast.model,
    mode: seedanceEnhancedFast.mode,
    resolution: seedanceEnhancedFast.resolution,
    aspect_ratio: "21:9",
    duration: 5,
    generate_audio: false,
  },
  serviceScroll: {
    image: "nano_banana",
    video: seedanceEnhancedFast.model,
    mode: seedanceEnhancedFast.mode,
    resolution: seedanceEnhancedFast.resolution,
    aspectRatio: "16:9",
    duration: 5,
    generate_audio: false,
  },
  videoRoles: {
    start: "start_image",
    end: "end_image",
  },
  heroVideo: {
    desktop: "public/media/desktop/hero-corvette-wrap-scroll.mp4",
    mobile: "public/media/mobile/hero-corvette-wrap-scroll.mp4",
  },
  scrollTrackVh: 400,
} as const;

/** Rutas web (`/media/...`) para verify-media */
export function getExpectedMediaPaths(): string[] {
  return [
    "/media/desktop/hero-corvette-wrap-scroll.mp4",
    "/media/mobile/hero-corvette-wrap-scroll.mp4",
    ...serviceVideoSlugs.map((slug) => `/media/services/${slug}.mp4`),
  ];
}
