#!/usr/bin/env python3
"""
Atmosferas provisórias para os lugares onde ainda faltam as fotos.

Isto não substitui a fotografia do briefing: são fundos abstratos, sem gente e
sem cena, feitos para o site não ficar com placeholder escrito "IMAGEM
PENDENTE" enquanto a geração das 16 imagens não roda. Cada um respeita a área
calma que o layout daquela peça precisa, então quando as fotos chegarem elas
entram no mesmo lugar sem mexer em uma linha de código.

Uso:  python3 scripts/gerar-atmosferas.py
"""

from __future__ import annotations
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

BASE = Path(__file__).resolve().parent.parent / "client" / "public" / "images"

NAVY_FUNDO = np.array([7, 14, 34], dtype=np.float32)
NAVY_CLARO = np.array([16, 38, 82], dtype=np.float32)
AZUL_LUZ = np.array([26, 91, 166], dtype=np.float32)
VERDE = np.array([61, 217, 61], dtype=np.float32)


def atmosfera(
    largura: int,
    altura: int,
    foco: tuple[float, float],
    forca: float = 1.0,
    verde: float = 0.10,
    bandas: float = 0.5,
    grao: float = 2.4,
) -> Image.Image:
    """
    `foco` é onde a luz principal cai, em fração da imagem. É o oposto da área
    calma: o texto do layout vai para o lado escuro.
    """
    ys, xs = np.mgrid[0:altura, 0:largura].astype(np.float32)
    nx, ny = xs / largura, ys / altura

    # Base: navy que clareia de baixo para cima, bem de leve.
    t = (1.0 - ny) * 0.55
    img = NAVY_FUNDO[None, None, :] * (1 - t[..., None]) + NAVY_CLARO[None, None, :] * t[..., None]

    # Luz principal.
    fx, fy = foco
    proporcao = largura / altura
    d = np.sqrt(((nx - fx) * proporcao) ** 2 + (ny - fy) ** 2) / proporcao
    luz = np.exp(-(d**2) / (2 * 0.16**2)) * forca
    img += AZUL_LUZ[None, None, :] * luz[..., None] * 0.85

    # Um respiro de verde, a cor de ação da marca, longe do foco principal.
    d2 = np.sqrt(((nx - (1.0 - fx)) * proporcao) ** 2 + (ny - (1.0 - fy * 0.6)) ** 2) / proporcao
    img += VERDE[None, None, :] * np.exp(-(d2**2) / (2 * 0.22**2))[..., None] * verde

    # Bandas diagonais muito sutis: tiram o aspecto de degradê de gerador.
    if bandas:
        onda = np.sin((nx * 9.0 + ny * 5.0) * math.pi) * 0.5 + 0.5
        img += (onda[..., None] - 0.5) * 6.0 * bandas

    # Vinheta.
    dv = np.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2)
    img *= (1.0 - np.clip(dv - 0.34, 0, None) * 0.85)[..., None]

    # Granulação, para não ficar com o banding chapado do WebP em céu liso.
    ruido = np.random.default_rng(7).normal(0, grao, (altura, largura, 1))
    img = np.clip(img + ruido, 0, 255).astype(np.uint8)

    return Image.fromarray(img, "RGB").filter(ImageFilter.GaussianBlur(0.6))


# nome do arquivo, tamanho, foco da luz, força, verde, bandas, granulação
#
# A og-image vai sem granulação: ela é buscada de novo pelo WhatsApp a cada
# compartilhamento, aparece pequena, e o ruído só custaria bytes num PNG.
PECAS = [
    ("bg/hero-person-smartphone.webp", (1920, 1080), (0.74, 0.42), 1.00, 0.12, 0.6, 2.4),
    ("marca/og-image.png",             (1200, 630),  (0.76, 0.46), 1.05, 0.14, 0.4, 0.0),
    ("bg/carousel-velocidade.webp",    (1920, 1080), (0.72, 0.38), 0.95, 0.10, 0.6, 2.4),
    ("bg/carousel-aplicativos.webp",   (1920, 1080), (0.78, 0.52), 0.90, 0.13, 0.5, 2.4),
    ("bg/carousel-5g.webp",            (1920, 1080), (0.70, 0.34), 1.00, 0.11, 0.7, 2.4),
    ("bg/carousel-empresarial.webp",   (1920, 1080), (0.76, 0.44), 0.85, 0.08, 0.5, 2.4),
    ("bg/maistv-hero-bg.jpg",          (1920, 1080), (0.68, 0.50), 0.80, 0.07, 0.4, 2.4),
    # Estes dois ficam atrás de conteúdo: quase lisos, de propósito.
    ("bg/maistv-channels-bg.webp",     (1920, 1080), (0.72, 0.14), 0.45, 0.04, 0.2, 2.4),
    ("bg/mais-aplicativos-bg.webp",    (1920, 1080), (0.50, 0.30), 0.40, 0.06, 0.2, 2.4),
    ("bg/maistv-hero-netflix.webp",    (1920, 1080), (0.74, 0.62), 0.85, 0.06, 0.4, 2.4),
    ("bg/mais-velocidade-hero.webp",   (1920, 1080), (0.72, 0.46), 0.90, 0.12, 0.6, 2.4),
    ("bg/young-urban-5g.webp",         (1920, 1080), (0.75, 0.40), 0.95, 0.14, 0.6, 2.4),
    ("bg/chip-5g-mockup.webp",         (1200, 1200), (0.50, 0.46), 1.00, 0.15, 0.5, 2.4),
    # office-modern tem a área calma à direita: a luz vai para a esquerda.
    ("bg/office-modern.webp",          (1920, 1080), (0.28, 0.44), 0.90, 0.09, 0.5, 2.4),
    ("bg/vagas-hero.webp",             (1920, 1080), (0.74, 0.34), 1.00, 0.13, 0.6, 2.4),
    ("bg/vagas-benefits.webp",         (1920, 1080), (0.72, 0.50), 0.85, 0.11, 0.5, 2.4),
]


def salvar(img: Image.Image, destino: Path) -> int:
    destino.parent.mkdir(parents=True, exist_ok=True)
    ext = destino.suffix.lower()
    if ext == ".webp":
        img.save(destino, "WEBP", quality=82, method=6)
    elif ext in (".jpg", ".jpeg"):
        img.save(destino, "JPEG", quality=86, optimize=True, progressive=True)
    else:
        # PNG de degradê com granulação passa de 600 KB sem quantizar, e a
        # og-image é buscada pelo WhatsApp a cada compartilhamento. 256 cores
        # adaptativas resolvem sem banding visível num fundo desta escala.
        img.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG).save(
            destino, "PNG", optimize=True
        )
    return destino.stat().st_size


def main() -> None:
    total = 0
    for nome, tamanho, foco, forca, verde, bandas, grao in PECAS:
        destino = BASE / nome
        img = atmosfera(tamanho[0], tamanho[1], foco, forca, verde, bandas, grao)
        peso = salvar(img, destino)
        total += peso
        print(f"  {nome:38s} {tamanho[0]}x{tamanho[1]:<5d} {peso/1024:6.1f} KB")
    print(f"\n{len(PECAS)} atmosferas, {total/1024:.0f} KB no total")


if __name__ == "__main__":
    main()
