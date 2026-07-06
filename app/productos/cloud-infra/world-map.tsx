"use client";

import { useEffect, useRef } from "react";
import { WORLD } from "./world-data";

// Lienzo lógico fijo; el navegador lo escala.
const CW = 1920;
const CH = 1080;
const MX = 60;
const MY = 80;
const MW = 1800;
const MH = 920;

function geo(lat: number, lng: number) {
  return { x: MX + ((lng + 180) / 360) * MW, y: MY + ((90 - lat) / 180) * MH };
}

// Origen de los arcos (Panamá) y destinos globales — como el original.
const ORIGIN = geo(9.35, -79.9);
const DEST_LL: [number, number][] = [
  [40.7, -74.0], // Nueva York
  [19.4, -99.1], // México
  [4.7, -74.1], // Bogotá
  [-34.6, -58.4], // Buenos Aires
  [40.4, -3.7], // Madrid
  [55.7, 12.6], // Norte de Europa
  [25.2, 55.3], // Dubái
  [28.6, 77.2], // Nueva Delhi
  [31.2, 121.5], // Shanghái
  [37.5, 127.0], // Seúl
  [-25.7, 28.2], // Sudáfrica
  [-33.9, 151.2], // Sídney
];

type Dest = {
  x: number;
  y: number;
  cx: number;
  cy: number;
  start: number;
};

function buildDest(): Dest[] {
  return DEST_LL.map(([lat, lng], i) => {
    const p = geo(lat, lng);
    const mx = (ORIGIN.x + p.x) / 2;
    const my = (ORIGIN.y + p.y) / 2;
    const dist = Math.hypot(p.x - ORIGIN.x, p.y - ORIGIN.y);
    return {
      x: p.x,
      y: p.y,
      cx: mx,
      cy: my - Math.min(dist * 0.3, 210), // el arco se eleva
      start: 0.35 + i * 0.2, // escalonado
    };
  });
}

function bez(t: number, d: Dest) {
  const mt = 1 - t;
  return {
    x: mt * mt * ORIGIN.x + 2 * mt * t * d.cx + t * t * d.x,
    y: mt * mt * ORIGIN.y + 2 * mt * t * d.cy + t * t * d.y,
  };
}

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const dest = buildDest();

    canvas.width = CW * DPR;
    canvas.height = CH * DPR;
    ctx.scale(DPR, DPR);

    // Campo de puntos (continentes) cacheado en offscreen.
    const dotLayer = document.createElement("canvas");
    dotLayer.width = CW * DPR;
    dotLayer.height = CH * DPR;
    const dctx = dotLayer.getContext("2d")!;
    dctx.scale(DPR, DPR);
    const { gw, gh, dots } = WORLD;
    const maxd = Math.hypot(MW, MH);
    for (let k = 0; k < dots.length; k++) {
      const x = MX + (dots[k][0] / gw) * MW;
      const y = MY + (dots[k][1] / gh) * MH;
      const dd = Math.hypot(x - ORIGIN.x, y - ORIGIN.y) / maxd;
      dctx.beginPath();
      dctx.arc(x, y, 2.15, 0, Math.PI * 2);
      dctx.fillStyle = "rgba(82,82,82," + (0.55 - dd * 0.14).toFixed(3) + ")"; // gris
      dctx.fill();
    }

    function glow(p: { x: number; y: number }, r: number, bright = false) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx!.fillStyle = bright
        ? "rgba(59,130,246,0.98)"
        : "rgba(96,165,250,0.9)";
      ctx!.shadowColor = "rgba(37,99,235,0.65)";
      ctx!.shadowBlur = bright ? 14 : 10;
      ctx!.fill();
      ctx!.shadowBlur = 0;
    }

    function drawArc(d: Dest, p: number, el: number) {
      const N = 64;
      const last = Math.max(1, Math.floor(N * p));
      ctx!.beginPath();
      for (let s = 0; s <= last; s++) {
        const pt = bez(s / N, d);
        if (s === 0) ctx!.moveTo(pt.x, pt.y);
        else ctx!.lineTo(pt.x, pt.y);
      }
      ctx!.strokeStyle = "rgba(37,99,235,0.6)"; // azul
      ctx!.lineWidth = 1.8;
      ctx!.shadowColor = "rgba(37,99,235,0.4)";
      ctx!.shadowBlur = 6;
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      if (p < 1) {
        glow(bez(p, d), 3.4); // cabeza que dibuja
      } else {
        glow({ x: d.x, y: d.y }, 3.0, true); // nodo destino
        const fr = (el * 0.16 + d.start) % 1; // pulso viajero
        glow(bez(fr, d), 2.4);
      }
    }

    function drawOrigin(el: number) {
      const pr = 14 + (reduce ? 0 : Math.sin(el * 1.8) * 3);
      ctx!.beginPath();
      ctx!.arc(ORIGIN.x, ORIGIN.y, pr, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(37,99,235,0.4)";
      ctx!.lineWidth = 1;
      ctx!.stroke();
      glow(ORIGIN, 6.5, true);
    }

    function render(el: number) {
      ctx!.clearRect(0, 0, CW, CH);
      ctx!.drawImage(dotLayer, 0, 0, CW, CH);
      for (let i = 0; i < dest.length; i++) {
        const p = reduce
          ? 1
          : Math.max(0, Math.min(1, (el - dest[i].start) / 1.4));
        if (p > 0) drawArc(dest[i], p, el);
      }
      drawOrigin(el);
    }

    let active = false;
    let t0: number | null = null;
    let raf = 0;

    function loop(ts: number) {
      raf = requestAnimationFrame(loop);
      if (!active) return;
      if (t0 == null) t0 = ts;
      render((ts - t0) / 1000);
    }

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          active = e.isIntersecting && e.intersectionRatio >= 0.2;
          if (active && reduce) render(3);
          if (!active) t0 = null;
        });
      },
      { threshold: [0, 0.2] },
    );
    io.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
