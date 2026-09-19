import { getSiteProfile } from "@/lib/outbox";

/**
 * Arquivo de verificação do IndexNow: /<chave>.txt (reescrito para cá no next.config.ts).
 * Só responde quando o nome pedido é a indexnow_key do site no CMS (GET /api/v1/site).
 */
export async function GET(_req: Request, ctx: RouteContext<"/api/outbox/indexnow/[key]">) {
  const { key } = await ctx.params;
  const profile = await getSiteProfile();
  const expected = profile?.indexnowKey;
  if (!expected || key !== expected) {
    return new Response("Não encontrado.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  return new Response(expected, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
