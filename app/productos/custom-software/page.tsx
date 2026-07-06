import type { Metadata } from "next";
import { getProduct } from "../data";
import { CornerMark, CtaCard, ExploreMore, Label, grift } from "../_ui";
import { ScrollReveal } from "@/components/scroll-reveal";

const product = getProduct("custom-software")!;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

export default function CustomSoftwarePage() {
  return (
    <article className="bg-[#fafafa] text-neutral-950">
      {/* Hero blueprint */}
      <header className="relative border-neutral-200 border-b overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 [background-size:34px_34px] [background-image:linear-gradient(#e7e7e7_1px,transparent_1px),linear-gradient(90deg,#e7e7e7_1px,transparent_1px)]"
        />
        <div className="relative mx-auto px-4 md:px-8 py-20 md:py-28 max-w-screen-2xl">
          <div aria-hidden className="absolute inset-x-4 md:inset-x-8 inset-y-8 text-neutral-400 pointer-events-none">
            <CornerMark className="top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2" />
            <CornerMark className="top-0 right-0 absolute translate-x-1/2 -translate-y-1/2" />
            <CornerMark className="bottom-0 left-0 absolute -translate-x-1/2 translate-y-1/2" />
            <CornerMark className="right-0 bottom-0 absolute translate-x-1/2 translate-y-1/2" />
          </div>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95]"
            style={grift}
          >
            {product.name}
          </h1>
          <p className="mt-8 font-mono text-neutral-500 text-sm">
          </p>
          <p className="mt-4 max-w-2xl text-neutral-700 text-xl md:text-2xl leading-snug">
            {product.tagline}
          </p>
        </div>
      </header>

      {/* Resumen */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 py-16 md:py-20 max-w-screen-2xl">
          <div className="gap-y-6 md:gap-x-16 grid md:grid-cols-[220px_1fr]">
            <Label className="text-neutral-500">Resumen</Label>
            <p className="max-w-3xl text-neutral-700 text-xl md:text-2xl leading-relaxed">
              {product.overview}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Proceso — log de construcción monoespaciado */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 pb-20 md:pb-28 max-w-screen-2xl">
          <Label className="text-neutral-500">Proceso</Label>
          <div className="mt-8 border-neutral-300 border-t">
            {product.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="items-baseline gap-4 md:gap-10 grid md:grid-cols-[120px_minmax(0,1fr)_2fr] py-7 md:py-8 border-neutral-200 border-b"
              >
                <span className="font-mono text-neutral-400 text-sm">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <h3 className="text-2xl md:text-4xl leading-tight" style={grift}>
                  {cap.title}
                </h3>
                <p className="mt-1 md:mt-0 text-neutral-600 text-sm md:text-base leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 font-mono text-neutral-400 text-xs md:text-sm">
            {"> "}build listo para producción, desde la pizarra hasta el deploy.
          </p>
        </section>
      </ScrollReveal>

      <CtaCard
        name={product.name}
        cta="¿Listo para construir la herramienta que tu negocio realmente necesita?"
      />
      <ExploreMore currentSlug={product.slug} />
    </article>
  );
}
