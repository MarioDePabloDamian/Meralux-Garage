import * as THREE from "three";
import { SCENE_CAMERA_PRESETS } from "./scene-config";
import { lerp } from "./easing";
import {
  CAR_LANDING_END_PROGRESS,
  INTRO_START,
  sampleCameraDockT,
  sampleReveal,
} from "./reveal-rig";
import { sampleStoryOrbit } from "./story-orbit";

const _arrivalPos = new THREE.Vector3();
const _arrivalTarget = new THREE.Vector3();
const _zenithDir = new THREE.Vector3();
const _frontalDir = new THREE.Vector3();
const _orbitDir = new THREE.Vector3();
const _worldUp = new THREE.Vector3(0, 1, 0);
const _dockQuat = new THREE.Quaternion();
const _frontalQuat = new THREE.Quaternion();

/** Arco esférico cenital → frontal — sin lerp lineal que provoca roll */
function sampleDockCamera(
  dockT: number,
  arrival: (typeof SCENE_CAMERA_PRESETS)["arrival"],
  pathStart: ReturnType<typeof sampleStoryOrbit>,
): { position: THREE.Vector3; target: THREE.Vector3; fov: number } {
  const t = dockT;

  _arrivalTarget.set(...arrival.target);
  const target = _arrivalTarget.clone().lerp(pathStart.target, t);

  _arrivalPos.set(...arrival.position);
  _zenithDir.subVectors(_arrivalPos, _arrivalTarget);
  const zenithRadius = _zenithDir.length();
  _zenithDir.normalize();

  _frontalDir.subVectors(pathStart.position, pathStart.target).normalize();
  const frontalRadius = pathStart.position.distanceTo(pathStart.target);

  _frontalQuat.setFromUnitVectors(_worldUp, _frontalDir);
  _dockQuat.identity().slerp(_frontalQuat, t);
  _orbitDir.copy(_worldUp).applyQuaternion(_dockQuat).normalize();
  const radius = lerp(zenithRadius, frontalRadius, t);
  const position = target.clone().addScaledVector(_orbitDir, radius);

  return {
    position,
    target,
    fov: lerp(arrival.fov, pathStart.fov, t),
  };
}

export function sampleCamera(progress: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
} {
  const arrival = SCENE_CAMERA_PRESETS.arrival;
  const pathStart = sampleStoryOrbit(0);

  if (progress < INTRO_START) {
    return {
      position: new THREE.Vector3(...arrival.position),
      target: new THREE.Vector3(...arrival.target),
      fov: arrival.fov,
    };
  }

  const reveal = sampleReveal(progress);
  const dockT = sampleCameraDockT(progress);

  if (!reveal.cameraDockComplete) {
    return sampleDockCamera(dockT, arrival, pathStart);
  }

  // Cámara ya de frente — coche desciende con ángulo frontal fijo
  if (!reveal.landingComplete) {
    return {
      position: pathStart.position.clone(),
      target: pathStart.target.clone(),
      fov: pathStart.fov,
    };
  }

  const orbitSpan = 1 - CAR_LANDING_END_PROGRESS;
  const orbitT =
    orbitSpan <= 0
      ? 1
      : Math.max(0, Math.min(1, (progress - CAR_LANDING_END_PROGRESS) / orbitSpan));

  return sampleStoryOrbit(orbitT);
}

/** Cenital pura solo mientras la cámara mira casi recto hacia abajo */
export function sampleCameraUseZenithUp(
  position: THREE.Vector3,
  target: THREE.Vector3,
): boolean {
  _orbitDir.subVectors(position, target);
  if (_orbitDir.lengthSq() < 1e-8) return true;
  _orbitDir.normalize();
  return _orbitDir.y > 0.88;
}
