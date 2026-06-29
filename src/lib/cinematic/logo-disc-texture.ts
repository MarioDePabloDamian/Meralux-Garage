import * as THREE from "three";
import { LOGO_WORLD_WIDTH } from "./scene-config";

/** Negro del fondo del PNG del logo */
export const LOGO_BLACK = "#000000";

const CORNER_CLEARANCE = 1.008;
const TEXTURE_RESOLUTION = 2048;

export type LogoDiscLayout = {
  radius: number;
  logoWidth: number;
  logoHeight: number;
};

export function computeLogoDiscLayout(
  image: HTMLImageElement | undefined,
  scale: number,
): LogoDiscLayout {
  const aspectRatio =
    image?.width && image?.height ? image.height / image.width : 1;
  const logoWidth = LOGO_WORLD_WIDTH * scale;
  const logoHeight = logoWidth * aspectRatio;
  const halfDiagonal = Math.hypot(logoWidth / 2, logoHeight / 2);

  return {
    radius: halfDiagonal * CORNER_CLEARANCE,
    logoWidth,
    logoHeight,
  };
}

/** Textura única: círculo negro + logo centrado (mismo negro en todo el disco) */
export function createLogoDiscTexture(
  logoImage: HTMLImageElement,
  layout: LogoDiscLayout,
): THREE.CanvasTexture {
  const size = TEXTURE_RESOLUTION;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo crear el contexto 2D para el disco del logo");
  }

  const center = size / 2;
  const discRadius = size / 2;

  ctx.fillStyle = LOGO_BLACK;
  ctx.beginPath();
  ctx.arc(center, center, discRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, discRadius, 0, Math.PI * 2);
  ctx.clip();

  const logoFraction = layout.logoWidth / (layout.radius * 2);
  const drawWidth = size * logoFraction;
  const drawHeight = (drawWidth / logoImage.width) * logoImage.height;

  ctx.drawImage(
    logoImage,
    center - drawWidth / 2,
    center - drawHeight / 2,
    drawWidth,
    drawHeight,
  );
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

export function disposeLogoDiscTexture(texture: THREE.CanvasTexture | null) {
  if (!texture) return;
  texture.dispose();
  const canvas = texture.image as HTMLCanvasElement | undefined;
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}
