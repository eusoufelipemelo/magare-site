import { absoluteUrl, siteUrl } from "@/lib/env";
import { siteConfig } from "@/site.config";

/** Serializa JSON-LD escapando "<" (evita fechar a tag <script> com conteúdo do CMS). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationId = () => `${siteUrl()}/#organization`;
export const websiteId = () => `${siteUrl()}/#website`;

/**
 * Organization/LocalBusiness + WebSite do site inteiro, montados a partir do site.config.ts.
 * Os @id seguem o padrão do CMS ({url}/#organization, {url}/#website), então o @graph dos
 * artigos aponta para as mesmas entidades.
 */
export function siteGraph(): Record<string, unknown> {
  const c = siteConfig.contact;
  const isLocal = siteConfig.schemaType !== "Organization";
  const sameAs = siteConfig.social.map((s) => s.href).filter(Boolean);
  const expert = siteConfig.about.expert;
  const org: Record<string, unknown> = {
    "@type": siteConfig.schemaType,
    "@id": organizationId(),
    name: siteConfig.name,
    legalName: siteConfig.legalName || undefined,
    url: siteUrl(),
    description: siteConfig.description,
    logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo.src) },
    image: absoluteUrl(siteConfig.ogImage),
    email: c.email || undefined,
    telephone: c.phoneHref || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    areaServed: c.areaServed ? [c.areaServed, ...c.regions.map((r) => ({ "@type": "Place", name: `${r}, Brasília - DF` }))] : undefined,
    slogan: siteConfig.tagline,
    knowsAbout: ["Móveis planejados", "Arquitetura de interiores", "Projeto de arquitetura", "Marcenaria sob medida", ...siteConfig.services.map((s) => s.title)],
    employee: expert.name ? { "@type": "Person", name: expert.name, jobTitle: expert.credentials || undefined, description: expert.bio || undefined } : undefined,
    ...(isLocal
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: c.address.street || undefined,
            addressLocality: c.address.city,
            addressRegion: c.address.state,
            postalCode: c.address.postalCode || undefined,
            addressCountry: c.address.country,
          },
          openingHours: c.openingHoursSpec.length ? c.openingHoursSpec : undefined,
          hasMap: c.mapsUrl || undefined,
        }
      : {}),
  };
  const website = {
    "@type": "WebSite",
    "@id": websiteId(),
    url: siteUrl(),
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { "@id": organizationId() },
  };
  return JSON.parse(JSON.stringify({ "@context": "https://schema.org", "@graph": [org, website] })) as Record<string, unknown>;
}

export function breadcrumbLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
