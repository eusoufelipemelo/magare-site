import "server-only";
import { cache } from "react";
import { apiUrl, siteDomain, siteKey } from "@/lib/env";

/**
 * Cliente da Content API do OutBox CMS (/api/v1).
 *
 * - Cache do Next com a tag OUTBOX_TAG: o webhook /api/outbox/revalidate limpa tudo na hora.
 * - Revalidação de segurança a cada 5 minutos, caso algum webhook se perca.
 * - Nunca lança erro: sem chave, com a API fora do ar ou com resposta inválida, devolve vazio.
 * - Campos novos da API (GEO) são opcionais: a página se adapta quando eles não vêm.
 */

export const OUTBOX_TAG = "outbox-posts";
export const OUTBOX_REVALIDATE = 300;
const TIMEOUT_MS = 8_000;

// ---------------------------------------------------------------------------
// Tipos públicos (espelham src/lib/content.ts do CMS, normalizados)
// ---------------------------------------------------------------------------

export type Cover = { url: string; alt: string };
export type Author = { name: string; credentials: string | null; bio: string | null };
export type FaqItem = { question: string; answer: string };
export type SourceItem = { title: string; url: string; publisher: string | null };
export type ContentType = "article" | "howto" | "guide" | "list" | "comparison" | "news";

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: Cover | null;
  category: string | null;
  tags: string[];
  author: Author | null;
  publishedAt: string | null;
  updatedAt: string | null;
  readingMinutes: number;
  /** URL canônica do artigo informada pelo CMS. */
  url: string | null;
  /** GEO: resposta direta de 40–60 palavras. */
  answerSummary: string | null;
}

export interface Post extends PostSummary {
  contentHtml: string;
  seo: { title: string; description: string; canonicalUrl: string | null; ogImage: string | null };
  /** JSON-LD pronto do CMS (objeto único ou @graph). */
  jsonLd: Record<string, unknown> | null;
  keyTakeaways: string[];
  faq: FaqItem[];
  sources: SourceItem[];
  contentType: ContentType | null;
}

export interface PostList {
  posts: PostSummary[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  /** false quando a API não respondeu (para diferenciar "sem artigos" de "fora do ar"). */
  ok: boolean;
}

export type Taxonomy = { name: string; slug: string; count: number };

export interface SiteProfile {
  /** Dados do cliente cadastrados no CMS (formato livre do CMS, não schema.org). */
  name: string | null;
  url: string | null;
  blogPath: string | null;
  organization: Record<string, unknown> | null;
  indexnowKey: string | null;
}

// ---------------------------------------------------------------------------
// Normalização defensiva
// ---------------------------------------------------------------------------

type Json = Record<string, unknown>;

const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown): string | null => (typeof v === "string" && v.trim() !== "" ? v.trim() : null);
const strList = (v: unknown): string[] => (Array.isArray(v) ? v.map(str).filter((s): s is string => !!s) : []);
const isHttp = (v: string | null): v is string => !!v && /^https?:\/\//i.test(v);

function toAuthor(v: unknown): Author | null {
  if (typeof v === "string") return str(v) ? { name: v.trim(), credentials: null, bio: null } : null;
  if (!isObj(v)) return null;
  const name = str(v.name);
  return name ? { name, credentials: str(v.credentials), bio: str(v.bio) } : null;
}

function toCover(v: unknown): Cover | null {
  if (!isObj(v)) return null;
  const url = str(v.url);
  return isHttp(url) ? { url, alt: str(v.alt) ?? "" } : null;
}

function toSummary(v: unknown): PostSummary | null {
  if (!isObj(v)) return null;
  const slug = str(v.slug);
  const title = str(v.title);
  if (!slug || !title) return null;
  const minutes = Number(v.reading_minutes);
  return {
    id: str(v.id) ?? slug,
    slug,
    title,
    excerpt: str(v.excerpt) ?? "",
    cover: toCover(v.cover_image),
    category: str(v.category),
    tags: strList(v.tags),
    // `author_profile` traz credenciais; `author` (texto) fica por compatibilidade com a v1
    author: toAuthor(v.author_profile) ?? toAuthor(v.author),
    publishedAt: str(v.published_at),
    updatedAt: str(v.updated_at),
    readingMinutes: Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : 1,
    url: str(v.url),
    answerSummary: str(v.answer_summary),
  };
}

const CONTENT_TYPES: ContentType[] = ["article", "howto", "guide", "list", "comparison", "news"];

