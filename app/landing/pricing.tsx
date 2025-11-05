import * as motion from "motion/react-client";
import Countup from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";

const options: {
  title: string;
  price?: number;
  description: string;
  feats: string[];
}[] = [
  {
    title: "Apple",
    price: 250,
    description:
      "Ideal para pequeñas empresas que buscan iniciar su viaje con IA.",
    feats: [
      "Automatización básica de tareas",
      "Chatbot estándar",
      "Soporte limitado",
    ],
  },
  {
    title: "Apple+",
    price: 450,
    description: "Para empresas en crecimiento que necesitan más recursos.",
    feats: [
      "Automatización avanzada de tareas",
      "Chatbot personalizado",
      "Análisis de datos",
    ],
  },
  {
    title: "PaperProject",
    description: "Una solución personalizada para tus necesidades específicas.",
    feats: [
      "Soluciones a medida",
      "Integraciones avanzadas",
      "Soporte prioritario",
    ],
  },
];

export function Pricing() {
  return (
    <motion.section
      id="pricing"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative bg-linear-to-b from-transparent via-transparent to-[#0F0F0F] py-8 md:py-32"
    >
      <div className="-z-10 absolute size-full">
        <Particles
          className="opacity-40 size-full"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
        />
      </div>
      <div className="flex flex-col justify-center items-center mx-auto my-16 py-8 border-t border-b w-full max-w-3xl">
        <h2 className="text-4xl text-center">Encuentra el plan perfecto para tu negocio</h2>
        <p className="my-3 mb-12 text-muted-foreground text-center">
          Escoge entre nuestras opciones de precios flexibles la que se adapte a
          las necesidades de tu negocio.
        </p>
        <div className="flex flex-wrap justify-center items-start gap-6 w-full">
          {options.map((option, index) => (
            <div
              key={option.title}
              className={`inline-block bg-linear-to-b from-card/60 to-transparent mb-6 p-6 border-foreground border-t md:w-60 hover:bg-card/60 duration-400 ${
                index === 1 ? "scale-110 z-10" : ""
              }`}
            >
              <h3 className="mb-4 font-glitz font-light text-xl">
                {option.title}
              </h3>
              <div className="flex flex-col">
                <div className="font-bold text-4xl" aria-label="price" title={option.price as string}>
                  {option.price ? (
                    <>
                      <Countup delay={3000} from={0} to={option.price} direction="up" />$
                    </>
                  ) : (
                    "Custom"
                  )}
                  <span className="font-normal text-muted-foreground text-xl">
                    /mo
                  </span>
                </div>
                <span
                  className={`text-muted-foreground text-xl ${
                    option.price ? "line-through" : ""
                  }`}
                >
                  {option.price ? option.price + 50 + "$" : "Custom pricing"}
                </span>
              </div>
              <Button variant="outline" className="mt-8 border-foreground! rounded-sm w-full">
                Contactar
              </Button>

              <div className="mt-4 text-muted-foreground text-xs">
                <p>{option.description}</p>

                {option.feats.map((feat) => (
                  <p key={feat} className="text-foreground">✓ {feat}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
