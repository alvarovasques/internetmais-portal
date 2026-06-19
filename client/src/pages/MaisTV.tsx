import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-hero-bg_d996ba3e.jpg';
const NETFLIX_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-hero-netflix-G92S5i7Lj8fuzZXJgF479U.webp';
const CHANNELS_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-channels-bg-dXYAhLeKE5SB7EUAwJZ3gE.webp';

const WHATSAPP_NUMBER = '556730272500';

function pushWA(location: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'Click_Whatsapp',
    button_location: `MaisTV - ${location}`,
    plan_name: 'MaisTV',
    plan_price: 'Incluso',
    plan_type: 'TV Digital Inclusa',
  });
}

function openWA(location: string, msg?: string) {
  pushWA(location);
  const text = msg ?? 'Olá! Tenho interesse em assinar a Internet Mais e quero saber mais sobre a MaisTV inclusa nos planos.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

// Logos reais dos canais da CDN TV
const BASE = 'https://cdn.tv.br/wp-content/uploads/2026/05/';
const canaisDestaque = [
  { nome: 'TV Globo', logo: 'https://cdn.tv.br/wp-content/uploads/2026/05/TVGlobo2025.webp' },
  { nome: 'SBT', logo: BASE + 'sbt-.png' },
  { nome: 'Record TV', logo: BASE + 'record-tv.png' },
  { nome: 'Band', logo: BASE + 'band.png' },
  { nome: 'Rede TV!', logo: BASE + 'rede-tv.png' },
  { nome: 'TV Brasil', logo: BASE + 'tv-brasil.png' },
  { nome: 'TV Câmara', logo: BASE + 'tv-camara.png' },
  { nome: 'TV Senado', logo: BASE + 'tv-senado.png' },
  { nome: 'TV Justiça', logo: BASE + 'tv-justica.png' },
  { nome: 'Canal Futura', logo: BASE + 'futura.png' },
  { nome: 'RBS TV', logo: BASE + 'rbs-tv.png' },
  { nome: 'Aparecida', logo: BASE + 'aparecida.png' },
  { nome: 'Rede Vida', logo: BASE + 'rede-vida.png' },
  { nome: 'Canção Nova', logo: BASE + 'cancao-nova-tv.png' },
  { nome: 'RIT', logo: BASE + 'rit.png' },
  { nome: 'Ulbra TV', logo: BASE + 'ulbra-tv.png' },
  { nome: 'TVE', logo: BASE + 'tve.png' },
  { nome: 'ChefTV+', logo: BASE + 'CHEFTV.png' },
  { nome: 'Adesso TV', logo: BASE + 'adesso-tv.png' },
  { nome: 'Agro+', logo: BASE + 'agro.png' },
  { nome: 'Agro Canal', logo: BASE + 'agro-canal.png' },
  { nome: 'Clipstation', logo: BASE + 'CLIPSTATION.png' },
  { nome: 'Clipstation Rock', logo: BASE + 'CLIPSTATION-ROCK.png' },
  { nome: 'Clipstation Metal', logo: BASE + 'Clipstation-metal.png' },
  { nome: 'Clipstation Rádio', logo: BASE + 'Clipstation-radio.png' },
  { nome: 'Rede CNT', logo: BASE + 'rede-cnt.png' },
  { nome: 'Al Jazeera', logo: BASE + 'aljazeera.png' },
  { nome: 'Urban Movies', logo: BASE + 'urban-movies.png' },
  { nome: 'Urban Series', logo: BASE + 'urban-series.png' },
  { nome: 'Urban Kids', logo: BASE + 'urban-kids.png' },
  { nome: 'Urban Docs', logo: BASE + 'urban-docs.png' },
  { nome: 'Urban Retro', logo: BASE + 'urban-retro.png' },
  { nome: 'Top Film', logo: BASE + 'top-film.png' },
  { nome: 'Top Action', logo: BASE + 'top-action.png' },
  { nome: 'Top Family', logo: BASE + 'top-family.png' },
  { nome: 'Mundo Animal', logo: BASE + 'Mundo-Animal.png' },
  { nome: 'Mundo Science', logo: BASE + 'Mundo-Science.png' },
  { nome: 'PlayTV', logo: BASE + 'PlayTV.png' },
  { nome: 'Polishop', logo: BASE + 'polishop.png' },
  { nome: 'Sesc TV', logo: BASE + 'sesc-tv.png' },
];

const categorias = [
  { label: 'Todos', filter: null },
  { label: 'Abertos', filter: ['TV Globo', 'SBT', 'Record TV', 'Band', 'Rede TV!', 'TV Brasil', 'RBS TV', 'Rede CNT'] },
  { label: 'Notícias', filter: ['TV Câmara', 'TV Senado', 'TV Justiça', 'Al Jazeera'] },
  { label: 'Religioso', filter: ['Aparecida', 'Rede Vida', 'Canção Nova', 'RIT', 'Ulbra TV'] },
  { label: 'Educação', filter: ['Canal Futura', 'TVE', 'Sesc TV'] },
  { label: 'Entretenimento', filter: ['ChefTV+', 'Adesso TV', 'Agro+', 'Agro Canal', 'PlayTV', 'Polishop'] },
  { label: 'Música', filter: ['Clipstation', 'Clipstation Rock', 'Clipstation Metal', 'Clipstation Rádio'] },
  { label: 'Filmes & Séries', filter: ['Urban Movies', 'Urban Series', 'Urban Docs', 'Urban Retro', 'Top Film', 'Top Action', 'Top Family', 'Mundo Animal', 'Mundo Science'] },
];

const estudios = [
  { nome: 'Columbia Pictures', cor: '#E50914' },
  { nome: 'Sony Pictures', cor: '#0066CC' },
  { nome: 'Marvel Studios', cor: '#EC1D24' },
  { nome: 'Universal Pictures', cor: '#000000' },
  { nome: 'Orion Pictures', cor: '#1B3A6B' },
  { nome: 'Sony Animation', cor: '#FF6B00' },
];

const faq = [
  { p: 'A MaisTV tem custo adicional?', r: 'Não. A MaisTV já está inclusa em todos os planos da Internet Mais, sem nenhum custo adicional. Você assina a internet e já tem acesso completo.' },
  { p: 'Quais canais estão disponíveis?', r: 'São mais de 160 canais ao vivo, incluindo canais abertos, notícias, esportes, entretenimento, religioso e música. A grade pode variar conforme a região.' },
  { p: 'Preciso de algum equipamento especial?', r: 'Não. A MaisTV funciona no seu celular, Smart TV, Fire Stick, Set Top Box ou navegador. Basta baixar o app e fazer login.' },
  { p: 'Posso assistir fora de casa?', r: 'Sim! Com qualquer conexão à internet, você acessa a MaisTV de qualquer lugar, em qualquer dispositivo.' },
  { p: 'O catálogo de filmes é atualizado?', r: 'Sim. Novos títulos são adicionados regularmente ao catálogo on demand, incluindo lançamentos dos maiores estúdios do mundo.' },
  { p: 'Como faço para assinar a Internet Mais?', r: 'Entre em contato com nossa equipe pelo WhatsApp. Atendemos toda Campo Grande - MS e realizamos a instalação rapidamente.' },
];

const WA_ICON = (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Ícones SVG modernos para dispositivos
const DeviceIcons = {
  mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg>,
  smarttv: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  firestick: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M10 8l6 4-6 4V8z"/></svg>,
  browser: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  settopbox: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M7 11h.01M11 11h.01M15 11h.01M19 11h.01"/></svg>,
  roku: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  century: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 9h18M9 21h6M12 17v4"/></svg>,
};

const dispositivos = [
  { icon: DeviceIcons.mobile, nome: 'Celular', sub: 'Android & iOS' },
  { icon: DeviceIcons.smarttv, nome: 'Smart TV', sub: 'Principais marcas' },
  { icon: DeviceIcons.firestick, nome: 'Fire Stick', sub: 'Amazon' },
  { icon: DeviceIcons.settopbox, nome: 'Set Top Box', sub: 'Incluso no plano' },
  { icon: DeviceIcons.browser, nome: 'Navegador', sub: 'Qualquer browser' },
  { icon: DeviceIcons.roku, nome: 'Roku', sub: 'Streaming stick' },
  { icon: DeviceIcons.century, nome: 'Century', sub: 'AndroidTV' },
];

export default function MaisTV() {
  const [activeCat, setActiveCat] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useViewPlanTracker(sectionRef, 'MaisTV', 'TV Digital Inclusa');

  useEffect(() => {
    document.title = 'MaisTV — Entretenimento Completo Incluso | Internet Mais';
  }, []);

  const canaisFiltrados = activeCat === 0
    ? canaisDestaque
    : canaisDestaque.filter(c => categorias[activeCat].filter?.includes(c.nome));

  return (
    <div className="min-h-screen bg-[#060d1a] text-white">
      <Header />

      {/* ─── HERO ─── */}
      <section
        ref={sectionRef}
        className="relative h-[90vh] min-h-[600px] max-h-[900px] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Gradiente da esquerda para cobrir texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a] via-[#060d1a]/85 to-transparent" />
        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060d1a] to-transparent" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#3DD93D]/15 border border-[#3DD93D]/40 text-[#3DD93D] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DD93D] animate-pulse" />
              Incluso em todos os planos
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
              Assine internet.<br />
              <span className="text-[#3DD93D]">Ganhe uma TV<br />completa.</span>
            </h1>

            <p className="text-base md:text-lg text-white/75 mb-6 leading-relaxed max-w-md">
              Na Internet Mais, todos os planos já incluem a <strong className="text-white">MaisTV</strong>: +160 canais ao vivo + catálogo de filmes e séries. <span className="text-[#3DD93D] font-bold">R$0 adicional.</span>
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-4 mb-7">
              {[
                { num: '+160', label: 'canais ao vivo' },
                { num: 'Milhares', label: 'títulos on demand' },
                { num: '7', label: 'dispositivos' },
                { num: 'R$0', label: 'custo extra' },
              ].map(s => (
                <div key={s.num} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-[#3DD93D]">{s.num}</span>
                  <span className="text-white/60 text-xs">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openWA('Hero', 'Olá! Quero assinar a Internet Mais e aproveitar a MaisTV inclusa. Podem me ajudar?')}
                className="flex items-center justify-center gap-2.5 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#060d1a] font-black text-base px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/25 hover:scale-105"
              >
                {WA_ICON}
                Quero assinar agora
              </button>
              <a
                href="#canais"
                className="flex items-center justify-center gap-2 border border-white/25 hover:border-[#3DD93D]/60 text-white/80 hover:text-[#3DD93D] font-semibold text-base px-7 py-3.5 rounded-xl transition-all duration-300"
              >
                Ver o que está incluso
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
              </a>
            </div>

            {/* Dispositivos chips */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Celular', 'Smart TV', 'Fire Stick', 'Navegador', 'Set Top Box', 'Roku', 'Century'].map(d => (
                <span key={d} className="bg-white/8 border border-white/15 text-white/60 text-xs px-2.5 py-1 rounded-full">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BARRA DE NÚMEROS (mobile) ─── */}
      <div className="bg-[#3DD93D] py-5 md:hidden">
        <div className="container mx-auto px-4 grid grid-cols-4 gap-2 text-center">
          {[['+ 160', 'Canais'], ['Milhares', 'Títulos'], ['7', 'Dispositivos'], ['R$ 0', 'Extra']].map(([n, l]) => (
            <div key={n}>
              <p className="text-lg font-black text-[#060d1a]">{n}</p>
              <p className="text-[#060d1a]/70 text-xs">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CANAIS AO VIVO ─── */}
      <section
        id="canais"
        className="py-16 relative overflow-hidden"
        style={{ backgroundImage: `url(${CHANNELS_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#060d1a]/92" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#3DD93D]/15 text-[#3DD93D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">TV Ao Vivo</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              +160 canais ao vivo. <span className="text-[#3DD93D]">Incluso.</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto text-sm">Dos canais abertos que você conhece às atrações exclusivas que vai descobrir.</p>
          </div>

          {/* Filtros de categoria */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categorias.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActiveCat(i)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCat === i
                    ? 'bg-[#3DD93D] text-[#060d1a]'
                    : 'bg-white/8 border border-white/15 text-white/60 hover:border-[#3DD93D]/40 hover:text-white/80'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid de logos dos canais */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-5xl mx-auto">
            {canaisFiltrados.map(canal => (
              <div
                key={canal.nome}
                title={canal.nome}
                className="group bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-center aspect-square hover:border-[#3DD93D]/50 hover:bg-[#3DD93D]/8 transition-all duration-200 cursor-default"
              >
                <img
                  src={canal.logo}
                  alt={canal.nome}
                  className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-200"
                  loading="lazy"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = 'none';
                    const p = t.parentElement;
                    if (p) {
                      p.innerHTML = `<span class="text-white/50 text-[9px] text-center leading-tight font-medium">${canal.nome}</span>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs mt-5">*Grade sujeita a alterações. Canais conforme disponibilidade regional.</p>

          <div className="text-center mt-8">
            <button
              onClick={() => openWA('Canais', 'Olá! Quero assinar a Internet Mais e ter acesso à MaisTV com +160 canais inclusos.')}
              className="inline-flex items-center gap-2.5 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#060d1a] font-black text-sm px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/25 hover:scale-105"
            >
              {WA_ICON}
              Quero esses canais inclusos
            </button>
          </div>
        </div>
      </section>

      {/* ─── VOD ─── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ backgroundImage: `url(${NETFLIX_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#060d1a]/88" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#3DD93D]/15 text-[#3DD93D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">On Demand</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Filmes e séries dos <span className="text-[#3DD93D]">maiores estúdios</span> do mundo.
            </h2>
            <p className="text-white/55 max-w-xl mx-auto text-sm">Milhares de títulos para assistir quando e onde quiser. Sem precisar de outra assinatura.</p>
          </div>

          {/* Estúdios */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {estudios.map(e => (
              <div
                key={e.nome}
                className="bg-white/5 border border-white/10 rounded-lg px-5 py-2.5 text-white/80 font-bold text-sm hover:border-[#3DD93D]/40 hover:text-white transition-all duration-200"
              >
                {e.nome}
              </div>
            ))}
          </div>

          {/* Categorias VOD — cards tech */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>,
                cat: 'Filmes', sub: 'Ação, Drama, Comédia, Terror'
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
                cat: 'Séries', sub: 'Nacionais e internacionais'
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
                cat: 'Kids', sub: 'Conteúdo seguro para crianças'
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13M9 18a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM21 16a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3z"/></svg>,
                cat: 'Música', sub: 'Videoclipes e shows'
              },
            ].map(v => (
              <div key={v.cat} className="bg-white/4 border border-white/10 rounded-2xl p-5 text-center hover:border-[#3DD93D]/40 hover:bg-[#3DD93D]/5 transition-all duration-200 group">
                <div className="text-[#3DD93D]/70 group-hover:text-[#3DD93D] transition-colors mb-3 flex justify-center">{v.icon}</div>
                <p className="text-white font-black text-base">{v.cat}</p>
                <p className="text-white/45 text-xs mt-1">{v.sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openWA('VOD', 'Olá! Quero assinar a Internet Mais e ter acesso à MaisTV com filmes e séries inclusos.')}
              className="inline-flex items-center gap-2.5 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#060d1a] font-black text-sm px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/25 hover:scale-105"
            >
              {WA_ICON}
              Quero assinar e ter acesso
            </button>
          </div>
        </div>
      </section>

      {/* ─── DISPOSITIVOS ─── */}
      <section className="py-14 bg-[#060d1a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              Assista em <span className="text-[#3DD93D]">qualquer tela</span>, de qualquer lugar.
            </h2>
            <p className="text-white/50 text-sm">7 dispositivos compatíveis. Você escolhe onde e quando assistir.</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 max-w-3xl mx-auto">
            {dispositivos.map(d => (
              <div key={d.nome} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3DD93D]/60 group-hover:text-[#3DD93D] group-hover:border-[#3DD93D]/40 group-hover:bg-[#3DD93D]/8 transition-all duration-200">
                  {d.icon}
                </div>
                <p className="text-white/70 text-xs font-semibold text-center leading-tight">{d.nome}</p>
                <p className="text-white/35 text-[10px] text-center leading-tight hidden sm:block">{d.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#3DD93D]/15 text-[#3DD93D] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">Simples assim</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Assine e já está <span className="text-[#3DD93D]">incluso.</span>
            </h2>
            <p className="text-white/50 text-sm">Leva menos de 5 minutos para você começar a assistir.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                num: '01',
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
                titulo: 'Escolha seu plano',
                desc: 'Fale com nossa equipe pelo WhatsApp e escolha o plano de internet ideal. Atendemos toda Campo Grande - MS.'
              },
              {
                num: '02',
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
                titulo: 'Instale o app',
                desc: 'Após a instalação da fibra óptica, baixe o app MaisTV e configure em qualquer dispositivo que você já tem.'
              },
              {
                num: '03',
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>,
                titulo: 'Assista a tudo',
                desc: 'Acesse +160 canais ao vivo e o catálogo completo de filmes e séries. Tudo incluso, sem custo adicional.'
              },
            ].map((p, i) => (
              <div key={p.num} className="relative bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-[#3DD93D]/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-[#3DD93D]/20 leading-none">{p.num}</span>
                  <div className="text-[#3DD93D]/60 group-hover:text-[#3DD93D] transition-colors">{p.icon}</div>
                </div>
                <h3 className="text-base font-black text-white mb-2">{p.titulo}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-[#3DD93D]/40 text-lg font-black z-10">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARATIVO ─── */}
      <section className="py-16 bg-[#060d1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Por que escolher a <span className="text-[#3DD93D]">Internet Mais?</span>
            </h2>
            <p className="text-white/50 text-sm">Compare e veja a diferença.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-0 mb-0">
              <div />
              <div className="text-center bg-[#3DD93D] text-[#060d1a] font-black py-2.5 rounded-t-xl text-xs">Internet Mais</div>
              <div className="text-center bg-white/8 text-white/50 font-bold py-2.5 rounded-t-xl text-xs">Outros provedores</div>
            </div>
            {[
              { item: 'Fibra óptica de alta velocidade', nos: true, outros: true },
              { item: '+160 canais ao vivo inclusos', nos: true, outros: false },
              { item: 'Filmes e séries on demand inclusos', nos: true, outros: false },
              { item: 'Apps de streaming opcionais', nos: true, outros: false },
              { item: 'Suporte local e humanizado', nos: true, outros: false },
              { item: 'Sem fidelização com multa abusiva', nos: true, outros: false },
            ].map((row, i, arr) => (
              <div key={row.item} className={`grid grid-cols-3 gap-0 ${i % 2 === 0 ? 'bg-white/4' : 'bg-white/[0.02]'} ${i === arr.length - 1 ? 'rounded-b-xl' : ''}`}>
                <div className="px-4 py-3 text-white/70 text-xs font-medium border-r border-white/8">{row.item}</div>
                <div className={`flex items-center justify-center py-3 border-r border-white/8 ${row.nos ? 'text-[#3DD93D]' : 'text-red-400'}`}>
                  <span className="text-base font-black">{row.nos ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center justify-center py-3 ${row.outros ? 'text-[#3DD93D]' : 'text-red-400'}`}>
                  {row.outros ? <span className="text-base font-black text-[#3DD93D]">✓</span> : <span className="text-xs text-red-400/80 font-semibold">Cobra à parte</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Perguntas <span className="text-[#3DD93D]">frequentes</span>
            </h2>
          </div>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="bg-white/4 border border-white/10 rounded-xl overflow-hidden hover:border-[#3DD93D]/25 transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white/90 font-semibold text-sm pr-4">{item.p}</span>
                  <span className={`text-[#3DD93D] text-lg font-black transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-white/60 text-sm leading-relaxed">{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center right' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/98 via-[#060d1a]/90 to-[#060d1a]/70" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3DD93D]" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3DD93D]/15 border border-[#3DD93D]/40 text-[#3DD93D] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD93D] animate-pulse" />
            Incluso em todos os planos
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Não assine só internet.<br />
            <span className="text-[#3DD93D]">Assine entretenimento completo.</span>
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto text-sm md:text-base">
            Fibra óptica de alta velocidade + MaisTV com +160 canais ao vivo + filmes e séries on demand. Tudo incluso em um único plano.
          </p>
          <button
            onClick={() => openWA('CTA Final', 'Olá! Quero assinar a Internet Mais e aproveitar a MaisTV inclusa. Podem me ajudar?')}
            className="inline-flex items-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#060d1a] font-black text-base md:text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-[#3DD93D]/30 hover:scale-105"
          >
            {WA_ICON}
            Quero assinar a Internet Mais
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
