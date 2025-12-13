import Script from 'next/script'

export const faqData = [
  {
    question: "¿Necesito saber de inteligencia artificial para usar Tuinity?",
    answer:
      "No, tú te enfocas en hacer crecer tu negocio. Nosotros automatizamos todo lo que hoy te quita tiempo. No tienes que aprender nada técnico. Tuinity diseña, entrena e integra las soluciones por ti, de principio a fin.",
  },
  {
    question: "¿Esto funciona con mi tipo de negocio?",
    answer:
      "Sí, si tu empresa responde mensajes, agenda reuniones o repite procesos, podemos automatizarlo. Hemos trabajado con clínicas, e-commerce, agencias, escuelas y más. Si hay tareas repetitivas, hay una solución.",
  },
  {
    question: "¿Cuánto tiempo toma tener todo funcionando?",
    answer:
      "En menos de 10 días puedes tener tu agente de voz o WhatsApp operando en tu negocio. Hacemos un diagnóstico y comenzamos la implementación de inmediato. Sin complicaciones ni tiempos innecesarios.",
  },
  {
    question: "¿Con qué herramientas se puede integrar Tuinity?",
    answer:
      "Con las que ya usas a diario: WhatsApp, Google Sheets, Calendly, CRMs, formularios web, Notion, y muchas más. Si tiene una API, la conectamos. Y si no sabes cómo hacerlo, nosotros nos encargamos.",
  },
  {
    question: "¿Qué pasa si algo falla o tengo preguntas?",
    answer:
      "Tienes soporte real, no bots. Nuestro equipo te acompaña en cada paso, desde la estrategia hasta la ejecución. Si algo necesita ajustes, respondemos rápido y de forma personalizada.",
  },
  {
    question: "¿En qué se diferencia Tuinity de un chatbot común?",
    answer:
      "Un chatbot responde. Tuinity actúa. Nuestros agentes entienden, filtran, agendan y actualizan tus sistemas como si fuera un asistente experto dentro de tu equipo, pero más rápido y sin errores.",
  },
  {
    question: "¿Puedo probar cómo funciona antes de decidirme?",
    answer:
      "Sí, puedes hablar con nuestro agente de voz o pedir una demo personalizada. En pocos minutos vas a ver por qué tantos negocios no vuelven a operar sin automatización.",
  },
];

export function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  )
}
