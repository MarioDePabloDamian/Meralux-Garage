"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CinematicScene } from "./CinematicScene";

type CinematicCanvasProps = {
  progressRef: React.RefObject<number>;
};

export function CinematicCanvas({ progressRef }: CinematicCanvasProps) {
  const lightingRef = useRef({
    wrapMix: 0,
    fogOpacity: 0.35,
    exposure: 1,
    envIntensity: 0.9,
  });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      className="pointer-events-none absolute inset-0 z-10"
      dpr={mobile ? [1, 1.15] : [1, 2]}
      shadows={!mobile}
      frameloop="always"
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: mobile ? "default" : "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.autoClear = true;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.toneMappingExposure = 1.05;
      }}
      camera={{ position: [0, 0.85, 5.2], fov: 34, near: 0.1, far: 100 }}
    >
      <Suspense fallback={null}>
        <CinematicScene
          progressRef={progressRef}
          lightingRef={lightingRef}
          mobile={mobile}
        />
      </Suspense>
    </Canvas>
  );
}
