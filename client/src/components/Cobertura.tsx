import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Cobertura() {
  const ref = useScrollAnimation();
  const bairros = [
    'Aero Rancho',
    'Alves Pereira',
    'Bandeirantes',
    'Batistão',
    'Caiçara',
    'Caiobá',
    'Carvalho',
    'Centenário',
    'Centro',
    'Centro Oeste',
    'Cophavila II',
    'Cruzeiro',
    'Guanandi',
    'Jacy',
    'Jardim dos Estados',
    'Jockey Club',
    'José Abrão',
    'Lageado',
    'Leblon',
    'Los Angeles',
    'Moreninha',
    'Nasser',
    'Nova Campo Grande',
    'Núcleo Industrial',
    'Panamá',
    'Popular',
    'Rita Vieira',
    'Santo Amaro',
    'Santo Antônio',
    'São Conrado',
    'Seminário',
    'Sobrinho',
    'Taquarussu',
    'Tarumã',
    'Taveiropólis',
    'Tijuca',
    'Tiradentes',
    'União',
    'Universitário',
  ];

  return (
    <section ref={ref} id="cobertura" className="py-20 md:py-32 bg-white opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Área de Cobertura
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
          Confira se sua região está na nossa área de cobertura. Estamos presentes em mais de 70% dos bairros de Campo Grande desde 2017.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#3DD93D]/10 rounded-2xl p-8 text-center border-2 border-[#3DD93D]">
            <h3 className="text-4xl font-black text-[#3DD93D] mb-2">39+</h3>
            <p className="text-gray-700 font-semibold">Bairros cobertos</p>
          </div>
          <div className="bg-[#1A5BA6]/10 rounded-2xl p-8 text-center border-2 border-[#1A5BA6]">
            <h3 className="text-4xl font-black text-[#1A5BA6] mb-2">100%</h3>
            <p className="text-gray-700 font-semibold">Fibra Óptica</p>
          </div>
          <div className="bg-[#F5C518]/10 rounded-2xl p-8 text-center border-2 border-[#F5C518]">
            <h3 className="text-4xl font-black text-[#F5C518] mb-2">20k+</h3>
            <p className="text-gray-700 font-semibold">Clientes satisfeitos</p>
          </div>
        </div>

        {/* Bairros Grid */}
        <div className="bg-[#F4F4F4] rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-bold text-[#0D1B3E] mb-8">Bairros atendidos:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bairros.map((bairro, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border-l-4 border-[#3DD93D] hover:shadow-md transition-all duration-300"
              >
                <CheckCircle2 size={20} className="text-[#3DD93D] flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm">{bairro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Não encontrou seu bairro? Fale com nosso time!
          </p>
          <a
            href="https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20para%20verificar%20se%20meu%20bairro%20tem%20cobertura%20da%20InternetMais."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Verificar Cobertura
          </a>
        </div>
      </div>
    </section>
  );
}
