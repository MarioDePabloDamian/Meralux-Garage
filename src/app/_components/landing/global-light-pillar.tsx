"use client";

import { useReducedMotion } from "motion/react";
import { LightPillar } from "@/app/_components/ui/light-pillar";

/** Fondo WebGL fijo de toda la landing — siempre bajo el contenido (z-0). */
export function GlobalLightPillar() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[#050505]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full opacity-100"
      aria-hidden
    >
      <LightPillar
        topColor="#6D28D9"
        bottomColor="#E879F9"
        intensity={0.72}
        rotationSpeed={0.14}
        interactive
        pillarWidth={2.4}
        pillarRotation={42}
        gradientDirection="diagonal-tr-bl"
        quality="medium"
        mixBlendMode="screen"
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-bl from-[#050505]/40 via-transparent to-[#050505]/95" />
    </div>
  );
}
