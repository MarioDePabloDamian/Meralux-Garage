export type SceneId =
  | "arrival"
  | "discovery"
  | "details"
  | "craftsmanship"
  | "process"
  | "transformation"
  | "finale";

export type SceneDefinition = {
  id: SceneId;
  start: number;
  end: number;
  label: string;
};

export type CameraKeyframe = {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  carRotation: number;
};

export type LightingKeyframe = {
  progress: number;
  ambient: number;
  keyIntensity: number;
  rimIntensity: number;
  envIntensity: number;
  exposure: number;
  wrapMix: number;
  fogOpacity: number;
};
