"use client";

import { useReducedMotion } from "motion/react";
import { LightPillar } from "@/app/_components/ui/light-pillar";

/** Light Pillar (React Bits) — valores por defecto de la demo */
export function CinematicLightPillar() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#050505]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#050505]"
      aria-hidden
    >
      <LightPillar className="h-full w-full" noiseIntensity={0} />
    </div>
  );
}
