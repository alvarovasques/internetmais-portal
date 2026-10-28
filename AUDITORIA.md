# Auditoria de design, UX e usabilidade

Feita em 28/10/2026, antes de publicar o carrossel novo do hero. Três frentes
de leitura de código (acessibilidade, UX/texto, direção de arte) e uma de
medição no navegador, em 8 páginas, a 1440x900.

A medição não confia no CSS: ela apaga o texto, fotografa a página e lê o
pixel realmente pintado atrás de cada frase. É o que separa defeito de
artefato — a primeira rodada acusou 106 problemas na home e metade era erro
do meu medidor lendo `oklab()` como RGB.

**Resultado: 113 reprovações reais de contraste.** Abaixo, tudo em ordem de
gravidade, com o que já foi corrigido e o que depende de decisão.

---

## Parte 1 — Defeitos. Coisas quebradas, não questão de gosto

### 1.1 Trinta nomes de aplicativo invisíveis na home

`client/src/components/Aplicativos.tsx:97` e `:125`

```tsx
<p className="text-black font-semibold text-xs text-center">{app.name}</p>
```

Texto preto sobre o navy `#0A1730` da seção: **1,18:1**. O mínimo é 4,5. São
os 19 apps Standard e os 8 Premium, mais os inclusos: **30 nomes que o
visitante não lê**. A seção existe para mostrar quais apps vêm no plano, e é
exatamente essa informação que some.

Provavelmente sobrou de quando a seção tinha fundo claro.

### 1.2 Zoom por pinça bloqueado no HTML de origem

`client/index.html:14` — `maximum-scale=1`.

No ar isso não acontece: o `scripts/gerar-heads.py:286` reescreve a linha nas
52 rotas geradas. Então o site publicado está correto e **o defeito está só na
fonte** — mas é uma armadilha: quem servir o `index.html` sem passar pelo
gerador publica um site onde quem tem baixa visão não consegue ampliar.

### 1.3 O FAQ da home está com a paleta trocada

`client/src/components/FAQ.tsx:95` declara fundo claro
(`bg-gradient-to-b from-white to-gray-50`) e usa dentro a escada de cinzas do
modo escuro. Medido:

| Elemento | Contraste |
|---|---|
| `<h2>` "Perguntas Frequentes" | **1,15:1** |
| subtítulo | 2,55:1 |
| abas não selecionadas ("Instalação", "Suporte Técnico") | 1,46:1 |
| "Não encontrou sua dúvida?" | 2,48:1 |

O título da seção de perguntas frequentes é praticamente invisível. É merge
pela metade: os cartões do acordeão foram migrados para escuro e a seção
ficou clara.

### 1.4 O cartão 5G em destaque é claro e o texto dentro é do modo escuro

`client/src/components/Planos5G.tsx:103` deixa o cartão popular com fundo
branco, mas as linhas 121 e 129 aplicam `#93A69B` e `#CBD8CE` sem condicional.
Resultado no cartão de 5GB, que é o que tem o selo "TOP": "por mês" a 2,46:1,
"5GB + 3GB (portabilidade)", "1000 min de voz" e "100 SMS" a 1,42:1, e o
preço "R$ 49,99" em verde sobre branco a 1,81:1.

O `MaisGloboPlay.tsx:212` faz o condicional certo. A lógica existe no projeto,
só não foi aplicada aqui.

### 1.5 Texto branco sobre verde, 11 vezes — o erro que a direção de arte nomeia

A direção "Fibra viva" diz, em letras: *texto sobre o verde é `#08240A`, nunca
branco; branco sobre `#3DD93D` reprova em contraste e é o erro mais comum da
identidade antiga.* Medido: **1,88:1**.

Onde: `Empresarial.tsx:107`, `Planos5G.tsx:154-155`, `ProvaSocial.tsx:45,48`,
`Aplicativos.tsx:178`, `FAQ.tsx:116`, `BannerCTAFinal.tsx:15,22`,
`Vagas.tsx:266,303,431`.

