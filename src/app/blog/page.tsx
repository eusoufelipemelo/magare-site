import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { absoluteUrl } from "@/lib/env";
import { slugify } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { getCategories, getPosts } from "@/lib/outbox";
import { defaultOgImage } from "@/lib/seo";
import { siteConfig } from "@/site.config";

type Search = { pagina?: string | string[]; categoria?: string | string[]; busca?: string | string[] };

function one(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
}

function parse(sp: Search) {
  const page = Math.max(1, Number.parseInt(one(sp.pagina), 10) || 1);
  const category = slugify(one(sp.categoria));
  const q = one(sp.busca).slice(0, 120);
  return { page, category, q };
}

function blogHref({ page = 1, category = "", q = "" }: { page?: number; category?: string; q?: string }) {
  const sp = new URLSearchParams();
  if (category) sp.set("categoria", category);
  if (q) sp.set("busca", q);
  if (page > 1) sp.set("pagina", String(page));
  const s = sp.toString();
  return s ? `/blog?${s}` : "/blog";
}

export async function generateMetadata({ searchParams }: PageProps<"/blog">): Promise<Metadata> {
  const { page, category, q } = parse(await searchParams);
  const { categories } = await getCategories();
  const cat = categories.find((c) => c.slug === category);
  const base = cat ? `${cat.name}: artigos` : siteConfig.blog.title;
  const title = page > 1 ? `${base} (página ${page})` : base;
  const description = cat ? `Artigos sobre ${cat.name} escritos pela equipe da ${siteConfig.name}.` : siteConfig.blog.description;
  const canonical = blogHref({ page, category: cat ? category : "" });
  return {
    title,
    description,
    alternates: { canonical },
    // resultados de busca não entram no índice (conteúdo duplicado); seguem links normalmente
    robots: q ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", title, description, url: canonical, siteName: siteConfig.name, locale: siteConfig.locale, images: [defaultOgImage()] },
  };
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { page, category, q } = parse(await searchParams);
  const [{ posts, totalPages, total, ok }, { categories }] = await Promise.all([
    getPosts({ page, perPage: siteConfig.blog.perPage, category: category || null, q: q || null }),
    getCategories(),
  ]);
  const cat = categories.find((c) => c.slug === category);
  const filtered = Boolean(category || q);
  const [featured, ...rest] = page === 1 && !filtered ? posts : [undefined, ...posts];

  const chip = "inline-flex min-h-10 items-center rounded-full border px-4 text-[0.95rem] font-medium transition-colors";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${absoluteUrl("/blog")}#blog`,
          url: absoluteUrl("/blog"),
          name: `${siteConfig.blog.title} ${siteConfig.name}`,
          description: siteConfig.blog.description,
          inLanguage: siteConfig.language,
          publisher: { "@id": organizationId() },
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.publishedAt ?? undefined })),
        }}
      />
      <PageHeader
        title={cat ? cat.name : siteConfig.blog.title}
        intro={cat ? `Artigos sobre ${cat.name}.` : siteConfig.blog.description}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(cat ? [{ name: cat.name, path: blogHref({ category }) }] : []),
        ]}
      >
        {posts.length || q ? (
        <form action="/blog" method="get" role="search" className="mt-7 flex max-w-lg gap-2">
          <label htmlFor="busca" className="sr-only">
            Buscar artigos
          </label>
          <input
            id="busca"
            name="busca"
            type="search"
            defaultValue={q}
            placeholder="Buscar artigos"
            className="min-h-12 w-full min-w-0 rounded-[var(--radius)] border border-line bg-surface px-4 text-base text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          {category ? <input type="hidden" name="categoria" value={category} /> : null}
          <button type="submit" className="btn btn-primary shrink-0">
            Buscar
          </button>
        </form>
        ) : null}
      </PageHeader>

      <Container className="py-12 sm:py-16">
        {categories.length ? (
          <nav aria-label="Categorias do blog" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <ul className="flex gap-2 sm:flex-wrap">
              <li className="shrink-0">
                <Link
                  href={blogHref({ q })}
                  aria-current={!category ? "page" : undefined}
                  className={`${chip} ${!category ? "border-ink bg-ink text-surface" : "border-line text-ink hover:border-ink"}`}
                >
                  Todos
                </Link>
              </li>
              {categories.map((c) => {
                const active = c.slug === category;
                return (
                  <li key={c.slug} className="shrink-0">
                    <Link
                      href={blogHref({ category: c.slug, q })}
                      aria-current={active ? "page" : undefined}
                      className={`${chip} ${active ? "border-ink bg-ink text-surface" : "border-line text-ink hover:border-ink"}`}
                    >
                      {c.name}
                      <span className={`ml-2 text-sm ${active ? "text-surface/70" : "text-muted"}`}>{c.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        {q ? (
          <p className="mt-8 text-muted" role="status">
            {total === 1 ? "1 artigo encontrado" : `${total} artigos encontrados`} para <strong className="text-ink">“{q}”</strong>.{" "}
            <Link href={blogHref({ category })} className="link">
              Limpar busca
            </Link>
          </p>
        ) : null}

        {posts.length ? (
          <>
            {featured ? (
              <div className="mt-10 border-b border-line pb-12">
                <PostCard post={featured} featured />
              </div>
            ) : null}
            {rest.length ? (
              <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (p ? <PostCard key={p.id} post={p} /> : null))}
              </div>
            ) : null}
            <Pagination page={page} totalPages={totalPages} hrefFor={(n) => blogHref({ page: n, category, q })} />
          </>
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-[calc(var(--radius)*1.6)] border border-dashed border-line px-6 py-14 text-center">
            <h2 className="font-display text-2xl font-bold text-ink">
              {!ok ? "Os artigos não carregaram agora" : filtered ? "Nenhum artigo encontrado" : "Os primeiros artigos chegam em breve"}
            </h2>
            <p className="mt-3 text-muted">
              {!ok
                ? "Atualize a página em alguns instantes. Enquanto isso, fale com a gente pelos canais abaixo."
                : filtered
                  ? "Tente outra palavra ou veja todos os artigos do blog."
                  : "Enquanto isso, tire suas dúvidas diretamente com a nossa equipe."}
            </p>
            {filtered ? (
              <Link href="/blog" className="btn btn-secondary mt-6">
                Ver todos os artigos
              </Link>
            ) : null}
          </div>
        )}
      </Container>

      <Container className="pb-20">
        <CtaBlock />
      </Container>
    </>
  );
}
