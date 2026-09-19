import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGallery } from "@/components/ProjectGallery";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { getProject, heroOf, projects } from "@/content/projetos";
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
  const heroImg = heroOf(project);
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

      <PageHeader
        title={project.title}
        intro={`${project.kind === "Mostra de decoração" ? project.kind : `${project.kind}, ${project.place}`}. ${project.rooms.join(", ")}.`}
        image={{ src: heroImg.src, alt: heroImg.alt }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
          { name: project.title, path: `/projetos/${project.slug}` },
        ]}
      />

      <section aria-label="Sobre o projeto" className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p data-reveal="fade" className="font-display text-[1.7rem] leading-snug text-ink sm:text-[2.2rem] lg:col-span-8">
            {project.summary}
          </p>
          <div data-reveal="fade" className="lg:col-span-3 lg:col-start-10">
            <h2 className="font-sans text-sm font-bold text-ink">Ambientes</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.rooms.map((r) => (
                <li key={r} className="rounded-full border border-line px-3.5 py-1.5 text-[0.95rem] text-ink">
                  {r}
                </li>
              ))}
            </ul>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-primary mt-7 w-full">
                <WhatsAppIcon />
                Quero um projeto assim
              </a>
            ) : null}
          </div>
        </Container>
      </section>

      <section aria-label={`Fotos do projeto ${project.title}`}>
        <Container>
          <ProjectGallery images={project.images} />
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
      </Container>
      <LeadSection />
    </>
  );
}
