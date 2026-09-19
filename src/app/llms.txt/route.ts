import { fallbackLlms } from "@/lib/llms";
import { getAllPosts, getRaw } from "@/lib/outbox";

// Proxy de GET /api/v1/llms.txt do CMS; sem resposta, gera uma versão mínima com o site.config.ts.
export const revalidate = 300;

export async function GET() {
  const body = (await getRaw("/llms.txt")) ?? fallbackLlms(await getAllPosts(), false);
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
