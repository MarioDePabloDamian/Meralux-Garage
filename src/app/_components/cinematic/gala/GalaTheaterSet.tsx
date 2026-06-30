"use client";

import { GalaLogoFloor } from "./GalaLogoFloor";
import { GalaScrollHint } from "./GalaScrollHint";

type GalaTheaterSetProps = {
  mobile: boolean;
  progressRef: React.RefObject<number>;
};

export function GalaTheaterSet({ mobile, progressRef }: GalaTheaterSetProps) {
  return (
    <group>
      <GalaLogoFloor mobile={mobile} />
      <GalaScrollHint mobile={mobile} progressRef={progressRef} />
    </group>
  );
}
