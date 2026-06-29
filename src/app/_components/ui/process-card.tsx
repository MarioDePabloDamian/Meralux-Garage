"use client";

import { MessageCircle, Palette, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons: Record<string, LucideIcon> = {
  "01": MessageCircle,
  "02": Palette,
  "03": Sparkles,
  "04": Truck,
};

type ProcessCardProps = {
  step: string;
  title: string;
  description: string;
  className?: string;
};

export function ProcessCard({
  step,
  title,
  description,
  className,
}: ProcessCardProps) {
  const Icon = stepIcons[step] ?? Sparkles;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black/60",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-purple-400/30 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)]",
        className,
      )}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
            <Icon className="h-5 w-5 text-purple-300" strokeWidth={1.75} aria-hidden />
          </div>
          <p className="font-display text-3xl font-bold text-purple-500/30 transition-colors duration-300 group-hover:text-purple-400/50 sm:text-4xl">
            {step}
          </p>
        </div>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{description}</p>
      </div>
    </article>
  );
}
