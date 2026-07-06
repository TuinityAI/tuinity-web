import type { Metadata } from "next";
import { getProduct } from "../data";
import { CtaCard, ExploreMore, grift } from "../_ui";
import { ScrollReveal } from "@/components/scroll-reveal";

const product = getProduct("vox-1")!;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

const WAVE = Array.from({ length: 56 });

function TrackWave({ seed }: { seed: number }) {
  return (
    <div className="flex items-center gap-[3px] w-full h-10 md:h-14">
      {WAVE.map((_, i) => {
        const h = Math.min(
          100,
          16 +
            Math.abs(Math.sin(i * 0.5 + seed) + 0.5 * Math.sin(i * 1.3 + seed * 2)) *
              62,
        );
        return (
          <span
            key={i}
            className="flex-1 bg-neutral-600 group-hover:bg-neutral-300 rounded-full min-w-[2px] transition-colors"
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  );
}

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
          <div className="gap-4 md:gap-5 grid sm:grid-cols-2 lg:grid-cols-4">
            {product.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="group relative flex flex-col bg-neutral-950 p-6 md:p-7 min-h-[360px] md:min-h-[420px] text-white"
                style={{
                  clipPath:
                    "polygon(1.75rem 0, 100% 0, 100% 100%, 0 100%, 0 1.75rem)",
                }}
              >
                <div>
                  <span className="font-mono text-neutral-500 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-3 text-2xl md:text-[1.7rem] leading-tight"
                    style={grift}
                  >
                    {cap.title}
                  </h3>
                </div>
                <div className="flex flex-1 items-center py-8">
                  <TrackWave seed={i * 4.7 + 1} />
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
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
