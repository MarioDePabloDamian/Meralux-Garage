"use client";

import {
  ArrowUpRight,
  CircleDot,
  Layers,
  Palette,
  Scissors,
  Shield,
  SunMedium,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, LucideIcon> = {
  layers: Layers,
  scissors: Scissors,
  shield: Shield,
  palette: Palette,
  "circle-dot": CircleDot,
  "sun-medium": SunMedium,
};

const categoryAccent: Record<string, string> = {
  Wrap: "from-purple-600/25 via-transparent to-fuchsia-600/8",
  PPF: "from-violet-600/30 via-transparent to-purple-900/12",
  Detail: "from-indigo-600/22 via-transparent to-purple-600/10",
};

/** Rejilla editorial 12 columnas — asimétrica en desktop */
export const serviceBentoSpans: Record<string, string> = {
  "wrapping-integral":
    "sm:col-span-2 xl:col-span-5 xl:row-span-2 xl:row-start-1",
  "wrapping-parcial": "xl:col-span-3 xl:col-start-6 xl:row-start-1",
  ppf: "xl:col-span-4 xl:col-start-9 xl:row-start-1",
  "custom-color": "xl:col-span-3 xl:col-start-6 xl:row-start-2",
  "vinilado-llantas": "xl:col-span-4 xl:col-start-9 xl:row-start-2",
  "tintado-lunas": "sm:col-span-2 xl:col-span-12 xl:row-start-3",
};

type BentoCardProps = {
  name: string;
  description: string;
  category?: string;
  icon?: string;
  index?: string;
  featured?: boolean;
  layout?: "stack" | "horizontal";
  href?: string;
  className?: string;
};

function CardPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 h-[55%] w-[55%] opacity-30",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
        <circle cx="100" cy="100" r="80" stroke="rgba(168,85,247,0.12)" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="55" stroke="rgba(168,85,247,0.08)" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="30" stroke="rgba(168,85,247,0.06)" strokeWidth="0.75" />
      </svg>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span
        className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-purple-400/25 transition-colors duration-500 group-hover:border-purple-400/50 sm:left-6 sm:top-6"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-purple-400/20 transition-colors duration-500 group-hover:border-purple-400/45 sm:bottom-6 sm:right-6"
        aria-hidden
      />
    </>
  );
}

function GhostIndex({ index, featured }: { index?: string; featured?: boolean }) {
  if (!index) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display font-bold leading-none tracking-tighter text-white/[0.04] transition-colors duration-500 group-hover:text-purple-500/[0.07]",
        featured
          ? "text-[clamp(5.5rem,12vw,9rem)]"
          : "text-[clamp(3.5rem,8vw,5.5rem)]",
      )}
      aria-hidden
    >
      {index}
    </span>
  );
}

function BentoCardLink({
  href,
  className,
  children,
  reduceMotion,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      className={className}
      whileTap={{
        scale: 0.976,
        y: 3,
        boxShadow:
          "inset 0 2px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 16px rgba(0,0,0,0.55)",
      }}
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 32,
        mass: 0.82,
      }}
      style={{ transformOrigin: "center center" }}
    >
      {children}
    </motion.a>
  );
}

