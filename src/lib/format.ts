const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" });

/** "12 de março de 2026". Vazio quando a data é inválida. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : dateFmt.format(d);
}

/** Data ISO válida ou null (para <time dateTime> e metadados). */
export function isoDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Atualizado depois de publicado (mais de 1 dia de diferença)? */
export function wasUpdated(published: string | null, updated: string | null): boolean {
  if (!published || !updated) return false;
  return new Date(updated).getTime() - new Date(published).getTime() > 24 * 60 * 60 * 1000;
}

export function readingTime(minutes: number): string {
  return `${minutes} min de leitura`;
}

/** Slug simples compatível com o do CMS (sem acentos, minúsculo, hífens). */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function whatsappUrl(number: string, message?: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}
