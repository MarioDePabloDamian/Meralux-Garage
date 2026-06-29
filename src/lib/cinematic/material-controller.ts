import * as THREE from "three";
import { WRAP_COLOR } from "./scene-config";

const PAINT_PATTERN = /\bPaint_Geo\b|\bColoured_Geo\b|esta80\b|_Paint_/i;
const SKIP_PATTERN =
  /glass|wheel|tire|tyre|interior|leather|chrome|light|taillight|brake|blink|mirror|gauge|needle|seat|steer|carbon|grille|engine|badge|rubber|plastic|black2|matte|symbol|tormoz|disk|window|seatbelt|manufacturerplate/i;

const INTERIOR_PATTERN =
  /interior|seat|steer|gauge|needle|gauges|boot|mats|dials|leather|stitch|sdd_|Interior_Geo|SeatBelt|WindowInside/i;

const EXTERIOR_SHELL_PATTERN =
  /body|frame|door|fender|bumper|hood|trunk|coupe|Paint_Geo|Coloured_Geo|Base_Geo|mirror_[LR](?!.*interior)/i;

const GLASS_PATTERN = /glass|windshield|Window_Geo|sideglass|doorglass|mirrorglass|red_glass/i;

const TIRE_PATTERN = /tire|tyre|tormoz|glossblack|1disk|wheel_pl|rubber|Wheel\d|_Wheel|Tyre|Tread/i;

type PaintRecord = {
  material: THREE.MeshStandardMaterial;
  originalColor: THREE.Color;
  originalMetalness: number;
  originalRoughness: number;
};

const paintCache = new WeakMap<THREE.Object3D, PaintRecord[]>();

type MaterialSnapshot = {
  material: THREE.Material;
  transparent: boolean;
  opacity: number;
  depthWrite: boolean;
};

const opacityCache = new WeakMap<THREE.Object3D, MaterialSnapshot[]>();

function collectMaterialSnapshots(root: THREE.Object3D): MaterialSnapshot[] {
  const cached = opacityCache.get(root);
  if (cached) return cached;

  const snapshots: MaterialSnapshot[] = [];
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of mats) {
      snapshots.push({
        material,
        transparent: material.transparent,
        opacity: material.opacity,
        depthWrite: material.depthWrite,
      });
    }
  });

  opacityCache.set(root, snapshots);
  return snapshots;
}

/** Opacidad global del coche — 0 al inicio (solo logo), 1 tras el reveal */
export function applyCarOpacity(root: THREE.Object3D, opacity: number): void {
  const alpha = THREE.MathUtils.clamp(opacity, 0, 1);
  const snapshots = collectMaterialSnapshots(root);

  for (const snap of snapshots) {
    const { material } = snap;
    if (alpha >= 1) {
      material.transparent = snap.transparent;
      material.opacity = snap.opacity;
      material.depthWrite = snap.depthWrite;
      continue;
    }

    material.transparent = true;
    material.opacity = alpha <= 0 ? 0 : alpha * snap.opacity;
    material.depthWrite = false;
  }
}

function isPaintMesh(mesh: THREE.Mesh): boolean {
  const name = mesh.name.toLowerCase();
  if (SKIP_PATTERN.test(name)) return false;

  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  return mats.some(
    (mat) =>
      mat instanceof THREE.MeshStandardMaterial &&
      (PAINT_PATTERN.test(mat.name) || PAINT_PATTERN.test(name)),
  );
}

export function collectPaintMaterials(root: THREE.Object3D): PaintRecord[] {
  const cached = paintCache.get(root);
  if (cached) return cached;

  const records: PaintRecord[] = [];

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !isPaintMesh(child)) return;

    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!(mat instanceof THREE.MeshStandardMaterial)) continue;
      records.push({
        material: mat,
        originalColor: mat.color.clone(),
        originalMetalness: mat.metalness,
        originalRoughness: mat.roughness,
      });
    }
  });

  paintCache.set(root, records);
  return records;
}