export function BentoCard({
  name,
  description,
  category = "Wrap",
  icon = "layers",
  index,
  featured = false,
  layout = "stack",
  href = "#contacto",
  className,
}: BentoCardProps) {
  const Icon = serviceIcons[icon] ?? Layers;
  const accent = categoryAccent[category] ?? categoryAccent.Wrap;
  const reduceMotion = useReducedMotion();
  const isHorizontal = layout === "horizontal";

  const shellClassName = cn(
    "bento-card-shell group relative h-full min-h-[200px] overflow-hidden rounded-[1.35rem] p-px",
    featured && !isHorizontal && "min-h-[260px] xl:min-h-full",
    isHorizontal && "min-h-[180px]",
    className,
  );

  const innerClassName = cn(
    "relative flex h-full w-full overflow-hidden rounded-[calc(1.35rem-1px)]",
    "bg-[#080808]/95",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_40px_rgba(0,0,0,0.5)]",
    "transition-[box-shadow] duration-500",
    "group-hover:shadow-[inset_0_1px_0_0_rgba(168,85,247,0.2),0_16px_56px_rgba(124,58,237,0.18)]",
    isHorizontal
      ? "flex-col gap-0 lg:flex-row lg:items-stretch lg:gap-0"
      : "flex-col",
  );

  const iconBadge = (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        "border border-purple-500/25 bg-purple-500/[0.08]",
        "transition-[border-color,background-color,box-shadow] duration-500",
        "group-hover:border-purple-400/40 group-hover:bg-purple-500/12 group-hover:shadow-[0_0_32px_rgba(168,85,247,0.18)]",
        isHorizontal ? "h-14 w-14 lg:h-16 lg:w-16" : "h-11 w-11 sm:h-12 sm:w-12",
      )}
    >
      <Icon
        className={cn(
          "text-purple-300",
          isHorizontal ? "h-6 w-6" : "h-5 w-5 sm:h-6 sm:w-6",
        )}
        strokeWidth={1.65}
        aria-hidden
      />
    </div>
  );

  const cardBody = (
  <>
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
        accent,
      )}
      aria-hidden
    />
    <div className="bento-card-noise pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
    <CardPattern />
    <CornerBrackets />
    <GhostIndex index={index} featured={featured && !isHorizontal} />

    <div
      className={cn(
        "relative flex flex-1",
        isHorizontal
          ? "flex-col p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-10 lg:p-8 xl:gap-14"
          : "flex-col p-6 sm:p-7",
      )}
    >
      {isHorizontal ? (
        <>
          <div className="flex items-center gap-4 lg:w-[min(100%,220px)] lg:shrink-0 lg:flex-col lg:items-start lg:gap-5">
            {iconBadge}
            <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1">
              {index ? (
                <span className="font-display text-sm font-bold text-purple-500/50">
                  {index}
                </span>
              ) : null}
              <span className="rounded-full border border-purple-500/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200/85">
                {category}
              </span>
            </div>
          </div>

          <div className="mt-6 min-w-0 flex-1 lg:mt-0 lg:border-l lg:border-white/[0.06] lg:pl-10">
            <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-7">
              {description}
            </p>
          </div>

          <span className="mt-6 inline-flex shrink-0 items-center gap-2 self-start text-sm font-medium text-purple-300 transition-colors duration-300 group-hover:text-purple-100 lg:mt-0 lg:self-center">
            Consultar
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {iconBadge}
              {index ? (
                <span className="font-display text-sm font-bold text-purple-500/45 transition-colors duration-500 group-hover:text-purple-400/65">
                  {index}
                </span>
              ) : null}
            </div>
            <span className="rounded-full border border-purple-500/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-200/85 backdrop-blur-sm">
              {category}
            </span>
          </div>

          <h3
            className={cn(
              "mt-6 font-display font-bold tracking-tight text-white",
              featured ? "text-2xl sm:text-[1.75rem] lg:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {name}
          </h3>
          <p className="mt-3 max-w-prose flex-1 text-sm leading-relaxed text-zinc-300 transition-colors duration-500 group-hover:text-zinc-200 sm:text-[0.9375rem] sm:leading-7">
            {description}
          </p>

          {featured ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Color completo", "Vinilo premium", "Garantía taller"].map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-500"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors duration-500 group-hover:text-purple-100">
            Consultar
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </span>
        </>
      )}
    </div>
  </>
  );

  return (
    <BentoCardLink href={href} reduceMotion={reduceMotion} className={shellClassName}>
      <div className={innerClassName}>{cardBody}</div>
    </BentoCardLink>
  );
}

type BentoGridProps = {
  children: React.ReactNode;
  className?: string;
};

/** @deprecated Usa BentoPremiumGrid en la landing */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:auto-rows-[minmax(200px,auto)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoPremiumGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
        "xl:grid-cols-12 xl:auto-rows-[minmax(176px,auto)] xl:gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
