import type { Metadata } from "next";
import { getProduct } from "../data";
import { CtaCard, ExploreMore, Label, grift } from "../_ui";
import { WorldMap } from "./world-map";
import { ScrollReveal } from "@/components/scroll-reveal";

const product = getProduct("cloud-infra")!;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

export default function CloudInfraPage() {
  return (
    <article className="bg-white text-neutral-950">
      {/* Hero — mapa de conectividad global de fondo */}
      <header className="relative flex items-center border-neutral-200 border-b min-h-[80vh] md:min-h-[34rem] overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <WorldMap />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-white from-5% via-white/50 md:via-40% via-55% to-transparent to-80% md:to-70% pointer-events-none"
        />
        <div className="relative mx-auto px-4 md:px-8 py-16 w-full max-w-screen-2xl">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95]"
            style={grift}
          >
            {product.name}
          </h1>
          <p className="mt-8 max-w-2xl text-neutral-600 text-xl md:text-2xl leading-snug">
            {product.tagline}
          </p>
        </div>
      </header>

      {/* Resumen */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 py-16 md:py-20 max-w-screen-2xl">
          <p className="max-w-3xl text-neutral-700 text-xl md:text-3xl leading-relaxed">
            {product.overview}
          </p>
        </section>
      </ScrollReveal>

      {/* Capacidades como capas apiladas con desfase */}
      <ScrollReveal>
        <section className="mx-auto px-4 md:px-8 pb-16 md:pb-20 max-w-screen-2xl">
          <Label className="text-neutral-500">Capas</Label>
          <div className="mt-8">
            {product.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="flex sm:flex-row flex-col justify-between sm:items-center gap-3 bg-neutral-950 mb-2 px-6 md:px-10 py-7 md:py-9 text-white"
                style={{
                  marginLeft: `calc(${i} * clamp(0px, 2.2vw, 2.5rem))`,
                  clipPath:
                    "polygon(1.25rem 0, 100% 0, 100% 100%, 0 100%, 0 1.25rem)",
                  backgroundColor: `hsl(0 0% ${6 + i * 4}%)`,
                }}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="font-mono text-white/40 text-sm shrink-0">
                    L{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-4xl leading-tight" style={grift}>
                    {cap.title}
                  </h3>
                </div>
                <p className="sm:max-w-sm text-white/60 text-sm md:text-base leading-relaxed sm:text-right">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Plataformas — cuadrícula tipo rack */}
      {product.icons && (
        <ScrollReveal>
          <section className="mx-auto px-4 md:px-8 pb-20 md:pb-28 max-w-screen-2xl">
            <Label className="text-neutral-500">
              {product.stackLabel ?? "Plataformas"}
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-8 border-neutral-200 border-t border-l">
              {product.icons.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-6 md:px-8 py-8 md:py-10 border-neutral-200 border-r border-b text-neutral-800"
                >
                  <Icon className="size-8 shrink-0" />
                  <span className="font-mono text-neutral-500 text-sm uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      <CtaCard
        name={product.name}
        cta="Una infraestructura que escala contigo, siempre disponible."
      />
      <ExploreMore currentSlug={product.slug} />
    </article>
  );
}
