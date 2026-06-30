"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MeraluxCinematicExperience } from "./MeraluxCinematicExperience";
import { CinematicLightPillar } from "./CinematicLightPillar";
import {
  INTRO_EXIT_MS,
  MeraluxPosterIntro,
  preloadCinematicAssets,
} from "./MeraluxPosterIntro";
import { MERALUX_INTRO_COMPLETE_EVENT } from "@/lib/cinematic/events";

export function MeraluxHome() {
  const searchParams = useSearchParams();
  const holdPoster = searchParams.get("poster") === "1";
  const reduceMotion = useReducedMotion();
  const skipIntro = reduceMotion === true;

  const [showIntro, setShowIntro] = useState(!skipIntro);
  const [showExperience, setShowExperience] = useState(skipIntro);

  useEffect(() => {
    if (skipIntro) {
      preloadCinematicAssets();
      return;
    }

    preloadCinematicAssets();

    if (holdPoster) return;

    const exitTimer = window.setTimeout(() => {
      setShowIntro(false);
      setShowExperience(true);
    }, INTRO_EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [holdPoster, skipIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyTouchAction: body.style.touchAction,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.touchAction = "none";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.touchAction = prev.bodyTouchAction;
      window.scrollTo(0, scrollY);
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showExperience || showIntro) return;

    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event(MERALUX_INTRO_COMPLETE_EVENT));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [showExperience, showIntro]);

  return (
    <>
      <div className="fixed inset-0 z-0" aria-hidden>
        <CinematicLightPillar />
      </div>

      {showExperience ? <MeraluxCinematicExperience /> : null}

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="meralux-poster-intro"
            className="fixed inset-0 z-[100] bg-transparent"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.33, 0, 0.2, 1] }}
          >
            <MeraluxPosterIntro />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
