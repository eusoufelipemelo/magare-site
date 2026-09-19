import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Faq } from "@/components/Faq";
import { GabrielaSection } from "@/components/GabrielaSection";
import { HeroPicture } from "@/components/HeroPicture";
import { Gallery } from "@/components/Gallery";
import { LeadSection } from "@/components/LeadSection";
import { PostCard } from "@/components/PostCard";
import { ProcessTimeline, type Step } from "@/components/ProcessTimeline";
import { ProjectTile } from "@/components/ProjectTile";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SplitTitle } from "@/components/SplitTitle";
import { WhatsAppIcon } from "@/components/icons";
import { gallery, galleryCategories, getProject, type Project } from "@/content/projetos";
import { whatsappUrl } from "@/lib/format";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

// Regera a página a cada 5 min (os últimos artigos também são atualizados pelo webhook).
export const revalidate = 300;

const homeTitle = "Móveis planejados e arquitetura em Brasília | Magare";

export const metadata: Metadata = {
  ...pageMetadata({ title: homeTitle, description: siteConfig.description, path: "/" }),
  title: { absolute: homeTitle },
};

const featured = ["casa-lago-norte", "casa-alphaville", "apartamento-sqs-309", "casacor-2024", "apartamento-sqs-210"]
  .map(getProject)
  .filter((p): p is Project => Boolean(p));

/** Foto de cada forma de contratar. */
const serviceImages = [
  { src: "/projetos/apartamento-sqs-210/03.jpg", alt: "Sala com moldura de madeira e iluminação indireta aberta para a cozinha" },
  { src: "/projetos/apartamento-sqs-309/04.jpg", alt: "Cozinha com armários amadeirados, aéreos verde-claros e revestimento branco" },
  { src: "/projetos/casa-alphaville/01.jpg", alt: "Cozinha integrada com ilha, bancada de refeições em curva e cadeiras azuis" },
];

/** Etapas de trabalho (sequência real, do briefing). */
const steps: Step[] = [
  {
    title: "Primeiro atendimento",
    text: "Uma conversa para entender o ambiente, a sua rotina e o que você espera do espaço.",
    image: { src: "/projetos/casacor-2024/01.jpg", alt: "Mesa de jantar orgânica diante de estante com nichos em arco" },
  },
  {
    title: "Projeto",
    text: "O ambiente é desenhado com o mobiliário dentro dele, pensando uso, circulação e armazenamento.",
    image: { src: "/projetos/apartamento-sqs-309/05.jpg", alt: "Armário de canto da cozinha aberto, com aproveitamento interno" },
  },
  {
    title: "Orçamento e materiais",
    text: "Escolha de cores, acabamentos e ferragens, com o orçamento do que foi projetado.",
    image: { src: "/projetos/casacor-2024/06.jpg", alt: "Nicho de madeira com vasos de cerâmica" },
  },
  {
    title: "Produção",
    text: "Os móveis planejados são produzidos em MDF a partir do detalhamento do projeto.",
    image: { src: "/projetos/casa-lago-norte/05.jpg", alt: "Gaveta de talheres aberta sob a bancada da cozinha" },
  },
  {
    title: "Montagem e entrega",
    text: "Instalação e ajustes finais até o ambiente estar pronto para ser vivido.",
    image: { src: "/projetos/casa-lago-norte/03.jpg", alt: "Cozinha pronta com armários brancos, coluna azul e nicho de madeira iluminado" },
  },
];

function Eyebrow({ children, light = false, center = false }: { children: string; light?: boolean; center?: boolean }) {
  return (
    <p data-reveal="fade" className={`flex items-center gap-4 text-[0.95rem] ${light ? "text-areia" : "text-brand"} ${center ? "justify-center" : ""}`}>
      <span aria-hidden className={`h-px w-10 ${light ? "bg-areia" : "bg-brand"}`} />
      {children}
      {center ? <span aria-hidden className={`h-px w-10 ${light ? "bg-areia" : "bg-brand"}`} /> : null}
    </p>
  );
}

const h2 = "mt-5 font-display text-[2.4rem] leading-[1.08] sm:text-[3.6rem]";

