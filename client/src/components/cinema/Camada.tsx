import type { ReactNode } from 'react';
import { motion, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { useProgressoDaCena } from './Cena';

/**
 * Camada — um plano de profundidade dentro de uma Cena.
 *
 * `profundidade` vai de -1 (fundo, quase parado) a 1 (primeiro plano, que
 * corre na frente). O deslocamento é só transform e opacity, nunca top/margin,
 * porque é o que a GPU compõe sem repintar a página.
 *
 * Com prefers-reduced-motion ligado, ou fora de uma Cena, a Camada vira uma
 * div comum e não custa nada.
 */

type Props = {
  children: ReactNode;
  profundidade?: number;
  /** Deslocamento máximo em pixels no eixo Y, antes de aplicar a profundidade. */
  amplitude?: number;
  /** Aproxima ou afasta levemente ao longo da cena. */
  zoom?: boolean;
  className?: string;
};

export default function Camada({
  children,
  profundidade = 0,
  amplitude = 120,
  zoom = false,
  className = '',
}: Props) {
  const daCena = useProgressoDaCena();
  const parado = useMotionValue(0.5);
  const progresso = daCena ?? parado;
  const semMovimento = useReducedMotion();

  const deslocamento = amplitude * profundidade;
  const y = useTransform(progresso, [0, 1], [deslocamento, -deslocamento]);
  const escala = useTransform(progresso, [0, 0.5, 1], [1.06, 1, 1.06]);

  if (semMovimento || !daCena) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ y, scale: zoom ? escala : 1, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
