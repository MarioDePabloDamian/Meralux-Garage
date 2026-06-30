"use client";

import { useMemo, useRef } from "react";
import { Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { computeLogoDiscLayout } from "@/lib/cinematic/logo-disc-texture";
import { sampleScrollHint } from "@/lib/cinematic/scroll-parallax";
import { PLATFORM_SURFACE_Y } from "@/lib/cinematic/scene-config";
import { site } from "@/lib/site-data";

type GalaScrollHintProps = {
  mobile: boolean;
  progressRef: React.RefObject<number>;
};

/** Hint anclado al disco del logo en espacio 3D (evita desfase con pin/scroll CSS). */
export function GalaScrollHint({ mobile, progressRef }: GalaScrollHintProps) {
  const logoTexture = useTexture(site.media.logo);
  const rootRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef(0);

  const layout = useMemo(() => {
    const img = logoTexture.image as HTMLImageElement | undefined;
    return computeLogoDiscLayout(img, mobile ? 0.82 : 1);
  }, [logoTexture, mobile]);

  // Centro de la franja negra entre el borde inferior del logo y el borde del disco.
  const marginBelowLogo = layout.radius - layout.logoHeight / 2;
  const hintZ = -(layout.logoHeight / 2 + marginBelowLogo * 0.42);

  useFrame(() => {
    const opacity = sampleScrollHint(progressRef.current ?? 0).opacity;
    if (Math.abs(opacity - opacityRef.current) < 0.015) return;

    opacityRef.current = opacity;
    const root = rootRef.current;
    if (!root) return;
    root.style.opacity = String(opacity);
    root.style.visibility = opacity > 0.02 ? "visible" : "hidden";
  });

  return (
    <Html
      position={[0, PLATFORM_SURFACE_Y + 0.06, hintZ]}
      center
      transform
      sprite
      distanceFactor={mobile ? 11.5 : 13}
      zIndexRange={[20, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={rootRef}
        className="flex flex-col items-center"
        style={{ opacity: 1, visibility: "visible" }}
      >
        <span className="pl-[0.28em] text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-300">
          Desliza
        </span>
        <span
          className="mt-2 block h-8 w-px bg-gradient-to-b from-purple-400/70 to-transparent"
          aria-hidden
        />
      </div>
    </Html>
  );
}

useTexture.preload(site.media.logo);
