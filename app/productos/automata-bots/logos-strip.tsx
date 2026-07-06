"use client";

import { useEffect, useRef, useState } from "react";

type Logo = { label: string; icon: React.ReactNode };

export function LogosStrip({ logos }: { logos: Logo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(rm);
    if (rm) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShow(true);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center items-center">
      {logos.map(({ icon, label }, i) => (
        <div key={label} className="flex items-center">
          <span
            className="text-neutral-800"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(10px)",
              transition: reduce
                ? "none"
                : "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: `${i * 170}ms`,
            }}
          >
            {icon}
          </span>
          {i < logos.length - 1 && (
            <span
              className="bg-neutral-300 mx-4 md:mx-7 h-px origin-left"
              style={{
                width: "clamp(24px, 5vw, 80px)",
                transform: show ? "scaleX(1)" : "scaleX(0)",
                transition: reduce ? "none" : "transform 0.5s ease",
                transitionDelay: `${i * 170 + 90}ms`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
