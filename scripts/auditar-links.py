#!/usr/bin/env python3
"""
Auditoria de navegação do client.

Monta o grafo real do site: que componentes cada rota renderiza (fecho
transitivo), que ids existem dentro dessa árvore, e para onde cada link aponta.
Depois confere se o destino existe *naquela* página, e não em qualquer lugar do
projeto: é isso que uma busca global de id esconde.

Os módulos são indexados pelo caminho relativo, não pelo nome do arquivo.
`components/MaisGloboPlay.tsx` e `pages/MaisGloboPlay.tsx` são arquivos
diferentes com o mesmo nome, e indexar por nome funde os dois.

Uso:  python3 scripts/auditar-links.py
Sai com 1 se houver link quebrado.
"""

from __future__ import annotations
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "client" / "src"

# Rotas que ninguém deve linkar, e o porquê. Sem esta lista o relatório acusa
# duas rotas "órfãs" toda vez, e o ruído esconde uma órfã de verdade no dia
# em que ela aparecer.
ORFAS_DE_PROPOSITO = {
    "/": "página inicial",
    "/404": "página de erro",
    "/admin/entrar": "área interna, não deve ser divulgada",
    "/maisgloboplay": "landing a ser refeita; fora do menu por decisão",
}

# Arquivo vivo que ainda não tem consumidor, e o porquê. Diferente de código
# abandonado: aqui é peça pronta esperando a tela que vai usá-la.
SOLTOS_DE_PROPOSITO = {
    "hooks/useSessao.ts": "hook de sessão pronto para o painel administrativo",
}

RE_IMPORT = re.compile(r"""import\s+(\w+)\s+from\s+["']([^"']+)["']""")
# Qualquer forma de import ou reexport, só o especificador:
#   import X from 'a'   import {a,b} from 'a'   import * as X from 'a'
#   import 'a'          export {a} from 'a'    export * from 'a'
RE_QUALQUER_IMPORT = re.compile(
    r"""(?:import|export)\s*(?:[\w*\s{},]*?\s*from\s*)?["']([^"']+)["']""")
RE_LAZY = re.compile(r"""(?:const\s+)?(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']""")
RE_USO = re.compile(r"<(\w+)[\s/>]")
RE_ID = re.compile(r"""\bid=["']([A-Za-z][\w-]*)["']""")
RE_ROTA = re.compile(r"""<Route\s+path=["']([^"']+)["']\s+component=\{(\w+)\}""")

# Links: href/to literais, navigate(), querySelector('#x') e href: '...' de objetos
RE_ALVOS = [
    re.compile(r"""(?:href|to)=["']([^"'{}\n]+)["']"""),
    re.compile(r"""navigate\(\s*["']([^"'\n]+)["']"""),
    re.compile(r"""href:\s*["']([^"'\n]+)["']"""),
    re.compile(r"""querySelector\(\s*["'](#[\w-]+)["']"""),
    re.compile(r"""setLocation\(\s*["']([^"'\n]+)["']"""),
]
# Links montados com template literal, ex: href={`/bairro/${slug}`}
RE_TEMPLATE = re.compile(r"""(?:href|to)=\{`([^`]*)`\}""")


def rel(p: Path) -> str:
    return str(p.relative_to(RAIZ)).replace("\\", "/")


def carregar() -> dict[str, str]:
    """Inclui .ts além de .tsx: os barris de reexport (components/cinema/index.ts)
    são .ts, e sem eles a cadeia Home -> cinema/index.ts -> Faixa.tsx some,
    fazendo seis arquivos vivos aparecerem como mortos."""
    arqs = list(RAIZ.rglob("*.tsx")) + list(RAIZ.rglob("*.ts"))
    return {rel(f): f.read_text(encoding="utf-8") for f in arqs
            if not f.name.endswith((".d.ts", ".test.ts", ".test.tsx"))}


def resolver(origem: str, especificador: str) -> str | None:
    """Resolve um import para um caminho relativo a client/src, ou None se externo."""
    if especificador.startswith("@/"):
        alvo = especificador[2:]
    elif especificador.startswith("."):
        alvo = str((Path(origem).parent / especificador).as_posix())
        partes: list[str] = []
        for p in alvo.split("/"):
            if p == "..":
                if partes:
                    partes.pop()
            elif p not in (".", ""):
                partes.append(p)
        alvo = "/".join(partes)
    else:
        return None
    return alvo   # a extensão é decidida em `achar`, que conhece os módulos


