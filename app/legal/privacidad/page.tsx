import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de alexendros.me conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: "/legal/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <h1>Política de privacidad</h1>

      {/* BLOQUE 1 — Lo esencial */}
      <section aria-labelledby="priv-esencial">
        <h2 id="priv-esencial">Lo esencial</h2>
        <p>
          Este sitio <strong>no activa ningún tracker</strong>, no instala cookies de terceros y no
          envía tus datos a nadie salvo lo estrictamente necesario para que el hosting funcione. Si
          me escribes por email, uso tus datos solo para responderte. Sin newsletter, sin CRM, sin
          perfiles.
        </p>
      </section>

      {/* BLOQUE 2 — Detalle */}
      <section aria-labelledby="priv-detalle">
        <h2 id="priv-detalle">Detalle</h2>

        <h3>¿Quién trata tus datos?</h3>
        <p>
          Responsable: Alejandro Domingo Agustí, NIF 21002968N, Valencia, España.{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>.
        </p>

        <h3>¿Qué datos tratamos y para qué?</h3>
        <table className="legal-table">
          <thead>
            <tr>
              <th scope="col">Origen</th>
              <th scope="col">Dato</th>
              <th scope="col">Finalidad</th>
              <th scope="col">Base legal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Origen">Email (si me escribes)</td>
              <td data-label="Dato">Dirección de correo + contenido del mensaje</td>
              <td data-label="Finalidad">Responder tu consulta</td>
              <td data-label="Base legal">Interés legítimo (Art. 6.1.f RGPD)</td>
            </tr>
            <tr>
              <td data-label="Origen">Hosting (Vercel)</td>
              <td data-label="Dato">IP, user-agent, URL solicitada</td>
              <td data-label="Finalidad">Servir el sitio y detectar abusos</td>
              <td data-label="Base legal">Interés legítimo (Art. 6.1.f RGPD) — política Vercel</td>
            </tr>
          </tbody>
        </table>

        <h3>¿Cuánto tiempo conservamos los datos?</h3>
        <p>
          Los correos se conservan mientras sean necesarios para gestionar la comunicación y hasta 1
          año tras el último intercambio. Los logs de servidor son gestionados por Vercel conforme a
          su propia política de retención.
        </p>

        <h3>¿A quién cedemos tus datos?</h3>
        <p>
          No cedemos datos a terceros con fines comerciales. Los proveedores de infraestructura
          (Vercel, Cloudflare) acceden a datos técnicos como encargados del tratamiento, bajo
          acuerdos conformes al RGPD (cláusulas contractuales estándar).
        </p>

        <h3>Transferencias internacionales</h3>
        <p>
          Vercel y Cloudflare tienen infraestructura en Estados Unidos. Las transferencias se
          amparan en las Cláusulas Contractuales Tipo (SCCs) aprobadas por la Comisión Europea.
        </p>
      </section>

      {/* BLOQUE 3 — Tus derechos */}
      <section aria-labelledby="priv-derechos">
        <h2 id="priv-derechos">Tus derechos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>
            <strong>Acceso</strong> — saber qué datos tenemos sobre ti.
          </li>
          <li>
            <strong>Rectificación</strong> — corregir datos inexactos.
          </li>
          <li>
            <strong>Supresión</strong> — solicitar la eliminación de tus datos.
          </li>
          <li>
            <strong>Oposición</strong> — oponerte al tratamiento basado en interés legítimo.
          </li>
          <li>
            <strong>Limitación</strong> — restringir el tratamiento en determinadas circunstancias.
          </li>
          <li>
            <strong>Portabilidad</strong> — recibir tus datos en formato estructurado.
          </li>
        </ul>
        <p>
          Ejerce cualquiera de ellos escribiendo a{" "}
          <a href="mailto:contacto@alexendros.me">contacto@alexendros.me</a>. Responderemos en el
          plazo de un mes (prorrogable a tres si la complejidad lo justifica). También puedes
          reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos (AEPD)
          </a>
          .
        </p>
      </section>

      {/* BLOQUE 4 — Texto formal */}
      <section aria-labelledby="priv-formal">
        <h2 id="priv-formal">Texto formal</h2>
        <p>
          La presente Política de Privacidad se elabora en cumplimiento del Reglamento (UE)
          2016/679 del Parlamento Europeo y del Consejo (RGPD) y de la Ley Orgánica 3/2018, de 5
          de diciembre, de Protección de Datos Personales y garantía de los derechos digitales
          (LOPDGDD).
        </p>
        <p>
          El titular aplica medidas técnicas y organizativas adecuadas para garantizar un nivel de
          seguridad apropiado al riesgo (Art. 32 RGPD) y notificará cualquier violación de
          seguridad a la AEPD en el plazo de 72 horas si resulta probable que entrañe riesgo para
          los derechos y libertades de las personas.
        </p>
        <p>
          <em>Última actualización: mayo de 2026.</em>
        </p>
      </section>
    </>
  );
}
