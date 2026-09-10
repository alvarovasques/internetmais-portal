#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Preenche as coordenadas dos bairros a partir do OpenStreetMap.

Motivo: as coordenadas que estavam em client/src/data/locations.json eram um
reticulado inventado, arredondado de 0,005 em 0,005, e todas em longitude -55,5 —
uns 90 km a oeste de Campo Grande. Pino errado numa página que existe para busca
local é pior do que pino nenhum.

A busca é limitada à caixa de Campo Grande e só aceita resultado cujo tipo seja de
bairro. O que não resolver com confiança sai marcado como `revisar`, para alguém
conferir antes de publicar — este script não chuta.

Uso:
    python3 scripts/geocodificar-bairros.py            # grava locations.json
    python3 scripts/geocodificar-bairros.py --seco     # só mostra o que faria
"""
from __future__ import annotations

import json
import os
import re
import unicodedata
import sys
import time
import urllib.parse
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALVO = os.path.join(RAIZ, 'client', 'src', 'data', 'locations.json')

# Caixa de Campo Grande, com folga. Fora dela nenhum resultado é aceito.
CAIXA = (-54.95, -20.28, -54.35, -20.70)   # oeste, norte, leste, sul
LIMITES = {'lat': (-20.70, -20.28), 'lon': (-54.95, -54.35)}

# Tipos que representam bairro. "administrative" só entra com addresstype de bairro.
TIPOS_BONS = {'suburb', 'neighbourhood', 'quarter', 'city_district', 'residential', 'village'}

AGENTE = 'internetmais-portal/1.0 (+https://internetmais.net) geocodificacao-bairros'
ESPERA = 1.2   # a política de uso do Nominatim pede no máximo 1 consulta por segundo

# Alguns nomes precisam de ajuda: o cadastro usa apelido, o OSM usa o nome oficial.
APELIDOS = {
    'Vila Carvalho': 'Vila Carvalho',
    'Vila Jacy': 'Jardim Jacy',
    'Vila Nasser': 'Vila Nasser',
    'Vila Sobrinho': 'Vila Sobrinho',
    'Centro Oeste': 'Jardim Centro-Oeste',
    'Cophavila II': 'Cophavila II',
    'Moreninha': 'Moreninha',
    'Batistão': 'Jardim Batistão',
    'Los Angeles': 'Jardim Los Angeles',
    'Leblon': 'Jardim Leblon',
    'Panamá': 'Jardim Panamá',
    'Popular': 'Vila Popular',
    'Seminário': 'Jardim Seminário',
    'Tijuca': 'Jardim Tijuca',
    'Tarumã': 'Jardim Tarumã',
    'Guanandi': 'Conjunto Guanandi',
    'Lageado': 'Jardim Lageado',
    'Alves Pereira': 'Jardim Alves Pereira',
    'Cruzeiro': 'Vila Cruzeiro',
    # O OSM não tem 'Cophavila II'; tem 'Cophavila', a área de que ela faz parte.
    # Resolve por ali e o resultado sai marcado como aproximado.
    'Cophavila II': 'Cophavila',
}


def consultar(termo: str) -> list[dict]:
    par = urllib.parse.urlencode({
        'format': 'jsonv2',
        'limit': '8',
        'bounded': '1',
        'viewbox': ','.join(str(v) for v in CAIXA),
        'countrycodes': 'br',
        'q': f'{termo}, Campo Grande, Mato Grosso do Sul, Brasil',
    })
    req = urllib.request.Request(
        f'https://nominatim.openstreetmap.org/search?{par}',
        headers={'User-Agent': AGENTE, 'Accept-Language': 'pt-BR'},
    )
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode('utf-8'))


def chave(s: str) -> str:
    """Compara nome sem acento, sem hífen e sem caixa: o cadastro escreve
    'Taveiropólis' e 'Centro-Oeste', o OSM escreve 'Taveirópolis' e 'Centro Oeste'."""
    s = unicodedata.normalize('NFKD', s.lower())
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


def dentro(lat: float, lon: float) -> bool:
    a, b = LIMITES['lat']
    c, d = LIMITES['lon']
    return a <= lat <= b and c <= lon <= d


def escolher(res: list[dict], nome: str) -> dict | None:
    """Prefere o resultado que é de fato um bairro e cujo nome bate com o buscado."""
    alvo = chave(nome)
    candidatos = []
    for r in res:
        lat, lon = float(r['lat']), float(r['lon'])
        if not dentro(lat, lon):
            continue
        tipo = (r.get('addresstype') or r.get('type') or '').lower()
        if tipo not in TIPOS_BONS:
            continue
        nome_osm = chave(r.get('name') or '')
        # O nome tem de bater. Resultado que só caiu perto, com outro nome, é
        # descartado: foi assim que "Alves Pereira" virou "Jardim Macapá" e
        # "Tijuca" virou "Jardim dos Boggi" na primeira rodada.
        if nome_osm == alvo:
            peso = 3
        elif alvo in nome_osm or nome_osm in alvo:
            peso = 2
        else:
            continue
        candidatos.append((peso, r.get('importance', 0), r, lat, lon))
    if not candidatos:
        return None
    candidatos.sort(key=lambda x: (x[0], x[1]), reverse=True)
    peso, _, r, lat, lon = candidatos[0]
    return {
        'lat': round(lat, 6), 'lng': round(lon, 6),
        'osm': f"{r.get('osm_type')}/{r.get('osm_id')}",
        'osm_nome': r.get('display_name', '').split(',')[0],
        'confianca': 'alta' if peso == 3 else 'media',
        'exato': peso == 3,
    }


def main() -> int:
    seco = '--seco' in sys.argv
    dados = json.load(open(ALVO, encoding='utf-8'))
    bairros = dados.get('bairros', [])
    print(f'{len(bairros)} bairros a resolver\n')

    achados, revisar = 0, []
    for i, b in enumerate(bairros, 1):
        nome = b['name']
        r = None
        for termo in dict.fromkeys([APELIDOS.get(nome, nome), nome]):
            try:
                r = escolher(consultar(termo), nome)
            except Exception as e:                       # rede instável não pode derrubar o lote
                print(f'  ! {nome}: {e}')
                r = None
            time.sleep(ESPERA)
            if r:
                break

        if r:
            b['lat'], b['lng'] = r['lat'], r['lng']
            b['fonte'] = 'openstreetmap:' + r['osm']
            b.pop('revisar', None)
            # Quando o nome do OSM não é idêntico ao do cadastro, o ponto é da
            # área vizinha ou da área-mãe. Fica registrado no dado, senão daqui
            # a seis meses ninguém lembra que aquele pino é aproximado.
            if r['exato']:
                b.pop('precisao', None)
                b.pop('fonte_nome', None)
            else:
                b['precisao'] = 'aproximada'
                b['fonte_nome'] = r['osm_nome']
            achados += 1
            marca = '' if r['confianca'] == 'alta' else '  (conferir: OSM diz "%s")' % r['osm_nome']
            print(f'{i:2}. {nome:24} {r["lat"]:>11}, {r["lng"]:>11}{marca}')
        else:
            # Sem resultado confiável: apaga a coordenada inventada em vez de mantê-la.
            b.pop('lat', None)
            b.pop('lng', None)
            b['revisar'] = 'sem correspondência confiável no OpenStreetMap'
            revisar.append(nome)
            print(f'{i:2}. {nome:24} -- não resolvido, coordenada removida')

    print(f'\n{achados} resolvidos, {len(revisar)} para revisar' +
          (': ' + ', '.join(revisar) if revisar else ''))

    if seco:
        print('\n(--seco: nada gravado)')
        return 0
    dados['bairros'] = bairros
    with open(ALVO, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'gravado em {ALVO}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
