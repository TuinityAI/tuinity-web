"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const SAMPLE_Y = 66; // punto de muestreo justo debajo de la barra (alto 56 + margen)

/* Lee el color de fondo efectivo bajo un punto de la pantalla, subiendo por
   los ancestros hasta encontrar una capa opaca. Devuelve true si es oscuro. */
function isDarkAt(x: number, y: number): boolean {
  let el = document.elementFromPoint(x, y) as HTMLElement | null;
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(",").map((s) => parseFloat(s.trim()));
      const a = p[3] === undefined ? 1 : p[3];
      if (a > 0.4) {
        const luminance = 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
        return luminance < 140;
      }
    }
    el = el.parentElement;
  }
  return false; // por defecto, fondo claro
}

export function ProductNav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const raf = useRef(0);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const update = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 12);
      setDark(isDarkAt(window.innerWidth / 2, SAMPLE_Y));
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  // Re-muestrea al cambiar de página (el layout persiste entre productos).
  useEffect(() => {
    const id = setTimeout(update, 60);
    return () => clearTimeout(id);
  }, [pathname, update]);

  const fg = dark ? "text-white" : "text-neutral-900";
  const hoverBg = dark ? "hover:bg-white/15" : "hover:bg-neutral-950/[0.07]";

  /* Liquid glass: blur alto + saturación y vidrio muy claro, casi sin tinte.
     Barra rectangular pegada arriba, transparente hasta que hay scroll. */
  const glass = scrolled
    ? dark
      ? "border-white/8 bg-white/[0.015] shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl backdrop-saturate-[1.8]"
      : "border-white/40 bg-white/[0.08] shadow-[inset_0_-1px_0_rgba(255,255,255,0.20)] backdrop-blur-xl backdrop-saturate-[1.8]"
    : "border-transparent bg-transparent shadow-none";

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative h-14 border-b transition-all duration-500 ${glass}`}
      >
        {/* Reflejo del vidrio */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-linear-to-b transition-opacity duration-500 ${
            dark ? "from-white/4" : "from-white/15"
          } via-transparent to-transparent ${scrolled ? "opacity-100" : "opacity-0"}`}
        />

        <div className="relative mx-auto grid h-full max-w-screen-2xl grid-cols-3 items-center px-4 md:px-8">
          {/* Volver */}
          <div className="flex justify-start">
            <Link
              href="/#products"
              aria-label="Volver a productos"
              className={`pointer-events-auto inline-flex size-9 items-center justify-center rounded-full transition-colors ${fg} ${hoverBg}`}
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </Link>
          </div>

          {/* Logo central — quimera */}
          <div className="flex justify-center">
            <Link
              href="/"
              aria-label="Tuinity — inicio"
              className="pointer-events-auto inline-flex select-none items-center"
            >
              <Image
                src="/assets/quimera.svg"
                alt="Tuinity"
                width={42}
                height={30}
                priority
                className={`h-7 w-auto transition duration-300 md:h-8 ${
                  dark ? "invert" : ""
                }`}
              />
            </Link>
          </div>

          {/* Balance de la rejilla */}
          <div aria-hidden />
        </div>
      </div>
    </motion.header>
  );
}
