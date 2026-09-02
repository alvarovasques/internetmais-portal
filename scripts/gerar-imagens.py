#!/usr/bin/env python3
"""
Gera as imagens de marketing do portal com o Nano Banana (Gemini image), a
partir dos prompts de PROMPTS-IMAGENS.md, e grava direto em
client/public/images/ com o nome que o site espera.

Uso:
    export GEMINI_API_KEY=...        # ou coloque no .env da raiz
    python3 scripts/gerar-imagens.py                 # só o que ainda falta
    python3 scripts/gerar-imagens.py --forcar        # refaz tudo
    python3 scripts/gerar-imagens.py --somente hero-person-smartphone
    python3 scripts/gerar-imagens.py --listar

A chave nunca é impressa nem gravada em lugar nenhum. Mantenha o .env fora do
git: ele já está no .gitignore.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from io import BytesIO
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "client" / "public" / "images"
MODELO = "gemini-3.1-flash-image"
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions"

# Vale para todas: é o que impede o resultado de virar foto genérica de banco
# de imagem ou de ganhar os vícios de imagem gerada.
ESTILO = (
    "Photorealistic documentary photograph, natural available light, "
    "realistic skin texture, muted natural color, shot on a 35mm lens, "
    "no text of any kind in the image."
)
NEGATIVO = (
    "Avoid: text, watermark, logo, letters, numbers, UI overlay, neon glow, "
    "circuit board overlay, holographic HUD, teal and orange grade, plastic skin, "
    "extra fingers, distorted hands, stock photo smile, corporate handshake."
)

# (slug, arquivo destino, proporção, tamanho final em px, prompt)
IMAGENS = [
    ("hero-person-smartphone", "bg/hero-person-smartphone.webp", "16:9", (1920, 1080),
     "A Brazilian family of three in the living room of an ordinary middle-class house in "
     "Campo Grande, late afternoon window light, warm and soft. The mother is on the sofa "
     "with a smartphone, a teenager watches the TV in the background, a younger child uses a "
     "tablet on the floor. Everyone relaxed, nobody posing. Simple furniture, a ceiling fan, "
     "plants near the window. People on the right two thirds of the frame, the left third "
     "calm and uncluttered so a headline can sit there."),

    ("og-image", "marca/og-image.png", "16:9", (1200, 630),
     "Wide horizontal composition. On the left, a deep navy blue field with generous empty "
     "space. On the right, a warmly lit Brazilian living room at dusk, slightly out of focus, "
     "with a person holding a phone. The two halves meet in a clean vertical division, no "
     "gradient blend, no glow."),

    ("carousel-velocidade", "bg/carousel-velocidade.webp", "16:9", (1920, 1080),
     "A young Brazilian man in a home office corner of an apartment, mid videocall, laughing "
     "at the screen. Two monitors, a mug, papers, an ordinary chair. Daylight from a window "
     "on the left. Subject on the right side of the frame, calm space on the left."),

    ("carousel-aplicativos", "bg/carousel-aplicativos.webp", "16:9", (1920, 1080),
     "A Brazilian couple in their forties on a sofa at night, watching a film on a large TV, "
     "the room lit only by the screen and one warm lamp. Popcorn bowl between them. The TV "
     "content is blurred, no interface visible. Subjects on the right, dark calm space on the left."),

    ("carousel-5g", "bg/carousel-5g.webp", "16:9", (1920, 1080),
     "A Brazilian woman in her thirties walking on a tree-lined residential street, looking at "
     "her phone, unhurried. Late afternoon sun through the trees. Real Brazilian street: low "
     "houses, a wall, a parked motorbike. Subject on the right third, street receding to the left."),

    ("carousel-empresarial", "bg/carousel-empresarial.webp", "16:9", (1920, 1080),
     "Interior of a small Brazilian business, a clinic reception or a neighborhood store, two "
     "employees working, one at a computer. Daylight, practical furniture, nothing corporate "
     "or glassy. Wide framing with calm wall space on the left."),

    ("maistv-hero-bg", "bg/maistv-hero-bg.jpg", "16:9", (1920, 1080),
     "A living room at night seen from behind the sofa, a large TV glowing on the far wall, "
     "silhouettes of two people watching. The screen content is soft and indistinct, no logos, "
     "no interface. Warm lamp on one side. Deep shadows, cinematic, calm space on the left."),

    ("maistv-channels-bg", "bg/maistv-channels-bg.webp", "16:9", (1920, 1080),
     "Very dark navy blue background with a subtle soft light falloff from the top right, like "
     "a screen glow in a dark room. Almost flat, no objects, no people, no pattern, no texture. "
     "Extremely low contrast: this image sits behind content and must not compete with it."),

    ("maistv-hero-netflix", "bg/maistv-hero-netflix.webp", "16:9", (1920, 1080),
     "Close framing of a person's hands holding a TV remote, pointing away from camera towards "
     "a glowing screen out of focus in the background. Night, warm lamp light. Shallow depth of "
     "field, hands in the lower right, dark calm area in the upper left."),

    ("mais-velocidade-hero", "bg/mais-velocidade-hero.webp", "16:9", (1920, 1080),
     "A Brazilian teenager playing a video game in a bedroom, headset on, concentrated, lit by "
     "the monitor and one lamp. Ordinary bedroom, posters, unmade bed. Not an esports setup, no "
     "RGB lighting. Subject on the right, dark calm space on the left."),

    ("young-urban-5g", "bg/young-urban-5g.webp", "16:9", (1920, 1080),
     "Two young Brazilians sitting on the steps in front of a house, sharing something on a "
     "phone screen, laughing. Golden hour, residential street of Campo Grande. Warm, informal, "
     "real clothing. Subjects on the right, street on the left."),

    ("chip-5g-mockup", "bg/chip-5g-mockup.webp", "1:1", (1200, 1200),
     "Product photograph of a SIM card and a modern smartphone lying on a light warm wooden "
     "surface, seen slightly from above. Soft natural window light from the left, gentle "
     "shadows. The SIM card is plain, no branding visible. Clean and minimal, generous empty "
     "space around the objects."),

    ("mais-aplicativos-bg", "bg/mais-aplicativos-bg.webp", "16:9", (1920, 1080),
     "Soft out of focus interior of a Brazilian living room at dusk, warm bokeh from a lamp and "
     "a TV, no recognizable objects. Very shallow depth of field, low contrast, muted colors. "
     "This image sits behind a grid of app logos and must not compete for attention."),

    ("office-modern", "bg/office-modern.webp", "16:9", (1920, 1080),
     "Interior of a small commercial office in a Brazilian city, four or five people working at "
     "desks, daylight through venetian blinds. Practical, slightly cluttered, real: paper on "
     "desks, a water bottle, a wall calendar. Not a startup, not a glass tower. Calm space on "
     "the right."),

    ("vagas-hero", "bg/vagas-hero.webp", "16:9", (1920, 1080),
     "Two internet field technicians in work uniform on a residential street, one at the top of "
     "a ladder near a utility pole handling fiber cable, the other steadying the ladder and "
     "looking up. Bright morning light, blue sky, low Brazilian houses. Real work, no posing. "
     "Subjects on the right, sky and street on the left."),

    ("vagas-benefits", "bg/vagas-benefits.webp", "16:9", (1920, 1080),
     "A small team of Brazilian coworkers around a table in a simple office kitchen, mid "
     "conversation over coffee, relaxed, mixed ages. Daylight, ordinary mugs, nobody posing. "
     "Documentary framing with calm wall space on the left."),
]


def ler_chave() -> str:
    chave = os.environ.get("GEMINI_API_KEY", "").strip()
    if not chave:
        env = RAIZ / ".env"
        if env.exists():
            for linha in env.read_text(encoding="utf-8").splitlines():
                if linha.strip().startswith("GEMINI_API_KEY="):
                    chave = linha.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    if not chave:
        sys.exit(
            "GEMINI_API_KEY não encontrada.\n"
            "Defina no ambiente ou acrescente ao .env da raiz:\n"
            "  GEMINI_API_KEY=sua-chave\n"
            "A chave é gerada no Google AI Studio."
        )
    return chave


def achar_imagem(no) -> bytes | None:
    """
    Caça o primeiro blob base64 de imagem na resposta, em vez de assumir um
    formato fixo: o corpo da API varia entre versões, e um parser rígido
    quebraria silenciosamente na próxima mudança.
    """
    if isinstance(no, dict):
        for chave in ("data", "bytesBase64Encoded", "b64_json", "image_bytes"):
            valor = no.get(chave)
            if isinstance(valor, str) and len(valor) > 2048:
                try:
                    return base64.b64decode(valor, validate=True)
                except Exception:
                    pass
        for valor in no.values():
            achado = achar_imagem(valor)
            if achado:
                return achado
    elif isinstance(no, list):
        for item in no:
            achado = achar_imagem(item)
            if achado:
                return achado
    return None


def gerar(chave: str, prompt: str, proporcao: str) -> bytes:
    corpo = json.dumps({
        "model": MODELO,
        "input": f"{prompt}\n\n{ESTILO}\n\n{NEGATIVO}",
        "response_format": {
            "type": "image",
            "mime_type": "image/png",
            "aspect_ratio": proporcao,
            "image_size": "2K",
        },
    }).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=corpo,
        headers={"x-goog-api-key": chave, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        dados = json.loads(resp.read().decode("utf-8"))

    imagem = achar_imagem(dados)
    if not imagem:
        recorte = json.dumps(dados)[:600]
        raise RuntimeError(f"resposta sem imagem reconhecível: {recorte}")
    return imagem


def salvar(bruto: bytes, caminho: Path, tamanho: tuple[int, int]) -> int:
    from PIL import Image

    img = Image.open(BytesIO(bruto)).convert("RGB")

    # Recorte central para a proporção exata, depois redimensiona. Evita a
    # distorção que um resize direto causaria quando a API devolve outra razão.
    alvo = tamanho[0] / tamanho[1]
    atual = img.width / img.height
    if abs(atual - alvo) > 0.01:
        if atual > alvo:
            nova_largura = int(img.height * alvo)
            esquerda = (img.width - nova_largura) // 2
            img = img.crop((esquerda, 0, esquerda + nova_largura, img.height))
        else:
            nova_altura = int(img.width / alvo)
            topo = (img.height - nova_altura) // 2
            img = img.crop((0, topo, img.width, topo + nova_altura))
    img = img.resize(tamanho, Image.LANCZOS)

    caminho.parent.mkdir(parents=True, exist_ok=True)
    ext = caminho.suffix.lower()
    if ext == ".webp":
        img.save(caminho, "WEBP", quality=80, method=6)
    elif ext in (".jpg", ".jpeg"):
        img.save(caminho, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        img.save(caminho, "PNG", optimize=True)
    return caminho.stat().st_size


def main() -> None:
    p = argparse.ArgumentParser(description="Gera as imagens de marketing do portal.")
    p.add_argument("--forcar", action="store_true", help="refaz mesmo o que já existe")
    p.add_argument("--somente", help="gera só o slug informado")
    p.add_argument("--listar", action="store_true", help="lista os slugs e sai")
    args = p.parse_args()

    if args.listar:
        for slug, arquivo, prop, tam, _ in IMAGENS:
            print(f"{slug:26} {arquivo:38} {prop:5} {tam[0]}x{tam[1]}")
        return

    chave = ler_chave()
    fila = [i for i in IMAGENS if not args.somente or i[0] == args.somente]
    if args.somente and not fila:
        sys.exit(f"slug '{args.somente}' não existe. Use --listar para ver os nomes.")

    feitas = puladas = falhas = 0
    for slug, arquivo, proporcao, tamanho, prompt in fila:
        destino = DESTINO / arquivo
        # Um placeholder gerado tem menos de 60 KB; imagem de verdade é maior.
        if destino.exists() and not args.forcar and destino.stat().st_size > 60_000:
            print(f"· {slug}: já existe, pulando")
            puladas += 1
            continue

        print(f"→ {slug}: gerando {tamanho[0]}x{tamanho[1]}...", flush=True)
        for tentativa in (1, 2, 3):
            try:
                bruto = gerar(chave, prompt, proporcao)
                kb = salvar(bruto, destino, tamanho) // 1024
                print(f"  gravado em {arquivo} ({kb} KB)")
                feitas += 1
                break
            except urllib.error.HTTPError as e:
                detalhe = e.read().decode("utf-8", "ignore")[:300]
                if e.code in (429, 500, 503) and tentativa < 3:
                    espera = 8 * tentativa
                    print(f"  HTTP {e.code}, tentando de novo em {espera}s")
                    time.sleep(espera)
                    continue
                print(f"  FALHOU: HTTP {e.code} {detalhe}")
                falhas += 1
                break
            except Exception as e:
                if tentativa < 3:
                    print(f"  {e}; tentando de novo")
                    time.sleep(5)
                    continue
                print(f"  FALHOU: {e}")
                falhas += 1
                break
        time.sleep(2)  # cortesia com o limite de taxa

    print(f"\n{feitas} geradas, {puladas} puladas, {falhas} com falha")
    if feitas:
        print("Confira cada página: se o título brigar com a foto, o problema é o")
        print("enquadramento. Regenere só aquela com --somente <slug> --forcar.")


if __name__ == "__main__":
    main()
