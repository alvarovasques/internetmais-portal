import { Package, RotateCcw, Signal, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Bloco5G() {
  const ref = useScrollAnimation();
  return (
    <section ref={ref} id="chip-5g" className="relative py-20 md:py-32 overflow-hidden opacity-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/chip-5g-mockup-nKczXnR3D6rQvEQ4DTpnEm.webp"
          alt="Chip 5G"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD93D]/85 via-[#3DD93D]/65 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#3DD93D] text-white px-4 py-2 rounded-full mb-6 font-bold animate-fade-in-down animate-delay-100">
          <span>📡</span>
          <span>SOMOS UMA OPERADORA 5G</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 animate-fade-in-left animate-delay-200">
          Seu celular merece o melhor sinal.
          <br />
          Conheça o Chip InternetMais 5G.
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-100 mb-12 max-w-2xl animate-fade-in-right animate-delay-300">
          Planos a partir de R$ 24,99/mês com apps ilimitados e bônus ao trazer sua portabilidade.
        </p>

        {/* CTA Button */}
        <a
          href="https://wa.me/556730272500?text=Olá!%20Quero%20meu%20Chip%205G%20InternetMais"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#3DD93D] font-black py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 mb-12 animate-scale-in animate-delay-400"
        >
          <MessageCircle size={20} />
          Quero meu Chip 5G agora
        </a>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-500">
          {[
            { icon: Package, label: 'Receba em casa' },
            { icon: RotateCcw, label: 'Portabilidade facil' },
            { icon: Signal, label: 'Rede 5G' },
          ].map((benefit, i) => (
            <div 
              key={i} 
              className="text-center text-white animate-float"
              style={{ animationDelay: `${0.6 + i * 0.2}s` }}
            >
              <benefit.icon size={32} className="mx-auto mb-3 animate-glow-pulse" />
              <p className="font-bold">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