export default async function HomePage() {
  const { home, contact, services, stages } = siteConfig;
  const wa = whatsappUrl(contact.whatsapp, contact.whatsappMessage);
  const { posts } = await getPosts({ page: 1, perPage: 3 });
  const titleWords = home.heroTitle.split(" ");

  return (
    <>
      {/* Topo: a foto do painel com porta oculta ocupa a tela inteira e a porta se abre */}
      <section data-hero className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-surface">
        <div className="hero-media absolute inset-0 -z-20">
          <HeroPicture
            high
            alt=""
            desktop={{ src: "/hero/sala-fechada.jpg", width: 2600, height: 1733 }}
            mobile={{ src: "/hero/porta-fechada.jpg", width: 2400, height: 3600 }}
            className="object-[62%_58%] md:object-[50%_50%]"
          />
          <HeroPicture
            alt="Painel de madeira que se abre e revela o que estava oculto: a cristaleira na sala da SQS 309 e a porta da cozinha na casa do Lago Norte"
            desktop={{ src: "/hero/sala-aberta.jpg", width: 2600, height: 1733 }}
            mobile={{ src: "/hero/porta-aberta.jpg", width: 2400, height: 3600 }}
            className="door-open object-[62%_58%] md:object-[50%_50%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(34_30_31/0.92),rgb(34_30_31/0.35)_50%,rgb(34_30_31/0.35))] lg:bg-[linear-gradient(to_right,rgb(34_30_31/0.85),rgb(34_30_31/0.45)_48%,rgb(34_30_31/0.05)_78%)]"
        />

        <Container className="flex min-h-[100svh] flex-col justify-end pb-28 pt-32 lg:justify-center lg:pb-24">
          <h1 className="max-w-3xl">
            <span className="block font-display text-[3.3rem] leading-[0.98] tracking-[-0.02em] sm:text-[5.5rem] lg:text-[6.6rem]" data-reveal="words" style={{ "--d": "250ms" } as CSSProperties}>
              {titleWords.map((w, i) => (
                <span key={i}>
                  <span className="split-word">
                    <span style={{ "--i": i } as CSSProperties}>{w}</span>
                  </span>
                  {i < titleWords.length - 1 ? " " : null}
                </span>
              ))}
            </span>
            <span data-reveal="fade" style={{ "--d": "700ms" } as CSSProperties} className="mt-6 flex items-center gap-4 font-sans text-lg text-areia sm:text-xl">
              <span aria-hidden className="h-px w-10 bg-areia" />
              {home.heroSubtitle}
            </span>
          </h1>
          <p data-reveal="fade" style={{ "--d": "850ms" } as CSSProperties} className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-surface/85 sm:text-lg">
            {home.heroText}
          </p>
          <div data-reveal="fade" style={{ "--d": "1000ms" } as CSSProperties} className="mt-9 flex flex-col gap-3 sm:flex-row">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-inverse">
                <WhatsAppIcon />
                {home.primaryCta}
              </a>
            ) : null}
            <Link href="/projetos" className="btn border border-surface/50 text-surface hover:bg-surface hover:text-ink">
              {home.secondaryCta}
            </Link>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <Container className="flex items-end justify-between pb-6 sm:pb-8">
            <span className="flex flex-col items-center gap-2 text-xs text-surface/70">
              Role
              <span aria-hidden className="relative h-12 w-px overflow-hidden bg-surface/20">
                <span className="scroll-cue absolute inset-0 bg-surface" />
              </span>
            </span>
            <p className="cota cota-on-dark hidden w-[28rem] md:flex">Painel com cristaleira oculta, Apartamento na SQS 309</p>
          </Container>
        </div>
      </section>

      {/* A Magare: composição de fotos e manifesto */}
      <section aria-labelledby="manifesto" className="overflow-hidden py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="relative pb-16 lg:col-span-6 lg:pb-24">
            <span aria-hidden className="absolute -left-4 top-10 h-[70%] w-[60%] border border-areia sm:-left-6" />
            <div data-reveal="image" className="relative aspect-[4/5] w-[82%] overflow-hidden bg-surface-alt">
              <Image src="/projetos/casacor-2024/07.jpg" alt="Estante de madeira com nichos em arco e plantas" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
            </div>
            <div data-reveal="image" style={{ "--d": "250ms" } as CSSProperties} className="absolute bottom-0 right-0 aspect-[4/3] w-[58%] overflow-hidden border-[8px] border-surface bg-surface-alt">
              <Image src="/projetos/apartamento-sqs-309/01.jpg" alt="Sala de jantar com painel de madeira aberto, revelando a cristaleira" fill sizes="(min-width: 1024px) 28vw, 58vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>A Magare</Eyebrow>
            <SplitTitle id="manifesto" text="Antes de existir um móvel, existe uma rotina, uma família, uma história." className="mt-5 font-display text-[2.4rem] leading-[1.1] text-ink sm:text-[3.3rem]" />
            <div data-reveal="fade" className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                A Magare une arquitetura e marcenaria no mesmo lugar. Você não precisa contratar profissionais separados para pensar o ambiente e depois
                adaptar os móveis: o espaço e o mobiliário são pensados como uma coisa só.
              </p>
              <p>A arquitetura ajuda a compreender o espaço. A experiência de marcenaria mostra como transformá-lo.</p>
            </div>
            <div data-reveal="fade" className="mt-10 flex items-center gap-6 border-t border-line pt-8">
              <p className="font-display text-[4.2rem] leading-none text-brand">11</p>
              <p className="max-w-[14rem] leading-snug text-ink">anos de marcenaria e de projetos sob medida</p>
            </div>
            <div data-reveal="fade" className="mt-10">
              <Link href="/sobre" className="btn btn-secondary">
                Conheça a nossa história
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Três formas de contratar */}
      <section aria-labelledby="servicos" className="bg-surface-alt py-24 sm:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Serviços</Eyebrow>
              <SplitTitle id="servicos" text="Três formas de contratar" className={`${h2} text-ink`} />
            </div>
            <p data-reveal="fade" className="max-w-md leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
              Do projeto à obra pronta: cada forma inclui a anterior e vai um passo além. Escolha até onde a Magare vai com você.
            </p>
          </div>

          <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-6 lg:mt-20 lg:gap-8">
            {services.map((s, i) => (
              <li key={s.title} className="flex flex-col">
                <div data-reveal="image" style={{ "--d": `${i * 150}ms` } as CSSProperties} className="zoom-media relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image src={serviceImages[i].src} alt={serviceImages[i].alt} fill sizes="(min-width: 768px) 32vw, 100vw" className="object-cover" />
                </div>
                <div data-reveal="fade" style={{ "--d": `${150 + i * 150}ms` } as CSSProperties} className="flex flex-1 flex-col">
                  <h3 className="mt-7 font-display text-[2rem] leading-tight text-ink">{s.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-brand">{s.scope}</p>
                  <p className="mt-4 leading-relaxed text-muted">{s.description}</p>
                  <div className="mt-auto pt-6">
                  <ul className="space-y-2 border-t border-line pt-5" aria-label="Etapas incluídas">
                    {stages.map((st, j) => {
                      const on = j < s.covers;
                      return (
                        <li key={st} className={`flex items-center gap-3 text-[0.95rem] ${on ? "text-ink" : "text-muted/60"}`}>
                          <span aria-hidden className={`size-2 rounded-full ${on ? "bg-brand" : "border border-muted/40"}`} />
                          {st}
                          <span className="sr-only">{on ? "(incluído)" : "(não incluído)"}</span>
                        </li>
                      );
                    })}
                  </ul>
                  </div>
                  <Link href={`/servicos#${s.title.toLowerCase().replace(/\s+/g, "-")}`} className="link mt-7 self-start font-bold">
                    Ver o {s.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Projetos: grade alinhada */}
      <section aria-labelledby="projetos" className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Portfólio</Eyebrow>
              <SplitTitle id="projetos" text="Projetos em Brasília" className={`${h2} text-ink`} />
            </div>
            <div data-reveal="fade">
              <Link href="/projetos" className="btn btn-secondary">
                Ver todos os projetos
              </Link>
            </div>
          </div>
        </Container>
        <div className="snap-row mt-12 flex gap-4 overflow-x-auto px-4 sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-2 md:gap-5 md:overflow-visible lg:mt-16 lg:grid-cols-12 lg:gap-6 lg:px-8">
          <ProjectTile
            project={featured[0]}
            wide
            className="h-[480px] w-[85vw] max-w-[24rem] shrink-0 md:col-span-2 md:h-[520px] md:w-auto md:max-w-none lg:col-span-7 lg:h-[640px]"
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 100vw, 85vw"
          />
          <ProjectTile project={featured[1]} className="h-[480px] w-[85vw] max-w-[24rem] shrink-0 md:h-[460px] md:w-auto md:max-w-none lg:col-span-5 lg:h-[640px]" />
          {featured.slice(2).map((p) => (
            <ProjectTile
              key={p.slug}
              project={p}
              className="h-[480px] w-[85vw] max-w-[24rem] shrink-0 md:h-[460px] md:w-auto md:max-w-none lg:col-span-4 lg:h-[500px]"
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 85vw"
            />
          ))}
        </div>
      </section>

      {/* Galeria */}
      <section aria-labelledby="galeria" className="bg-ink py-24 text-surface sm:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow light>Galeria</Eyebrow>
              <SplitTitle id="galeria" text="Cada detalhe, desenhado para o espaço" className={h2} />
            </div>
            <p data-reveal="fade" className="max-w-md leading-relaxed text-surface/70 lg:col-span-4 lg:col-start-9">
              Cozinhas, salas, banheiros, closets e áreas gourmet de projetos reais da Magare. Toque em uma foto para ampliar.
            </p>
          </div>
          <div data-reveal="fade" className="mt-12">
            <Gallery items={gallery} categories={galleryCategories} />
          </div>
        </Container>
      </section>

      <GabrielaSection />

      {/* Como trabalhamos: linha do tempo que acompanha a rolagem */}
      <section aria-labelledby="processo" className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Como trabalhamos</Eyebrow>
            <SplitTitle id="processo" text="Do primeiro contato à montagem" className={`${h2} text-ink`} />
            <p data-reveal="fade" className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              O mesmo time acompanha o seu ambiente em todas as etapas.
            </p>
          </div>
          <ProcessTimeline steps={steps} />
        </Container>
      </section>

      {/* Onde atendemos: mapa interativo */}
      <section aria-labelledby="regioes" className="border-t border-line bg-surface-alt py-24 sm:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Onde atendemos</Eyebrow>
              <SplitTitle id="regioes" text="Brasília e entorno" className={`${h2} text-ink`} />
            </div>
            <p data-reveal="fade" className="max-w-md leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
              Foco nestas regiões. Escolha a sua no mapa para começar a conversa. Mora em outra região do DF? Pergunte pelo WhatsApp.
            </p>
          </div>
          <div data-reveal="fade" className="mt-12 lg:mt-16">
            <ServiceAreaMap regions={contact.regionPoints} whatsapp={contact.whatsapp} />
          </div>
        </Container>
      </section>

      {/* Perguntas frequentes */}
      <section aria-labelledby="faq" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Dúvidas</Eyebrow>
              <SplitTitle id="faq" text="Perguntas frequentes" className={`${h2} text-ink`} />
              <div data-reveal="image" className="relative mt-10 hidden aspect-[4/5] w-[78%] overflow-hidden bg-surface-alt lg:block">
                <Image src="/projetos/casa-lago-norte/06.jpg" alt="Lavabo com papel de parede tropical e bancada com nicho de madeira" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div data-reveal="fade" className="lg:col-span-7">
            <Faq />
          </div>
        </Container>
      </section>

      {/* Blog */}
      {posts.length ? (
        <section aria-labelledby="blog" className="border-t border-line py-24 sm:py-32">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SplitTitle id="blog" text="Do blog" className="font-display text-[2.4rem] leading-tight text-ink sm:text-[3.6rem]" />
              <Link href="/blog" className="link font-bold">
                Ver todos os artigos
              </Link>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <LeadSection />
    </>
  );
}
