import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'planos' | 'instalacao' | 'suporte';
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  // Planos
  {
    id: 'planos-1',
    category: 'planos',
    question: 'Qual é a diferença entre os planos de velocidade?',
    answer: 'Nossos planos variam de 400 Mega até 800 Mega. A velocidade determina a quantidade de dados que você consegue transmitir por segundo. Quanto maior a velocidade, melhor para múltiplos usuários e dispositivos conectados simultaneamente.',
  },
  {
    id: 'planos-2',
    category: 'planos',
    question: 'Posso mudar de plano depois de contratar?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade de plano consulte as condições a qualquer momento. Basta entrar em contato conosco via WhatsApp ou acessar sua Central do Assinante para solicitar a mudança.',
  },
  {
    id: 'planos-3',
    category: 'planos',
    question: 'O desconto de 20% para novos clientes por pontualidade é automático?',
    answer: 'Sim, o desconto é aplicado automaticamente na sua fatura quando você paga em dia. Ele é válido para os planos Internet + Velocidade e Internet + Aplicativos.',
  },
  {
    id: 'planos-4',
    category: 'planos',
    question: 'Quais aplicativos estão inclusos no plano Internet + Aplicativos?',
    answer: 'O plano inclui acesso ilimitado a plataformas de streaming como Globo Play, além de outros aplicativos parceiros. Consulte nossa seção de Aplicativos para a lista completa.',
  },
  // Instalação
  {
    id: 'instalacao-1',
    category: 'instalacao',
    question: 'Quanto tempo leva para instalar a fibra óptica?',
    answer: 'A instalação geralmente leva entre 1 a 3 horas, dependendo da complexidade da sua residência. Você pode agendar o horário mais conveniente através da nossa Central do Assinante ou WhatsApp.',
  },
  {
    id: 'instalacao-2',
    category: 'instalacao',
    question: 'Há taxa de instalação?',
    answer: 'Oferecemos promoções frequentes com instalação gratuita. Consulte as condições atuais entrando em contato conosco via WhatsApp para saber se você está elegível.',
  },
  {
    id: 'instalacao-3',
    category: 'instalacao',
    question: 'Preciso fazer alguma preparação em casa antes da instalação?',
    answer: 'Não é necessário fazer grandes preparações. Nossos técnicos cuidam de tudo. Apenas certifique-se de que o local onde a fibra será instalada está acessível.',
  },
  {
    id: 'instalacao-4',
    category: 'instalacao',
    question: 'Qual é o prazo para ativar meu plano após a contratação?',
    answer: 'Após a contratação, você pode agendar a instalação em até 7 dias. A ativação ocorre no mesmo dia da instalação, e você já sai com a internet funcionando.',
  },
  // Suporte
  {
    id: 'suporte-1',
    category: 'suporte',
    question: 'Como faço para entrar em contato com o suporte técnico?',
    answer: 'Você pode nos contatar via WhatsApp, acessar a Central do Assinante, ou visitar uma de nossas lojas físicas. Nosso atendimento está disponível de segunda a sexta, das 8h às 18h.',
  },
  {
    id: 'suporte-2',
    category: 'suporte',
    question: 'Minha internet está lenta. O que fazer?',
    answer: 'Primeiro, reinicie seu modem e roteador. Se o problema persistir, verifique se há interferência de outros aparelhos. Entre em contato com nosso suporte técnico para diagnóstico completo.',
  },
  {
    id: 'suporte-3',
    category: 'suporte',
    question: 'Qual é o tempo médio de resposta do suporte?',
    answer: 'Nosso suporte técnico responde em até 2 horas durante o horário comercial. Para emergências fora do horário, deixe uma mensagem que retornaremos assim que possível.',
  },
  {
    id: 'suporte-4',
    category: 'suporte',
    question: 'Há cobertura de Wi-Fi 6 em todos os planos?',
    answer: 'Sim! Todos os nossos planos incluem roteador Wi-Fi 6 com cobertura otimizada. Para planos empresariais, oferecemos suporte especializado e configuração avançada.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'planos' | 'instalacao' | 'suporte'>('planos');

  const filteredItems = faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4 text-center animate-fade-in-down animate-delay-100">
          Perguntas Frequentes
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
          Encontre respostas para as dúvidas mais comuns sobre nossos planos, instalação e suporte técnico
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up animate-delay-300">
          {(['planos', 'instalacao', 'suporte'] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenId(null);
              }}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#3DD93D] text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'planos' && 'Planos'}
              {category === 'instalacao' && 'Instalação'}
              {category === 'suporte' && 'Suporte Técnico'}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up animate-delay-400">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#3DD93D] transition-all duration-300 hover:shadow-lg"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="text-left font-bold text-[#0D1B3E] text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-[#3DD93D] flex-shrink-0 transition-transform duration-300 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openId === item.id && (
                <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-white border-t-2 border-[#3DD93D] animate-fade-in-down">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in-up animate-delay-500">
          <p className="text-gray-600 mb-4">Não encontrou sua dúvida?</p>
          <a
            href="https://wa.me/556730272500?text=Olá! Tenho uma dúvida que não está nas perguntas frequentes. Gostaria de falar com um representante da InternetMais."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-8 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.39 1.242-3.286 2.128-1.797 1.809-2.745 4.05-2.745 6.741 0 1.298.199 2.541.58 3.734L2.822 22l3.99-1.317c1.257.905 2.86 1.383 4.471 1.383 5.255 0 9.517-4.262 9.517-9.517 0-2.543-.991-4.953-2.792-6.754-1.802-1.8-4.165-2.792-6.754-2.792" />
            </svg>
            Falar com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
