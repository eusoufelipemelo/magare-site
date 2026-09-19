import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { webhookSecret } from "@/lib/env";
import { OUTBOX_TAG } from "@/lib/outbox";

/**
 * Webhook do OutBox CMS: POST { event, sent_at, site, post } assinado com
 * X-OutBox-Signature: sha256=<hex HMAC-SHA256(OUTBOX_WEBHOOK_SECRET, corpo bruto)>.
 * Eventos: test | publish | update | unpublish. Configure no CMS a URL https://<domínio>/api/outbox/revalidate.
 */

export const dynamic = "force-dynamic";

const MAX_BODY = 5 * 1024 * 1024;
const EVENTS = new Set(["test", "publish", "update", "unpublish"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function reply(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function validSignature(secret: string, raw: string, header: string | null): boolean {
  if (!header) return false;
  const expected = Buffer.from(`sha256=${createHmac("sha256", secret).update(raw, "utf8").digest("hex")}`, "utf8");
  const received = Buffer.from(header.trim().toLowerCase(), "utf8");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function POST(req: Request) {
  // Com OUTBOX_WEBHOOK_SECRET a assinatura é obrigatória. Sem ele, o aviso é aceito: ele só
  // expira o cache e o conteúdo é sempre relido do CMS, então não há o que falsificar.
  const secret = webhookSecret();

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return reply(413, { ok: false, error: "Corpo grande demais." });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return reply(413, { ok: false, error: "Corpo grande demais." });
  if (secret && !validSignature(secret, raw, req.headers.get("x-outbox-signature"))) {
    return reply(401, { ok: false, error: "Assinatura inválida. Confira se OUTBOX_WEBHOOK_SECRET é igual ao segredo do webhook no CMS." });
  }

  let payload: { event?: unknown; post?: { slug?: unknown } | null };
  try {
    payload = JSON.parse(raw) as typeof payload;
  } catch {
    return reply(400, { ok: false, error: "JSON inválido." });
  }

  const event = typeof payload.event === "string" ? payload.event : (req.headers.get("x-outbox-event") ?? "");
  if (!EVENTS.has(event)) return reply(400, { ok: false, error: `Evento desconhecido: ${event || "(vazio)"}.` });

  if (event === "test") {
    return reply(200, { ok: true, event, message: secret ? "Webhook recebido. A assinatura confere." : "Webhook recebido." });
  }

  // expira na hora (o próximo acesso já busca a versão nova no CMS)
  revalidateTag(OUTBOX_TAG, { expire: 0 });

  const paths = ["/", "/blog", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/feed.xml"];
  const rawSlug = typeof payload.post?.slug === "string" ? payload.post.slug.trim().toLowerCase() : "";
  if (SLUG_RE.test(rawSlug)) paths.push(`/blog/${rawSlug}`);
  for (const p of paths) revalidatePath(p);
  // cobre artigos que mudaram de slug (a versão antiga sai do cache também)
  revalidatePath("/blog/[slug]", "page");

  return reply(200, { ok: true, event, slug: rawSlug || null, revalidated: paths });
}

export function GET() {
  return reply(405, { ok: false, error: "Use POST. Este endereço recebe os avisos de publicação do OutBox CMS." });
}
