import { CheckCircle2, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const ref = useScrollAnimation();
  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden opacity-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hero-person-smartphone-Rpr8kr2PaxPu6YGvVXmiU6.webp"
          alt="Jovem com smartphone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD93D]/90 via-[#3DD93D]/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight animate-fade-in-down animate-delay-100">
            Fibra Optica + Chip 5G.
            <span className="text-[#F5C518]"> Tudo o que voce precisa</span> em um so lugar.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed animate-fade-in-left animate-delay-200">
            Mais de 20 mil clientes em Campo Grande. 100% fibra optica, sem oscilacao. E agora, somos tambem sua operadora de celular 5G.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-right animate-delay-300">
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

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up animate-delay-400">
            {[
              '✅ 100% Fibra Optica',
              '✅ Instalacao Gratis*',
              '✅ +20 mil clientes',
              '✅ Chip 5G disponivel',
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-white animate-scale-in"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <CheckCircle2 size={20} className="text-[#3DD93D] flex-shrink-0" />
                <span className="font-semibold">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
