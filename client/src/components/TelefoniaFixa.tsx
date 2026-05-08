import { Phone, MessageCircle, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function TelefoniaFixa() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} id="telefonia-fixa" className="py-20 md:py-32 bg-white opacity-0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down animate-delay-100">
          <h2 className="text-3xl md:text-4xl font-black text-[#0D1B3E] mb-4">
            Telefonia Fixa
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantenha-se conectado com nossa linha telefônica fixa de qualidade
          </p>
        </div>

        {/* Plan Card */}
        <div className="max-w-2xl mx-auto animate-scale-in animate-delay-200">
          <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1A5BA6] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            {/* Icon */}
            <Phone size={48} className="text-[#3DD93D] mb-6" />

            {/* Title */}
            <h3 className="text-3xl font-black mb-2">Telefonia Fixa</h3>
            <p className="text-white/80 mb-8">Comunicação clara e confiável para sua casa ou negócio</p>

            {/* Price */}
            <div className="mb-8 pb-8 border-b-2 border-white/20">
              <p className="text-5xl font-black text-[#3DD93D]">R$ 49,90</p>
              <p className="text-white/80">por mês</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check size={24} className="text-[#3DD93D] flex-shrink-0" />
                <span className="font-semibold">Ilimitado de fixo para fixo</span>
              </div>
              <div className="flex items-start gap-3">
                <Check size={24} className="text-[#3DD93D] flex-shrink-0" />
                <span className="font-semibold">Identificador de chamadas</span>
              </div>

            </div>

            {/* Note */}
            <p className="text-sm text-white/70 mb-8">
              *Aparelho telefônico não fornecido
            </p>

            {/* CTA Button */}
            <a
              href="https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20a%20Telefonia%20Fixa%20da%20InternetMais."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    'event': 'Click_Whatsapp',
                    'button_location': 'TelefoniaFixa'
                  });
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#3DD93D] font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} />
              Contratar Agora
            </a>
          </div>
        </div>

        {/* Combo Info */}
        <div className="mt-16 bg-[#F4F4F4] rounded-2xl p-8 animate-fade-in-up animate-delay-300">
          <h3 className="text-xl font-bold text-[#0D1B3E] mb-6">Combos Especiais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border-l-4 border-[#3DD93D]">
              <h4 className="font-bold text-[#0D1B3E] mb-2">Internet + Fixo</h4>
              <p className="text-gray-600 mb-3">Escolha qualquer plano de internet + telefone fixo</p>
              <p className="text-lg font-bold text-[#3DD93D]">5% de desconto no combo</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-[#3DD93D]">
              <h4 className="font-bold text-[#0D1B3E] mb-2">Internet + Móvel</h4>
              <p className="text-gray-600 mb-3">Escolha qualquer plano de internet + chip 5G</p>
              <p className="text-lg font-bold text-[#3DD93D]">5% de desconto no combo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
