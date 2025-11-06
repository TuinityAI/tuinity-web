import { Coll } from "@/components/animations/collapse";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import Silk from "@/components/Silk";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="invisible dark:visible -z-10 absolute size-full overflow-hidden">
        <Silk />
        <div className="bottom-0 absolute bg-linear-to-t from-background to-transparent w-full h-48" />
      </div>
      <div className="flex flex-col justify-center items-center gap-6 px-4 py-28 md:py-46 md:pb-72 w-full">
        <h1 className="font-bold text-3xl md:text-5xl text-center max-w-5xl leading-tight">
          Antes dependías de humanos.
          <br />
          <span className="font-glitz font-normal">Hoy, Tuinity IA lo hace por ti.</span>
        </h1>
        <p className="max-w-4xl text-muted-foreground text-lg md:text-2xl text-center leading-relaxed font-light mt-4">
          Ganas más. Haces menos. Deja que la{" "}
          <span className="font-glitz">IA</span>{" "}
          se encargue de lo repetitivo. Automatizá lo operativo con soluciones de software que liberan el potencial de tu negocio.
        </p>
        <div className="shadow-lg backdrop-blur-sm my-6 rounded-4xl overflow-hidden">
          <div className="flex justify-center items-center bg-black rounded-4xl max-w-full h-80 md:h-95 aspect-video font-glitz text-white text-4xl tracking-widest select-none">
            VSL
          </div>
          <Link href="#contact">
            <button className="group flex justify-center items-center gap-2 py-6 w-full font-semibold text-xl cursor-pointer">
              Agenda tu llamada
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
