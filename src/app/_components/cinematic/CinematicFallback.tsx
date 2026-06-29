"use client";

import Image from "next/image";
import { site } from "@/lib/site-data";
import { ShimmerButton } from "@/app/_components/ui/shimmer-button";
import { SCENE_CONTENT } from "@/lib/cinematic/scene-content";

/** Fallback accesible: sin pin, sin WebGL, prefers-reduced-motion */
export function CinematicFallback() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="section-shell flex min-h-[100svh] flex-col items-center justify-center py-20 text-center">
        <Image
          src={site.media.logo}
          alt={site.name}
          width={420}
          height={260}
          className="h-auto w-[min(88vw,420px)] object-contain"
          priority
        />
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-purple-300">
          {site.tagline}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          {SCENE_CONTENT.arrival.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-300">
          {SCENE_CONTENT.arrival.description}. {site.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ShimmerButton href={`mailto:${site.email}`}>Pedir presupuesto</ShimmerButton>
          <ShimmerButton href={site.phoneHref} variant="outline">
            {site.phone}
          </ShimmerButton>
        </div>
      </section>

      <section id="servicios" className="section-shell section-pad border-t border-white/5">
        <h2 className="font-display text-3xl font-bold">{SCENE_CONTENT.craftsmanship.title}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => (
            <li key={service.slug} className="surface-glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-purple-300">
                {service.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="proceso" className="section-shell section-pad border-t border-white/5">
        <h2 className="font-display text-3xl font-bold">{SCENE_CONTENT.process.title}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.process.map((step) => (
            <li key={step.step} className="surface-glass rounded-2xl p-5">
              <span className="text-sm text-purple-300">{step.step}</span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contacto" className="section-shell section-pad border-t border-white/5">
        <h2 className="font-display text-3xl font-bold">{SCENE_CONTENT.finale.title}</h2>
        <p className="mt-4 text-zinc-300">{site.address}, {site.city}</p>
        <p className="mt-2">
          <a href={site.phoneHref} className="text-purple-300 hover:text-purple-200">
            {site.phone}
          </a>
          {" · "}
          <a href={`mailto:${site.email}`} className="text-purple-300 hover:text-purple-200">
            {site.email}
          </a>
        </p>
      </section>

      <footer className="border-t border-white/5 py-8 text-center">
        <Image
          src={site.media.logo}
          alt={site.name}
          width={100}
          height={64}
          className="mx-auto h-8 w-auto opacity-70"
          style={{ width: "auto" }}
        />
        <p className="mt-4 text-sm text-zinc-500">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </div>
  );
}
