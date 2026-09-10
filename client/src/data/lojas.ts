/**
 * As quatro lojas, numa fonte só.
 *
 * Antes daqui o mesmo endereço aparecia escrito de formas diferentes em
 * `Lojas.tsx`, em `locations.json` e no JSON-LD do `index.html` — e o nome da
 * empresa vinha em quatro grafias. Para busca local isso enfraquece o
 * casamento entre o site e a ficha do Google, que compara nome, endereço e
 * telefone caractere a caractere. Agora tudo que mostra loja lê esta lista.
 *
 * `cep` e `perfilGoogle` estão como null de propósito: são dado que só a
 * operação tem. O JSON-LD sai sem esses campos enquanto for null, em vez de
 * publicar CEP inventado.
 */
export type Loja = {
  slug: string;
  /** nome exatamente como deve aparecer na ficha do Google Meu Negócio */
  nome: string;
  /** nome curto, para título e migalha de pão */
  curto: string;
  logradouro: string;
  bairro: string;
  lat: number;
  lng: number;
  cep: string | null;
  /** link do perfil no Google Meu Negócio, formato ?cid= */
  perfilGoogle: string | null;
};

export const TELEFONE_E164 = '+556730272500';
export const TELEFONE_EXIBICAO = '(67) 3027-2500';
export const EMAIL = 'atendimento@internetmais.net';
export const HORARIO = 'Segunda a sexta, 8h às 18h · Sábado, 8h às 12h';

export const LOJAS: Loja[] = [
  {
    slug: 'moreninhas',
    nome: 'Internet Mais - Loja Moreninhas',
    curto: 'Moreninhas',
    logradouro: 'Rua Palmácia, 836',
    bairro: 'Moreninhas',
    lat: -20.5519458,
    lng: -54.5773331,
    cep: null,
    perfilGoogle: null,
  },
  {
    slug: 'aero-rancho',
    nome: 'Internet Mais - Loja Aero Rancho',
    curto: 'Aero Rancho',
    logradouro: 'Avenida Rachel de Queiroz, 1468',
    bairro: 'Aero Rancho',
    lat: -20.52283,
    lng: -54.6469975,
    cep: null,
    perfilGoogle: null,
  },
  {
    slug: 'julio-de-castilho',
    nome: 'Internet Mais - Loja Julio de Castilho',
    curto: 'Julio de Castilho',
    logradouro: 'Avenida Julio de Castilho, 1666',
    bairro: 'Campo Grande',
    lat: -20.4539654,
    lng: -54.6479292,
    cep: null,
    perfilGoogle: null,
  },
  {
    slug: 'cafezais',
    nome: 'Internet Mais - Loja Cafezais',
    curto: 'Cafezais',
    logradouro: 'Avenida dos Cafezais, 1985 - Loja 06',
    bairro: 'Cafezais',
    lat: -20.5477646,
    lng: -54.6149795,
    cep: null,
    perfilGoogle: null,
  },
];

export function acharLoja(slug?: string): Loja | undefined {
  return LOJAS.find((l) => l.slug === slug);
}

/** Enquanto não houver o link do perfil, cai numa busca por coordenada. */
export function comoChegar(l: Loja): string {
  return l.perfilGoogle ?? `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
}

export function zap(assunto: string): string {
  const texto = `Olá! Gostaria de falar com um representante sobre ${assunto} da InternetMais.`;
  return `https://wa.me/556730272500?text=${encodeURIComponent(texto)}`;
}
