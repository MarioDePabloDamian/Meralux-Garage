"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ShimmerButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  shimmerColor?: string;
  variant?: "primary" | "outline";
};

export function ShimmerButton({
  className,
  children,
  shimmerColor = "rgba(255,255,255,0.35)",
  variant = "primary",
  ...props
}: ShimmerButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <a
      className={cn(
        "group relative inline-flex min-h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-200",
        variant === "primary"
          ? "bg-purple-600 text-white hover:bg-purple-500"
          : "border border-purple-400/30 text-purple-100 hover:border-purple-300 hover:bg-purple-500/10",
        className,
      )}
      {...props}
    >
      {!reduceMotion ? (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent motion-reduce:hidden"
          style={
            {
              "--shimmer-color": shimmerColor,
            } as React.CSSProperties
          }
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
