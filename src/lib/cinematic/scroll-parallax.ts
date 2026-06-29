import { clamp01, lerp, smoothstep } from "./easing";
import {
  INTRO_END_PROGRESS,
  isDiscoveryIntroActive,
  sampleDiscoveryRevealT,
  sampleReveal,
} from "./reveal-rig";

export function sampleDiscoveryEntryOpacity(progress: number): number {
  return sampleDiscoveryRevealT(progress);
}

export type ParallaxLayer = {
  opacity: number;
  y: number;
};

export type ScrollParallaxState = {
  panelOpacity: number;
  eyebrow: ParallaxLayer;
  title: ParallaxLayer;
  body: ParallaxLayer;
  items: ParallaxLayer;
};

const LAYER_SPEED = {
  eyebrow: 0.55,
  title: 1,
  body: 1.35,
  items: 1.65,
} as const;

/** Una sola función para tease + descenso — sin saltos de opacidad */
function discoveryIntroLayers(progress: number): ScrollParallaxState {
  const r = sampleDiscoveryRevealT(progress);
  const motion = smoothstep(0, 1, r);
  const yBase = lerp(30, 0, motion);

  return {
    panelOpacity: r,
    eyebrow: {
      opacity: r * smoothstep(0, 0.48, r),
      y: yBase * LAYER_SPEED.eyebrow,
    },
    title: {
      opacity: r * smoothstep(0.05, 0.58, r),
      y: yBase * LAYER_SPEED.title,
    },
    body: {
      opacity: r * smoothstep(0.12, 0.72, r),
      y: yBase * LAYER_SPEED.body,
    },
    items: {
      opacity: r * smoothstep(0.2, 0.88, r),
      y: yBase * LAYER_SPEED.items,
    },
  };
}

export function sampleScrollParallax(local: number): ScrollParallaxState {
  const enter = smoothstep(0, 0.32, local);
  const exit = smoothstep(0.62, 1, local);
  const panelOpacity = enter * (1 - exit);

  const enterY = (1 - enter) * 56;
  const exitY = exit * -40;
  const baseY = enterY + exitY;

  const layer = (speed: number): ParallaxLayer => ({
    opacity: panelOpacity * smoothstep(0.08, 0.38, local) * (1 - smoothstep(0.58, 0.95, local)),
    y: baseY * speed,
  });

  return {
    panelOpacity,
    eyebrow: layer(LAYER_SPEED.eyebrow),
    title: layer(LAYER_SPEED.title),
    body: layer(LAYER_SPEED.body),
    items: layer(LAYER_SPEED.items),
  };
}

export function sampleDiscoveryParallax(
  local: number,
  progress: number,
): ScrollParallaxState {
  const p = clamp01(progress);

  if (isDiscoveryIntroActive(p)) {
    return discoveryIntroLayers(p);
  }

  const reveal = sampleReveal(p);
  const base = sampleScrollParallax(local);
  const justLanded = reveal.landingComplete && local < 0.22;

  if (justLanded) {
    return {
      panelOpacity: 1,
      eyebrow: { opacity: 1, y: 0 },
      title: { opacity: 1, y: 0 },
      body: { opacity: 1, y: 0 },
      items: { opacity: 1, y: 0 },
    };
  }

  return base;
}

export function sampleScrollHint(progress: number): ParallaxLayer {
  const reveal = sampleDiscoveryRevealT(progress);
  const hint = 1 - smoothstep(0, INTRO_END_PROGRESS * 0.55, progress);
  return { opacity: hint * (1 - reveal * 0.92), y: 0 };
}
