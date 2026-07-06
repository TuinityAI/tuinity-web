import type { Metadata } from "next";
import { getProduct } from "../data";
import { CtaCard, ExploreMore, grift } from "../_ui";
import { HaloHero } from "./hero";
import { CortexOrb } from "@/components/cortex-orb";
import { ScrollReveal } from "@/components/scroll-reveal";

const product = getProduct("halo")!;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

export default function HaloPage() {
  return (
    <article className="bg-white text-neutral-950">
      <HaloHero />

      {/* Declaración */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 py-10 md:py-16 max-w-5xl">
          <p
            className="max-w-3xl text-neutral-900 text-3xl md:text-5xl leading-tight"
            style={grift}
          >
            {product.overview}
          </p>
        </section>
      </ScrollReveal>

      {/* Cortex — tu acompañante */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 py-12 md:py-18 max-w-6xl">
          <div className="items-center gap-12 md:gap-16 grid md:grid-cols-2">
            <div>
              <h2
                className="mt-5 text-4xl md:text-6xl leading-[1.05]"
                style={grift}
              >
                Conoce tu operación, en tiempo real.
              </h2>
              <p className="mt-6 max-w-md text-neutral-600 text-lg leading-relaxed">
                Cortex es el copiloto de Halo: pregúntale a tus datos en español y
                obtén respuestas al instante. Ventas, citas, tickets, rendimiento, costos y más.
              </p>
            </div>
            <div className="flex justify-center">
              <CortexOrb className="w-[min(52vmin,380px)] aspect-square" />
            </div>
          </div>
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
                className="relative flex flex-col bg-neutral-950 p-6 md:p-7 min-h-[260px] md:min-h-[320px] text-white"
                style={{
                  clipPath:
                    "polygon(1.75rem 0, 100% 0, 100% 100%, 0 100%, 0 1.75rem)",
                }}
              >
                <span className="font-mono text-neutral-500 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-3 text-2xl md:text-[1.7rem] leading-tight"
                  style={grift}
                >
                  {cap.title}
                </h3>
                <p className="mt-auto pt-8 text-neutral-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <CtaCard name={product.name} />
      <ExploreMore currentSlug={product.slug} />
    </article>
  );
}
