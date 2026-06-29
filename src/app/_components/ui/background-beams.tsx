"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type BackgroundBeamsProps = {
  className?: string;
};

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_55%)]",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute h-full w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${10 + i * 15}%`}
            y1="0%"
            x2={`${30 + i * 12}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            className="animate-beam-pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.12),transparent_60%)]" />
    </div>
  );
}

type GridPatternProps = {
  className?: string;
};

export function GridPattern({ className }: GridPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
        className,
      )}
      aria-hidden
    />
  );
}
