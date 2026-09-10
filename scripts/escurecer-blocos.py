#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Vira os painéis claros das seções para preto e azul escuro.

O site já tinha o fundo contínuo escuro (o Palco) e o fio de fibra, mas metade
das seções pousava sobre ele como painel branco. A direção do cliente é blocos
em preto e azul escuro, com o verde da marca predominante — então o que muda
aqui é a cor dos painéis, não a estrutura.

Duas coisas ficam claras de propósito e estão protegidas:

- o quadrado dos logos de aplicativo. Metade dessas marcas só distribui versão
  para fundo claro, e filtro de inversão quebra HBO Max, Disney+ e Kaspersky
  além de violar o manual delas. Quadrado claro resolve os 27 de uma vez;
- o texto dentro de qualquer bloco que continue verde.

Rodar uma vez: python3 scripts/escurecer-blocos.py
É idempotente — rodar de novo não muda nada.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / 'client' / 'src' / 'components'

# Paleta, igual à do protótipo aprovado.
BREU = '#04060A'
NOITE = '#0A1730'
FUNDO = '#060E1E'
OSSO = '#E8F1E9'
MUDO = '#93A69B'
CLARO = '#CBD8CE'

# Linha que contém qualquer um destes não é tocada: é o tile de logo.
PROTEGE = re.compile(r'\b(img|logo|Logo|app\.|apps[A-Z]|src=)')

TROCAS: list[tuple[str, str]] = [
    ('bg-white', f'bg-[{NOITE}]'),
    ('bg-gray-50', f'bg-[{FUNDO}]'),
    ('bg-gray-100', f'bg-[{FUNDO}]'),
    ('bg-gray-200', 'bg-white/10'),
    ('bg-gray-300', 'bg-white/15'),
    ('bg-[#F4F4F4]', f'bg-[{FUNDO}]'),
    ('text-[#0D1B3E]', f'text-[{OSSO}]'),
    ('text-gray-800', f'text-[{OSSO}]'),
    ('text-gray-700', f'text-[{CLARO}]'),
    ('text-gray-600', f'text-[{MUDO}]'),
    ('text-gray-500', f'text-[{MUDO}]'),
    ('border-gray-100', 'border-white/10'),
    ('border-gray-200', 'border-white/10'),
    ('border-gray-300', 'border-white/15'),
    # Sombra cinza não aparece sobre fundo escuro; vira profundidade de verdade.
    ('shadow-lg', 'shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)]'),
    ('shadow-xl', 'shadow-[0_26px_70px_-24px_rgba(0,0,0,.9)]'),
    ('shadow-2xl', 'shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)]'),
]

ARQUIVOS = [
    'MaisVelocidade', 'MaisAplicativos', 'MaisGloboPlay', 'Empresarial',
    'Diferenciais', 'Planos5G', 'TelefoniaFixa', 'Aplicativos',
    'AreaAssinante', 'Lojas', 'FAQ', 'ProvaSocial',
]


def trocar(linha: str) -> str:
    if PROTEGE.search(linha):
        return linha
    for de, para in TROCAS:
        # \b não funciona com [ e #, então delimita pelo que cerca uma classe.
        linha = re.sub(r'(?<![\w-])' + re.escape(de) + r'(?![\w-])', para, linha)
    return linha


def main() -> int:
    total = 0
    for nome in ARQUIVOS:
        p = RAIZ / f'{nome}.tsx'
        if not p.exists():
            print(f'  ! {nome}.tsx não existe', file=sys.stderr)
            continue
        antes = p.read_text(encoding='utf-8')
        depois = '\n'.join(trocar(l) for l in antes.split('\n'))
        if antes != depois:
            p.write_text(depois, encoding='utf-8')
            mudadas = sum(1 for a, b in zip(antes.split('\n'), depois.split('\n')) if a != b)
            print(f'  {nome}.tsx  {mudadas} linha(s)')
            total += mudadas
        else:
            print(f'  {nome}.tsx  sem mudança')
    print(f'\n{total} linha(s) alteradas')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
