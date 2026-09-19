import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { whatsappUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "LGPD: seus direitos",
  description: "Como exercer seus direitos de titular de dados pessoais junto à Magare, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
  path: "/lgpd",
});

export default function LgpdPage() {
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, "Olá! Quero fazer uma solicitação sobre meus dados pessoais (LGPD).");
  return (
    <LegalPage title="LGPD: seus direitos" path="/lgpd" intro="A Lei Geral de Proteção de Dados garante a você controle sobre os seus dados pessoais. Veja como exercer esses direitos.">
      <h2>Seus direitos como titular</h2>
      <p>De acordo com o art. 18 da LGPD, você pode pedir à Magare, a qualquer momento:</p>
      <ul>
        <li>Confirmação de que tratamos dados seus;</li>
        <li>Acesso aos dados;</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;</li>
        <li>Portabilidade dos dados a outro fornecedor, observados os segredos comercial e industrial;</li>
        <li>Eliminação dos dados tratados com base no seu consentimento, salvo as hipóteses de guarda previstas em lei;</li>
        <li>Informação sobre com quem compartilhamos os seus dados;</li>
        <li>Informação sobre a possibilidade de não dar consentimento e as consequências disso;</li>
        <li>Revogação do consentimento.</li>
      </ul>

      <h2>Como fazer um pedido</h2>
      <p>
        Envie a sua solicitação pelo WhatsApp{" "}
        {wa ? (
          <a href={wa} target="_blank" rel="noopener">
            {c.phone}
          </a>
        ) : (
          c.phone
        )}
        , informando seu nome e o que deseja. Para proteger os seus dados, podemos pedir uma confirmação de identidade antes de atender.
      </p>
      <p>
        Respondemos pelo mesmo canal. Pedidos de confirmação e de acesso em formato simplificado são respondidos imediatamente ou, quando for preciso
        reunir as informações, em até 15 dias, como prevê o art. 19 da LGPD.
      </p>

      <h2>Autoridade Nacional de Proteção de Dados</h2>
      <p>
        Se entender que o seu pedido não foi atendido, você também pode apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD), em{" "}
        <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">
          gov.br/anpd
        </a>
        .
      </p>

      <h2>Mais informações</h2>
      <p>
        Os dados que tratamos, as finalidades e com quem compartilhamos estão na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </LegalPage>
  );
}
