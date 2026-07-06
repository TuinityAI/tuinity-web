"use client";

/*
  Port de orb.js (orbe de partículas topográfico, window.TuinityOrbFactory)
  a React usando el three de node_modules. Versión OSCURA para fondo blanco:
  - Paleta HSL invertida (partículas azul-grafito oscuras, el original era blanco)
  - NormalBlending en lugar de AdditiveBlending (additive sobre blanco no se ve)
  - Ridges mezclan hacia oscuro en vez de hacia blanco
  API original conservada: setActive(bool), pulse(), setSpinning(bool).
*/

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
attribute float size;
attribute vec3 color;
varying vec3 vColor;
varying float vElev;
uniform float time;
uniform float uPulse;
uniform float uPx;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))
        +i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
void main(){
  vColor=color;
  vec3 dir=normalize(position);
  float e  = snoise(dir*1.6 + vec3(0.0, time*0.38, 0.0)) * 0.6;
  e += snoise(dir*3.4 + vec3(time*0.29, 0.0, time*0.21)) * 0.28;
  e += snoise(dir*6.5 - vec3(0.0, time*0.26, 0.0)) * 0.14;
  vElev=e;
  vec3 pos = position + dir * e * (0.26 + uPulse*0.22) + dir*uPulse*0.10;
  vec4 mv = modelViewMatrix * vec4(pos,1.0);
  gl_PointSize = size * uPx * (1.0/-mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vElev;
uniform float uPulse;
void main(){
  float dist=length(gl_PointCoord - vec2(0.5));
  if(dist>0.5) discard;
  float glow=smoothstep(0.5,0.05,dist);
  float core=smoothstep(0.5,0.0,dist);
  float h=clamp(vElev*0.5+0.5,0.0,1.0);
  vec3 valley=mix(vColor, vec3(1.0), 0.07);
  vec3 ridge=mix(vColor, vec3(0.01,0.03,0.05), 0.6);
  vec3 c=mix(valley,ridge,smoothstep(0.45,0.95,h));
  c*=(1.0-core*0.25);
  c=mix(c, vec3(0.0,0.16,0.22), uPulse*0.5);
  float alpha=glow*(0.9+h*0.5);
  gl_FragColor=vec4(c,alpha);
}`;

type OrbHandle = {
  setActive: (on: boolean) => void;
  pulse: () => void;
  setSpinning: (on: boolean) => void;
  destroy: () => void;
};

type OrbOptions = {
  particles?: number;
  pointSize?: number;
  superSample?: number;
};

function createOrb(host: HTMLElement, opts: OrbOptions = {}): OrbHandle {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = opts.particles || 5600;
  const px = opts.pointSize || 360.0;
  const ss = opts.superSample || 1;

  let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    particles: THREE.Points,
    material: THREE.ShaderMaterial,
    geo: THREE.BufferGeometry,
    clock: THREE.Clock;
  let ready = false,
    active = false,
    raf: number | null = null,
    time = 0,
    pulse = 0,
    spinning = true;

  function build() {
    const w = host.clientWidth || 440;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, w);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * ss);
    const cv = renderer.domElement;
    cv.style.width = "100%";
    cv.style.height = "100%";
    host.appendChild(cv);

    const radius = 2;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const golden = (1 + Math.sqrt(5)) / 2;
    const skip = 5;
    const total = N + skip * 2;
    for (let i = 0; i < N; i++) {
      const idx = i + skip;
      const y = 1 - (idx / (total - 1)) * 2;
      const rAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * idx) / golden;
      positions[i * 3] = Math.cos(theta) * rAtY * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * rAtY * radius;
      // Paleta oscura (el original era blanca: L 0.98/0.86/0.74)
      const cc = Math.random();
      let hue: number, sat: number, light: number;
      if (cc < 0.6) {
        hue = 0.57;
        sat = 0.04;
        light = 0.04;
      } else if (cc < 0.82) {
        hue = 0.58;
        sat = 0.1;
        light = 0.08;
      } else {
        hue = 0.6;
        sat = 0.28;
        light = 0.13;
      }
      const col = new THREE.Color().setHSL(hue, sat, light);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      sizes[i] = 0.016 + Math.random() * 0.012;
    }
    geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uPulse: { value: 0 },
        uPx: { value: px * ss },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    particles = new THREE.Points(geo, material);
    scene.add(particles);
    clock = new THREE.Clock();
    ready = true;
    window.addEventListener("resize", onResize);
  }

  function onResize() {
    if (!ready) return;
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!ready || !active) return;
    const dt = clock.getDelta();
    time += dt * (1 + pulse * 2.0);
    pulse *= 0.93;
    if (spinning) particles.rotation.y += 0.0006 + pulse * 0.012;
    material.uniforms.time.value = time;
    material.uniforms.uPulse.value = pulse;
    renderer.render(scene, camera);
  }

  return {
    setActive(on) {
      if (on && !ready) {
        try {
          build();
          loop();
        } catch (e) {
          console.warn("orb init failed", e);
        }
      }
      active = !!on;
      if (active && ready) {
        onResize();
        if (reduce) renderer.render(scene, camera);
      }
    },
    pulse() {
      pulse = Math.min(1.5, pulse + 0.9);
    },
    setSpinning(on) {
      spinning = !!on;
    },
    destroy() {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (ready) {
        geo.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      }
      ready = false;
      active = false;
    },
  };
}

export function CortexOrb({
  particles = 5600,
  pointSize = 360,
  superSample = 2,
  className = "",
}: {
  particles?: number;
  pointSize?: number;
  superSample?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const orb = createOrb(host, { particles, pointSize, superSample });
    const onClick = () => orb.pulse();
    host.addEventListener("click", onClick);

    // activo solo cuando es visible (ahorra GPU), como orb-init.js
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => orb.setActive(e.isIntersecting)),
      { threshold: 0.1 },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      host.removeEventListener("click", onClick);
      orb.destroy();
    };
  }, [particles, pointSize, superSample]);

  return (
    <div className={`relative ${className}`}>
      {/* Glow tipo Quimera (el ::before del ejemplo), adaptado a fondo claro */}
      <div
        aria-hidden
        className="absolute inset-[2%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(91,208,228,.22) 0%, rgba(91,208,228,.06) 44%, transparent 66%)",
          filter: "blur(20px)",
        }}
      />
      <div ref={hostRef} className="relative size-full cursor-pointer" />
    </div>
  );
}
