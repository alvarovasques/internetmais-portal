#!/usr/bin/env python3
"""
Prepara uma foto para virar quadro do hero.

Recorta para 16:9, redimensiona para 1920x1080, simula o véu que o
HeroSection aplica e mede o contraste do título branco sobre a caixa real do
h1. Se reprovar, escurece o lado esquerdo o MÍNIMO necessário para passar, e
só aí grava.

Por que existe: o véu do site é um só para os sete quadros, calibrado para a
foto média. Foto de entardecer com céu estourado à esquerda passa por baixo
dele e derruba o contraste; foto de sala à noite sobra contraste. Em vez de
endurecer o véu para todo mundo, cada chapa chega pronta.

Uso:
    python3 scripts/preparar-hero.py entrada.jpg bg/carousel-5g.webp
    python3 scripts/preparar-hero.py entrada.jpg bg/x.webp --alvo 6
    python3 scripts/preparar-hero.py entrada.jpg bg/x.webp --so-medir
"""
from __future__ import annotations
import argparse, sys
from pathlib import Path
import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "client" / "public" / "images"
LARGURA, ALTURA = 1920, 1080
NAVY = np.array([7, 14, 34], dtype=np.float32)

# A caixa onde o h1 e o parágrafo pousam, em px de 1920x1080. Vem do layout:
# container + lg:pl-20 começa em ~112, e o max-w-xl termina em ~790.
CAIXA = (320, 580, 100, 790)   # y0, y1, x0, x1


def suave(t):
    return t * t * (3 - 2 * t)


def veu(largura=LARGURA, altura=ALTURA):
    """O mesmo véu do HeroSection, em desktop."""
    x = np.linspace(0, 1, largura)
    y = np.linspace(0, 1, altura)
    aH = 0.86 * (1 - suave(np.clip(x / 0.58, 0, 1)))
    aV = np.maximum(np.where(y > 0.62, 0.55 * suave((y - 0.62) / 0.38), 0.0), 0.10)
    return aH, aV


def aplicar(arr, aH, aV):
    c = arr * (1 - aH[None, :, None]) + NAVY * aH[None, :, None]
    c = c * (1 - aV[:, None, None]) + NAVY * aV[:, None, None]
    return np.clip(c, 0, 255)


def contraste(c):
    """Contraste do branco contra o ponto mais claro da caixa do título.

    Usa o percentil 98 e não a média: o que quebra a legibilidade é o pedaço
    claro que fica embaixo de uma letra, não o brilho geral do pedaço.
    """
    y0, y1, x0, x1 = CAIXA
    f = c[y0:y1, x0:x1] / 255
    f = np.where(f <= 0.04045, f / 12.92, ((f + 0.055) / 1.055) ** 2.4)
    L = 0.2126 * f[:, :, 0] + 0.7152 * f[:, :, 1] + 0.0722 * f[:, :, 2]
    return 1.05 / (np.percentile(L, 98) + 0.05)


def para_169(im: Image.Image) -> Image.Image:
    alvo = 16 / 9
    w, h = im.size
    if abs(w / h - alvo) > 0.01:
        if w / h > alvo:
            nw = int(h * alvo); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else:
            nh = int(w / alvo); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return im.resize((LARGURA, ALTURA), Image.LANCZOS)


def queimar(arr, forca):
    """Escurece a esquerda, na força cheia até onde o texto vai e caindo depois.

    A primeira versão usava a mesma curva do véu, que já está caindo quando
    chega na borda direita da caixa do título: a queima chegava lá com 20% e
    não dava conta de céu estourado. Agora é força cheia até 42% da largura,
    que é onde o parágrafo termina, e cai a zero em 65%, antes do assunto.
    """
    x = np.linspace(0, 1, LARGURA)
    a = forca * (1 - suave(np.clip((x - 0.42) / 0.23, 0, 1)))
    return np.clip(arr * (1 - a[None, :, None]) + NAVY * a[None, :, None], 0, 255)


def main():
    p = argparse.ArgumentParser(description="Prepara uma foto para o hero.")
    p.add_argument("entrada")
    p.add_argument("saida", nargs="?", help="caminho relativo a client/public/images/")
    p.add_argument("--alvo", type=float, default=5.0, help="contraste mínimo (AA pede 4,5)")
    p.add_argument("--so-medir", action="store_true")
    a = p.parse_args()

    im = Image.open(a.entrada).convert("RGB")
    original = im.size
    arr = np.asarray(para_169(im)).astype(np.float32)
    aH, aV = veu()

    antes = contraste(aplicar(arr, aH, aV))
    forca = 0.0
    if antes < a.alvo:
        for f in np.arange(0.05, 0.86, 0.05):
            if contraste(aplicar(queimar(arr, f), aH, aV)) >= a.alvo:
                forca = float(f); break
        else:
            forca = 0.85
        arr = queimar(arr, forca)
    depois = contraste(aplicar(arr, aH, aV))

    print(f"origem        {original[0]}x{original[1]}" +
          ("  (abaixo de 1920x1080, vai ser ampliada)" if original[0] < LARGURA else ""))
    print(f"contraste     {antes:.2f}:1 antes" +
          (f"  ->  {depois:.2f}:1 com {int(forca*100)}% de queima na esquerda" if forca else "  (já passa, sem queima)"))
    print(f"brilho médio  {aplicar(arr, aH, aV).mean():.1f}")

    if a.so_medir or not a.saida:
        return
    destino = DESTINO / a.saida
    destino.parent.mkdir(parents=True, exist_ok=True)
    img = Image.fromarray(arr.astype(np.uint8))
    if destino.suffix.lower() == ".webp":
        img.save(destino, "WEBP", quality=84, method=6)
    elif destino.suffix.lower() in (".jpg", ".jpeg"):
        img.save(destino, "JPEG", quality=86, optimize=True, progressive=True)
    else:
        img.save(destino, "PNG", optimize=True)
    print(f"gravado       {a.saida}  ({destino.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
