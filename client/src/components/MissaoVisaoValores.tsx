import { Target, Eye, Heart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MissaoVisaoValores() {
  const ref = useScrollAnimation();

  const valores = [
    {
      icon: Heart,
      title: 'Foco no Cliente',
      desc: 'O cliente está no centro de tudo o que fazemos. Entendemos suas necessidades e superamos expectativas.'
    },
    {
      icon: Target,
      title: 'Inovação Contínua',
      desc: 'Buscamos incessantemente novas tecnologias para aprimorar nossos serviços.'
    },
    {
      icon: Eye,
      title: 'Confiabilidade',
      desc: 'Nossa rede 100% fibra óptica é sinônimo de estabilidade e desempenho ininterrupto.'
    },
  ];

  return (
    <section ref={ref} id="missao-visao" className="py-20 md:py-32 bg-white opacity-0">
      <div className="container mx-auto px-4">
        {/* Missão */}
        <div className="mb-20 animate-fade-in-up animate-delay-100">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-6">Nossa Missão</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            Conectar vidas e impulsionar o futuro de Campo Grande e região, oferecendo acesso à internet de fibra óptica de ultra velocidade e alta confiabilidade, com um serviço descomplicado e humanizado, que empodere nossos clientes a explorar todo o potencial do mundo digital.
          </p>
        </div>

        {/* Visão */}
        <div className="mb-20 animate-fade-in-up animate-delay-200">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-6">Nossa Visão</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            Ser reconhecida como o provedor de internet mais inovador, confiável e preferido de Mato Grosso do Sul, estabelecendo um novo padrão de excelência em conectividade e atendimento ao cliente. Aspiramos a ser sinônimo de futuro, confiança e inovação, construindo relações duradouras com nossos clientes baseadas na transparência e na qualidade.
          </p>
        </div>

        {/* Valores */}
        <div className="animate-fade-in-up animate-delay-300">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((valor, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#3DD93D]/10 to-[#1A5BA6]/10 rounded-2xl p-8 border border-[#3DD93D]/20 animate-scale-in"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <valor.icon size={40} className="text-[#3DD93D] mb-4" />
                <h3 className="text-xl font-bold text-[#0D1B3E] mb-3">{valor.title}</h3>
                <p className="text-gray-600">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
