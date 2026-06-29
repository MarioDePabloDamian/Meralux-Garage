/** Utilidades para animación de escena tipo gala / show de luces */

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/** Pulso suave entre min y max */
export function smoothPulse(
  t: number,
  speed: number,
  phase = 0,
  min = 0,
  max = 1,
): number {
  const wave = 0.5 + 0.5 * Math.sin(t * speed + phase);
  return min + (max - min) * wave;
}

/** Encendido/apagado con transición suave (duty 0–1 = fracción encendido) */
export function sequenceGate(
  t: number,
  period: number,
  phase: number,
  duty = 0.65,
  fade = 0.12,
): number {
  const p = ((t / period + phase) % 1 + 1) % 1;
  if (p < duty - fade) return 1;
  if (p > duty + fade) return 0;
  if (p < duty) return (p - (duty - fade)) / fade;
  return 1 - (p - duty) / fade;
}

/** Strobo suave — devuelve 0 apagado, 1 encendido */
export function strobeSoft(
  t: number,
  hz: number,
  phase: number,
  duty = 0.5,
): number {
  const p = ((t * hz + phase) % 1 + 1) % 1;
  return p < duty ? 1 : 0;
}

/** Flicker tipo foco viejo */
export function flicker(
  t: number,
  phase: number,
  base: number,
  amount: number,
): number {
  const n =
    Math.sin(t * 17.3 + phase * 4.1) *
    Math.sin(t * 11.7 + phase * 2.3) *
    Math.sin(t * 23.1 + phase);
  return base + n * amount;
}

/** Show secuencial: cada luz entra con offset */
export function lightShowWeight(
  t: number,
  index: number,
  total: number,
  cycle = 14,
): number {
  const slot = cycle / total;
  const local = ((t + index * slot) % cycle) / slot;
  return clamp01(local < 0.35 ? local / 0.35 : local > 0.85 ? (1 - local) / 0.15 : 1);
}

/** Barrido horizontal para fondo (-1 a 1) */
export function horizontalSweep(t: number, speed = 0.15): number {
  return Math.sin(t * speed * Math.PI * 2);
}
