import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StackMarquee } from "@/components/stack-marquee";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Hero — visible without scroll, answers: quien, que, para quien */}
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
          . Valencia.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contacto">Hablemos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/proyectos">Ver proyectos</Link>
          </Button>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* About brief */}
      <section className="site-shell section section-below-fold">
        <div className="max-w-3xl">
          <h2 className="headline mb-4">Autobiografía</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Dev fullstack que construye productos digitales verticalizados en{" "}
              <strong className="text-foreground">alexendros.pro</strong>. Stack: Next.js, Supabase
              y Stripe, apretando donde se nota: rendimiento real (LCP &lt; 2s), conversión
              y cumplimiento legal (RGPD/LOPDGDD) sin letra pequeña.
            </p>
            <p>
              Llegué al software por una ruta poco ortodoxa —la contaré con calma en{" "}
              <Link
                href="/autobiografia"
                className="text-primary underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
              >
                Autobiografía
              </Link>
              —. Lo que me traje del camino: obsesión por los detalles que importan, criterio de
              negocio desde el primer commit y cero tolerancia al humo técnico.
            </p>
            <p>
              Ahora mismo: plataforma en construcción en{" "}
              <a
                href="https://alexendros.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
              >
                alexendros.pro
              </a>
              . StageKit (música electrónica) en MVP, más verticales en el roadmap.
            </p>
          </div>
          <div className="mt-6">
            <Button variant="link" asChild className="px-0">
              <Link href="/autobiografia">Leer más →</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* Projects preview */}
      <section className="site-shell section section-below-fold">
        <div className="max-w-3xl">
          <h2 className="headline mb-6">Proyectos</h2>
          <div className="project-grid">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">alexendros.pro</CardTitle>
                  <Badge className="shrink-0">En construcción</Badge>
                </div>
                <CardDescription>
                  Monorepo con apps verticales sobre Next.js + Supabase + Stripe + Turborepo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="https://alexendros.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  alexendros.pro →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">alexendros.me</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    Rebuild activo
                  </Badge>
                </div>
                <CardDescription>
                  Portfolio y marca personal. Next.js static + Tailwind v4 + oklch tokens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">alexendros.me</span>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Button variant="link" asChild className="px-0">
              <Link href="/proyectos">Ver todos los proyectos →</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="site-shell" />

      {/* Stack */}
      <section className="section section-below-fold">
        <div className="mx-auto max-w-5xl">
          <div className="site-shell max-w-3xl">
            <h2 className="headline mb-2">Stack</h2>
            <p className="prose-lead mb-10 md:mb-14">
              Las piezas con las que construyo. Ver el detalle y el porqué en{" "}
              <Link
                href="/experiencia"
                className="text-primary underline underline-offset-4 decoration-primary/60 hover:decoration-primary"
              >
                Experiencia
              </Link>
              .
            </p>
          </div>
          <StackMarquee />
        </div>
      </section>
    </>
  );
}
