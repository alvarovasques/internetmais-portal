'use client';

import { Tag, Check, MessageCircle, TrendingDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';

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

export default function MaisAplicativos() {
  const ref = useScrollAnimation();
  useViewPlanTracker(ref as React.RefObject<HTMLElement>, {
    section_name: 'MaisAplicativos',
    plan_type: 'Internet + Aplicativos',
  });

  // Apps disponíveis
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

  const appsPremium: App[] = [
    { name: 'Smart Content', logo: '/images/apps/smart-content.png' },
    { name: 'Ritual Fit', logo: '/images/apps/ritual-fit.png' },
    { name: 'Kaspersky Plus (5 licencas)', logo: '/images/apps/kaspersky-plus.png' },
    { name: 'Docway', logo: '/images/apps/docway.png' },
    { name: 'HotGo', logo: '/images/apps/hotgo.png' },
    { name: 'Queima Diaria', logo: '/images/apps/queima-diaria.png' },
    { name: 'HBO Max', logo: '/images/apps/hbo-max.png' },
    { name: 'Disney+', logo: '/images/apps/disney-plus.png' },
  ];

  const planos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 129,90',
      precoComDesconto: 'R$ 109,90',
      temDesconto: true,
      popular: false,
      appsStandard: 1,
      features: ['400 Mbps de velocidade', 'Escolha 1 App Standard', 'Instalação grátis*']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: true,
      appsStandard: 1,
      appsPremium: 1,
      features: ['600 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      precoComDesconto: 'R$ 149,90',
      temDesconto: true,
      popular: false,
      appsStandard: 1,
      appsPremium: 1,
      features: ['800 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*']
    },
  ];

  return (
    <section 
      ref={ref} 
      id="mais-aplicativos" 
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: `url('/images/bg/mais-aplicativos-bg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay leve — deixa a família e os ícones aparecerem */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65"></div>

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
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-2xl hover:scale-105 ${
                plano.popular ? 'md:scale-105 shadow-2xl' : 'shadow-lg'
              }`}
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#3DD93D] text-white px-4 py-2 rounded-bl-2xl font-bold text-sm animate-bounce z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Background */}
              <div className={`p-8 h-full flex flex-col ${
                plano.popular 
                  ? 'bg-gradient-to-br from-[#3DD93D] to-[#2BA82A]' 
                  : 'bg-white'
              }`}>
                {/* Velocity */}
                <h3 className={`text-3xl font-black mb-2 ${plano.popular ? 'text-white' : 'text-[#0D1B3E]'}`}>
                  {plano.velocidade}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  {plano.temDesconto ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm line-through opacity-60 ${plano.popular ? 'text-white' : 'text-gray-500'}`}>
                          {plano.preco}
                        </p>
                        <div className="flex items-center gap-1 bg-[#FF6B6B] text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                          <TrendingDown size={12} />
                          -R$ 20
                        </div>
                      </div>
                      <p className={`text-4xl font-black ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                        {plano.precoComDesconto}
                      </p>
                      <p className={`text-xs ${plano.popular ? 'text-white' : 'text-gray-600'}`}>
                        ✓ Já com desconto de pontualidade
                      </p>
                    </div>
                  ) : (
                    <p className={`text-4xl font-black ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                      {plano.preco}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className={plano.popular ? 'text-white' : 'text-[#3DD93D]'} />
                      <span className={`text-sm font-semibold ${plano.popular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Apps Section */}
                {(plano.appsStandard || plano.appsPremium) && (
                  <div className="mb-8 space-y-6 border-t border-opacity-20 border-white pt-6">
                    {plano.appsStandard && (
                      <div>
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                          Escolha 1 em mais de 15 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsStandard.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-white bg-opacity-10 hover:bg-opacity-20'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                              title={app.name}
                            >
                              <img
                                src={app.logo}
                                alt={app.name}
                                className="h-10 w-10 object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {plano.appsPremium && (
                      <div>
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                          Escolha 1 em mais de 5 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsPremium.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-white bg-opacity-10 hover:bg-opacity-20'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                              title={app.name}
                            >
                              <img
                                src={app.logo}
                                alt={app.name}
                                className="h-10 w-10 object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20Internet%20%2B%20Aplicativos.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'Click_Whatsapp',
                        'button_location': `MaisAplicativos - ${plano.velocidade}`,
                        'plan_name': plano.velocidade,
                        'plan_price': plano.precoComDesconto ?? plano.preco,
                        'plan_type': 'Internet + Aplicativos'
                      });
                    }
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    plano.popular
                      ? 'bg-white text-[#3DD93D] hover:bg-gray-100'
                      : 'bg-[#3DD93D] text-white hover:bg-[#2BA82A]'
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
