import { Zap, Shield, Headphones, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Diferenciais() {
  const ref = useScrollAnimation();
  const diferenciais = [
    {
      icon: Zap,
      title: 'Ultra Velocidade',
      desc: 'Fibra óptica 100% dedicada, sem divisão de sinal',
    },
    {
      icon: Shield,
      title: 'Sinal Estável',
      desc: 'Sem quedas, sem oscilação. Conexão que você pode confiar',
    },
    {
      icon: Headphones,
      title: 'Atendimento Humano',
      desc: 'Suporte N1 real, com quem entende do seu problema',
    },
    {
      icon: MapPin,
      title: 'Campo Grande é nossa casa',
      desc: 'Presença local em 70% dos bairros desde 2017',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center animate-fade-in-down animate-delay-100">
          Por que a Internet Mais é diferente?
        </h2>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          Conheça os diferenciais que nos fazem ser a melhor escolha para sua conexão
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up animate-delay-300">
          {diferenciais.map((item, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-100 rounded-2xl p-8 card-hover hover:border-[#3DD93D] hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-[#3DD93D]/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon size={32} className="text-[#3DD93D]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0D1B3E] mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
