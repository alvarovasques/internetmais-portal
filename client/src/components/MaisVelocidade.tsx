'use client';

import { Zap, Check, MessageCircle } from 'lucide-react';
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

export default function MaisVelocidade() {
  const ref = useScrollAnimation();

  const planos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      precoComDesconto: 'R$ 89,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 119,90',
      precoComDesconto: 'R$ 99,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
  ];

  return (
    <section 
      ref={ref} 
      id="mais-velocidade" 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/mais-velocidade-hero-MNxH6KsSpwRBDf3UnRhCAs.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down animate-delay-100">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
            <Zap className="text-[#00D9FF]" size={24} />
            <span className="text-white font-bold">Mais Velocidade</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Velocidade para Gamers e Profissionais
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Conexão ultra-rápida para gaming, streaming e trabalho remoto sem interrupções
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
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] text-white px-4 py-2 rounded-bl-2xl font-bold text-sm animate-bounce z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Background */}
              <div className={`p-8 h-full flex flex-col ${
                plano.popular 
                  ? 'bg-gradient-to-br from-[#0099FF] via-[#0066CC] to-[#003D99]' 
                  : 'bg-gradient-to-br from-[#1A1A2E] to-[#16213E]'
              }`}>
                {/* Velocity Icon */}
                <div className="mb-6">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#0099FF] rounded-full opacity-20 animate-pulse"></div>
                    <Zap className="text-[#00D9FF] relative z-10" size={32} />
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
                      <p className="text-4xl font-black text-[#00D9FF]">{plano.precoComDesconto}</p>
                    </>
                  )}
                  {!plano.temDesconto && (
                    <p className="text-4xl font-black text-[#00D9FF]">{plano.preco}</p>
                  )}
                  <p className="text-white/60 text-sm mt-2">por mês</p>
                  {plano.desconto && (
                    <p className="text-[#00D9FF] text-xs mt-3 font-semibold">✓ {plano.desconto}</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className="text-[#00D9FF] flex-shrink-0 mt-1" />
                      <span className="text-white/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                  plano.popular
                    ? 'bg-white text-[#0099FF] hover:bg-[#00D9FF] hover:text-[#003D99] shadow-lg'
                    : 'bg-[#00D9FF] text-[#003D99] hover:bg-white shadow-lg'
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
          <p className="text-white/80 mb-4">Dúvidas sobre qual plano escolher?</p>
          <a href="https://wa.me/556730272500" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20">
            <MessageCircle size={18} />
            Fale com nosso time
          </a>
        </div>
      </div>
    </section>
  );
}
