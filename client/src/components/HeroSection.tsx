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
      image: '/images/bg/hero-person-smartphone.webp',
      imageAlt: 'Pessoa segurando smartphone com fibra óptica 100% pura e chip 5G em Campo Grande',
      badge: 'FIBRA ÓPTICA + CHIP 5G',
      title: 'Fibra Óptica + Chip 5G. Tudo o que você precisa em um só lugar.',
      description: 'Mais de 20 mil clientes em Campo Grande. 100% fibra óptica com rede própria, infraestrutura e suporte local. E agora, somos também sua operadora de celular 5G.',
      cta: 'Quero Contratar Agora',
      ctaMessage: 'Olá! Gostaria de contratar um plano de Fibra Óptica + Chip 5G da InternetMais.',
      viewPlansLink: '#planos-residenciais'
    },
    {
      id: 2,
      image: '/images/bg/carousel-velocidade.webp',
      imageAlt: 'Internet fibra óptica de máxima velocidade com latência ultra-baixa em Campo Grande',
      badge: 'MÁXIMA VELOCIDADE',
      title: 'Internet Mais Velocidade',
      description: 'Navegue, trabalhe e jogue com a velocidade máxima. Fibra óptica dedicada com latência ultra-baixa para a melhor experiência.',
      cta: 'Conhecer Planos',
      ctaMessage: 'Olá! Gostaria de saber mais sobre os planos de Internet Mais Velocidade.',
      viewPlansLink: '#planos-residenciais'
    },
    {
      id: 3,
      image: '/images/bg/carousel-aplicativos.webp',
      imageAlt: 'Família assistindo streaming com internet fibra e aplicativos inclusos InternetMais',
      badge: 'TEMPO EM FAMÍLIA',
      title: 'Internet Mais Aplicativos',
      description: 'Aproveite os melhores aplicativos e serviços de streaming com sua família. Qualidade 4K, sem travamentos, sem limites.',
      cta: 'Ver Aplicativos',
      ctaMessage: 'Olá! Gostaria de contratar Internet Mais Aplicativos com meus apps favoritos.',
      viewPlansLink: '#aplicativos'
    },
    {
      id: 4,
      image: '/images/bg/carousel-5g.webp',
      imageAlt: 'Chip 5G InternetMais com conectividade móvel de próxima geração em Campo Grande',
      badge: 'OPERADORA 5G',
      title: 'Telefonia com Chip 5G',
      description: 'Conectividade móvel de próxima geração. Velocidade ultra-rápida, cobertura confiável e planos flexíveis para você.',
      cta: 'Contratar Chip 5G',
      ctaMessage: 'Olá! Gostaria de falar com um representante sobre os planos de Chip 5G da InternetMais.',
      viewPlansLink: '#chip-5g'
    },
    {
      id: 5,
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
      image: '/images/bg/chip-5g-mockup.webp',
      imageAlt: 'Chip 5G InternetMais com melhor sinal e cobertura confiável em Campo Grande MS',
      badge: 'SOMOS UMA OPERADORA 5G',
      title: 'Seu celular merece o melhor sinal. Conheça o Chip InternetMais 5G.',
      description: 'Planos a partir de R$ 24,99/mês com apps ilimitados e bônus ao trazer sua portabilidade.',
      cta: 'Quero meu Chip 5G agora',
      ctaMessage: 'Olá! Gostaria de contratar um plano de Chip 5G da InternetMais.',
      viewPlansLink: '#chip-5g'
    },
    {
      id: 7,
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
      className="relative z-10 w-full min-h-[92vh] overflow-hidden"
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
            <img
              src={slide.image}
              alt={slide.imageAlt || slide.title}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Atmosfera: escurece à esquerda para o título respirar, e deixa a
              luz do Palco vazar pela direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070E22] via-[#070E22]/80 to-[#070E22]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070E22] via-transparent to-[#070E22]/45" />
        </motion.div>
      </AnimatePresence>

      {/* Plano do texto: o mais próximo da câmera */}
      <motion.div
        className="relative z-20 flex min-h-[92vh] items-center"
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

                <h1 className="mb-5 text-4xl font-black leading-[1.05] text-white md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>

                <p className="mb-9 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
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

      <div className="absolute right-4 top-24 z-30 text-sm font-bold text-white/70 md:right-8 md:top-28">
        <span className="tabular-nums">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-1 text-white/30">/</span>
        <span className="tabular-nums text-white/40">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
