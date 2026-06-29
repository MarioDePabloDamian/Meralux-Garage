import * as THREE from "three";
import { MODEL_TARGET_SCALE, PLATFORM_SURFACE_Y } from "./scene-config";

export type NormalizedCar = {
  object: THREE.Object3D;
  size: THREE.Vector3;
  bodyCenterY: number;
};

const STUDIO_FLOOR_PATTERN = /studiofloor|studio_floor|^floor$|sketchfab/i;
/** Pivotes vacíos del GLB — más bajos que el neumático */
const GROUND_SKIP_PATTERN = /wheel_scene|scene_-_root|rootnode|sketchfab_model/i;
/** Neumáticos / llantas = contacto con el suelo */
const WHEEL_CONTACT_PATTERN = /wheel|tyre|tire|tread|1disk/i;

function hideStudioFloor(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh && STUDIO_FLOOR_PATTERN.test(child.name)) {
      child.visible = false;
    }
  });
}

/** Y del contacto con el suelo — disco de rueda, no pinzas de freno ni pivotes */
function computeGroundY(root: THREE.Object3D): number {
  let wheelMin = Infinity;
  let fallbackMin = Infinity;

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.visible) return;
    if (GROUND_SKIP_PATTERN.test(child.name)) return;
    if (/tormoz|brake|studiofloor|interior|engine|seatbelt/i.test(child.name)) return;

    const box = new THREE.Box3().setFromObject(child);
    fallbackMin = Math.min(fallbackMin, box.min.y);
    if (WHEEL_CONTACT_PATTERN.test(child.name)) {
      wheelMin = Math.min(wheelMin, box.min.y);
    }
  });

  if (Number.isFinite(wheelMin)) return wheelMin;
  if (Number.isFinite(fallbackMin)) return fallbackMin;
  return 0;
}

/** Escala, centra en X/Z y apoya los neumáticos en y=0 */
export function normalizeCarModel(source: THREE.Object3D): NormalizedCar {
  const root = source.clone(true);
  root.position.set(0, 0, 0);
  root.rotation.set(0, 0, 0);
  root.scale.set(1, 1, 1);
  root.updateMatrixWorld(true);

  hideStudioFloor(root);

  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale =
    maxDim > 0.01 && Math.abs(maxDim - MODEL_TARGET_SCALE) < 0.75
      ? 1
      : MODEL_TARGET_SCALE / maxDim;
  root.scale.setScalar(scale);
  root.updateMatrixWorld(true);

  box.setFromObject(root);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.x -= center.x;
  root.position.z -= center.z;
  root.updateMatrixWorld(true);

  const groundY = computeGroundY(root);
  root.position.y -= groundY;
  root.position.y += PLATFORM_SURFACE_Y;
  root.updateMatrixWorld(true);

  box.setFromObject(root);
  box.getSize(size);
  const bodyCenterY = box.min.y + size.y * 0.42;

  return { object: root, size, bodyCenterY };
}
