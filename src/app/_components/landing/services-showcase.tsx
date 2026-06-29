"use client";

import { motion, useReducedMotion } from "motion/react";
import { CtaBanner } from "@/app/_components/ui/cta-banner";
import {
  BentoCard,
  BentoPremiumGrid,
  serviceBentoSpans,
} from "@/app/_components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-data";
import { BentoScrollCard, BentoScrollSequence, ScrollReveal } from "./scroll-effects";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ServicesEditorialHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -right-4 top-0 hidden select-none font-display text-[clamp(5rem,14vw,11rem)] font-bold leading-none tracking-tighter text-white/[0.03] sm:-right-8 lg:block"
        aria-hidden
      >
        06
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14 xl:gap-20">
        <ScrollReveal variant="emphasis">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-gradient-to-r from-purple-500 to-fuchsia-400 sm:w-14"
                aria-hidden
              />
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-purple-300 sm:text-sm">
                Servicios
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw+0.25rem,4rem)] font-bold leading-[1.05] tracking-tight text-white lg:text-[3.5rem]">
              Wrap
              <span className="text-purple-400/80"> · </span>
              PPF
              <span className="text-purple-400/80"> · </span>
              Detail
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          className="relative lg:border-l lg:border-white/[0.08] lg:pl-10 xl:pl-14"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
        >
          <p className="max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-8">
            Vinilo, protección y acabados con precisión de taller boutique. Elige el
            servicio y te asesoramos.
          </p>
          <dl className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <div className="bento-stat-pill">
              <dt className="sr-only">Servicios</dt>
              <dd>
                <span className="font-display text-lg font-bold text-white">06</span>
                <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  especialidades
                </span>
              </dd>
            </div>
            <div className="bento-stat-pill">
              <dt className="sr-only">Reconocimiento</dt>
              <dd className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                {site.award}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </div>
  );
}

export function ServicesShowcase() {
  return (
    <section
      id="servicios"
      className="section-ambient relative overflow-hidden border-t border-white/5 section-pad"
    >
      <div
        className="bento-grid-field pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-6 top-32 hidden h-32 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/10 to-transparent xl:left-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] xl:block"
        aria-hidden
      />

      <div className="section-shell relative">
        <ServicesEditorialHeader />

        <BentoScrollSequence className="relative mt-14 sm:mt-16 lg:mt-20">
          <BentoPremiumGrid>
            {site.services.map((service, i) => (
              <BentoScrollCard
                key={service.slug}
                index={i}
                total={site.services.length}
                className={cn(serviceBentoSpans[service.slug])}
              >
                <BentoCard
                  name={service.title}
                  description={service.description}
                  category={service.category}
                  icon={service.icon}
                  index={String(i + 1).padStart(2, "0")}
                  featured={service.featured}
                  layout={service.slug === "tintado-lunas" ? "horizontal" : "stack"}
                  href="#contacto"
                  className="h-full"
                />
              </BentoScrollCard>
            ))}
          </BentoPremiumGrid>
        </BentoScrollSequence>

        <ScrollReveal className="mt-12 sm:mt-16 lg:mt-20">
          <CtaBanner
            title="¿Primera vez?"
            description="Te explicamos el proceso paso a paso."
            primaryHref="#proceso"
            primaryLabel="Ver cómo trabajamos"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
