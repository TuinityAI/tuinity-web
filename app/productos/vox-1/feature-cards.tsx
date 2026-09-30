"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Capability } from "../data";
import { grift } from "../_ui";

const BARS = 56;
const HALF = BARS / 2;

// Forma de reposo de la onda de cada tarjeta. Redondeada a un decimal
// para que el HTML del servidor coincida con el cliente al hidratar.
function restHeights(seed: number) {
  return Array.from({ length: BARS }, (_, i) => {
    const h = Math.min(
      100,
      16 +
        Math.abs(Math.sin(i * 0.5 + seed) + 0.5 * Math.sin(i * 1.3 + seed * 2)) *
          62,
    );
    return Math.round(h * 10) / 10;
  });
}

type Graph = {
  ctx: AudioContext;
  analyser: AnalyserNode;
  data: Uint8Array<ArrayBuffer>;
};

export function FeatureCards({ capabilities }: { capabilities: Capability[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const rest = useRef(capabilities.map((_, i) => restHeights(i * 4.7 + 1)));

  // Un solo <audio> para todas las tarjetas: nunca suenan dos a la vez.
  function toggle(i: number) {
    const audio = audioRef.current;
    if (!audio) return;

    if (!graphRef.current) {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      ctx.createMediaElementSource(audio).connect(analyser);
      analyser.connect(ctx.destination);
      graphRef.current = {
        ctx,
        analyser,
        data: new Uint8Array(analyser.frequencyBinCount),
      };
    }
    graphRef.current.ctx.resume();

    if (active === i) {
      if (audio.paused) audio.play();
      else audio.pause();
      return;
    }

    audio.src = `/assets/Audio${String(i + 1).padStart(2, "0")}.mp3`;
    setActive(i);
    audio.play();
  }

  // Mientras suena, la onda de la tarjeta activa sigue al audio.
  useEffect(() => {
    const graph = graphRef.current;
    if (!playing || active === null || !graph) return;

    const bars = barRefs.current[active];
    let raf = 0;

    const tick = () => {
      graph.analyser.getByteFrequencyData(graph.data);
      bars.forEach((bar, i) => {
        if (!bar) return;
        // Espejo: graves al centro, agudos hacia los bordes.
        const bin = 1 + Math.floor(Math.abs(i - (HALF - 0.5)));
        const v = graph.data[bin] / 255;
        bar.style.height = `${Math.max(10, v * 100)}%`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      bars.forEach((bar, i) => {
        if (bar) bar.style.height = `${rest.current[active][i]}%`;
      });
    };
  }, [playing, active]);

  useEffect(() => {
    return () => {
      graphRef.current?.ctx.close();
    };
  }, []);

  return (
    <div className="gap-4 md:gap-5 grid sm:grid-cols-2 lg:grid-cols-4">
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {capabilities.map((cap, i) => {
        const isPlaying = playing && active === i;
        return (
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
            <div className="flex flex-1 items-center gap-4 py-8">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
                aria-pressed={isPlaying}
                className="-m-2 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="size-4" strokeWidth={1.25} />
                ) : (
                  <Play className="size-4" strokeWidth={1.25} />
                )}
              </button>
              <div className="flex flex-1 items-center gap-0.5 min-w-0 h-10 md:h-14">
                {rest.current[i].map((h, b) => (
                  <span
                    key={b}
                    ref={(el) => {
                      (barRefs.current[i] ??= [])[b] = el;
                    }}
                    className={`flex-1 rounded-full min-w-0 ${
                      isPlaying
                        ? "bg-white"
                        : "bg-neutral-600 group-hover:bg-neutral-300 transition-[height,background-color] duration-300"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {cap.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
