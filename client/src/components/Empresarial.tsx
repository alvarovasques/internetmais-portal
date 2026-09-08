import { Wifi, Clock, Network } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';

export default function Empresarial() {
  const ref = useScrollAnimation();
  useViewPlanTracker(ref as React.RefObject<HTMLElement>, {
    section_name: 'Empresarial',
    plan_type: 'Internet Empresarial',
  });
  const planos = [
    { velocidade: '400 Mega', preco: 'R$ 229,90/mês' },
    { velocidade: '600 Mega', preco: 'R$ 269,90/mês' },
    { velocidade: '800 Mega', preco: 'R$ 309,90/mês' },
  ];

  return (
    <section ref={ref} id="empresarial" className="relative py-20 md:py-32 overflow-hidden opacity-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/bg/office-modern.webp"
          alt="Internet empresarial com suporte especializado para negócios em Campo Grande"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD93D]/85 via-[#3DD93D]/70 to-white/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Sua empresa merece uma conexão à altura
        </h2>
        <p className="text-lg text-[#0D1B3E]/85 text-center mb-4 max-w-2xl mx-auto">
          Planos corporativos, Suporte Técnico até 12h e estabilidade para o seu negócio.
        </p>
        <p className="text-sm text-[#0D1B3E]/75 text-center mb-16 max-w-2xl mx-auto">
          Procurando por planos residenciais? Conheça{' '}
          <a href="#mais-velocidade" className="font-bold text-[#0D1B3E] underline underline-offset-2 hover:text-[#0D1B3E]/70">
            Mais Velocidade
          </a>
          ,{' '}
          <a href="#mais-aplicativos" className="font-bold text-[#0D1B3E] underline underline-offset-2 hover:text-[#0D1B3E]/70">
            Mais Aplicativos
          </a>{' '}
          ou{' '}
          <a href="#mais-globoplay" className="font-bold text-[#0D1B3E] underline underline-offset-2 hover:text-[#0D1B3E]/70">
            Mais GloboPlay
          </a>
          .
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
                  <Clock size={20} className="text-[#3DD93D]" />
                  <span className="text-gray-700 font-semibold">Suporte Técnico até 12h</span>
                </div>
                <div className="flex items-center gap-3">
                  <Network size={20} className="text-[#3DD93D]" />
                  <span className="text-gray-700 font-semibold">IP Dinâmico (PPoE)</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20o%20plano%20${plano.velocidade}%20de%20internet%20empresarial%20da%20InternetMais.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'Click_Whatsapp',
                      'button_location': `Empresarial - ${plano.velocidade}`,
                      'plan_name': plano.velocidade,
                      'plan_price': plano.preco,
                      'plan_type': 'Internet Empresarial'
                    });
                  }
                }}
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
