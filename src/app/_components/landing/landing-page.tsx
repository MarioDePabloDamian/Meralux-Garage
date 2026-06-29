"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { memo, useEffect, useState } from "react";
import { AnimatedGradientText } from "@/app/_components/ui/animated-gradient-text";
import { GridPattern } from "@/app/_components/ui/background-beams";
import { CtaBanner } from "@/app/_components/ui/cta-banner";
import { Marquee, ReviewCard } from "@/app/_components/ui/marquee";
import { ProcessCard } from "@/app/_components/ui/process-card";
import { SectionHeader } from "@/app/_components/ui/section-header";
import { ShimmerButton } from "@/app/_components/ui/shimmer-button";
import { site } from "@/lib/site-data";
import { FloatingCta } from "@/app/_components/ui/floating-cta";
import { cn } from "@/lib/utils";
import {
  Clock,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { GlobalLightPillar } from "./global-light-pillar";
import { HeroSection } from "./hero-section";
import { ServicesShowcase } from "./services-showcase";
import {
  HeroReveal,
  HeroRevealItem,
  ScrollProgressBar,
  ScrollReveal,
  SectionDivider,
  StaggerItem,
  StaggerReveal,
} from "./scroll-effects";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14 8.5V7.2c0-.7.5-1.2 1.2-1.2H17V3h-2.4C12.8 3 11 4.9 11 7.2V8.5H9v3.2h2V21h3v-9.3h2.6L17 11.7h-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-10 bg-gradient-to-r from-purple-500 to-fuchsia-400 sm:w-12"
        aria-hidden
      />
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-purple-300 sm:text-sm sm:tracking-[0.32em]">
        {children}
      </p>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 mx-auto max-w-7xl rounded-2xl border transition-all duration-500 sm:inset-x-4 lg:inset-x-8",
        scrolled
          ? "border-purple-500/25 bg-black/80 shadow-[0_8px_32px_rgba(124,58,237,0.2)] backdrop-blur-2xl"
          : "border-white/5 bg-black/35 backdrop-blur-xl",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-6">
        <Link href="#" className="flex min-h-11 shrink-0 items-center gap-3">
          <Image
            src={site.media.logo}
            alt={site.name}
            width={140}
            height={89}
            className="h-9 w-auto object-contain sm:h-10 lg:h-12"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative cursor-pointer py-2 text-sm uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-200 hover:text-purple-300"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-purple-500/30 px-4 py-2 text-sm text-purple-100 transition-colors duration-200 hover:border-purple-400 hover:bg-purple-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Llamar
          </a>
          <a
            href="#contacto"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-200 hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Presupuesto
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-200 transition-colors duration-200 hover:border-purple-400/30 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col px-4 py-3 pb-safe">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 cursor-pointer items-center text-sm uppercase tracking-[0.2em] text-zinc-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-purple-600 px-5 text-sm font-semibold text-white"
              >
                Presupuesto
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ContactCard({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("surface-glass h-full rounded-2xl p-5 sm:p-6", className)}>
      <div className="flex items-center gap-3 text-purple-300">
        {icon}
        <p className="text-xs font-medium uppercase tracking-[0.22em]">{title}</p>
      </div>
      <div className="mt-3 text-sm leading-7 text-zinc-300">{children}</div>
    </div>
  );
}

function HeroTrustPills() {
  const items = [
    `${site.rating.toFixed(1)} Google`,
    site.award,
    "Rivas-Vaciamadrid",
  ];

  return (
    <ul className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 sm:px-4 sm:text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const HeroContent = memo(function HeroContent() {
  const reduceMotion = useReducedMotion();

  const staticContent = (
    <div className="w-full">
      <HeroEyebrow>{site.tagline}</HeroEyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.25rem,5.5vw+0.5rem,4.75rem)] font-bold leading-[1.06] tracking-tight text-white sm:mt-5 lg:text-[4.5rem] lg:leading-[1.04]">
        Vinilado que <AnimatedGradientText>brilla</AnimatedGradientText>.
        <span className="block text-zinc-100">Diseñado contigo.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
        {site.description} Taller boutique en Rivas-Vaciamadrid — wrap, PPF y
        detailing con acabado de competición.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <ShimmerButton href="#contacto" className="w-full sm:w-auto">
          Pedir presupuesto
        </ShimmerButton>
        <ShimmerButton href="#servicios" variant="outline" className="w-full sm:w-auto">
          Ver servicios
        </ShimmerButton>
      </div>
      <HeroTrustPills />
    </div>
  );

  if (reduceMotion) {
    return staticContent;
  }

  return (
    <HeroReveal className="w-full">
      <HeroRevealItem>
        <HeroEyebrow>{site.tagline}</HeroEyebrow>
      </HeroRevealItem>
      <HeroRevealItem variant="title">
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5.5vw+0.5rem,4.75rem)] font-bold leading-[1.06] tracking-tight text-white sm:mt-5 lg:text-[4.5rem] lg:leading-[1.04]">
          Vinilado que <AnimatedGradientText>brilla</AnimatedGradientText>.
          <span className="block text-zinc-100">Diseñado contigo.</span>
        </h1>
      </HeroRevealItem>
      <HeroRevealItem>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
          {site.description} Taller boutique en Rivas-Vaciamadrid — wrap, PPF y
          detailing con acabado de competición.
        </p>
      </HeroRevealItem>
      <HeroRevealItem>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <ShimmerButton href="#contacto" className="w-full sm:w-auto">
            Pedir presupuesto
          </ShimmerButton>
          <ShimmerButton href="#servicios" variant="outline" className="w-full sm:w-auto">
            Ver servicios
          </ShimmerButton>
        </div>
      </HeroRevealItem>
      <HeroRevealItem>
        <HeroTrustPills />
      </HeroRevealItem>
    </HeroReveal>
  );
});

