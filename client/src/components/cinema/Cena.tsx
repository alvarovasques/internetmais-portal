import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

/**
 * Cena — uma seção da página que conhece a própria posição na rolagem.
 *
 * Publica um progresso de 0 a 1 para os filhos: 0 quando o topo da seção
 * encosta na base da janela, 1 quando a base da seção sai pelo topo. As
 * Camadas de dentro se movem em cima desse valor, então tudo numa mesma cena
 * fica sincronizado sem cada componente ouvir o scroll por conta própria.
 */

const ContextoDaCena = createContext<MotionValue<number> | null>(null);

export function useProgressoDaCena(): MotionValue<number> | null {
  return useContext(ContextoDaCena);
}

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Marca a seção como landmark de navegação, quando ela tem um título próprio. */
  rotulo?: string;
};

export default function Cena({ children, className = '', id, rotulo }: Props) {
  const referencia = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ['start end', 'end start'],
  });

  return (
    <ContextoDaCena.Provider value={scrollYProgress}>
      <div
        ref={referencia}
        id={id}
        aria-label={rotulo}
        className={`relative z-10 ${className}`}
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      >
        {children}
      </div>
    </ContextoDaCena.Provider>
  );
}
