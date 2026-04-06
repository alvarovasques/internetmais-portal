import { CheckCircle2, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hero-person-smartphone-Rpr8kr2PaxPu6YGvVXmiU6.webp"
          alt="Jovem com smartphone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/80 via-[#0D1B3E]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Fibra Óptica + Chip 5G.
            <span className="text-[#F5C518]"> Tudo o que você precisa</span> em um só lugar.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            Mais de 20 mil clientes em Campo Grande. 100% fibra óptica, sem oscilação. E agora, somos também sua operadora de celular 5G.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://wa.me/556730272500?text=Olá!%20Quero%20contratar%20a%20InternetMais"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3DD93D] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Quero Contratar Agora
            </a>
            <a
              href="#planos-residenciais"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              ⚪ Ver Planos
            </a>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '✅ 100% Fibra Óptica',
              '✅ Instalação Grátis*',
              '✅ +20 mil clientes',
              '✅ Chip 5G disponível',
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={20} className="text-[#3DD93D]" />
                <span className="text-sm md:text-base">{badge.replace('✅ ', '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
