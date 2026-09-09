# Imagens do portal

Os assets originais deste site ficavam num CDN do Manus (`d2xsxph8kpxj0f.cloudfront.net`) que hoje
responde `403 AccessDenied`. Todas as referências foram migradas para arquivos locais em
`client/public/images/`. Para substituir uma imagem, basta sobrescrever o arquivo mantendo o mesmo
nome e caminho: nenhum código precisa mudar. O repositório é a fonte da verdade, nada volta a ser
servido por CDN externo.

Todos os logos de app são PNG 400x400 sobre fundo branco, não transparente: nos cards de plano em
destaque o tile é `bg-white/10` sobre fundo escuro, e logo de texto preto ficaria ilegível ali.

## Recuperados do Internet Archive

Únicos dois assets arquivados antes do CDN cair (snapshot de 13/07/2026).

| Arquivo | Dimensão |
|---|---|
| `/images/marca/favicon.webp` | 1920x1920 |
| `/images/marca/logo-internet-mais.png` | 1920x1080 |

## Logos oficiais obtidos no PlayHub

Baixados de `playhub.net.br`, o fornecedor dos SVAs e canais.

| Arquivo | Dimensão |
|---|---|
| `/images/apps/curtaon.png` | 400x400 |
| `/images/apps/deezer.png` | 400x400 |
| `/images/apps/disney-plus.png` | 400x400 |
| `/images/apps/docway.png` | 400x400 |
| `/images/apps/estuda-mais.png` | 400x400 |
| `/images/apps/fluid.png` | 400x400 |
| `/images/apps/globoplay.png` | 400x400 |
| `/images/apps/hbo-max.png` | 400x400 |
| `/images/apps/hotgo.png` | 400x400 |
| `/images/apps/hub-vantagens.png` | 400x400 |
| `/images/apps/kaspersky-plus.png` | 400x400 |
| `/images/apps/kaspersky-standard.png` | 400x400 |
| `/images/apps/kaspersky.png` | 400x400 |
| `/images/apps/kiddle-pass.png` | 400x400 |
| `/images/apps/leitura-360.png` | 400x400 |
| `/images/apps/looke.png` | 400x400 |
| `/images/apps/o-jornalista.png` | 400x400 |
| `/images/apps/pequenos-leitores.png` | 400x400 |
| `/images/apps/playkids-plus.png` | 400x400 |
| `/images/apps/playlist.png` | 400x400 |
| `/images/apps/qnutri.png` | 400x400 |
| `/images/apps/queima-diaria.png` | 400x400 |
| `/images/apps/revistaria.png` | 400x400 |
| `/images/apps/sky-plus-light.png` | 400x400 |
| `/images/apps/smart-content.png` | 400x400 |
| `/images/apps/ubook-go.png` | 400x400 |
| `/images/apps/ubook-plus.png` | 400x400 |
| `/images/apps/zen.png` | 400x400 |

## Logos oficiais obtidos em outras fontes

Os três apps que não constam na página do PlayHub.

| Arquivo | Dimensão | Fonte |
|---|---|---|
| `/images/apps/ritual-fit.png` | 400x400 | Google Play (ícone oficial do app, 512x512) |
| `/images/apps/social-comics.png` | 400x400 | socialcomics.com.br (`/img/social-comics-logo.svg`) |
| `/images/apps/telecine.png` | 400x400 | Wikimedia Commons (`Rede Telecine vertical logo.svg`) |

## Ainda pendentes de substituição

Placeholders gerados em cores da marca com o texto IMAGEM PENDENTE.
A dimensão listada é a do placeholder e serve como referência de proporção.

### Marca

| Arquivo | Dimensão | Usado em |
|---|---|---|
| `/images/marca/og-image.png` | 1200x630 | `client/index.html`, `client/public/manifest.json` |

### Fundos, heros e carrosséis

| Arquivo | Dimensão | Usado em |
|---|---|---|
| `/images/bg/carousel-5g.webp` | 1920x1080 | `client/src/components/HeroSection.tsx` |
| `/images/bg/carousel-aplicativos.webp` | 1920x1080 | `client/src/components/HeroSection.tsx` |
| `/images/bg/carousel-empresarial.webp` | 1920x1080 | `client/src/components/HeroSection.tsx` |
| `/images/bg/carousel-velocidade.webp` | 1920x1080 | `client/src/components/HeroSection.tsx` |
| `/images/bg/chip-5g-mockup.webp` | 1200x1200 | `client/src/components/Bloco5G.tsx`, `client/src/components/HeroSection.tsx` |
| `/images/bg/hero-person-smartphone.webp` | 1920x1080 | `client/public/sitemap.xml`, `client/src/components/HeroSection.tsx` |
| `/images/bg/mais-aplicativos-bg.webp` | 1920x1080 | `client/src/components/MaisAplicativos.tsx` |
| `/images/bg/mais-velocidade-hero.webp` | 1920x1080 | `client/src/components/MaisVelocidade.tsx` |
| `/images/bg/maistv-channels-bg.webp` | 1920x1080 | `client/src/pages/MaisTV.tsx` |
| `/images/bg/maistv-hero-bg.jpg` | 1920x1080 | `client/src/components/HeroSection.tsx`, `client/src/pages/MaisTV.tsx` |
| `/images/bg/maistv-hero-netflix.webp` | 1920x1080 | `client/src/pages/MaisTV.tsx` |
| `/images/bg/office-modern.webp` | 1920x1080 | `client/src/components/Empresarial.tsx` |
| `/images/bg/vagas-benefits.webp` | 1920x1080 | `client/src/pages/Vagas.tsx` |
| `/images/bg/vagas-hero.webp` | 1920x1080 | `client/src/pages/Vagas.tsx` |
| `/images/bg/young-urban-5g.webp` | 1920x1080 | `client/src/components/Planos5G.tsx` |

## Prompts das que faltam

O arquivo `PROMPTS-IMAGENS.md`, na raiz, tem o prompt de cada uma das 16
imagens pendentes, com nome de arquivo, tamanho e a regra de arte que vale para
todas. Os mesmos prompts estão no artboard "Briefing das 16 imagens" do canvas
de design.

## Como substituir

1. Coloque o arquivo definitivo no mesmo caminho e com o mesmo nome do placeholder.
2. Prefira `.webp` para fotos e fundos; para logos de app, PNG 400x400 sobre fundo branco.
3. Rode `pnpm build` e confira a página correspondente.
