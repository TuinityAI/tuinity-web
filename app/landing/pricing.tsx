import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";
import { Phone, MessageCircle, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const products: {
  title: string;
  icon: LucideIcon;
  description: string;
  feats: string[];
  cta: string;
}[] = [
  {
    title: "Tuinity Voice Agent",
    icon: Phone,
    description:
      "Convierte llamadas en oportunidades sin intervención humana. Nuestros agentes de voz entrenados escuchan, entienden, responden y agendan por ti — como un recepcionista, pero disponible 24/7, con memoria y sin errores.",
    feats: [
      "Llamadas salientes con voz natural",
      "Agendado automático conectado a tu calendario",
      "Entrenamiento adaptado a tu negocio",
      "Integración con WhatsApp, CRM y formularios",
    ],
    cta: "Solicitar demo",
  },
  {
    title: "Tuinity Chat Agent",
    icon: MessageCircle,
    description:
      "Automatizá tu atención al cliente o ventas por WhatsApp con un agente personalizado. Responde mensajes, califica leads, agenda citas o resuelve dudas sin necesidad de un equipo humano detrás. Flujo inteligente, integrado y disponible en segundos.",
    feats: [
      "Respuestas automáticas con lógica condicional",
      "Seguimiento y agendado dentro de WhatsApp",
      "Integración con CRM, Sheets o bases de datos",
      "Entrenamiento personalizado por tipo de cliente",
    ],
    cta: "Solicitar demo",
  },
  {
    title: "Tuinity Broadcast",
    icon: Radio,
    description:
      "Enviá mensajes masivos segmentados por WhatsApp con alta tasa de apertura. Diseñado para campañas, promociones o notificaciones a gran escala. Manda un solo mensaje que impacte a miles de personas al instante, con seguimiento y métricas.",
    feats: [
      "Envío a más de 5,000 contactos por campaña",
      "Segmentación por etiquetas, historial o interés",
      "Reportes de apertura y conversión",
      "Integración con tu stack de marketing",
    ],
    cta: "Solicitar demo",
  },
];

export function Pricing() {
  return (
    <motion.section
      id="products"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative py-8 md:py-32"
    >
      <div className="-z-10 absolute size-full">
        <Particles
          className="opacity-40 size-full"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
        />
      </div>
      <div className="flex flex-col justify-center items-center mx-auto my-16 py-8 border-t border-b w-full max-w-6xl">
        <h2 className="font-glitz text-primary text-4xl text-center">
          Nuestras Soluciones
        </h2>
        <p className="my-3 mb-12 text-muted-foreground text-center">
          Desde atención por voz, WhatsApp o mensajes masivos: todo lo que
          necesitas para operar como una empresa del futuro, hoy.
        </p>
        <div className="flex flex-wrap justify-center items-stretch gap-6 w-full">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className={`inline-block bg-linear-to-b from-card/60 to-transparent mb-6 p-6 border-primary border-t md:w-90 hover:bg-card/60 duration-400 ${
                  index === 1 ? "scale-105 z-10" : ""
                }`}
              >
                <div className="flex items-center gap-3 mx-auto mb-4 text-primary">
                  <Icon className="w-8 h-8" />
                  <h3 className="font-glitz font-light text-xl">
                    {product.title}
                  </h3>
                </div>

                <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="font-semibold text-sm">Funciones destacadas:</p>
                  {product.feats.map((feat) => (
                    <p key={feat} className="text-foreground text-sm">
                      ✓ {feat}
                    </p>
                  ))}
                </div>
                <Link href="#contact" className="w-full cursor-pointer">
                  <Button
                    variant="outline"
                    className="mt-auto border-primary! rounded-sm w-full"
                  >
                    {product.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
