"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export function Spotlight({
  className,
  fill = "rgba(124, 58, 237, 0.15)",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      containerRef.current.style.setProperty("--spotlight-x", `${x}px`);
      containerRef.current.style.setProperty("--spotlight-y", `${y}px`);
    },
    [reduceMotion],
  );

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_65%)]",
          className,
        )}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          left: "var(--spotlight-x)",
          top: "var(--spotlight-y)",
          background: `radial-gradient(circle at center, ${fill}, transparent 40%)`,
        }}
      />
    </div>
  );
}
