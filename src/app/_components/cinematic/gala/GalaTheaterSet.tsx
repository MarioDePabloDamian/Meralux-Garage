"use client";

import { GalaLogoFloor } from "./GalaLogoFloor";

type GalaTheaterSetProps = {
  mobile: boolean;
};

export function GalaTheaterSet({ mobile }: GalaTheaterSetProps) {
  return (
    <group>
      <GalaLogoFloor mobile={mobile} />
    </group>
  );
}
