import { siteDomain } from "@/lib/env";

export const dynamic = "force-dynamic";

/** Usado pelo "Testar conexão" do OutBox CMS para confirmar que o blog está instalado. */
export function GET() {
  return Response.json(
    { outbox: true, blog: "/blog", domain: siteDomain() || null },
    { headers: { "cache-control": "no-store" } },
  );
}
