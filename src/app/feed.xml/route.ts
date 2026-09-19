import { absoluteUrl } from "@/lib/env";
import { getPosts, getRaw } from "@/lib/outbox";
import { siteConfig } from "@/site.config";

// RSS: proxy de GET /api/v1/feed.xml do CMS; sem resposta, gera um feed com a lista de artigos.
export const revalidate = 300;

const esc = (v: string) => v.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] as string);

export async function GET() {
  const self = absoluteUrl("/feed.xml");
  const fromCms = await getRaw("/feed.xml");
  let body: string;
  if (fromCms && fromCms.includes("<rss")) {
    // o link "self" do CMS aponta para a API; aqui o feed mora no site
    body = fromCms.replace(/<atom:link href="[^"]*" rel="self"/, `<atom:link href="${esc(self)}" rel="self"`);
  } else {
    const { posts } = await getPosts({ page: 1, perPage: 30 });
    const items = posts.map((p) =>
      [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${esc(absoluteUrl(`/blog/${p.slug}`))}</link>`,
        `      <guid isPermaLink="false">outbox-${esc(p.id)}</guid>`,
        p.publishedAt ? `      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : "",
        p.category ? `      <category>${esc(p.category)}</category>` : "",
        `      <description>${esc(p.excerpt)}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${siteConfig.blog.title} ${siteConfig.name}`)}</title>
    <link>${esc(absoluteUrl("/blog"))}</link>
    <description>${esc(siteConfig.blog.description)}</description>
    <language>pt-BR</language>
    <atom:link href="${esc(self)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;
  }
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
