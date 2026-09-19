import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";

const docs = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD: seus direitos", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export const LEGAL_UPDATED = "19 de setembro de 2026";

/** Estrutura dos documentos legais: foto no topo, texto e navegação entre os documentos. */
export function LegalPage({ title, intro, path, children }: { title: string; intro: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHeader
        title={title}
        intro={intro}
        image={{ src: "/projetos/apartamento-sqs-210/03.jpg", alt: "Sala com moldura de madeira e iluminação indireta" }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: title, path },
        ]}
      />
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-8">
        <nav aria-label="Documentos legais" className="lg:col-span-3">
          <ul className="border-t border-line lg:sticky lg:top-28">
            {docs.map((d) => (
              <li key={d.href} className="border-b border-line">
                <Link href={d.href} aria-current={d.href === path ? "page" : undefined} className="flex min-h-12 items-center text-[0.95rem] text-muted hover:text-ink aria-[current=page]:font-bold aria-[current=page]:text-brand">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="prose-outbox max-w-3xl lg:col-span-8 lg:col-start-5">
          <p className="text-[0.95rem] text-muted">Última atualização: {LEGAL_UPDATED}.</p>
          {children}
        </article>
      </Container>
    </>
  );
}
