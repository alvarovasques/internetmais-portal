import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hero-person-smartphone-Rpr8kr2PaxPu6YGvVXmiU6.webp',
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
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/carousel-velocidade-oBDuwux95MV7uvpUTagvTQ.webp',
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
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/carousel-aplicativos-7WdoKoYAqGqz7gVWf9MGZ2.webp',
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
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/carousel-5g-i9MU3z53kdLKWTBtBNhKrk.webp',
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
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/carousel-empresarial-59j7VzkmoLVCgHYY7e6JQF.webp',
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
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/chip-5g-mockup-nKczXnR3D6rQvEQ4DTpnEm.webp',
      imageAlt: 'Chip 5G InternetMais com melhor sinal e cobertura confiável em Campo Grande MS',
      badge: 'SOMOS UMA OPERADORA 5G',
      title: 'Seu celular merece o melhor sinal. Conheça o Chip InternetMais 5G.',
      description: 'Planos a partir de R$ 24,99/mês com apps ilimitados e bônus ao trazer sua portabilidade.',
      cta: 'Quero meu Chip 5G agora',
      ctaMessage: 'Olá! Gostaria de contratar um plano de Chip 5G da InternetMais.',
      viewPlansLink: '#chip-5g'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
    setAutoplay(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-screen md:h-[600px] overflow-hidden bg-[#0D1B3E]">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((s, index) => (
          <div
            key={`slide-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={s.image}
              alt={s.imageAlt || s.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Overlay Gradient - Alternar entre Azul e Verde */}
            <div
              className={`absolute inset-0 ${
                index % 2 === 0
                  ? 'bg-gradient-to-r from-[#0D1B3E]/90 via-[#0D1B3E]/60 to-transparent'
                  : 'bg-gradient-to-r from-[#3DD93D]/80 via-[#3DD93D]/50 to-transparent'
              }`}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div
                    className={`inline-block mb-4 transition-all duration-700 ${
                      index === currentSlide && !isTransitioning
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <span className="bg-white text-[#0D1B3E] px-4 py-2 rounded-full text-xs md:text-sm font-bold">
                      {s.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight transition-all duration-700 delay-100 ${
                      index === currentSlide && !isTransitioning
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {s.title}
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-base md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
                      index === currentSlide && !isTransitioning
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {s.description}
                  </p>

                  {/* CTA Buttons */}
                  <div
                    className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                      index === currentSlide && !isTransitioning
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== 'undefined' && (window as any).dataLayer) {
                          (window as any).dataLayer.push({
                            'event': 'Click_Whatsapp',
                            'button_location': `HeroSection - Slide ${index + 1}`
                          });
                        }
                        window.open(`https://wa.me/556730272500?text=${encodeURIComponent(s.ctaMessage)}`, '_blank');
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <MessageCircle size={20} />
                      {s.cta}
                    </a>
                    <a
                      href={s.viewPlansLink}
                      onClick={(e) => {
                        e.preventDefault();
                        setAutoplay(true);
                        const element = document.querySelector(s.viewPlansLink);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      Ver Planos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-8 h-3'
                : 'bg-white/50 w-3 h-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 text-white font-bold text-sm md:text-base">
        <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
}
