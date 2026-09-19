import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Política de Cookies",
  description: "O site da Magare não usa cookies de publicidade nem de rastreamento. Saiba o que é guardado no seu navegador e como gerenciar.",
  path: "/politica-de-cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" path="/politica-de-cookies" intro="O que o site guarda no seu navegador, e o que ele não guarda.">
      <h2>O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos que um site grava no navegador para lembrar informações entre uma visita e outra. Tecnologias parecidas, como o
        armazenamento local do navegador, têm a mesma função.
      </p>

      <h2>O que este site usa</h2>
      <p>
        <strong>O site da Magare não usa cookies de publicidade, de redes sociais nem de análise de comportamento.</strong> Não há pixels de anúncio
        nem ferramentas de rastreamento de terceiros.
      </p>
      <p>Guardamos apenas uma informação no armazenamento local do seu navegador:</p>
      <ul>
        <li>
          <strong>magare-aviso-cookies</strong>: lembra que você já viu o aviso sobre cookies, para ele não aparecer em toda página. Não identifica
          você e fica só no seu aparelho.
        </li>
      </ul>

      <h2>Serviços de terceiros</h2>
      <p>
        O mapa de regiões atendidas é carregado do OpenFreeMap, que recebe dados técnicos da sua conexão para entregar as imagens do mapa. Links para
        WhatsApp e Instagram levam a serviços com políticas próprias, que passam a valer quando você sai do site.
      </p>

      <h2>Como gerenciar</h2>
      <p>
        Você pode apagar ou bloquear cookies e o armazenamento local nas configurações do seu navegador. O site continua funcionando normalmente; o
        aviso sobre cookies só voltará a aparecer.
      </p>
      <p>
        Para saber como tratamos dados pessoais, leia a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </LegalPage>
  );
}
