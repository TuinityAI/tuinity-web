import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitud de Borrado de Datos — Tuinity",
  description: "Solicita la eliminación de tus datos personales en Tuinity",
};

export default function DataDeletion() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h1 className="mb-2 text-3xl font-light tracking-tight md:text-4xl" style={{ fontFamily: "var(--font-grift), sans-serif" }}>
          Solicitud de Borrado de Datos
        </h1>
        <p className="mb-8 text-sm text-neutral-500">
          Grupo Tuinity, S.A. — RUC 155779087-2-2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            De acuerdo con las políticas de Meta Platforms y las leyes de protección de datos aplicables, tenés derecho a solicitar la eliminación de todos tus datos personales almacenados por Tuinity y sus servicios conectados a Facebook, Instagram y WhatsApp.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">¿Qué datos se eliminan?</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Información de perfil (nombre, correo, teléfono).</li>
              <li>Datos de interacción con nuestros agentes conversacionales.</li>
              <li>Configuraciones de cuenta y campañas publicitarias.</li>
              <li>Cualquier dato personal asociado a tu cuenta en nuestras plataformas.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">¿Cómo solicitar el borrado?</h2>
            <p>Podés solicitar la eliminación de tus datos de cualquiera de estas formas:</p>
            <a
              href="mailto:admin@tuinity.lat?subject=Solicitud%20de%20borrado%20de%20datos"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Solicitar por correo
            </a>
            <p className="mt-4">
              <strong>O escribinos directamente a:</strong><br />
              <a href="mailto:admin@tuinity.lat" className="text-blue-600 underline">admin@tuinity.lat</a><br />
              Asunto: &ldquo;Solicitud de borrado de datos&rdquo;
            </p>
            <div className="mt-4 rounded-lg border border-neutral-200 p-4 text-sm">
              <p><strong>Teléfono:</strong> +507 6583-1063<br />
              <strong>Dirección:</strong> Parque Industrial Costa del Este, Edificio Viro Pino, Departamento 1, Panamá.</p>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">Tiempo de procesamiento</h2>
            <p>
              Tu solicitud será procesada dentro de los <strong>30 días hábiles</strong> siguientes a su recepción. Recibirás una confirmación por correo una vez completado el borrado.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">Excepciones</h2>
            <p>
              Algunos datos pueden conservarse si existe una obligación legal de hacerlo (registros fiscales, requerimientos judiciales). En esos casos, te informaremos qué datos se conservan y por qué.
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-xs text-neutral-400">
          © 2026 Grupo Tuinity, S.A. — Todos los derechos reservados.
        </footer>
      </div>
    </main>
  );
}
