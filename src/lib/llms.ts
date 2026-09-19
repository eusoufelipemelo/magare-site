import "server-only";
import { absoluteUrl } from "@/lib/env";
import { projects } from "@/content/projetos";
import type { PostSummary } from "@/lib/outbox";
import { siteConfig } from "@/site.config";

/** llms.txt de reserva (quando o CMS não responde), montado com o site.config.ts. */
export function fallbackLlms(posts: PostSummary[], full: boolean): string {
  const c = siteConfig.contact;
  const a = c.address;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    siteConfig.tagline,
    "",
    "## Contato",
    "",
    c.phone ? `- Telefone: ${c.phone}` : "",
    c.whatsapp ? `- WhatsApp: https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
    c.email ? `- E-mail: ${c.email}` : "",
    a.street ? `- Endereço: ${a.street}, ${a.neighborhood ? `${a.neighborhood}, ` : ""}${a.city}/${a.state}` : "",
    c.hours ? `- Horário: ${c.hours}` : "",
    c.areaServed ? `- Região atendida: ${c.areaServed}` : "",
    "",
    "## Páginas",
    "",
    `- [Início](${absoluteUrl("/")}): ${siteConfig.tagline}`,
    `- [Serviços](${absoluteUrl("/servicos")}): ${siteConfig.services.map((s) => s.title).join(", ")}`,
    `- [Projetos](${absoluteUrl("/projetos")}): ${projects.map((p) => p.title).join(", ")}`,
    `- [Sobre](${absoluteUrl("/sobre")}): ${siteConfig.about.headline}`,
    `- [Contato](${absoluteUrl("/contato")}): canais de atendimento`,
    `- [Blog](${absoluteUrl("/blog")}): ${siteConfig.blog.description}`,
  ];
  if (full) {
    lines.push("", "## Serviços", "");
    for (const s of siteConfig.services) lines.push(`### ${s.title}`, "", s.description, "");
    lines.push("## Projetos", "");
    for (const p of projects) lines.push(`### [${p.title}](${absoluteUrl(`/projetos/${p.slug}`)})`, "", `${p.kind}, ${p.place}. ${p.summary}`, "");
    lines.push("## Regiões atendidas", "", `${siteConfig.contact.areaServed}: ${siteConfig.contact.regions.join(", ")}.`, "");
    lines.push("## Perguntas frequentes", "");
    for (const f of siteConfig.faq) lines.push(`### ${f.q}`, "", f.a, "");
    lines.push("## Sobre", "", ...siteConfig.about.paragraphs.flatMap((p) => [p, ""]));
    const e = siteConfig.about.expert;
    lines.push(`### ${e.name}`, "", `${e.credentials}. ${e.bio}`, "");
  }
  if (posts.length) {
    lines.push("", "## Artigos", "");
    for (const p of posts) {
      const summary = (full ? (p.answerSummary ?? p.excerpt) : p.excerpt).replace(/\s+/g, " ").trim();
      lines.push(`- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${summary ? `: ${summary}` : ""}`);
    }
  }
  return `${lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim()}\n`;
}
