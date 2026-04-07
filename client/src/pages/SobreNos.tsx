import { Target, Eye, Heart, MapPin, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

  const lojas = [
    {
      nome: 'Loja Moreninhas',
      endereco: 'Rua Palmácia, 836',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h'
    },
    {
      nome: 'Loja Aero Rancho',
      endereco: 'Avenida Rachel de Queiroz, 1468',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h'
    },
    {
      nome: 'Loja Nova Lima',
      endereco: 'Rua Zulmira Borba, 510',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h'
    },
    {
      nome: 'Loja Los Angeles',
      endereco: 'Rua Campo Nobre, 654',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h'
    },
    {
      nome: 'Loja União',
      endereco: 'Avenida Petrópolis, 1109',
      horario: 'Seg-Sex: 8h-18h | Sab: 8h-12h'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header com Logo */}
      <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1A5BA6] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sobre a InternetMais
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Conectando vidas e impulsionando o futuro de Campo Grande desde 2017
          </p>
        </div>
      </div>

      <main className="flex-1">
        {/* Missão */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Conectar vidas e impulsionar o futuro de Campo Grande e região, oferecendo acesso à internet de fibra óptica de ultra velocidade e alta confiabilidade, com um serviço descomplicado e humanizado, que empodere nossos clientes a explorar todo o potencial do mundo digital.
              </p>
            </div>
          </div>
        </section>

        {/* Visão */}
        <section className="py-20 md:py-32 bg-[#F4F4F4]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-6">Nossa Visão</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser reconhecida como o provedor de internet mais inovador, confiável e preferido de Mato Grosso do Sul, estabelecendo um novo padrão de excelência em conectividade e atendimento ao cliente. Aspiramos a ser sinônimo de futuro, confiança e inovação, construindo relações duradouras com nossos clientes baseadas na transparência e na qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-12 text-center">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valores.map((valor, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#3DD93D]/10 to-[#1A5BA6]/10 rounded-2xl p-8 border border-[#3DD93D]/20 animate-scale-in"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <valor.icon size={40} className="text-[#3DD93D] mb-4" />
                  <h3 className="text-xl font-bold text-[#0D1B3E] mb-3">{valor.title}</h3>
                  <p className="text-gray-600">{valor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lojas */}
        <section className="py-20 md:py-32 bg-[#F4F4F4]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
              Visite Nossas Lojas
            </h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Atendimento presencial em 5 lojas em Campo Grande. Suporte técnico, contratação e atendimento humanizado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {lojas.map((loja, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-l-4 border-[#3DD93D] card-hover animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <MapPin size={32} className="text-[#3DD93D] mb-4" />
                  <h3 className="text-lg font-bold text-[#0D1B3E] mb-2">
                    {loja.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-semibold">
                    {loja.endereco}
                  </p>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#3DD93D] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600">
                      {loja.horario}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
