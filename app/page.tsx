import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StackMarquee } from "@/components/stack-marquee";
import { ContactFab } from "@/components/contact-fab";
import { ReferralsFab } from "@/components/referrals-fab";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const misions = [
  {
    title: "alexendros.pro",
    status: "En construcción",
    statusVariant: "default" as const,
    year: "2024–",
    stack: ["Next.js", "Supabase", "Prisma", "Stripe", "Turborepo"],
    description:
      "Plataforma SaaS multi-app. Cada vertical es un producto independiente sobre infraestructura compartida: auth, pagos, email. StageKit (producción electrónica) en MVP.",
    url: "https://alexendros.pro",
  },
  {
    title: "alexendros.me",
    status: "Rebuild activo",
    statusVariant: "secondary" as const,
    year: "2025–",
    stack: ["Next.js", "Tailwind v4", "Vergina v0.2.2"],
    description:
      "Este sitio. Campo de pruebas de branding e identidad visual antes de aplicarlos al producto. Criterio en abierto.",
    url: null,
  },
  {
    title: "LexKit · GestKit",
    status: "Roadmap",
    statusVariant: "secondary" as const,
    year: "2026",
    stack: [],
    description:
      "Verticales para despachos jurídicos y gestorías. En el roadmap del monorepo. Público cuando haya algo operativo.",
    url: null,
  },
];

