import { Coll } from "@/components/animations/collapse";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot, TrendingUp } from "lucide-react";
import Link from "next/link";
import Silk from "@/components/Silk";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="invisible dark:visible -z-10 absolute size-full overflow-hidden">
        <Silk />
        <div className="bottom-0 absolute bg-linear-to-t from-background to-transparent w-full h-48" />
      </div>
      <div className="flex flex-col justify-center items-center px-4 py-28 md:py-46 md:pb-72 w-full">
        <h1 className="font-bold text-4xl md:text-6xl text-center">
          Automatiza tu negocio con{" "}
          <span className="font-glitz font-normal">Tuinity AI</span>
        </h1>
        <p className="max-w-4xl text-muted-foreground text-xl md:text-3xl text-center">
          Soluciones de software impulsadas por{" "}
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <span className="font-glitz">AI</span>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="inline-flex gap-2 text-sm">
                Inteligencia Artificial <Bot className="size-5" />
              </p>
            </TooltipContent>
          </Tooltip>{" "}
          para simplificar carga operativa y aumentar facturación mientras
          ahorras costos.
        </p>
        <div className="shadow-lg backdrop-blur-sm my-6 rounded-4xl overflow-hidden">
          <div className="flex justify-center items-center bg-black rounded-4xl max-w-full h-80 md:h-95 aspect-video font-glitz text-white text-4xl tracking-widest select-none">
            VSL
          </div>
          <Link href="#contact">
            <button className="group flex justify-center items-center gap-2 py-6 w-full font-semibold text-xl cursor-pointer">
              Lleva tu negocio a otro nivel
              <Coll groupHover>
                <TrendingUp className="size-5" />
              </Coll>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
