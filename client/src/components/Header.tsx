import { Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Planos Residenciais', href: '#planos-residenciais' },
    { label: 'Empresarial', href: '#empresarial' },
    { label: 'Chip 5G', href: '#chip-5g' },
    { label: 'Aplicativos', href: '#aplicativos' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Central do Assinante', href: '#area-assinante' },
    { label: 'Lojas', href: '#lojas' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/Logo_internet_MAIS_9b6aefe1.png"
              alt="InternetMais Logo"
              className="h-16 md:h-20"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20conhecer%20os%20planos%20da%20InternetMais"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white font-bold py-2 px-4 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0D1B3E]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/556730272500?text=Olá!%20Quero%20conhecer%20os%20planos%20da%20InternetMais"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 w-full bg-[#25D366] text-white font-bold py-2 px-4 rounded-full text-center hover:bg-[#20ba5a] hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
