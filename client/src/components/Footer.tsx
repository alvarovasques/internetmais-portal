import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B3E] text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#3DD93D] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">IM</span>
              </div>
              <span className="text-xl font-black">InternetMais</span>
            </div>
            <p className="text-gray-400 text-sm">
              Fibra óptica de alta velocidade e operadora de celular 5G em Campo Grande.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Planos', 'Empresarial', 'Chip 5G', 'Lojas', 'Privacidade'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#3DD93D] transition-colors"
                  >
                    {link}
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3DD93D] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
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
                className="text-gray-400 hover:text-[#3DD93D] transition-colors"
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
