"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type GalaSpotlightsProps = {
  mobile: boolean;
};

export function GalaSpotlights({ mobile }: GalaSpotlightsProps) {
  const keyRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.SpotLight>(null);
  const fillRef = useRef<THREE.SpotLight>(null);
  const poolRef = useRef<THREE.SpotLight>(null);
  const keyTargetRef = useRef<THREE.Object3D>(null);
  const rimTargetRef = useRef<THREE.Object3D>(null);
  const fillTargetRef = useRef<THREE.Object3D>(null);
  const poolTargetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    const pairs: [THREE.SpotLight | null, THREE.Object3D | null][] = [
      [keyRef.current, keyTargetRef.current],
      [rimRef.current, rimTargetRef.current],
      [fillRef.current, fillTargetRef.current],
      [poolRef.current, poolTargetRef.current],
    ];
    for (const [light, target] of pairs) {
      if (light && target) light.target = target;
    }
  }, []);

  return (
    <group>
      <object3D ref={keyTargetRef} position={[0.2, 0.55, 0]} />
      <object3D ref={rimTargetRef} position={[0, 0.62, 0]} />
      <object3D ref={fillTargetRef} position={[0, 0.5, 0.3]} />
      <object3D ref={poolTargetRef} position={[0, 0, 0]} />

      <spotLight
        ref={keyRef}
        position={[7, 13, 6]}
        angle={0.28}
        penumbra={0.95}
        intensity={3.2}
        color="#fffaf0"
        castShadow={!mobile}
        shadow-mapSize={mobile ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0001}
        shadow-camera-far={30}
      />

      <spotLight
        ref={rimRef}
        position={[-6, 10, 2]}
        angle={0.35}
        penumbra={0.92}
        intensity={1.8}
        color="#ffffff"
        castShadow={false}
      />

      <spotLight
        ref={fillRef}
        position={[4, 8, 8]}
        angle={0.45}
        penumbra={1}
        intensity={0.9}
        color="#f5f5f5"
        castShadow={false}
      />

      <spotLight
        ref={poolRef}
        position={[0, 9, 1]}
        angle={0.55}
        penumbra={1}
        intensity={2.4}
        color="#ffffff"
        castShadow={false}
      />
    </group>
  );
}
