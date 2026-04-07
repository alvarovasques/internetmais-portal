import { Radio, Phone, Percent } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Adicionais() {
  const ref = useScrollAnimation();
  const adicionais = [
    {
      icon: Radio,
      name: 'Extensor Wi-Fi 5',
      preco: 'R$ 19,90/mês',
    },
    {
      icon: Radio,
      name: 'Extensor Wi-Fi 6',
      preco: 'R$ 29,90/mês',
    },
    {
      icon: Phone,
      name: 'Linha Fixa Ilimitada (fixo para fixo)',
      preco: 'R$ 59,90/mês',
    },
    {
      icon: Percent,
      name: 'Combo Fibra + Chip ou Fixo',
      preco: '5% de desconto',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F4F4F4] opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Adicionais e Combos
        </h2>
        <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
          Potencialize sua experiência com opções complementares
        </p>

        {/* Adicionais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adicionais.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl card-hover border-l-4 border-[#3DD93D]"
            >
              {/* Icon */}
              <item.icon size={32} className="text-[#3DD93D] mb-4" />

              {/* Name */}
              <h3 className="text-lg font-bold text-[#0D1B3E] mb-3">
                {item.name}
              </h3>

              {/* Preço */}
              <p className="text-2xl font-bold text-[#3DD93D]">
                {item.preco}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20para%20montar%20meu%20combo%20com%20adicionais%20e%20aproveitar%20os%20descontos."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Montar meu combo
          </a>
        </div>
      </div>
    </section>
  );
}
