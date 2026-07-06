import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "./data";

export const grift = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

export const WHATSAPP = "https://wa.me/50768497142";

export function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.25em] ${className}`}
    >
      {children}
    </span>
  );
}

export function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden
      className={className}
    >
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function BackLink() {
  return (
    <div className="border-neutral-200 border-b">
      <div className="mx-auto px-4 md:px-8 max-w-screen-2xl">
        <Link
          href="/#products"
          className="group inline-flex items-center gap-2 py-5 font-mono text-[11px] text-neutral-500 hover:text-neutral-950 uppercase tracking-[0.25em] transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Productos
        </Link>
      </div>
    </div>
  );
}

export function CtaCard({
  name,
  cta,
  onDark = false,
}: {
  name: string;
  cta?: string;
  onDark?: boolean;
}) {
  return (
    <section className="mx-auto px-4 md:px-8 pb-20 md:pb-28 max-w-screen-2xl">
      <Link
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex md:flex-row flex-col justify-between md:items-center gap-6 px-8 md:px-12 py-12 md:py-16 ${
          onDark ? "bg-[#141414] text-white" : "bg-neutral-950 text-white"
        }`}
        style={{
          clipPath: "polygon(2.5rem 0, 100% 0, 100% 100%, 0 100%, 0 2.5rem)",
        }}
      >
        <div>
          <p
            className="max-w-xl text-4xl md:text-5xl leading-tight"
            style={grift}
          >
            {cta ?? `¿Listo para poner ${name} a trabajar?`}
          </p>
        </div>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] shrink-0">
          Hablemos
          <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
}

export function ExploreMore({
  currentSlug,
  onDark = false,
}: {
  currentSlug: string;
  onDark?: boolean;
}) {
  const others = PRODUCTS.filter((p) => p.slug !== currentSlug);
  const border = onDark ? "border-white/15" : "border-neutral-200";
  const nameCls = onDark
    ? "text-neutral-500 group-hover:text-white"
    : "text-neutral-400 group-hover:text-neutral-950";
  return (
    <section className={`border-t ${border}`}>
      <div className="mx-auto px-4 md:px-8 py-16 md:py-20 max-w-screen-2xl">
        <Label className="text-neutral-500">Explora más</Label>
        <div className={`mt-8 border-t ${border}`}>
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/productos/${p.slug}`}
              className={`group flex justify-between items-center gap-6 py-7 md:py-9 border-b ${border}`}
            >
              <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                <span className="font-mono text-neutral-500 text-sm shrink-0">
                  {p.category}
                </span>
                <span
                  className={`text-3xl md:text-5xl leading-tight truncate transition-colors ${nameCls}`}
                  style={grift}
                >
                  {p.name}
                </span>
              </div>
              <ArrowUpRight
                className={`size-6 md:size-7 shrink-0 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 ${nameCls}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
