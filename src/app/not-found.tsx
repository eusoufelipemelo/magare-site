import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHeader
      title="Esta página não existe ou mudou de endereço"
      intro="Confira o endereço digitado ou siga por um dos caminhos abaixo."
      image={{ src: "/projetos/casa-lago-norte/01.jpg", alt: "Painel de madeira do piso ao teto com portas ocultas fechadas" }}
      position="50% 55%"
      crumbs={[
        { name: "Início", path: "/" },
        { name: "Página não encontrada", path: "/404" },
      ]}
    >
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-inverse">
          Ir para o início
        </Link>
        <Link href="/projetos" className="btn border border-surface/50 text-surface hover:bg-surface hover:text-ink">
          Ver os projetos
        </Link>
      </div>
    </PageHeader>
  );
}
