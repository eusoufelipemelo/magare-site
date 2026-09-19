import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Termos de Uso",
  description: "Condições de uso do site da Magare Móveis Planejados & Arquitetura: conteúdo, fotos, orçamentos, links externos e legislação aplicável.",
  path: "/termos-de-uso",
});

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" path="/termos-de-uso" intro="As condições para usar o site da Magare. Ao navegar por aqui, você concorda com estes termos.">
      <h2>1. Sobre o site</h2>
      <p>
        Este site apresenta a {siteConfig.name}, seus serviços de arquitetura e móveis planejados em Brasília, projetos realizados e artigos
        informativos. O uso é gratuito e não exige cadastro.
      </p>

      <h2>2. Conteúdo informativo</h2>
      <p>
        Os textos do site e do blog têm caráter informativo e não substituem uma avaliação do seu espaço. Soluções, materiais e prazos dependem de
        cada projeto e são definidos no atendimento.
      </p>

      <h2>3. Solicitações e orçamentos</h2>
      <p>
        O formulário do site apenas prepara uma mensagem para o WhatsApp da Magare. Enviar uma solicitação não gera contratação nem obrigação para
        nenhuma das partes. Propostas e orçamentos valem nas condições informadas em cada caso, e a contratação é formalizada à parte.
      </p>

      <h2>4. Fotos, marca e propriedade intelectual</h2>
      <p>
        As fotos mostram projetos reais da Magare. A marca, o logotipo, as fotos, os textos e o desenho do site são protegidos por lei e não podem ser
        copiados, reproduzidos ou usados comercialmente sem autorização por escrito. Você pode compartilhar links para as páginas.
      </p>

      <h2>5. Uso adequado</h2>
      <p>
        Não é permitido usar o site para fins ilícitos, tentar acessar áreas restritas, interferir no funcionamento dos servidores ou coletar
        conteúdo de forma automatizada para uso comercial.
      </p>

      <h2>6. Links externos</h2>
      <p>
        O site tem links para serviços de terceiros, como WhatsApp, Instagram e o provedor do mapa. Esses serviços têm termos e políticas próprios, e a
        Magare não responde pelo conteúdo deles.
      </p>

      <h2>7. Disponibilidade</h2>
      <p>
        Trabalhamos para manter o site no ar e as informações atualizadas, mas podem ocorrer interrupções para manutenção ou por falhas técnicas. O
        conteúdo pode ser alterado a qualquer momento.
      </p>

      <h2>8. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a <Link href="/politica-de-privacidade">Política de Privacidade</Link> e a{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>9. Legislação e foro</h2>
      <p>
        Estes termos seguem a legislação brasileira. Fica eleito o foro de Brasília (DF) para resolver eventuais questões, ressalvados os direitos do
        consumidor previstos em lei.
      </p>
    </LegalPage>
  );
}
