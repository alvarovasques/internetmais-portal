'use client';

import { Tv, Check, MessageCircle, Star, TrendingDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

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
  const [abaAtiva, setAbaAtiva] = useState<'basico' | 'premium'>('basico');

  // Apps Standard (mesmos do MaisAplicativos)
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

  // Apps Premium (mesmos do MaisAplicativos)
  const appsPremiumList: App[] = [
    { name: 'Smart Content', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/pasted_file_rhmkSC_image_9113653c.png' },
    { name: 'Ritual Fit', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ritual_fit_229a350c.png' },
    { name: 'Kaspersky Plus (5 licenças)', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_plus_83f4dd88.png' },
    { name: 'Docway', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/docway_27238b63.png' },
    { name: 'HotGo', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hotgo_bc8647a1.png' },
    { name: 'Queima Diária', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/queima_diaria_correct_9b9e6828.png' },
    { name: 'HBO Max', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hbo-max_8983f5f2.png' },
    { name: 'Disney+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/disney-plus_e2b45e97.png' },
  ];

  const planosBasico: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      popular: false,
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 119,90',
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      popular: false,
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', 'Ubook', 'Kaspersky']
    },
  ];

  const planosPremium: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 139,90',
      popular: false,
      appsStandard: 1,
      appsPremium: 1,
      features: ['400 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*', 'MaisTV (100+ canais)']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      popular: true,
      appsStandard: 1,
      appsPremium: 1,
      features: ['600 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*', 'MaisTV (100+ canais)']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      popular: false,
      appsStandard: 1,
      appsPremium: 1,
      features: ['800 Mbps de velocidade', 'Escolha 1 App Standard + 1 Premium', 'Instalação grátis*', 'MaisTV (100+ canais)']
    },
  ];

  const planos = abaAtiva === 'basico' ? planosBasico : planosPremium;
  const isPremium = abaAtiva === 'premium';

  return (
    <section
      ref={ref}
      id="mais-globoplay"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/mais-globoplay-hero-K5fJGBp8pWVRKjTzknHtR5.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-down animate-delay-100">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
            <Tv className="text-[#FF6B35]" size={24} />
            <span className="text-white font-bold">Mais GloboPlay</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Entretenimento para toda a Família
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Acesso a GloboPlay, séries, filmes e esportes ao vivo para toda a família
          </p>
        </div>

        {/* Abas */}
        <div className="flex justify-center mb-12 animate-fade-in-up animate-delay-200">
          <div className="relative flex bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 gap-1">
            {/* Aba Básico */}
            <button
              onClick={() => setAbaAtiva('basico')}
              className={`relative flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base transition-all duration-300 ${
                abaAtiva === 'basico'
                  ? 'bg-white text-[#0D1B3E] shadow-xl scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Tv size={18} className={abaAtiva === 'basico' ? 'text-[#FF6B35]' : 'text-white/70'} />
              <span>Mais GloboPlay</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                abaAtiva === 'basico'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white/20 text-white'
              }`}>
                BÁSICO
              </span>
            </button>

            {/* Aba Premium */}
            <button
              onClick={() => setAbaAtiva('premium')}
              className={`relative flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base transition-all duration-300 ${
                abaAtiva === 'premium'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-white shadow-xl scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Star size={18} className={abaAtiva === 'premium' ? 'text-white' : 'text-yellow-400'} fill={abaAtiva === 'premium' ? 'white' : 'currentColor'} />
              <span>Mais GloboPlay</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                abaAtiva === 'premium'
                  ? 'bg-white/30 text-white'
                  : 'bg-yellow-400/30 text-yellow-300'
              }`}>
                PREMIUM
              </span>
              {abaAtiva !== 'premium' && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#0D1B3E] text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                  NOVO
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Badge descritivo da aba */}
        <div className="text-center mb-10">
          {abaAtiva === 'basico' ? (
            <p className="text-white/70 text-sm">
              GloboPlay Básico incluso — filmes, séries e conteúdo ao vivo
            </p>
          ) : (
            <p className="text-yellow-300 text-sm font-semibold">
              ⭐ GloboPlay Premium incluso + Apps Standard e Premium à sua escolha — tudo em um só plano
            </p>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-300">
          {planos.map((plano, i) => (
            <div
              key={`${abaAtiva}-${i}`}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 transform animate-scale-in hover:shadow-2xl hover:scale-105 ${
                plano.popular ? 'md:scale-105 shadow-2xl' : 'shadow-lg'
              }`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#3DD93D] text-white px-4 py-2 rounded-bl-2xl font-bold text-sm animate-bounce z-20">
                  MAIS POPULAR
                </div>
              )}

              {/* Premium top bar */}
              {isPremium && (
                <div className="h-1.5 w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00]" />
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
                  <p className={`text-4xl font-black ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                    {plano.preco}
                  </p>
                  <p className={`text-xs mt-1 ${plano.popular ? 'text-white/90' : 'text-gray-600'}`}>
                    ✓ Já com desconto de pontualidade
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6 space-y-3">
                  {plano.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={20} className={plano.popular ? 'text-white' : 'text-[#3DD93D]'} />
                      <span className={`text-sm font-semibold ${plano.popular ? 'text-white' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Apps Section — apenas no Premium */}
                {isPremium && (plano.appsStandard || plano.appsPremium) && (
                  <div className="mb-6 space-y-4 border-t border-opacity-20 border-white pt-5">
                    {plano.appsStandard && (
                      <div>
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                          Escolha 1 em mais de 15 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsStandard.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-white/10 hover:bg-white/20'
                                  : 'bg-gray-100 hover:bg-gray-200'
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
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : isPremium ? 'text-[#FF8C00]' : 'text-[#3DD93D]'}`}>
                          Escolha 1 em mais de 5 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsPremiumList.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-white/10 hover:bg-white/20'
                                  : 'bg-orange-50 border border-orange-200 hover:bg-orange-100'
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
                <div className={`mb-8 pt-5 ${isPremium ? 'border-t border-opacity-20 border-white' : 'border-t border-opacity-20 border-white pt-6'}`}>
                  <p className={`text-xs font-bold mb-4 ${plano.popular ? 'text-white' : isPremium ? 'text-[#FF8C00]' : 'text-[#FF1744]'}`}>
                    {isPremium ? '⭐ INCLUSO' : 'APLICATIVO INCLUSO'}
                  </p>
                  <div className="flex justify-center">
                    <div className={`rounded-2xl p-5 flex flex-col items-center justify-center ${
                      isPremium && !plano.popular
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
                        : isPremium && plano.popular
                        ? 'bg-white/20 border-2 border-yellow-300/50'
                        : 'bg-white'
                    }`}>
                      <img
                        src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/globoplay-hq_5eefcb22.png"
                        alt="GloboPlay"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <p className={`text-sm font-bold ${plano.popular && isPremium ? 'text-white' : 'text-gray-800'}`}>
                        GloboPlay
                      </p>
                      {isPremium ? (
                        <span className="mt-1 inline-flex items-center gap-1 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                          <Star size={10} fill="white" /> Premium
                        </span>
                      ) : (
                        <p className="text-xs text-gray-500 font-medium">
                          Básico
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20Internet%20%2B%20GloboPlay%20${isPremium ? 'Premium' : 'B%C3%A1sico'}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    plano.popular
                      ? 'bg-white text-[#3DD93D] hover:bg-gray-100'
                      : isPremium
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-white hover:opacity-90'
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
