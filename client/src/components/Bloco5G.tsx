import { Package, RotateCcw, Signal, MessageCircle } from 'lucide-react';

export default function Bloco5G() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/chip-5g-mockup-nKczXnR3D6rQvEQ4DTpnEm.webp"
          alt="Chip 5G"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3DD93D]/85"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse-badge">
            <span className="text-2xl">✨</span>
            <span className="text-white font-bold">NOVIDADE</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            A InternetMais agora é sua operadora de celular!
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed">
            Chip 5G com os melhores preços e ainda ganhe bônus de internet ao trazer sua portabilidade. WhatsApp, Waze e Maps ilimitados.
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20meu%20Chip%205G%20InternetMais"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#3DD93D] font-black py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 mb-12"
          >
            <MessageCircle size={20} />
            Quero meu Chip 5G agora
          </a>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Package, label: 'Receba seu chip em casa', desc: 'Entrega rápida e segura' },
              { icon: RotateCcw, label: 'Portabilidade sem complicação', desc: 'Processo simples e rápido' },
              { icon: Signal, label: 'Cobertura 5G em Campo Grande', desc: 'Melhor sinal da região' },
            ].map((benefit, i) => (
              <div key={i} className="text-white">
                <benefit.icon size={32} className="mb-4" />
                <h3 className="text-lg font-bold mb-2">{benefit.label}</h3>
                <p className="text-white/80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
