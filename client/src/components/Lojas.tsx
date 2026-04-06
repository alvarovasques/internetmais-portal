import { MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Lojas() {
  const ref = useScrollAnimation();
  const lojas = [
    'Moreninhas',
    'Aero Rancho',
    'Nova Lima',
    'Los Angeles',
    'União',
  ];

  return (
    <section ref={ref} id="lojas" className="py-20 md:py-32 bg-white opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Atendimento presencial perto de você
        </h2>
        <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
          Suporte técnico, contratação e atendimento humanizado em 5 lojas em Campo Grande.
        </p>

        {/* Lojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {lojas.map((loja, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#3DD93D]/10 to-[#3DD93D]/5 rounded-2xl p-8 text-center border-2 border-[#3DD93D]/30 hover:border-[#3DD93D] hover:shadow-lg transition-all duration-300 card-hover"
            >
              <MapPin size={40} className="text-[#3DD93D] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0D1B3E]">
                📍 {loja}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20saber%20a%20loja%20mais%20próxima"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Falar com a loja mais próxima
          </a>
        </div>
      </div>
    </section>
  );
}
