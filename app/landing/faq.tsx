import Orb from "@/components/Orb";
import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Receptionist from "@/components/recepcionist";
import Link from "next/link";
import { faqData } from "@/components/faq-schema";

export function Faq() {
  return (
    <motion.section
      id="faq"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center items-center gap-24 bg-linear-to-b from-[#0F0F0F] to-black pt-24 w-full"
    >
      <div className="flex flex-col justify-center items-center mt-8 px-4 max-w-4xl">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-2 font-glitz text-3xl md:text-3xl text-center"
        >
          Preguntas frecuentes antes de automatizar tu negocio
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8 text-gray-400 text-center"
        >
          Respondemos lo que muchos dueños de negocio preguntan antes de
          empezar.
        </motion.p>
        <Accordion
          type="single"
          collapsible
          className="px-8 md:px-0 w-full max-w-2xl"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mt-16 mb-16 text-center"
        >
          <p className="max-w-2xl text-gray-300 text-lg md:text-xl leading-relaxed">
            En una llamada de 30 minutos, te mostramos cómo podrías delegar en
            IA lo que hoy frena tu crecimiento.
          </p>
          <p className="max-w-2xl text-muted-foreground text-base md:text-lg">
            Es estrategia aplicada, con resultados medibles desde la primera
            semana.
          </p>
          <Link href="#contact">
            <Button
              size="lg"
              className="mt-4 px-10 py-7 font-glitz font-bold text-lg md:text-xl cursor-pointer"
            >
              Agendar tu Diagnóstico
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
