import type { CameraKeyframe, LightingKeyframe, SceneId } from "./types";
import { DISCOVERY_SCENE_START } from "./scroll-timeline";

/** Negro de estudio — coincide con fondo web y light pillar */
export const STUDIO_BLACK = "#050505";
export const STUDIO_BLACK_HEX = 0x050505;

export const MODEL_URL = "/models/hero-car.glb";
/** Escala objetivo en unidades mundo (Corvette C8 Stingray ~4.5 m) */
export const MODEL_TARGET_SCALE = 4.6;

/** Ancho del logo en unidades mundo */
export const LOGO_WORLD_WIDTH = 6.55;

/** Superficie superior de la plataforma circular (y mundo) */
export const PLATFORM_SURFACE_Y = 0.003;

export const CAMERA_FOCUS_Y = 0.62;

/** Orientación base 3/4 + volteo 180° del mesh del coche */
export const CAR_MODEL_ROTATION_Y = Math.PI + Math.PI / 6 + Math.PI;

/** Compensa la órbita de cámara (independiente del volteo del modelo) */
export const CAR_AZIMUTH_OFFSET = Math.PI;

const SCENE_CAR_ROTATION: Record<SceneId, number> = {
  arrival: 0,
  discovery: 0,
  details: 0,
  craftsmanship: 0,
  process: 0,
  transformation: 0,
  finale: 0,
};

function orbitPreset(
  azimuth: number,
  radius: number,
  height: number,
  fov: number,
): Omit<CameraKeyframe, "progress"> {
  const a = azimuth + CAR_AZIMUTH_OFFSET;
  return {
    position: [
      Math.sin(a) * radius,
      height,
      Math.cos(a) * radius,
    ],
    target: [0, CAMERA_FOCUS_Y, 0],
    fov,
    carRotation: 0,
  };
}

/** Ángulos fijos por escena — cámara orbita, coche quieto (carRotation = 0) */
export const SCENE_CAMERA_PRESETS: Record<
  SceneId,
  Omit<CameraKeyframe, "progress">
> = {
  /** Vista cenital — plataforma + logo en el centro exacto del viewport */
  arrival: {
    position: [0, 15.5, 0],
    target: [0, 0, 0],
    fov: 38,
    carRotation: 0,
  },
  /** Frontal — morro del coche */
  discovery: orbitPreset(-0.08, 7.0, 1.2, 34),
  /** Frontal izquierda, más cerca */
  details: orbitPreset(0.55, 5.5, 1.15, 36),
  /** Perfil izquierdo */
  craftsmanship: orbitPreset(Math.PI / 2, 4.2, 0.85, 38),
  /** Trasera 3/4 */
  process: orbitPreset(2.35, 7.0, 1.45, 35),
  /** Trasera recta — spoiler y difusor */
  transformation: orbitPreset(Math.PI, 6.5, 1.65, 34),
  /** Hero 3/4 cierre */
  finale: orbitPreset(-0.35, 6.0, 1.25, 34),
};

const SCENE_ORDER: SceneId[] = [
  "arrival",
  "discovery",
  "details",
  "craftsmanship",
  "process",
  "transformation",
  "finale",
];

/** Tras la intro (~un desliz), el resto del scroll reparte las escenas restantes */
function sceneCameraProgress(index: number): number {
  if (index === 0) return 0;
  if (index === 1) return DISCOVERY_SCENE_START;
  const tail = 1 - DISCOVERY_SCENE_START;
  const step = tail / (SCENE_ORDER.length - 2);
  return DISCOVERY_SCENE_START + step * (index - 1);
}

/** Orbita continua — intro comprimida, luego interpolación suave */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = SCENE_ORDER.map(
  (id, i) => ({
    progress: sceneCameraProgress(i),
    ...SCENE_CAMERA_PRESETS[id],
    carRotation: SCENE_CAR_ROTATION[id],
  }),
);

export type SceneLightingPreset = Omit<LightingKeyframe, "progress">;

export const SCENE_LIGHTING_PRESETS: Record<SceneId, SceneLightingPreset> = {
  arrival: {
    ambient: 0.22,
    keyIntensity: 1.05,
    rimIntensity: 0.52,
    envIntensity: 0.88,
    exposure: 1.02,
    wrapMix: 0,
    fogOpacity: 0.12,
  },
  discovery: {
    ambient: 0.19,
    keyIntensity: 1.05,
    rimIntensity: 0.52,
    envIntensity: 0.85,
    exposure: 1.0,
    wrapMix: 0,
    fogOpacity: 0.08,
  },
  details: {
    ambient: 0.2,
    keyIntensity: 1.15,
    rimIntensity: 0.55,
    envIntensity: 0.95,
    exposure: 1.02,
    wrapMix: 0,
    fogOpacity: 0.06,
  },
  craftsmanship: {
    ambient: 0.21,
    keyIntensity: 1.25,
    rimIntensity: 0.56,
    envIntensity: 1.0,
    exposure: 1.04,
    wrapMix: 0,
    fogOpacity: 0.05,
  },
  process: {
    ambient: 0.22,
    keyIntensity: 1.35,
    rimIntensity: 0.58,
    envIntensity: 1.05,
    exposure: 1.05,
    wrapMix: 0,
    fogOpacity: 0.04,
  },
  transformation: {
    ambient: 0.2,
    keyIntensity: 1.25,
    rimIntensity: 0.62,
    envIntensity: 1.08,
    exposure: 1.05,
    wrapMix: 0,
    fogOpacity: 0.03,
  },
  finale: {
    ambient: 0.24,
    keyIntensity: 1.5,
    rimIntensity: 0.68,
    envIntensity: 1.15,
    exposure: 1.1,
    wrapMix: 0,
    fogOpacity: 0.02,
  },
};

export const LIGHTING_KEYFRAMES: LightingKeyframe[] = SCENE_ORDER.map(
  (id, i) => ({
    progress: sceneCameraProgress(i),
    ...SCENE_LIGHTING_PRESETS[id],
  }),
);

/** Violeta frío Meralux — vinyl gloss (#6D28D9 / violet-700) */
export const WRAP_COLOR = { r: 0.427, g: 0.157, b: 0.851 };
