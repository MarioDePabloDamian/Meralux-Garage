"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MeraluxCinematicExperience } from "./MeraluxCinematicExperience";
import { CinematicLightPillar } from "./CinematicLightPillar";
import {
  EXPERIENCE_MOUNT_MS,
  INTRO_EXIT_MS,
  MeraluxPosterIntro,
  preloadCinematicAssets,
} from "./MeraluxPosterIntro";

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

    const mountTimer = window.setTimeout(
      () => setShowExperience(true),
      EXPERIENCE_MOUNT_MS,
    );
    const exitTimer = window.setTimeout(
      () => setShowIntro(false),
      INTRO_EXIT_MS,
    );

    return () => {
      window.clearTimeout(mountTimer);
      window.clearTimeout(exitTimer);
    };
  }, [holdPoster, skipIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

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