const experiencias = [
  {
    category: "Formación de base",
    items: [
      "Años en hostelería, gestión y atención al cliente — aprendí a leer negocios antes que a escribir código.",
      "Transición al software: autodidacta intensivo. Next.js, Supabase, Stripe, Docker, n8n.",
      "Primer proyecto freelance. Apertura del repositorio público. Decisión firme de trabajar en abierto.",
    ],
  },
  {
    category: "Stack actual",
    items: [
      "Next.js 15 App Router · TypeScript strict · React 19",
      "Supabase (Postgres + Auth + Storage + RLS)",
      "Stripe (Subscriptions + Connect Express)",
      "Tailwind CSS v4 · shadcn/ui · Radix UI",
      "Turborepo · Vercel · GitHub Actions",
      "n8n self-hosted · Sentry · Playwright · Vitest",
    ],
  },
  {
    category: "Herramientas aliadas",
    items: [
      "Claude AI — par de desarrollo. Lo uso a diario desde el terminal y VS Code.",
      "Proton — mail, VPN y Drive cifrados. Alternativa real a Google fuera del circuito publicitario.",
      "Hostinger — VPS y dominios cuando necesito control total y precio honesto.",
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="site-shell hero-section">
        <div className="flex flex-wrap items-center gap-3">
          <p className="hero-eyebrow">Valencia · Fullstack · alexendros.pro</p>
          <span className="availability-pill">
            <span className="availability-pill__dot" aria-hidden="true" />
            Disponible
          </span>
        </div>
        <h1 className="hero-signature">
          Construyo software útil donde suele llegar caro, tarde o roto.
        </h1>
        <p className="prose-lead">
          Fullstack developer. Plataforma propia en{" "}
          <a
            href="https://alexendros.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
          >
            alexendros.pro
          </a>
          . Construyo, opero y cobro en mi propio SaaS — lo que recomiendo lo he probado en
          producción.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${siteConfig.contact.email}`}>Convócame</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#misiones">Ver misiones</a>
          </Button>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* ──────────────────────── BIOGRAFÍA ───────────────────────── */}
      <section
        id="biografia"
        className="site-shell section section-below-fold scroll-mt-16"
        aria-labelledby="h2-biografia"
      >
        <div className="max-w-3xl space-y-8">
          <h2 id="h2-biografia" className="headline">
            (Auto)biografía
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="title">Acto I — Origen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Años fuera del software —hostelería, gestión, atención al cliente— que me enseñaron
                a leer negocios antes que a escribir código. Traje de ahí tres cosas: criterio para
                distinguir lo que importa del ruido, paciencia para los detalles que nadie ve, y la
                costumbre de cobrar por resultados. Cuando por fin me senté a programar, ya tenía
                claro para qué.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="title">Acto II — Transición</h3>
              <p className="text-muted-foreground leading-relaxed">
                Salto al software a tiempo completo. Formación autodidacta intensiva en stack
                moderno: Next.js, Supabase, Stripe, Docker, n8n. Primeros proyectos freelance,
                apertura del repositorio público y decisión firme de trabajar en abierto.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="title">Acto III — Actualidad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Operador de{" "}
                <a
                  href="https://alexendros.pro"
                  className="underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  alexendros.pro
                </a>
                . Monorepo multi-app en construcción, build in public documentado y disponibilidad
                para consultoría en proyectos donde la mezcla de producto y ejecución técnica marca
                la diferencia.
              </p>
            </div>

            <Separator />

            <blockquote className="border-l-2 border-primary pl-4">
              <p className="text-foreground font-medium leading-relaxed">
                &ldquo;Construyo, opero y cobro en mi propio SaaS. Lo que recomiendo lo he probado
                antes en producción.&rdquo;
              </p>
            </blockquote>

            <div className="overflow-x-auto">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th scope="col">Dimensión</th>
                    <th scope="col">Alexendros</th>
                    <th scope="col">Dev genérico</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Código fullstack enterprise", "✓", "Variable"],
                    ["Cumplimiento legal (RGPD/LOPDGDD) bien integrado", "✓", "Superficial"],
                    ["Producto SaaS propio en producción", "✓", "—"],
                    ["Criterio de negocio desde el primer commit", "✓", "Variable"],
                    ["Build in public documentado", "✓", "Variable"],
                  ].map(([dim, a, b]) => (
                    <tr key={dim}>
                      <td data-label="Dimensión">{dim}</td>
                      <td data-label="Alexendros" className="text-primary">
                        {a}
                      </td>
                      <td data-label="Dev genérico" className="text-muted-foreground">
                        {b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* ──────────────────────── MISIONES ────────────────────────── */}
      <section
        id="misiones"
        className="site-shell section section-below-fold scroll-mt-16"
        aria-labelledby="h2-misiones"
      >
        <div className="max-w-3xl space-y-8">
          <div className="space-y-2">
            <h2 id="h2-misiones" className="headline">
              Misiones
            </h2>
            <p className="text-muted-foreground">
              Compromisos reales. Público cuando hay algo operativo, no antes.
            </p>
          </div>

          <div className="space-y-6">
            {misions.map((m) => (
              <div key={m.title} className="mission-card">
                <div className="mission-card__header">
                  <div className="min-w-0">
                    <h3 className="text-foreground font-semibold text-lg">{m.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.year}</p>
                  </div>
                  <Badge variant={m.statusVariant} className="shrink-0">
                    {m.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{m.description}</p>
                {m.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {m.url && (
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
                  >
                    {m.url.replace(/^https?:\/\//, "")} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* ─────────────────────── STACK ────────────────────────── */}
      <section className="section section-below-fold">
        <div className="mx-auto max-w-5xl">
          <div className="site-shell max-w-3xl mb-8">
            <h2 className="headline mb-2">Stack</h2>
            <p className="prose-lead text-muted-foreground">
              Las piezas con las que construyo.
            </p>
          </div>
          <StackMarquee />
        </div>
      </section>

      <Separator className="site-shell" />

      {/* ─────────────────────── EXPERIENCIAS ─────────────────────── */}
      <section
        id="experiencias"
        className="site-shell section section-below-fold scroll-mt-16"
        aria-labelledby="h2-experiencias"
      >
        <div className="max-w-3xl space-y-10">
          <div className="space-y-2">
            <h2 id="h2-experiencias" className="headline">
              Experiencias
            </h2>
            <p className="text-muted-foreground">
              Lo extra-laboral que me ha formado, el stack que uso y los aliados que recomiendo.
            </p>
          </div>

          {experiencias.map((exp) => (
            <div key={exp.category} className="space-y-3">
              <h3 className="title">{exp.category}</h3>
              <ul className="space-y-2">
                {exp.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 shrink-0" aria-hidden="true">
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-3">
            <h3 className="title">Aliados con programa de referidos</h3>
            <p className="text-sm text-muted-foreground">
              Solo aparecen aquí si los usaría igualmente sin el programa. Si contratas a través de
              los enlaces, la compañía me acredita una comisión sin coste extra para ti.
            </p>
            <div className="space-y-4">
              <div className="referral-item">
                <div>
                  <a
                    href="https://pr.tn/ref/J9V01ZFX"
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="referral-item__link"
                  >
                    Proton
                  </a>
                  <span className="referral-item__badge">(enlace de afiliado)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mail, VPN y Drive cifrados end-to-end. Con sede en Suiza. Lo uso a diario para
                  separar identidades y mantener el correo fuera del circuito publicitario. Un mes
                  gratis en planes de pago con este enlace.
                </p>
              </div>
              <div className="referral-item">
                <div>
                  <a
                    href="https://www.hostinger.com/es?REFERRALCODE=G9PALEJANGEG"
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="referral-item__link"
                  >
                    Hostinger
                  </a>
                  <span className="referral-item__badge">(enlace de afiliado)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  VPS, hosting y dominios económicos. Para cuando necesitas control total sin pagar
                  tarifa de startup. 20% de descuento adicional en la primera contratación.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="title">Pruebas de trabajo</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/alexendros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-primary/60 hover:decoration-primary text-sm"
                >
                  GitHub · alexendros →
                </a>
              </li>
              <li>
                <a
                  href="https://alexendros.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-primary/60 hover:decoration-primary text-sm"
                >
                  Producto en producción · alexendros.pro →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FABs — always visible */}
      <div className="fab-stack" role="region" aria-label="Acciones de contacto y aliados">
        <ReferralsFab />
        <ContactFab />
      </div>
    </>
  );
}
