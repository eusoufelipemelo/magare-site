# Magare Móveis Planejados & Arquitetura: site

Site institucional da Magare (Brasília/DF), feito a partir do OutBox Site Starter.

- Domínio: https://www.magare.com.br (e https://magare.com.br)
- Dados do cliente, serviços, FAQ e cores: `src/site.config.ts`
- Portfólio (projetos e fotos): `src/content/projetos.ts` e `public/projetos/<slug>/`
- Logos originais: `public/marca/` · Imagens de compartilhamento (Open Graph): `public/compartilhamento.jpg` e `public/og/`
- Blog: conectado ao OutBox CMS pelo domínio (sem variáveis de ambiente)

---

# OutBox Site Starter

Modelo em Next.js 16 para os sites dos clientes da OutBox (clínicas, escritórios, lojas, serviços, indústria). O blog lê a Content API do OutBox CMS: o artigo publicado no CMS aparece no site na hora, pronto para SEO e para ser citado por buscadores de IA (ChatGPT, Gemini, Perplexity, AI Overviews).

## Criar o site de um cliente

1. **Copie o repositório** para um repositório novo, com o nome do cliente (ex.: `site-clinica-exemplo`).
2. **Edite `src/site.config.ts`**. Tudo o que é do cliente está neste arquivo:
   - nome, razão social, frase, descrição e domínio (`url`);
   - fontes (import do Google Fonts no topo) e cores (`theme`, viram variáveis CSS);
   - menu, WhatsApp, telefone, e-mail, endereço, horário, redes sociais;
   - serviços, textos da Home e da página Sobre, responsável técnico;
   - `schemaType` (tipo no schema.org: `LocalBusiness`, `MedicalClinic`, `LegalService`...).
   Procure por `[TROCAR]`: nenhum texto de exemplo pode ir para o ar.
3. **Logo e imagens** (opcional): coloque em `public/` e informe o caminho em `logo.src`, `ogImage` e `home.heroImage`. Sem logo, o nome vira o logotipo. Sem `ogImage`, a imagem de compartilhamento é gerada em `/og.png` com as cores do site. O favicon é gerado com a inicial e a cor principal (troque por `src/app/icon.png` se o cliente tiver um).
4. **Rode local**: `cp .env.example .env.local`, preencha as variáveis e rode `npm install && npm run dev`.

## Variáveis de ambiente

Os valores ficam no OutBox CMS, na página do site do cliente.

| Variável | Onde pegar |
| --- | --- |
| `OUTBOX_SITE_KEY` | Chave pública do site (`pk_...`) |
| `OUTBOX_WEBHOOK_SECRET` | Segredo do webhook do site |
| `SITE_URL` | Domínio de produção, sem barra no fim (`https://www.cliente.com.br`) |
| `OUTBOX_API_URL` | Só se a API não for `https://cms.outboxgroup.com.br/api/v1` |

Sem as variáveis, o site funciona: o blog aparece vazio e o build passa.

## Publicar no Easypanel

1. Crie um App a partir do repositório (build pelo `Dockerfile`).
2. Em **Environment**, preencha as 3 variáveis acima.
3. Em **Domains**, aponte o domínio do cliente para a **porta 3000**.
4. O healthcheck usa `/api/health`.
5. No OutBox CMS, na página do site: plataforma **API**, URL do site igual ao domínio, caminho do blog `/blog` e **URL do webhook** `https://<domínio>/api/outbox/revalidate`. Use o botão de teste do webhook: a resposta deve ser `Webhook recebido. A assinatura confere.`

## Como o conteúdo chega ao site

- `src/lib/outbox.ts` busca a API com cache marcado (`outbox-posts`) e revalidação de 5 minutos.
- Ao publicar, atualizar ou despublicar no CMS, o webhook (`POST /api/outbox/revalidate`) confere a assinatura HMAC (`X-OutBox-Signature: sha256=...`) e limpa o cache do blog, do artigo, da Home, do sitemap, do RSS e do llms.txt.
- Se a API estiver fora do ar, as páginas mostram o estado vazio em vez de quebrar.

## O que já vem pronto para SEO e GEO

- Artigo com resposta rápida, pontos principais, índice, FAQ, fontes, autor com credenciais, datas de publicação e atualização, trilha de navegação e artigos relacionados.
- Metadados completos (title, description, canonical, Open Graph, Twitter, datas do artigo) e JSON-LD do CMS, mais Organization/LocalBusiness e WebSite no site todo.
- `/sitemap.xml`, `/robots.txt` (libera os robôs de IA), `/llms.txt`, `/llms-full.txt`, `/feed.xml` e o arquivo de verificação do IndexNow (`/<chave>.txt`, respondido com a chave do CMS).
- Robôs de IA recebem o HTML completo, com os metadados no `<head>` (`htmlLimitedBots` no `next.config.ts`).

## Estrutura

```
src/site.config.ts          identidade do cliente (o único arquivo a editar)
src/lib/outbox.ts           cliente da Content API (server-only)
src/app/page.tsx            Home
src/app/{sobre,servicos,contato}/page.tsx
src/app/blog/page.tsx       lista, categorias, busca e paginação
src/app/blog/[slug]/page.tsx artigo
src/app/api/outbox/revalidate/route.ts  webhook do CMS
src/app/{sitemap,robots}.ts, llms.txt, llms-full.txt, feed.xml, og.png
```

## Comandos

```bash
npm run dev     # desenvolvimento
npm run lint
npm run build   # produção (output standalone)
npm start
```
