import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Cozinhas, closets, banheiros, áreas gourmet e casas inteiras em Brasília, com arquitetura e marcenaria pensadas juntas. Todas as fotos são de projetos reais da Magare.";

export const metadata: Metadata = pageMetadata({
  title: "Projetos de móveis planejados e arquitetura em Brasília",
  description: "Veja projetos reais da Magare no Lago Norte, na Asa Sul, no Alphaville e na CASACOR 2024: cozinhas, closets, banheiros e áreas gourmet.",
  path: "/projetos", image: "/og/projetos.jpg",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: absoluteUrl("/projetos"),
          itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/projetos/${p.slug}`), name: p.title })),
        }}
      />
      <PageHeader
        title="Projetos"
        intro={intro}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
        ]}
      />
      <Container className="py-12 sm:py-16">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              headingLevel="h2"
              className={i % 3 === 1 ? "lg:mt-16" : ""}
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
            />
          ))}
        </div>
      </Container>
      <Container className="pb-20">
        <CtaBlock title="Quer um projeto assim para o seu espaço?" />
      </Container>
    </>
  );
}
