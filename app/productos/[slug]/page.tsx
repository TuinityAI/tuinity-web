import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, getProduct } from "../data";

const grift = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

const WHATSAPP = "https://wa.me/50768497142";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Tuinity`,
    description: product.description,
  };
}

function CornerMark({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className={className}>
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-[0.25em]">
      {children}
    </span>
  );
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <article className="bg-[#0c0c0c] text-white">
      {/* Hero */}
      <header className="relative border-white/10 border-b">
        <div className="relative mx-auto px-4 md:px-8 py-20 md:py-32 max-w-screen-2xl">
          <div
            aria-hidden
            className="absolute inset-x-4 md:inset-x-8 inset-y-0 text-neutral-700 pointer-events-none"
          >
            <CornerMark className="top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2" />
            <CornerMark className="top-0 right-0 absolute translate-x-1/2 -translate-y-1/2" />
            <CornerMark className="bottom-0 left-0 absolute -translate-x-1/2 translate-y-1/2" />
            <CornerMark className="right-0 bottom-0 absolute translate-x-1/2 translate-y-1/2" />
          </div>

          <Label>{product.category}</Label>
          <h1
            className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95]"
            style={grift}
          >
            {product.name}
          </h1>
          <p className="mt-8 max-w-2xl text-neutral-300 text-xl md:text-2xl leading-snug">
            {product.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
            <Link
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white hover:bg-neutral-200 px-6 py-3.5 font-mono text-[11px] text-black uppercase tracking-[0.2em] transition-colors"
            >
              Hablemos
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Resumen + capacidades */}
      <section className="mx-auto px-4 md:px-8 py-20 md:py-28 max-w-screen-2xl">
        <div className="gap-y-10 md:gap-x-16 grid md:grid-cols-[220px_1fr]">
          <Label>Resumen</Label>
          <p className="max-w-3xl text-neutral-300 text-lg md:text-2xl leading-relaxed">
            {product.overview}
          </p>
        </div>

        <div className="gap-y-10 md:gap-x-16 grid md:grid-cols-[220px_1fr] mt-20 md:mt-28">
          <Label>Capacidades</Label>
          <div className="border-white/10 border-t">
            {product.capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="flex md:flex-row flex-col gap-2 md:gap-10 py-7 md:py-9 border-white/10 border-b"
              >
                <span className="pt-1 md:pt-2 w-14 font-mono text-neutral-500 text-sm shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 md:grid md:grid-cols-2 md:gap-10">
                  <h3 className="text-2xl md:text-3xl leading-tight" style={grift}>
                    {cap.title}
                  </h3>
                  <p className="mt-2 md:mt-0 max-w-md text-neutral-400 text-sm md:text-base leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {product.icons && (
          <div className="gap-y-8 md:gap-x-16 grid md:grid-cols-[220px_1fr] mt-20 md:mt-28">
            <Label>{product.stackLabel ?? "Stack"}</Label>
            <div className="flex flex-wrap items-center gap-8 text-neutral-400">
              {product.icons.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2.5"
                  title={label}
                >
                  <Icon className="size-7" />
                  <span className="text-neutral-500 text-sm">{label}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto px-4 md:px-8 pb-20 md:pb-28 max-w-screen-2xl">
        <Link
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex md:flex-row flex-col justify-between md:items-center gap-6 bg-white px-8 md:px-12 py-12 md:py-16 text-black"
          style={{
            clipPath: "polygon(2.5rem 0, 100% 0, 100% 100%, 0 100%, 0 2.5rem)",
          }}
        >
          <div>
            <p className="mt-4 max-w-xl text-4xl md:text-5xl leading-tight" style={grift}>
              ¿Listo para poner {product.name} a trabajar?
            </p>
          </div>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] shrink-0">
            Hablemos
            <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      {/* Otros productos */}
      <section className="border-white/10 border-t">
        <div className="mx-auto px-4 md:px-8 py-16 md:py-20 max-w-screen-2xl">
          <Label>Explora más</Label>
          <div className="mt-8 border-white/10 border-t">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/productos/${p.slug}`}
                className="group flex justify-between items-center gap-6 py-7 md:py-9 border-white/10 border-b"
              >
                <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                  <span className="font-mono text-neutral-600 text-sm shrink-0">
                    {p.category}
                  </span>
                  <span
                    className="text-neutral-400 group-hover:text-white text-3xl md:text-5xl leading-tight truncate transition-colors"
                    style={grift}
                  >
                    {p.name}
                  </span>
                </div>
                <ArrowUpRight className="size-6 md:size-7 text-neutral-500 group-hover:text-white shrink-0 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
