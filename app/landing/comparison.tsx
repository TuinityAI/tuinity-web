import * as motion from "motion/react-client";
import LightRays from "@/components/LightRays";

const comparisonData = [
  {
    side: "manual",
    title: (
      <>
        Sin <span className="font-glitz">Tuinity</span>
      </>
    ),
    points: [
      "Tareas repetitivas que consumen tiempo todos los días",
      "Leads sin seguimiento = oportunidades perdidas",
      "Procesos desconectados entre equipos y herramientas",
      "Dependes de personas para que todo funcione",
    ],
  },
  {
    side: "tuinity",
    title: "Nuestra Consultoría",
    points: [
      "Sistemas personalizados para tu negocio",
      "Soporte estratégico en ventas, marketing y atención",
      "Integración con tus herramientas del día a día",
      "Implementación guiada y acompañamiento real",
      "Aprende a aplicar IA sin ser técnico",
    ],
  },
];

export function Comparison() {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative bg-gradient-to-b from-[#050505] via-[#030303] to-black mx-auto pt-8 md:pt-16 pb-16 md:pb-24 max-w-4xl"
    >

      <h2 className="mb-4 text-4xl text-center relative z-10">
        ¿Por qué elegir <span className="font-glitz">Tuinity</span>?
      </h2>
      <p className="text-muted-foreground text-center relative z-10">
        Compara las desventajas del trabajo manual con las ventajas de nuestra
        consultoría impulsada por IA.
      </p>
      <div className="flex md:flex-row-reverse flex-wrap justify-center items-start gap-8 mx-auto mt-12 relative z-10">
        {comparisonData.toReversed().map((card) => (
          <div
            key={card.side}
            className={
              card.side === "manual"
                ? "opacity-90 p-6 border rounded-lg w-80"
                : "relative shadow-foreground/5 backdrop-blur-2xl shadow-lg p-6 border-foreground border rounded-md w-80 overflow-hidden scale-110"
            }
            style={card.side === "tuinity" ? { background: 'linear-gradient(90deg, rgba(222, 254, 255, 0.25) 0%, rgba(222, 254, 255, 0.1) 50%, #000000 100%)' } : undefined}
          >
            {card.side === "tuinity" && (
              <div className="-z-10 absolute inset-0 size-full">
                <LightRays raysColor="#defeff" />
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
            <ul className={card.side === "manual" ? "space-y-4 mt-6 text-sm" : "space-y-3 mt-6 text-sm"}>
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
