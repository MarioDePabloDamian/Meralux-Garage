"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { HeroCar3D } from "./hero-car-3d";
import { HeroScrollLayer } from "./scroll-effects";

const AMBIENT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type HeroSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeroSection({ children, className }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className={cn(
        "relative flex h-[100svh] min-h-[100dvh] flex-col items-stretch overflow-hidden",
        className,
      )}
    >
      <HeroCar3D />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgba(124,58,237,0.14),transparent_58%)]"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 2.2, ease: AMBIENT_EASE, delay: 0.15 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 2, ease: AMBIENT_EASE, delay: 0.25 }}
      />

      <HeroScrollLayer className="section-shell relative z-10 flex w-full flex-1 items-center pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.75rem))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:gap-6 xl:gap-10">
          <div className="relative max-w-4xl">{children}</div>
          <div className="hidden min-h-[1px] lg:block" aria-hidden />
        </div>
      </HeroScrollLayer>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: AMBIENT_EASE, delay: 1.2 }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[10px] font-medium uppercase tracking-[0.28em]">Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-purple-400/70 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
