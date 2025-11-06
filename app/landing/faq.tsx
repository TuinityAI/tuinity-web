"use client";

import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <motion.section
      id="faq"
      className="flex flex-col justify-center items-center gap-8 bg-gradient-to-b from-[#0F0F0F] to-black pt-24 pb-24 w-full"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="relative flex justify-center items-center grayscale-100 size-70">
          <Receptionist />
          <div className="absolute size-full">
            <Orb />
          </div>
        </div>
      </div>
      <hr className="hidden md:block bg-border w-px h-100" />
      <div className="flex flex-col justify-center items-center mt-8">
        <h3 className="font-glitz">Frequently Answered Questions</h3>
        <Accordion type="single" collapsible className="w-80 md:w-96">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Qué es Tuinity?</AccordionTrigger>
            <AccordionContent>
              Tuinity es una consultoría impulsada por IA que ayuda a las
              empresas a optimizar sus procesos y tomar decisiones informadas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Cómo funciona?</AccordionTrigger>
            <AccordionContent>
              Utilizamos algoritmos de IA para analizar datos y proporcionar
              recomendaciones personalizadas a nuestros clientes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Cuáles son los beneficios?</AccordionTrigger>
            <AccordionContent>
              Los beneficios incluyen una mayor eficiencia, reducción de costos
              y decisiones basadas en datos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.section>
  );
}
