"use client";

import * as motion from "motion/react-client";
import Receptionist from "@/components/recepcionist";

export function Playground() {
  return (
    <motion.section
      id="playground"
      className="relative flex flex-col justify-center items-center gap-12 md:gap-16 bg-radial from-[#99c3] via-[#0a0a0a] to-black pt-24 pb-24 w-full overflow-hidden"
    >
     

      {/* Title */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-5xl md:text-7xl font-glitz text-center px-4"
          style={{ color: '#defeff' }}
        >
          Habla con Tuinity
        </h2>
        <p className="text-muted-foreground text-center px-4">
          Descubre en un minuto cómo la IA reemplaza al humano.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Receptionist />
      </motion.div>
    </motion.section>
  );
}
