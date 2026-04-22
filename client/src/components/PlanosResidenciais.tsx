import { useState } from 'react';
import { Zap, Tv, Tag, Check, MessageCircle, TrendingDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Plano {
  velocidade: string;
  preco: string;
  precoComDesconto?: string;
  temDesconto?: boolean;
  popular: boolean;
  desconto?: string;
  features: string[];
  apps?: string[];
}

export default function PlanosResidenciais() {
  const ref = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'velocidade' | 'aplicativos' | 'globoplay'>('velocidade');

  const planosVelocidade: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 109,90',
      precoComDesconto: 'R$ 89,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['400 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 119,90',
      precoComDesconto: 'R$ 99,90',
      temDesconto: true,
      popular: true,
      features: ['600 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7', '+Desconto por pontualidade']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      features: ['800 Mbps de velocidade', 'Instalação grátis*', 'Roteador Wi-Fi 6', 'Suporte 24/7']
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
      apps: ['MaisTV (100+ canais)', 'Ubook', 'Kaspersky', 'Play Kids', 'Looke', 'Deezer'],
      features: ['400 Mbps de velocidade', 'Apps Standart inclusos', 'Instalação grátis*', 'Roteador Wi-Fi 6']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      precoComDesconto: 'R$ 129,90',
      temDesconto: true,
      popular: true,
      apps: ['MaisTV (100+ canais)', 'Ubook', 'Kaspersky', 'Play Kids', 'Looke', 'Deezer', 'Disney+', 'HBO Max', 'Sky Light'],
      features: ['600 Mbps de velocidade', 'Apps Standart + Premium', 'Instalação grátis*', 'Roteador Wi-Fi 6']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      precoComDesconto: 'R$ 149,90',
      temDesconto: true,
      popular: false,
      desconto: '20% de desconto por pontualidade',
      apps: ['MaisTV (100+ canais)', 'Ubook', 'Kaspersky', 'Play Kids', 'Looke', 'Deezer', 'Disney+', 'HBO Max', 'Sky Light'],
      features: ['800 Mbps de velocidade', 'Apps Standart + Premium', 'Instalação grátis*', 'Roteador Wi-Fi 6']
    },
  ];

  const planosGloboPlay: Plano[] = [
    {
      velocidade: '400 Mega',
      preco: 'R$ 129,90',
      popular: false,
      apps: ['Globo Play Basic', 'MaisTV (100+ canais)'],
      features: ['400 Mbps de velocidade', 'Globo Play Basic', 'Instalação grátis*', 'Roteador Wi-Fi 6']
    },
    {
      velocidade: '600 Mega',
      preco: 'R$ 149,90',
      popular: true,
      apps: ['Globo Play Basic', 'MaisTV (100+ canais)'],
      features: ['600 Mbps de velocidade', 'Globo Play Basic', 'Instalação grátis*', 'Roteador Wi-Fi 6']
    },
    {
      velocidade: '800 Mega',
      preco: 'R$ 169,90',
      popular: false,
      apps: ['Globo Play Premium', 'MaisTV (100+ canais)'],
      features: ['800 Mbps de velocidade', 'Globo Play Premium', 'Instalação grátis*', 'Roteador Wi-Fi 6']
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
      className={`py-20 md:py-32 opacity-0 transition-all duration-700 ${getBgColor()}`}
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
            <Tv size={18} />
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
            <Tag size={18} />
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
                      <p className={`text-xs font-semibold ${plano.popular ? 'text-white/80' : 'text-[#3DD93D]'}`}>
                        ✓ Já com desconto de pontualidade
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className={`text-4xl font-black ${plano.popular ? 'text-white' : 'text-[#3DD93D]'}`}>
                        {plano.preco}
                      </p>
                      <p className={`text-sm ${plano.popular ? 'text-white/80' : 'text-gray-600'}`}>
                        por mês
                      </p>
                    </>
                  )}
                </div>

                {/* Desconto Badge */}
                {plano.desconto && (
                  <div className="mb-4 inline-block">
                    <span className="bg-[#3DD93D] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {plano.desconto}
                    </span>
                  </div>
                )}
                
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

                {/* Apps (if applicable) */}
                {plano.apps && (
                  <div className="mb-8 pb-8 border-t border-current border-opacity-20">
                    <p className={`text-xs font-bold mb-3 ${plano.popular ? 'text-white/80' : 'text-gray-600'}`}>
                      APLICATIVOS INCLUSOS:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {plano.apps.map((app, j) => (
                        <span
                          key={j}
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            plano.popular
                              ? 'bg-white/20 text-white'
                              : 'bg-[#3DD93D]/10 text-[#3DD93D]'
                          }`}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20internet%20residencial%20da%20InternetMais.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${
                    plano.popular
                      ? 'bg-white text-[#3DD93D] hover:shadow-lg'
                      : 'bg-[#3DD93D] text-white hover:shadow-lg'
                  }`}
                >
                  <MessageCircle size={18} />
                  Contratar Agora
                </a>

                {/* Discount Note */}
                <p className={`text-xs text-center mt-4 ${plano.popular ? 'text-white/70' : 'text-gray-500'}`}>
                  *Instalação grátis com fidelidade de 12 meses
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 animate-fade-in-up animate-delay-400 shadow-lg">
          <h3 className="text-xl font-bold text-[#0D1B3E] mb-4">Informações Importantes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <Check size={20} className="text-[#3DD93D] flex-shrink-0 mt-1" />
              <span>Taxa de instalação: R$ 300,00 (isenta com fidelidade de 12 meses)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-[#3DD93D] flex-shrink-0 mt-1" />
              <span>Desconto de R$ 20,00 por pontualidade nos planos Internet + Velocidade e Internet + Aplicativos</span>
            </li>
            <li className="flex items-start gap-3">
              <Check size={20} className="text-[#3DD93D] flex-shrink-0 mt-1" />
              <span>100% fibra óptica - sem oscilação, sem travamento</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
