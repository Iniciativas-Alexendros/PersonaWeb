import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ParticleBg } from "@/components/particle-bg";
import { Atmosphere } from "@/components/atmosphere";
import { siteConfig } from "@/lib/site";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

// Vergina Imperial v0.2.2 · Inter weight 700/800 para hero h1.display.
// Inter aprobado en otro hilo como reemplazo definitivo de la familia
// neogrotesque (Outfit/Bricolage/Manrope descatalogados). Geist sigue
// como sans body (doctrina alexendros.me CLAUDE.md §3).
const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: "/og/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Alexendros — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17130f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-mode="dark"
      data-accent="gold"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${interDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Atmosphere />
        <ParticleBg />
        <Nav />
        <main id="main" className="flex-1 pb-28 md:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
