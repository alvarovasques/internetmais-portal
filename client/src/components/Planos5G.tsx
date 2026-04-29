import { MessageCircle, Check, Zap, Smartphone } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Planos5G() {
  const ref = useScrollAnimation();
  const planos = [
    {
      gb: '1GB',
      preco: 'R$ 24,99',
      bonus: '—',
      popular: false,
      features: ['1GB de dados', '100 min de voz', '100 SMS', 'Chip: R$ 10,00']
    },
    {
      gb: '3GB',
      preco: 'R$ 39,99',
      bonus: '+2GB',
      popular: false,
      features: ['3GB + 2GB (portabilidade)', '1000 min de voz', '100 SMS', 'WhatsApp, Waze, Maps ilimitados*', 'Chip: R$ 10,00']
    },
    {
      gb: '5GB',
      preco: 'R$ 49,99',
      bonus: '+3GB',
      popular: true,
      features: ['5GB + 3GB (portabilidade)', '1000 min de voz', '100 SMS', 'WhatsApp, Waze, Maps ilimitados*', 'Chip: R$ 10,00']
    },
    {
      gb: '10GB',
      preco: 'R$ 59,99',
      bonus: '+5GB',
      popular: false,
      features: ['10GB + 5GB (portabilidade)', '1000 min de voz', '100 SMS', 'WhatsApp, Waze, Maps ilimitados*', 'Chip: R$ 10,00']
    },
    {
      gb: '15GB',
      preco: 'R$ 64,99',
      bonus: '+5GB',
      popular: false,
      features: ['15GB + 5GB (portabilidade)', '1000 min de voz', '100 SMS', 'WhatsApp, Waze, Maps ilimitados*', 'Chip: R$ 10,00']
    },
    {
      gb: '25GB',
      preco: 'R$ 89,99',
      bonus: '+5GB',
      popular: false,
      features: ['25GB + 5GB (portabilidade)', '1000 min de voz', '100 SMS', 'WhatsApp, Waze, Maps ilimitados*', 'Chip: R$ 10,00']
    },
  ];

  return (
    <section ref={ref} id="chip-5g" className="relative py-20 md:py-32 overflow-hidden opacity-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/young-urban-5g-cNg49canYigBkfq88ooW3Z.webp"
          alt="Chip 5G InternetMais com conectividade móvel de próxima geração em Campo Grande"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD93D]/90 via-[#3DD93D]/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down animate-delay-100">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6 font-bold backdrop-blur-sm">
            <Smartphone size={18} />
            <span>SOMOS UMA OPERADORA 5G</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Chip InternetMais 5G
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Planos flexíveis com alta velocidade 5G, apps ilimitados e bônus ao trazer sua portabilidade
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-200">
          {planos.map((plano, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 animate-scale-in shadow-lg hover:shadow-xl`}
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              {/* Popular Badge */}
              {plano.popular && (
                <div className="absolute top-0 right-0 bg-[#F5C518] text-[#0D1B3E] px-4 py-2 rounded-bl-2xl font-black text-sm z-10">
                  TOP
                </div>
              )}

              {/* Card Background */}
              <div className={`p-6 h-full flex flex-col ${plano.popular ? 'bg-gradient-to-br from-white to-[#F4F4F4]' : 'bg-white'}`}>
                {/* Data Amount */}
                <h3 className={`text-3xl font-black mb-1 ${plano.popular ? 'text-[#3DD93D]' : 'text-[#0D1B3E]'}`}>
                  {plano.gb}
                </h3>

                {/* Bonus */}
                {plano.bonus !== '—' && (
                  <p className="text-xs font-bold text-[#3DD93D] mb-4">
                    {plano.bonus} bônus (portabilidade)
                  </p>
                )}

                {/* Price */}
                <div className="mb-6">
                  <p className={`text-3xl font-black ${plano.popular ? 'text-[#3DD93D]' : 'text-[#0D1B3E]'}`}>
                    {plano.preco}
                  </p>
                  <p className="text-xs text-gray-600">por mês</p>
                </div>

                {/* Features */}
                <div className={`flex-1 mb-6 space-y-2 ${plano.popular ? 'border-t-2 border-b-2 border-[#3DD93D]/20 py-4' : ''}`}>
                  {plano.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Check size={16} className="text-[#3DD93D] flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-gray-700 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20de%20${plano.gb}%20de%20dados%20do%20Chip%205G%20da%20InternetMais.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 text-sm ${
                    plano.popular
                      ? 'bg-gradient-to-r from-[#3DD93D] to-[#2BA82A] text-white hover:shadow-lg hover:scale-105'
                      : 'bg-[#3DD93D] text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <MessageCircle size={16} />
                  Contratar
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-white/95 backdrop-blur-sm rounded-2xl p-8 animate-fade-in-up animate-delay-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-[#0D1B3E] mb-2">Apps Ilimitados*</h4>
              <p className="text-sm text-gray-600">WhatsApp, Waze e Maps com tráfego ilimitado</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0D1B3E] mb-2">Portabilidade</h4>
              <p className="text-sm text-gray-600">Ganhe bônus de dados ao trazer seu número</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0D1B3E] mb-2">Rede 5G</h4>
              <p className="text-sm text-gray-600">Navegue com a velocidade mais rápida do mercado com cobertura nacional.</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600"><span className="font-bold">*Ilimitado enquanto houver saldo disponível.</span> O uso do WhatsApp (mensagens de texto e voz) e do Waze ocorre normalmente, sem desconto do plano, mas precisa ter saldo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
