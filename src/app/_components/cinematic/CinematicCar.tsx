"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group, Object3D } from "three";
import { CAR_MODEL_ROTATION_Y, MODEL_URL } from "@/lib/cinematic/scene-config";
import { normalizeCarModel } from "@/lib/cinematic/normalize-car-model";
import {
  applyCarOpacity,
  applyEnvironmentIntensity,
  hideInteriorMeshes,
  tuneCarSurfaceMaterials,
} from "@/lib/cinematic/material-controller";
import { sampleReveal } from "@/lib/cinematic/reveal-rig";

export const CAR_FOCUS_Y = 0.62;

type CinematicCarProps = {
  progressRef: React.RefObject<number>;
  lightingRef: React.RefObject<{
    wrapMix: number;
    envIntensity: number;
  }>;
};

function prepareDownloadedModel(source: Object3D) {
  const { object } = normalizeCarModel(source);
  hideInteriorMeshes(object);
  tuneCarSurfaceMaterials(object);
  return object;
}

export function CinematicCar({
  progressRef,
  lightingRef,
}: CinematicCarProps) {
  void lightingRef;

  const gltf = useGLTF(MODEL_URL);
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Object3D>(null);

  const model = useMemo(
    () => prepareDownloadedModel(gltf.scene),
    [gltf.scene],
  );

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    const lighting = lightingRef.current;
    const { carOpacity, carScale, carLiftY, carVisible } = sampleReveal(progress);

    if (groupRef.current) {
      groupRef.current.visible = carVisible;
      groupRef.current.position.y = carLiftY;
      groupRef.current.scale.setScalar(carScale);
    }

    if (modelRef.current) {
      applyCarOpacity(modelRef.current, carVisible ? carOpacity : 0);
      if (lighting && carVisible) {
        applyEnvironmentIntensity(modelRef.current, lighting.envIntensity);
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[0, CAR_MODEL_ROTATION_Y, 0]}>
      <primitive ref={modelRef} object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
