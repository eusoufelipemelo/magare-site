import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { getProject, projects } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { truncate, whatsappUrl } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { siteConfig } from "@/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projeto não encontrado", robots: { index: false } };
  const title = `${project.title}: ${project.rooms.slice(0, 3).join(", ").toLowerCase()}`;
  const description = truncate(project.summary, 158);
  const path = `/projetos/${project.slug}`;
  const og = absoluteUrl(`/og/projetos/${project.slug}.jpg`);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: og, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  // Duas colunas equilibradas pela altura das fotos, mantendo a ordem: as duas primeiras ficam lado a lado.
  const columns: (typeof project.images)[] = [[], []];
  const heights = [0, 0];
  for (const img of project.images) {
    const c = heights[0] <= heights[1] ? 0 : 1;
    columns[c].push(img);
    heights[c] += img.height / img.width;
  }
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, `Olá! Vi o projeto "${project.title}" no site da Magare e gostaria de conversar sobre o meu espaço.`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: absoluteUrl(`/projetos/${project.slug}`),
          creator: { "@id": organizationId() },
          locationCreated: { "@type": "Place", name: `${project.place}, Brasília - DF` },
          keywords: ["móveis planejados", "arquitetura de interiores", ...project.rooms.map((r) => r.toLowerCase())].join(", "),
          image: project.images.map((i) => absoluteUrl(i.src)),
        }}
      />

      <header>
        <Container className="pb-10 pt-8 sm:pb-14 sm:pt-12">
          <Breadcrumbs
            items={[
              { name: "Início", path: "/" },
              { name: "Projetos", path: "/projetos" },
              { name: project.title, path: `/projetos/${project.slug}` },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-[2.5rem] leading-[1.06] text-ink sm:text-6xl">{project.title}</h1>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{project.summary}</p>
            </div>
            <div>
              <h2 className="font-sans text-sm font-bold text-ink">Ambientes</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.rooms.map((r) => (
                  <li key={r} className="rounded-full border border-line px-3.5 py-1.5 text-[0.95rem] text-ink">
                    {r}
                  </li>
                ))}
              </ul>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener" className="btn btn-primary mt-7 w-full sm:w-auto">
                  <WhatsAppIcon />
                  Quero um projeto assim
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </header>

      <section aria-label={`Fotos do projeto ${project.title}`}>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {columns.map((col, c) => (
              <div key={c} className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {col.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading={img === project.images[0] || img === project.images[1] ? "eager" : "lazy"}
                    sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full bg-surface-alt"
                  />
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <Link href={`/projetos/${next.slug}`} className="group flex items-center justify-between gap-6 border-y border-line py-8">
          <span>
            <span className="block text-sm text-muted">Próximo projeto</span>
            <span className="mt-1 block font-display text-[1.9rem] leading-tight text-ink decoration-salvia underline-offset-[6px] group-hover:underline sm:text-[2.4rem]">
              {next.title}
            </span>
          </span>
          <svg aria-hidden width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="shrink-0 text-brand">
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Link>
        <div className="mt-14 sm:mt-20">
          <CtaBlock title="Quer um projeto assim para o seu espaço?" />
        </div>
      </Container>
    </>
  );
}
