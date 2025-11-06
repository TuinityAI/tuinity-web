'use client';

import { useState, useEffect } from 'react';
import styles from './clients-section.module.css';

interface SuccessCase {
  id: number;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial: string;
  author: string;
  authorRole: string;
  logo: string;
}

const successCases: SuccessCase[] = [
  {
    id: 1,
    company: "TechStart Solutions",
    industry: "Software & Tecnología",
    challenge: "Procesaban más de 500 órdenes diarias de forma manual, generando errores constantes y retrasos en las entregas.",
    solution: "Implementamos un sistema de automatización completo con IA que clasifica, valida y enruta órdenes automáticamente.",
    results: [
      { metric: "Procesamiento", value: "+200%" },
      { metric: "Errores", value: "-95%" },
      { metric: "Tiempo", value: "-70%" }
    ],
    testimonial: "La transformación fue inmediata. Pasamos de procesar 500 a 1,500 órdenes diarias con el mismo equipo. Ahora podemos escalar sin preocuparnos por la capacidad operativa.",
    author: "María González",
    authorRole: "CEO",
    logo: "TS"
  },
  {
    id: 2,
    company: "Comercial Del Valle",
    industry: "Retail & Distribución",
    challenge: "Gestión manual de inventario en 12 sucursales causaba desabastecimiento constante y sobrecostos operativos.",
    solution: "Desarrollamos un sistema inteligente de predicción de demanda con reposición automática integrada a sus proveedores.",
    results: [
      { metric: "Costos", value: "-40%" },
      { metric: "Desabasto", value: "-85%" },
      { metric: "Rotación", value: "+120%" }
    ],
    testimonial: "Ahora tenemos visibilidad en tiempo real de todas nuestras sucursales. El sistema toma decisiones de reposición más inteligentes que nosotros, y los números lo comprueban.",
    author: "Carlos Mendoza",
    authorRole: "Director de Operaciones",
    logo: "CV"
  },
  {
    id: 3,
    company: "Silva & Asociados",
    industry: "Consultoría Legal",
    challenge: "La revisión manual de contratos tomaba entre 4 y 6 horas por documento, limitando la capacidad de atender clientes.",
    solution: "Implementamos IA especializada que identifica cláusulas críticas y genera reportes automáticos de análisis contractual.",
    results: [
      { metric: "Tiempo", value: "-80%" },
      { metric: "Clientes", value: "+300%" },
      { metric: "Ingresos", value: "+180%" }
    ],
    testimonial: "Lo que antes tomaba una jornada completa ahora toma 45 minutos. Triplicamos nuestra cartera de clientes sin necesidad de contratar más abogados. El ROI fue inmediato.",
    author: "Ana Patricia Silva",
    authorRole: "Socia Principal",
    logo: "SA"
  },
  {
    id: 4,
    company: "EcoMarket",
    industry: "E-commerce Sostenible",
    challenge: "Necesitaban atención al cliente 24/7 pero su equipo pequeño generaba tiempos de respuesta superiores a 8 horas.",
    solution: "Desarrollamos un chatbot con IA conversacional integrado a inventario, envíos y políticas, con escalamiento inteligente.",
    results: [
      { metric: "Respuesta", value: "-92%" },
      { metric: "Satisfacción", value: "+65%" },
      { metric: "Costos", value: "-55%" }
    ],
    testimonial: "Ahora atendemos 10 veces más consultas con mejor calidad. El bot resuelve el 87% sin intervención humana y los casos complejos llegan mejor contextualizados al equipo.",
    author: "Roberto Jiménez",
    authorRole: "Fundador & CEO",
    logo: "EM"
  }
];

export default function ClientsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [casesPerView, setCasesPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setCasesPerView(window.innerWidth <= 968 ? 1 : 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(successCases.length / casesPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleCases = successCases.slice(
    currentIndex * casesPerView,
    (currentIndex + 1) * casesPerView
  );

  return (
    <section className={styles.clientsSection}>
      <div className={styles.container}>
        <h2 className={`${styles.title} scroll-reveal`}>
          Casos de Éxito
        </h2>
        <p className={`${styles.subtitle} scroll-reveal`}>
          Resultados reales, medibles y transformadores
        </p>

        <div className={styles.sliderContainer}>
          <button
            onClick={handlePrev}
            className={styles.sliderBtn}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className={styles.casesGrid}>
            {visibleCases.map((successCase) => (
              <div
                key={successCase.id}
                className={styles.caseCard}
              >
                {/* Company Header */}
                <div className={styles.caseHeader}>
                  <div className={styles.companyLogo}>{successCase.logo}</div>
                </div>

                {/* Company Info */}
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>{successCase.company}</h3>
                  <p className={styles.industry}>{successCase.industry}</p>
                </div>

                {/* Challenge */}
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>El Desafío</h4>
                  <p className={styles.sectionText}>{successCase.challenge}</p>
                </div>

                {/* Solution */}
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>La Solución</h4>
                  <p className={styles.sectionText}>{successCase.solution}</p>
                </div>

                {/* Results */}
                <div className={styles.resultsSection}>
                  <div className={styles.metricsGrid}>
                    {successCase.results.map((result, idx) => (
                      <div key={idx} className={styles.metric}>
                        <div className={styles.metricValue}>{result.value}</div>
                        <div className={styles.metricLabel}>{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className={styles.testimonial}>
                  <p className={styles.testimonialText}>"{successCase.testimonial}"</p>
                  <div className={styles.author}>
                    <div className={styles.authorAvatar}>
                      {successCase.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{successCase.author}</span>
                      <span className={styles.authorRole}>{successCase.authorRole}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className={styles.sliderBtn}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        {/* Pagination dots */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${styles.paginationDot} ${idx === currentIndex ? styles.active : ''}`}
              aria-label={`Ir a página ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
