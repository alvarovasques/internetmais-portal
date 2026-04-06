import { LogIn, FileText, CreditCard, Headphones } from 'lucide-react';

export default function AreaAssinante() {
  const features = [
    {
      icon: LogIn,
      title: 'Acesso Fácil',
      desc: 'Faça login com seus dados de cliente para acessar sua conta',
    },
    {
      icon: FileText,
      title: 'Faturas',
      desc: 'Consulte e baixe suas faturas mensais em um só lugar',
    },
    {
      icon: CreditCard,
      title: 'Pagamentos',
      desc: 'Realize pagamentos de forma segura e rápida',
    },
    {
      icon: Headphones,
      title: 'Suporte',
      desc: 'Abra chamados técnicos e acompanhe seu atendimento',
    },
  ];

  return (
    <section id="area-assinante" className="py-20 md:py-32 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center">
          Central do Assinante
        </h2>
        <p className="text-lg text-gray-700 text-center mb-16 max-w-2xl mx-auto">
          Gerencie sua conta, faturas, pagamentos e solicite suporte técnico de forma rápida e segura.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl card-hover border-t-4 border-[#3DD93D]"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-[#3DD93D]/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon size={32} className="text-[#3DD93D]" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0D1B3E] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Login CTA */}
        <div className="bg-gradient-to-r from-[#3DD93D] to-[#1A5BA6] rounded-2xl p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
            Já é assinante?
          </h3>
          <p className="text-white/90 mb-8 text-lg">
            Acesse sua Central do Assinante para gerenciar sua conta
          </p>
          <a
            href="https://sistema.freewaynet.com.br/central_assinante_web/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3DD93D] font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <LogIn size={20} />
            Acessar Central do Assinante
          </a>
        </div>

        {/* Support Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#3DD93D]">
            <h4 className="text-xl font-bold text-[#0D1B3E] mb-4">
              Problemas de Conexão?
            </h4>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você com qualquer problema técnico.
            </p>
            <a
              href="https://sistema.freewaynet.com.br/central_assinante_web/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3DD93D] font-bold hover:underline"
            >
              Abrir Chamado Técnico →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#1A5BA6]">
            <h4 className="text-xl font-bold text-[#0D1B3E] mb-4">
              Dúvidas sobre sua Fatura?
            </h4>
            <p className="text-gray-600 mb-6">
              Consulte suas faturas, histórico de pagamentos e outras informações importantes.
            </p>
            <a
              href="https://sistema.freewaynet.com.br/central_assinante_web/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A5BA6] font-bold hover:underline"
            >
              Falar com Atendente →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
