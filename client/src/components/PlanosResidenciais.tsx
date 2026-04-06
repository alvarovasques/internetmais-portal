import { useState } from 'react';
import { Tv, BookOpen, Lock, Tag } from 'lucide-react';

export default function PlanosResidenciais() {
  const [activeTab, setActiveTab] = useState('velocidade');

  const planos = {
    velocidade: [
      { velocidade: '400 Mega', preco: 'R$ 109,90/mês', popular: false },
      { velocidade: '600 Mega', preco: 'R$ 119,90/mês', popular: true },
      { velocidade: '800 Mega', preco: 'R$ 149,90/mês', popular: false },
    ],
    aplicativos: [
      { velocidade: '400 Mega + App Standart', preco: 'R$ 129,90/mês', popular: false },
      { velocidade: '600 Mega + App Standart e Premium', preco: 'R$ 149,90/mês', popular: true },
      { velocidade: '800 Mega + App Standart e Premium', preco: 'R$ 169,90/mês', popular: false },
    ],
    globoplay: [
      { velocidade: '400 Mega Basic', preco: 'R$ 129,90/mês', popular: false },
      { velocidade: '600 Mega Premium', preco: 'R$ 159,90/mês', popular: true },
      { velocidade: '800 Mega Premium', preco: 'R$ 179,90/mês', popular: false },
    ],
  };

  const tabs = [
    { id: 'velocidade', label: 'Internet Mais Velocidade' },
    { id: 'aplicativos', label: 'Internet Mais Aplicativos' },
    { id: 'globoplay', label: 'Internet Mais Globo Play' },
  ];

  return (
    <section id="planos-residenciais" className="py-20 md:py-32 bg-[#F4F4F4]">
      <div className="container mx-auto px-4">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/family-connected-6LLg3Aruk6uCij7bV7bpJX.webp"
            alt="Família conectada"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-3 text-center">
            Escolha seu plano e comece hoje
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Todos os planos incluem MaisTV com +100 canais e instalação grátis no plano fidelidade
          </p>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#3DD93D] text-white shadow-lg'
                    : 'bg-white text-[#0D1B3E] border-2 border-gray-200 hover:border-[#3DD93D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planos[activeTab as keyof typeof planos].map((plano, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  plano.popular
                    ? 'md:scale-105 shadow-2xl'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Card Background */}
                <div className="bg-white p-8">
                  {/* Popular Badge */}
                  {plano.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-[#3DD93D] text-white font-bold py-2 px-4 text-center">
                      ⭐ MAIS POPULAR
                    </div>
                  )}

                  <div className={plano.popular ? 'mt-8' : ''}>
                    {/* Velocidade */}
                    <h3 className="text-3xl font-black text-[#0D1B3E] mb-6">
                      {plano.velocidade.split(' ')[0]}
                      <span className="text-lg text-gray-600 ml-2">Mega</span>
                    </h3>

                    {/* Preço */}
                    <p className="text-2xl font-bold text-[#3DD93D] mb-8">
                      {plano.preco}
                    </p>

                    {/* Benefícios */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Tv size={20} className="text-[#3DD93D]" />
                        <span className="text-gray-700">MaisTV (+100 canais)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen size={20} className="text-[#3DD93D]" />
                        <span className="text-gray-700">Ubook</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Lock size={20} className="text-[#3DD93D]" />
                        <span className="text-gray-700">Kaspersky</span>
                      </div>
                    </div>

                    {/* Desconto */}
                    <div className="bg-[#3DD93D]/10 border-l-4 border-[#3DD93D] p-4 mb-8 rounded">
                      <div className="flex items-center gap-2 text-[#3DD93D] font-bold">
                        <Tag size={18} />
                        <span>Desconto de R$20 por pontualidade já incluso</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wa.me/556730272500?text=Olá!%20Quero%20contratar%20o%20plano%20InternetMais"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary block text-center"
                    >
                      Contratar pelo WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-600 mt-12">
            *Instalação gratuita para contratos com fidelidade de 12 meses. Sem fidelidade: R$ 300,00.
          </p>
        </div>
      </div>
    </section>
  );
}
