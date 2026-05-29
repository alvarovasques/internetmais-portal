'use client';

import { Tag, Check, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Plano {
  velocidade: string;
  preco: string;
  precoComDesconto?: string;
  temDesconto?: boolean;
  popular: boolean;
  desconto?: string;
  features: string[];
}

export default function MaisAplicativos() {
  const ref = useScrollAnimation();

  const planos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 129,90',
      precoComDesconto: 'R$ 109,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['400 Mbps de velocidade', 'Escolha 1 App Standard', 'Instalação grátis*']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      precoComDesconto: 'R$ 149,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['800 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*']
    },
  ];

  return (
    <section 
      ref={ref} 
      id="mais-aplicativos" 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/mais-aplicativos-hero-Z4vN6cHwGTvB7VMNAX47eT.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down animate-delay-100">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
            <Tag className="text-[#FFD700]" size={24} />
            <span className="text-white font-bold">Mais Aplicativos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Entretenimento em Família
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Escolha seus aplicativos favoritos e aproveite momentos inesquecíveis com a família
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-300">
          {planos.map((plano, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-2xl hover:scale-105 group ${
                plano.popular ? 'md:scale-105 shadow-2xl' : 'shadow-lg'
              }`}
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#003D00] px-4 py-2 rounded-bl-2xl font-bold text-sm animate-bounce z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Background */}
              <div className={`p-8 h-full flex flex-col ${
                plano.popular 
                  ? 'bg-gradient-to-br from-[#009B3A] via-[#00A651] to-[#FFD700]' 
                  : 'bg-gradient-to-br from-[#1A3A1A] to-[#2D5A2D]'
              }`}>
                {/* App Icon */}
                <div className="mb-6">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full opacity-20 animate-pulse"></div>
                    <Tag className="text-[#FFD700] relative z-10" size={32} />
                  </div>
                </div>

                {/* Velocity */}
                <h3 className="text-3xl font-black text-white mb-2">{plano.velocidade}</h3>
                <p className="text-white/60 mb-6 text-sm">de velocidade</p>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/20">
                  {plano.temDesconto && plano.precoComDesconto && (
                    <>
                      <p className="text-white/60 line-through text-sm mb-2">{plano.preco}</p>
                      <p className="text-4xl font-black text-[#FFD700]">{plano.precoComDesconto}</p>
                    </>
                  )}
                  {!plano.temDesconto && (
                    <p className="text-4xl font-black text-[#FFD700]">{plano.preco}</p>
                  )}
                  <p className="text-white/60 text-sm mt-2">por mês</p>
                  {plano.desconto && (
                    <p className="text-[#FFD700] text-xs mt-3 font-semibold">✓ {plano.desconto}</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className="text-[#FFD700] flex-shrink-0 mt-1" />
                      <span className="text-white/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                  plano.popular
                    ? 'bg-white text-[#009B3A] hover:bg-[#FFD700] hover:text-[#003D00] shadow-lg'
                    : 'bg-[#FFD700] text-[#003D00] hover:bg-white shadow-lg'
                }`}>
                  <MessageCircle size={18} />
                  Quero Contratar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up animate-delay-400">
          <p className="text-white/80 mb-4">Veja todos os aplicativos disponíveis</p>
          <a href="#aplicativos" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20">
            <Tag size={18} />
            Explorar Aplicativos
          </a>
        </div>
      </div>
    </section>
  );
}
