"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";
import { getProduct } from "../data";
import { Label, WHATSAPP, grift } from "../_ui";

const product = getProduct("halo")!;

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Utilidades de animación                                             */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function fmt(v: number, decimals: number) {
  return v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = prefix + fmt(to, decimals) + suffix;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = prefix + fmt(v, decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix + fmt(0, decimals) + suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Cristal — superficie transparente SIN color. El vidrio se define    */
/* por el borde fino, el destello superior y el desenfoque de fondo,   */
/* nunca por un tinte. Deja ver lo que hay detrás.                     */
/* ------------------------------------------------------------------ */

function Glass({
  children,
  className = "",
  sheen = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  sheen?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={`relative bg-white/[0.045] ring-1 ring-white/15 backdrop-blur-2xl ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.22), inset 0 -1px 0 0 rgba(255,255,255,0.05), 0 24px 60px -30px rgba(0,0,0,0.85)",
      }}
    >
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      )}
      {children}
    </Tag>
  );
}

/* Fondo compartido: cuadrícula técnica + un halo de luz gris, sin color.
   Le da al cristal algo real que refractar. */
function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.10) 0%, transparent 55%)",
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Marco de navegador para presentar una captura completa              */
/* ------------------------------------------------------------------ */

function BrowserFrame({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Glass className={`overflow-hidden ${className}`}>
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="flex-1 truncate rounded-sm bg-black/30 px-3 py-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          {caption}
        </span>
        <span className="hidden size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400 sm:block" />
      </div>
      <div className="relative aspect-[1902/984] bg-neutral-900">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1400px"
          className="object-cover object-top"
        />
      </div>
    </Glass>
  );
}

/* Tarjeta de anotación de cristal (flota sobre las capturas) */
function Callout({
  index,
  title,
  body,
  className = "",
}: {
  index: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <Glass className={`w-60 p-4 ${className}`}>
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        <span className="text-emerald-400">{index}</span>
        {title}
      </p>
      <p className="mt-2.5 text-sm leading-snug text-white/80">{body}</p>
    </Glass>
  );
}

/* ------------------------------------------------------------------ */
/* Ticker de actividad                                                 */
/* ------------------------------------------------------------------ */

const TICKER = [
  "Mensaje entrante · WhatsApp",
  "Cita confirmada · 11:15 a.m.",
  "Ticket resuelto · derivado por el bot",
  "Cortex · consulta de métricas",
  "Tokens del mes · 661,502",
  "Agenda sincronizada · 81 citas hoy",
  "Conversación transferida a humano",
  "Estado del sistema · estable",
];

function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-white/10">
      <style>{`@keyframes halo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div
        className="flex w-max motion-reduce:[animation-play-state:paused]"
        style={{ animation: "halo-marquee 44s linear infinite" }}
      >
        {[0, 1].map((k) => (
          <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
            {TICKER.map((e) => (
              <li
                key={e}
                className="flex items-center gap-3 whitespace-nowrap px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
              >
                <span className="size-1 rounded-full bg-emerald-400/80" />
                {e}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const SPECS = [
  { k: "Datos", v: "En vivo, sin refrescar" },
  { k: "Arquitectura", v: "Multi-tenant" },
  { k: "Copiloto", v: "Cortex Prime 1.0" },
  { k: "Acceso", v: "Web, sin instalación" },
];

function Hero() {
  const reduce = useReducedMotion();
  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <header className="relative overflow-hidden bg-black pt-14">
      <Backdrop />
      <div className="relative mx-auto max-w-screen-2xl px-4 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
        <motion.div {...up(0)}>
          <Label className="text-white/50">
            Producto principal / {product.category}
          </Label>
        </motion.div>

        <motion.h1
          {...up(0.08)}
          className="mt-6 text-[5.5rem] leading-[0.86] tracking-tight text-white sm:text-8xl md:text-[13rem]"
          style={grift}
        >
          {product.name}
        </motion.h1>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-12 md:gap-16">
          <motion.p
            {...up(0.16)}
            className="max-w-2xl text-xl leading-snug text-white/70 md:col-span-8 md:text-2xl"
          >
            {product.tagline}
          </motion.p>
          <motion.div {...up(0.24)} className="md:col-span-4 md:justify-self-end">
            <Link
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-white/85"
            >
              Ver Halo en acción
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ficha técnica en cristal */}
      <motion.div {...up(0.32)} className="relative mx-auto max-w-screen-2xl px-4 pb-16 md:px-8 md:pb-20">
        <Glass className="grid grid-cols-2 md:grid-cols-4" sheen={false}>
          {SPECS.map((s, i) => (
            <div
              key={s.k}
              className={`px-5 py-5 md:px-6 md:py-6 ${
                i > 0 ? "border-l border-white/10" : ""
              } ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                {s.k}
              </span>
              <p className="mt-2 text-base text-white md:text-lg">{s.v}</p>
            </div>
          ))}
        </Glass>
      </motion.div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Telemetría                                                          */
/* ------------------------------------------------------------------ */

const READINGS = [
  { label: "Tokens este mes", to: 661502 },
  { label: "Citas esta semana", to: 401 },
  { label: "Llamadas de IA", to: 40 },
  { label: "Costo del mes", to: 1.95, prefix: "USD ", decimals: 2 },
];

function Telemetry() {
  return (
    <div className="relative mx-auto max-w-screen-2xl px-4 py-14 md:px-8 md:py-20">
      <Glass className="grid grid-cols-2 md:grid-cols-4">
        {READINGS.map((r, i) => (
          <div
            key={r.label}
            className={`px-5 py-8 md:px-8 md:py-10 ${
              i > 0 ? "border-l border-white/10" : ""
            } ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""}`}
          >
            <p
              className="text-4xl tracking-tight text-white md:text-5xl"
              style={grift}
            >
              <Counter
                to={r.to}
                prefix={r.prefix ?? ""}
                decimals={r.decimals ?? 0}
              />
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
              {r.label}
            </p>
          </div>
        ))}
      </Glass>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Escena principal — el producto real bajo cristal                    */
/* ------------------------------------------------------------------ */

function Stage() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <Backdrop />
      <div className="relative">
        <Ticker />

        {/* Encabezado */}
        <div className="mx-auto max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Sala de control · En vivo
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="mt-6 max-w-3xl text-4xl leading-[1.0] tracking-tight text-white md:text-7xl"
              style={grift}
            >
              Una pantalla. Toda la operación.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Lo que ves abajo no es un mockup. Es Halo operando una clínica
              real: 8 profesionales, más de 80 citas al día y 661,502 tokens de
              IA en el mes.
            </p>
          </Reveal>
        </div>

        <Telemetry />

        {/* Captura principal con anotaciones de cristal flotando encima */}
        <div className="mx-auto max-w-screen-2xl px-4 pb-16 md:px-8 md:pb-24">
          <Reveal>
            <div className="relative">
              <BrowserFrame
                src="/assets/Halo1.png"
                alt="Panel principal de Halo con Cortex, métricas en vivo, gráfica de citas e inversión en IA"
                caption="halo.tuinity.ai / panel · CEOSA"
                priority
              />

              {/* Anotaciones — visibles en pantallas amplias */}
              <Callout
                index="01"
                title="Cortex"
                body="El copiloto lee tu operación y responde en español, sobre la misma base que el panel."
                className="absolute -left-4 top-24 hidden lg:block xl:-left-10"
              />
              <Callout
                index="02"
                title="Telemetría"
                body="Citas de hoy y de la semana, graficadas al momento. Sin refrescar."
                className="absolute -bottom-6 left-6 hidden lg:block"
              />
              <Callout
                index="03"
                title="Inversión en IA"
                body="661,502 tokens este mes costaron USD 1.95. Cada token, contado."
                className="absolute -right-4 bottom-16 hidden lg:block xl:-right-10"
              />
            </div>
          </Reveal>

          {/* Lista de anotaciones para pantallas pequeñas */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:hidden">
            <Callout
              index="01"
              title="Cortex"
              body="El copiloto lee tu operación y responde en español."
            />
            <Callout
              index="02"
              title="Telemetría"
              body="Citas de hoy y de la semana, graficadas al momento."
            />
            <Callout
              index="03"
              title="Inversión en IA"
              body="661,502 tokens este mes costaron USD 1.95."
            />
          </div>
        </div>

        {/* Agenda + Cortex, dos capturas completas */}
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 pb-20 md:px-8 md:pb-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col">
              <div className="mb-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                  <span className="text-emerald-400">Mod 04</span> / Agenda
                </p>
                <h3
                  className="mt-3 text-3xl leading-[1.05] text-white md:text-4xl"
                  style={grift}
                >
                  Cada profesional. Cada cita. Hoy.
                </h3>
              </div>
              <BrowserFrame
                src="/assets/Halo2.png"
                alt="Agenda del día de Halo organizada por profesional, en columnas"
                caption="halo.tuinity.ai / agenda · Lunes 6 de julio"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <div className="mb-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                  <span className="text-emerald-400">Mod 05</span> / Cortex
                </p>
                <h3
                  className="mt-3 text-3xl leading-[1.05] text-white md:text-4xl"
                  style={grift}
                >
                  Pregunta en español.
                </h3>
              </div>
              <BrowserFrame
                src="/assets/Halo3.png"
                alt="Panel lateral de Cortex con preguntas sugeridas sobre la operación"
                caption="halo.tuinity.ai / cortex prime 1.0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Declaración de cierre                                               */
/* ------------------------------------------------------------------ */

function Statement() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black">
      <Backdrop />
      <div className="relative mx-auto max-w-screen-2xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-3">
            <Label className="text-white/50">Resumen</Label>
          </div>
          <Reveal className="md:col-span-9">
            <p
              className="max-w-4xl text-3xl leading-[1.15] text-white md:text-5xl"
              style={grift}
            >
              {product.overview}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HaloView() {
  return (
    <>
      <Hero />
      <Stage />
      <Statement />
    </>
  );
}
