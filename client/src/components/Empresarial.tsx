import { Wifi, Clock, Network } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Empresarial() {
  const ref = useScrollAnimation();
  const planos = [
    { velocidade: '400 Mega', preco: 'R$ 229,90/mês' },
    { velocidade: '600 Mega', preco: 'R$ 249,90/mês' },
    { velocidade: '800 Mega', preco: 'R$ 269,90/mês' },
  ];

  return (
    <section ref={ref} id="empresarial" className="relative py-20 md:py-32 overflow-hidden opacity-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/office-modern-GoVmZvh4HUoGCEAR78yU97.webp"
          alt="Escritório moderno"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Sua empresa merece uma conexão à altura
        </h2>
        <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
          Planos corporativos com Wi-Fi 6, suporte especializado de 12h e estabilidade para o seu negócio.
        </p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {planos.map((plano, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl card-hover border-2 border-gray-100 hover:border-[#3DD93D]"
            >
              {/* Velocidade */}
              <h3 className="text-2xl font-black text-[#0D1B3E] mb-6">
                {plano.velocidade}
              </h3>

              {/* Preço */}
              <p className="text-3xl font-bold text-[#3DD93D] mb-8">
                {plano.preco}
              </p>

              {/* Benefícios */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Wifi size={20} className="text-[#3DD93D]" />
                  <span className="text-gray-700 font-semibold">Wi-Fi 6 incluso</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-[#3DD93D]" />
                  <span className="text-gray-700 font-semibold">Suporte empresarial 12h</span>
                </div>
                <div className="flex items-center gap-3">
                  <Network size={20} className="text-[#3DD93D]" />
                  <span className="text-gray-700 font-semibold">IP Dinâmico (PPoE)</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/556730272500?text=Olá!%20Preciso%20de%20internet%20empresarial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary block text-center"
              >
                Falar com consultor empresarial
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
