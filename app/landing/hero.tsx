"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PHRASE = "Tu llave a la nueva era";
const TRIGGER_BEFORE_END = 1.2; // segundos antes del último frame
const CHAR_STAGGER = 45; // ms de retraso entre letra y letra

type Stage = "idle" | "line" | "text";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasOutOfView = useRef(false);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const trigger = () => setStage((s) => (s === "idle" ? "line" : s));
    const onTimeUpdate = () => {
      if (
        video.duration &&
        video.duration - video.currentTime <= TRIGGER_BEFORE_END
      ) {
        trigger();
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", trigger);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (wasOutOfView.current) {
            setStage("idle");
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

    observer.observe(video);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", trigger);
      observer.disconnect();
    };
  }, []);

  const revealed = stage === "text";

  return (
    <section id="hero" className="relative">
      <video
        ref={videoRef}
        src="/assets/HeroVideo.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-svh object-cover md:h-auto"
      />

      <div className="pointer-events-none absolute left-4 top-4 md:left-6 md:top-6">
        <div className="relative p-0 md:p-5">
          <div
            className="bracket-zoom absolute inset-0 origin-center hidden md:block"
            style={{
              animation:
                "bracket-zoom 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both",
            }}
          >
            <span className="absolute left-0 top-0 size-3.5 border-l border-t border-neutral-900" />
            <span className="absolute right-0 top-0 size-3.5 border-r border-t border-neutral-900" />
            <span className="absolute bottom-0 left-0 size-3.5 border-b border-l border-neutral-900" />
            <span className="absolute right-0 bottom-0 size-3.5 border-r border-b border-neutral-900" />
          </div>
          <Image
            src="/assets/quimera.svg"
            alt="Tuinity"
            width={1453}
            height={1046}
            priority
            unoptimized
            className="block h-auto w-12 md:w-32 select-none"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[15%] left-1/2 -translate-x-1/2 md:bottom-auto md:left-[63%] md:top-[45%] md:translate-x-0 flex translate-y-0 md:-translate-y-1/2 items-center gap-0 md:gap-3">
        <div
          onTransitionEnd={() => {
            if (stage === "line") setStage("text");
          }}
          className={`origin-left bg-neutral-900/70 opacity-0 md:opacity-100 w-0 md:w-[clamp(32px,7vw,120px)] transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage === "idle" ? "scale-x-0" : "scale-x-100"
          }`}
          style={{ height: "0.5px" }}
        />
        <span
          className="whitespace-nowrap text-neutral-900 text-[15px] md:text-[clamp(11px,0.95vw,14px)]"
          style={{
            fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
            fontWeight: 300,
          }}
        >
          {PHRASE.split("").map((ch, i) => (
            <span
              key={i}
              className="inline-block transition-[opacity,filter] duration-500 ease-out"
              style={{
                opacity: revealed ? 1 : 0,
                filter: revealed ? "blur(0px)" : "blur(5px)",
                transitionDelay: revealed ? `${i * CHAR_STAGGER}ms` : "0ms",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}
