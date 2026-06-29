"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./shimmer-button";

type CtaBannerProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function CtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: CtaBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-purple-500/20",
        "bg-gradient-to-br from-purple-950/40 via-[#0c0c0c] to-black",
        "shadow-[0_0_80px_rgba(124,58,237,0.12)]",
        className,
      )}
    >
      {!reduceMotion ? (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl motion-reduce:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-3xl motion-reduce:hidden"
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-300">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <ShimmerButton href={primaryHref} className="w-full sm:w-auto lg:min-w-[220px]">
            {primaryLabel}
          </ShimmerButton>
          {secondaryHref && secondaryLabel ? (
            <ShimmerButton
              href={secondaryHref}
              variant="outline"
              className="w-full sm:w-auto lg:min-w-[220px]"
            >
              {secondaryLabel}
            </ShimmerButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}
