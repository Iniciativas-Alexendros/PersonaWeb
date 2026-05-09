import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de alexendros.me conforme a la Guía AEPD 2023.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <h1>Política de cookies</h1>

      {/* BLOQUE 1 — Lo esencial */}
      <section aria-labelledby="ck-esencial">
        <h2 id="ck-esencial">Lo esencial</h2>
        <p>
          Este sitio <strong>no instala cookies de terceros</strong> ni activa ningún tracker. El
          único almacenamiento que puede generarse es el técnico del CDN. No hay publicidad, no hay
          perfiles, no hay remarketing.
        </p>
        <p>
          No verás un banner de aceptación porque no hay cookies que requieran consentimiento previo
          según la Guía de la AEPD 2023.
        </p>
      </section>

      {/* BLOQUE 2 — Detalle */}
      <section aria-labelledby="ck-detalle">
        <h2 id="ck-detalle">Detalle</h2>

        <h3>¿Qué es una cookie?</h3>
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en tu dispositivo.
          Las cookies que no sean estrictamente necesarias para la prestación del servicio requieren
          consentimiento previo e informado.
        </p>

        <h3>Inventario de cookies</h3>
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Tipo</th>
              <th scope="col">Finalidad</th>
              <th scope="col">Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Nombre">__cf_bm</td>
              <td data-label="Proveedor">Cloudflare</td>
              <td data-label="Tipo">Técnica necesaria</td>
              <td data-label="Finalidad">Detección de bots, protección DDoS</td>
              <td data-label="Duración">30 minutos</td>
            </tr>
            <tr>
              <td data-label="Nombre">_vercel_no_cache</td>
              <td data-label="Proveedor">Vercel</td>
              <td data-label="Tipo">Técnica necesaria</td>
              <td data-label="Finalidad">Control de caché en modo desarrollo</td>
              <td data-label="Duración">Sesión</td>
            </tr>
          </tbody>
        </table>

        <p>
          Ambas son técnicas y estrictamente necesarias. No requieren consentimiento previo
          conforme al Art. 22.2 LSSI-CE y la Guía AEPD 2023.
        </p>

        <h3>Sin analytics ni publicidad</h3>
        <p>
          Este sitio no usa Google Analytics, Meta Pixel ni ningún sistema de seguimiento
          publicitario. Si en el futuro se incorporase cualquier cookie no técnica, se actualizará
          esta política y se implementará un mecanismo de consentimiento previo.
        </p>

        <h3>Cómo gestionar las cookies</h3>
        <p>
          Puedes bloquearlas o eliminarlas desde la configuración de tu navegador:{" "}
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
          {" · "}
          <a
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
          {" · "}
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
          .
        </p>
      </section>

      {/* BLOQUE 3 — Tus derechos */}
      <section aria-labelledby="ck-derechos">
        <h2 id="ck-derechos">Tus derechos</h2>
        <p>
          En relación con el tratamiento de datos derivado de las cookies técnicas (IP, logs),
          puedes ejercer tus derechos ARCO y adicionales del RGPD escribiendo a{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>. Ver la{" "}
          <a href="/legal/privacidad">Política de Privacidad</a> para el detalle completo.
        </p>
      </section>

      {/* BLOQUE 4 — Texto formal */}
      <section aria-labelledby="ck-formal">
        <h2 id="ck-formal">Texto formal</h2>
        <p>
          La presente Política de Cookies se elabora en cumplimiento del artículo 22.2 de la Ley
          34/2002 (LSSI-CE), del Reglamento (UE) 2016/679 (RGPD) y de la Guía sobre el uso de las
          cookies publicada por la AEPD en 2023.
        </p>
        <p>
          Responsable del tratamiento: Alejandro Domingo Agustí, NIF 21002968N, Valencia, España.{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>.
        </p>
        <p>
          <em>Última actualización: mayo de 2026.</em>
        </p>
      </section>
    </>
  );
}
