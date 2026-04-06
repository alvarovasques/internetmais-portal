import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProvaSocial() {
  const ref = useScrollAnimation();
  const depoimentos = [
    {
      nome: 'Carlos Silva',
      cargo: 'Empresário',
      texto: 'A velocidade e estabilidade da InternetMais transformaram meu negócio. Não tenho mais problemas com conexão.',
      rating: 5,
    },
    {
      nome: 'Maria Santos',
      cargo: 'Professora',
      texto: 'Excelente atendimento! O suporte é rápido e eficiente. Recomendo para todos os meus amigos.',
      rating: 5,
    },
    {
      nome: 'João Costa',
      cargo: 'Desenvolvedor',
      texto: 'A fibra óptica 100% dedicada é perfeita para trabalho remoto. Melhor investimento que fiz.',
      rating: 5,
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#3DD93D] opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
          +20 mil clientes conectados em Campo Grande
        </h2>
        <p className="text-lg text-white/90 text-center mb-16 max-w-2xl mx-auto">
          Veja o que nossos clientes dizem sobre a InternetMais
        </p>

        {/* Depoimentos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(depoimento.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={20}
                    className="fill-[#F5C518] text-[#F5C518]"
                  />
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{depoimento.texto}"
              </p>

              {/* Autor */}
              <div>
                <h4 className="font-bold text-[#0D1B3E]">
                  {depoimento.nome}
                </h4>
                <p className="text-sm text-gray-600">
                  {depoimento.cargo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
