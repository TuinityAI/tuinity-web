import { Slot } from "@radix-ui/react-slot";
import {
  Bot,
  ChartBar,
  ChevronsLeftRightEllipsis,
  ChevronsRightLeft,
  Microscope,
  Repeat,
  TrendingUp,
} from "lucide-react";
import * as motion from "motion/react-client";

const feats = [
  {
    title: "Mayor productividad",
    description:
      "Automatiza tareas repetitivas y tediosas, permitiendo a los empleados centrarse en actividades de mayor valor.",
    icon: <Repeat />,
  },
  {
    title: "Mejor toma de decisiones",
    description:
      "Analiza grandes volúmenes de datos para proporcionar insights valiosos que guían las estrategias empresariales.",
    icon: <ChartBar />,
  },
  {
    title: "Atención al cliente",
    description:
      "Implementa chatbots y asistentes virtuales que ofrecen soporte continuo a los clientes, mejorando su experiencia.",
    icon: <Bot />,
  },
  {
    title: "Reducción de costos",
    description:
      "Optimiza procesos operativos y reduce errores humanos, lo que se traduce en ahorros significativos.",
    icon: <TrendingUp />,
  },
  {
    title: "Personalización",
    description:
      "Utiliza algoritmos de IA para ofrecer recomendaciones personalizadas, aumentando la satisfacción del cliente.",
    icon: <ChevronsLeftRightEllipsis />,
  },
  {
    title: "Innovación constante",
    description:
      "Fomenta la creación de nuevos productos y servicios basados en tecnologías avanzadas de IA.",
    icon: <Microscope />,
  },
];

export function Solutions() {
  return (
    <div className="relative md:my-30 overflow-hidden">
      <div className="top-0 absolute bg-linear-to-b from-black to-transparent w-full h-32" />
      <div className="bottom-0 absolute bg-linear-to-t from-black to-transparent w-full h-32" />

      <motion.section
        id="solutions"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="relative flex flex-col justify-center items-center py-8 md:py-24 w-full"
      >
        <div className="absolute h-full">
          <div className="-z-10 relative bg-black! w-full h-full min-h-screen">
            <div className="bg-black w-screen h-full min-h-screen"></div>
            <div className="top-0 right-0 bottom-0 left-0 absolute bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="top-[10%] right-[20%] absolute bg-[radial-gradient(circle_200px_at_50%_50%,#fbfbfb20,transparent)] rounded-full w-[400px] h-[400px]"></div>
            <div className="top-[60%] left-[15%] absolute bg-[radial-gradient(circle_150px_at_50%_50%,#fbfbfb15,transparent)] rounded-full w-[300px] h-[300px]"></div>
            <div className="right-[10%] bottom-[20%] absolute bg-[radial-gradient(circle_180px_at_50%_50%,#fbfbfb18,transparent)] rounded-full w-[350px] h-[350px]"></div>
            <div className="top-[30%] left-[70%] absolute bg-[radial-gradient(circle_120px_at_50%_50%,#fbfbfb12,transparent)] rounded-full w-[250px] h-[250px]"></div>
            <div className="bottom-[40%] left-[40%] absolute bg-[radial-gradient(circle_100px_at_50%_50%,#fbfbfb10,transparent)] rounded-full w-[200px] h-[200px]"></div>
          </div>
        </div>
        <h2 className="max-w-3xl text-3xl text-center">
          La IA no es solo una herramienta,{" "}
          <span className="font-bold">
            es la nueva infrastructura de los negocios.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-center">
          La inteligencia artificial está transformando la forma en que las
          empresas operan, permitiendo una mayor eficiencia y toma de decisiones
          basada en datos.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:mt-8 max-w-7xl scale-80">
          {feats.map((feat) => (
            <motion.div
              initial={{ zoom: 0.95, opacity: 0 }}
              whileInView={{ zoom: 1, opacity: 1 }}
              key={feat.title}
              className="group relative bg-card/40 hover:shadow-accent p-4 border hover:border-accent rounded-lg md:max-w-sm overflow-hidden hover:scale-[1.02] transition-all"
            >
              <div className="bottom-0 left-0 absolute opacity-10 group-hover:opacity-24 rotate-24 duration-400">
                <Slot className="size-24">{feat.icon}</Slot>
              </div>
              <h3 className="mb-8 font-bold text-2xl">{feat.title}</h3>
              <p className="max-w-xl text-muted-foreground">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
