import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal de alexendros.me conforme al Art. 10 LSSI-CE.",
  alternates: { canonical: "/legal/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <>
      <h1>Aviso legal</h1>

      {/* BLOQUE 1 — Lo esencial */}
      <section aria-labelledby="al-esencial">
        <h2 id="al-esencial">Lo esencial</h2>
        <p>
          Este sitio es una landing personal. No vende nada directamente, no recoge formularios, no
          activa rastreo sin consentimiento. Los únicos datos obligatorios por ley son los del
          titular (debajo). Si necesitas más detalle, el bloque formal lo tiene todo.
        </p>
      </section>

      {/* BLOQUE 2 — Detalle */}
      <section aria-labelledby="al-detalle">
        <h2 id="al-detalle">Detalle</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">Campo</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Campo">Titular</td>
              <td data-label="Valor">Alejandro Domingo Agustí</td>
            </tr>
            <tr>
              <td data-label="Campo">NIF</td>
              <td data-label="Valor">21002968N</td>
            </tr>
            <tr>
              <td data-label="Campo">Domicilio</td>
              <td data-label="Valor">
                Valencia, España (dirección completa disponible a efectos legales previa solicitud)
              </td>
            </tr>
            <tr>
              <td data-label="Campo">Email de contacto</td>
              <td data-label="Valor">
                <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>
              </td>
            </tr>
            <tr>
              <td data-label="Campo">Dominio</td>
              <td data-label="Valor">alexendros.me</td>
            </tr>
            <tr>
              <td data-label="Campo">Actividad</td>
              <td data-label="Valor">
                Prestación de servicios de desarrollo de software y consultoría tecnológica
              </td>
            </tr>
            <tr>
              <td data-label="Campo">Infraestructura</td>
              <td data-label="Valor">
                Vercel, Inc. (hosting) · Cloudflare (CDN) — ambos con SCCs para transferencias
                internacionales
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          El contenido de este sitio es propiedad del titular. Queda prohibida su reproducción
          total o parcial sin autorización expresa, salvo usos permitidos por la normativa de
          propiedad intelectual.
        </p>
        <p>
          El titular no se hace responsable de los contenidos enlazados en sitios de terceros, que
          operan bajo sus propias políticas.
        </p>
      </section>

      {/* BLOQUE 3 — Tus derechos */}
      <section aria-labelledby="al-derechos">
        <h2 id="al-derechos">Tus derechos</h2>
        <p>
          Puedes ejercer los derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) y los
          derechos adicionales del RGPD (Limitación, Portabilidad, Supresión) escribiendo a{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>. También puedes
          reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos (AEPD)
          </a>
          .
        </p>
      </section>

      {/* BLOQUE 4 — Texto formal */}
      <section aria-labelledby="al-formal">
        <h2 id="al-formal">Texto formal</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se hace constar que el
          titular del dominio alexendros.me es <strong>Alejandro Domingo Agustí</strong>, con NIF
          21002968N, con domicilio en Valencia, España, y correo electrónico{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>.
        </p>
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web{" "}
          <strong>https://alexendros.me</strong>. El acceso implica la aceptación plena y sin
          reservas de las condiciones establecidas. El titular se reserva el derecho de
          modificarlas; los cambios se publicarán en esta misma página.
        </p>
        <p>
          El Sitio se rige por la legislación española y europea aplicable. Ante cualquier
          controversia, las partes se someten a los juzgados y tribunales de Valencia.
        </p>
        <p>
          <em>Última actualización: mayo de 2026.</em>
        </p>
      </section>
    </>
  );
}
