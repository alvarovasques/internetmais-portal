import type { ReactNode } from 'react';

/**
 * Painel — a superfície onde o conteúdo pousa sobre o Palco.
 *
 * O site inteiro passa a flutuar sobre o fundo contínuo, então cada bloco
 * precisa de uma superfície própria para o texto não brigar com a luz que passa
 * por trás. Duas variantes, e a escolha entre elas é sobre leitura, não estética:
 *
 * - `vidro`: escuro e translúcido. Para blocos de discurso, imagem e chamada.
 *   Texto branco sobre ele passa de 12:1 de contraste.
 * - `claro`: quase branco e opaco. Para preço, tabela, formulário e FAQ, onde
 *   o usuário lê números e não pode ter o fundo se mexendo atrás da letra.
 *
 * Não use `vidro` atrás de tabela de preço. O blur custa caro em Android
 * intermediário e a legibilidade cai justo onde a conversão acontece.
 */

type Props = {
  children: ReactNode;
  variante?: 'vidro' | 'claro' | 'nenhuma';
  className?: string;
};

const VARIANTES = {
  vidro:
    'bg-[#0B1730]/72 backdrop-blur-xl border border-white/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.75)]',
  claro:
    'bg-[#F7F9FC] border border-[#DDE3EE] shadow-[0_24px_80px_-30px_rgba(7,14,34,0.55)]',
  nenhuma: '',
} as const;

export default function Painel({ children, variante = 'vidro', className = '' }: Props) {
  return (
    <div className={`relative rounded-3xl ${VARIANTES[variante]} ${className}`}>
      {children}
    </div>
  );
}
