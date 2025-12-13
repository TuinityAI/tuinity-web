import * as motion from "motion/react-client";
import { Phone, MessageCircle, Radio } from "lucide-react";
import Image from "next/image";

const cases = [
  {
    title: "Voice Agent (Clínica)",
    metric: "+60% citas agendadas",
    quote: "Una recepcionista que no duerme. Así sentimos al voice agent.",
    testimonial:
      "Antes perdíamos pacientes por no contestar fuera de horario. Ahora el agente de voz responde, filtra y agenda solo. Estamos creciendo sin aumentar personal.",
    name: "Sofía Martínez",
    role: "Partner de Karika Dental Solutions",
    icon: Phone,
    image: "https://raw.githubusercontent.com/soyfulin/fluffysharkss/refs/heads/main/gyal.jpeg", // You'll need to add the actual image
  },
    {
      title: "Chat Agent WhatsApp (Ecommerce)",
      metric: "80% menos carga operativa en atención",
      quote: "Delegamos WhatsApp y no miramos atrás.",
      testimonial:
        "Tuinity nos ayudó a entrenar un agente que responde dudas, hace seguimiento y convierte clientes sin intervención humana.",
      name: "Juan José de Abreu",
      role: "Co-Founder de TheFluffyBrand",
      icon: MessageCircle,
      image: "https://raw.githubusercontent.com/soyfulin/fluffysharkss/refs/heads/main/fulin.jpg", // You'll need to add the actual image
    },
  {
    title: "Broadcast (Agencia de Leads)",
    metric: "5.000+ clientes impactados por campaña",
    quote: "Antes mandábamos correos. Hoy tenemos WhatsApp con IA.",
    testimonial:
      'Usamos Tuinity Broadcast para enviar promociones segmentadas por intereses. Las aperturas y respuestas son altísimas.',
    name: "Sergion Goon",
    role: "CEO de Nogo Solutions",
    icon: Radio,
    image: "https://raw.githubusercontent.com/soyfulin/fluffysharkss/refs/heads/main/sergio.jpeg", // You'll need to add the actual image
  },
];

export function SuccessCases() {
  return (
    <motion.section
      id="testimonials"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative flex flex-col justify-center items-center bg-linear-to-b from-transparent via-transparent to-[#0F0F0F] px-4 py-8 md:py-24 w-full"
    >
        <h2 className="max-w-4xl font-bold text-4xl md:text-5xl text-center">
          ¿Funciona? Que hablen nuestros clientes por nosotros.
        </h2>
        <p className="mt-6 max-w-3xl text-muted-foreground text-xl text-center">
          Descubre cómo ayudamos a fundadores, equipos y marcas a escalar su
          operación sin escalar sus costos.
        </p>

        <div className="flex md:flex-row flex-col gap-4 mt-12 md:mt-16 w-full max-w-7xl">
          {cases.map((caseItem, index) => (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={caseItem.name}
              className="group relative flex-1 bg-card/40 hover:shadow-accent p-5 border border-primary rounded-xl hover:scale-[1.01] transition-all"
            >
              <div className="flex flex-col h-full">
                {/* Header with icon and title */}
                <div className="flex items-center gap-2 mb-3">
                  <caseItem.icon className="size-5 text-primary" />
                  <span className="text-muted-foreground text-xs">
                    {caseItem.title}
                  </span>
                </div>
                
                {/* Metric */}
                <h3 className="mb-3 font-glitz text-primary text-xl md:text-2xl">
                  {caseItem.metric}
                </h3>

                {/* Quote */}
                <p className="mb-3 font-semibold text-foreground text-base">
                  "{caseItem.quote}"
                </p>

                {/* Testimonial */}
                <p className="flex-1 mb-4 text-muted-foreground text-sm leading-relaxed">
                  {caseItem.testimonial}
                </p>

                {/* Author info with small image */}
                <div className="flex items-center gap-3 mt-auto pt-3 border-primary/20 border-t">
                  <div className="relative bg-muted rounded-full w-10 h-10 overflow-hidden shrink-0">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {caseItem.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {caseItem.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative icon in background */}
              <div className="right-3 bottom-3 absolute opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <caseItem.icon className="size-24" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
  );
}
