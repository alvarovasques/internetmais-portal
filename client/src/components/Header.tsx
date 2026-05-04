import { useState } from 'react';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems = [
    {
      label: 'Sobre Nós',
      href: '/sobre-nos',
      submenu: [
        { label: 'Missão, Visão e Valores', href: '/sobre-nos' },
        { label: 'Nossas Lojas', href: '/sobre-nos#lojas' },
        { label: 'Cobertura', href: '/sobre-nos#cobertura' },
      ]
    },
    {
      label: 'Residencial',
      href: '/#planos-residenciais',
      submenu: []
    },
    {
      label: 'Empresarial',
      href: '/#empresarial',
      submenu: []
    },
    {
      label: 'Telefonia',
      href: '/',
      submenu: [
        { label: 'Chip 5G', href: '/#chip-5g' },
        { label: 'Telefonia Fixa', href: '/#telefonia-fixa' },
      ]
    },
    {
      label: 'Aplicativos',
      href: 'https://www.portaldoassinante.com/internetmais/login',
      external: true
    },
    {
      label: 'Central do Assinante',
      href: 'https://sistema.freewaynet.com.br/central_assinante_web/login',
      external: true
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/Logo_internet_MAIS_9b6aefe1.png"
              alt="InternetMais - Fibra Óptica, 5G e Internet Empresarial em Campo Grande"
              className="h-24 md:h-32"
              loading="lazy"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && item.submenu.length > 0 && (
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                  )}
                </a>

                {/* Desktop Submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-[#0D1B3E] hover:bg-[#3DD93D]/10 hover:text-[#3DD93D] transition-colors"
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20conhecer%20os%20planos%20da%20InternetMais"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  'event': 'Click_Whatsapp',
                  'button_location': 'Header - Desktop'
                });
              }
            }}
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
              <div key={item.label}>
                {/* Items with submenu - render as button */}
                {item.submenu && item.submenu.length > 0 ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                      className="w-full text-left py-2 text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Mobile Submenu */}
                    {openSubmenu === item.label && (
                      <div className="bg-gray-50 rounded-lg mt-2 py-2">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.label}
                            href={subitem.href}
                            className="block px-4 py-2 text-xs text-[#0D1B3E] hover:text-[#3DD93D] transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.external ? (
                  /* External link */
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  /* Regular link */
                  <a
                    href={item.href}
                    className="block py-2 text-sm font-semibold text-[#0D1B3E] hover:text-[#3DD93D] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href="https://wa.me/556730272500?text=Olá!%20Quero%20conhecer%20os%20planos%20da%20InternetMais"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    'event': 'Click_Whatsapp',
                    'button_location': 'Header - Mobile'
                  });
                }
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2 px-4 rounded-full hover:bg-[#20ba5a] transition-all duration-300 w-full"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
