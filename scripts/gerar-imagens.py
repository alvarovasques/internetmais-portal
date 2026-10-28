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

# Dois registros. O documental é o da maioria das peças: foto de gente real,
# sem pose, que não parece banco de imagem. O cinema vale só para os sete
# quadros do hero, que são a primeira coisa que a pessoa vê e precisam de
# impacto: luz motivada de uma fonte só, sombra funda, grão fino.
#
# Nos dois a regra é a mesma: nada de verde na foto. Verde é a cor de AÇÃO
# nesta identidade, reservada ao botão; foto com dominante verde come o
# destaque do CTA que fica em cima dela.
REGISTROS = {
    "documental": (
        "Photorealistic documentary photograph, natural available light, "
        "realistic skin texture, muted natural color, shot on a 35mm lens, "
        "no text of any kind in the image.",
        "Avoid: text, watermark, logo, letters, numbers, UI overlay, neon glow, "
        "circuit board overlay, holographic HUD, teal and orange grade, plastic skin, "
        "extra fingers, distorted hands, stock photo smile, corporate handshake.",
    ),
    "cinema": (
        "Cinematic still frame from a feature film, anamorphic wide framing, 40mm lens, "
        "shallow depth of field, one motivated practical light source with deep falloff "
        "into shadow, filmic contrast with a slightly lifted black point, soft halation "
        "around practical lights, fine 35mm grain, realistic skin texture, restrained "
        "palette of deep navy blue shadows against warm tungsten highlights, "
        "no text of any kind in the image.",
        "Avoid: text, watermark, logo, letters, numbers, UI overlay, neon rim light, "
        "circuit board graphics, holographic HUD, teal and orange grade, green color cast, "
        "anamorphic flare streaks, oversaturated color, HDR look, plastic skin, "
        "extra fingers, distorted hands, stock photo smile, corporate handshake.",
    ),
}

# O pro desenha luz e pele melhor e custa mais; vale nos sete do hero.
MODELO_POR_REGISTRO = {"documental": MODELO, "cinema": "gemini-3-pro-image"}

