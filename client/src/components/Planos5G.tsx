import { Package, RotateCcw, MessageCircle, Navigation, MapPin } from 'lucide-react';

export default function Planos5G() {
  const planos = [
    { gb: '1GB', preco: 'R$ 24,99/mês', bonus: '—', popular: false },
    { gb: '3GB', preco: 'R$ 39,99/mês', bonus: '+2GB', popular: false },
    { gb: '5GB', preco: 'R$ 49,99/mês', bonus: '+3GB', popular: true },
    { gb: '10GB', preco: 'R$ 59,99/mês', bonus: '+5GB', popular: false },
    { gb: '25GB', preco: 'R$ 89,99/mês', bonus: '+5GB', popular: false },
  ];

  return (
    <section id="chip-5g" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/young-urban-5g-cNg49canYigBkfq88ooW3Z.webp"
          alt="Jovem com 5G"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/90 via-[#0D1B3E]/75 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#3DD93D] text-white px-4 py-2 rounded-full mb-6 font-bold">
          <span>📡</span>
          <span>SOMOS UMA OPERADORA 5G</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Seu celular merece o melhor sinal.
          <br />
          Conheça o Chip InternetMais 5G.
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-100 mb-12 max-w-2xl">
          Planos a partir de R$ 24,99/mês com apps ilimitados e bônus ao trazer sua portabilidade.
        </p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {planos.map((plano, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plano.popular
                  ? 'lg:scale-110 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Card Background */}
              <div className="bg-white p-6">
                {/* Popular Badge */}
                {plano.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-[#3DD93D] text-white font-bold py-2 px-4 text-center">
                    ⭐ MAIS POPULAR
                  </div>
                )}

                <div className={plano.popular ? 'mt-8' : ''}>
                  {/* GB */}
                  <h3 className="text-3xl font-black text-[#0D1B3E] mb-4">
                    {plano.gb}
                  </h3>

                  {/* Preço */}
                  <p className="text-2xl font-bold text-[#3DD93D] mb-6">
                    {plano.preco}
                  </p>

                  {/* Bonus */}
                  {plano.bonus !== '—' && (
                    <div className="bg-[#F5C518] text-[#0D1B3E] px-4 py-2 rounded-lg mb-6 font-bold text-sm flex items-center gap-2">
                      <RotateCcw size={16} />
                      <span>{plano.bonus} na portabilidade</span>
                    </div>
                  )}

                  {/* Apps Ilimitados */}
                  {parseInt(plano.gb) >= 3 && (
                    <div className="space-y-2 mb-6 text-sm">
                      <p className="font-bold text-gray-700 mb-3">Apps ilimitados:</p>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-[#3DD93D]" />
                        <span className="text-gray-600">WhatsApp</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation size={16} className="text-[#3DD93D]" />
                        <span className="text-gray-600">Waze</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#3DD93D]" />
                        <span className="text-gray-600">Maps</span>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <a
                    href="https://wa.me/556730272500?text=Olá!%20Quero%20meu%20Chip%205G"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary block text-center text-sm"
                  >
                    Pedir meu Chip
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Package, label: 'Receba em casa' },
            { icon: RotateCcw, label: 'Portabilidade fácil' },
            { icon: '📶', label: 'Rede 5G' },
          ].map((benefit, i) => (
            <div key={i} className="text-center text-white">
              {typeof benefit.icon === 'string' ? (
                <div className="text-4xl mb-3">{benefit.icon}</div>
              ) : (
                <benefit.icon size={32} className="mx-auto mb-3" />
              )}
              <p className="font-bold">{benefit.label}</p>
            </div>
          ))}
        </div>

        {/* Combo Banner */}
        <div className="bg-[#F5C518]/20 border-2 border-[#F5C518] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-4">
            Quer combo Fibra + Chip? Ganhe 5% de desconto!
          </h3>
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20montar%20meu%20combo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white inline-flex items-center justify-center gap-2"
          >
            Montar meu combo
          </a>
        </div>
      </div>
    </section>
  );
}
