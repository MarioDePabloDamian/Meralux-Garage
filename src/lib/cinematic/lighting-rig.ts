import { LIGHTING_KEYFRAMES, SCENE_LIGHTING_PRESETS } from "./scene-config";
import { findKeyframeSegment, lerp, smoothstep } from "./easing";
import { DISCOVERY_SCENE_START } from "./scroll-timeline";
import type { LightingKeyframe } from "./types";

export type LightingState = LightingKeyframe;

export function sampleLighting(progress: number): LightingState {
  if (progress <= DISCOVERY_SCENE_START) {
    const t = smoothstep(0, 1, progress / DISCOVERY_SCENE_START);
    const from = SCENE_LIGHTING_PRESETS.arrival;
    const to = SCENE_LIGHTING_PRESETS.discovery;
    return {
      progress,
      ambient: lerp(from.ambient, to.ambient, t),
      keyIntensity: lerp(from.keyIntensity, to.keyIntensity, t),
      rimIntensity: lerp(from.rimIntensity, to.rimIntensity, t),
      envIntensity: lerp(from.envIntensity, to.envIntensity, t),
      exposure: lerp(from.exposure, to.exposure, t),
      wrapMix: lerp(from.wrapMix, to.wrapMix, t),
      fogOpacity: lerp(from.fogOpacity, to.fogOpacity, t),
    };
  }

  const tailProgress = smoothstep(DISCOVERY_SCENE_START, 1, progress);
  const remapped = DISCOVERY_SCENE_START + tailProgress * (1 - DISCOVERY_SCENE_START);
  const { from, to, t } = findKeyframeSegment(LIGHTING_KEYFRAMES, remapped);
  return {
    progress,
    ambient: lerp(from.ambient, to.ambient, t),
    keyIntensity: lerp(from.keyIntensity, to.keyIntensity, t),
    rimIntensity: lerp(from.rimIntensity, to.rimIntensity, t),
    envIntensity: lerp(from.envIntensity, to.envIntensity, t),
    exposure: lerp(from.exposure, to.exposure, t),
    wrapMix: lerp(from.wrapMix, to.wrapMix, t),
    fogOpacity: lerp(from.fogOpacity, to.fogOpacity, t),
  };
}
