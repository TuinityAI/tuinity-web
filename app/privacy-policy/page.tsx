import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Tuinity",
  description: "Política de privacidad de Grupo Tuinity, S.A.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-grift), sans-serif" }}>
          Política de Privacidad
        </h1>
        <p className="mb-8 text-sm text-neutral-500">
          Grupo Tuinity, S.A. — RUC 155779087-2-2026 · Última actualización: julio 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">1. Información que recopilamos</h2>
            <p>
              Grupo Tuinity, S.A. (&ldquo;Tuinity&rdquo;) recopila la siguiente información a través de nuestras aplicaciones y servicios conectados a plataformas de Meta (Facebook, Instagram, WhatsApp):
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><strong>Datos de clientes finales:</strong> nombre, número de teléfono, mensajes de chat y llamadas, gestionados exclusivamente en infraestructura propia de nuestros clientes.</li>
              <li><strong>Datos de gestión publicitaria:</strong> métricas de campañas, presupuestos y rendimiento de anuncios, accedidos vía la API de Marketing de Meta.</li>
              <li><strong>Datos de cuenta:</strong> correo electrónico y credenciales de acceso a nuestras plataformas.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">2. Cómo usamos la información</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Para proporcionar y mantener nuestros servicios de agentes conversacionales y gestión publicitaria.</li>
              <li>Para crear, gestionar y optimizar campañas publicitarias en nombre de nuestros clientes.</li>
              <li>Para comunicarnos con clientes sobre sus servicios y soporte técnico.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">3. Compartición de datos</h2>
            <p>No vendemos ni alquilamos datos de nuestros usuarios. Compartimos información únicamente con:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Meta Platforms, Inc. para la operación de campañas publicitarias y servicios de mensajería.</li>
              <li>Proveedores de infraestructura bajo acuerdos de confidencialidad.</li>
              <li>Autoridades competentes cuando sea legalmente requerido.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">4. Almacenamiento y seguridad</h2>
            <p>
              Los datos se almacenan en servidores seguros con cifrado en tránsito y en reposo. El acceso está restringido a personal autorizado de Tuinity. Los datos de pacientes de clientes de salud se procesan exclusivamente en la infraestructura del cliente y nunca pasan por servicios de terceros.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">5. Tus derechos</h2>
            <p>
              Podés ejercer tus derechos de acceso, rectificación, eliminación y portabilidad de tus datos personales contactándonos a <a href="mailto:admin@tuinity.lat" className="text-blue-600 underline">admin@tuinity.lat</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">6. Retención de datos</h2>
            <p>
              Conservamos los datos mientras la cuenta del cliente esté activa. Al cancelar el servicio, los datos se eliminan dentro de los 30 días siguientes, salvo obligación legal de conservación.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">7. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Los cambios significativos se notificarán por correo electrónico a los clientes activos.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">8. Contacto</h2>
            <div className="rounded-lg border border-neutral-200 p-4 text-sm">
              <p><strong>Grupo Tuinity, S.A.</strong><br />
              Parque Industrial Costa del Este, Edificio Viro Pino, Departamento 1, Panamá.<br />
              Correo: <a href="mailto:admin@tuinity.lat" className="text-blue-600 underline">admin@tuinity.lat</a><br />
              Teléfono: +507 6583-1063</p>
            </div>
          </section>
        </div>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-xs text-neutral-400">
          © 2026 Grupo Tuinity, S.A. — Todos los derechos reservados.
        </footer>
      </div>
    </main>
  );
}
