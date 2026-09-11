/**
 * As quatro lojas, numa fonte só.
 *
 * Antes daqui o mesmo endereço aparecia escrito de formas diferentes em
 * `Lojas.tsx`, em `locations.json` e no JSON-LD do `index.html` — e o nome da
 * empresa vinha em quatro grafias. Para busca local isso enfraquece o
 * casamento entre o site e a ficha do Google, que compara nome, endereço e
 * telefone caractere a caractere. Agora tudo que mostra loja lê esta lista.
 *
 * Nome, endereço, CEP, coordenada e link vieram da própria ficha de cada loja
 * no Google Meu Negócio, para o site dizer exatamente o que a ficha diz. Foi
 * assim que apareceram dois CEPs errados que o site publicava: a loja do Júlio
 * de Castilho é 79112-000 (o site dizia 79103-531) e a dos Cafezais é
 * 79072-400 (o site dizia 79072-244).
 *
 * Existem seis fichas, não quatro. Nova Lima (R. Zulmira Borba, 510) e União
 * (R. Petrópolis, 1109) têm o mesmo telefone e apontam para este site, mas não
 * estão aqui porque ninguém da operação confirmou que são loja de atendimento.
 * Confirmando, é acrescentar as duas nesta lista e o resto sai sozinho.
 */
export type Loja = {
  slug: string;
  /** nome exatamente como aparece na ficha do Google Meu Negócio */
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

/**
 * Horário das seis fichas do Google, todas iguais. O site vinha anunciando
 * "8h às 18h", meia hora a mais do que a ficha que o cliente vê na busca.
 * Quando divergem, quem manda é a ficha: é ela que leva gente até a porta.
 */
export const HORARIO = 'Segunda a sexta, 7h30 às 17h30 · Sábado, 8h às 12h';
export const ABRE_SEMANA = '07:30';
export const FECHA_SEMANA = '17:30';
export const ABRE_SABADO = '08:00';
export const FECHA_SABADO = '12:00';

export const LOJAS: Loja[] = [
  {
    slug: 'moreninhas',
    nome: 'Internet Mais - Moreninha',
    curto: 'Moreninhas',
    logradouro: 'Rua Palmácia, 836 - Sala 18',
    bairro: 'Vila Moreninha II',
    lat: -20.5521143,
    lng: -54.5775648,
    cep: '79065-140',
    perfilGoogle: 'https://www.google.com/maps?cid=14701824215977406214',
  },
  {
    slug: 'aero-rancho',
    nome: 'Internet Mais - Aero Rancho',
    curto: 'Aero Rancho',
    logradouro: 'Avenida Rachel de Queiroz, 1468',
    bairro: 'Aero Rancho',
    lat: -20.522878,
    lng: -54.644417,
    cep: '79084-070',
    perfilGoogle: 'https://www.google.com/maps?cid=12063422515122150471',
  },
  {
    slug: 'julio-de-castilho',
    nome: 'Internet Mais - Júlio de Castilho',
    curto: 'Júlio de Castilho',
    logradouro: 'Avenida Júlio de Castilho, 1666',
    bairro: 'Vila Alba',
    lat: -20.4539704,
    lng: -54.6453543,
    cep: '79112-000',
    perfilGoogle: 'https://www.google.com/maps?cid=6437051350621266154',
  },
  {
    slug: 'cafezais',
    nome: 'Internet Mais - Cafezais',
    curto: 'Cafezais',
    logradouro: 'Avenida dos Cafezais, 1985 - Loja 06',
    bairro: 'Centro Oeste',
    lat: -20.5477696,
    lng: -54.6124046,
    cep: '79072-400',
    perfilGoogle: 'https://www.google.com/maps?cid=13862508726696103277',
  },
];

export function acharLoja(slug?: string): Loja | undefined {
  return LOJAS.find((l) => l.slug === slug);
}

/** Manda direto para a ficha da loja no Google, não para uma busca por coordenada. */
export function comoChegar(l: Loja): string {
  return l.perfilGoogle ?? `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}`;
}

export function zap(assunto: string): string {
  const texto = `Olá! Gostaria de falar com um representante sobre ${assunto} da InternetMais.`;
  return `https://wa.me/556730272500?text=${encodeURIComponent(texto)}`;
}
