import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { CheckIcon, ExternalIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { ViewBeacon } from "@/components/ViewBeacon";
import { absoluteUrl, apiUrl, siteKey, siteUrl, siteDomain } from "@/lib/env";
import { formatDate, isoDate, slugify, whatsappUrl } from "@/lib/format";
import { prepareArticleHtml } from "@/lib/html";
import { organizationId } from "@/lib/jsonld";
import { getAllPosts, getPost, getPosts, type Post, type PostSummary } from "@/lib/outbox";
import { defaultOgImage } from "@/lib/seo";
import { siteConfig } from "@/site.config";

// ISR: artigos novos são gerados no primeiro acesso; o webhook do CMS limpa o cache na hora.
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/** Canonical: mesmo domínio = sempre a rota deste site; outro domínio = respeita o CMS (artigo replicado). */
function canonicalFor(post: Post): string {
  const own = absoluteUrl(`/blog/${post.slug}`);
  const fromCms = post.seo.canonicalUrl;
  if (!fromCms) return own;
  try {
    return new URL(fromCms).host === new URL(siteUrl()).host ? own : fromCms;
  } catch {
    return own;
  }
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artigo não encontrado", robots: { index: false } };
  const canonical = canonicalFor(post);
  const image = post.seo.ogImage ?? defaultOgImage();
  return {
    title: { absolute: post.seo.title },
    description: post.seo.description,
    alternates: { canonical },
    authors: post.author ? [{ name: post.author.name }] : undefined,
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: isoDate(post.publishedAt) ?? undefined,
      modifiedTime: isoDate(post.updatedAt) ?? undefined,
      authors: post.author ? [post.author.name] : undefined,
      section: post.category ?? undefined,
      tags: post.tags,
      images: [{ url: image, alt: post.cover?.alt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.seo.title, description: post.seo.description, images: [image] },
  };
}

/** JSON-LD do CMS (ou um BlogPosting mínimo) + FAQPage quando o CMS ainda não manda. */
function articleJsonLd(post: Post, canonical: string): unknown[] {
  const out: unknown[] = [];
  const fromCms = post.jsonLd;
  const raw = fromCms ? JSON.stringify(fromCms) : "";
  if (fromCms) {
    out.push(fromCms);
  } else {
    out.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title.slice(0, 110),
      description: post.seo.description,
      image: post.cover ? [post.cover.url] : undefined,
      datePublished: isoDate(post.publishedAt) ?? undefined,
      dateModified: isoDate(post.updatedAt) ?? undefined,
      author: post.author ? { "@type": "Person", name: post.author.name, jobTitle: post.author.credentials ?? undefined } : { "@id": organizationId() },
      publisher: { "@id": organizationId() },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      url: canonical,
      articleSection: post.category ?? undefined,
      keywords: post.tags.length ? post.tags.join(", ") : undefined,
      inLanguage: siteConfig.language,
    });
  }
  if (post.faq.length && !raw.includes("FAQPage")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }
  return JSON.parse(JSON.stringify(out)) as unknown[];
}