export function applyWrapMix(root: THREE.Object3D, wrapMix: number): void {
  const mix = Math.min(1, Math.max(0, wrapMix));
  const records = collectPaintMaterials(root);
  const wrapColor = new THREE.Color(WRAP_COLOR.r, WRAP_COLOR.g, WRAP_COLOR.b);

  for (const record of records) {
    const { material } = record;
    material.color.copy(record.originalColor).lerp(wrapColor, mix);
    material.metalness = THREE.MathUtils.lerp(
      record.originalMetalness,
      0.76,
      mix,
    );
    material.roughness = THREE.MathUtils.lerp(
      record.originalRoughness,
      0.07,
      mix,
    );
    material.envMapIntensity = THREE.MathUtils.lerp(1.35, 2.15, mix);
    material.emissive = material.emissive ?? new THREE.Color();
    material.emissive.copy(wrapColor).multiplyScalar(0.035 * mix);
    material.emissiveIntensity = mix;
  }
}

/** Oculta interior — evita ver asientos/volante a través de huecos de carrocería */
export function hideInteriorMeshes(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    if (INTERIOR_PATTERN.test(child.name)) {
      child.visible = false;
    }
  });
}

/** Carrocería opaca y neumáticos con acabado mate */
export function tuneCarSurfaceMaterials(root: THREE.Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const name = child.name;

    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const mat of mats) {
      if (!(mat instanceof THREE.MeshStandardMaterial)) continue;

      if (GLASS_PATTERN.test(name)) {
        mat.transparent = true;
        mat.opacity = Math.min(mat.opacity > 0 ? mat.opacity : 1, 0.78);
        mat.roughness = Math.min(mat.roughness, 0.06);
        mat.metalness = Math.max(mat.metalness, 0.88);
        mat.envMapIntensity = 2.0;
        mat.depthWrite = false;
        mat.side = THREE.DoubleSide;
        continue;
      }

      if (EXTERIOR_SHELL_PATTERN.test(name) && !/rubber|plastic|glass/i.test(name)) {
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.side = THREE.FrontSide;
        mat.alphaTest = 0;
        mat.roughness = Math.min(mat.roughness, 0.28);
        mat.metalness = THREE.MathUtils.clamp(mat.metalness, 0.45, 0.82);
        mat.envMapIntensity = 1.85;
        continue;
      }

      if (/chrome|light|headlight|taillight/i.test(name)) {
        mat.envMapIntensity = 2.1;
        mat.metalness = Math.max(mat.metalness, 0.9);
        mat.roughness = Math.min(mat.roughness, 0.12);
        if (/headlight.*light/i.test(name)) {
          mat.emissive = mat.emissive ?? new THREE.Color("#d4faff");
          mat.emissiveIntensity = 0.35;
          mat.toneMapped = true;
        }
      }
    }
  });
}

export function applyEnvironmentIntensity(
  root: THREE.Object3D,
  intensity: number,
): void {
  const scale = THREE.MathUtils.lerp(0.85, 1.35, intensity);

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const name = child.name;
    const mats = Array.isArray(child.material) ? child.material : [child.material];

    for (const mat of mats) {
      if (!(mat instanceof THREE.MeshStandardMaterial)) continue;

      if (GLASS_PATTERN.test(name)) {
        mat.envMapIntensity = 2.0 * scale;
      } else if (EXTERIOR_SHELL_PATTERN.test(name)) {
        mat.envMapIntensity = 1.85 * scale;
      } else if (/chrome|light/i.test(name)) {
        mat.envMapIntensity = 2.2 * scale;
      } else if (TIRE_PATTERN.test(name)) {
        mat.envMapIntensity = 0.45 * scale;
      } else if (/wheel|disk/i.test(name)) {
        mat.envMapIntensity = 1.55 * scale;
      }
    }
  });
}