A raiz não está nos componentes: `index.css:53` define
`--primary-foreground: #ffffff` sobre `--primary` verde. **Todo `<Button>` do
projeto nasce branco sobre verde.** Corrigir o token resolve de uma vez os que
ninguém listou.

Espelho do mesmo erro: `.btn-white` (`index.css:199`) e
`BannerCTAFinal.tsx:41` fazem verde sobre branco, também 1,88:1.

### 1.6 Botão do WhatsApp: branco sobre #25D366, em todas as páginas

**1,98:1**, 11 ocorrências, incluindo o botão do cabeçalho que aparece em
todo o site. O verde do WhatsApp tem razão de ser (reconhecimento de canal),
mas branco em cima dele não passa. Texto escuro resolve sem perder o
reconhecimento.

### 1.7 Quatro páginas sem `<main>` e nenhuma com "pular para o conteúdo"

Sem `<main>`: `BairroPage.tsx` (são 39 páginas de bairro, a maior porta de
entrada orgânica do site), `Vagas.tsx`, `MaisTV.tsx` e `MaisGloboPlay.tsx`.
Confirmado na medição: `main: 0` nessas rotas.

E não existe link de salto em lugar nenhum. Com um cabeçalho de logo + 6 itens
+ 2 botões, quem usa teclado passa por cerca de 10 paradas antes do conteúdo,
em toda navegação.

### 1.8 O menu do desktop só abre no hover

`client/src/components/Header.tsx:217-258`. Os submenus aparecem por
`group-hover`, sem `group-focus-within`, sem estado, e os três botões-pai
("Residencial", "Telefonia", "Aplicativos") não têm handler nenhum: clicar não
faz nada.

Consequências: quem navega por teclado **não alcança** Nossas Lojas, Internet
nos Bairros, Mais Velocidade, Mais Aplicativos, Mais GloboPlay, Chip 5G,
Telefonia Fixa nem MaisTV. E o breakpoint é `md:` (768px), então um tablet em
paisagem recebe o menu de desktop sem ter hover: ali os três grupos de produto
ficam inoperáveis para todo mundo.

O `aria-haspopup="true"` anuncia que existe submenu e não entrega nada.

### 1.9 O acordeão de FAQ da página do GloboPlay é um `<div onClick>`

`client/src/pages/MaisGloboPlay.tsx:123`. Sem `role`, sem `tabIndex`, sem
tecla, sem `aria-expanded`. Quem usa teclado ou leitor de tela não abre
nenhuma das perguntas — e as perguntas são sobre preço, cobrança e
cancelamento.

### 1.10 Nenhum acordeão, aba ou filtro do site informa o próprio estado

`FAQ.tsx:106-125` e `137-150`, `MaisTV.tsx:356-366` e `593-600`,
`Aplicativos.tsx:85` e `113`. A seleção existe só como cor de fundo. Quem não
enxerga a cor aperta o botão, nada muda no que ouve, e aperta de novo achando
que não funcionou.

### 1.11 Alvos de toque menores que 24px

Medido em todas as páginas: os links de submenu têm 23px de altura, as
migalhas de pão ("Início", "Bairros", "Lojas") têm 20px, e o telefone e o
e-mail da página de loja têm 21px. O mínimo da norma é 24px.

### 1.12 `prefers-reduced-motion` é respeitado no JavaScript e ignorado no CSS

`index.css` não tem nenhum bloco `@media (prefers-reduced-motion)`. As
animações de entrada estão em praticamente toda seção da home, e
`.animate-float`, `.animate-glow-pulse`, `.animate-pulse-badge` e
`.animate-wave-5g` são infinitas.

**Cuidado na correção:** nove seções começam com `opacity-0` e só ficam
visíveis porque a animação termina em `opacity: 1`. Um `animation: none`
geral apagaria metade da home. O jeito seguro é encurtar a duração, não
desligar.

### 1.13 Âncoras param debaixo do cabeçalho fixo

O cabeçalho é `sticky` com 104px no celular e 120px no desktop, e não existe
`scroll-padding-top`. Todo link para `#mais-velocidade`, `#chip-5g`,
`#empresarial` rola a seção até o topo da janela e o cabeçalho tapa o título
dela.

