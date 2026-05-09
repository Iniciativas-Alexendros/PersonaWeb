import { siteConfig } from "@/lib/site";

export function buildMailto(subject?: string) {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export type ContactStatus = "disponible" | "preparacion" | "proximamente";
