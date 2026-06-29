"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { memo, useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export const CinematicNavbar = memo(function CinematicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 mx-auto max-w-7xl rounded-2xl border transition-all duration-500 sm:inset-x-4 lg:inset-x-8",
        scrolled
          ? "border-purple-500/25 bg-black/80 shadow-[0_8px_32px_rgba(124,58,237,0.2)] backdrop-blur-2xl"
          : "border-white/5 bg-black/35 backdrop-blur-xl",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 lg:px-6">
        <Link href="#" className="flex min-h-11 shrink-0 items-center gap-3">
          <Image
            src={site.media.logo}
            alt={site.name}
            width={140}
            height={89}
            className="h-9 w-auto object-contain sm:h-10 lg:h-12"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative cursor-pointer py-2 text-sm uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-200 hover:text-purple-300"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-purple-500/30 px-4 py-2 text-sm text-purple-100 transition-colors duration-200 hover:border-purple-400 hover:bg-purple-500/10"
          >
            Llamar
          </a>
          <a
            href="#contacto"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-200 hover:bg-purple-500"
          >
            Presupuesto
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-200 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center text-sm uppercase tracking-[0.2em] text-zinc-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
});
