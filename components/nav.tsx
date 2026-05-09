"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

function scrollToAnchor(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    // Actualizar URL sin recargar
    window.history.replaceState(null, "", href);
  }
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const headerRef = useRef<HTMLElement | null>(null);

  // Sombra scroll-aware
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => {
      header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver para marcar anchor activo
  useEffect(() => {
    const ids = siteConfig.nav.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    const map = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            map.set(id, entry.intersectionRatio);
            const best = [...map.entries()].sort((a, b) => b[1] - a[1])[0];
            if (best && best[1] > 0) setActiveHash(`#${best[0]}`);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header ref={headerRef} className="site-nav">
      <nav className="site-shell site-nav__inner max-w-3xl" aria-label="Navegación principal">
        {/* Logo — scroll to top */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", "/");
            setActiveHash("");
          }}
          className="inline-flex min-h-[var(--tap-target-min)] items-center font-sans text-lg font-bold tracking-tight text-primary [transition:color_var(--duration-fast)_var(--ease-out-expo)] hover:text-foreground"
          aria-label="Alexendros — volver al inicio"
        >
          Alexendros
        </Link>

        {/* Desktop nav */}
        <ul className="site-nav__links" role="list">
          {siteConfig.nav.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor(item.href);
                    setActiveHash(item.href);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`site-nav__link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "site-nav__link--active bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-touch" className="md:hidden" aria-label="Abrir menú">
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(18rem,85vw)] sm:w-64">
            <div className="mt-8">
              <Link
                href="/"
                className="font-sans text-lg font-bold tracking-tight text-primary block mb-6"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Alexendros
              </Link>
              <ul className="flex flex-col gap-1" role="list">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        setTimeout(() => scrollToAnchor(item.href), 150);
                        setActiveHash(item.href);
                      }}
                      aria-current={activeHash === item.href ? "true" : undefined}
                      className={`flex min-h-[var(--tap-target-min)] items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        activeHash === item.href
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