### 1.14 O preço antigo é comunicado só pelo risco visual

`MaisVelocidade.tsx:120`, `MaisAplicativos.tsx:166`, `MaisGloboPlay.tsx:202`.
O `line-through` é só CSS: o leitor de tela lê "R$ 119,90" e depois
"R$ 99,90" em sequência, sem pista de qual é qual. Num site de venda, isso
vira reclamação de contrato.

### 1.15 Contrastes menores, mas reais

| Onde | Contraste |
|---|---|
| Selo "TOP" do 5G, `#E8F1E9` sobre dourado | 1,41:1 |
| Tarja "-R$ 20" nos cartões de plano | 2,78:1 |
| "Falar com Atendente →", azul sobre navy | 2,62:1 |
| MaisTV: "*Grade sujeita a alterações" | 2,64:1 |
| MaisTV: números "01/02/03" das etapas | 1,52:1 |
| MaisTV: "Android & iOS", "Principais marcas" (7×) | 3,13:1 |
| "🎬 INCLUSO" nos cartões GloboPlay | 3,72:1 |
| "A votação acontece no site da CDL" (bloco novo, meu) | 4,47:1 |

---

## Parte 2 — Erros de conteúdo. Dependem de confirmação da operação

Não mexi em nenhum destes: são afirmações sobre o produto, e quem sabe a
resposta é a operação, não eu.

### 2.1 A página `/maisgloboplay` é uma campanha vencida ainda no ar

`pages/MaisGloboPlay.tsx` é uma landing da promoção "Telecine no Precinho",
com prazo escrito: *"Promoção de 01/08 a 31/08/2026"*, *"Sinal Aberto de 21 a
27/jul"*, preço *"R$ 9,90/mês"*. Hoje é 28/10.

A flag `PROMOCAO_ATIVA` existe e funciona, mas só esconde a barra de urgência
e o contador. Headline, preço, prazo, FAQ, os quatro CTAs e a mensagem
pré-escrita do WhatsApp continuam no ar. **Cada clique abre o WhatsApp com o
cliente já afirmando um preço que a operação não pode honrar**, e o atendente
começa a conversa negando.

### 2.2 As 39 páginas de bairro prometem "até 1Gbps"

`data/bairros.json`: os 39 bairros têm a mesma descrição, com *"velocidades de
até 1Gbps"*. O catálogo real é 400/600/800 Mega. Não existe 1 Gbps em lugar
nenhum do site.

Na mesma página, dois preços de entrada: o corpo diz "R$ 89,90", o FAQ logo
abaixo diz "a partir de R$ 99,90".

### 2.3 Subir de plano parece fazer o cliente perder a TV

`MaisAplicativos.tsx:73,83,93` é a única das três famílias que **não lista**
MaisTV, Ubook nem Kaspersky. Lido na coluna: pague R$ 20 a mais que o Mais
Velocidade e perca a TV, o audiolivro e o antivírus. Como a MaisTV é anunciada
como inclusa em todos os planos, é quase certo que seja omissão de
preenchimento — mas quem compara não tem como saber.

### 2.4 O FAQ contradiz a página em dois pontos

- `FAQ.tsx:35` diz que o plano Mais Aplicativos inclui **GloboPlay**. O
  GloboPlay é o diferencial exclusivo da família Mais GloboPlay, que custa
  R$ 20 a mais. Quem lê o FAQ contrata o mais barato esperando GloboPlay.
- `FAQ.tsx:29` diz que o desconto de pontualidade vale só para Mais Velocidade
  e Mais Aplicativos, mas os três cartões do Mais GloboPlay exibem a tarja
  "-R$ 20". Um dos dois está mentindo sobre R$ 20 por mês.

### 2.5 Instalação: o cartão afirma e o FAQ desmente

Os nove cartões dizem "Instalação grátis*" e o rodapé "*Sem taxa de
instalação. Consulte condições." O FAQ responde: *"Oferecemos promoções
frequentes com instalação gratuita... para saber se você está elegível."*
Dois textos oficiais discordando sobre o item que mais pesa na decisão.

### 2.6 Fidelidade: a palavra não aparece uma vez no funil residencial

