#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera um HTML por rota, com o <head> certo, depois do build do Vite.

O problema que isto resolve: o `client/index.html` traz um único
`<link rel="canonical" href="https://internetmais.net/">`, e o servidor devolve
esse mesmo arquivo para as 47 rotas. Na prática, cada página de bairro,
/maistv e /sobre-nos se declaravam cópia da home — pedindo ao Google para não
indexá-las. O mesmo valia para og:url, og:title e og:image: compartilhar um
bairro no WhatsApp mostrava a home.

O corpo continua sendo montado pelo React no navegador; o que muda é que cada
rota passa a ter title, description, canonical, Open Graph e o JSON-LD dela
já no HTML servido, que é o que buscador e robô de IA leem primeiro.

Roda depois do `vite build`, sobre `dist/public/`:
    npm run build && python3 scripts/gerar-heads.py

Escreve `dist/public/<rota>/index.html` para cada rota conhecida.
`server/core/static.ts` serve esses arquivos e devolve 404 de verdade no resto.
"""
from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / 'dist' / 'public'
SITE = 'https://internetmais.net'
OG = f'{SITE}/images/marca/og-image.png'

NOINDEX = {'/admin/entrar', '/404', '/maisgloboplay'}


# ─────────────────────────── textos por rota ───────────────────────────
FIXAS: dict[str, dict[str, str]] = {
    '/': {
        'titulo': 'Internet Mais — fibra óptica, chip 5G e internet empresarial em Campo Grande',
        'desc': 'Provedor de fibra óptica com rede própria em Campo Grande desde 2017. '
                'Planos residenciais a partir de R$ 89,90, internet empresarial, chip 5G e '
                'telefonia fixa. 39 bairros atendidos.',
    },
    '/sobre-nos': {
        'titulo': 'Sobre nós — Internet Mais, provedor de fibra em Campo Grande',
        'desc': 'Missão, visão e valores da Internet Mais, provedor com rede própria de fibra '
                'óptica em Campo Grande desde 2017, com quatro lojas na cidade.',
    },
    '/bairros': {
        'titulo': 'Internet de fibra nos bairros de Campo Grande — Internet Mais',
        'desc': 'Os 39 bairros de Campo Grande atendidos pela rede própria de fibra óptica da '
                'Internet Mais. Veja se o seu bairro já tem cobertura.',
    },
    '/maistv': {
        'titulo': 'MaisTV — mais de 160 canais ao vivo, incluso no plano | Internet Mais',
        'desc': 'MaisTV vem sem custo extra em qualquer plano residencial da Internet Mais: '
                'mais de 160 canais ao vivo e milhares de títulos, em até sete tipos de aparelho.',
    },
    '/vagas': {
        'titulo': 'Trabalhe na Internet Mais — vagas em Campo Grande',
        'desc': 'Vagas abertas na Internet Mais, provedor de fibra óptica de Campo Grande. '
                'Plano de saúde, internet inclusa e plano de carreira.',
    },
    '/maisgloboplay': {
        'titulo': 'Mais GloboPlay — Internet Mais',
        'desc': 'Internet de fibra com GloboPlay Premium incluso, em Campo Grande.',
    },
    '/admin/entrar': {'titulo': 'Entrar — Internet Mais', 'desc': 'Área interna.'},
    '/404': {'titulo': 'Página não encontrada — Internet Mais',
             'desc': 'A página que você procurou não existe neste site.'},
}


def artigo(nome: str) -> str:
    femininos = {'Vila Carvalho', 'Cophavila II', 'Vila Jacy', 'Moreninha', 'Vila Nasser',
                 'Nova Campo Grande', 'Popular', 'Vila Sobrinho'}
    return 'na' if nome in femininos else 'no'


def bairros() -> list[tuple[str, str]]:
    d = json.loads((RAIZ / 'client/src/data/bairros.json').read_text(encoding='utf-8'))
    return sorted(((nome, v['slug']) for nome, v in d.items()), key=lambda x: x[1])


def chave(s: str) -> str:
    """Os dois arquivos escrevem o mesmo bairro de formas diferentes:
    bairros.json diz "Vila Sobrinho" e "Centro Oeste", locations.json diz
    "Sobrinho" e "Centro-Oeste". Comparar sem acento, sem pontuação e sem os
    prefixos de logradouro evita perder o geo por diferença de grafia."""
    s = unicodedata.normalize('NFKD', s.lower())
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    return re.sub(r'^(vila|jardim|conjunto|parque|residencial) ', '', s)


def coordenadas() -> dict[str, dict]:
    d = json.loads((RAIZ / 'client/src/data/locations.json').read_text(encoding='utf-8'))
    return {chave(b['name']): b for b in d.get('bairros', []) if 'lat' in b}


# ─────────────────────────── JSON-LD por rota ───────────────────────────
def ld_organizacao() -> dict:
    return {
        '@context': 'https://schema.org', '@type': 'Organization',
        '@id': f'{SITE}/#organizacao', 'name': 'Internet Mais', 'url': SITE,
        'logo': f'{SITE}/images/marca/logo-internet-mais.png', 'foundingDate': '2017',
        'description': 'Provedor de internet de fibra óptica com rede própria em Campo Grande, '
                       'Mato Grosso do Sul.',
        'areaServed': {'@type': 'City', 'name': 'Campo Grande',
                       'containedInPlace': {'@type': 'State', 'name': 'Mato Grosso do Sul'}},
        'contactPoint': [{'@type': 'ContactPoint', 'telephone': '+556730272500',
                          'contactType': 'customer service', 'areaServed': 'BR',
                          'availableLanguage': 'pt-BR',
                          'email': 'atendimento@internetmais.net'}],
    }


def ld_trilha(passos: list[tuple[str, str]]) -> dict:
    return {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': f'{SITE}{u}'}
            for i, (n, u) in enumerate(passos)],
    }


def ld_bairro(nome: str, slug: str, geo: dict | None) -> dict:
    """Bairro é área de atendimento, não endereço comercial.

    Antes disto cada página de bairro declarava um `LocalBusiness`, o que afirma
    que existe um estabelecimento naquele bairro. Não existe: são quatro lojas.
    `Service` com `areaServed` diz a verdade — atendemos ali."""
    lugar: dict = {'@type': 'Place', 'name': nome,
                   'containedInPlace': {'@type': 'City', 'name': 'Campo Grande',
                                        'containedInPlace': {'@type': 'State',
                                                             'name': 'Mato Grosso do Sul'}}}
    if geo:
        lugar['geo'] = {'@type': 'GeoCoordinates',
                        'latitude': geo['lat'], 'longitude': geo['lng']}
    return {
        '@context': 'https://schema.org', '@type': 'Service',
        'serviceType': 'Internet de fibra óptica',
        'name': f'Internet de fibra óptica {artigo(nome)} {nome}, Campo Grande',
        'provider': {'@id': f'{SITE}/#organizacao'},
        'areaServed': lugar,
        'url': f'{SITE}/bairro/{slug}',
        'hasOfferCatalog': {
            '@type': 'OfferCatalog', 'name': 'Planos residenciais', 'itemListElement': [
                {'@type': 'Offer', 'name': '400 Mega', 'price': '89.90', 'priceCurrency': 'BRL'},
                {'@type': 'Offer', 'name': '600 Mega', 'price': '99.90', 'priceCurrency': 'BRL'},
                {'@type': 'Offer', 'name': '800 Mega', 'price': '109.90', 'priceCurrency': 'BRL'},
            ]},
    }


# ─────────────────────────── montagem do head ───────────────────────────
def escapar(s: str) -> str:
    return (s.replace('&', '&amp;').replace('<', '&lt;')
             .replace('>', '&gt;').replace('"', '&quot;'))


def trocar_tag(html: str, padrao: str, novo: str) -> str:
    novo_html, n = re.subn(padrao, lambda _: novo, html, count=1, flags=re.I)
    if n == 0:                       # a tag não existia: entra logo depois do <head>
        novo_html = html.replace('<head>', '<head>\n    ' + novo, 1)
    return novo_html


def montar(base: str, rota: str, titulo: str, desc: str, blocos: list[dict]) -> str:
    url = SITE + ('/' if rota == '/' else rota)   # a home canoniza com a barra
    t, d = escapar(titulo), escapar(desc)
    h = base

    h = trocar_tag(h, r'<title>.*?</title>', f'<title>{t}</title>')
    h = trocar_tag(h, r'<meta\s+name="description"[^>]*/?>',
                   f'<meta name="description" content="{d}" />')
    h = trocar_tag(h, r'<link\s+rel="canonical"[^>]*/?>',
                   f'<link rel="canonical" href="{url}" />')
    h = trocar_tag(h, r'<meta\s+property="og:url"[^>]*/?>',
                   f'<meta property="og:url" content="{url}" />')
    h = trocar_tag(h, r'<meta\s+property="og:title"[^>]*/?>',
                   f'<meta property="og:title" content="{t}" />')
    h = trocar_tag(h, r'<meta\s+property="og:description"[^>]*/?>',
                   f'<meta property="og:description" content="{d}" />')
    h = trocar_tag(h, r'<meta\s+name="twitter:title"[^>]*/?>',
                   f'<meta name="twitter:title" content="{t}" />')
    h = trocar_tag(h, r'<meta\s+name="twitter:description"[^>]*/?>',
                   f'<meta name="twitter:description" content="{d}" />')

    robos = 'noindex, follow' if rota in NOINDEX else 'index, follow'
    h = trocar_tag(h, r'<meta\s+name="robots"[^>]*/?>',
                   f'<meta name="robots" content="{robos}" />')

    # Ruído: "keywords" não é usado por buscador desde sempre, e "revisit-after"
    # nunca existiu como diretiva. Saem para não passarem por sinal.
    h = re.sub(r'\s*<meta\s+name="keywords"[^>]*/?>', '', h, flags=re.I)
    h = re.sub(r'\s*<meta\s+name="revisit-after"[^>]*/?>', '', h, flags=re.I)
    # Impedir o leitor de ampliar a página é barreira de acessibilidade.
    h = h.replace('width=device-width, initial-scale=1.0, maximum-scale=1',
                  'width=device-width, initial-scale=1')

    # Fora da home, o JSON-LD da home não se aplica: ela declarava FAQ, planos e
    # as quatro lojas em toda rota. Cada página passa a levar só o que é dela.
    if rota != '/':
        h = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', h,
                   flags=re.S | re.I)
        marcado = '\n'.join(
            '    <script type="application/ld+json">' +
            json.dumps(b, ensure_ascii=False, separators=(',', ':')) + '</script>'
            for b in blocos)
        h = h.replace('</head>', marcado + '\n  </head>', 1)
    return h


def gravar(rota: str, html: str) -> Path:
    destino = SAIDA / 'index.html' if rota == '/' else SAIDA / rota.strip('/') / 'index.html'
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(html, encoding='utf-8')
    return destino


def main() -> int:
    base_arq = SAIDA / 'index.html'
    if not base_arq.exists():
        print(f'erro: {base_arq} não existe. Rode `npm run build` antes.', file=sys.stderr)
        return 1
    base = base_arq.read_text(encoding='utf-8')

    geo = coordenadas()
    org = ld_organizacao()
    feitos = 0

    for rota, txt in FIXAS.items():
        blocos = [org]
        if rota == '/bairros':
            blocos.append(ld_trilha([('Início', '/'), ('Bairros', '/bairros')]))
        elif rota == '/sobre-nos':
            blocos.append(ld_trilha([('Início', '/'), ('Sobre nós', '/sobre-nos')]))
        elif rota == '/maistv':
            blocos.append(ld_trilha([('Início', '/'), ('MaisTV', '/maistv')]))
        elif rota == '/vagas':
            blocos.append(ld_trilha([('Início', '/'), ('Trabalhe conosco', '/vagas')]))
        gravar(rota, montar(base, rota, txt['titulo'], txt['desc'], blocos))
        feitos += 1

    sem_geo = []
    for nome, slug in bairros():
        a = artigo(nome)
        titulo = f'Internet fibra óptica {a} {nome}, Campo Grande — Internet Mais'
        desc = (f'Internet de fibra óptica {a} {nome}, em Campo Grande, com rede própria da '
                f'Internet Mais. Planos residenciais a partir de R$ 89,90 por mês, com Wi-Fi '
                f'instalado sem custo. Confirme a cobertura do seu endereço.')
        g = geo.get(chave(nome))
        if not g:
            sem_geo.append(nome)
        blocos = [
            org,
            ld_bairro(nome, slug, g),
            ld_trilha([('Início', '/'), ('Bairros', '/bairros'),
                       (nome, f'/bairro/{slug}')]),
        ]
        gravar(f'/bairro/{slug}', montar(base, f'/bairro/{slug}', titulo, desc, blocos))
        feitos += 1

    print(f'{feitos} rotas geradas em {SAIDA}')
    if sem_geo:
        print('sem coordenada (schema sai sem geo, de propósito): ' + ', '.join(sem_geo))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
