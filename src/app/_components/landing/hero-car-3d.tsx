"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { cn } from "@/lib/utils";

const MODEL_URL = "/models/hero-car.glb";
const ROTATION_SPEED = 0.14;
const MOUSE_INFLUENCE = 0.22;
const MOUSE_TILT = 0.07;
const LERP = 0.045;

type HeroCar3DProps = {
  className?: string;
};

export function HeroCar3D({ className }: HeroCar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reduceMotion) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width < 8 || height < 8) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.6);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.85, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(4, 6, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xa855f7, 0.55);
    rim.position.set(-5, 2, -3);
    scene.add(rim);

    const fill = new THREE.AmbientLight(0x1a1028, 0.35);
    scene.add(fill);

    const pivot = new THREE.Group();
    scene.add(pivot);

    const targetMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let autoRotation = 0;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        model.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          child.castShadow = false;
          child.receiveShadow = false;
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          for (const mat of mats) {
            if (!(mat instanceof THREE.MeshStandardMaterial)) continue;
            mat.envMapIntensity = 1.05;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.35 / maxDim;
        model.scale.setScalar(scale);
        model.rotation.y = Math.PI * 0.12;
        pivot.add(model);
      },
      undefined,
      () => {
        /* fallo silencioso: el hero sigue sin 3D */
      },
    );

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetMouse.x = THREE.MathUtils.clamp(nx, -1, 1);
      targetMouse.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width < 8 || height < 8) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      autoRotation += ROTATION_SPEED * 0.01;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * LERP;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * LERP;

      pivot.rotation.y = autoRotation + smoothMouse.x * MOUSE_INFLUENCE;
      pivot.rotation.x = smoothMouse.y * -MOUSE_TILT;
      pivot.rotation.z = smoothMouse.x * MOUSE_TILT * 0.35;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      pmrem.dispose();
      env.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          for (const mat of mats) mat.dispose();
        }
      });
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div
        ref={containerRef}
        className="absolute inset-y-[8%] right-[-8%] w-[min(92vw,720px)] opacity-90 sm:inset-y-[6%] sm:right-[-4%] lg:right-[-2%] lg:w-[58%] lg:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      <div className="absolute bottom-[18%] left-[42%] h-24 w-[38%] rounded-full bg-purple-600/10 blur-3xl lg:left-[48%]" />
    </div>
  );
}
