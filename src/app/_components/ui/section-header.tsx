"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <header
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        <motion.span
          className="h-px origin-left bg-gradient-to-r from-purple-500 to-fuchsia-400 sm:w-12"
          initial={reduceMotion ? false : { width: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { width: 48, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden
        />
        <motion.p
          className="text-xs font-medium uppercase tracking-[0.28em] text-purple-300 sm:text-sm sm:tracking-[0.32em]"
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
      </div>
      <motion.h2
        className="mt-4 font-display text-[clamp(1.875rem,4vw+0.5rem,3.25rem)] font-bold leading-[1.12] tracking-tight text-white sm:mt-5 lg:text-5xl"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:mt-5 sm:text-lg sm:leading-8",
            align === "center" && "mx-auto",
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
        >
          {description}
        </motion.p>
      ) : null}
    </header>
  );
}
