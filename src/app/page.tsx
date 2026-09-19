import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { GabrielaSection } from "@/components/GabrielaSection";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ScopeRuler } from "@/components/ScopeRuler";
import { WhatsAppIcon } from "@/components/icons";
import { getProject, type Project } from "@/content/projetos";
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

/** Projetos da Home, na ordem do mosaico. */
const featured = ["apartamento-sqs-309", "casa-alphaville", "casa-lago-norte", "casacor-2024", "apartamento-sqs-210"]
  .map(getProject)
  .filter((p): p is Project => Boolean(p));

/** Posição de cada card no mosaico (telas grandes). */
const mosaic = [
  { className: "lg:col-span-7", aspect: "aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/3]", sizes: "(min-width: 1024px) 58vw, (min-width: 768px) 100vw, 82vw" },
  { className: "lg:col-span-5 lg:mt-32", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 82vw" },
  { className: "lg:col-span-4", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 82vw" },
  { className: "lg:col-span-4 lg:mt-20", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 82vw" },
  { className: "lg:col-span-4", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 82vw" },
];

/** Etapas de trabalho (sequência real, do briefing). */
const steps = [
  { title: "Primeiro atendimento", text: "Uma conversa para entender o ambiente, a sua rotina e o que você espera do espaço." },
  { title: "Projeto", text: "O ambiente é desenhado com o mobiliário dentro dele, pensando uso, circulação e armazenamento." },
  { title: "Orçamento e materiais", text: "Escolha de cores, acabamentos e ferragens, com o orçamento do que foi projetado." },
  { title: "Produção", text: "Os móveis planejados são produzidos em MDF a partir do detalhamento do projeto." },
  { title: "Montagem e entrega", text: "Instalação e ajustes finais até o ambiente estar pronto para ser vivido." },
];

export default async function HomePage() {
  const { home, contact } = siteConfig;
  const wa = whatsappUrl(contact.whatsapp, contact.whatsappMessage);
  const { posts } = await getPosts({ page: 1, perPage: 3 });

  return (
    <>
      {/* Topo: o painel de madeira com porta oculta abre depois que a página carrega */}
      <section className="overflow-hidden">
        <Container className="hero-grid gap-x-12 gap-y-6 pb-14 pt-8 sm:gap-y-8 sm:pt-12 lg:gap-x-20 lg:pb-24 lg:pt-14">
          <h1 className="text-ink [grid-area:title] md:self-end">
            <span className="block font-display text-[2.9rem] leading-[1.02] tracking-[-0.02em] sm:text-7xl lg:text-[5.4rem]">{home.heroTitle}</span>
            <span className="mt-4 block font-sans text-lg leading-snug text-brand sm:mt-7 sm:text-xl">{home.heroSubtitle}</span>
          </h1>

          <figure className="-mx-4 [grid-area:media] sm:mx-0 md:self-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt sm:aspect-[3/4] md:aspect-[2/3] md:max-h-[78vh] md:w-full">
              <Image src={home.heroImage} alt="" fill loading="eager" fetchPriority="high" sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-[50%_60%]" />
              <Image src={home.heroImageOpen} alt={home.heroImageAlt} fill loading="eager" sizes="(min-width: 768px) 45vw, 100vw" className="door-open object-cover object-[50%_60%]" />
            </div>
            <figcaption className="cota mx-4 mt-4 sm:mx-0">Painel com porta oculta, Casa no Lago Norte</figcaption>
          </figure>

          <div className="[grid-area:body] md:self-start">
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{home.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener" className="btn btn-primary">
                  <WhatsAppIcon />
                  {home.primaryCta}
                </a>
              ) : null}
              <Link href="/projetos" className="btn btn-secondary">
                {home.secondaryCta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto */}
      <section aria-labelledby="manifesto" className="border-y border-line bg-surface-alt">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20">
          <h2 id="manifesto" className="max-w-[18ch] font-display text-[2.2rem] leading-[1.12] text-ink sm:text-[3.2rem]">
            Antes de existir um móvel, existe uma rotina, uma família, uma história.
          </h2>
          <div className="max-w-md space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            <p>
              A Magare une arquitetura e marcenaria no mesmo lugar. Você não precisa contratar profissionais separados para pensar o ambiente e depois adaptar
              os móveis: o espaço e o mobiliário são pensados como uma coisa só.
            </p>
            <p>A arquitetura ajuda a compreender o espaço. Os 11 anos de marcenaria mostram como transformá-lo.</p>
            <Link href="/sobre" className="link inline-block pt-1 font-bold">
              Conheça a Magare
            </Link>
          </div>
        </Container>
      </section>

      {/* Serviços como régua de escopo */}
      <section aria-labelledby="servicos" className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="servicos" className="font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">
                Três formas de contratar
              </h2>
              <p className="mt-3 max-w-xl text-muted">Do projeto à obra pronta: escolha até onde a Magare vai com você.</p>
            </div>
            <Link href="/servicos" className="link shrink-0 font-bold">
              Detalhes dos serviços
            </Link>
          </div>
          <div className="mt-10 sm:mt-14">
            <ScopeRuler />
          </div>
        </Container>
      </section>

      {/* Projetos */}
      <section aria-labelledby="projetos" className="pb-16 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="projetos" className="font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">
                Projetos em Brasília
              </h2>
              <p className="mt-3 max-w-xl text-muted">Fotos reais de casas, apartamentos e da participação na CASACOR 2024.</p>
            </div>
            <Link href="/projetos" className="link shrink-0 font-bold">
              Ver todos os projetos
            </Link>
          </div>
        </Container>
        {/* celular: carrossel com encaixe; tablet e computador: mosaico */}
        <div className="snap-row mt-10 flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 md:mx-auto md:grid md:max-w-7xl md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:pb-0 lg:grid-cols-12 lg:px-8">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              aspect={mosaic[i].aspect}
              sizes={mosaic[i].sizes}
              className={`w-[82vw] max-w-[22rem] shrink-0 md:w-auto md:max-w-none ${i === 0 ? "md:col-span-2" : ""} ${mosaic[i].className}`}
            />
          ))}
        </div>
      </section>

      <GabrielaSection />

      {/* Como trabalhamos */}
      <section aria-labelledby="processo" className="py-16 sm:py-24">
        <Container>
          <h2 id="processo" className="font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">
            Do primeiro contato à montagem
          </h2>
          <p className="mt-3 max-w-xl text-muted">O mesmo time acompanha o seu ambiente em todas as etapas.</p>
          <ol className="mt-12 grid gap-0 md:grid-cols-5 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-9 last:pb-0 md:block md:border-t md:border-ink/70 md:pb-0 md:pt-6">
                <span aria-hidden className="font-display text-[2rem] leading-none text-brand md:block md:text-[2.6rem]">
                  {i + 1}
                </span>
                {/* linha vertical entre as etapas no celular */}
                {i < steps.length - 1 ? <span aria-hidden className="absolute bottom-2 left-[0.7rem] top-12 w-px bg-line md:hidden" /> : null}
                <div>
                  <h3 className="font-display text-[1.35rem] leading-snug text-ink md:mt-5">{s.title}</h3>
                  <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Onde atendemos + Perguntas frequentes */}
      <section aria-labelledby="regioes" className="border-t border-line bg-surface-alt py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <h2 id="regioes" className="font-display text-[2.2rem] leading-tight text-ink sm:text-[2.6rem]">
              Onde atendemos
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">Brasília e entorno, com foco nestas regiões:</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 border-t border-line">
              {contact.regions.map((r) => (
                <li key={r} className="border-b border-line py-3 font-display text-[1.2rem] text-ink">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">Mora em outra região do DF? Pergunte pelo WhatsApp.</p>
          </div>
          <div>
            <h2 className="font-display text-[2.2rem] leading-tight text-ink sm:text-[2.6rem]">Perguntas frequentes</h2>
            <div className="mt-8">
              <Faq />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog */}
      {posts.length ? (
        <section aria-labelledby="blog" className="py-16 sm:py-24">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="blog" className="font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">
                Do blog
              </h2>
              <Link href="/blog" className="link font-bold">
                Ver todos os artigos
              </Link>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <Container className={`pb-20 ${posts.length ? "" : "pt-16 sm:pt-24"}`}>
        <CtaBlock />
      </Container>
    </>
  );
}
