"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicContext } from "./cinematic-context";
import { CinematicOverlay } from "./CinematicOverlay";
import { CinematicFallback } from "./CinematicFallback";
import { SCROLL_TRACK_VH, getSceneAtProgress } from "@/lib/cinematic/scroll-timeline";
import type { SceneId } from "@/lib/cinematic/types";
import { FloatingCta } from "@/app/_components/ui/floating-cta";
import { site } from "@/lib/site-data";

const CinematicCanvas = dynamic(
  () => import("./CinematicCanvas").then((m) => m.CinematicCanvas),
  { ssr: false },
);

function hasWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function MeraluxCinematicExperience() {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState(true);
  const [sceneId, setSceneId] = useState<SceneId>("arrival");
  const [progress, setProgress] = useState(0);

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    if (reduceMotion || !webgl) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      pin,
      scrub: 0.95,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setProgress(self.progress);
        const scene = getSceneAtProgress(self.progress);
        setSceneId((prev) => (prev === scene.id ? prev : scene.id));
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    window.visualViewport?.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.visualViewport?.removeEventListener("resize", refresh);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduceMotion, webgl]);

  if (reduceMotion || !webgl) {
    return <CinematicFallback />;
  }

  return (
    <CinematicContext.Provider value={{ progress, sceneId }}>
      <div className="relative text-white">
        <FloatingCta phoneHref={site.phoneHref} />

        <div
          ref={trackRef}
          style={{ height: `${SCROLL_TRACK_VH}vh` }}
          className="relative"
          aria-label="Experiencia cinematográfica Meralux Garage"
        >
          <div ref={pinRef} className="studio-black-unify relative h-[100dvh] w-full overflow-hidden">
            <CinematicCanvas progressRef={progressRef} />
            <CinematicOverlay sceneId={sceneId} progress={progress} />
          </div>
        </div>
      </div>
    </CinematicContext.Provider>
  );
}
