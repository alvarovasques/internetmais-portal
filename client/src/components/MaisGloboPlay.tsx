'use client';

import { Tv, Check, MessageCircle, Star, Film, Clapperboard } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';
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
  const [abaAtiva, setAbaAtiva] = useState<'basico' | 'premium'>('premium');
  useViewPlanTracker(ref as React.RefObject<HTMLElement>, {
    section_name: 'MaisGloboPlay',
    plan_type: 'Internet + GloboPlay',
  });

  // Apps Standard
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

  // Apps Premium
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
      preco: 'R$ 129,90',
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

  const diferenciais = [
    'Todo o conteúdo sem anúncios — filmes, séries e shows exclusivos',
    'Catálogo completo de filmes e séries nacionais e internacionais',
    'Até 5 perfis — 1 titular + 4 adicionais — cada um com experiência personalizada',
    'Baixe e assista offline onde quiser',
    'Assista em até 5 telas simultâneas',
    'Resolução Full HD e 4K',
  ];

  const planosPremium: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      popular: false,
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', ...diferenciais]
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 129,90',
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', ...diferenciais]
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      popular: false,
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'MaisTV (100+ canais)', ...diferenciais]
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
        background: 'linear-gradient(160deg, #0a0a14 0%, #12071a 40%, #0d0a1f 70%, #0a0a14 100%)',
      }}
    >
      {/* Decoração: linhas de película de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Faixa lateral esquerda estilo película */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col gap-3 py-4 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-full h-5 bg-white rounded-sm flex-shrink-0" />
          ))}
        </div>
        {/* Faixa lateral direita estilo película */}
        <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col gap-3 py-4 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-full h-5 bg-white rounded-sm flex-shrink-0" />
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
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20">
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

        {/* Promoção Sinal Aberto Telecine — estilo Netflix */}
        <div className="mb-10 animate-fade-in-up animate-delay-200">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 40%, #0a0a1a 100%)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Fundo com posters desfocados */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 flex gap-1 opacity-15 scale-110">
                {[
                  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/bCb5kNiFIqoH_4d788dcc.jpg',
                  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/EFvDsp8uYaDB_f2eb1b86.jpg',
                  'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/YO6LenMjrQGk_cede9e5f.jpg',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-full object-cover flex-1" style={{ filter: 'blur(8px)' }} />
                ))}
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, #0a0a0a 100%)' }} />
            </div>

            <div className="relative z-10 px-6 py-8 md:px-10">
              {/* Header da promoção */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                {/* Logo + badge */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/telecine-logo_58f3a687.png"
                    alt="Telecine"
                    className="h-12 w-auto object-contain bg-white rounded-lg px-3 py-1"
                  />
                  <span
                    className="text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest"
                    style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
                  >
                    Sinal Aberto
                  </span>
                </div>
                {/* Texto principal */}
                <div className="text-center md:text-left">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Promoção Especial</p>
                  <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2">
                    Filmes Liberados
                  </h3>
                  <p className="text-white/70 text-sm">
                    Diversão em família &bull; Sucessos atemporais
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white font-bold text-sm">21 a 27 de Julho</span>
                  </div>
                </div>
              </div>

              {/* Esteira de posters estilo Netflix */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {[
                  { poster: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/bCb5kNiFIqoH_4d788dcc.jpg', title: 'O Retorno', genre: 'Drama' },
                  { poster: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/EFvDsp8uYaDB_f2eb1b86.jpg', title: 'Velozes e Furiosos 9', genre: 'Ação' },
                  { poster: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/YO6LenMjrQGk_cede9e5f.jpg', title: 'John Wick 4: Baba Yaga', genre: 'Ação' },
                ].map((filme, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                    style={{ aspectRatio: '2/3' }}
                  >
                    <img src={filme.poster} alt={filme.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-xs leading-tight">{filme.title}</p>
                      <p className="text-white/60 text-xs">{filme.genre}</p>
                    </div>
                    <div
                      className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-black text-xs"
                      style={{ background: 'rgba(229,9,20,0.9)' }}
                    >
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rodapé */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="text-white/40 text-xs">Pra tudo tem filme.</span>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/telecine-logo_58f3a687.png"
                  alt="Telecine"
                  className="h-5 w-auto object-contain bg-white rounded px-1.5 py-0.5"
                />
                <span className="text-white/40 text-xs">• Assista no GloboPlay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge descritivo */}
        <div className="text-center mb-10">
          <p className="text-red-300 text-sm font-semibold">
            <Film size={14} className="inline mr-1" />
            GloboPlay Premium incluso — filmes, séries e conteúdo exclusivo sem anúncios
          </p>
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

              {/* Barra superior — tema cinema (vermelho) */}
              {isPremium && (
                <div className="h-1.5 w-full bg-gradient-to-r from-[#e50914] to-[#8b0000]" />
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
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}
                      />
                      <span className={`text-sm ${plano.popular ? 'text-white/90' : 'text-gray-700'}`}>
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
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                          Aplicativos inclusos
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsStandard.slice(0, plano.appsStandard).map((app, idx) => (
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
                        <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white' : 'text-[#e50914]'}`}>
                          Escolha 1 em mais de 5 opções
                        </p>
                        <div className="grid grid-cols-5 gap-2">
                          {appsPremiumList.map((app, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                                plano.popular
                                  ? 'bg-white/10 hover:bg-white/20'
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
                <div className={`mb-8 pt-5 border-t ${plano.popular ? 'border-white/20' : 'border-gray-100'}`}>
                  <p className={`text-xs font-bold mb-4 ${plano.popular ? 'text-white' : isPremium ? 'text-[#e50914]' : 'text-[#e50914]'}`}>
                    {isPremium ? '🎬 INCLUSO' : 'APLICATIVO INCLUSO'}
                  </p>
                  <div className="flex justify-center">
                    <div className={`rounded-2xl p-5 flex flex-col items-center justify-center ${
                      isPremium && !plano.popular
                        ? 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
                        : isPremium && plano.popular
                        ? 'bg-white/20 border-2 border-white/30'
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
                        <span className="mt-1 inline-flex items-center gap-1 bg-gradient-to-r from-[#e50914] to-[#8b0000] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
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
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'Click_Whatsapp',
                        'button_location': `MaisGloboPlay - ${plano.velocidade} ${isPremium ? 'Premium' : 'Básico'}`,
                        'plan_name': plano.velocidade,
                        'plan_price': plano.precoComDesconto ?? plano.preco,
                        'plan_type': `Internet + GloboPlay ${isPremium ? 'Premium' : 'Básico'}`
                      });
                    }
                  }}
                  className={`mt-auto w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    plano.popular
                      ? 'bg-white text-[#3DD93D] hover:bg-gray-100'
                      : isPremium
                        ? 'bg-gradient-to-r from-[#e50914] to-[#8b0000] text-white hover:opacity-90'
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
        <div className="mt-16 text-center text-white/60 text-sm">
          <p>*Sem taxa de instalação. Consulte condições.</p>
        </div>
      </div>
    </section>
  );
}
