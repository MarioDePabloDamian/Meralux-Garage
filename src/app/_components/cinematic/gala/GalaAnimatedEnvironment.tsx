"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Lightformer } from "@react-three/drei";
import * as THREE from "three";
import {
  flicker,
  lightShowWeight,
  sequenceGate,
  smoothPulse,
} from "@/lib/cinematic/gala-animations";

type GalaAnimatedEnvironmentProps = {
  mobile: boolean;
};

type RigLight = {
  ref: React.RefObject<THREE.Mesh | null>;
  base: number;
  phase: number;
  speed: number;
};

export function GalaAnimatedEnvironment({ mobile }: GalaAnimatedEnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lf0 = useRef<THREE.Mesh>(null);
  const lf1 = useRef<THREE.Mesh>(null);
  const lf2 = useRef<THREE.Mesh>(null);
  const lf3 = useRef<THREE.Mesh>(null);
  const lf4 = useRef<THREE.Mesh>(null);

  const rigs: RigLight[] = [
    { ref: lf0, base: 3.2, phase: 0, speed: 0.9 },
    { ref: lf1, base: 2.2, phase: 1.4, speed: 0.7 },
    { ref: lf2, base: 1.4, phase: 2.1, speed: 0.55 },
    { ref: lf3, base: 1.2, phase: 0.8, speed: 0.65 },
    { ref: lf4, base: 0.9, phase: 2.8, speed: 0.45 },
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.025;
    }

    rigs.forEach(({ ref, base, phase, speed }, i) => {
      const mesh = ref.current;
      if (!mesh?.material) return;

      const mat = mesh.material as THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
      const show = lightShowWeight(t, i, rigs.length, mobile ? 18 : 12);
      const gate = sequenceGate(t, 6 + i * 1.3, phase, 0.55 + (i % 3) * 0.1);
      const pulse = smoothPulse(t, speed, phase, 0.35, 1);
      const intensity =
        base * show * gate * pulse * flicker(t, phase, 1, mobile ? 0.04 : 0.07);

      const hue = 0.12 + (i % 2) * 0.02;
      const sat = 0.15;
      const lightness = 0.85 + pulse * 0.1;
      const strength = Math.max(0, intensity / base);

      // Lightformer usa MeshBasicMaterial (color), no emissive
      if (mat instanceof THREE.MeshStandardMaterial && mat.emissive) {
        mat.emissiveIntensity = Math.max(0, intensity);
        mat.emissive.setHSL(hue, sat, lightness);
      } else if (mat.color) {
        mat.color.setHSL(hue, sat, lightness * strength);
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Lightformer
        ref={lf0}
        intensity={3.2}
        rotation-x={Math.PI / 2}
        position={[4, 10, 2]}
        scale={[16, 16, 1]}
        color="#ffffff"
      />
      <Lightformer
        ref={lf1}
        intensity={2.2}
        rotation-x={Math.PI / 2}
        position={[-4, 9, -1]}
        scale={[12, 12, 1]}
        color="#ffffff"
      />
      <Lightformer
        ref={lf2}
        intensity={1.4}
        rotation-y={Math.PI / 2}
        position={[-9, 3.5, 0]}
        scale={[8, 10, 1]}
        color="#f5f5ff"
      />
      <Lightformer
        ref={lf3}
        intensity={1.2}
        rotation-y={-Math.PI / 2}
        position={[9, 3, -1]}
        scale={[7, 8, 1]}
        color="#fff8e7"
      />
      {!mobile && (
        <Lightformer
          ref={lf4}
          intensity={0.9}
          rotation-x={-Math.PI / 4}
          position={[0, 6, 6]}
          scale={[10, 4, 1]}
          color="#ffffff"
        />
      )}
    </group>
  );
}
