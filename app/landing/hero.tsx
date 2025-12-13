import { Coll } from "@/components/animations/collapse";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot, TrendingUp } from "lucide-react";
import Link from "next/link";
import Silk from "@/components/Silk";
import Receptionist from "@/components/recepcionist";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="invisible dark:visible -z-10 absolute opacity-60 size-full overflow-hidden">
        <Silk color="#defeff" />
        <div className="bottom-0 absolute bg-linear-to-t from-background to-transparent w-full h-48" />
      </div>
      <div className="flex flex-col justify-center items-center px-4 py-28 md:py-46 md:pb-72 w-full">
        <h1 className="font-bold text-4xl md:text-6xl text-center">
          Escala tus ventas con{" "}
          <span className="font-glitz font-normal">Tuinity AI</span>
        </h1>
        <p className="max-w-3xl text-primary text-xl md:text-3xl text-center">
          ¡Presiona el microfono de abajo para hablar con nuestro Agente de{" "}
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <span className="font-glitz">IA</span>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="inline-flex gap-2 text-sm">
                Inteligencia Artificial <Bot className="size-5" />
              </p>
            </TooltipContent>
          </Tooltip>{" "}
          ahora mismo!
        </p>
        <div className="flex flex-col items-center gap-8 my-6">
          <div className="flex justify-center items-center rounded-4xl select-none greyscale-100">
            <Receptionist />
          </div>
          <Link href="#contact">
            <Button className="group flex justify-center items-center gap-2 py-6 font-semibold text-xl cursor-pointer">
              Agenda una llamada
              <Coll groupHover>
                <TrendingUp className="size-5" />
              </Coll>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
