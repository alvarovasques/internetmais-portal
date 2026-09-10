import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B3E] text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div>
            <img
              src="/images/marca/logo-internet-mais.png"
              alt="Internet Mais - Provedor de Fibra Óptica e Chip 5G em Campo Grande, MS"
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
              {[
                { rotulo: 'Mais Velocidade', href: '/#mais-velocidade' },
                { rotulo: 'Mais Aplicativos', href: '/#mais-aplicativos' },
                { rotulo: 'Mais GloboPlay', href: '/#mais-globoplay' },
                { rotulo: 'Empresarial', href: '/#empresarial' },
                { rotulo: 'Telefonia', href: '/#chip-5g' },
                { rotulo: 'MaisTV', href: '/maistv' },
                { rotulo: 'Sobre Nós', href: '/sobre-nos' },
                { rotulo: 'Nossas Lojas', href: '/lojas' },
                { rotulo: 'Internet nos Bairros', href: '/bairros' },
                { rotulo: 'Trabalhe Conosco', href: '/vagas' },
                {
                  rotulo: 'Gerenciar Aplicativos',
                  href: 'https://www.portaldoassinante.com/internetmais/login',
                  externo: true,
                },
                {
                  rotulo: 'Central do Assinante',
                  href: 'https://sistema.freewaynet.com.br/central_assinante_web/login',
                  externo: true,
                },
              ].map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    target={item.externo ? '_blank' : undefined}
                    rel={item.externo ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-[#3DD93D] transition-colors"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
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
                aria-label="Internet Mais no Instagram"
                className="text-gray-400 hover:text-[#3DD93D] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/InternetMaisMS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Internet Mais no Facebook"
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
                aria-label="Falar com a Internet Mais no WhatsApp"
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
              Internet Mais — Grupo Easy Net | Campo Grande/MS
            </p>
            <p>
              © 2026 Internet Mais. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
