import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, MessageCircle, Tv } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * HeroSection — a primeira cena.
 *
 * A troca de slide não é mais um crossfade: o quadro que sai recua e desfoca,
 * o que entra vem de trás e assenta. Isso e o paralaxe entre a imagem, a
 * atmosfera e o texto são o que dá a profundidade; nenhuma biblioteca 3D é
 * carregada para isso, só transform e opacity, que a GPU compõe sem repintar.
 *
 * O conteúdo dos 7 slides, os links, o número do WhatsApp e os eventos de
 * dataLayer são os mesmos de antes. O que mudou é como eles aparecem.
 *
 * Com prefers-reduced-motion a cena vira um fade simples e o autoplay para:
 * carrossel que anda sozinho é um problema de acessibilidade conhecido, e quem
 * pediu menos movimento não deveria ter que correr atrás do texto.
 */
/**
 * As duas cores de véu.
 *
 * Sete quadros com exatamente a mesma máscara dão monotonia, então ela
 * alterna. O que ela NÃO pode ser é o verde da marca: véu em #3DD93D derruba
 * o contraste do botão de 10,2:1 para 1:1 — o botão deixa de existir — e o do
 * título de 19:1 para 1,88:1. Verde aqui é a cor de AÇÃO, e área grande em
 * verde rouba o destaque do único elemento que devia tê-lo.
 *
 * O verde escuro resolve: lê como mudança de clima, e o botão mantém 9,7:1
 * contra ele, praticamente o mesmo do navy.
 */
const VEUS = {
  navy: '7,14,34',
  verde: '6,25,15',
} as const;

type Veu = keyof typeof VEUS;

