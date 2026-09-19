import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como a Magare Móveis Planejados & Arquitetura trata os dados pessoais de quem visita o site e entra em contato, de acordo com a LGPD.",
  path: "/politica-de-privacidade",
});

export default function PrivacyPage() {
  const c = siteConfig.contact;
  return (
    <LegalPage title="Política de Privacidade" path="/politica-de-privacidade" intro="Como tratamos os dados pessoais de quem visita o site e fala com a Magare.">
      <h2>1. Quem somos</h2>
      <p>
        Este site é da {siteConfig.name}, empresa de móveis planejados e arquitetura com atuação em Brasília (DF). Para os fins da Lei Geral de Proteção de
        Dados Pessoais (Lei nº 13.709/2018, a LGPD), a Magare é a controladora dos dados pessoais tratados a partir deste site.
      </p>
      <p>
        Para qualquer assunto de privacidade, fale com a gente pelo WhatsApp {c.phone}. Esse é o canal de atendimento ao titular dos dados.
      </p>

      <h2>2. Quais dados tratamos</h2>
      <h3>Dados que você nos envia</h3>
      <p>
        Quando você preenche o formulário de solicitação de projeto, informa nome, número de WhatsApp e, se quiser, a região do imóvel, o tipo de
        imóvel, os ambientes, o serviço de interesse e uma descrição do projeto. <strong>Esses dados não ficam guardados no site</strong>: o
        formulário apenas monta uma mensagem e abre o WhatsApp no seu aparelho. A mensagem só chega à Magare se você decidir enviá-la.
      </p>
      <p>
        Nas conversas pelo WhatsApp ou pelo Instagram, tratamos as informações que você compartilhar para responder e prestar o atendimento, como
        fotos, medidas ou plantas do seu espaço.
      </p>
      <h3>Dados de navegação</h3>
      <p>
        Como em qualquer site, o servidor de hospedagem registra dados técnicos de acesso, como endereço IP, data e hora, página visitada e tipo de
        navegador, para manter o site funcionando e seguro. Nos artigos do blog, a plataforma de conteúdo (OutBox CMS) conta as leituras usando dados
        técnicos da conexão, apenas para evitar contagem repetida, sem identificar você pelo nome.
      </p>
      <p>
        O site não usa cookies de publicidade nem ferramentas de rastreamento de terceiros. Veja os detalhes na{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>3. Para que usamos os dados</h2>
      <ul>
        <li>Responder ao seu contato e entender o seu projeto;</li>
        <li>Preparar propostas e orçamentos e, se houver contratação, executar o serviço;</li>
        <li>Manter o site funcionando, seguro e com estatísticas agregadas de leitura do blog;</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>

      <h2>4. Bases legais</h2>
      <p>
        Tratamos dados com base no seu consentimento (ao enviar a mensagem pelo formulário), na execução de procedimentos preliminares e de contratos
        a seu pedido, no cumprimento de obrigação legal e no legítimo interesse de manter o site seguro, sempre nos limites do art. 7º da LGPD.
      </p>

      <h2>5. Com quem os dados são compartilhados</h2>
      <p>Não vendemos dados pessoais. Os dados podem passar por fornecedores que ajudam a operar o site e o atendimento:</p>
      <ul>
        <li>WhatsApp (Meta), por onde a conversa acontece, conforme a política de privacidade do próprio aplicativo;</li>
        <li>Empresa de hospedagem do site e OutBox Soluções Digitais, que desenvolve e mantém o site e a plataforma do blog;</li>
        <li>OpenFreeMap, que fornece as imagens do mapa de regiões atendidas e recebe dados técnicos da sua conexão ao carregá-lo;</li>
        <li>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
      </ul>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Mantemos os dados pelo tempo necessário para o atendimento e, se houver contrato, pelo prazo exigido por lei (por exemplo, para fins fiscais e
        de defesa em processos). Registros técnicos de acesso são mantidos pelo prazo de seis meses previsto no Marco Civil da Internet.
      </p>

      <h2>7. Seus direitos</h2>
      <p>
        Você pode pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, informação sobre compartilhamento, revogação do
        consentimento e eliminação dos dados, entre outros direitos do art. 18 da LGPD. Veja como exercer cada um na página{" "}
        <Link href="/lgpd">LGPD: seus direitos</Link>.
      </p>

      <h2>8. Segurança</h2>
      <p>
        O site usa conexão criptografada (HTTPS) e não armazena os dados do formulário. Adotamos medidas razoáveis para proteger as informações
        recebidas no atendimento, com acesso restrito a quem precisa delas.
      </p>

      <h2>9. Crianças e adolescentes</h2>
      <p>O site e o atendimento são destinados a adultos. Não coletamos intencionalmente dados de crianças.</p>

      <h2>10. Alterações</h2>
      <p>Esta política pode ser atualizada. A data da última versão aparece no início da página.</p>
    </LegalPage>
  );
}
