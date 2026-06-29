export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Aterrizaje suave — el coche se posa en el círculo */
export function easeOutQuart(t: number): number {
  const x = clamp01(t);
  return 1 - (1 - x) ** 4;
}

/** Entrada suave — ideal para reveals */
export function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - (1 - x) ** 3;
}

/** Entrada/salida suave — trayectorias de cámara */
export function easeInOutCubic(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function findKeyframeSegment<T extends { progress: number }>(
  keyframes: T[],
  progress: number,
): { from: T; to: T; t: number } {
  const p = clamp01(progress);
  let from = keyframes[0];
  let to = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (p >= keyframes[i].progress && p <= keyframes[i + 1].progress) {
      from = keyframes[i];
      to = keyframes[i + 1];
      break;
    }
  }

  const span = to.progress - from.progress || 1;
  const t = smoothstep(0, 1, (p - from.progress) / span);
  return { from, to, t };
}