function toPost(v: unknown): Post | null {
  const summary = toSummary(v);
  if (!summary || !isObj(v)) return null;
  const seo = isObj(v.seo) ? v.seo : {};
  const faq = Array.isArray(v.faq)
    ? v.faq
        .filter(isObj)
        .map((f) => ({ question: str(f.question) ?? "", answer: str(f.answer) ?? "" }))
        .filter((f) => f.question && f.answer)
    : [];
  const sources = Array.isArray(v.sources)
    ? v.sources
        .filter(isObj)
        .map((s) => ({ title: str(s.title) ?? str(s.url) ?? "", url: str(s.url) ?? "", publisher: str(s.publisher) }))
        .filter((s) => isHttp(s.url))
    : [];
  const contentType = str(v.content_type) as ContentType | null;
  return {
    ...summary,
    contentHtml: typeof v.content_html === "string" ? v.content_html : "",
    seo: {
      title: str(seo.title) ?? summary.title,
      description: str(seo.description) ?? summary.excerpt,
      canonicalUrl: str(seo.canonical_url),
      ogImage: str(seo.og_image) ?? summary.cover?.url ?? null,
    },
    jsonLd: isObj(v.json_ld) ? v.json_ld : null,
    keyTakeaways: strList(v.key_takeaways),
    faq,
    sources,
    contentType: contentType && CONTENT_TYPES.includes(contentType) ? contentType : null,
  };
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

type FetchResult = { ok: true; res: Response } | { ok: false; status: number | null; unconfigured?: boolean };

let warned = false;

async function request(path: string, params?: Record<string, string | number | null | undefined>): Promise<FetchResult> {
  const key = siteKey();
  const domain = siteDomain();
  if (!key && !domain) {
    if (!warned) {
      warned = true;
      console.warn("[outbox] Domínio do site não definido: preencha `url` em src/site.config.ts (ou SITE_URL). O blog aparece vazio.");
    }
    return { ok: false, status: null, unconfigured: true };
  }
  const url = new URL(`${apiUrl()}${path}`);
  if (!key) url.searchParams.set("site", domain);
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== null && v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  try {
    const res = await fetch(url, {
      headers: { ...(key ? { "x-outbox-key": key } : {}), accept: "application/json, text/plain, application/xml" },
      cache: "force-cache",
      next: { tags: [OUTBOX_TAG], revalidate: OUTBOX_REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      if (res.status !== 404) console.error(`[outbox] ${path} respondeu HTTP ${res.status}`);
      return { ok: false, status: res.status };
    }
    return { ok: true, res };
  } catch (err) {
    console.error(`[outbox] falha ao buscar ${path}:`, err instanceof Error ? err.message : err);
    return { ok: false, status: null };
  }
}

async function requestJson(path: string, params?: Record<string, string | number | null | undefined>): Promise<unknown> {
  const r = await request(path, params);
  if (!r.ok) return null;
  try {
    return await r.res.json();
  } catch {
    console.error(`[outbox] resposta inválida em ${path}`);
    return null;
  }
}

/** Texto bruto (llms.txt, feed.xml). null quando não existe ou falhou. */
export async function getRaw(path: string): Promise<string | null> {
  const r = await request(path);
  if (!r.ok) return null;
  try {
    return await r.res.text();
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

export type GetPostsParams = { page?: number; perPage?: number; category?: string | null; tag?: string | null; q?: string | null };

const emptyList = (page: number, perPage: number, ok: boolean): PostList => ({ posts: [], page, perPage, total: 0, totalPages: 1, ok });

export const getPosts = cache(async (params: GetPostsParams = {}): Promise<PostList> => {
  const page = Math.max(1, Math.floor(params.page ?? 1));
  const perPage = Math.min(50, Math.max(1, Math.floor(params.perPage ?? 12)));
  // sem chave configurada não é erro: o blog só ainda não foi ligado ao CMS
  if (!siteKey() && !siteDomain()) return emptyList(page, perPage, true);
  const body = await requestJson("/posts", {
    page,
    per_page: perPage,
    category: params.category,
    tag: params.tag,
    q: params.q?.slice(0, 200),
  });
  if (!isObj(body)) return emptyList(page, perPage, false);
  const posts = Array.isArray(body.data) ? body.data.map(toSummary).filter((p): p is PostSummary => !!p) : [];
  const meta = isObj(body.meta) ? body.meta : {};
  const total = Number(meta.total) || posts.length;
  const totalPages = Math.max(1, Number(meta.total_pages) || Math.ceil(total / perPage) || 1);
  return { posts, page, perPage, total, totalPages, ok: true };
});

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  if (!SLUG_RE.test(clean) || clean.length > 200) return null;
  return toPost(await requestJson(`/posts/${clean}`));
});

export const getCategories = cache(async (): Promise<{ categories: Taxonomy[]; tags: Taxonomy[] }> => {
  const body = await requestJson("/categories");
  const toTax = (v: unknown): Taxonomy[] =>
    Array.isArray(v)
      ? v
          .filter(isObj)
          .map((t) => ({ name: str(t.name) ?? "", slug: str(t.slug) ?? "", count: Number(t.count) || 0 }))
          .filter((t) => t.name && t.slug)
      : [];
  if (!isObj(body)) return { categories: [], tags: [] };
  return { categories: toTax(body.data), tags: toTax(body.tags) };
});

export const getSiteProfile = cache(async (): Promise<SiteProfile | null> => {
  const body = await requestJson("/site");
  if (!isObj(body)) return null;
  const data = isObj(body.data) ? body.data : body;
  return {
    name: str(data.name),
    url: str(data.url),
    blogPath: str(data.blog_path),
    organization: isObj(data.organization) ? data.organization : null,
    indexnowKey: str(data.indexnow_key),
  };
});

/** Todos os artigos (sitemap, llms.txt de reserva). Limite de segurança: 20 páginas de 50. */
export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const first = await getPosts({ page: 1, perPage: 50 });
  const all = [...first.posts];
  const last = Math.min(first.totalPages, 20);
  for (let page = 2; page <= last; page++) {
    const next = await getPosts({ page, perPage: 50 });
    if (!next.posts.length) break;
    all.push(...next.posts);
  }
  return all;
});
