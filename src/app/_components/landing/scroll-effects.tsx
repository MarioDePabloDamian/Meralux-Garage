"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, createContext, useContext } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Curva premium: desaceleración larga, sin frenazo brusco */
const HERO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroRevealContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.24,
      delayChildren: 0.55,
    },
  },
};

const heroRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.45,
      ease: HERO_EASE,
    },
  },
};

/** Título principal: un poco más lento y con micro-escala */
const heroRevealItemTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.988,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.65,
      ease: HERO_EASE,
    },
  },
};

type HeroRevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Entrada del hero al cargar (above-the-fold).
 * Pausa inicial para que el nav asiente, luego cascada lenta y fluida.
 */
export function HeroReveal({ children, className = "" }: HeroRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={heroRevealContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function HeroRevealItem({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "title";
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variant === "title" ? heroRevealItemTitle : heroRevealItem}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

/** Parallax suave del copy al abandonar el hero (scroll fluido con spring) */
export function HeroScrollLayer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.94, 0.72]);

  const spring = { stiffness: 38, damping: 24, mass: 1.15 };
  const y = useSpring(yRaw, spring);
  const opacity = useSpring(opacityRaw, spring);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </div>
  );
}

/** Variantes de entrada por índice: cada tarjeta llega desde un ángulo distinto */
const BENTO_ENTRANCES = [
  { y: 32, x: 0, rotate: 0, scale: 0.988 },
  { y: 28, x: -14, rotate: -0.4, scale: 0.99 },
  { y: 36, x: 12, rotate: 0.35, scale: 0.987 },
  { y: 26, x: -10, rotate: -0.25, scale: 0.991 },
  { y: 34, x: 8, rotate: 0.45, scale: 0.989 },
  { y: 30, x: -6, rotate: -0.3, scale: 0.99 },
] as const;

const BentoScrollProgressContext = createContext<MotionValue<number> | null>(null);

function bentoScrollRange(index: number, total: number) {
  const spread = 0.78;
  const slice = spread / Math.max(total, 1);
  const step = slice * 0.62;
  const pad = 0.06;
  const start = pad + index * step;
  const end = Math.min(start + slice * 1.18, pad + spread + slice * 0.5);
  return { start, end };
}

/** Contenedor que enlaza el progreso de scroll de la rejilla de servicios */
export function BentoScrollSequence({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.32"],
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <BentoScrollProgressContext.Provider value={scrollYProgress}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </BentoScrollProgressContext.Provider>
  );
}

function BentoScrollCardMotion({
  index,
  total,
  children,
  className = "",
}: {
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}) {
  const progress = useContext(BentoScrollProgressContext)!;
  const preset = BENTO_ENTRANCES[index % BENTO_ENTRANCES.length];
  const { start, end } = bentoScrollRange(index, total);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const yRaw = useTransform(progress, [start, end], [preset.y, 0]);
  const xRaw = useTransform(progress, [start, end], [preset.x, 0]);
  const scaleRaw = useTransform(progress, [start, end], [preset.scale, 1]);
  const rotateRaw = useTransform(progress, [start, end], [preset.rotate, 0]);

  const spring = { stiffness: 40, damping: 26, mass: 1.15 };
  const y = useSpring(yRaw, spring);
  const x = useSpring(xRaw, spring);
  const scale = useSpring(scaleRaw, spring);
  const rotate = useSpring(rotateRaw, spring);

  return (
    <motion.div className={className} style={{ opacity, y, x, scale, rotate }}>
      {children}
    </motion.div>
  );
}

