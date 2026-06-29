"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { site } from "@/lib/site-data";
import { LOGO_PLANE_ROTATION_Y } from "@/lib/cinematic/hero-staging";
import {
  computeLogoDiscLayout,
  createLogoDiscTexture,
  disposeLogoDiscTexture,
  type LogoDiscLayout,
} from "@/lib/cinematic/logo-disc-texture";
import { PLATFORM_SURFACE_Y } from "@/lib/cinematic/scene-config";

type GalaLogoFloorProps = {
  mobile: boolean;
};

function buildDiscTexture(
  image: HTMLImageElement,
  layout: LogoDiscLayout,
): THREE.CanvasTexture {
  return createLogoDiscTexture(image, layout);
}

/** Disco único: logo + círculo comparten la misma textura y negro (#000 del PNG) */
export function GalaLogoFloor({ mobile }: GalaLogoFloorProps) {
  const logoTexture = useTexture(site.media.logo);
  const scale = mobile ? 0.82 : 1;
  const [discTexture, setDiscTexture] = useState<THREE.CanvasTexture | null>(
    null,
  );

  const layout = useMemo(() => {
    const img = logoTexture.image as HTMLImageElement | undefined;
    return computeLogoDiscLayout(img, scale);
  }, [logoTexture, scale]);

  useLayoutEffect(() => {
    const img = logoTexture.image as HTMLImageElement | undefined;
    if (!img) return;

    const apply = () => {
      if (!img.naturalWidth) return;
      setDiscTexture((prev) => {
        disposeLogoDiscTexture(prev);
        return buildDiscTexture(img, layout);
      });
    };

    if (img.complete) {
      apply();
    } else {
      img.addEventListener("load", apply);
      return () => img.removeEventListener("load", apply);
    }
  }, [logoTexture, layout]);

  useEffect(() => {
    return () => disposeLogoDiscTexture(discTexture);
  }, [discTexture]);

  if (!discTexture) return null;

  return (
    <mesh
      position={[0, PLATFORM_SURFACE_Y + 0.0008, 0]}
      rotation={[-Math.PI / 2, 0, LOGO_PLANE_ROTATION_Y]}
      renderOrder={1}
    >
      <circleGeometry args={[layout.radius, 96]} />
      <meshBasicMaterial
        map={discTexture}
        toneMapped={false}
        side={THREE.DoubleSide}
        depthWrite
        depthTest
      />
    </mesh>
  );
}

useTexture.preload(site.media.logo);