/** Até 3 artigos da mesma categoria; completa com os mais recentes quando faltar. */
async function relatedPosts(slug: string, categorySlug: string) {
  const picked = new Map<string, PostSummary>();
  const add = (list: PostSummary[]) => list.forEach((p) => p.slug !== slug && picked.size < 3 && picked.set(p.slug, p));
  if (categorySlug) add((await getPosts({ page: 1, perPage: 4, category: categorySlug })).posts);
  if (picked.size < 3) add((await getPosts({ page: 1, perPage: 4 })).posts);
  return [...picked.values()];
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const canonical = canonicalFor(post);
  const { html, toc } = prepareArticleHtml(post.contentHtml);
  const h2s = toc.filter((t) => t.level === 2);
  const showToc = h2s.length >= 3;
  const categorySlug = post.category ? slugify(post.category) : "";
  const related = await relatedPosts(post.slug, categorySlug);
  const cmsHasBreadcrumb = post.jsonLd ? JSON.stringify(post.jsonLd).includes("BreadcrumbList") : false;
  const published = post.publishedAt;
  const updated = post.updatedAt ?? post.publishedAt;
  const key = siteKey();
  const siteParam = key ? `key=${encodeURIComponent(key)}` : siteDomain() ? `site=${encodeURIComponent(siteDomain())}` : "";
  const wa = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);

  const tocList = (
    <ol className="space-y-2 text-[0.95rem]">
      {h2s.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="text-muted hover:text-brand hover:underline">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {articleJsonLd(post, canonical).map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}
      {siteParam ? <ViewBeacon endpoint={`${apiUrl()}/posts/${post.slug}/view?${siteParam}`} /> : null}

      <article>
        <Container className="pt-8 sm:pt-12">
          <Breadcrumbs
            jsonLd={!cmsHasBreadcrumb}
            items={[
              { name: "Início", path: "/" },
              { name: "Blog", path: "/blog" },
              ...(post.category ? [{ name: post.category, path: `/blog?categoria=${categorySlug}` }] : []),
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          <header className="mt-8 max-w-3xl">
            {post.category ? (
              <Link href={`/blog?categoria=${categorySlug}`} className="text-[0.95rem] font-semibold text-brand hover:underline">
                {post.category}
              </Link>
            ) : null}
            <h1 className="mt-3 font-display text-[2.1rem] font-bold leading-[1.1] tracking-[-0.025em] text-ink sm:text-5xl">{post.title}</h1>
            {post.excerpt ? <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{post.excerpt}</p> : null}
            <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-5 text-[0.95rem]">
              {post.author ? (
                <div>
                  <dt className="text-sm text-muted">Por</dt>
                  <dd className="font-medium text-ink">
                    <a href="#autor" className="hover:text-brand hover:underline">
                      {post.author.name}
                    </a>
                  </dd>
                </div>
              ) : null}
              {published ? (
                <div>
                  <dt className="text-sm text-muted">Publicado em</dt>
                  <dd className="font-medium text-ink">
                    <time dateTime={isoDate(published) ?? undefined}>{formatDate(published)}</time>
                  </dd>
                </div>
              ) : null}
              {updated ? (
                <div>
                  <dt className="text-sm text-muted">Atualizado em</dt>
                  <dd className="font-medium text-ink">
                    <time dateTime={isoDate(updated) ?? undefined}>{formatDate(updated)}</time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-sm text-muted">Leitura</dt>
                <dd className="font-medium text-ink">{post.readingMinutes} min</dd>
              </div>
            </dl>
          </header>

          {post.cover ? (
            <figure className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[calc(var(--radius)*1.6)] bg-surface-alt">
              <Image src={post.cover.url} alt={post.cover.alt} fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
            </figure>
          ) : null}
        </Container>

        <Container className="grid gap-12 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="min-w-0 max-w-[44rem]">
            {post.answerSummary ? (
              <section aria-labelledby="resposta" className="rounded-[calc(var(--radius)*1.4)] border border-brand/25 bg-brand-soft p-6 sm:p-7">
                <h2 id="resposta" className="font-display text-base font-semibold text-brand">
                  Resposta rápida
                </h2>
                <p className="mt-2 text-[1.1875rem] leading-relaxed text-ink">{post.answerSummary}</p>
              </section>
            ) : null}

            {post.keyTakeaways.length ? (
              <section aria-labelledby="pontos" className={post.answerSummary ? "mt-10" : ""}>
                <h2 id="pontos" className="font-display text-xl font-bold text-ink">
                  Pontos principais
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.keyTakeaways.map((k) => (
                    <li key={k} className="flex gap-3 leading-relaxed text-ink">
                      <CheckIcon className="mt-1 shrink-0 text-brand" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {showToc ? (
              <details className="group mt-10 rounded-[var(--radius)] border border-line lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  Neste artigo
                  <PlusIcon className="transition-transform group-open:rotate-45" />
                </summary>
                <nav aria-label="Neste artigo (celular)" className="border-t border-line px-5 py-4">
                  {tocList}
                </nav>
              </details>
            ) : null}

            {html ? (
              <div className={`prose-outbox ${post.answerSummary || post.keyTakeaways.length || showToc ? "mt-12" : ""}`} dangerouslySetInnerHTML={{ __html: html }} />
            ) : null}

            {post.faq.length ? (
              <section aria-labelledby="faq" className="mt-16">
                <h2 id="faq" className="font-display text-[1.625rem] font-bold text-ink">
                  Perguntas frequentes
                </h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  {post.faq.map((f) => (
                    <details key={f.question} className="faq-item">
                      <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-ink">
                        <h3>{f.question}</h3>
                        <PlusIcon className="faq-icon shrink-0 text-brand" />
                      </summary>
                      <p className="pb-5 pr-8 leading-relaxed text-muted">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {post.sources.length ? (
              <section aria-labelledby="fontes" className="mt-14">
                <h2 id="fontes" className="font-display text-xl font-bold text-ink">
                  Fontes
                </h2>
                <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[0.975rem] marker:text-muted">
                  {post.sources.map((s) => (
                    <li key={s.url} className="pl-1 leading-relaxed">
                      <a href={s.url} target="_blank" rel="nofollow noopener" className="link inline-flex items-baseline gap-1">
                        {s.title}
                        <ExternalIcon width={14} height={14} className="relative top-0.5 shrink-0" />
                      </a>
                      {s.publisher ? <span className="text-muted">, {s.publisher}</span> : null}
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {post.tags.length ? (
              <ul aria-label="Assuntos" className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full bg-surface-alt px-3.5 py-1.5 text-sm text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            <AuthorCard post={post} />
          </div>

          <aside className="hidden lg:block" aria-label="Navegação do artigo">
            <div className="sticky top-28 space-y-8">
              {showToc ? (
                <nav aria-label="Neste artigo">
                  <p className="font-display font-semibold text-ink">Neste artigo</p>
                  <div className="mt-4 border-l border-line pl-4">{tocList}</div>
                </nav>
              ) : null}
              <div className="rounded-[var(--radius)] bg-surface-alt p-5">
                <p className="font-display font-semibold text-ink">Precisa de ajuda com o seu caso?</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">A equipe da {siteConfig.name} responde pelo WhatsApp em horário comercial.</p>
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener" className="btn btn-primary mt-4 min-h-11 w-full px-4 text-[0.95rem]">
                    <WhatsAppIcon />
                    Chamar no WhatsApp
                  </a>
                ) : (
                  <Link href="/contato" className="link mt-3 inline-block text-[0.95rem] font-medium">
                    Falar com a equipe
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </Container>
      </article>

      <Container className="pb-4">
        <CtaBlock />
      </Container>

      {related.length ? (
        <section aria-labelledby="relacionados" className="py-16 sm:py-20">
          <Container>
            <h2 id="relacionados" className="font-display text-3xl font-bold text-ink">
              Leia também
            </h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <div className="pb-16" />
      )}
    </>
  );
}

function AuthorCard({ post }: { post: Post }) {
  const author = post.author;
  const expert = siteConfig.about.expert;
  // sem credenciais vindas do CMS, usa as do responsável no config quando for a mesma pessoa
  const sameAsExpert = author && expert.name && author.name === expert.name;
  const name = author?.name ?? siteConfig.name;
  const credentials = author?.credentials ?? (sameAsExpert ? expert.credentials : null);
  const bio = author?.bio ?? (sameAsExpert ? expert.bio : author ? null : siteConfig.tagline);
  return (
    <section id="autor" aria-labelledby="autor-titulo" className="mt-14 flex gap-5 rounded-[calc(var(--radius)*1.4)] border border-line p-6 sm:p-7">
      <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full bg-brand font-display text-xl font-bold text-brand-contrast">
        {name.charAt(0).toUpperCase()}
      </span>
      <div>
        <h2 id="autor-titulo" className="text-sm text-muted">
          {author ? "Sobre quem escreveu" : "Publicado por"}
        </h2>
        <p className="mt-0.5 font-display text-lg font-semibold text-ink">{name}</p>
        {credentials ? <p className="text-[0.95rem] text-muted">{credentials}</p> : null}
        {bio ? <p className="mt-3 leading-relaxed text-ink">{bio}</p> : null}
      </div>
    </section>
  );
}
