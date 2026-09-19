import "server-only";
import sanitizeHtml from "sanitize-html";
import { slugify } from "@/lib/format";

/**
 * O CMS já entrega o HTML limpo; limpamos de novo aqui (defesa em profundidade) e aproveitamos para:
 * - dar id aos h2/h3 (links "Neste artigo" e citações com âncora por IAs);
 * - abrir links externos com rel="noopener" e imagens com lazy loading.
 */
const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "h2", "h3", "h4", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "img", "figure", "figcaption", "hr", "br", "code", "pre", "table", "thead", "tbody", "tr", "th", "td"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading", "decoding"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  nonTextTags: ["script", "style", "textarea", "option", "noscript", "iframe", "object"],
  transformTags: {
    h1: "h2",
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy", decoding: "async", alt: attribs.alt ?? "" } }),
    a: (tagName, attribs) => {
      const next: Record<string, string> = {};
      if (attribs.href) next.href = attribs.href;
      const rel = new Set((attribs.rel ?? "").split(/\s+/).filter(Boolean));
      if (attribs.target === "_blank") {
        next.target = "_blank";
        rel.add("noopener");
      }
      if (rel.size) next.rel = [...rel].join(" ");
      return { tagName, attribs: next };
    },
  },
  exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
};

export type TocItem = { id: string; text: string; level: 2 | 3 };

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

/** HTML seguro + índice de títulos. */
export function prepareArticleHtml(raw: string): { html: string; toc: TocItem[] } {
  const clean = sanitizeHtml(raw ?? "", options).trim();
  const used = new Set<string>();
  const toc: TocItem[] = [];
  const html = clean.replace(/<(h2|h3)>([\s\S]*?)<\/\1>/g, (_m, tag: "h2" | "h3", inner: string) => {
    const text = decode(inner);
    let id = slugify(text) || "secao";
    let n = 2;
    while (used.has(id)) id = `${slugify(text) || "secao"}-${n++}`;
    used.add(id);
    if (text) toc.push({ id, text, level: tag === "h2" ? 2 : 3 });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html, toc };
}
