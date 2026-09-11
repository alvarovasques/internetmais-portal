import { Target, Eye, Heart, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LOJAS, HORARIO } from '@/data/lojas';

export default function SobreNos() {
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
    <div className="min-h-screen flex flex-col bg-[#04060A] text-[#E8F1E9]">
      <Header />

      <main className="flex-1">
        {/* Abertura */}
        <section className="pt-12 pb-2 md:pt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-[#E8F1E9]">
                Sobre a Internet Mais
              </h1>
              <p className="mt-3 text-base md:text-lg text-[#93A69B]">
                Provedor de fibra óptica com rede própria em Campo Grande, Mato Grosso do Sul.
              </p>
            </div>
          </div>
        </section>

        {/* Missão */}
        <section className="py-12 md:py-16 bg-[#0A1730]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#E8F1E9] mb-4">Nossa Missão</h2>
              <p className="text-base md:text-lg text-[#CBD8CE] leading-relaxed">
                Conectar vidas e impulsionar o futuro de Campo Grande e região, oferecendo acesso à internet de fibra óptica de ultra velocidade e alta confiabilidade, com um serviço descomplicado e humanizado, que empodere nossos clientes a explorar todo o potencial do mundo digital.
              </p>
            </div>
          </div>
        </section>

        {/* Visão */}
        <section className="py-12 md:py-16 bg-[#060E1E]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#E8F1E9] mb-4">Nossa Visão</h2>
              <p className="text-base md:text-lg text-[#CBD8CE] leading-relaxed">
                Ser reconhecida como o provedor de internet mais inovador, confiável e preferido de Mato Grosso do Sul, estabelecendo um novo padrão de excelência em conectividade e atendimento ao cliente. Aspiramos a ser sinônimo de futuro, confiança e inovação, construindo relações duradouras com nossos clientes baseadas na transparência e na qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-12 md:py-16 bg-[#0A1730]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#E8F1E9] mb-8 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {valores.map((valor, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#3DD93D]/10 to-[#1A5BA6]/10 rounded-2xl p-6 border border-[#3DD93D]/20 animate-scale-in"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <valor.icon size={40} className="text-[#3DD93D] mb-3" />
                  <h3 className="text-lg font-bold text-[#E8F1E9] mb-2">{valor.title}</h3>
                  <p className="text-sm md:text-base text-[#93A69B]">{valor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Lojas */}
        <section id="lojas" className="py-12 md:py-16 bg-[#060E1E]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#E8F1E9] mb-3 text-center">
              Visite Nossas Lojas
            </h2>
            <p className="text-base md:text-lg text-[#93A69B] text-center mb-10 max-w-2xl mx-auto">
              Atendimento presencial em 4 unidades em Campo Grande. Suporte técnico, contratação e atendimento humanizado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {LOJAS.map((loja, i) => (
                <div
                  key={i}
                  className="bg-[#0A1730] rounded-2xl p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:shadow-[0_26px_70px_-24px_rgba(0,0,0,.9)] border-l-4 border-[#3DD93D] card-hover animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <MapPin size={28} className="text-[#3DD93D] mb-3" />
                  <h3 className="text-base font-bold text-[#E8F1E9] mb-2">
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
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
