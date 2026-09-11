'use client';

import { Zap, Check, MessageCircle, TrendingDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';
import CenaIlustrada from '@/components/CenaIlustrada';

interface Plano {
  velocidade: string;
  preco: string;
  precoComDesconto?: string;
  temDesconto?: boolean;
  popular: boolean;
  features: string[];
}

export default function MaisVelocidade() {
  const ref = useScrollAnimation();
  useViewPlanTracker(ref as React.RefObject<HTMLElement>, {
    section_name: 'MaisVelocidade',
    plan_type: 'Internet + Velocidade',
  });

  const planos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      precoComDesconto: 'R$ 89,90',
      temDesconto: true,
      popular: false,
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 119,90',
      precoComDesconto: 'R$ 99,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: false,
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', 'Ubook', 'Kaspersky']
    },
  ];

  return (
    <section 
      ref={ref} 
      id="mais-velocidade" 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/bg/mais-velocidade-hero.webp)',
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
          <div className="inline-flex items-center gap-3 bg-[#0A1730]/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
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

        <CenaIlustrada
          nome="garoto"
          alt="Garoto jogando videogame com fone de ouvido, conectado por fibra óptica"
          className="mx-auto mb-12 max-w-3xl"
        />

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-300">
          {planos.map((plano, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)] hover:scale-105 ${
                plano.popular ? 'md:scale-105 shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)]' : 'shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)]'
              }`}
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#3DD93D] text-[#04170A] px-4 py-2 rounded-bl-2xl font-bold text-sm z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Background */}
              <div className={`p-8 h-full flex flex-col ${
                plano.popular 
                  ? 'bg-[#0C2313] ring-1 ring-[#3DD93D]' 
                  : 'bg-[#0A1730]'
              }`}>
                {/* Velocity */}
                <h3 className={`text-3xl font-black mb-2 ${'text-[#E8F1E9]'}`}>
                  {plano.velocidade}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  {plano.temDesconto ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm line-through opacity-60 ${'text-[#93A69B]'}`}>
                          {plano.preco}
                        </p>
                        <div className="flex items-center gap-1 bg-[#3DD93D]/15 text-[#8FFF8F] ring-1 ring-[#3DD93D]/40 px-2 py-1 rounded-full text-xs font-bold">
                          <TrendingDown size={12} />
                          -R$ 20
                        </div>
                      </div>
                      <p className={`text-4xl font-black ${'text-[#3DD93D]'}`}>
                        {plano.precoComDesconto}
                      </p>
                      <p className={`text-xs ${'text-[#93A69B]'}`}>
                        ✓ Já com desconto de pontualidade
                      </p>
                    </div>
                  ) : (
                    <p className={`text-4xl font-black ${'text-[#3DD93D]'}`}>
                      {plano.preco}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3 flex-1">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className={'text-[#3DD93D]'} />
                      <span className={`text-sm font-semibold ${'text-[#CBD8CE]'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20Internet%20%2B%20Velocidade.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'Click_Whatsapp',
                        'button_location': `MaisVelocidade - ${plano.velocidade}`,
                        'plan_name': plano.velocidade,
                        'plan_price': plano.precoComDesconto ?? plano.preco,
                        'plan_type': 'Internet + Velocidade'
                      });
                    }
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:scale-105 ${
                    'bg-[#3DD93D] text-[#04170A] hover:bg-[#2BA82A]'
                  }`}
                >
                  <MessageCircle size={18} />
                  Quero Contratar
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-16 text-center text-white/80 text-sm">
          <p>*Sem taxa de instalação. Consulte condições.</p>
        </div>
      </div>
    </section>
  );
}