# (slug, arquivo destino, proporção, tamanho final em px, prompt, registro)
#
# Enquadramento: no hero o título pousa na metade ESQUERDA do quadro, sobre
# um gradiente que escurece esse lado. Por isso todo prompt do hero manda o
# assunto para a direita e pede os 40% da esquerda vazios. Sem isso a foto
# briga com o h1 e não há gradiente que resolva.
IMAGENS = [
    ("hero-person-smartphone", "bg/hero-person-smartphone.webp", "16:9", (1920, 1080),
     "Interior of an ordinary middle-class house in Campo Grande at blue hour. A mother "
     "stands near the window with a phone, her face lit from below by the screen; behind her "
     "a teenager sits on the sofa and a younger child lies on the floor, both softly lit by "
     "a television just off frame. One warm tungsten lamp is the only practical light in the "
     "room and the window still holds the last cold blue of dusk. Simple furniture, a "
     "ceiling fan, plants. The family occupies the right half of the frame; the left forty "
     "percent is a dark wall in deep navy shadow, empty and calm.", "cinema"),

    ("og-image", "marca/og-image.png", "16:9", (1200, 630),
     "Wide horizontal composition. On the left, a deep navy blue field with generous empty "
     "space. On the right, a warmly lit Brazilian living room at dusk, slightly out of focus, "
     "with a person holding a phone. The two halves meet in a clean vertical division, no "
     "gradient blend, no glow.", "documental"),

    ("carousel-velocidade", "bg/carousel-velocidade.webp", "16:9", (1920, 1080),
     "A young Brazilian man alone at a desk late at night, leaning slightly forward, "
     "absorbed, his face carved by the cold light of two monitors. Behind him a window shows "
     "the blurred orange streetlights of a low Brazilian city. One warm desk lamp at the far "
     "right edge. He sits in the right third of the frame; the left forty percent is the "
     "unlit room in deep navy shadow, almost empty.", "cinema"),

    ("carousel-aplicativos", "bg/carousel-aplicativos.webp", "16:9", (1920, 1080),
     "A Brazilian couple in their forties on a sofa at night, seen from a low three quarter "
     "angle, washed in the soft shifting light of a large television just off frame to the "
     "right. A bowl of popcorn between them, a blanket, an ordinary living room, a warm lamp "
     "far in the background. No screen and no interface visible. They sit in the right half; "
     "the left forty percent is the dark room, a doorway and bare wall falling into deep "
     "shadow.", "cinema"),

    ("carousel-5g", "bg/carousel-5g.webp", "16:9", (1920, 1080),
     "A Brazilian woman in her thirties walking home along a residential street in Campo "
     "Grande at golden hour, phone in one hand, unhurried, backlit by the low sun through "
     "flowering yellow ipe trees. Low houses, a garden wall, a long shadow across the "
     "asphalt. She is in the right third of the frame, rim lit, her face in soft shade; the "
     "left of the frame is the empty street receding into warm shadow under the trees.", "cinema"),

    ("carousel-empresarial", "bg/carousel-empresarial.webp", "16:9", (1920, 1080),
     "Interior of a small Brazilian business at blue hour, a neighbourhood pharmacy or a "
     "clinic reception, seen from inside. The owner stands behind the counter under warm "
     "light, working at a computer; through the glass shopfront the street outside is cold "
     "blue dusk with the headlights of a passing car. Practical and lived in, nothing "
     "corporate, no glass tower. Counter and owner on the right; the left forty percent is "
     "an interior wall and shelving falling into deep shadow.", "cinema"),

    ("maistv-hero-bg", "bg/maistv-hero-bg.jpg", "16:9", (1920, 1080),
     "A dark living room seen from behind and slightly above the sofa, a large television "
     "glowing on the far wall as the only strong light in the room, two silhouetted figures "
     "watching it. The screen content is soft and indistinct, no interface, no logo, no "
     "recognisable image. A warm lamp just out of frame on the right lays a thin edge of "
     "light along the back of the sofa. Deep blacks, wide cinematic frame. The television "
     "sits in the right half; the left of the frame is empty dark room.", "cinema"),

    ("maistv-channels-bg", "bg/maistv-channels-bg.webp", "16:9", (1920, 1080),
     "Very dark navy blue background with a subtle soft light falloff from the top right, like "
     "a screen glow in a dark room. Almost flat, no objects, no people, no pattern, no texture. "
     "Extremely low contrast: this image sits behind content and must not compete with it.", "documental"),

    ("maistv-hero-netflix", "bg/maistv-hero-netflix.webp", "16:9", (1920, 1080),
     "Close framing of a person's hands holding a TV remote, pointing away from camera towards "
     "a glowing screen out of focus in the background. Night, warm lamp light. Shallow depth of "
     "field, hands in the lower right, dark calm area in the upper left.", "documental"),

    ("mais-velocidade-hero", "bg/mais-velocidade-hero.webp", "16:9", (1920, 1080),
     "A Brazilian teenager playing a video game in a bedroom, headset on, concentrated, lit by "
     "the monitor and one lamp. Ordinary bedroom, posters, unmade bed. Not an esports setup, no "
     "RGB lighting. Subject on the right, dark calm space on the left.", "documental"),

    ("young-urban-5g", "bg/young-urban-5g.webp", "16:9", (1920, 1080),
     "Two young Brazilians sitting on the steps in front of a house, sharing something on a "
     "phone screen, laughing. Golden hour, residential street of Campo Grande. Warm, informal, "
     "real clothing. Subjects on the right, street on the left.", "documental"),

    ("chip-5g-mockup", "bg/chip-5g-mockup.webp", "16:9", (1920, 1080),
     "A young Brazilian man on the veranda of a house at dusk, leaning on the railing with "
     "his phone raised, the screen lighting his face and hands from below. Behind him the "
     "wide open sky of Campo Grande holds the last magenta and deep blue of sunset over low "
     "rooftops and a water tank. He is in the right third, almost a silhouette edged by "
     "screen light; the left of the frame is open sky and one dark veranda post, calm and "
     "empty.", "cinema"),

    ("mais-aplicativos-bg", "bg/mais-aplicativos-bg.webp", "16:9", (1920, 1080),
     "Soft out of focus interior of a Brazilian living room at dusk, warm bokeh from a lamp and "
     "a TV, no recognizable objects. Very shallow depth of field, low contrast, muted colors. "
     "This image sits behind a grid of app logos and must not compete for attention.", "documental"),

    ("office-modern", "bg/office-modern.webp", "16:9", (1920, 1080),
     "Interior of a small commercial office in a Brazilian city, four or five people working at "
     "desks, daylight through venetian blinds. Practical, slightly cluttered, real: paper on "
     "desks, a water bottle, a wall calendar. Not a startup, not a glass tower. Calm space on "
     "the right.", "documental"),

    ("vagas-hero", "bg/vagas-hero.webp", "16:9", (1920, 1080),
     "Two internet field technicians in work uniform on a residential street, one at the top of "
     "a ladder near a utility pole handling fiber cable, the other steadying the ladder and "
     "looking up. Bright morning light, blue sky, low Brazilian houses. Real work, no posing. "
     "Subjects on the right, sky and street on the left.", "documental"),

    ("vagas-benefits", "bg/vagas-benefits.webp", "16:9", (1920, 1080),
     "A small team of Brazilian coworkers around a table in a simple office kitchen, mid "
     "conversation over coffee, relaxed, mixed ages. Daylight, ordinary mugs, nobody posing. "
     "Documentary framing with calm wall space on the left.", "documental"),
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


def gerar(chave: str, prompt: str, proporcao: str, registro: str) -> bytes:
    estilo, negativo = REGISTROS[registro]
    corpo = json.dumps({
        "model": MODELO_POR_REGISTRO.get(registro, MODELO),
        "input": f"{prompt}\n\n{estilo}\n\n{negativo}",
        "response_format": {
            "type": "image",
            "mime_type": "image/jpeg",
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
    p.add_argument("--registro", choices=sorted(REGISTROS), help="gera só as de um registro")
    p.add_argument("--listar", action="store_true", help="lista os slugs e sai")
    args = p.parse_args()

    if args.listar:
        for slug, arquivo, prop, tam, _, reg in IMAGENS:
            print(f"{slug:26} {arquivo:38} {prop:5} {tam[0]}x{tam[1]}  {reg}")
        return

    chave = ler_chave()
    fila = [i for i in IMAGENS if not args.somente or i[0] == args.somente]
    if args.registro:
        fila = [i for i in fila if i[5] == args.registro]
    if args.somente and not fila:
        sys.exit(f"slug '{args.somente}' não existe. Use --listar para ver os nomes.")

    feitas = puladas = falhas = 0
    for slug, arquivo, proporcao, tamanho, prompt, registro in fila:
        destino = DESTINO / arquivo
        # Um placeholder gerado tem menos de 60 KB; imagem de verdade é maior.
        if destino.exists() and not args.forcar and destino.stat().st_size > 60_000:
            print(f"· {slug}: já existe, pulando")
            puladas += 1
            continue

        print(f"→ {slug}: gerando {tamanho[0]}x{tamanho[1]} ({registro})...", flush=True)
        for tentativa in (1, 2, 3):
            try:
                bruto = gerar(chave, prompt, proporcao, registro)
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
