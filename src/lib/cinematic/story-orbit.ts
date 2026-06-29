import * as THREE from "three";
import { CAR_AZIMUTH_OFFSET, CAMERA_FOCUS_Y } from "./scene-config";
import { lerp, smoothstep } from "./easing";

/** Órbita horaria desde vista frontal; t=1 vuelve al ángulo inicial */
export type OrbitBeat = {
  t: number;
  azimuth: number;
  radius: number;
  height: number;
  fov: number;
};

const ORBIT_FOCUS_Y = 0.55;
/** Morro del coche de frente (compensa rotación π del modelo) */
const START_AZIMUTH = -0.08;
const BASE_RADIUS = 7.0;
const BASE_HEIGHT = 1.2;
const BASE_FOV = 34;

function buildClockwiseOrbit(): OrbitBeat[] {
  const steps = 10;
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps;
    const azimuth = START_AZIMUTH + t * Math.PI * 2;
    const wave = Math.sin(t * Math.PI * 2);
    return {
      t,
      azimuth,
      radius: BASE_RADIUS + wave * 0.35,
      height: BASE_HEIGHT + wave * 0.12,
      fov: BASE_FOV + Math.sin(t * Math.PI) * 2,
    };
  });
}

export const STORY_ORBIT: OrbitBeat[] = buildClockwiseOrbit();

function orbitPosition(beat: OrbitBeat): THREE.Vector3 {
  const a = beat.azimuth + CAR_AZIMUTH_OFFSET;
  return new THREE.Vector3(
    Math.sin(a) * beat.radius,
    beat.height,
    Math.cos(a) * beat.radius,
  );
}

export function sampleStoryOrbit(t: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
} {
  const clamped = Math.max(0, Math.min(1, t));
  const beats = STORY_ORBIT;
  let from = beats[0];
  let to = beats[beats.length - 1];

  for (let i = 0; i < beats.length - 1; i += 1) {
    if (clamped >= beats[i].t && clamped <= beats[i + 1].t) {
      from = beats[i];
      to = beats[i + 1];
      break;
    }
  }

  const span = to.t - from.t || 1;
  const localT = smoothstep(0, 1, (clamped - from.t) / span);
  const position = orbitPosition(from).lerp(orbitPosition(to), localT);
  const targetY = lerp(ORBIT_FOCUS_Y, CAMERA_FOCUS_Y, clamped);
  const target = new THREE.Vector3(0, targetY, 0);
  const fov = lerp(from.fov, to.fov, localT);

  return { position, target, fov };
}
