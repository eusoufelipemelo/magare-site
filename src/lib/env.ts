import { siteConfig } from "@/site.config";

/** Variáveis de ambiente, com padrões seguros para o build rodar sem nenhuma delas. */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

function stripSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Base da Content API do OutBox CMS. */
export function apiUrl(): string {
  return stripSlash(clean(process.env.OUTBOX_API_URL) || "https://cms.outboxgroup.com.br/api/v1");
}

/** Chave pública do site (pk_...). Vazia = blog em estado vazio, sem chamar a API. */
export function siteKey(): string {
  return clean(process.env.OUTBOX_SITE_KEY);
}

/**
 * Domínio do site (ex.: "clinicasorriso.com.br"), tirado de SITE_URL ou do site.config.ts.
 * É assim que o CMS reconhece o site: basta o domínio estar cadastrado lá. Vazio enquanto
 * o config ainda tiver o domínio de exemplo.
 */
export function siteDomain(): string {
  const host = siteUrl()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[:/?#].*$/, "");
  if (!host || host.includes("exemplo") || host === "localhost") return "";
  return host;
}

/** Segredo do webhook (HMAC-SHA256). Opcional: sem ele o aviso do CMS é aceito sem assinatura. */
export function webhookSecret(): string {
  return clean(process.env.OUTBOX_WEBHOOK_SECRET);
}

/** URL pública do site, sem barra no fim. SITE_URL > site.config.ts. */
export function siteUrl(): string {
  return stripSlash(clean(process.env.SITE_URL) || siteConfig.url);
}

/** URL absoluta para um caminho do site. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