export function LandingPage() {
  return (
    <>
      <GlobalLightPillar />
      <div className="relative z-[1] overflow-x-clip text-white">
      <ScrollProgressBar />
      <Navbar />
      <FloatingCta phoneHref={site.phoneHref} />

      <HeroSection>
        <HeroContent />
      </HeroSection>

      <ServicesShowcase />

      <SectionDivider className="py-4" />

      <section id="proceso" className="section-ambient relative overflow-hidden border-y border-white/5 bg-[#080808] section-pad">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="section-shell relative z-10">
          <ScrollReveal variant="emphasis">
            <SectionHeader
              eyebrow="Proceso"
              title="De la idea a la entrega"
              description="Cuatro pasos claros, sin sorpresas: consulta, diseño, instalación y entrega."
            />
          </ScrollReveal>

          <StaggerReveal className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {site.process.map((item) => (
              <StaggerItem key={item.step}>
                <ProcessCard
                  step={item.step}
                  title={item.title}
                  description={item.description}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <SectionDivider className="py-4" />

      <section id="reseñas" className="section-ambient section-pad">
        <div className="section-shell">
          <ScrollReveal variant="emphasis">
            <SectionHeader
              eyebrow="Reseñas"
              title="Lo que dicen nuestros clientes"
              description="Valoración máxima en Google. Trabajo de calidad y trato cercano."
            />
          </ScrollReveal>

          <div className="mt-10 sm:mt-14">
            <ScrollReveal className="sm:hidden">
              <Marquee pauseOnHover className="py-2">
                {site.reviews.map((review) => (
                  <ReviewCard
                    key={review.author}
                    quote={review.quote}
                    author={review.author}
                  />
                ))}
              </Marquee>
            </ScrollReveal>

            <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-5">
              {site.reviews.map((review, index) => (
                <ScrollReveal key={review.author} delay={index * 0.06}>
                  <ReviewCard
                    quote={review.quote}
                    author={review.author}
                    className="w-full"
                  />
                </ScrollReveal>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-zinc-500">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-purple-300 transition-colors duration-200 hover:text-purple-200"
              >
                Ver todas en Google Maps →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="contacto" className="section-ambient relative overflow-hidden border-t border-white/5 section-pad">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(124,58,237,0.1),transparent_60%)]"
          aria-hidden
        />
        <GridPattern />
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-16">
          <ScrollReveal variant="emphasis" className="flex flex-col gap-8">
            <SectionHeader eyebrow="Contacto" title="Visítanos en Rivas" />

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<MapPin className="h-5 w-5" aria-hidden />} title="Ubicación">
                {site.address}
                <br />
                {site.city}
              </ContactCard>
              <ContactCard icon={<Phone className="h-5 w-5" aria-hidden />} title="Teléfono y email">
                <a href={site.phoneHref} className="cursor-pointer hover:text-purple-300">
                  {site.phone}
                </a>
                <br />
                <a
                  href={`mailto:${site.email}`}
                  className="cursor-pointer hover:text-purple-300"
                >
                  {site.email}
                </a>
              </ContactCard>
            </div>

            <ContactCard icon={<Clock className="h-5 w-5" aria-hidden />} title="Horario">
              <ul className="space-y-2">
                {site.hours.map((item) => (
                  <li key={item.day} className="flex justify-between gap-4">
                    <span>{item.day}</span>
                    <span className="text-zinc-400">{item.time}</span>
                  </li>
                ))}
              </ul>
            </ContactCard>

            <div className="flex flex-wrap gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition-colors duration-200 hover:border-purple-400/40 hover:text-purple-200"
              >
                <IconInstagram className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition-colors duration-200 hover:border-purple-400/40 hover:text-purple-200"
              >
                <IconFacebook className="h-5 w-5" />
                Facebook
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-purple-500/20 shadow-[0_0_60px_rgba(124,58,237,0.12)]">
              <iframe
                title="Ubicación de Meralux Garage"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10494.708138796617!2d-3.5311569564270524!3d40.34021592089551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd423ba74b4305c7%3A0xd6ab889b0752486f!2sMeralux%20Garage!5e1!3m2!1ses!2ses!4v1782050139952!5m2!1ses!2ses"
                className="aspect-[4/3] min-h-[260px] w-full border-0 sm:min-h-[320px] lg:min-h-0 lg:aspect-auto lg:h-[min(520px,calc(100vh-8rem))]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-shell section-pad pt-0">
        <ScrollReveal>
          <CtaBanner
            title="¿Listo para transformar tu coche?"
            description="Cuéntanos tu idea y te preparamos un presupuesto sin compromiso."
            primaryHref="#contacto"
            primaryLabel="Pedir presupuesto"
            secondaryHref={site.phoneHref}
            secondaryLabel="Llamar ahora"
          />
        </ScrollReveal>
      </section>

      <footer className="border-t border-white/5 pb-24 md:pb-safe">
        <div className="section-shell flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between sm:py-10">
          <Image
            src={site.media.logo}
            alt={site.name}
            width={120}
            height={76}
            className="h-8 w-auto object-contain"
            style={{ width: "auto" }}
          />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer text-sm text-zinc-400 transition-colors duration-200 hover:text-purple-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
