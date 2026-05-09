"use client";

import { Star } from "lucide-react";
import { PopoverRoot, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { siteConfig } from "@/lib/site";

export function ReferralsFab() {
  const { referrals } = siteConfig;

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button type="button" className="fab-btn" aria-label="Abrir panel de aliados">
          <Star className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Mis aliados</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end">
        <p className="fab-section-label">Herramientas que uso</p>

        {referrals.map((ref) =>
          ref.href ? (
            <a
              key={ref.key}
              href={ref.href}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="fab-item"
              aria-label={`${ref.name} — ${ref.tagline} (enlace de afiliado, se abre en nueva pestaña)`}
            >
              <span className="fab-item__label">
                <span className="fab-item__name">{ref.name}</span>
                <span className="fab-item__desc">{ref.tagline}</span>
              </span>
            </a>
          ) : (
            <div key={ref.key} className="fab-item" aria-disabled="true">
              <span className="fab-item__label">
                <span className="fab-item__name opacity-60">{ref.name}</span>
                <span className="fab-item__desc">{ref.tagline}</span>
              </span>
            </div>
          )
        )}

        <div className="fab-divider" role="separator" />
        <p className="fab-section-label">
          Si contratas, recibo comisión sin coste para ti
        </p>
      </PopoverContent>
    </PopoverRoot>
  );
}
