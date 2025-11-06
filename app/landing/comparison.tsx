import * as motion from "motion/react-client";
import LightRays from "@/components/LightRays";

const comparisonData = [
  {
    side: "manual",
    title: "Trabajo manual",
    points: [
      "Propenso a errores humanos",
      "Limitado por horarios de trabajo",
      "Costos altos y overhead",
      "Tareas lentas y tediosas",
      "Dependencia del equipo",
    ],
  },
  {
    side: "tuinity",
    title: "Nuestra Consultoría",
    points: [
      "Decisiones impulsadas por IA",
      "Automatización 24/7",
      "Escalable y rentable",
      "Procesamiento de datos instantáneo",
      "Resultados consistentes y confiables",
    ],
  },
];

export function Comparison() {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative bg-linear-to-b from-black via-[#050505] to-black mx-auto md:py-16 max-w-4xl"
    >
      <h2 className="mb-4 text-4xl text-center">
        ¿Por qué elegir <span className="font-glitz">Tuinity</span>?
      </h2>
      <p className="text-muted-foreground text-center">
        Compara las desventajas del trabajo manual con las ventajas de nuestra
        consultoría impulsada por IA.
      </p>
      <div className="flex md:flex-row-reverse flex-wrap justify-center items-start gap-8 mx-auto mt-12">
        {comparisonData.toReversed().map((card) => (
          <div
            key={card.side}
            className={
              card.side === "manual"
                ? "opacity-90 p-8 border rounded-lg w-80 h-80"
                : "relative shadow-foreground/5 backdrop-blur-2xl shadow-lg p-8 border-foreground border rounded-md w-80 h-80 overflow-hidden scale-110"
            }
          >
            {card.side === "tuinity" && (
              <div className="-z-10 absolute inset-0 size-full">
                <LightRays />
              </div>
            )}
            <h3
              className={
                card.side === "manual"
                  ? "text-xl mb-4"
                  : "mb-4 font-bold text-2xl"
              }
            >
              {card.title}
            </h3>
            <hr />
            <ul className="space-y-3 mt-6 text-sm">
              {card.points.map((point, idx) => {
                const text = point;
                const icon = card.side === "manual" ? "✕" : "✓";
                const iconColor =
                  card.side === "manual" ? "text-destructive" : "text-primary";
                const textColor =
                  card.side === "manual"
                    ? "text-muted-foreground"
                    : "text-foreground";

                return (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-0.5 font-bold`}>{icon}</span>
                    <span className="text-muted-foreground">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
