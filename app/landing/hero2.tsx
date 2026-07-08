"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "TUINITY",
  "INTELIGENCIA ARTIFICIAL DE PUNTA,",
  "MANEJANDO LAS OPERACIONES",
  "QUE MUEVEN EL MERCADO.",
];

const grift = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

/* Ventanas (en segundos) sincronizadas a los cortes reales del video.
   Cortes en: 6.07 · 11.70 · 18.03 · 25.10 · 30.07 (duración 38.85s). */
const WINDOWS = {
  headline: [0, 14.9], // frame 0 → mitad del clip de la clínica (11.70–18.03)
  oracle: [6.4, 11.4], // Escena 2 · servidores
  nvidia: [18.4, 24.8], // Escena 4 · GPU
  colon: [25.5, 29.8], // Escena 5 · grúa de puerto
  ready: [30.7, 37.3], // Escena 6 · ciudad de noche (cierra antes del loop)
} as const;

const shadow = "drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]";

// Corta el loop este tanto antes del final para saltarse el frame trabado.
const LOOP_TRIM = 0.45;

export function Hero2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wasOutOfView = useRef(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const onTime = () => {
      const d = video.duration;
      // Reinicia antes del final para saltarse el frame trabado del loop.
      if (d && video.currentTime >= d - LOOP_TRIM) {
        video.currentTime = 0;
        setT(0);
        return;
      }
      setT(video.currentTime);
    };
    video.addEventListener("timeupdate", onTime);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (wasOutOfView.current) {
            video.currentTime = 0;
            video.play();
            wasOutOfView.current = false;
          }
        } else {
          wasOutOfView.current = true;
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      observer.disconnect();
    };
  }, []);

  const on = ([a, b]: readonly [number, number]) => (t >= a && t <= b ? 1 : 0);
  const showHeadline = on(WINDOWS.headline);
  const showOracle = on(WINDOWS.oracle);
  const showNvidia = on(WINDOWS.nvidia);
  const showColon = on(WINDOWS.colon);
  const showReady = on(WINDOWS.ready);

  return (
    <section ref={sectionRef} id="hero2" className="bg-white p-2 sm:p-5 md:p-8">
      <div className="relative">
        <video
          ref={videoRef}
          src="/assets/HeroFinal3.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[70vh] sm:h-auto sm:aspect-21/9 object-cover object-center"
        />

        {/* Scrim para los textos centrados (titular y cierre) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: showHeadline,
            background:
              "radial-gradient(ellipse 82% 72% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Logo Tuinity en blanco, esquina superior izquierda */}
        <div className="pointer-events-none absolute left-4 top-4 z-20 md:left-6 md:top-6">
          <Image
            src="/assets/quimera.svg"
            alt="Tuinity"
            width={1453}
            height={1046}
            priority
            unoptimized
            className="block h-auto w-7 select-none invert md:w-12"
          />
        </div>

        {/* Titular — Escena 1 → mitad de la clínica */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <h2
            className="text-center text-white uppercase leading-[1.06] text-sm sm:text-lg md:text-xl lg:text-2xl transition-opacity duration-700"
            style={{
              fontFamily: 'var(--font-archivo), "Arial Narrow", sans-serif',
              fontWeight: 700,
              fontStretch: "125%",
              opacity: showHeadline,
            }}
          >
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {li === 0 ? (
                  <>
                    <span className="align-middle text-[0.55em]">©</span> {line}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
        </div>

        {/* Oracle — Escena 2 · abajo izquierda */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-5 left-4 z-20 transition-opacity duration-700 md:bottom-8 md:left-8"
          style={{ opacity: showOracle }}
        >
          <Image
            src="/assets/oracle-logo.png"
            alt="Oracle"
            width={2000}
            height={329}
            className={`h-4 w-auto md:h-6 ${shadow}`}
          />
        </div>

        {/* NVIDIA — Escena 4 · arriba derecha */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 z-20 transition-opacity duration-700 md:right-8 md:top-8"
          style={{ opacity: showNvidia }}
        >
          <Image
            src="/assets/nvidia-1371x256.png"
            alt="NVIDIA"
            width={1371}
            height={256}
            className={`h-5 w-auto md:h-7 ${shadow}`}
          />
        </div>

        {/* Caption de cine — Escena 5 · abajo izquierda */}
        <div
          className="pointer-events-none absolute bottom-6 left-4 z-20 transition-opacity duration-700 md:bottom-10 md:left-8"
          style={{ opacity: showColon }}
        >
          <span className={`mb-2 block h-px w-8 bg-white/80 ${shadow}`} />
          <p
            className={`text-white text-base tracking-wide md:text-lg ${shadow}`}
            style={grift}
          >
            Provincia de Colón, Panamá.
          </p>
        </div>

        {/* Tint de la escena de ciudad */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: showReady,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Cierre — Escena 6 · ciudad de noche */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[16%] z-20 flex justify-center px-6 transition-opacity duration-1000"
          style={{ opacity: showReady }}
        >
          <p
            className={`text-center text-white text-xs uppercase leading-tight tracking-[0.2em] md:text-sm ${shadow}`}
            style={{
              fontFamily: 'var(--font-archivo), "Arial Narrow", sans-serif',
              fontWeight: 300,
              fontStretch: "110%",
            }}
          >
            ¿Listo para la nueva era?
          </p>
        </div>
      </div>
    </section>
  );
}
