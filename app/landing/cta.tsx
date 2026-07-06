"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cardClass =
  "group flex justify-between items-center gap-4 bg-[#141414] hover:bg-[#1c1c1c] px-8 md:px-10 py-7 md:py-9 w-full text-white text-left transition-colors cursor-pointer";

const cardStyle = {
  clipPath: "polygon(2.5rem 0, 100% 0, 100% 100%, 0 100%, 0 2.5rem)",
} as const;

const titleClass = "text-3xl md:text-4xl leading-tight";
const titleStyle = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

const arrowClass =
  "size-6 md:size-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1";

export function Cta() {
  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 mx-auto px-4 md:px-8 max-w-6xl">
        <Link
          href="https://wa.me/50768497142"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          style={cardStyle}
        >
          <span className={titleClass} style={titleStyle}>
            Hablemos
          </span>
          <ArrowUpRight className={arrowClass} />
        </Link>

        <button
          type="button"
          onClick={scrollToProducts}
          className={cardClass}
          style={cardStyle}
        >
          <span className={titleClass} style={titleStyle}>
            Nuestros productos
          </span>
          <ArrowUpRight className={arrowClass} />
        </button>
      </div>
    </section>
  );
}
