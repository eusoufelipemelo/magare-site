import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteUrl } from "@/lib/env";
import { siteGraph } from "@/lib/jsonld";
import { defaultOgImage } from "@/lib/seo";
import { bodyFont, displayFont, siteConfig } from "@/site.config";
import "./globals.css";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `Móveis planejados e arquitetura em Brasília | Magare`, template: `%s | Magare` },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    // canonical fica em cada página (herdar "/" daqui faria todas apontarem para a Home)
    alternates: {
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.name}: blog` }] },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: "/",
      images: [{ url: defaultOgImage(), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: siteConfig.theme.surface,
  width: "device-width",
  initialScale: 1,
};

/** Cores do site.config.ts como variáveis CSS (ver globals.css). */
const themeVars = {
  "--brand": siteConfig.theme.brand,
  "--brand-contrast": siteConfig.theme.brandContrast,
  "--brand-soft": siteConfig.theme.brandSoft,
  "--ink": siteConfig.theme.ink,
  "--muted": siteConfig.theme.muted,
  "--surface": siteConfig.theme.surface,
  "--surface-alt": siteConfig.theme.surfaceAlt,
  "--line": siteConfig.theme.line,
  "--salvia": siteConfig.theme.salvia,
  "--areia": siteConfig.theme.areia,
  "--radius": siteConfig.theme.radius,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.language} style={themeVars} className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-md bg-ink px-4 py-3 text-surface focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFloat />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
