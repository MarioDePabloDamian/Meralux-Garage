"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  sampleCamera,
  sampleCameraUseZenithUp,
} from "@/lib/cinematic/camera-rig";
import { sampleLighting } from "@/lib/cinematic/lighting-rig";
import { STUDIO_BLACK } from "@/lib/cinematic/scene-config";
import { CAR_FOCUS_Y, CinematicCar } from "./CinematicCar";
import { GalaTheaterSet } from "./gala/GalaTheaterSet";
import { GalaSpotlights } from "./gala/GalaSpotlights";
import { CarAccentLights } from "./gala/CarAccentLights";
import { GalaPostEffects } from "./gala/GalaPostEffects";

type CinematicSceneProps = {
  progressRef: React.RefObject<number>;
  lightingRef: React.RefObject<{
    wrapMix: number;
    fogOpacity: number;
    exposure: number;
    envIntensity: number;
  }>;
  mobile: boolean;
};

export function CinematicScene({
  progressRef,
  lightingRef,
  mobile,
}: CinematicSceneProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const { camera, gl, scene } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, CAR_FOCUS_Y, 0));

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    const lighting = sampleLighting(progress);
    const cam = sampleCamera(progress);

    if (lightingRef.current) {
      lightingRef.current.wrapMix = lighting.wrapMix;
      lightingRef.current.fogOpacity = lighting.fogOpacity;
      lightingRef.current.exposure = lighting.exposure;
      lightingRef.current.envIntensity = lighting.envIntensity;
    }

    camera.position.copy(cam.position);
    lookAt.current.copy(cam.target);

    // Sin lerp de up — evita roll; cenital solo mientras mira hacia abajo
    if (sampleCameraUseZenithUp(cam.position, cam.target)) {
      camera.up.set(0, 0, 1);
    } else {
      camera.up.set(0, 1, 0);
    }
    camera.lookAt(lookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }

    gl.toneMappingExposure = lighting.exposure;

    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.set(STUDIO_BLACK);
      scene.fog.density = 0.0012 + lighting.fogOpacity * 0.0018;
    }

    scene.background = null;

    if (ambientRef.current) {
      ambientRef.current.intensity = lighting.ambient;
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={[STUDIO_BLACK, 0.0015]} />

      <ambientLight ref={ambientRef} intensity={0.04} color="#ffffff" />

      <GalaSpotlights mobile={mobile} />
      <GalaTheaterSet mobile={mobile} progressRef={progressRef} />

      <Environment
        preset="night"
        background={false}
        resolution={mobile ? 256 : 512}
        environmentIntensity={1.1}
      />

      <CarAccentLights mobile={mobile} progressRef={progressRef} />

      <CinematicCar
        progressRef={progressRef}
        lightingRef={lightingRef}
      />

      <GalaPostEffects mobile={mobile} />
    </>
  );
}
