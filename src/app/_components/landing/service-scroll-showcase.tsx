"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ServiceScrollMedia = {
  slug: string;
  title: string;
  description: string;
  category: string;
  videoSrc: string;
  posterSrc: string;
  fallbackPosterSrc?: string;
};

function ServiceBackgroundVideo({
  videoSrc,
  posterSrc,
  fallbackPosterSrc,
  reduceMotion,
}: {
  videoSrc: string;
  posterSrc: string;
  fallbackPosterSrc?: string;
  reduceMotion: boolean | null;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activePoster, setActivePoster] = useState(posterSrc);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setActivePoster(posterSrc);
    setVideoVisible(false);
    setVideoFailed(false);
  }, [posterSrc, videoSrc]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduceMotion) {
      return;
    }

    let cancelled = false;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.loop = true;

    const showVideo = () => {
      if (!cancelled) {
        setVideoVisible(true);
      }
    };

    const handleError = () => {
      if (!cancelled) {
        setVideoFailed(true);
        setVideoVisible(false);
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showVideo();
    }

    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("playing", showVideo);
    video.addEventListener("canplay", showVideo);
    video.addEventListener("error", handleError);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video || cancelled) {
          return;
        }
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("loadeddata", showVideo);
      video.removeEventListener("playing", showVideo);
      video.removeEventListener("canplay", showVideo);
      video.removeEventListener("error", handleError);
    };
  }, [reduceMotion, videoSrc]);

  const mediaClass =
    "hero-media hero-media-oled absolute inset-0 h-full w-full object-cover object-center";

  return (
    <div ref={sectionRef} className="hero-media-stage absolute inset-0 bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activePoster}
        alt=""
        onError={() => {
          if (fallbackPosterSrc && activePoster !== fallbackPosterSrc) {
            setActivePoster(fallbackPosterSrc);
          }
        }}
        className={cn(mediaClass, "z-0")}
      />
      {!reduceMotion && !videoFailed ? (
        <video
          ref={videoRef}
          key={videoSrc}
          className={cn(
            mediaClass,
            "z-[1] transition-opacity duration-700",
            videoVisible ? "opacity-100" : "opacity-0",
          )}
          poster={activePoster}
          muted
          playsInline
          loop
          preload="metadata"
          disablePictureInPicture
          controls={false}
          onError={() => {
            setVideoFailed(true);
            setVideoVisible(false);
          }}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-media-black-crush absolute inset-0 z-[2]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-black/80 via-black/45 to-black/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-2/5 bg-gradient-to-t from-[#050505] to-transparent"
        aria-hidden
      />
    </div>
  );
}

function ServiceChapter({
  item,
  index,
}: {
  item: ServiceScrollMedia;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article
      className="relative min-h-[85svh] overflow-hidden border-b border-white/5 last:border-b-0 sm:min-h-[90svh]"
      aria-label={item.title}
    >
      <ServiceBackgroundVideo
        videoSrc={item.videoSrc}
        posterSrc={item.posterSrc}
        fallbackPosterSrc={item.fallbackPosterSrc}
        reduceMotion={reduceMotion}
      />

      <div className="relative z-10 flex min-h-[85svh] items-center px-4 sm:min-h-[90svh] sm:px-6 lg:px-8">
        <div className="section-shell w-full">
          <div className="max-w-xl">
            <p className="hero-text-shadow text-xs font-medium uppercase tracking-[0.3em] text-purple-300/90">
              {String(index + 1).padStart(2, "0")} · {item.category}
            </p>
            <h3 className="hero-text-shadow mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-white">
              {item.title}
            </h3>
            <p className="hero-text-shadow mt-4 max-w-md text-base leading-7 text-zinc-300 sm:text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

type ServiceScrollShowcaseProps = {
  items: ServiceScrollMedia[];
};

export function ServiceScrollShowcase({ items }: ServiceScrollShowcaseProps) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 sm:mt-14">
      {items.map((item, index) => (
        <ServiceChapter key={item.slug} item={item} index={index} />
      ))}
    </div>
  );
}
