import type { SceneDefinition, SceneId } from "./types";

export const SCROLL_TRACK_VH = 700;

const SCENE_BOUNDARIES: { id: SceneId; start: number }[] = [
  { id: "arrival", start: 0 },
  { id: "discovery", start: 0.03 },
  { id: "details", start: 0.17 },
  { id: "craftsmanship", start: 0.31 },
  { id: "process", start: 0.45 },
  { id: "transformation", start: 0.59 },
  { id: "finale", start: 0.73 },
];

export const DISCOVERY_SCENE_START =
  SCENE_BOUNDARIES.find((scene) => scene.id === "discovery")?.start ?? 0.042;

const SCENE_LABELS: Record<SceneId, string> = {
  arrival: "Llegada",
  discovery: "Descubrimiento",
  details: "Detalles",
  craftsmanship: "Oficio",
  process: "Proceso",
  transformation: "Transformación",
  finale: "Finale",
};

export const SCENES: SceneDefinition[] = SCENE_BOUNDARIES.map((entry, i) => ({
  id: entry.id,
  start: entry.start,
  end:
    i === SCENE_BOUNDARIES.length - 1
      ? 1
      : SCENE_BOUNDARIES[i + 1].start,
  label: SCENE_LABELS[entry.id],
}));

export function getSceneAtProgress(progress: number): SceneDefinition {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (p >= SCENES[i].start) return SCENES[i];
  }
  return SCENES[0];
}

export function getSceneLocalProgress(
  progress: number,
  scene: SceneDefinition,
): number {
  const span = scene.end - scene.start;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (progress - scene.start) / span));
}

export function sceneIndex(id: SceneId): number {
  return SCENES.findIndex((s) => s.id === id);
}

export function getAdjacentScene(
  scene: SceneDefinition,
  direction: -1 | 1,
): SceneDefinition | null {
  const idx = sceneIndex(scene.id);
  const next = idx + direction;
  if (next < 0 || next >= SCENES.length) return null;
  return SCENES[next];
}
