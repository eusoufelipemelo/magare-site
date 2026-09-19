import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LeadSection } from "@/components/LeadSection";
import { PageHeader } from "@/components/PageHeader";
import { SplitTitle } from "@/components/SplitTitle";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/format";
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

const serviceImages = [
  { src: "/projetos/apartamento-sqs-210/03.jpg", alt: "Sala com moldura de madeira e iluminação indireta aberta para a cozinha" },
  { src: "/projetos/apartamento-sqs-309/04.jpg", alt: "Cozinha com armários amadeirados, aéreos verde-claros e revestimento branco" },
  { src: "/projetos/casa-alphaville/03.jpg", alt: "Cozinha com geladeira embutida, nichos de madeira e revestimento azul e branco" },
];

export default function ServicesPage() {
  const { services, contact, stages } = siteConfig;
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
        image={{ src: "/projetos/casa-alphaville/01.jpg", alt: "Cozinha integrada com ilha e bancada de refeições em curva" }}
        position="50% 60%"
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]}
      />

      <section aria-label="Formas de contratar" className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SplitTitle text="Cada forma inclui a anterior e vai um passo além" className="font-display text-[2.2rem] leading-[1.1] text-ink sm:text-5xl" />
            <p data-reveal="fade" className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              Você escolhe até onde a Magare acompanha o seu ambiente: só o projeto, o projeto com os móveis ou a obra inteira.
            </p>
          </div>

          <div className="mt-20 space-y-24 sm:space-y-32">
            {services.map((s, i) => {
              const wa = whatsappUrl(contact.whatsapp, `Olá! Quero saber mais sobre o ${s.title}.`);
              const img = serviceImages[i];
              return (
                <article key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                  <div data-reveal="image" className={`zoom-media relative aspect-[4/5] overflow-hidden bg-surface-alt sm:aspect-[5/4] lg:col-span-6 lg:aspect-[4/5] ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                    <p data-reveal="fade" className="flex items-center gap-4 text-[0.95rem] text-brand">
                      <span aria-hidden className="h-px w-10 bg-brand" />
                      {s.scope}
                    </p>
                    <SplitTitle as="h2" text={s.title} className="mt-4 font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl" />
                    <div data-reveal="fade">
                      <p className="mt-6 text-lg leading-relaxed text-ink">{s.description}</p>
                      <p className="mt-6 text-sm font-bold text-ink">Para quem é</p>
                      <p className="mt-1.5 leading-relaxed text-muted">{s.forWhom}</p>
                      <p className="mt-6 text-sm font-bold text-ink">O que envolve</p>
                      <ul className="mt-2 space-y-2">
                        {s.includes.map((x) => (
                          <li key={x} className="flex gap-3 leading-relaxed text-muted">
                            <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand" />
                            {x}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Etapas incluídas">
                        {stages.map((st, j) => (
                          <li key={st} className={`rounded-full border px-3.5 py-1.5 text-sm ${j < s.covers ? "border-brand bg-brand text-brand-contrast" : "border-line text-muted/70"}`}>
                            {st}
                            <span className="sr-only">{j < s.covers ? " (incluído)" : " (não incluído)"}</span>
                          </li>
                        ))}
                      </ul>
                      {wa ? (
                        <a href={wa} target="_blank" rel="noopener" className="btn btn-primary mt-10">
                          <WhatsAppIcon />
                          Quero o {s.title}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="ambientes" className="bg-ink py-24 text-surface sm:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SplitTitle id="ambientes" text="Ambientes que projetamos" className="font-display text-[2.4rem] leading-tight sm:text-[3.6rem] lg:col-span-7" />
            <p data-reveal="fade" className="max-w-md leading-relaxed text-surface/70 lg:col-span-4 lg:col-start-9">
              Residências e espaços comerciais em Brasília. Cada ambiente abaixo vem de um projeto real da Magare.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {rooms.map((r, i) => (
              <li key={r.name} data-reveal="fade" style={{ "--d": `${(i % 4) * 100}ms` } as CSSProperties}>
                <Link href={r.href} className="group block rounded-sm">
                  <div className="zoom-media relative aspect-[4/5] overflow-hidden bg-surface/5">
                    <Image src={r.src} alt={r.alt} fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover" />
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] leading-snug decoration-areia underline-offset-4 group-hover:underline sm:text-[1.5rem]">{r.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="faq" className="py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <SplitTitle id="faq" text="Perguntas frequentes" className="font-display text-[2.4rem] leading-tight text-ink sm:text-[3.6rem] lg:col-span-5" />
          <div data-reveal="fade" className="lg:col-span-7">
            <Faq />
          </div>
        </Container>
      </section>

      <LeadSection image={{ src: "/projetos/apartamento-sqs-309/06.jpg", alt: "Despensa do piso ao teto com prateleiras organizadas" }} />
    </>
  );
}
