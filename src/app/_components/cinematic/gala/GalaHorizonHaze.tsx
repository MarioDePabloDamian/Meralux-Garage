"use client";

import { useMemo } from "react";
import * as THREE from "three";

const HAZE_RADIUS = 52;
const SKY_VIOLET = new THREE.Color("#6D28D9");
const HORIZON_VIOLET = new THREE.Color("#2a1248");
const FLOOR_TINT = new THREE.Color("#08040f");

function buildHazeGeometry() {
  const geo = new THREE.SphereGeometry(
    HAZE_RADIUS,
    48,
    24,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.52,
  );
  const positions = geo.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const tmp = new THREE.Color();

  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const normalizedY = THREE.MathUtils.clamp(
      (y + 2) / (HAZE_RADIUS * 0.52),
      0,
      1,
    );

    if (normalizedY < 0.22) {
      tmp.copy(FLOOR_TINT).multiplyScalar(0.35 * (normalizedY / 0.22));
    } else {
      const t = (normalizedY - 0.22) / 0.78;
      tmp.copy(HORIZON_VIOLET).lerp(SKY_VIOLET, t * t);
      tmp.multiplyScalar(0.18 + t * 0.42);
    }

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

/** Bruma atmosférica que une el suelo con el cielo violeta del Light Pillar */
export function GalaHorizonHaze() {
  const geometry = useMemo(() => buildHazeGeometry(), []);

  return (
    <mesh geometry={geometry} frustumCulled={false} renderOrder={-2}>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.92}
        side={THREE.BackSide}
        depthWrite={false}
        toneMapped={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
