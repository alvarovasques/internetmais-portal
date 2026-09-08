import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Revelar — a entrada de um bloco quando ele aparece na tela.
 *
 * Sobe um pouco, ganha opacidade e endireita uma inclinação de 3D bem discreta.
 * Roda uma vez só (`once`), porque conteúdo que re-anima toda vez que você
 * volta a rolar cansa e atrapalha quem está lendo preço.
 *
 * A margem negativa de -80px faz a animação começar antes de o bloco encostar
 * na borda: quando o usuário chega nele, já está pronto.
 */

type Props = {
  children: ReactNode;
  /** Atraso em segundos, para escalonar itens de uma lista. */
  atraso?: number;
  /** 'baixo' | 'esquerda' | 'direita' | 'profundidade' */
  origem?: 'baixo' | 'esquerda' | 'direita' | 'profundidade';
  className?: string;
};

const ORIGENS = {
  baixo: { y: 34, x: 0, rotateX: 6 },
  esquerda: { y: 0, x: -40, rotateX: 0 },
  direita: { y: 0, x: 40, rotateX: 0 },
  profundidade: { y: 18, x: 0, rotateX: 14 },
} as const;

export default function Revelar({
  children,
  atraso = 0,
  origem = 'baixo',
  className = '',
}: Props) {
  const semMovimento = useReducedMotion();
  if (semMovimento) return <div className={className}>{children}</div>;

  const de = ORIGENS[origem];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...de }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
