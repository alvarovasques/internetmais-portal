import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'wouter';

export default function Lojas() {
  const ref = useScrollAnimation();
  
  const lojas = [
    {
      nome: 'Loja Moreninhas',
      endereco: 'Rua Palmácia, 836',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'moreninha'
    },
    {
      nome: 'Loja Aero Rancho',
      endereco: 'Avenida Rachel de Queiroz, 1468',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'aero-rancho'
    },
    {
      nome: 'Loja Nova Lima',
      endereco: 'Rua Zulmira Borba, 510',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'nova-campo-grande'
    },
    {
      nome: 'Loja União',
      endereco: 'Avenida Petrópolis, 1109',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'uniao'
    },
    {
      nome: 'Loja Julio de Castilho',
      endereco: 'Avenida Julio de Castilho, 1666',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'centro'
    },
    {
      nome: 'Loja Cafezais',
      endereco: 'Av. dos Cafezais, 1985 - Loja 06',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h',
      bairro_slug: 'cafezais'
    },
  ];

  return (
    <section ref={ref} id="lojas" className="py-20 md:py-32 bg-[#F4F4F4] opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center animate-fade-in-down">
          Visite Nossas Lojas
        </h2>
        <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto animate-fade-in-up">
          Estamos presentes em 6 unidades em Campo Grande. Faça pagamentos, contrate planos e solicite atendimento com praticidade e suporte humanizado.
        </p>

        {/* Lojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {lojas.map((loja, i) => (
            <Link key={i} href={`/bairro/${loja.bairro_slug}`} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border-l-4 border-[#3DD93D] card-hover animate-fade-in-up hover:border-[#2ba82a] transition-all duration-300 block"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <MapPin size={28} className="text-[#3DD93D] mb-3" />
              <h3 className="text-base font-bold text-[#0D1B3E] mb-2 hover:text-[#3DD93D]">
                {loja.nome}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3 font-semibold">
                {loja.endereco}
              </p>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#3DD93D] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  {loja.horario}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-700 mb-6">
            Visite nosso <Link href="/bairros" className="text-[#3DD93D] font-bold hover:text-[#2ba82a]">mapa de bairros</Link> para conhecer mais sobre cada região.
          </p>
          <a
            href="https://wa.me/556730272500?text=Olá!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20a%20loja%20mais%20próxima%20e%20agendar%20um%20atendimento."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  'event': 'Click_Whatsapp',
                  'button_location': 'Lojas'
                });
              }
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            <MessageCircle size={20} />
            Falar com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
