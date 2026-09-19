/**
 * Portfólio da Magare. Fotos reais do cliente em /public/projetos/<slug>/NN.jpg
 * (exportadas a 2000 px no lado maior). Os textos descrevem só o que aparece nas fotos.
 */

export type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  slug: string;
  title: string;
  /** Tipo de imóvel. */
  kind: string;
  /** Bairro ou região. */
  place: string;
  summary: string;
  rooms: string[];
  /** Número da foto usada como capa (1 = primeira). */
  cover: number;
  /** Número da foto horizontal usada no topo da página do projeto. */
  hero: number;
  images: ProjectImage[];
};

const L = { width: 2000, height: 1333 };
const P = { width: 1333, height: 2000 };

function img(slug: string, n: number, size: { width: number; height: number }, alt: string): ProjectImage {
  return { src: `/projetos/${slug}/${String(n).padStart(2, "0")}.jpg`, ...size, alt };
}

export const projects: Project[] = [
  {
    slug: "casa-lago-norte",
    hero: 12,
    cover: 3,
    title: "Casa no Lago Norte",
    kind: "Casa",
    place: "Lago Norte",
    summary:
      "Uma casa inteira pensada com a marcenaria: um painel de madeira do piso ao teto que esconde as portas, cozinha em azul e branco com nichos iluminados, lavanderia, lavabo, banheiro e área gourmet.",
    rooms: ["Cozinha", "Lavanderia", "Lavabo", "Banheiro", "Área gourmet", "Painel com porta oculta"],
    images: [
      img("casa-lago-norte", 1, P, "Painel de madeira do piso ao teto com portas ocultas fechadas"),
      img("casa-lago-norte", 2, P, "Painel de madeira com a porta oculta aberta para a cozinha"),
      img("casa-lago-norte", 3, P, "Cozinha com armários brancos, coluna azul e nicho de madeira iluminado"),
      img("casa-lago-norte", 4, P, "Cozinha em U com marcenaria amadeirada e revestimento geométrico azul e branco"),
      img("casa-lago-norte", 5, P, "Gaveta de talheres aberta sob a bancada da cozinha"),
      img("casa-lago-norte", 6, P, "Lavabo com papel de parede tropical e bancada com nicho de madeira"),
      img("casa-lago-norte", 7, P, "Cuba escura e metais pretos no lavabo com papel de parede colorido"),
      img("casa-lago-norte", 8, P, "Área gourmet com forno de pizza, churrasqueira e marcenaria clara"),
      img("casa-lago-norte", 9, P, "Forno de pizza embutido entre armários na área gourmet"),
      img("casa-lago-norte", 10, L, "Banheiro com gabinete suspenso de madeira e espelho com iluminação embutida"),
      img("casa-lago-norte", 11, L, "Lavanderia com armários brancos, base azul e prateleira iluminada"),
      img("casa-lago-norte", 12, L, "Cozinha com coluna azul para a geladeira e mesa de jantar"),
    ],
  },
  {
    slug: "apartamento-sqs-309",
    hero: 1,
    cover: 1,
    title: "Apartamento na SQS 309",
    kind: "Apartamento",
    place: "Asa Sul",
    summary:
      "Apartamento na Asa Sul em que a madeira organiza a planta: o painel da sala de jantar abre e revela a cristaleira, a cozinha ganha armários de canto aproveitados e a despensa vai do piso ao teto. Banheiros, closet e armários completam o projeto.",
    rooms: ["Sala de jantar", "Cozinha", "Despensa", "Banheiros", "Closet", "Armários"],
    images: [
      img("apartamento-sqs-309", 1, L, "Sala de jantar com o painel de madeira aberto, revelando a cristaleira"),
      img("apartamento-sqs-309", 2, L, "Sala de jantar com o painel de madeira fechado e piso de taco"),
      img("apartamento-sqs-309", 3, L, "Cozinha integrada à cristaleira embutida no painel de madeira"),
      img("apartamento-sqs-309", 4, L, "Cozinha com armários amadeirados, aéreos verde-claros e revestimento branco"),
      img("apartamento-sqs-309", 5, P, "Armário de canto da cozinha aberto, com aproveitamento interno"),
      img("apartamento-sqs-309", 6, P, "Despensa do piso ao teto com prateleiras organizadas"),
      img("apartamento-sqs-309", 7, P, "Banheiro com gabinete de madeira, cuba branca e box em azulejo azul"),
      img("apartamento-sqs-309", 8, P, "Closet com prateleiras e cabideiros dos dois lados"),
      img("apartamento-sqs-309", 9, L, "Bancada dupla com gabinete de madeira e espelho emoldurado"),
      img("apartamento-sqs-309", 10, P, "Armário branco do piso ao teto com puxadores de madeira"),
    ],
  },
  {
    slug: "casacor-2024",
    hero: 1,
    cover: 1,
    title: "Ambiente na CASACOR 2024",
    kind: "Mostra de decoração",
    place: "CASACOR 2024",
    summary:
      "Participação da Magare na CASACOR 2024: estante com nichos em arco, cozinha com parede de pedra, sala e dormitório com cabeceira e closet integrados, em madeira escura e cores quentes.",
    rooms: ["Sala de jantar", "Cozinha", "Sala de estar", "Dormitório", "Closet"],
    images: [
      img("casacor-2024", 1, L, "Sala de jantar com estante de nichos em arco, mesa orgânica e parede laranja"),
      img("casacor-2024", 2, L, "Cozinha com marcenaria escura e parede de pedra"),
      img("casacor-2024", 3, L, "Dormitório com parede de pedra, cama central e closet aberto"),
      img("casacor-2024", 4, L, "Sala de estar integrada à cozinha, com forro de madeira curvo"),
      img("casacor-2024", 5, L, "Vista do ambiente com sala de jantar e estar integradas"),
      img("casacor-2024", 6, P, "Nicho de madeira com vasos de cerâmica"),
      img("casacor-2024", 7, P, "Estante de madeira com nichos em arco e plantas"),
      img("casacor-2024", 8, P, "Gaveteiro com divisórias no closet"),
    ],
  },
  {
    slug: "casa-alphaville",
    hero: 1,
    cover: 2,
    title: "Casa no Alphaville",
    kind: "Casa",
    place: "Alphaville",
    summary:
      "Cozinha aberta para a paisagem, com ilha, bancada de refeições em curva e armários altos que guardam tudo sem pesar. Na sala, um painel de madeira reúne a TV e as portas.",
    rooms: ["Cozinha", "Sala de jantar", "Sala de estar"],
    images: [
      img("casa-alphaville", 1, L, "Cozinha integrada com ilha, bancada de refeições em curva e cadeiras azuis"),
      img("casa-alphaville", 2, P, "Corredor da cozinha com ilha e janela do piso ao teto para a paisagem"),
      img("casa-alphaville", 3, L, "Cozinha com geladeira embutida, nichos de madeira e revestimento azul e branco"),
      img("casa-alphaville", 4, L, "Mesa posta na bancada de refeições, com torres de forno ao fundo"),
      img("casa-alphaville", 5, { width: 1125, height: 2000 }, "Cuba de inox e revestimento geométrico sob nichos de madeira"),
      img("casa-alphaville", 6, L, "Sala com painel de madeira, TV e rack branco suspenso"),
      img("casa-alphaville", 7, L, "Sala ampla com painel de madeira que esconde as portas"),
    ],
  },
  {
    slug: "apartamento-sqs-210",
    hero: 1,
    cover: 1,
    title: "Apartamento na SQS 210",
    kind: "Apartamento",
    place: "Asa Sul",
    summary:
      "Cozinha em madeira com bancada em L, revestimento gráfico e aéreos claros; closet branco com gaveteiro e banheiro com gabinete escuro. A moldura de madeira com luz indireta integra a sala à cozinha.",
    rooms: ["Cozinha", "Sala", "Closet", "Banheiro"],
    images: [
      img("apartamento-sqs-210", 1, L, "Cozinha em L com armários de madeira e revestimento gráfico preto e branco"),
      img("apartamento-sqs-210", 2, L, "Bancada da cozinha com cooktop e aéreos claros"),
      img("apartamento-sqs-210", 3, L, "Sala com moldura de madeira e iluminação indireta aberta para a cozinha"),
      img("apartamento-sqs-210", 4, P, "Bancada com cuba e gaveteiros de madeira"),
      img("apartamento-sqs-210", 5, P, "Banheiro com gabinete escuro e espelho amplo"),
      img("apartamento-sqs-210", 6, P, "Closet branco com prateleiras e gaveteiro"),
      img("apartamento-sqs-210", 7, P, "Armário alto com nichos abertos no corredor"),
    ],
  },
  {
    slug: "quarto-juvenil",
    hero: 1,
    cover: 4,
    title: "Quarto juvenil",
    kind: "Apartamento",
    place: "Brasília",
    summary:
      "Quarto em azul e cinza com bancada de estudo, estante de nichos para coleções e armário com porta de espelho, tudo desenhado para o tamanho do quarto.",
    rooms: ["Dormitório", "Bancada de estudos"],
    images: [
      img("quarto-juvenil", 1, L, "Quarto juvenil com bancada de estudos, estante de nichos e armários azuis"),
      img("quarto-juvenil", 2, L, "Vista do quarto com a cama, a bancada e a janela"),
      img("quarto-juvenil", 3, L, "Estante de nichos com fotos e objetos sobre a bancada"),
      img("quarto-juvenil", 4, P, "Cama com painel iluminado e armário com porta de espelho"),
    ],
  },
  {
    slug: "area-gourmet",
    hero: 1,
    cover: 2,
    title: "Casa com área gourmet",
    kind: "Casa",
    place: "Brasília",
    summary:
      "Área gourmet com janela para a área verde, churrasqueira, bancada extensa e marcenaria cinza com nichos de madeira iluminados.",
    rooms: ["Área gourmet", "Cozinha"],
    images: [
      img("area-gourmet", 1, L, "Área gourmet com churrasqueira, bancada extensa e janela para a área verde"),
      img("area-gourmet", 2, P, "Corredor da área gourmet com bancada escura e armários cinza"),
      img("area-gourmet", 3, P, "Nicho de madeira iluminado sobre armários cinza"),
      img("area-gourmet", 4, P, "Armário cinza com nicho de madeira e gaveteiro"),
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function heroOf(p: Project): ProjectImage {
  return p.images[p.hero - 1] ?? p.images[0];
}

export function coverOf(p: Project): ProjectImage {
  return p.images[p.cover - 1] ?? p.images[0];
}

/** Categorias da galeria da Home. */
export const galleryCategories = ["Cozinhas", "Salas", "Banheiros e lavabos", "Closets e armários", "Áreas gourmet", "Quartos"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryItem = ProjectImage & { category: GalleryCategory; project: Pick<Project, "slug" | "title"> };

/** Seleção de fotos para a galeria, intercalando ambientes e formatos. */
const gallerySelection: [string, number, GalleryCategory][] = [
  ["casa-alphaville", 1, "Cozinhas"],
  ["casa-lago-norte", 6, "Banheiros e lavabos"],
  ["apartamento-sqs-309", 8, "Closets e armários"],
  ["casacor-2024", 1, "Salas"],
  ["casa-lago-norte", 4, "Cozinhas"],
  ["area-gourmet", 1, "Áreas gourmet"],
  ["quarto-juvenil", 4, "Quartos"],
  ["apartamento-sqs-309", 1, "Salas"],
  ["apartamento-sqs-309", 7, "Banheiros e lavabos"],
  ["casa-lago-norte", 8, "Áreas gourmet"],
  ["apartamento-sqs-210", 1, "Cozinhas"],
  ["casa-lago-norte", 2, "Salas"],
  ["casacor-2024", 3, "Quartos"],
  ["apartamento-sqs-210", 6, "Closets e armários"],
  ["apartamento-sqs-309", 4, "Cozinhas"],
  ["casa-lago-norte", 10, "Banheiros e lavabos"],
  ["casacor-2024", 7, "Salas"],
  ["casa-alphaville", 2, "Cozinhas"],
  ["apartamento-sqs-309", 6, "Closets e armários"],
  ["apartamento-sqs-210", 3, "Salas"],
  ["area-gourmet", 3, "Áreas gourmet"],
  ["quarto-juvenil", 1, "Quartos"],
  ["casa-lago-norte", 3, "Cozinhas"],
  ["apartamento-sqs-210", 5, "Banheiros e lavabos"],
  ["casacor-2024", 4, "Salas"],
  ["apartamento-sqs-309", 10, "Closets e armários"],
  ["casa-alphaville", 6, "Salas"],
  ["casacor-2024", 2, "Cozinhas"],
  ["apartamento-sqs-309", 9, "Banheiros e lavabos"],
  ["casa-lago-norte", 11, "Closets e armários"],
];

export const gallery: GalleryItem[] = gallerySelection.flatMap(([slug, n, category]) => {
  const project = getProject(slug);
  const image = project?.images[n - 1];
  return project && image ? [{ ...image, category, project: { slug: project.slug, title: project.title } }] : [];
});
