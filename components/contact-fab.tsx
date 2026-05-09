"use client";

import { Mail, Send, Hash } from "lucide-react";
import { PopoverRoot, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { siteConfig } from "@/lib/site";
import { buildMailto } from "@/lib/contact";

export function ContactFab() {
  const { contact } = siteConfig;

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button type="button" className="fab-btn" aria-label="Abrir opciones de contacto">
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Convócame</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end">
        <p className="fab-section-label">Contacto directo</p>

        <a href={buildMailto()} className="fab-item">
          <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="fab-item__label">
            <span className="fab-item__name">Email</span>
            <span className="fab-item__desc">{contact.email}</span>
          </span>
        </a>

        <div className="fab-item" aria-disabled="true">
          <Send className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
          <span className="fab-item__label">
            <span className="fab-item__name opacity-60">Telegram</span>
            <span className="fab-item__desc">
              {contact.telegram.handle} · en preparación
            </span>
          </span>
        </div>

        <div className="fab-item" aria-disabled="true">
          <Hash className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
          <span className="fab-item__label">
            <span className="fab-item__name opacity-60">Matrix / Element</span>
            <span className="fab-item__desc">
              {contact.matrix.handle} · próximamente
            </span>
          </span>
        </div>

        <div className="fab-divider" role="separator" />
        <p className="fab-section-label">
          Form formal → alexendros.pro
        </p>
      </PopoverContent>
    </PopoverRoot>
  );
}
