# Briefing das 16 imagens — Internet Mais

Direção de arte "Fibra viva". Regras que valem para todas, e que estão embutidas
em cada prompt:

- Gente e cenários que pareçam de Campo Grande, não de banco de imagem americano.
- Luz natural, de janela ou de fim de tarde. O navy entra no layout, não na foto.
- Nada de neon, HUD futurista, sobreposição de circuitos ou brilho azul.
- Cada hero é enquadrado com uma área calma de um dos lados, onde o título entra.
  Se o título não couber, a imagem está errada.
- Sem texto dentro da imagem: toda tipografia é feita no site.

O bloco `Negative` vale para todas: `text, watermark, logo, letters, numbers, UI overlay, neon glow, circuit board overlay, holographic HUD, teal and orange grade, plastic skin, extra fingers, distorted hands, stock photo smile, corporate handshake`.

---

## Home

### 1. `bg/hero-person-smartphone.webp` — 1920×1080

Hero principal da home. Área calma à esquerda para o título de três linhas.

> A Brazilian family of three in the living room of an ordinary middle-class
> house in Campo Grande, late afternoon window light, warm and soft. The mother
> is on the sofa with a smartphone, a teenager watches something on the TV in
> the background, a younger child uses a tablet on the floor. Everyone relaxed,
> nobody posing for the camera. Simple furniture, a ceiling fan, plants near the
> window. Shot at 35mm, natural depth of field, people on the right two thirds
> of the frame, the left third calm and uncluttered. Documentary photography,
> realistic skin texture.

### 2. `marca/og-image.png` — 1200×630

Imagem de compartilhamento no WhatsApp e nas redes. Composição mais gráfica que
fotográfica, porque aparece pequena.

> Wide horizontal composition. On the left, a deep navy field with generous
> empty space. On the right, a warmly lit Brazilian living room at dusk, seen
> slightly out of focus, with a person holding a phone. The two halves meet in a
> clean vertical division, no gradient blend. Cinematic but restrained, no glow.

---

## Carrossel da home

Quatro quadros, mesma linguagem, mesma altura de horizonte. Área calma à
esquerda em todos.

### 3. `bg/carousel-velocidade.webp` — 1920×1080

> A young Brazilian man in a home office corner of an apartment, mid videocall,
> laughing at something on the screen. Two monitors, a mug, papers, an ordinary
> chair. Daylight from a window on the left. Documentary framing, subject on the
> right side of the frame.

### 4. `bg/carousel-aplicativos.webp` — 1920×1080

> A Brazilian couple in their forties on a sofa at night, watching a film on a
> large TV, the room lit only by the screen and one warm lamp. Popcorn bowl
> between them. The TV screen is out of frame or blurred, no interface visible.
> Subject on the right, dark calm space on the left.

### 5. `bg/carousel-5g.webp` — 1920×1080

> A Brazilian woman in her thirties walking on a tree-lined street of a
> residential neighborhood, looking at her phone, unhurried. Late afternoon sun
> through the trees. Real Brazilian street: low houses, a wall, a motorbike
> parked. Subject on the right third, street receding to the left.

### 6. `bg/carousel-empresarial.webp` — 1920×1080

> Interior of a small Brazilian business, a clinic reception or a neighborhood
> store, two employees working, one at a computer. Daylight, practical
> furniture, nothing corporate or glassy. Wide framing with calm wall space on
> the left.

---

## MaisTV

### 7. `bg/maistv-hero-bg.jpg` — 1920×1080

> A living room at night seen from behind the sofa, a large TV glowing on the
> far wall, silhouettes of two people watching. The screen content is soft and
> indistinct, no channel logos, no interface. Warm lamp on one side. Deep
> shadows, cinematic, calm space on the left for a headline.

### 8. `bg/maistv-channels-bg.webp` — 1920×1080

Fundo da grade de canais, entra atrás dos logos, então precisa ser quase liso.

> Very dark navy blue background with a subtle soft light falloff from the top
> right, like a screen glow in a dark room. Almost flat, no objects, no people,
> no pattern. Extremely low contrast, meant to sit behind content.

### 9. `bg/maistv-hero-netflix.webp` — 1920×1080

