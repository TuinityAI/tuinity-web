"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Manifesto() {
  const reduce = useReducedMotion();
  return (
    <section id="manifesto" className="bg-white text-neutral-950">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 py-24 md:py-40">
        <motion.h2
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.13 }}
          className="mx-auto max-w-5xl text-center text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.06] tracking-tight"
          style={{
            fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
            fontWeight: 300,
          }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block text-neutral-400"
              variants={lineVariants}
            >
              El trabajo repetitivo
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span
              className="block text-neutral-950"
              variants={lineVariants}
            >
              ya no es trabajo humano.
            </motion.span>
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
