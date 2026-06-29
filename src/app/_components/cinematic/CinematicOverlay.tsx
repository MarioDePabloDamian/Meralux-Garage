"use client";

import { MapPin, Phone, Star } from "lucide-react";
import { ShimmerButton } from "@/app/_components/ui/shimmer-button";
import {
  FINALE_HOURS,
  FINALE_REVIEWS,
  SCENE_CONTENT,
} from "@/lib/cinematic/scene-content";
import {
  sampleDiscoveryParallax,
  sampleScrollHint,
  sampleScrollParallax,
  type ScrollParallaxState,
} from "@/lib/cinematic/scroll-parallax";
import { getSceneLocalProgress, SCENES } from "@/lib/cinematic/scroll-timeline";
import { isDiscoveryIntroActive } from "@/lib/cinematic/reveal-rig";
import type { SceneId } from "@/lib/cinematic/types";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type CinematicOverlayProps = {
  sceneId: SceneId;
  progress: number;
};

type ParallaxPanelProps = {
  sceneId: SceneId;
  parallax: ScrollParallaxState;
  isCenter: boolean;
};

function ParallaxPanel({
  sceneId,
  parallax,
  isCenter,
}: ParallaxPanelProps) {
  const content = SCENE_CONTENT[sceneId];

  if (parallax.panelOpacity < 0.02) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 top-0 flex px-4 pb-16 pt-20 sm:px-8 lg:px-12",
        isCenter
          ? "items-center justify-center text-center"
          : "items-center justify-start text-left",
      )}
      id={sceneId === "craftsmanship" ? "servicios" : sceneId === "process" ? "proceso" : undefined}
      style={{ opacity: parallax.panelOpacity }}
    >
      <div className={cn("max-w-2xl", isCenter && "mx-auto")}>
        {content.eyebrow ? (
          <div
            className={cn("flex items-center gap-3", isCenter && "justify-center")}
            style={{
              opacity: parallax.eyebrow.opacity,
              transform: `translate3d(0, ${parallax.eyebrow.y}px, 0)`,
            }}
          >
            {!isCenter ? (
              <span className="h-px w-10 bg-gradient-to-r from-purple-500 to-fuchsia-400" aria-hidden />
            ) : null}
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-purple-300 sm:text-sm">
              {content.eyebrow}
            </p>
          </div>
        ) : null}

        <h2
          className="mt-4 font-display text-[clamp(1.65rem,3.5vw+0.5rem,3.5rem)] font-bold leading-[1.08] tracking-tight text-white"
          style={{
            opacity: parallax.title.opacity,
            transform: `translate3d(0, ${parallax.title.y}px, 0)`,
          }}
        >
          {content.title}
        </h2>

        {content.description ? (
          <p
            className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-8"
            style={{
              opacity: parallax.body.opacity,
              transform: `translate3d(0, ${parallax.body.y}px, 0)`,
            }}
          >
            {content.description}
          </p>
        ) : null}

        {content.items ? (
          <ul
            className={cn(
              "mt-6 flex flex-wrap gap-2",
              isCenter && "justify-center",
            )}
            style={{
              opacity: parallax.items.opacity,
              transform: `translate3d(0, ${parallax.items.y}px, 0)`,
            }}
          >
            {content.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-400 backdrop-blur-sm sm:text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function FinalePanel({ parallax }: { parallax: ScrollParallaxState }) {
  const content = SCENE_CONTENT.finale;

  if (parallax.panelOpacity < 0.02) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 top-0 flex items-center justify-start px-4 pb-12 pt-20 sm:px-8 lg:px-12"
      style={{ opacity: parallax.panelOpacity }}
    >
      <div
        id="contacto"
        className="pointer-events-auto w-full max-w-md lg:max-w-[26rem]"
        style={{
          transform: `translate3d(0, ${parallax.title.y}px, 0)`,
        }}
      >
        <div className="surface-glass rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-xl sm:p-7">
          <div
            className="flex items-center gap-3"
            style={{
              opacity: parallax.eyebrow.opacity,
              transform: `translate3d(0, ${parallax.eyebrow.y}px, 0)`,
            }}
          >
            <span className="h-px w-10 bg-gradient-to-r from-purple-500 to-fuchsia-400" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-200">
              {content.eyebrow}
            </p>
          </div>

          <h2
            className="mt-4 font-display text-[clamp(1.5rem,2.8vw+0.4rem,2.35rem)] font-bold leading-tight text-white"
            style={{ opacity: parallax.title.opacity }}
          >
            {content.title}
          </h2>

          {content.description ? (
            <p
              className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base"
              style={{ opacity: parallax.body.opacity }}
            >
              {content.description}
            </p>
          ) : null}

          <div
            className="mt-6 flex flex-col gap-2.5 sm:flex-row"
            style={{ opacity: parallax.body.opacity }}
          >
            <ShimmerButton href={site.phoneHref} className="w-full sm:w-auto">
              <Phone className="mr-2 inline h-4 w-4" aria-hidden />
              Llamar
            </ShimmerButton>
            <ShimmerButton href={`mailto:${site.email}`} variant="outline" className="w-full sm:w-auto">
              Pedir presupuesto
            </ShimmerButton>
          </div>

          <div
            className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
            style={{ opacity: parallax.items.opacity }}
          >
            <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-medium text-white">{site.rating.toFixed(1)} Google</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">{site.award}</span>
          </div>

          <div id="reseñas" className="mt-6 space-y-2.5">
            {FINALE_REVIEWS.map((review) => (
              <blockquote
                key={review.author}
                className="rounded-xl border border-white/8 bg-white/[0.04] px-3.5 py-3 text-left text-[13px] leading-relaxed text-zinc-300"
                style={{ opacity: parallax.items.opacity }}
              >
                <p className="line-clamp-2">“{review.quote}”</p>
                <footer className="mt-2 text-[10px] font-medium uppercase tracking-wider text-purple-300/90">
                  {review.author}
                </footer>
              </blockquote>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl border border-white/8 bg-white/[0.04] p-4"
            style={{ opacity: parallax.items.opacity }}
          >
            <div className="flex items-center gap-2 text-purple-200">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                Ubicación
              </span>
            </div>
            <p className="mt-2.5 text-sm leading-6 text-zinc-300">
              {site.address}
              <br />
              {site.city}
            </p>
            <ul className="mt-3 space-y-1 border-t border-white/8 pt-3 text-xs text-zinc-400">
              {FINALE_HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span className="text-zinc-300">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-purple-300 hover:text-purple-200"
            >
              Abrir en Google Maps →
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200"
            >
              Instagram
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenePanel({ sceneId, progress }: CinematicOverlayProps) {
  const showDiscovery =
    isDiscoveryIntroActive(progress) ||
    (sceneId === "discovery" && progress > 0);

  if (sceneId === "arrival" && !showDiscovery) {
    return null;
  }

  const activeScene: SceneId =
    showDiscovery && sceneId === "arrival" ? "discovery" : sceneId;

  const scene = SCENES.find((s) => s.id === activeScene)!;
  const local =
    activeScene === "discovery" && isDiscoveryIntroActive(progress)
      ? 0
      : getSceneLocalProgress(progress, scene);
  const content = SCENE_CONTENT[activeScene];
  const isCenter = content.align === "center";

  if (activeScene === "finale") {
    return <FinalePanel parallax={sampleScrollParallax(local)} />;
  }

  const parallax =
    activeScene === "discovery"
      ? sampleDiscoveryParallax(local, progress)
      : sampleScrollParallax(local);

  return (
    <ParallaxPanel
      sceneId={activeScene}
      parallax={parallax}
      isCenter={isCenter}
    />
  );
}

export function CinematicOverlay({ sceneId, progress }: CinematicOverlayProps) {
  const scrollHint = sampleScrollHint(progress);
  const showHint = scrollHint.opacity > 0.02;
  const isFinale = sceneId === "finale";

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {isFinale ? (
        <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[#050505]/94 via-[#050505]/72 to-transparent" />
      ) : null}
      <ScenePanel sceneId={sceneId} progress={progress} />
      {!isFinale && showHint ? (
        <div
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center will-change-transform"
          style={{
            opacity: scrollHint.opacity,
            transform: `translate3d(-50%, ${scrollHint.y}px, 0)`,
          }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Desliza
          </span>
          <span className="mx-auto mt-2 block h-8 w-px bg-gradient-to-b from-purple-400/70 to-transparent" />
        </div>
      ) : null}
    </div>
  );
}
