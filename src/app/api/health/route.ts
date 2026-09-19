export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true, service: "outbox-site", time: new Date().toISOString() });
}
