'use client';

import { useState } from 'react';
import { Zap, Tv, Tag, Check, MessageCircle, TrendingDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  desconto?: string;
  features: string[];
  appsStandard?: number;
  appsPremium?: number;
}

export default function PlanosResidenciais() {
  const ref = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'velocidade' | 'aplicativos' | 'globoplay'>('velocidade');

  // Apps disponíveis
  const appsStandard: App[] = [
    { name: 'Ubook Plus', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ubook_plus_cb4505d6.png' },
    { name: 'Zen', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/zen_5fe6a424.png' },
    { name: 'Leitura 360', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/leitura_360_dcb38301.png' },
    { name: 'Estuda+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/estuda_5da0ea5e.png' },
    { name: 'Pequenos Leitores', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/pequenos_leitores_bd05c71e.png' },
    { name: 'O Jornalista', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/jornalista_72f92588.png' },
    { name: 'Playlist', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/playlist_ae5a8f2c.png' },
    { name: 'Kiddle Pass', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kiddle_pass_83480f5f.png' },
    { name: 'PlayKids+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/playkids_plus_0edcb760.png' },
    { name: 'Sky+ Light', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/sky_plus_light_correct_5bb1bc0f.png' },
    { name: 'Deezer', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/deezer_c80f6c93.png' },
    { name: 'Social Comics', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/social_comics_73989f43.png' },
    { name: 'Kaspersky Standard (3 lic.)', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_standard_91009e85.png' },
    { name: 'Qnutri', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/qnutri_f742a5e2.png' },
    { name: 'Looke', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/looke_16394443.png' },
    { name: 'Curtaon', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/curtaon_b85cae88.png' },
    { name: 'Revistaria', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/revistaria_correct_2fc8ef73.png' },
    { name: 'Fluid', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/fluid_6672ee02.png' },
    { name: 'Hub Vantagens', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hub_vantagens_f70aaea4.png' },
  ];

  const appsPremium: App[] = [
    { name: 'Smart Content', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/queima_diaria_correct_9b9e6828.png' },
    { name: 'Ritual Fit', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ritual_fit_229a350c.png' },
    { name: 'Kaspersky Plus (5 licencas)', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_plus_83f4dd88.png' },
    { name: 'Docway', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/docway_27238b63.png' },
    { name: 'HotGo', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hotgo_bc8647a1.png' },
    { name: 'Queima Diaria', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/queima_diaria_correct_9b9e6828.png' },
    { name: 'HBO Max', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hbo-max_8983f5f2.png' },
    { name: 'Disney+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/disney-plus_e2b45e97.png' },
  ];

  const planosVelocidade: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      precoComDesconto: 'R$ 89,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 119,90',
      precoComDesconto: 'R$ 99,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
  ];

  const planosAplicativos: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 129,90',
      precoComDesconto: 'R$ 109,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      appsStandard: 1,
      features: ['400 Mbps de velocidade', 'Escolha 1 App Standard', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: true,
      appsStandard: 1,
      appsPremium: 1,
      features: ['600 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      precoComDesconto: 'R$ 149,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      appsStandard: 1,
      appsPremium: 1,
      features: ['800 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7']
    },
  ];

  const planosGloboPlay: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 129,90',
      popular: false,
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      popular: false,
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
  ];

  const getPlanos = () => {
    switch (activeTab) {
      case 'aplicativos':
        return planosAplicativos;
      case 'globoplay':
        return planosGloboPlay;
      default:
        return planosVelocidade;
    }
  };

  const getBgColor = () => {
    switch (activeTab) {
      case 'aplicativos':
        return 'bg-gradient-to-br from-[#FFF8E1] via-[#F4F4F4] to-[#E8F9E8]';
      case 'globoplay':
        return 'bg-gradient-to-br from-[#E3F2FD] via-[#F4F4F4] to-[#FFF8E1]';
      default:
        return 'bg-gradient-to-br from-[#E8F9E8] via-[#F4F4F4] to-[#E3F2FD]';
    }
  };

  const currentPlanos = getPlanos();

  return (
    <section 
      ref={ref} 
      id="planos-residenciais" 
      className={`py-20 md:py-32 transition-all duration-700 ${getBgColor()}`}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in-down animate-delay-100">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4">
            Planos Residenciais
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para suas necessidades de conectividade
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up animate-delay-200">
          <button
            onClick={() => setActiveTab('velocidade')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 transform ${
              activeTab === 'velocidade'
                ? 'bg-[#3DD93D] text-white shadow-xl scale-110 animate-pulse'
                : 'bg-white text-[#0D1B3E] border-2 border-gray-200 hover:border-[#3DD93D] hover:shadow-md'
            }`}
          >
            <Zap size={18} />
            Internet + Velocidade
          </button>
          <button
            onClick={() => setActiveTab('aplicativos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 transform ${
              activeTab === 'aplicativos'
                ? 'bg-[#3DD93D] text-white shadow-xl scale-110 animate-pulse'
                : 'bg-white text-[#0D1B3E] border-2 border-gray-200 hover:border-[#3DD93D] hover:shadow-md'
            }`}
          >
            <Tag size={18} />
            Internet + Aplicativos
          </button>
          <button
            onClick={() => setActiveTab('globoplay')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 transform ${
              activeTab === 'globoplay'
                ? 'bg-[#3DD93D] text-white shadow-xl scale-110 animate-pulse'
                : 'bg-white text-[#0D1B3E] border-2 border-gray-200 hover:border-[#3DD93D] hover:shadow-md'
            }`}
          >
            <Tv size={18} />
            Internet + Globo Play
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-300">
          {currentPlanos.map((plano, i) => (
            <div
              key={`${activeTab}-${i}`}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-2xl hover:scale-105 ${
                plano.popular ? 'md:scale-105 shadow-2xl' : 'shadow-lg'
              }`}
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#3DD93D] text-white px-4 py-2 rounded-bl-2xl font-bold text-sm animate-bounce">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Background */}
              <div className={`p-8 h-full ${plano.popular ? 'bg-gradient-to-br from-[#3DD93D] to-[#2BA82A]' : 'bg-white'}`}>
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
                  {plano.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check size={20} className={plano.popular ? 'text-white' : 'text-[#3DD93D]'} />
                      <span className={`text-sm font-semibold ${plano.popular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Globo Play Section */}
                {activeTab === 'globoplay' && (
                  <div className="mb-8 border-t border-opacity-20 border-white pt-6">
                    <p className={`text-xs font-bold mb-4 ${plano.popular ? 'text-white' : 'text-[#FF1744]'}`}>
                      APLICATIVO INCLUSO
                    </p>
                    <div className="flex justify-center">
                      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center">
                        <img
                          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/globoplay-hq_5eefcb22.png"
                          alt="Globo Play"
                          className="h-20 w-20 object-contain mb-2"
                        />
                        <p className="text-sm font-bold text-gray-800">
                          Globo Play
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Apps Section for Aplicativos Tab */}
                {activeTab === 'aplicativos' && (plano.appsStandard || plano.appsPremium) && (
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
                          Escolha 1 em mais de 10 opções
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
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20${activeTab === 'velocidade' ? 'Internet%20%2B%20Velocidade' : activeTab === 'aplicativos' ? 'Internet%20%2B%20Aplicativos' : 'Internet%20%2B%20Globo%20Play'}.`}
                  target="_blank"
                  rel="noopener noreferrer"
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
        <div className="mt-16 text-center text-gray-600 text-sm">
          <p>* Instalação grátis para clientes novos. Consulte condições.</p>
        </div>
      </div>
    </section>
  );
}
