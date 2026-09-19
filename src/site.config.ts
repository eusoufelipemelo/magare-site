import { Oxygen, Playfair_Display } from "next/font/google";

/**
 * IDENTIDADE DO CLIENTE: Magare Móveis Planejados & Arquitetura (Brasília/DF).
 *
 * Dados do briefing do cliente (16/09/2026) e da identidade visual (logos, Playfair Display + Oxygen).
 * Os projetos do portfólio ficam em src/content/projetos.ts.
 */

// ---------------------------------------------------------------------------
// Fontes da identidade: Playfair Display (títulos) e Oxygen (textos).
// Os argumentos precisam ser literais (regra do next/font). Mantenha as `variable`.
// ---------------------------------------------------------------------------
export const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Oxygen({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export type NavLink = { label: string; href: string };
export type Service = {
  title: string;
  /** Nome curto do escopo (ex.: "Consultoria e projeto"). */
  scope: string;
  description: string;
  /** Para quem o serviço é indicado. */
  forWhom: string;
  includes: string[];
  /** Etapas cobertas, na ordem de `stages` (usado na régua de escopo). */
  covers: number;
};

export const siteConfig = {
  /** Nome público da empresa. */
  name: "Magare Móveis Planejados & Arquitetura",
  /** Razão social: ainda não informada pelo cliente (vazio = usa o nome). */
  legalName: "",
  /** Slogan da marca. */
  tagline: "Onde seu espaço ganha forma.",
  /** Descrição padrão das páginas (150–160 caracteres). */
  description:
    "Móveis planejados sob medida e projetos de arquitetura e interiores em Brasília. A Magare pensa o espaço e a marcenaria juntos, do projeto à montagem.",
  /** Domínio de produção, sem barra no fim. A variável SITE_URL tem prioridade. */
  url: "https://www.magare.com.br",
  locale: "pt_BR",
  language: "pt-BR",

  /** Logo original do cliente (versão sem slogan, grafite) em /public/marca. */
  logo: { src: "/marca/magare-grafite.svg", width: 1317, height: 422 },
  /** Imagem de compartilhamento (1200x630) com logo e foto real de projeto. */
  ogImage: "/compartilhamento.jpg",

  /** Loja/escritório de móveis e arquitetura: LocalBusiness do tipo casa e construção. */
  schemaType: "HomeAndConstructionBusiness",

  nav: [
    { label: "Início", href: "/" },
    { label: "Projetos", href: "/projetos" },
    { label: "Serviços", href: "/servicos" },
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ] satisfies NavLink[],

  contact: {
    /** Só números, com DDI e DDD. */
    whatsapp: "5561992531648",
    whatsappMessage: "Olá! Vim pelo site da Magare e gostaria de conversar sobre um projeto.",
    phone: "(61) 99253-1648",
    phoneHref: "+5561992531648",
    /** O cliente ainda vai criar o e-mail: vazio esconde o campo no site. */
    email: "",
    /** Sem endereço de atendimento ao público informado: campos vazios somem do site. */
    address: {
      street: "",
      neighborhood: "",
      city: "Brasília",
      state: "DF",
      postalCode: "",
      country: "BR",
    },
    mapsUrl: "",
    /** Horário não informado no briefing. */
    hours: "",
    openingHoursSpec: [] as string[],
    areaServed: "Brasília e entorno (DF)",
    /** Regiões com foco de atendimento (briefing). */
    regions: [
      "Águas Claras",
      "Sudoeste",
      "Asa Norte",
      "Asa Sul",
      "Lago Norte",
      "Noroeste",
      "Guará",
      "Vicente Pires",
    ],
  },

  /** Perfis oficiais (entram no JSON-LD como sameAs). */
  social: [{ label: "Instagram", href: "https://www.instagram.com/magareambientesplanejados/" }] satisfies NavLink[],

  /** Etapas que os serviços cobrem, em ordem crescente de escopo. */
  stages: ["Projeto", "Móveis planejados", "Arquitetura e interiores", "Execução"],

  /** As três formas de contratar a Magare (briefing). */
  services: [
    {
      title: "Magare Essencial",
      scope: "Consultoria e projeto",
      description:
        "Consultoria e projeto para quem quer pensar o ambiente com orientação profissional antes de decidir o que fazer e quando fazer.",
      forWhom: "Para quem quer clareza sobre o espaço, a distribuição e o mobiliário antes de investir.",
      includes: ["Conversa sobre a rotina e o que o ambiente precisa resolver", "Estudo do espaço", "Projeto do ambiente com o mobiliário"],
      covers: 1,
    },
    {
      title: "Magare Planejado",
      scope: "Projeto e móveis planejados",
      description:
        "Projeto e móveis planejados juntos: o ambiente é desenhado já com a marcenaria, e os móveis são produzidos a partir desse projeto.",
      forWhom: "Para quem quer cozinha, closet, dormitório, banheiro ou área gourmet com móveis feitos para o espaço.",
      includes: ["Projeto do ambiente com o mobiliário", "Móveis planejados em MDF, produzidos a partir do projeto", "Montagem"],
      covers: 2,
    },
    {
      title: "Magare Completo",
      scope: "Arquitetura, projeto, móveis e execução",
      description:
        "Arquitetura, projeto, móveis e execução com a mesma equipe, para transformar o ambiente inteiro sem precisar contratar profissionais separados.",
      forWhom: "Para reformas e ambientes novos, residenciais ou comerciais, em que o espaço e o mobiliário mudam juntos.",
      includes: [
        "Projeto de arquitetura e interiores",
        "Projeto e produção dos móveis planejados",
        "Execução, com acompanhamento até a entrega do ambiente",
      ],
      covers: 4,
    },
  ] satisfies Service[],

  /** Página Sobre e blocos da Home. */
  about: {
    headline: "Uma história construída a quatro mãos",
    paragraphs: [
      "A Magare nasceu na marcenaria. Gabriela e Maicon aprenderam na prática que transformar um ambiente vai muito além de fabricar móveis, e há 11 anos acompanham cada etapa desse trabalho: do primeiro atendimento ao projeto, do orçamento à produção, da escolha dos materiais à montagem.",
      "Essa experiência mudou a forma de enxergar o trabalho. Antes de existir um móvel, existe uma necessidade, uma rotina, uma família, uma história. Por isso a Magare passou a unir móveis planejados e arquitetura: a arquitetura ajuda a compreender o espaço, e a marcenaria mostra como transformá-lo.",
      "O objetivo não é só entregar ambientes bonitos. É entender como você vive, o que precisa e o que sonha, para criar um espaço que faça sentido para quem mora ou trabalha nele.",
    ],
    /** Só fatos informados pelo cliente. */
    facts: [{ value: "11 anos", label: "de atuação em móveis planejados" }],
    /** Responsável técnico (E-E-A-T). */
    expert: {
      name: "Gabriela Reis",
      credentials: "Arquiteta e urbanista (CAU) e empresária, sócia da Magare",
      bio: "Gabriela começou na marcenaria e acompanhou, ao longo de mais de uma década, todas as etapas de um móvel planejado, do atendimento à montagem. Arquiteta registrada no CAU, conduz os projetos da Magare pensando o espaço e o mobiliário como uma coisa só.",
    },
  },

  /** Textos da Home. */
  home: {
    heroTitle: "Onde seu espaço ganha forma.",
    heroSubtitle: "Móveis planejados e arquitetura em Brasília",
    heroText:
      "Projeto de arquitetura e marcenaria sob medida no mesmo lugar. A Magare pensa o ambiente e o móvel juntos, a partir da sua rotina, e acompanha tudo até a montagem.",
    primaryCta: "Conversar no WhatsApp",
    secondaryCta: "Ver projetos",
    heroImage: "/projetos/casa-lago-norte/01.jpg",
    heroImageOpen: "/projetos/casa-lago-norte/02.jpg",
    heroImageAlt: "Painel de madeira do piso ao teto com uma porta oculta que se abre para a cozinha, em casa no Lago Norte",
  },

  blog: {
    title: "Blog",
    description: "Ideias e orientações sobre móveis planejados, arquitetura e interiores para quem vai reformar ou montar a casa em Brasília.",
    perPage: 12,
  },

  /** Chamada para ação no fim dos artigos e das páginas. */
  cta: {
    title: "Vamos dar forma ao seu espaço?",
    text: "Conte qual ambiente você quer transformar e em que bairro fica. A conversa começa pelo WhatsApp.",
    button: "Conversar no WhatsApp",
  },

  /** Perguntas frequentes (Home e Serviços, com FAQPage no JSON-LD). Só fatos do briefing. */
  faq: [
    {
      q: "A Magare faz projeto de arquitetura e móveis planejados?",
      a: "Sim. Você pode contratar só a consultoria e o projeto (Magare Essencial), o projeto com os móveis planejados (Magare Planejado) ou a arquitetura completa, com projeto, móveis e execução (Magare Completo).",
    },
    {
      q: "Quais regiões de Brasília a Magare atende?",
      a: "Brasília e entorno, com foco em Águas Claras, Sudoeste, Asa Norte, Asa Sul, Lago Norte, Noroeste, Guará, Vicente Pires e regiões próximas. Se o seu endereço não está na lista, pergunte pelo WhatsApp.",
    },
    {
      q: "Com que material os móveis planejados são feitos?",
      a: "Os móveis planejados da Magare são produzidos em MDF. Cores, acabamentos e ferragens são definidos no projeto, de acordo com o uso de cada ambiente.",
    },
    {
      q: "Preciso contratar um arquiteto antes de fazer os móveis?",
      a: "Não. O projeto faz parte do trabalho da Magare: o ambiente e o mobiliário são pensados juntos, por quem também conhece a produção e a montagem dos móveis.",
    },
    {
      q: "A Magare atende espaços comerciais?",
      a: "Sim. Além de casas e apartamentos, a Magare faz projetos e móveis planejados para espaços comerciais.",
    },
    {
      q: "Como pedir um orçamento?",
      a: "Envie uma mensagem pelo WhatsApp (61) 99253-1648 contando qual ambiente quer transformar e em que bairro fica. Se tiver fotos ou medidas do espaço, mande junto.",
    },
  ],

  /**
   * CORES da identidade (HEX exatos dos arquivos do logo) + tons de apoio derivados.
   * Contraste: branco sobre #65705F = 5,2:1; #221E1F sobre #EFF0EB = 14:1.
   */
  theme: {
    brand: "#65705F", // verde Magare: botões, links, destaques
    brandContrast: "#FFFFFF", // texto sobre o verde
    brandSoft: "#E1E3D6", // fundos suaves (derivado do sálvia)
    ink: "#221E1F", // grafite da marca: texto principal
    muted: "#57534F", // texto secundário (derivado do grafite)
    surface: "#EFF0EB", // off-white da marca: fundo da página
    surfaceAlt: "#E4E6DD", // fundo de seções alternadas
    line: "#CBCEBF", // bordas e divisórias
    salvia: "#B3B792", // sálvia da marca
    areia: "#C3B399", // areia da marca
    radius: "4px", // arredondamento de caixas (botões são arredondados à parte)
  },
};

export type SiteConfig = typeof siteConfig;
