import Link from "next/link";
import { SiWhatsapp, SiGithub, SiInstagram } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/app/productos/data";

const grift = {
  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
  fontWeight: 300,
} as const;

const products = PRODUCTS.map((p) => ({
  label: p.name,
  href: `/productos/${p.slug}`,
}));

const WHATSAPP = "https://wa.me/50768497142";

const company = [
  { label: "Inicio", href: "/#hero" },
  { label: "Cortex", href: "/#cortex" },
  { label: "Tech", href: "/#tech" },
  { label: "Contacto", href: WHATSAPP, external: true },
];

const media = [
  {
    href: WHATSAPP,
    label: "WhatsApp",
    icon: <SiWhatsapp className="size-5" />,
  },
  {
    href: "https://github.com/TuinityAI",
    label: "GitHub",
    icon: <SiGithub className="size-5" />,
  },
  {
    href: "https://instagram.com/tuinity",
    label: "Instagram",
    icon: <SiInstagram className="size-5" />,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-[0.25em]">
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="border-white/10 border-t bg-[#141414] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_1.5fr_1.5fr] divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Columna izquierda: logo + CTA + créditos */}
        <div className="flex flex-col">
          <div className="flex justify-center items-center bg-[#1c1c1c] px-10 py-14 border-white/10 border-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/quimera.svg"
              alt="Tuinity"
              className="opacity-90 w-auto h-32 invert"
            />
          </div>

          <div className="flex flex-1 items-center px-8 py-10">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-1.5 pb-1.5 text-white text-sm md:text-base"
            >
              Agenda una llamada
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span
                aria-hidden
                className="bottom-0 left-0 absolute bg-white w-[calc(100%-1.375rem)] group-hover:w-full h-px transition-all duration-300 ease-out"
              />
            </Link>
          </div>

          <div className="px-8 py-8 border-white/10 border-t">
            <p className="text-neutral-500 text-sm">
              © 2026 Tuinity. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Columna central: productos */}
        <nav className="px-8 lg:px-16 py-12 lg:py-14">
          <SectionLabel>Productos</SectionLabel>
          <ul className="space-y-5 mt-12 lg:mt-20">
            {products.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-neutral-400 hover:text-white text-4xl md:text-5xl leading-none transition-colors"
                  style={grift}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna derecha: compañía + redes */}
        <div className="flex flex-col px-8 lg:px-16 py-12 lg:py-14">
          <nav>
            <SectionLabel>Compañía</SectionLabel>
            <ul className="space-y-5 mt-12 lg:mt-20">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-neutral-400 hover:text-white text-4xl md:text-5xl leading-none transition-colors"
                    style={grift}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 lg:mt-auto pt-10">
            <SectionLabel>Conecta</SectionLabel>
            <ul className="flex gap-5 mt-6">
              {media.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
