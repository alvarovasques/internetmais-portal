import { useState, useCallback } from 'react';
import { Menu, X, MessageCircle, ChevronDown, TvMinimalPlay, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Modal de login MaisTV
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginCooldown, setLoginCooldown] = useState(0);

  const loginMutation = trpc.maistv.login.useMutation();

  const navItems = [
    {
      label: 'Sobre Nós',
      href: '/sobre-nos',
      submenu: [
        { label: 'Missão, Visão e Valores', href: '/sobre-nos' },
        { label: 'Nossas Lojas', href: '/#lojas' },
        { label: 'Internet nos Bairros', href: '/bairros' },
      ]
    },
    {
      label: 'Residencial',
      href: '/#planos-residenciais',
      submenu: [
        { label: 'Mais Velocidade', href: '/#mais-velocidade' },
        { label: 'Mais Aplicativos', href: '/#mais-aplicativos' },
        { label: 'Mais GloboPlay', href: '/#mais-globoplay' },
      ]
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
      href: '#',
      submenu: [
        { label: 'Gerenciar Aplicativos', href: 'https://www.portaldoassinante.com/internetmais/login', external: true },
        { label: 'MaisTV', href: '/maistv' },
      ]
    },
    {
      label: 'Central do Assinante',
      href: 'https://sistema.freewaynet.com.br/central_assinante_web/login',
      external: true
    },
  ];

  const handleLoginSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      // Chamada via proxy server-side (evita CORS, HTTP2 e rate limit por IP do usuário)
      const result = await loginMutation.mutateAsync({
        username: loginUser,
        password: loginPwd,
      });

      const data = result.data;

      // Gravar o token no localStorage do domínio maistv.internetmais.net
      // usando um iframe oculto (subdomínio do mesmo domínio raiz)
      await new Promise<void>((resolve, reject) => {
        const existing = document.getElementById('maistv-auth-bridge-header');
        if (existing) existing.remove();

        const iframe = document.createElement('iframe');
        iframe.id = 'maistv-auth-bridge-header';
        iframe.src = 'https://maistv.internetmais.net/';
        iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none;';
        document.body.appendChild(iframe);

        const timeout = setTimeout(() => {
          iframe.remove();
          reject(new Error('TIMEOUT'));
        }, 15000);

        iframe.onload = () => {
          try {
            const ls = iframe.contentWindow!.localStorage;
            ls.setItem('token', data.token);
            ls.setItem('rtoken', data.rtoken);
            ls.setItem('expire', String(data.expire * 1000));
            ls.setItem('user', data.username);
            ls.setItem('svod', String(data.svod ?? false));
            if (data.email) ls.setItem('email', data.email);
            if (data.parpass) ls.setItem('parpass', data.parpass);
            if (data.parental) ls.setItem('parental', data.parental);
            if (data.rating !== undefined) ls.setItem('rating', String(data.rating));
            clearTimeout(timeout);
            iframe.remove();
            resolve();
          } catch (err) {
            clearTimeout(timeout);
            iframe.remove();
            reject(err);
          }
        };

        iframe.onerror = () => {
          clearTimeout(timeout);
          iframe.remove();
          reject(new Error('TIMEOUT'));
        };
      });

      window.open('https://maistv.internetmais.net/', '_blank');
      setLoginOpen(false);
      setLoginUser('');
      setLoginPwd('');

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'TIMEOUT') {
        // Fallback: abrir página de login diretamente
        window.open('https://maistv.internetmais.net/login', '_blank');
        setLoginOpen(false);
        setLoginUser('');
        setLoginPwd('');
      } else {
        setLoginError('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setLoginLoading(false);
    }
  }, [loginUser, loginPwd]);

  return (
    <>
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

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Botão MaisTV - redireciona para login */}
              <a
                href="https://maistv.internetmais.net/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0D1B3E] text-white font-bold py-2 px-4 rounded-full hover:bg-[#1a2d5a] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
              >
                <TvMinimalPlay size={16} />
                <span>MaisTV</span>
              </a>

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
                className="flex items-center gap-2 bg-[#25D366] text-white font-bold py-2 px-4 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>

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

              {/* Mobile: Já sou assinante */}
              <button
                onClick={() => { window.open('https://maistv.internetmais.net/login', '_blank'); setMobileMenuOpen(false); }}
                className="mt-3 flex items-center justify-center gap-2 bg-[#0D1B3E] text-white font-bold py-2 px-4 rounded-full hover:bg-[#1a2d5a] transition-all duration-300 w-full"
              >
                <TvMinimalPlay size={16} />
                <span>MaisTV</span>
              </button>

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
                className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2 px-4 rounded-full hover:bg-[#20ba5a] transition-all duration-300 w-full"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Modal de Login MaisTV */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setLoginOpen(false); }}
        >
          <div className="bg-[#0D1B3E] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl relative">
            {/* Fechar */}
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho do modal */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#3DD93D]/20 rounded-xl flex items-center justify-center">
                <TvMinimalPlay size={20} className="text-[#3DD93D]" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">Acessar MaisTV</h2>
                <p className="text-white/50 text-xs">Entre com suas credenciais de assinante</p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  Usuário
                </label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="Seu usuário ou e-mail"
                  required
                  autoFocus
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3DD93D] focus:bg-white/15 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={loginPwd}
                  onChange={(e) => setLoginPwd(e.target.value)}
                  placeholder="Sua senha"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3DD93D] focus:bg-white/15 transition-all text-sm"
                />
              </div>

              {loginError && (
                <div className="flex items-start gap-2 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2">
                  <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-300 text-xs">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading || loginCooldown > 0}
                className="w-full bg-[#3DD93D] text-[#0D1B3E] font-bold py-3 rounded-xl hover:bg-[#35c435] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loginLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : loginCooldown > 0 ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Aguarde {loginCooldown}s...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Entrar na MaisTV</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-xs mt-4">
              Não tem acesso ainda?{' '}
              <a
                href="https://wa.me/556730272500?text=Quero%20assinar%20a%20Internet%20Mais%20e%20ter%20acesso%20à%20MaisTV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3DD93D] hover:underline"
              >
                Assine agora pelo WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
