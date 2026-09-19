import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/env";
import { siteConfig } from "@/site.config";

/** Imagem padrão de compartilhamento: a do config ou a gerada em /og.png. */
export function defaultOgImage(): string {
  return absoluteUrl(siteConfig.ogImage || "/og.png");
}

/** Metadados de uma página institucional (title usa o template do layout). */
export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const ogImage = image ? absoluteUrl(image) : defaultOgImage();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
