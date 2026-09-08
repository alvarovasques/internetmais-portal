import type { ReactNode } from 'react';
import Cena from './Cena';

/**
 * Faixa — como cada seção do site pousa sobre o Palco.
 *
 * Duas formas, e a escolha entre elas é sobre leitura, não sobre estética:
 *
 * - `plena`: sangra de ponta a ponta e não tem fundo próprio, então o Palco
 *   aparece por trás. Para as seções que já são escuras e de imagem.
 * - `clara`: a seção vira um painel arredondado flutuando sobre o Palco, com
 *   folga nas laterais. O fundo claro e o texto escuro de dentro continuam
 *   intactos, então preço, tabela e FAQ não perdem contraste. É por isso que
 *   nada aqui vira transparente: contraste de texto sobre fundo que se mexe é
 *   onde esse tipo de layout costuma quebrar.
 *
 * O clip arredondado vem do wrapper, então nenhum dos 14 componentes de seção
 * precisou ser tocado por dentro.
 */

type Props = {
  children: ReactNode;
  variante?: 'plena' | 'clara';
  id?: string;
  className?: string;
};

export default function Faixa({ children, variante = 'plena', id, className = '' }: Props) {
  if (variante === 'clara') {
    return (
      <Cena id={id} className={`px-3 py-3 md:px-6 md:py-5 lg:px-10 ${className}`}>
        <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[1.75rem] shadow-[0_40px_120px_-45px_rgba(0,0,0,0.9)] ring-1 ring-white/10 md:rounded-[2.5rem]">
          {children}
        </div>
      </Cena>
    );
  }

  return (
    <Cena id={id} className={className}>
      {children}
    </Cena>
  );
}
