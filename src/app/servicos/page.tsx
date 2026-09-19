import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ScopeRuler } from "@/components/ScopeRuler";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const intro =
  "Consultoria e projeto, projeto com móveis planejados ou arquitetura completa com execução. Escolha até onde a Magare vai com você no seu ambiente em Brasília.";

export const metadata: Metadata = pageMetadata({
  title: "Móveis planejados e projetos de arquitetura em Brasília",
  description: "Serviços da Magare em Brasília: consultoria e projeto, móveis planejados sob medida em MDF e arquitetura de interiores com execução.",
  path: "/servicos", image: "/og/servicos.jpg",
});

/** Ambientes que a Magare projeta, cada um com uma foto real de projeto. */
const rooms = [
  { name: "Cozinhas", src: "/projetos/casa-alphaville/01.jpg", alt: "Cozinha integrada com ilha e bancada de refeições em curva", href: "/projetos/casa-alphaville" },
  { name: "Closets e armários", src: "/projetos/apartamento-sqs-309/08.jpg", alt: "Closet com prateleiras e cabideiros dos dois lados", href: "/projetos/apartamento-sqs-309" },
  { name: "Banheiros e lavabos", src: "/projetos/casa-lago-norte/06.jpg", alt: "Lavabo com papel de parede tropical e bancada com nicho de madeira", href: "/projetos/casa-lago-norte" },
  { name: "Áreas gourmet", src: "/projetos/area-gourmet/01.jpg", alt: "Área gourmet com churrasqueira e bancada extensa", href: "/projetos/area-gourmet" },
  { name: "Salas de jantar e painéis", src: "/projetos/apartamento-sqs-309/01.jpg", alt: "Sala de jantar com painel de madeira aberto revelando a cristaleira", href: "/projetos/apartamento-sqs-309" },
  { name: "Quartos", src: "/projetos/quarto-juvenil/01.jpg", alt: "Quarto juvenil com bancada de estudos e estante de nichos", href: "/projetos/quarto-juvenil" },
  { name: "Lavanderias", src: "/projetos/casa-lago-norte/11.jpg", alt: "Lavanderia com armários brancos e base azul", href: "/projetos/casa-lago-norte" },
  { name: "Salas de estar", src: "/projetos/casacor-2024/04.jpg", alt: "Sala de estar integrada à cozinha, com forro de madeira curvo, na CASACOR 2024", href: "/projetos/casacor-2024" },
];

export default function ServicesPage() {
  const { services, contact } = siteConfig;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          url: absoluteUrl("/servicos"),
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              serviceType: s.scope,
              description: s.description,
              provider: { "@id": organizationId() },
              areaServed: { "@type": "City", name: "Brasília", containedInPlace: { "@type": "State", name: "Distrito Federal" } },
            },
          })),
        }}
      />
      <PageHeader
        title="Arquitetura e móveis planejados em Brasília"
        intro={intro}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]}
      />

      <section aria-label="Serviços" className="py-14 sm:py-20">
        <Container>
          <ScopeRuler detailed headingLevel="h2" />
        </Container>
      </section>

      <section aria-labelledby="ambientes" className="border-t border-line bg-surface-alt py-16 sm:py-24">
        <Container>
          <h2 id="ambientes" className="font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">
            Ambientes que projetamos
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Residências e espaços comerciais em {contact.areaServed.replace(" (DF)", "")}. Cada ambiente abaixo vem de um projeto real da Magare.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {rooms.map((r) => (
              <li key={r.name}>
                <Link href={r.href} className="group block rounded-sm">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image src={r.src} alt={r.alt} fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.92]" />
                  </div>
                  <h3 className="mt-3 font-display text-[1.2rem] leading-snug text-ink decoration-salvia underline-offset-4 group-hover:underline sm:text-[1.35rem]">{r.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="faq" className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <h2 id="faq" className="font-display text-[2.2rem] leading-tight text-ink sm:text-[2.6rem]">
            Perguntas frequentes
          </h2>
          <Faq />
        </Container>
      </section>

      <Container className="pb-20">
        <CtaBlock title="Não sabe qual serviço escolher?" text="Conte qual ambiente quer transformar e indicamos o caminho mais adequado para o seu caso." />
      </Container>
    </>
  );
}
