#!/usr/bin/env python3
"""
Gera o sitemap a partir das rotas reais e do bairros.json.

Escrito à mão o sitemap sai de sincronia com o site na primeira mudança de
rota, e foi o que aconteceu: ele listava /blog, que não existe, e três âncoras
que também não existiam, enquanto /vagas e /maisgloboplay ficavam de fora.

Âncoras não entram: buscadores descartam o fragmento e tratam
"/#chip-5g" como "/", então listá-las só duplica a home.

Uso:  python3 scripts/gerar-sitemap.py
"""

from __future__ import annotations
import json
import re
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SITE = "https://internetmais.net"
HOJE = date.today().isoformat()

# Rotas que não devem ser indexadas, com o motivo.
NAO_INDEXAR = {
    "/admin/entrar": "área interna",
    "/404": "página de erro",
    # Landing de campanha que será refeita e hoje ainda traz o texto de agosto.
    # Enquanto não for reescrita, não deve ser indexada nem linkada.
    "/maisgloboplay": "landing a ser refeita",
}

PRIORIDADES = {
    "/": ("weekly", "1.0"),
    "/maistv": ("weekly", "0.9"),
    "/bairros": ("monthly", "0.8"),
    "/sobre-nos": ("monthly", "0.8"),
    "/vagas": ("weekly", "0.7"),
}
PADRAO = ("monthly", "0.6")


def rotas() -> list[str]:
    app = (RAIZ / "client/src/App.tsx").read_text(encoding="utf-8")
    achadas = re.findall(r'<Route\s+path="([^"]+)"', app)
    return [r for r in achadas if ":" not in r and r not in NAO_INDEXAR]


def bairros() -> list[str]:
    d = json.loads((RAIZ / "client/src/data/bairros.json").read_text(encoding="utf-8"))
    return sorted(v["slug"] for v in d.values())


def url(caminho: str, freq: str, prio: str, imagem: tuple[str, str] | None = None) -> str:
    linhas = [
        "  <url>",
        f"    <loc>{SITE}{caminho}</loc>",
        f"    <lastmod>{HOJE}</lastmod>",
        f"    <changefreq>{freq}</changefreq>",
        f"    <priority>{prio}</priority>",
    ]
    if imagem:
        linhas += [
            "    <image:image>",
            f"      <image:loc>{SITE}{imagem[0]}</image:loc>",
            f"      <image:title>{imagem[1]}</image:title>",
            "    </image:image>",
        ]
    linhas.append("  </url>")
    return "\n".join(linhas)


def main() -> None:
    partes = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        "  <!-- Gerado por scripts/gerar-sitemap.py. Não editar à mão. -->",
        "  <!-- Páginas -->",
    ]

    for r in rotas():
        freq, prio = PRIORIDADES.get(r, PADRAO)
        img = (
            ("/images/bg/hero-person-smartphone.webp", "Fibra Óptica + Chip 5G Internet Mais")
            if r == "/"
            else None
        )
        partes.append(url(r, freq, prio, img))

    partes.append("  <!-- Bairros atendidos -->")
    for s in bairros():
        partes.append(url(f"/bairro/{s}", "monthly", "0.5"))

    partes.append("</urlset>")
    saida = "\n".join(partes) + "\n"
    destino = RAIZ / "client/public/sitemap.xml"
    destino.write_text(saida, encoding="utf-8")

    total = saida.count("<loc>")
    print(f"sitemap.xml: {total} URLs ({len(rotas())} páginas + {len(bairros())} bairros)")
    for r, motivo in NAO_INDEXAR.items():
        print(f"  fora do índice: {r} ({motivo})")


if __name__ == "__main__":
    main()
