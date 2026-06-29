"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FloatingCtaProps = {
  phoneHref: string;
  contactHref?: string;
};

export function FloatingCta({
  phoneHref,
  contactHref = "#contacto",
}: FloatingCtaProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex gap-2 transition-all duration-300 md:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={phoneHref}
        className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full border border-purple-400/35 bg-black/85 text-sm font-medium text-purple-100 backdrop-blur-xl transition-colors duration-200 hover:bg-purple-500/15"
      >
        Llamar
      </a>
      <a
        href={contactHref}
        className="inline-flex min-h-11 flex-[1.4] cursor-pointer items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.4)] transition-colors duration-200 hover:bg-purple-500"
      >
        Presupuesto
      </a>
    </div>
  );
}
