'use client';

import { Tv, Check, MessageCircle, Star, Film, Clapperboard } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';
import CenaIlustrada from '@/components/CenaIlustrada';

interface App {
  name: string;
  logo: string;
}

interface Plano {
  velocidade: string;
  preco: string;
  precoComDesconto?: string;
  temDesconto?: boolean;
  popular: boolean;
  appsStandard?: number;
  appsPremium?: number;
  features: string[];
}

export default function MaisGloboPlay() {
  const ref = useScrollAnimation();
  useViewPlanTracker(ref as React.RefObject<HTMLElement>, {
    section_name: 'MaisGloboPlay',
    plan_type: 'Internet + GloboPlay',
  });

  // Apps Standard
  const appsStandard: App[] = [
    { name: 'Ubook Plus', logo: '/images/apps/ubook-plus.png' },
    { name: 'Zen', logo: '/images/apps/zen.png' },
    { name: 'Leitura 360', logo: '/images/apps/leitura-360.png' },
    { name: 'Estuda+', logo: '/images/apps/estuda-mais.png' },
    { name: 'Pequenos Leitores', logo: '/images/apps/pequenos-leitores.png' },
    { name: 'O Jornalista', logo: '/images/apps/o-jornalista.png' },
    { name: 'Playlist', logo: '/images/apps/playlist.png' },
    { name: 'Kiddle Pass', logo: '/images/apps/kiddle-pass.png' },
    { name: 'PlayKids+', logo: '/images/apps/playkids-plus.png' },
    { name: 'Sky+ Light', logo: '/images/apps/sky-plus-light.png' },
    { name: 'Deezer', logo: '/images/apps/deezer.png' },
    { name: 'Social Comics', logo: '/images/apps/social-comics.png' },
    { name: 'Kaspersky Standard (3 lic.)', logo: '/images/apps/kaspersky-standard.png' },
    { name: 'Qnutri', logo: '/images/apps/qnutri.png' },
    { name: 'Looke', logo: '/images/apps/looke.png' },
    { name: 'Curtaon', logo: '/images/apps/curtaon.png' },
    { name: 'Revistaria', logo: '/images/apps/revistaria.png' },
    { name: 'Fluid', logo: '/images/apps/fluid.png' },
    { name: 'Hub Vantagens', logo: '/images/apps/hub-vantagens.png' },
  ];

  // Apps Premium
  const appsPremiumList: App[] = [
    { name: 'Smart Content', logo: '/images/apps/smart-content.png' },
    { name: 'Ritual Fit', logo: '/images/apps/ritual-fit.png' },
    { name: 'Kaspersky Plus (5 licenças)', logo: '/images/apps/kaspersky-plus.png' },
    { name: 'Docway', logo: '/images/apps/docway.png' },
    { name: 'HotGo', logo: '/images/apps/hotgo.png' },
    { name: 'Queima Diária', logo: '/images/apps/queima-diaria.png' },
    { name: 'HBO Max', logo: '/images/apps/hbo-max.png' },
    { name: 'Disney+', logo: '/images/apps/disney-plus.png' },
  ];

  const diferenciais = [
    'Todo o conteúdo sem anúncios — filmes, séries e shows exclusivos',
    'Catálogo completo de filmes e séries nacionais e internacionais',
    'Até 5 perfis — 1 titular + 4 adicionais — cada um com experiência personalizada',
    'Baixe e assista offline onde quiser',
    'Assista em até 5 telas simultâneas',
    'Resolução Full HD e 4K',
  ];

  const planos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: false,
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', ...diferenciais]
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 169,90',
      precoComDesconto: 'R$ 149,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', ...diferenciais]
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 189,90',
      precoComDesconto: 'R$ 169,90',
      temDesconto: true,
      popular: false,
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (+160 canais)', ...diferenciais]
    },
  ];


  return (
    <section
      ref={ref}
      id="mais-globoplay"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0a14 0%, #12071a 40%, #0d0a1f 70%, #0a0a14 100%)',
      }}
    >
      {/* Decoração: linhas de película de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Faixa lateral esquerda estilo película */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col gap-3 py-4 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-full h-5 bg-[#0A1730] rounded-sm flex-shrink-0" />
          ))}
        </div>
        {/* Faixa lateral direita estilo película */}
        <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col gap-3 py-4 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-full h-5 bg-[#0A1730] rounded-sm flex-shrink-0" />
          ))}
        </div>
        {/* Brilho central suave */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #e50914 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-down animate-delay-100">
          <div className="inline-flex items-center gap-3 bg-[#0A1730]/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
            <Clapperboard className="text-[#e50914]" size={22} />
            <span className="text-white font-bold">Mais GloboPlay</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Cinema em Casa, Todo Dia
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Filmes, séries e conteúdo exclusivo com GloboPlay — assista quando e onde quiser
          </p>
        </div>

        {/* Badge descritivo */}
        <div className="text-center mb-10">
          <p className="text-red-300 text-sm font-semibold">
            <Film size={14} className="inline mr-1" />
            GloboPlay Premium incluso — filmes, séries e conteúdo exclusivo sem anúncios
          </p>
        </div>

        <CenaIlustrada
          nome="familia"
          alt="Família reunida no sofá assistindo à televisão"
          className="mx-auto mb-12 max-w-3xl"
        />

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-300">
          {planos.map((plano, i) => (
            <div
              key={plano.velocidade}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)] hover:scale-105 ${
                plano.popular ? 'md:scale-105 shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)]' : 'shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)]'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#3DD93D] text-[#04170A] px-4 py-2 rounded-bl-2xl font-bold text-sm z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Barra superior — tema cinema (vermelho) */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#e50914] to-[#8b0000]" />

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

                {/* Price
                    Mesmo tratamento do Mais Velocidade: o cheio riscado, o
                    abatimento e o valor que o cliente paga. Antes só aparecia
                    um número, com o texto do desconto embaixo, o que dizia
                    que o desconto estava aplicado quando não estava. */}
                <div className="mb-6">
                  {plano.temDesconto && plano.precoComDesconto ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm line-through opacity-60 ${'text-[#93A69B]'}`}>
                          {plano.preco}
                        </p>
                        <span className="rounded-full bg-[#FF6B6B] px-2 py-1 text-xs font-bold text-white">
                          -R$ 20
                        </span>
                      </div>
                      <p className={`text-4xl font-black ${'text-[#3DD93D]'}`}>
                        {plano.precoComDesconto}
                      </p>
                      <p className={`text-xs ${plano.popular ? 'text-white/90' : 'text-[#93A69B]'}`}>
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
                <div className="mb-6 space-y-3">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${'text-[#3DD93D]'}`}
                      />
                      <span className={`text-sm ${plano.popular ? 'text-white/90' : 'text-[#CBD8CE]'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Apps section */}
                {(plano.appsStandard || plano.appsPremium) && (
                  <div className="mb-6">
                    {plano.appsStandard && (
                      <div>
                        <p className={`text-xs font-bold mb-3 ${'text-[#3DD93D]'}`}>
                          Aplicativos inclusos
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsStandard.slice(0, plano.appsStandard).map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-[#0A1730]/10 hover:bg-[#0A1730]/20'
                                  : 'bg-[#060E1E] hover:bg-white/10'
                              }`}
                              title={app.name}
                            >
                              <img src={app.logo} alt={app.name} className="h-9 w-9 object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {plano.appsPremium && (
                      <div>
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#e50914]'}`}>
                          Escolha 1 em mais de 5 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsPremiumList.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-[#0A1730]/10 hover:bg-[#0A1730]/20'
                                  : 'bg-red-50 border border-red-100 hover:bg-red-100'
                              }`}
                              title={app.name}
                            >
                              <img src={app.logo} alt={app.name} className="h-9 w-9 object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* GloboPlay Section */}
                <div className={`mb-8 pt-5 border-t ${plano.popular ? 'border-white/20' : 'border-white/10'}`}>
                  <p className={`text-xs font-bold mb-4 ${plano.popular ? 'text-white' : 'text-[#e50914]'}`}>
                    🎬 INCLUSO
                  </p>
                  <div className="flex justify-center">
                    <div className={`rounded-2xl p-5 flex flex-col items-center justify-center ${
                      plano.popular
                        ? 'bg-[#0A1730]/20 border-2 border-white/30'
                        : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
                    }`}>
                      <img
                        src="/images/apps/globoplay.png"
                        alt="GloboPlay"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <p className={`text-sm font-bold ${'text-[#E8F1E9]'}`}>
                        GloboPlay
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 bg-gradient-to-r from-[#e50914] to-[#8b0000] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        <Star size={10} fill="white" /> Premium
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20Internet%20%2B%20GloboPlay%20Premium.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'Click_Whatsapp',
                        'button_location': `MaisGloboPlay - ${plano.velocidade} Premium`,
                        'plan_name': plano.velocidade,
                        'plan_price': plano.precoComDesconto ?? plano.preco,
                        'plan_type': 'Internet + GloboPlay Premium'
                      });
                    }
                  }}
                  className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:scale-105 ${
                    plano.popular
                      ? 'bg-[#3DD93D] text-[#04170A] hover:bg-[#2BA82A]'
                      : 'bg-gradient-to-r from-[#e50914] to-[#8b0000] text-white hover:opacity-90'
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
        <div className="mt-16 text-center text-white/60 text-sm">
          <p>*Sem taxa de instalação. Consulte condições.</p>
        </div>
      </div>
    </section>
  );
}
