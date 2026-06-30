"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import {
  MERALUX_POSTER_ASSET_BASE,
  MERALUX_POSTER_LAYER_FILES,
  MeraluxWrapPoster,
} from "@/blocks/meralux-wrap-poster";
import { MODEL_URL } from "@/lib/cinematic/scene-config";
import { site } from "@/lib/site-data";

export const MERALUX_POSTER_BACKGROUND = "transparent";

/** Monta la experiencia 3D un poco antes de que termine el wipe del logo */
export const EXPERIENCE_MOUNT_MS = 3_800;
/** Dispara el fade-out del póster (logo spring ~4s + delays) */
export const INTRO_EXIT_MS = 5_200;

export function preloadCinematicAssets(): void {
  useGLTF.preload(MODEL_URL);

  for (const file of MERALUX_POSTER_LAYER_FILES) {
    const image = new Image();
    image.src = `${MERALUX_POSTER_ASSET_BASE}/${file}`;
  }

  const logo = new Image();
  logo.src = site.media.logoTransparent;
}

type MeraluxPosterIntroProps = {
  className?: string;
};

export function MeraluxPosterIntro({ className }: MeraluxPosterIntroProps) {
  useEffect(() => {
    preloadCinematicAssets();
  }, []);

  return (
    <MeraluxWrapPoster
      className={className}
      duration={3.6}
      background={MERALUX_POSTER_BACKGROUND}
      showReplay={false}
      cameraScale={1.14}
      depth={1}
      fit={0.96}
      logoBlur={4}
    />
  );
}
