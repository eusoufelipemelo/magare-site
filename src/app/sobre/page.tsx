import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import type { CSSProperties } from "react";
import { LeadSection } from "@/components/LeadSection";
import { SplitTitle } from "@/components/SplitTitle";
import { GabrielaSection } from "@/components/GabrielaSection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const description =
  "Conheça a Magare: 11 anos de marcenaria que hoje se unem à arquitetura, com a arquiteta Gabriela Reis à frente dos projetos de móveis planejados e interiores em Brasília.";

export const metadata: Metadata = pageMetadata({ title: "Sobre a Magare e a arquiteta Gabriela Reis", description, path: "/sobre", image: "/og/sobre.jpg" });

const principles = [
  {
    title: "Arquitetura e marcenaria no mesmo lugar",
    text: "O espaço e o mobiliário são pensados juntos. Você não precisa contratar profissionais separados para projetar o ambiente e depois adaptar os móveis.",
    image: { src: "/projetos/casa-lago-norte/02.jpg", alt: "Painel de madeira com a porta oculta aberta para a cozinha" },
  },
  {
    title: "Projetos pensados para pessoas",
    text: "Cada projeto começa pela rotina de quem vai usar o ambiente: o que precisa, o que sonha e o que pode ficar mais fácil no dia a dia.",
    image: { src: "/projetos/quarto-juvenil/01.jpg", alt: "Quarto juvenil com bancada de estudos, estante de nichos e armários azuis" },
  },
  {
    title: "Do projeto à execução",
    text: "A experiência de marcenaria acompanha o projeto até a produção e a montagem, com atenção à funcionalidade, à qualidade e ao acabamento.",
    image: { src: "/projetos/apartamento-sqs-309/07.jpg", alt: "Banheiro com gabinete de madeira, cuba branca e box em azulejo azul" },
  },
];

export default function AboutPage() {
  const { about } = siteConfig;
  const expert = about.expert;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/sobre"),
          name: "Sobre a Magare",
          about: { "@id": organizationId() },
          mainEntity: {
            "@type": "Person",
            name: expert.name,
            jobTitle: "Arquiteta e urbanista",
            description: expert.bio,
            image: absoluteUrl("/equipe/gabriela-reis.jpg"),
            worksFor: { "@id": organizationId() },
            knowsAbout: ["Arquitetura de interiores", "Móveis planejados", "Marcenaria"],
          },
        }}
      />
      <PageHeader
        title={about.headline}
        intro="A Magare nasceu na marcenaria e hoje une móveis planejados e arquitetura em Brasília, com a mesma essência de sempre e um novo olhar sobre o que pode criar."
        image={{ src: "/projetos/casacor-2024/05.jpg", alt: "Ambiente da CASACOR 2024 com sala de jantar e estar integradas" }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]}
      />

      <section aria-label="Nossa história" className="py-20 sm:py-28">
        <Container className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-14 lg:gap-24">
          <div data-reveal="fade" className="max-w-[40rem] space-y-5 text-[1.0625rem] leading-[1.75] text-ink sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-4 font-display text-[1.6rem] leading-snug text-brand sm:text-[1.9rem]">
              Projetos pensados para pessoas. Espaços feitos para viver.
            </p>
          </div>
          <figure className="md:pt-2">
            <div data-reveal="image" className="relative aspect-[3/4] overflow-hidden bg-surface-alt">
              <Image
                src="/equipe/casacor-22.jpg"
                alt="Gabriela Reis em pé na cozinha do ambiente da CASACOR 2024"
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <figcaption className="cota mt-4">Gabriela Reis na CASACOR 2024</figcaption>
          </figure>
        </Container>
      </section>

      <section aria-labelledby="principios" className="border-t border-line bg-surface-alt py-24 sm:py-32">
        <Container>
          <SplitTitle id="principios" text="O que guia o trabalho" className="font-display text-[2.4rem] leading-tight text-ink sm:text-[3.6rem]" />
          <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
            {principles.map((p, i) => (
              <li key={p.title}>
                <div data-reveal="image" style={{ "--d": `${i * 150}ms` } as CSSProperties} className="zoom-media relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover" />
                </div>
                <div data-reveal="fade" style={{ "--d": `${150 + i * 150}ms` } as CSSProperties}>
                  <h3 className="mt-7 font-display text-[1.75rem] leading-snug text-ink">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <GabrielaSection link="whatsapp" />

      <LeadSection image={{ src: "/projetos/casa-lago-norte/04.jpg", alt: "Cozinha em U com marcenaria amadeirada e revestimento geométrico azul e branco" }} />
    </>
  );
}
