import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";
import { projects } from "@/content/projetos";
import { getAllPosts } from "@/lib/outbox";

// Páginas fixas + todos os artigos do CMS. O webhook revalida na hora; 5 min de segurança.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latest = posts.reduce<string | undefined>((acc, p) => {
    const d = p.updatedAt ?? p.publishedAt ?? undefined;
    return d && (!acc || d > acc) ? d : acc;
  }, undefined);

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/servicos"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projetos"), changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projetos/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: p.images.map((i) => absoluteUrl(i.src)),
    })),
    { url: absoluteUrl("/sobre"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contato"), changeFrequency: "yearly", priority: 0.7 },
    ...["/politica-de-privacidade", "/politica-de-cookies", "/lgpd", "/termos-de-uso"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.8, ...(latest ? { lastModified: latest } : {}) },
  ];

  return [
    ...pages,
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ?? p.publishedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(p.cover ? { images: [p.cover.url] } : {}),
    })),
  ];
}
