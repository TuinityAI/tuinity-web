"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HaloHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-black w-full h-svh min-h-[560px] overflow-hidden">
      <video
        src="/assets/HeroHalo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 flex justify-center items-center px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative flex flex-col items-center"
        >
          <Image
            src="/assets/LogoHalo.svg"
            alt="Halo"
            width={800}
            height={300}
            className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] h-auto invert"
          />
          <div className="flex items-center gap-2.5 mt-6 text-white/60">
            <span className="text-sm md:text-base">Powered by</span>
            <Image
              src="/assets/quimera.svg"
              alt="Tuinity"
              width={120}
              height={86}
              className="opacity-70 w-auto h-5 md:h-6 invert"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
