import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Palco — o fundo contínuo do site.
 *
 * Fica fixo atrás de tudo e nunca reinicia entre as seções: é ele que dá a
 * sensação de um espaço só, em vez de blocos empilhados. Três coisas moram aqui:
 *
 * 1. o campo de profundidade (navy com focos de luz que derivam devagar);
 * 2. o fio de fibra que atravessa a página inteira e vai sendo desenhado
 *    conforme a rolagem, com um pulso de luz correndo por ele;
 * 3. a granulação, que tira o aspecto de degradê digital chapado.
 *
 * Nada aqui recebe clique: é tudo pointer-events-none, z-index 0, e o conteúdo
 * do site vive acima.
 */

const GRAO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='r'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23r)' opacity='0.45'/%3E%3C/svg%3E\")";

export default function Palco() {
  const semMovimento = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Mola suave: sem ela o fio "pula" a cada tique da roda do mouse.
  const progresso = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const traco = useTransform(progresso, (v) => (semMovimento ? 1 : v));
  const pulso = useTransform(progresso, [0, 1], [0, -1]);

  // Os focos de luz reagem à rolagem em velocidades diferentes: é isso que
  // cria a percepção de distância entre eles.
  const luzLonge = useTransform(progresso, [0, 1], ['0%', '-12%']);
  const luzPerto = useTransform(progresso, [0, 1], ['0%', '-34%']);
  const brilho = useTransform(progresso, [0, 0.5, 1], [0.55, 0.9, 0.5]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070E22]"
      >
      {/* Campo de profundidade */}
      <motion.div
        style={{ y: semMovimento ? 0 : luzLonge }}
        className="absolute inset-x-0 -top-[20%] h-[140%]"
      >
        <div
          className="absolute left-[-10%] top-[8%] h-[62vh] w-[62vh] rounded-full opacity-70 blur-[110px]"
          style={{ background: 'radial-gradient(circle, #1A5BA6 0%, transparent 68%)' }}
        />
        <div
          className="absolute right-[-14%] top-[52%] h-[70vh] w-[70vh] rounded-full opacity-45 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #0D2E5E 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.div
        style={{ y: semMovimento ? 0 : luzPerto, opacity: semMovimento ? 0.6 : brilho }}
        className="absolute inset-x-0 top-0 h-[160%]"
      >
        <div
          className="absolute left-[38%] top-[30%] h-[46vh] w-[46vh] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(61,217,61,0.18) 0%, transparent 66%)' }}
        />
        <div
          className="absolute left-[12%] top-[76%] h-[38vh] w-[38vh] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(61,217,61,0.12) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Granulação */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAO, backgroundRepeat: 'repeat' }}
      />
      </div>

      {/*
        O fio contínuo mora numa camada própria, acima do conteúdo e abaixo do
        Header. É de propósito: ele precisa atravessar também as seções de
        fundo cheio, senão deixa de ser contínuo e vira enfeite de intervalo.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-40 w-[120px] md:w-[190px]"
      >
  <svg
    className="absolute inset-y-0 left-0 h-full w-[120px] md:w-[190px]"
    viewBox="0 0 190 1000"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M52 0 C 120 160, 8 300, 74 460 C 132 604, 20 720, 88 880 C 122 950, 96 980, 84 1000"
      stroke="rgba(7,14,34,0.22)"
      strokeWidth="6"
    />
    <path
      d="M52 0 C 120 160, 8 300, 74 460 C 132 604, 20 720, 88 880 C 122 950, 96 980, 84 1000"
      stroke="rgba(255,255,255,0.07)"
      strokeWidth="1.5"
    />
    <motion.path
      d="M52 0 C 120 160, 8 300, 74 460 C 132 604, 20 720, 88 880 C 122 950, 96 980, 84 1000"
      stroke="#3DD93D"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ pathLength: traco, opacity: 0.72 }}
    />
    <motion.path
      d="M52 0 C 120 160, 8 300, 74 460 C 132 604, 20 720, 88 880 C 122 950, 96 980, 84 1000"
      stroke="#B6FFB6"
      strokeWidth="3"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray="0.035 0.965"
      style={{ strokeDashoffset: semMovimento ? 0 : pulso, opacity: semMovimento ? 0 : 0.9 }}
    />
  </svg>
      </div>
    </>
  );
}
