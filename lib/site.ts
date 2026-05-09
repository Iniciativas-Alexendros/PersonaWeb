export const siteConfig = {
  name: "Alexendros",
  fullName: "Alejandro Domingo Agustí",
  title: "Alejandro Agustí — Fullstack Developer",
  description:
    "Fullstack developer especializado en Next.js y Supabase. Plataforma propia en alexendros.pro. Valencia.",
  url: "https://alexendros.me",
  email: "contacto@alexendros.me",
  location: "Valencia, España",
  links: {
    pro: "https://alexendros.pro",
    github: "https://github.com/alexendros",
    linkedin: "https://linkedin.com/in/alexendros",
    twitter: "https://x.com/alexendros",
  },
  nav: [
    { label: "(Auto)biografía", href: "#biografia" },
    { label: "Misiones", href: "#misiones" },
    { label: "Experiencias", href: "#experiencias" },
  ],
  legalNav: [
    { label: "Aviso legal", href: "/legal/aviso-legal" },
    { label: "Privacidad", href: "/legal/privacidad" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
  contact: {
    email: "contacto@alexendros.me",
    telegram: { handle: "@alexendros", status: "preparacion" as const },
    matrix: { handle: "@alexendros:matrix.org", status: "proximamente" as const },
  },
  referrals: [
    {
      key: "claude",
      name: "Claude AI",
      href: "https://claude.ai/referral/WXK5RBGz5Q",
      tagline: "El asistente con el que construyo todo esto",
      desc: "Si no lo estás usando ya, deberías. Enlace de referido.",
    },
    {
      key: "proton",
      name: "Proton",
      href: "https://pr.tn/ref/J9V01ZFX",
      tagline: "Mail · VPN · Drive cifrados end-to-end",
      desc: "Alternativa real a Google/Microsoft. Un mes gratis con este enlace.",
    },
    {
      key: "playlist",
      name: "Playlist",
      href: null as string | null,
      tagline: "Tidal / YouTube · TBD",
      desc: "Próximamente.",
    },
  ],
} as const;
