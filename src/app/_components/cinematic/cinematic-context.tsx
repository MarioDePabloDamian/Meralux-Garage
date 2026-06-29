"use client";

import { createContext, useContext } from "react";
import type { SceneId } from "@/lib/cinematic/types";

export type CinematicContextValue = {
  progress: number;
  sceneId: SceneId;
};

export const CinematicContext = createContext<CinematicContextValue>({
  progress: 0,
  sceneId: "arrival",
});

export function useCinematic() {
  return useContext(CinematicContext);
}
