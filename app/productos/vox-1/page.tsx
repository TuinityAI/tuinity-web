import type { Metadata } from "next";
import { getProduct } from "../data";
import { CtaCard, ExploreMore, grift } from "../_ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FeatureCards } from "./feature-cards";

const product = getProduct("vox-1")!;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

export default function Vox1Page() {
  return (
    <article className="bg-white text-neutral-950">

      {/* Hero en video, estilo Swiss */}
      <header className="relative bg-black border-neutral-200 border-b overflow-hidden">
        <video
          src="/assets/Hero-Vox-1-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[70vh] min-h-[440px] md:h-[88vh] object-cover object-[66%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 40%, transparent 66%)",
          }}
        />

        {/* Título vertical pegado al borde izquierdo */}
        <h1
          className="top-1/2 left-1 sm:left-3 md:left-5 absolute whitespace-nowrap text-white text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-none"
          style={{
            ...grift,
            writingMode: "vertical-rl",
            transform: "translateY(-50%) rotate(180deg)",
          }}
        >
          {product.name}
        </h1>

        {/* Descripción en una sola línea */}
        <p className="bottom-6 md:bottom-12 left-4 md:left-8 absolute whitespace-nowrap font-light text-neutral-300 text-[10px] sm:text-xs md:text-sm lg:text-base leading-snug">
          {product.tagline}
        </p>
      </header>

      {/* Declaración */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 py-16 md:py-24 max-w-5xl">
          <p
            className="max-w-3xl text-neutral-900 text-3xl md:text-5xl leading-tight"
            style={grift}
          >
            {product.overview}
          </p>
        </section>
      </ScrollReveal>

      {/* Features en tarjetas con esquina cortada */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 pb-16 md:pb-24 max-w-6xl">
          <p className="mb-6 md:mb-8 text-neutral-500 text-sm md:text-base">
            Features
          </p>
          <FeatureCards capabilities={product.capabilities} />
        </section>
      </ScrollReveal>

      {/* Frase grotesque, fondo claro (estilo Anduril) */}
      <ScrollReveal>
        <section className="bg-white px-4 md:px-8 py-24 md:py-36 text-center text-neutral-950">
          <p
            className="mx-auto max-w-5xl uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
            style={{
              fontFamily: 'var(--font-archivo), "Arial Narrow", sans-serif',
              fontWeight: 700,
              fontStretch: "125%",
            }}
          >
            Nunca duerme. Nunca pierde un cliente.
          </p>
        </section>
      </ScrollReveal>

      <div className="bg-white pt-20 md:pt-28">
        <CtaCard name={product.name} />
        <ExploreMore currentSlug={product.slug} />
      </div>
    </article>
  );
}
