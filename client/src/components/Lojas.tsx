import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'wouter';
import { LOJAS, HORARIO } from '@/data/lojas';

export default function Lojas() {
  const ref = useScrollAnimation();
  

  return (
    <section ref={ref} id="lojas" className="py-20 md:py-32 bg-[#060E1E] opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#E8F1E9] mb-4 text-center animate-fade-in-down">
          Visite Nossas Lojas
        </h2>
        <p className="text-lg text-[#CBD8CE] text-center mb-16 max-w-2xl mx-auto animate-fade-in-up">
          Estamos presentes em 4 unidades em Campo Grande. Faça pagamentos, contrate planos e solicite atendimento com praticidade e suporte humanizado.
        </p>

        {/* Lojas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {LOJAS.map((loja, i) => (
            <Link key={loja.slug} href={`/lojas/${loja.slug}`} aria-label={`Ver a loja ${loja.curto}`} className="bg-[#0A1730] rounded-2xl p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:shadow-[0_26px_70px_-24px_rgba(0,0,0,.9)] border-l-4 border-[#3DD93D] card-hover animate-fade-in-up hover:border-[#2ba82a] transition-all duration-300 block"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <MapPin size={28} className="text-[#3DD93D] mb-3" />
              <h3 className="text-base font-bold text-[#E8F1E9] mb-2 hover:text-[#3DD93D]">
                {loja.curto}
              </h3>
              <p className="text-xs md:text-sm text-[#93A69B] mb-3 font-semibold">
                {loja.logradouro}
              </p>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#3DD93D] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#93A69B]">
                  {HORARIO}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#CBD8CE] mb-6">
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
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full hover:bg-[#20ba5a] hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            <MessageCircle size={20} />
            Falar com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
