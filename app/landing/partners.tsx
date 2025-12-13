"use client";

import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiVercel } from "react-icons/si";

const LogoLoopComponent = LogoLoop as any;

export function Partners() {
  const techLogos = [
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiReact className="w-full h-full" /></div>, title: "React", ariaLabel: "React" },
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiNextdotjs className="w-full h-full" /></div>, title: "Next.js", ariaLabel: "Next.js" },
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiTypescript className="w-full h-full" /></div>, title: "TypeScript", ariaLabel: "TypeScript" },
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiTailwindcss className="w-full h-full" /></div>, title: "Tailwind CSS", ariaLabel: "Tailwind CSS" },
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiNodedotjs className="w-full h-full" /></div>, title: "Node.js", ariaLabel: "Node.js" },
    { node: <div className="flex justify-center items-center w-10 md:w-12 h-10 md:h-12"><SiVercel className="w-full h-full" /></div>, title: "Vercel", ariaLabel: "Vercel" },
  ];

  return (
    <section id="partners" className="py-8 md:py-12 w-full overflow-hidden">
      <LogoLoopComponent
        logos={techLogos}
        speed={40}
        direction="left"
        logoHeight={40}
        gap={56}
        pauseOnHover={false}
        scaleOnHover={false}
        fadeOut={false}
        width="100%"
      />
    </section>
  );
}
