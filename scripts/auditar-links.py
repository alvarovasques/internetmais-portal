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

RE_IMPORT = re.compile(r"""import\s+(\w+)\s+from\s+["']([^"']+)["']""")
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
    return {rel(f): f.read_text(encoding="utf-8") for f in RAIZ.rglob("*.tsx")}


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
    return alvo if alvo.endswith(".tsx") else alvo + ".tsx"


def main() -> int:
    mods = carregar()

    def filhos(arq: str) -> set[str]:
        txt = mods[arq]
        importados: dict[str, str] = {}
        for alias, esp in RE_IMPORT.findall(txt):
            alvo = resolver(arq, esp)
            if alvo in mods:
                importados[alias] = alvo
        for alias, esp in RE_LAZY.findall(txt):
            alvo = resolver(arq, esp)
            if alvo in mods:
                importados[alias] = alvo
        usados = set(RE_USO.findall(txt))
        return {v for k, v in importados.items() if k in usados}

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
        alvo = resolver("App.tsx", esp)
        if alvo in mods:
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
    orfas = [r for r in rotas if r not in ("/", "/404") and not coberta(r)]
    for r in sorted(orfas):
        print(f"  {r}  ({rotas[r]})")
    if not orfas:
        print("  nenhuma")

    print("\n" + "=" * 78, "\nARQUIVOS NÃO ALCANÇADOS POR NENHUMA ROTA\n" + "=" * 78)
    alcancados = {m for arv in arvore.values() for m in arv} | {"App.tsx"}
    soltos = [m for m in sorted(mods) if m not in alcancados and not m.startswith("components/ui/")]
    for m in soltos:
        print("  " + m)
    if not soltos:
        print("  nenhum")

    print("\n" + "=" * 78, f"\nEXTERNOS ({len(externos)}) E WHATSAPP ({len(whats)})\n" + "=" * 78)
    for e in sorted(externos) + sorted(whats):
        print("  " + e)

    print(f"\n{len(set(quebrados))} link(s) quebrado(s), {len(orfas)} rota(s) órfã(s), {len(soltos)} arquivo(s) solto(s)")
    return 1 if quebrados else 0


if __name__ == "__main__":
    sys.exit(main())
