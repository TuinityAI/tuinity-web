import { CortexOrb } from "@/components/cortex-orb";

function PlusMark({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden
      className={className}
    >
      <path d="M9 0v18M0 9h18" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Cortex() {
  return (
    <section
      id="cortex"
      className="bg-white px-4 md:px-8 pt-4 md:pt-6 pb-16 md:pb-24 text-neutral-950"
    >
      <div className="relative mx-auto max-w-screen-2xl min-h-[70vh] md:min-h-[80vh]">
        <div
          aria-hidden
          className="absolute inset-0 text-neutral-400 pointer-events-none"
        >
          <PlusMark className="top-0 left-0 absolute -translate-x-1/2 -translate-y-1/2" />
          <PlusMark className="top-0 right-0 absolute translate-x-1/2 -translate-y-1/2" />
          <PlusMark className="bottom-0 left-0 absolute -translate-x-1/2 translate-y-1/2" />
          <PlusMark className="right-0 bottom-0 absolute translate-x-1/2 translate-y-1/2" />
        </div>

        <p
          className="top-0 md:top-1 right-6 md:right-14 absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none"
          style={{
            fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
            fontWeight: 300,
          }}
        >
          Conoce
        </p>

        <div className="absolute inset-0 flex justify-center items-center">
          <CortexOrb
            particles={7200}
            className="w-[min(48vmin,360px)] aspect-square"
          />
        </div>

        <h2
          className="bottom-0 md:bottom-1 left-6 md:left-14 absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none"
          style={{
            fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
            fontWeight: 300,
          }}
        >
          Cortex.
        </h2>
      </div>
    </section>
  );
}
