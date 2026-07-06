"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const grift = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

type Item = { title: string; description: string };

export function ConnectFlow({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-10 md:mt-16">
      {/* Barra vertical: riel + relleno según el scroll */}
      <div className="top-2 bottom-2 left-2 md:left-3 absolute bg-neutral-800 w-px -translate-x-1/2">
        <motion.div
          className="top-0 left-0 absolute bg-white w-full"
          style={reduce ? { height: "100%" } : { height: fillHeight }}
        />
      </div>

      {items.map((it, i) => (
        <motion.div
          key={it.title}
          className="relative last:pb-0 pb-14 md:pb-20 pl-10 md:pl-16"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Punto sobre la barra */}
          <span className="top-1.5 left-2 md:left-3 absolute bg-white ring-4 ring-black rounded-full size-3.5 -translate-x-1/2" />

          <span className="font-mono text-neutral-500 text-xs">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className="mt-2 text-white text-2xl md:text-4xl leading-tight"
            style={grift}
          >
            {it.title}
          </h3>
          <p className="mt-3 max-w-xl text-neutral-400 text-sm md:text-base leading-relaxed">
            {it.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
