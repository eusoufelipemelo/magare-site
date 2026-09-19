import { fallbackLlms } from "@/lib/llms";
import { getAllPosts, getRaw } from "@/lib/outbox";

// Proxy de GET /api/v1/llms-full.txt do CMS; sem resposta, gera uma versão com o site.config.ts.
export const revalidate = 300;

export async function GET() {
  const body = (await getRaw("/llms-full.txt")) ?? fallbackLlms(await getAllPosts(), true);
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
