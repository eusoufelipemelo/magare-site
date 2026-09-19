import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";
import { SplitTitle } from "./SplitTitle";

/** Foto padrão do topo das páginas internas (ex.: blog). */
const DEFAULT_IMAGE = { src: "/projetos/casacor-2024/04.jpg", alt: "Sala de estar integrada à cozinha, com forro de madeira curvo" };

/**
 * Topo das páginas internas: foto real de projeto em tela cheia, trilha, h1 animado e texto de apoio.
 * O cabeçalho do site fica transparente por cima (ver SiteNav).
 */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image = DEFAULT_IMAGE,
  position = "50% 50%",
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  image?: { src: string; alt: string };
  /** object-position da foto. */
  position?: string;
}) {
  return (
    <header data-hero className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-ink text-surface sm:min-h-[74svh]">
      <div className="hero-media absolute inset-0 -z-20">
        <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(34_30_31/0.88),rgb(34_30_31/0.35)_55%,rgb(34_30_31/0.45))]" />
      <Container className="pb-12 pt-36 sm:pb-16 lg:pb-20">
        <div data-reveal="fade">
          <Breadcrumbs items={crumbs} light />
        </div>
        <SplitTitle as="h1" text={title} className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.06] text-surface sm:text-6xl lg:text-7xl" />
        {intro ? (
          <p data-reveal="fade" style={{ "--d": "250ms" } as CSSProperties} className="mt-6 max-w-2xl text-lg leading-relaxed text-surface/85">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
