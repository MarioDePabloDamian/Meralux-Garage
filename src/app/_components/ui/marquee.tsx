"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("flex flex-wrap gap-4", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 animate-marquee gap-4",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

type ReviewCardProps = {
  quote: string;
  author: string;
  source?: string;
  className?: string;
};

export function ReviewCard({ quote, author, source, className }: ReviewCardProps) {
  return (
    <figure
      className={cn(
        "relative shrink-0 overflow-hidden rounded-3xl",
        "border border-white/10 bg-gradient-to-br from-zinc-900/90 via-[#0a0a0a] to-purple-950/20",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.35)]",
        "w-[min(340px,calc(100vw-2.5rem))] sm:w-[min(380px,calc(100vw-3rem))]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-600/15 blur-3xl"
        aria-hidden
      />
      <div className="relative p-6 sm:p-7">
        <div className="flex gap-0.5 text-amber-400" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M10 1.5l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.77l-4.7 2.47.9-5.23-3.8-3.7 5.25-.77L10 1.5z" />
            </svg>
          ))}
        </div>
        <blockquote className="mt-4 text-base leading-relaxed text-zinc-200">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-sm font-medium text-zinc-300">
          {author}
          {source ? (
            <>
              <span className="mx-2 text-zinc-600" aria-hidden>
                ·
              </span>
              <span className="text-zinc-500">{source}</span>
            </>
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}
