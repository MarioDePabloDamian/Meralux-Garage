"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sampleReveal } from "@/lib/cinematic/reveal-rig";

type CarAccentLightsProps = {
  mobile: boolean;
  progressRef: React.RefObject<number>;
};

export function CarAccentLights({ mobile, progressRef }: CarAccentLightsProps) {
  const hoodRef = useRef<THREE.SpotLight>(null);
  const flankRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.SpotLight>(null);
  const hoodTarget = useRef<THREE.Object3D>(null);
  const flankTarget = useRef<THREE.Object3D>(null);
  const rimTarget = useRef<THREE.Object3D>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointLeftRef = useRef<THREE.PointLight>(null);
  const pointRightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    if (hoodRef.current && hoodTarget.current) {
      hoodRef.current.target = hoodTarget.current;
    }
    if (flankRef.current && flankTarget.current) {
      flankRef.current.target = flankTarget.current;
    }
    if (rimRef.current && rimTarget.current) {
      rimRef.current.target = rimTarget.current;
    }
  }, []);

  useFrame(() => {
    const progress = progressRef.current ?? 0;
    const { carVisible, carOpacity, carLiftY } = sampleReveal(progress);

    if (groupRef.current) {
      groupRef.current.visible = carVisible;
      groupRef.current.position.y = carLiftY;
    }

    const intensity = carVisible ? carOpacity : 0;
    if (hoodRef.current) hoodRef.current.intensity = 1.15 * intensity;
    if (flankRef.current) flankRef.current.intensity = 0.75 * intensity;
    if (rimRef.current) rimRef.current.intensity = 0.95 * intensity;
    if (pointLeftRef.current) pointLeftRef.current.intensity = 0.22 * intensity;
    if (pointRightRef.current) pointRightRef.current.intensity = 0.18 * intensity;
  });

  return (
    <group ref={groupRef}>
      <object3D ref={hoodTarget} position={[0.15, 0.72, 0.35]} />
      <object3D ref={flankTarget} position={[-0.85, 0.48, 0]} />
      <object3D ref={rimTarget} position={[0.9, 0.58, -0.4]} />

      <spotLight
        ref={hoodRef}
        position={[2.5, 4.5, 3.5]}
        angle={0.22}
        penumbra={0.95}
        intensity={0}
        color="#fffef8"
        castShadow={false}
      />

      <spotLight
        ref={flankRef}
        position={[-4, 2.2, 2]}
        angle={0.38}
        penumbra={0.92}
        intensity={0}
        color="#ddd6fe"
        castShadow={false}
      />

      <spotLight
        ref={rimRef}
        position={[4, 2.8, -2]}
        angle={0.32}
        penumbra={0.9}
        intensity={0}
        color="#fde68a"
        castShadow={false}
      />

      {!mobile && (
        <>
          <pointLight
            ref={pointLeftRef}
            position={[-2, 1.5, 3]}
            intensity={0}
            color="#c084fc"
            distance={7}
            decay={2}
          />
          <pointLight
            ref={pointRightRef}
            position={[2.2, 1.2, 2.5]}
            intensity={0}
            color="#fef3c7"
            distance={6}
            decay={2}
          />
        </>
      )}
    </group>
  );
}