O único lugar do site que toca no assunto é a tabela comparativa da MaisTV:
*"Sem fidelização com multa abusiva"* — frase que **afirma que existe
fidelização**. O FAQ tem 11 perguntas e nenhuma sobre prazo de contrato ou
multa de cancelamento, que é a dúvida número 1 de quem contrata internet.

### 2.7 Números que se contradizem entre páginas

| Onde | Diz |
|---|---|
| `Vagas.tsx:143` | "10k+ clientes" |
| `ProvaSocial`, `HeroSection`, `index.html` | "+20 mil clientes" |
| `BairrosPage:268` | "+39 bairros" |
| `ProvaSocial`, `BairroPage`, `NotFound` | "39 bairros" |
| `Vagas.tsx:142` | "39+" |
| `Footer.tsx:154` | "© 2026" fixo no código |

### 2.8 Unidade errada e nome de produto inconsistente

`Aplicativos.tsx:18-51` usa `'400MB', '600MB', '800MB'`, e isso aparece nos
títulos visíveis. 400 MB é tamanho de arquivo, não velocidade; o resto do site
diz "400 Mega".

E a marca tem duas grafias: **67 ocorrências de "InternetMais"** contra 66 de
"Internet Mais", misturadas no mesmo arquivo. A ficha do Google Meu Negócio
diz "Internet Mais" — e `data/lojas.ts` documenta o cuidado tomado para o site
casar com a ficha. A grafia colada enfraquece exatamente esse casamento.

Os planos também têm dois nomes cada: o menu diz "Mais Velocidade", a mensagem
do WhatsApp e o dataLayer dizem "Internet + Velocidade".

### 2.9 CTAs que prometem uma coisa e entregam outra

- Slide 3 do hero: "Ver Aplicativos" abre o WhatsApp. O visitante quer ver a
  lista e sai do site para uma conversa.
- Slide 2: "Conhecer Planos" também abre o WhatsApp.
- Slide 1: "Ver Planos" leva para `#chip-5g`, a seção de celular, e não para
  os planos de fibra.
- `AreaAssinante.tsx:99,116`: "Abrir Chamado Técnico" e "Falar com Atendente"
  levam os dois para a mesma tela de login. Nenhuma das duas faz o que diz, e
  quem está sem internet não lembra a senha.
- `Aplicativos.tsx:181`: clicando em Disney+, o botão lê "Assine Agora -
  Disney+", o que cria expectativa de preço de app para um produto de
  R$ 129,90.

### 2.10 Superlativos que o concorrente usa contra

`Planos5G.tsx:179`: *"velocidade mais rápida do mercado"*, sobre um MVNO.
`Diferenciais.tsx:15`: *"Sem quedas, sem oscilação"* — promessa absoluta que a
primeira queda desmente.

---

## Parte 3 — Decisões de direção, para o dono

### 3.1 O conflito de fundo: a direção de arte descreve um site claro, e o site é escuro

A "Fibra viva" especifica cinza secundário `#5F6B85` e proíbe `#96A0B8` sobre
branco — tokens de **modo claro**. O site implementado é escuro
(`#04060A` de documento, palco navy) e inventou a própria escada de cinzas:
`#E8F1E9` → `#CBD8CE` → `#93A69B`, usada com consistência real em mais de 150
lugares, com contraste bom sobre navy.

Enquanto os dois coexistirem, seções vão continuar ficando pela metade, como o
FAQ. Ou o documento ganha uma seção de modo escuro, ou o site volta ao claro.
**Minha recomendação: documentar o escuro.** Ele está implementado, funciona e
é mais bonito; o documento é que está desatualizado.

### 3.2 A tipografia da direção nunca foi implementada

O projeto carrega **só Poppins**. Outfit e Public Sans não existem em nenhum
arquivo. `font-black` (peso 900) aparece em 94 lugares, e a direção pede
600/700/800. O `letter-spacing: -0.02em` dos títulos não existe.

Trocar é mecânico, mas muda a cara do site inteiro. Decisão sua.

### 3.3 Treze azuis-escuros onde a paleta tem um

