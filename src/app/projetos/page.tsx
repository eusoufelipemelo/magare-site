import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { ProjectTile } from "@/components/ProjectTile";
import { projects } from "@/content/projetos";
import { absoluteUrl } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Cozinhas, closets, banheiros, áreas gourmet e casas inteiras em Brasília, com arquitetura e marcenaria pensadas juntas. Todas as fotos são de projetos reais da Magare.";

export const metadata: Metadata = pageMetadata({
  title: "Projetos de móveis planejados e arquitetura em Brasília",
  description: "Veja projetos reais da Magare no Lago Norte, na Asa Sul, no Alphaville e na CASACOR 2024: cozinhas, closets, banheiros e áreas gourmet.",
  path: "/projetos",
  image: "/og/projetos.jpg",
});

/** Grade alinhada em linhas: 2 grandes, 3 médios, 2 grandes. */
const layout = [
  "lg:col-span-3 lg:h-[600px]",
  "lg:col-span-3 lg:h-[600px]",
  "lg:col-span-2 lg:h-[480px]",
  "lg:col-span-2 lg:h-[480px]",
  "lg:col-span-2 lg:h-[480px]",
  "lg:col-span-3 lg:h-[540px]",
  "lg:col-span-3 lg:h-[540px]",
];

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
        image={{ src: "/projetos/apartamento-sqs-309/01.jpg", alt: "Sala de jantar com painel de madeira aberto revelando a cristaleira" }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
        ]}
      />
      <Container className="py-16 sm:py-24">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {projects.map((p, i) => (
            <ProjectTile
              key={p.slug}
              project={p}
              wide={i < 2 || i > 4}
              headingLevel="h2"
              className={`h-[460px] sm:h-[480px] ${i === 0 ? "sm:col-span-2 lg:col-span-3" : ""} ${layout[i] ?? "lg:col-span-2 lg:h-[480px]"}`}
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </Container>
      <LeadSection />
    </>
  );
}
