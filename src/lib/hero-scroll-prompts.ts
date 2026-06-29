import { frameLock, mediaPipeline } from "./media-pipeline";

const studio =
  "pure black studio background #050505, soft purple rim light, cinematic product lighting, no people, no text, no logos";

export const heroCorvetteWrapScroll = {
  slug: "hero-corvette-wrap-scroll",
  outputVideo: "public/media/desktop/hero-corvette-wrap-scroll.mp4",
  outputVideoMobile: "public/media/mobile/hero-corvette-wrap-scroll.mp4",
  startImagePrompt: `Chevrolet Corvette ZR1X C8, factory metallic red paint, three-quarter front view,
aggressive aero wing, black wheels, ${studio}, photorealistic automotive product shot, 21:9`,
  endImagePrompt: `Chevrolet Corvette ZR1X C8, ${frameLock.endPrefix} full glossy deep purple vinyl wrap installed,
satin gold competition racing stripes on hood and roof, mirror-finish reflections on wrap film, ${studio}, photorealistic, 21:9`,
  videoPrompt: `Cinematic timelapse of premium vinyl wrap being applied to the Corvette ZR1X,
progressive transformation from factory red paint to glossy deep purple full-body wrap
with gold competition stripes appearing on hood and roof, wrap film is the visual hero,
smooth slow motion ideal for scroll scrubbing, ${frameLock.motionSuffix}, ${studio}, silent`,
  scrollWords: ["Vinilo", "Color", "Acabado", "Transformación"] as const,
  labelBefore: "Color fábrica",
  labelAfter: "Wrap instalado",
} as const;

export function buildHeroWrapScrollVideoParams(
  startMediaId: string,
  endMediaId: string,
) {
  return {
    model: mediaPipeline.models.video,
    mode: mediaPipeline.videoParams.mode,
    resolution: mediaPipeline.videoParams.resolution,
    aspect_ratio: mediaPipeline.videoParams.aspect_ratio,
    duration: mediaPipeline.videoParams.duration,
    generate_audio: false,
    prompt: heroCorvetteWrapScroll.videoPrompt,
    medias: [
      { role: mediaPipeline.videoRoles.start, value: startMediaId },
      { role: mediaPipeline.videoRoles.end, value: endMediaId },
    ],
  };
}
