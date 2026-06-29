import { clamp01, smoothstep } from "./easing";

/** Pausa mínima en logo cenital antes de reaccionar al scroll */
export const INTRO_HOLD = 0.004;

/** ~80vh en track de 700vh — un desliz completa la intro */
export const INTRO_TRANSITION_END = 0.115;

/** Progreso 0→1 de la transición cenital → frontal */
export function sampleIntroT(progress: number): number {
  return smoothstep(INTRO_HOLD, INTRO_TRANSITION_END, clamp01(progress));
}

/** Fade-in compartido: coche + textos */
export function sampleIntroReveal(introT: number): number {
  return smoothstep(0.04, 0.4, introT);
}

export function isIntroComplete(progress: number): boolean {
  return progress >= INTRO_TRANSITION_END;
}