`#0A1730` (46 usos) é o navy de fato; `#0D1B3E`, o da marca, aparece 15 vezes.
Mais `#060E1E`, `#060D1A`, `#04060A`, `#070E22`, `#0B1730`, `#0B1537`,
`#0A1628`, `#0D1B2E`, `#03060C`, `#1A2D5A`, `#0D2E5E`.

Um site escuro precisa de 3 ou 4 degraus de profundidade. Treze é escolha
caso a caso. Vale declarar uma escada e mapear.

### 3.4 Verde como fundo de área grande, em cinco lugares

A direção diz "nunca fundo de área grande". Hoje: `ProvaSocial.tsx:43` (seção
inteira), `MaisTV.tsx:326` (faixa), `Empresarial.tsx:28`, `Planos5G.tsx:66` e
`BannerCTAFinal` (gradientes cobrindo seções).

### 3.5 Sete slides no hero é muito

49 segundos para ver tudo, e os slides 4 e 6 vendem o mesmo produto (chip 5G)
com badges diferentes. Quem chega procurando preço de fibra tem 1 em 7 de
chance de ver o slide que fala com ele. Sugestão: fundir 4 e 6, cortar o 2, e
ficar com quatro.

### 3.6 Nove seções da home dependem de JavaScript para existir

Planos5G, Empresarial, TelefoniaFixa, Diferenciais, AreaAssinante, Lojas,
ProvaSocial, BannerCTAFinal e PremioCDL começam em `opacity-0` e só aparecem
quando o IntersectionObserver dispara. Se o observer falhar, a home perde a
tabela de chip 5G, o empresarial inteiro e o CTA final. É ponto único de falha
sobre a maior parte do que vende.

### 3.7 Falta o que um provedor licenciado precisa ter no rodapé

Não encontrei em lugar nenhum do site: CNPJ, razão social, link para o
contrato de prestação de serviço, política de privacidade / LGPD, canal de
ouvidoria e o número da Anatel (1331). Para um grupo com autorizações SMP e
M2M, isso é obrigação regulatória.

### 3.8 As 39 páginas de bairro são a mesma página 39 vezes

O único conteúdo específico é o nome: descrição idêntica, FAQ idêntico,
palavras-chave idênticas. Os cartões de bairro ainda exibem as keywords de SEO
como etiquetas visíveis ("internet fibra aero rancho"), que para o morador não
dizem nada e para um avaliador parecem spam.

O que falta e importa: **quais ruas já têm fibra**, qual loja é a mais
próxima (as coordenadas já estão em `lojas.ts`), e prazo de instalação na
região.

### 3.9 A busca de bairros não tem estado vazio

`BairrosPage.tsx:284`: se nada casa, a grade some e nada é dito. É justamente
o momento em que a venda pode ser salva, e é o momento de maior silêncio do
site.

### 3.10 O "Mapa Interativo" não é interativo e mostra lojas, não cobertura

`BairrosPage.tsx:233`, numa página chamada "Internet Fibra nos Bairros".
`mapMode` é fixo em `'stores'`, `toggleMapMode` tem corpo vazio e a
ramificação `'neighborhoods'` é um no-op.

---

## O que está bom e não deve ser mexido

- As quatro páginas de loja e o `data/lojas.ts`: fonte única, conferida contra
  o Google Meu Negócio, com `<dl>` semântico, "o que resolve", "leve um
  documento". É o melhor trabalho do site.
- A 404, depois de reescrita: em português, com três saídas reais.
- O fallback do mapa, que lista os quatro endereços quando os tiles falham.
- O `ProvaSocial`, que trocou depoimento inventado por fato verificável.
- Os estados de carregamento e vazio da página de vagas.
- A nota de rodapé dos apps ilimitados do 5G: o único asterisco do site
  explicado dentro da mesma caixa que o usa.
- A escada de três sombras, deliberada e aplicada em 47 lugares.
- O ritmo vertical da home: 12 seções em `py-20 md:py-32`.
- As migalhas de pão de `LojaPage` e `BairroPage`, com `aria-current`.
- O `Palco`, o componente mais elaborado e o mais fiel à paleta.