def main() -> int:
    mods = carregar()

    def achar(base: str | None) -> str | None:
        """Um import pode apontar para arquivo com ou sem extensão, ou para a
        pasta cujo index reexporta o resto — é o caso de '@/components/cinema'."""
        if not base:
            return None
        for cand in (base, base + ".tsx", base + ".ts",
                     base + "/index.tsx", base + "/index.ts"):
            if cand in mods:
                return cand
        return None

    def filhos(arq: str) -> set[str]:
        """Toda aresta de import conta.

        Antes daqui só o import default era reconhecido, e só se o nome
        aparecesse como tag JSX. Isso descartava import nomeado e chamada de
        hook — por isso lib/utils.ts, os hooks e o ThemeContext, usados no
        projeto inteiro, apareciam como arquivos mortos."""
        txt = mods[arq]
        alvos: set[str] = set()
        for esp in RE_QUALQUER_IMPORT.findall(txt):
            alvo = achar(resolver(arq, esp))
            if alvo and alvo != arq:
                alvos.add(alvo)
        for _, esp in RE_LAZY.findall(txt):
            alvo = achar(resolver(arq, esp))
            if alvo and alvo != arq:
                alvos.add(alvo)
        return alvos

    def fecho(arq: str, visto: set[str] | None = None) -> set[str]:
        visto = set() if visto is None else visto
        if arq in visto or arq not in mods:
            return visto
        visto.add(arq)
        for f in filhos(arq):
            fecho(f, visto)
        return visto

    app = mods["App.tsx"]
    alias_para_arq: dict[str, str] = {}
    for alias, esp in RE_IMPORT.findall(app) + RE_LAZY.findall(app):
        # `resolver` devolve o caminho sem extensão; quem decide é `achar`.
        alvo = achar(resolver("App.tsx", esp))
        if alvo:
            alias_para_arq[alias] = alvo

    rotas: dict[str, str] = {}
    for caminho, alias in RE_ROTA.findall(app):
        if alias in alias_para_arq:
            rotas[caminho] = alias_para_arq[alias]

    arvore = {c: fecho(a) for c, a in rotas.items()}
    ids = {c: {i for m in arv for i in RE_ID.findall(mods[m])} for c, arv in arvore.items()}

    def rotas_que_usam(arq: str) -> list[str]:
        return sorted(c for c, arv in arvore.items() if arq in arv)

    print("=" * 78, "\nROTAS E SEUS ARQUIVOS\n" + "=" * 78)
    for c, a in sorted(rotas.items()):
        print(f"  {c:20s} -> {a:38s} {len(ids[c]):3d} ids")

    quebrados: list[str] = []
    externos: set[str] = set()
    whats: set[str] = set()
    destinos_internos: set[str] = set()

    for arq, txt in sorted(mods.items()):
        se_usa = rotas_que_usam(arq)
        achados = {d for rx in RE_ALVOS for d in rx.findall(txt)}
        # template literals viram o prefixo estático, para conferir a rota
        for t in RE_TEMPLATE.findall(txt):
            prefixo = t.split("${")[0]
            if prefixo.startswith("/"):
                achados.add(prefixo + "*")

        for destino in achados:
            if destino.startswith(("http://", "https://")):
                (whats if "wa.me" in destino else externos).add(destino.split("?")[0])
                continue
            if destino.startswith(("mailto:", "tel:", "data:", "#!", "javascript:")):
                continue
            if not destino.startswith(("/", "#")):
                continue

            rota, _, ancora = destino.partition("#")
            rota = (rota.rstrip("/") or "/") if rota else ""
            if rota:
                destinos_internos.add(rota)

            if ancora:
                # âncora relativa vale na própria página; com rota, vale na rota
                alvos = se_usa if not rota else [rota]
                if not alvos:
                    continue
                for alvo in alvos:
                    if alvo.endswith("*"):
                        continue
                    if alvo not in ids:
                        quebrados.append(f"{arq}: '{destino}' -> rota '{alvo}' não existe")
                    elif ancora not in ids[alvo]:
                        onde = [c for c in ids if ancora in ids[c]]
                        dica = f" (existe em {', '.join(onde)})" if onde else " (não existe em nenhuma rota)"
                        quebrados.append(f"{arq}: '{destino}' -> id '#{ancora}' não existe em '{alvo}'{dica}")
            elif rota and not rota.endswith("*"):
                if rota not in rotas:
                    quebrados.append(f"{arq}: '{destino}' -> rota não existe")

    print("\n" + "=" * 78, "\nLINKS QUEBRADOS\n" + "=" * 78)
    for q in sorted(set(quebrados)):
        print("  " + q)
    if not quebrados:
        print("  nenhum")

    print("\n" + "=" * 78, "\nROTAS SEM NENHUM LINK APONTANDO\n" + "=" * 78)
    def coberta(r: str) -> bool:
        for d in destinos_internos:
            if d == r or (d.endswith("*") and r.startswith(d[:-1])):
                return True
        return False
    orfas, previstas = [], []
    for r in rotas:
        if coberta(r):
            continue
        (previstas if r in ORFAS_DE_PROPOSITO else orfas).append(r)
    for r in sorted(orfas):
        print(f"  {r}  ({rotas[r]})")
    if not orfas:
        print("  nenhuma")
    for r in sorted(previstas):
        print(f"  (de propósito) {r} — {ORFAS_DE_PROPOSITO[r]}")

    print("\n" + "=" * 78, "\nARQUIVOS NÃO ALCANÇADOS POR NENHUMA ROTA\n" + "=" * 78)
    # ErrorBoundary e ThemeContext ficam acima das rotas, em App.tsx, e main.tsx
    # é a raiz: nenhum deles pertence a uma rota, mas todos estão vivos.
    alcancados = {m for arv in arvore.values() for m in arv}
    for raiz in ("main.tsx", "App.tsx"):
        if raiz in mods:
            alcancados |= fecho(raiz)
    todos = [m for m in sorted(mods)
             if m not in alcancados and not m.startswith("components/ui/")]
    soltos = [m for m in todos if m not in SOLTOS_DE_PROPOSITO]
    for m in soltos:
        print("  " + m)
    if not soltos:
        print("  nenhum")
    for m in todos:
        if m in SOLTOS_DE_PROPOSITO:
            print(f"  (de propósito) {m} — {SOLTOS_DE_PROPOSITO[m]}")

    print("\n" + "=" * 78, f"\nEXTERNOS ({len(externos)}) E WHATSAPP ({len(whats)})\n" + "=" * 78)
    for e in sorted(externos) + sorted(whats):
        print("  " + e)

    print(f"\n{len(set(quebrados))} link(s) quebrado(s), {len(orfas)} rota(s) órfã(s), "
          f"{len(soltos)} arquivo(s) solto(s)")
    return 1 if (quebrados or orfas or soltos) else 0


if __name__ == "__main__":
    sys.exit(main())
