import { clamp01, easeInOutCubic, lerp, smoothstep } from "./easing";
import { DISCOVERY_SCENE_START } from "./scroll-timeline";

export type RevealState = {
  carOpacity: number;
  carScale: number;
  carLiftY: number;
  carVisible: boolean;
  landingT: number;
  landingComplete: boolean;
  cameraDockT: number;
  cameraDockComplete: boolean;
};

/** Intro = sección Descubrimiento: cámara + coche a la vez */
export const INTRO_START = DISCOVERY_SCENE_START;

/** Fin del gesto cinematográfico (~7.5% del track) */
export const INTRO_END_PROGRESS = 0.075;

export const CAR_LANDING_END_PROGRESS = INTRO_END_PROGRESS;

const DESCENT_HEIGHT = 18;
const CAMERA_END = 0.62;

/** Techo de opacidad tras el aviso inicial (antes del descenso del coche) */
const SCROLL_TEASE_PEAK = 0.34;

export function sampleIntroT(progress: number): number {
  const p = clamp01(progress);
  if (p <= INTRO_START) return 0;
  if (p >= INTRO_END_PROGRESS) return 1;
  const linear = (p - INTRO_START) / (INTRO_END_PROGRESS - INTRO_START);
  return smoothstep(0, 1, linear);
}

export function sampleCameraDockT(progress: number): number {
  const introT = sampleIntroT(progress);
  if (introT <= 0) return 0;
  return smoothstep(0, 1, introT / CAMERA_END);
}

export function sampleReveal(progress: number): RevealState {
  const p = clamp01(progress);
  const introT = sampleIntroT(p);
  const cameraDockT = sampleCameraDockT(p);
  const cameraDockComplete = introT >= CAMERA_END;

  if (introT <= 0) {
    return {
      carOpacity: 0,
      carScale: 1,
      carLiftY: 0,
      carVisible: false,
      landingT: 0,
      landingComplete: false,
      cameraDockT: 0,
      cameraDockComplete: false,
    };
  }

  const carT = smoothstep(0, 1, introT);
  const descent = easeInOutCubic(carT);

  return {
    carOpacity: smoothstep(0.04, 0.38, carT),
    carScale: lerp(1.06, 1, easeInOutCubic(carT)),
    carLiftY: lerp(DESCENT_HEIGHT, 0, descent),
    carVisible: true,
    landingT: carT,
    landingComplete: introT >= 1,
    cameraDockT,
    cameraDockComplete,
  };
}

export function sampleRevealOpacity(progress: number): number {
  return sampleReveal(progress).carOpacity;
}

/**
 * Curva única y monótona para textos discovery:
 * 0 → aviso con scroll → continúa con descenso → 1 al aterrizar.
 * Nunca baja al cambiar de fase tease/descenso.
 */
export function sampleDiscoveryRevealT(progress: number): number {
  const p = clamp01(progress);
  if (p <= 0) return 0;

  const reveal = sampleReveal(p);

  const scrollPhase =
    p < INTRO_START
      ? smoothstep(0, 1, p / INTRO_START) * SCROLL_TEASE_PEAK
      : SCROLL_TEASE_PEAK;

  if (!reveal.carVisible) {
    return scrollPhase;
  }

  if (reveal.landingComplete) {
    return 1;
  }

  const descent = smoothstep(0, 0.98, reveal.landingT);
  return SCROLL_TEASE_PEAK + descent * (1 - SCROLL_TEASE_PEAK);
}

export function sampleDiscoverySectionOpacity(progress: number): number {
  return sampleDiscoveryRevealT(progress);
}

export function isDiscoveryIntroActive(progress: number): boolean {
  const p = clamp01(progress);
  if (p <= 0) return false;
  return !sampleReveal(p).landingComplete;
}
