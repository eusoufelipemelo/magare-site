import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

/** Cabeçalho das páginas internas: trilha, h1 e texto de apoio. */
export function PageHeader({ title, intro, crumbs, children }: { title: string; intro?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <Container className="pb-10 pt-8 sm:pb-16 sm:pt-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.08] text-ink sm:text-6xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        {children}
      </Container>
    </header>
  );
}
