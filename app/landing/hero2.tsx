"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "TUINITY",
  "INTELIGENCIA ARTIFICIAL DE PUNTA,",
  "MANEJANDO LAS OPERACIONES",
  "QUE MUEVEN EL MERCADO.",
];

export function Hero2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wasOutOfView = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // El texto se muestra en la primera mitad del video y desaparece a la mitad.
    const onTime = () => {
      if (video.duration) {
        setVisible(video.currentTime < video.duration * 0.68);
      }
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

  return (
    <section ref={sectionRef} id="hero2" className="bg-white p-2 sm:p-5 md:p-8">
      <div className="relative">
        <video
          ref={videoRef}
          src="/assets/Hero2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[70vh] sm:h-auto sm:aspect-21/9 object-cover object-center"
        />

        {/* Scrim para legibilidad, se desvanece junto al texto */}
        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: visible ? 1 : 0,
            background:
              "radial-gradient(ellipse 82% 72% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h2
            className="text-center text-white uppercase leading-[1.06] text-sm sm:text-lg md:text-xl lg:text-2xl transition-opacity duration-700"
            style={{
              fontFamily: 'var(--font-archivo), "Arial Narrow", sans-serif',
              fontWeight: 700,
              fontStretch: "125%",
              opacity: visible ? 1 : 0,
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
      </div>
    </section>
  );
}