/** Tarjeta de servicios: aparece en secuencia al hacer scroll, con entrada única */
export function BentoScrollCard({
  index,
  total,
  children,
  className = "",
}: {
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const progress = useContext(BentoScrollProgressContext);

  if (reduceMotion || !progress) {
    return <div className={className}>{children}</div>;
  }

  return (
    <BentoScrollCardMotion index={index} total={total} className={className}>
      {children}
    </BentoScrollCardMotion>
  );
}

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Slight scale + blur entrance for section headers */
  variant?: "default" | "emphasis";
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "default",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  const initial =
    variant === "emphasis"
      ? { opacity: 0, y: 48, scale: 0.98, filter: "blur(6px)" }
      : { opacity: 0, y: 36 };

  const animate =
    variant === "emphasis"
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : initial}
      whileInView={reduceMotion ? undefined : animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerReveal({ children, className = "" }: StaggerRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/** Barra de progreso de scroll (storytelling) */
export function ScrollProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-400"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

/** Parallax suave en secciones (3–5% del viewport) */
export function ParallaxLayer({
  children,
  className = "",
  offset = 40,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Línea divisoria animada entre capítulos */
export function SectionDivider({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8 ${className}`}
      aria-hidden
    >
      <motion.span
        className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />
      <span className="h-1.5 w-1.5 rounded-full bg-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
      <motion.span
        className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
      />
    </div>
  );
}

type FloatingWordProps = {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
};

function FloatingWord({ word, progress, start, end }: FloatingWordProps) {
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [30, -30]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="pointer-events-none absolute left-1/2 top-[38%] z-20 -translate-x-1/2 text-center font-display text-3xl font-bold uppercase tracking-[0.3em] text-purple-200/90 drop-shadow-[0_0_40px_rgba(168,85,247,0.9)] sm:text-5xl lg:text-6xl"
    >
      {word}
    </motion.span>
  );
}

type HeroScrollSectionProps = {
  id?: string;
  videoDesktop: string;
  videoMobile: string;
  posterDesktop: string;
  posterMobile: string;
  fallbackBefore: string;
  fallbackAfter: string;
  words: readonly string[];
  labelBefore: string;
  labelAfter: string;
  loadingLabel?: string;
  scrollTrackVh?: number;
  overlay: React.ReactNode;
};

function getActiveVideo(
  desktopRef: React.RefObject<HTMLVideoElement | null>,
  mobileRef: React.RefObject<HTMLVideoElement | null>,
) {
  if (typeof window === "undefined") {
    return desktopRef.current;
  }

  return window.matchMedia("(min-width: 768px)").matches
    ? desktopRef.current
    : mobileRef.current;
}

export function HeroScrollSection({
  id = "hero",
  videoDesktop,
  videoMobile,
  posterDesktop,
  posterMobile,
  fallbackBefore,
  fallbackAfter,
  words,
  labelBefore,
  labelAfter,
  loadingLabel = "Cargando vídeo",
  scrollTrackVh = 280,
  overlay,
}: HeroScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const labelOpacityBefore = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const labelOpacityAfter = useTransform(scrollYProgress, [0.65, 1], [0, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, 0.35, 0.15]);

  const scrubToProgress = useCallback((progress: number) => {
    const video = getActiveVideo(desktopRef, mobileRef);
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    video.pause();
    const clamped = Math.min(Math.max(progress, 0), 1);
    video.currentTime = clamped * (video.duration - 0.04);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", scrubToProgress);

  useEffect(() => {
    const videos = [desktopRef.current, mobileRef.current].filter(
      Boolean,
    ) as HTMLVideoElement[];

    const handleReady = () => {
      setIsReady(true);
      scrubToProgress(scrollYProgress.get());
    };

    for (const video of videos) {
      video.pause();
      video.muted = true;
      video.volume = 0;
      video.playsInline = true;
      video.setAttribute("preload", "auto");
      video.addEventListener("loadedmetadata", handleReady);
      video.addEventListener("loadeddata", handleReady);
    }

    scrubToProgress(scrollYProgress.get());

    return () => {
      for (const video of videos) {
        video.removeEventListener("loadedmetadata", handleReady);
        video.removeEventListener("loadeddata", handleReady);
      }
    };
  }, [scrubToProgress, scrollYProgress]);

  if (reduceMotion) {
    return (
      <section id={id} className="relative min-h-screen px-4 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallbackBefore}
            alt="Corvette ZR1X antes del wrap"
            className="aspect-video w-full rounded-3xl object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallbackAfter}
            alt="Corvette ZR1X con wrap instalado"
            className="aspect-video w-full rounded-3xl object-cover"
          />
        </div>
        <div className="mx-auto mt-12 max-w-3xl">{overlay}</div>
      </section>
    );
  }

  return (
    <section id={id} ref={containerRef} className="relative" style={{ height: `${scrollTrackVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={desktopRef}
          className="absolute inset-0 hidden h-full w-full object-cover object-[62%_center] md:block"
          muted
          playsInline
          preload="auto"
          poster={posterDesktop}
          aria-label="Corvette ZR1X wrap controlado por scroll"
        >
          <source src={videoDesktop} type="video/mp4" />
        </video>
        <video
          ref={mobileRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_52%] md:hidden"
          muted
          playsInline
          preload="auto"
          poster={posterMobile}
          aria-label="Corvette ZR1X wrap controlado por scroll en móvil"
        >
          <source src={videoMobile} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.22),transparent_55%)]" />

        {!isReady ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-sm uppercase tracking-[0.3em] text-zinc-400">
            {loadingLabel}
          </div>
        ) : null}

        {words.map((word, index) => {
          const slice = 1 / words.length;
          const start = index * slice * 0.92;
          const end = start + slice * 0.92;
          return (
            <FloatingWord
              key={word}
              word={word}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}

        <motion.div
          style={{ opacity: labelOpacityBefore }}
          className="absolute left-4 top-24 z-20 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-300 backdrop-blur md:left-8"
        >
          {labelBefore}
        </motion.div>
        <motion.div
          style={{ opacity: labelOpacityAfter }}
          className="absolute right-4 top-24 z-20 rounded-full border border-purple-400/35 bg-purple-950/75 px-3 py-1 text-xs uppercase tracking-[0.25em] text-purple-100 backdrop-blur md:right-8"
        >
          {labelAfter}
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 pt-28 lg:px-8 lg:pb-20"
        >
          {overlay}
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-6 pt-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-2 flex justify-center text-[10px] uppercase tracking-[0.25em] text-zinc-400">
              <span>Scroll · el wrap se revela</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full rounded-full bg-gradient-to-r from-zinc-500 via-purple-500 to-fuchsia-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
