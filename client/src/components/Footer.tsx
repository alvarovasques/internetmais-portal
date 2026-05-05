import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B3E] text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/Logo_internet_MAIS_9b6aefe1.png"
              alt="InternetMais - Provedor de Fibra Óptica e Chip 5G em Campo Grande, MS"
              className="h-32 md:h-40 mb-6"
              loading="lazy"
            />
            <p className="text-gray-400 text-sm">
              Fibra óptica de alta velocidade e operadora de celular 5G em Campo Grande.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Residencial</a>
              </li>
              <li>
                <a href="#empresarial" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Empresarial</a>
              </li>
              <li>
                <a href="#chip-5g" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Telefonia</a>
              </li>
              <li>
                <a href="https://www.portaldoassinante.com/internetmais/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Aplicativos</a>
              </li>
              <li>
                <a href="https://sistema.freewaynet.com.br/central_assinante_web/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Central do Assinante</a>
              </li>
              <li>
                <a href="/sobre-nos" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="/sobre-nos" className="text-gray-400 hover:text-[#3DD93D] transition-colors">Nossas Lojas</a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="tel:+556730272500"
                  className="hover:text-[#3DD93D] transition-colors"
                >
                  (67) 3027-2500
                </a>
              </li>
              <li>
                <a
                  href="mailto:atendimento@internetmais.net"
                  className="hover:text-[#3DD93D] transition-colors"
                >
                  atendimento@internetmais.net
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/556730272500"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'Click_Whatsapp',
                        'button_location': 'Footer - Contato'
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 hover:text-[#3DD93D] transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/internetmaisms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3DD93D] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/InternetMaisMS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3DD93D] transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://wa.me/556730272500"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'Click_Whatsapp',
                      'button_location': 'Footer - Redes Sociais'
                    });
                  }
                }}
                className="text-gray-400 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              InternetMais — Grupo Easy Net | Campo Grande/MS
            </p>
            <p>
              © 2026 InternetMais. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
