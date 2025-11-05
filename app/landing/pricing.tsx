import * as motion from "motion/react-client";
import Countup from "@/components/CountUp";
import { Button } from "@/components/ui/button";

const options = [
  { title: "Apple", price: 250 },
  { title: "Apple+", price: 450 },
  { title: "PaperProject" },
];

export function Pricing() {
  return (
    <motion.section
      id="pricing"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="relative flex flex-col justify-center items-center w-full text-center"
    >
      <h2 className="text-4xl">Encuentra el plan perfecto para tu negocio</h2>
      <p className="my-3 mb-12 text-muted-foreground">
        Escoge entre nuestras opciones de precios flexibles diseñadas para
        adaptarse a las necesidades de tu empresa.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 w-full">
        {options.map((option, index) => (
          <div
            key={option.title}
            className={`inline-block bg-linear-to-b from-card/30 to-transparent mb-6 p-6 border-foreground border-t w-60 h-80 ${
              index === 1 ? "scale-110 z-10" : ""
            }`}
          >
            <h3 className="mb-4 font-glitz font-light text-xl">
              {option.title}
            </h3>
            <div className="font-bold text-4xl">
              {option.price ? (
                <>
                  <Countup from={0} to={option.price} direction="up" />$
                </>
              ) : (
                "Custom"
              )}
              <span className="font-normal text-muted-foreground text-xl">
                /mo
              </span>
            </div>
            <Button variant="outline" className="mt-8 w-full">
              Contactar
            </Button>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