/** Os três gradientes do quadro, na cor daquele slide. */
function atmosfera(veu: Veu) {
  const c = VEUS[veu];
  return {
    // Celular: o texto fica sobre o meio da foto, então o véu sobe de baixo.
    movel: `linear-gradient(to top, rgba(${c},.90) 0%, rgba(${c},.55) 42%, rgba(${c},.15) 100%)`,
    // Desktop: cobre só a coluna do texto e morre antes dos 60% da largura.
    coluna: `linear-gradient(to right, rgba(${c},.86) 0%, rgba(${c},.70) 18%, rgba(${c},.32) 42%, rgba(${c},0) 58%)`,
    base: `linear-gradient(to top, rgba(${c},.55) 0%, rgba(${c},0) 38%, rgba(${c},.10) 100%)`,
  };
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direcao, setDirecao] = useState(1);
  const semMovimento = useReducedMotion();
  const palco = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: palco,
    offset: ['start start', 'end start'],
  });
  // A cena afunda enquanto a página sobe por cima dela.
  const yFundo = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const opacidadeTexto = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const escalaFundo = useTransform(scrollYProgress, [0, 1], [1, 1.16]);

  const slides = [
    {
      id: 1,
      veu: 'navy' as Veu,
      image: '/images/bg/hero-person-smartphone.webp',
      imageAlt: 'Pessoa segurando smartphone com fibra óptica 100% pura e chip 5G em Campo Grande',
      badge: 'FIBRA ÓPTICA + CHIP 5G',
      title: 'Fibra Óptica + Chip 5G. Tudo o que você precisa em um só lugar.',
      description: 'Mais de 20 mil clientes em Campo Grande. 100% fibra óptica com rede própria, infraestrutura e suporte local. E agora, somos também sua operadora de celular 5G.',
      cta: 'Quero Contratar Agora',
      ctaMessage: 'Olá! Gostaria de contratar um plano de Fibra Óptica + Chip 5G da Internet Mais.',
      // "Ver Planos" apontava para #chip-5g: quem clicava querendo plano de
      // fibra caía na tabela de GB e minutos de voz. Os planos de fibra ficam
      // em #mais-velocidade.
      viewPlansLink: '#mais-velocidade'
    },
    {
      id: 2,
      veu: 'verde' as Veu,
      image: '/images/bg/carousel-velocidade.webp',
      imageAlt: 'Internet fibra óptica de máxima velocidade com latência ultra-baixa em Campo Grande',
      badge: 'MÁXIMA VELOCIDADE',
      title: 'Internet Mais Velocidade',
      description: 'Navegue, trabalhe e jogue com a velocidade máxima. Fibra óptica dedicada com latência ultra-baixa para a melhor experiência.',
      cta: 'Conhecer Planos',
      ctaMessage: 'Olá! Gostaria de saber mais sobre os planos de Internet Mais Velocidade.',
      viewPlansLink: '#mais-velocidade'
    },
    {
      id: 3,
      veu: 'navy' as Veu,
      image: '/images/bg/carousel-aplicativos.webp',
      imageAlt: 'Família assistindo streaming com internet fibra e aplicativos inclusos Internet Mais',
      badge: 'TEMPO EM FAMÍLIA',
      title: 'Internet Mais Aplicativos',
      description: 'Aproveite os melhores aplicativos e serviços de streaming com sua família. Qualidade 4K, sem travamentos, sem limites.',
      cta: 'Quero o Mais Aplicativos',
      ctaMessage: 'Olá! Gostaria de contratar Internet Mais Aplicativos com meus apps favoritos.',
      viewPlansLink: '#mais-aplicativos'
    },
    {
      id: 4,
      veu: 'verde' as Veu,
      image: '/images/bg/carousel-5g.webp',
      imageAlt: 'Chip 5G Internet Mais com conectividade móvel de próxima geração em Campo Grande',
      badge: 'OPERADORA 5G',
      title: 'Telefonia com Chip 5G',
      description: 'Conectividade móvel de próxima geração. Velocidade ultra-rápida, cobertura confiável e planos flexíveis para você.',
      cta: 'Contratar Chip 5G',
      ctaMessage: 'Olá! Gostaria de falar com um representante sobre os planos de Chip 5G da Internet Mais.',
      viewPlansLink: '#chip-5g'
    },
    {
      id: 5,
      veu: 'navy' as Veu,
      image: '/images/bg/carousel-empresarial.webp',
      imageAlt: 'Internet empresarial com estabilidade garantida para negócios em Campo Grande',
      badge: 'PARA EMPRESAS',
      title: 'Internet Empresarial',
      description: 'Estabilidade garantida. Soluções robustas para impulsionar seu negócio.',
      cta: 'Solicitar Orçamento',
      ctaMessage: 'Olá! Gostaria de falar com um representante sobre soluções de internet empresarial.',
      viewPlansLink: '#empresarial'
    },
    {
      id: 6,
      veu: 'verde' as Veu,
      image: '/images/bg/chip-5g-mockup.webp',
      imageAlt: 'Chip 5G Internet Mais com melhor sinal e cobertura confiável em Campo Grande MS',
      badge: 'SOMOS UMA OPERADORA 5G',
      title: 'Seu celular merece o melhor sinal. Conheça o Chip Internet Mais 5G.',
      description: 'Planos a partir de R$ 24,99/mês com apps ilimitados e bônus ao trazer sua portabilidade.',
      cta: 'Quero meu Chip 5G agora',
      ctaMessage: 'Olá! Gostaria de contratar um plano de Chip 5G da Internet Mais.',
      viewPlansLink: '#chip-5g'
    },
    {
      id: 7,
      veu: 'navy' as Veu,
      image: '/images/bg/maistv-hero-bg.jpg',
      imageAlt: 'Família assistindo MaisTV com +160 canais ao vivo e filmes inclusos na Internet Mais',
      badge: 'INCLUSO EM TODOS OS PLANOS',
      title: 'Assine internet. Ganhe uma TV completa.',
      description: 'Todos os planos Internet Mais já incluem a MaisTV: +160 canais ao vivo + catálogo de filmes e séries. R$0 adicional.',
      cta: 'Quero assinar agora',
      ctaMessage: 'Olá! Gostaria de assinar a Internet Mais e ter acesso à MaisTV com +160 canais ao vivo.',
      viewPlansLink: '/maistv'
    }
  ];
  // Autoplay: para sozinho quando o usuário pede menos movimento, quando a aba
  // sai de foco e assim que ele toca em qualquer controle.
  useEffect(() => {
    if (!autoplay || semMovimento) return;
    const intervalo = setInterval(() => {
      setDirecao(1);
      setCurrentSlide((anterior) => (anterior + 1) % slides.length);
    }, 7000);
    return () => clearInterval(intervalo);
  }, [autoplay, semMovimento, slides.length]);

  useEffect(() => {
    const aoTrocarVisibilidade = () => {
      if (document.hidden) setAutoplay(false);
    };
    document.addEventListener('visibilitychange', aoTrocarVisibilidade);
    return () => document.removeEventListener('visibilitychange', aoTrocarVisibilidade);
  }, []);

  const irPara = (indice: number, sentido: number) => {
    setDirecao(sentido);
    setCurrentSlide((indice + slides.length) % slides.length);
    setAutoplay(false);
  };

  const nextSlide = () => irPara(currentSlide + 1, 1);
  const prevSlide = () => irPara(currentSlide - 1, -1);
  const goToSlide = (indice: number) => irPara(indice, indice > currentSlide ? 1 : -1);

  const [, navigate] = useLocation();
  const slide = slides[currentSlide];

  // A transição: sai recuando e desfocando, entra de trás e assenta.
  const variantes = {
    entrada: (sentido: number) => ({
      opacity: 0,
      scale: 1.12,
      x: sentido * 60,
      filter: 'blur(14px)',
    }),
    ativo: { opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' },
    saida: (sentido: number) => ({
      opacity: 0,
      scale: 0.94,
      x: sentido * -60,
      filter: 'blur(14px)',
    }),
  };

  const transicao = { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const };

  const abrirWhatsapp = (mensagem: string, indice: number) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'Click_Whatsapp',
        button_location: `HeroSection - Slide ${indice + 1}`,
      });
    }
    window.open(`https://wa.me/556730272500?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  return (
    <section
      ref={palco}
      aria-roledescription="carrossel"
      aria-label="Destaques da Internet Mais"
      className="relative z-10 -mt-[104px] w-full min-h-[100svh] overflow-hidden md:-mt-[120px]"
      style={{ perspective: '1400px' }}
    >
      <AnimatePresence initial={false} custom={direcao} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direcao}
          variants={semMovimento ? undefined : variantes}
          initial={semMovimento ? { opacity: 0 } : 'entrada'}
          animate={semMovimento ? { opacity: 1 } : 'ativo'}
          exit={semMovimento ? { opacity: 0 } : 'saida'}
          transition={semMovimento ? { duration: 0.3 } : transicao}
          className="absolute inset-0"
        >
          {/* Plano de fundo: o mais distante, e por isso o que menos se move */}
          <motion.div
            className="absolute inset-0"
            style={
              semMovimento ? undefined : { y: yFundo, scale: escalaFundo, willChange: 'transform' }
            }
          >
            {/* `object-left` e não `object-center`.

                A imagem é 16:9 e a cena ocupa 100svh, então em tela 16:10 (o
                1440x900 de qualquer notebook) sobra largura e o navegador
                corta: centralizado, comia 80px de cada lado — e os 80px da
                esquerda são justamente onde o título começa. Ancorando à
                esquerda, o corte inteiro sai pela direita, que é a borda sem
                conteúdo.

                O preço: o assunto não pode encostar na borda direita. Os 10%
                externos do quadro são margem de segurança, e é por isso que o
                briefing pede o assunto no terço direito, não colado na beira.

                No celular é o contrário: a tela é estreita e alta, sobra ALTURA
                e o corte vem pelos lados com força — ancorado à esquerda, o
                visitante via só a estante e a TV, sem ninguém. Lá fica
                centralizado, que é onde a cena tem gente. */}
            <img
              src={slide.image}
              alt={slide.imageAlt || slide.title}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              className="h-full w-full object-cover object-center md:object-left"
            />
          </motion.div>

          {/* Atmosfera. A cor vem do slide: ver VEUS lá em cima.

              O véu existe para o título ser legível, não para esconder a foto.
              O anterior chegava a 100% de navy na borda esquerda e ainda 80% no
              meio do quadro: media 16:1 de contraste, três vezes o que a norma
              pede, e apagava a cena inteira. Agora cobre só a coluna do texto e
              morre antes dos 60% da largura, dando 6,5:1 com o brilho do quadro
              dobrado.

              No celular o texto não fica à esquerda, fica sobre o meio da foto:
              ali o véu sobe de baixo, que é por onde o conteúdo entra. */}
          <div className="absolute inset-0 md:hidden" style={{ backgroundImage: atmosfera(slide.veu).movel }} />
          <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: atmosfera(slide.veu).coluna }} />
          <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: atmosfera(slide.veu).base }} />
        </motion.div>
      </AnimatePresence>

      {/* Plano do texto: o mais próximo da câmera */}
      <motion.div
        className="relative z-20 flex min-h-[100svh] items-center pt-[104px] md:pt-[120px]"
        style={semMovimento ? undefined : { y: yTexto, opacity: opacidadeTexto }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl md:pl-12 lg:pl-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={semMovimento ? { opacity: 0 } : { opacity: 0, y: 26, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={semMovimento ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="mb-5 inline-block rounded-full border border-[#3DD93D]/40 bg-[#3DD93D]/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8CF08C] backdrop-blur-sm md:text-sm">
                  {slide.badge}
                </span>

                <h1 className="mb-5 text-4xl font-black leading-[1.06] text-white [text-shadow:0_2px_14px_rgba(3,8,20,.75)] md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mb-9 max-w-xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_10px_rgba(3,8,20,.8)] md:text-lg">
                  {slide.description}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => abrirWhatsapp(slide.ctaMessage, currentSlide)}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#3DD93D] px-7 font-bold text-[#062A06] shadow-[0_10px_40px_-10px_rgba(61,217,61,0.8)] transition-all duration-300 hover:bg-[#54e854] hover:shadow-[0_14px_50px_-8px_rgba(61,217,61,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <MessageCircle size={20} />
                    {slide.cta}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoplay(true);
                      if (slide.viewPlansLink.startsWith('/')) {
                        navigate(slide.viewPlansLink);
                      } else {
                        document
                          .querySelector(slide.viewPlansLink)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/35 px-7 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {slide.viewPlansLink.startsWith('/') ? <Tv size={18} /> : null}
                    {slide.viewPlansLink.startsWith('/') ? 'Conhecer a MaisTV' : 'Ver Planos'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Controles */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Destaque anterior"
        className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:left-8"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Próximo destaque"
        className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-8"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores: cada um com 44px de área de toque, mesmo parecendo menor */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-1">
        {slides.map((s, indice) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goToSlide(indice)}
            aria-label={`Ir para o destaque ${indice + 1}: ${s.title}`}
            aria-current={indice === currentSlide}
            className="group flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                indice === currentSlide
                  ? 'w-8 bg-[#3DD93D]'
                  : 'w-4 bg-white/35 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="absolute right-4 top-24 z-30 rounded-full bg-[#070E22]/90 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm md:right-8 md:top-28">
        <span className="tabular-nums">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-1 text-white/55" aria-hidden="true">/</span>
        <span className="tabular-nums text-white/75">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