> Close framing of a person's hands holding a TV remote, pointing away from
> camera towards a glowing screen out of focus in the background. Night, warm
> lamp light. Shallow depth of field, hands in the lower right, dark calm area
> in the upper left.

---

## Velocidade e 5G

### 10. `bg/mais-velocidade-hero.webp` — 1920×1080

> A Brazilian teenager playing a video game in a bedroom, headset on,
> concentrated, lit by the monitor and one lamp. Ordinary bedroom, posters,
> unmade bed. Not an esports setup, not RGB lighting. Subject on the right,
> dark calm space on the left.

### 11. `bg/young-urban-5g.webp` — 1920×1080

> Two young Brazilians sitting on the steps in front of a house, sharing
> something on a phone screen, laughing. Golden hour, residential street of
> Campo Grande. Warm, informal, real clothing. Subjects on the right, street on
> the left.

### 12. `bg/chip-5g-mockup.webp` — 1200×1200

Quadrado, produto. É o único que não tem gente.

> Product photograph of a SIM card and a modern smartphone lying on a light warm
> wooden surface, seen slightly from above. Soft natural window light from the
> left, gentle shadows. The SIM card is plain, no branding visible. Clean and
> minimal, generous empty space around the objects.

---

## Aplicativos e empresarial

### 13. `bg/mais-aplicativos-bg.webp` — 1920×1080

Fundo atrás da grade de aplicativos: precisa ser calmo o suficiente para os
logos aparecerem por cima.

> Soft out of focus interior of a Brazilian living room at dusk, warm bokeh from
> a lamp and a TV, no recognizable objects. Very shallow depth of field, low
> contrast, muted colors. Meant to sit behind content, nothing should compete
> for attention.

### 14. `bg/office-modern.webp` — 1920×1080

> Interior of a small commercial office in a Brazilian city, four or five people
> working at desks, daylight through venetian blinds. Practical, slightly
> cluttered, real: paper on desks, a water bottle, a wall calendar. Not a
> startup, not a glass tower. Wide framing with calm space on the right.

---

## Trabalhe conosco

### 15. `bg/vagas-hero.webp` — 1920×1080

> Two Internet Mais field technicians in work uniform on a residential street,
> one at the top of a ladder near a utility pole, the other steadying it and
> looking up. Bright morning light, blue sky, low houses. Real work, no posing.
> Wide framing, subjects on the right, sky and street on the left.

### 16. `bg/vagas-benefits.webp` — 1920×1080

> A small team of Brazilian coworkers around a table in a simple office kitchen,
> mid conversation over coffee, relaxed, mixed ages. Daylight, ordinary mugs,
> nobody posing. Documentary framing with calm wall space on the left.

---

## Gerando pelo script

`scripts/gerar-imagens.py` roda os 16 prompts no Nano Banana (Gemini image) e
grava cada arquivo já no caminho e no formato que o site espera. Os prompts
deste documento e os do script são os mesmos.

```bash
# a chave fica no .env da raiz, que está no .gitignore
echo 'GEMINI_API_KEY=sua-chave' >> .env

python3 scripts/gerar-imagens.py --listar          # ver os slugs
python3 scripts/gerar-imagens.py                   # gera o que falta
python3 scripts/gerar-imagens.py --somente vagas-hero --forcar   # refaz uma
```

O script recorta no centro para a proporção exata antes de redimensionar, então
não distorce se a API devolver outra razão. Ele pula o que já existe com mais de
60 KB, o que na prática significa pular o que já foi gerado e refazer os
placeholders.

Gerar não é aprovar: olhe cada uma. Regenerar uma imagem custa centavos, e a
mesma foto ruim fica anos no site.

## Depois de gerar

1. Salve cada arquivo com o nome e o caminho exatos da lista, em
   `client/public/images/`. Nenhum código precisa mudar.
2. Formato: `.webp` com qualidade 80 para todas, exceto `maistv-hero-bg.jpg` e
   `og-image.png`, que já estão nomeados no código com outra extensão.
3. Confira o peso: um hero de 1920×1080 em WebP deve ficar abaixo de 250 KB.
4. Abra cada página e veja se o título ainda respira sobre a imagem. Se o texto
   brigar com a foto, o problema é o enquadramento, não a opacidade da máscara.
