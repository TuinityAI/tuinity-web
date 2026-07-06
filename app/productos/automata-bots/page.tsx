import type { Metadata } from "next";
import { Fragment } from "react";
import { getProduct } from "../data";
import { CtaCard, ExploreMore, Label } from "../_ui";
import { ConnectFlow } from "./connect-flow";
import { ChatDemo } from "./chat-demo";

const product = getProduct("automata-bots")!;

const archivo = {
  fontFamily: 'var(--font-archivo), "Montserrat", sans-serif',
  fontWeight: 700,
} as const;

export const metadata: Metadata = {
  title: `${product.name} — Tuinity`,
  description: product.description,
};

export default function AutomataBotsPage() {
  return (
    <article className="bg-black text-white">
      {/* Hero: negro, estilo Anduril */}
      <header className="bg-black text-white">
        <div className="flex flex-col justify-end mx-auto px-4 md:px-8 pt-16 pb-8 md:pb-10 max-w-screen-2xl min-h-[62vh] md:min-h-[68vh]">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.85]"
            style={{
              ...archivo,
              animation: "rise-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s both",
            }}
          >
            {`{${product.name}}`}
            <span
              aria-hidden
              className="ml-1"
              style={{ animation: "caret-blink 1.05s steps(1, end) infinite" }}
            >
              .
            </span>
          </h1>

          <div className="items-start gap-8 md:gap-12 grid md:grid-cols-[1fr_1.6fr_auto] mt-12 md:mt-16">
            <div />

            <p
              className="max-w-lg text-[13px] md:text-sm text-neutral-200 uppercase leading-[1.15]"
              style={{ ...archivo, fontWeight: 400 }}
            >
              {product.overview}
            </p>

            {product.icons && (
              <div className="flex md:justify-end items-center text-neutral-500">
                {product.icons.map((ic, i) => (
                  <Fragment key={ic.label}>
                    {i > 0 && (
                      <span
                        className="bg-neutral-700 w-3 md:w-5 h-0.5 origin-left"
                        style={{
                          animation: `line-grow 0.4s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.09}s both`,
                        }}
                      />
                    )}
                    <span
                      className="shrink-0"
                      style={{
                        animation: `rise-in 0.5s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.09}s both`,
                      }}
                    >
                      <ic.Icon className="size-6" />
                    </span>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pb-10 md:pb-16">
          <ChatDemo />
        </div>
      </header>

      {/* Cómo funciona — puntos que se conectan */}
      <section
        id="como-funciona"
        className="mx-auto px-4 md:px-8 pb-20 md:pb-28 max-w-screen-2xl scroll-mt-4"
      >
        <Label className="text-neutral-500">Cómo funciona</Label>
        <ConnectFlow items={product.capabilities} />
      </section>

      <CtaCard name={product.name} onDark />
      <ExploreMore currentSlug={product.slug} onDark />
    </article>
  );
}
