import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Check, Star, Film, Clock, Shield, Wifi, ChevronDown, Play } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const WA_NUMBER = '556730272500';

function buildWaLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function pushGTM(event: string, extra?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...extra });
  }
}

// ─── Assets CDN ───────────────────────────────────────────────────────────────

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP';

const ASSETS = {
  telecine:  `${CDN}/telecine-logo_58f3a687.png`,
  globoplay: `${CDN}/globoplay-hq_5eefcb22.png`,
  logo:      `${CDN}/Logo_internet_MAIS_9b6aefe1.png`,
  poster1:   `${CDN}/bCb5kNiFIqoH_4d788dcc.jpg`,   // O Retorno
  poster2:   `${CDN}/EFvDsp8uYaDB_f2eb1b86.jpg`,   // Velozes e Furiosos 9
  poster3:   `${CDN}/YO6LenMjrQGk_cede9e5f.jpg`,   // John Wick 4
};

const FILMES = [
  { poster: ASSETS.poster1, title: 'O Retorno', genre: 'Drama' },
  { poster: ASSETS.poster2, title: 'Velozes e Furiosos 9', genre: 'Ação' },
  { poster: ASSETS.poster3, title: 'John Wick 4: Baba Yaga', genre: 'Ação' },
];

const PLANOS = [
  { velocidade: '400 Mega', preco: 'R$ 109,90', popular: false },
  { velocidade: '600 Mega', preco: 'R$ 129,90', popular: true },
  { velocidade: '800 Mega', preco: 'R$ 149,90', popular: false },
];

const BENEFICIOS = [
  { icon: Film,   text: 'GloboPlay Premium incluso — filmes, séries e conteúdo exclusivo' },
  { icon: Star,   text: 'Telecine Sinal Aberto: filmes liberados de 21 a 27 de Julho' },
  { icon: Wifi,   text: 'Fibra óptica 100% pura — velocidade real garantida' },
  { icon: Shield, text: 'Instalação grátis, sem fidelidade e sem taxa de adesão' },
  { icon: Clock,  text: 'Suporte 24h — atendimento rápido pelo WhatsApp' },
];

const FAQ = [
  {
    q: 'O que é o Sinal Aberto do Telecine?',
    a: 'É uma promoção especial em que o canal Telecine libera gratuitamente sua programação completa — incluindo filmes como O Retorno, Velozes e Furiosos 9 e John Wick 4: Baba Yaga — para todos os assinantes do GloboPlay Premium no período de 21 a 27 de julho.',
  },
  {
    q: 'O GloboPlay Premium já está incluso no meu plano?',
    a: 'Sim! Todos os planos Internet Mais a partir de 400 Mega incluem o GloboPlay Premium sem custo adicional. Você assina a internet e já ganha acesso completo ao streaming.',
  },
  {
    q: 'Preciso pagar algo a mais pelo Telecine Sinal Aberto?',
    a: 'Não. Durante o período de 21 a 27 de julho, o Telecine fica liberado automaticamente para quem tem GloboPlay Premium — que já está incluso no seu plano Internet Mais.',
  },
  {
    q: 'Quantas telas posso usar ao mesmo tempo?',
    a: 'Com o GloboPlay Premium você pode assistir em até 5 telas simultâneas, com resolução Full HD e 4K, além de poder baixar conteúdo para assistir offline.',
  },
  {
    q: 'Como faço para contratar?',
    a: 'É simples! Clique em qualquer botão "Quero Contratar" nesta página e você será direcionado diretamente para o nosso WhatsApp. Nossa equipe responde rapidamente e agenda a instalação.',
  },
];

// ─── Componentes ──────────────────────────────────────────────────────────────

function CTAButton({ label, plan, location, size = 'lg' }: {
  label: string;
  plan?: string;
  location: string;
  size?: 'sm' | 'lg';
}) {
  const msg = plan
    ? `Olá! Vim pelo SMS da Internet Mais. Quero contratar o plano ${plan} com GloboPlay Premium + Telecine Sinal Aberto. Podem me ajudar?`
    : `Olá! Vim pelo SMS da Internet Mais sobre a promoção GloboPlay Premium + Telecine Sinal Aberto. Quero saber mais!`;

  return (
    <a
      href={buildWaLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => pushGTM('Click_Whatsapp_LP', { button_location: location, plan_name: plan ?? 'geral' })}
      className={`inline-flex items-center justify-center gap-3 font-black rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/40 ${
        size === 'lg'
          ? 'px-8 py-4 text-lg'
          : 'px-5 py-3 text-sm'
      } bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white`}
    >
      <MessageCircle size={size === 'lg' ? 22 : 18} />
      {label}
    </a>
  );
}

function CountdownTimer() {
  const getSecondsUntilEnd = () => {
    const end = new Date('2026-07-27T23:59:59-04:00').getTime();
    return Math.max(0, Math.floor((end - Date.now()) / 1000));
  };
  const [secs, setSecs] = useState(getSecondsUntilEnd);

  useEffect(() => {
    const t = setInterval(() => setSecs(getSecondsUntilEnd()), 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 justify-center">
      {[{ v: d, l: 'dias' }, { v: h, l: 'horas' }, { v: m, l: 'min' }, { v: s, l: 'seg' }].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <span
            className="text-3xl md:text-4xl font-black text-white tabular-nums px-3 py-2 rounded-xl"
            style={{ background: 'rgba(229,9,20,0.85)', minWidth: '3rem', textAlign: 'center' }}
          >
            {pad(v)}
          </span>
          <span className="text-white/60 text-xs mt-1 uppercase tracking-wider">{l}</span>
        </div>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 transition-colors">
        <span className="text-white font-semibold text-sm md:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-white/60 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="px-5 py-4 bg-white/[0.03] text-white/70 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function MaisGloboPlayLP() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'GloboPlay Premium + Telecine Sinal Aberto — Internet Mais';
    // Evento de pageview específico para a LP
    pushGTM('LP_MaisGloboPlay_View');
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'linear-gradient(160deg, #07070f 0%, #100718 50%, #07070f 100%)' }}
    >

      {/* ── BARRA SUPERIOR DE URGÊNCIA ─────────────────────────────────── */}
      <div
        className="w-full py-2 px-4 text-center text-sm font-bold tracking-wide"
        style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
      >
        🎬 SINAL ABERTO TELECINE — 21 a 27 de Julho &nbsp;|&nbsp; Filmes liberados para assinantes GloboPlay Premium
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Fundo: posters desfocados */}
        <div className="absolute inset-0 flex opacity-10">
          {FILMES.map((f, i) => (
            <img key={i} src={f.poster} alt="" className="flex-1 h-full object-cover" style={{ filter: 'blur(12px)' }} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(7,7,15,0.7) 0%, rgba(7,7,15,0.95) 100%)' }} />

        {/* Faixas de película */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col gap-2 py-2 opacity-10 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => <div key={i} className="w-full h-4 bg-white rounded-sm flex-shrink-0" />)}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col gap-2 py-2 opacity-10 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => <div key={i} className="w-full h-4 bg-white rounded-sm flex-shrink-0" />)}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Logos */}
          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            <img src={ASSETS.logo} alt="Internet Mais" className="h-24 md:h-32 object-contain drop-shadow-xl" />
            <span className="text-white/30 text-4xl font-thin">+</span>
            <img src={ASSETS.globoplay} alt="GloboPlay" className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-2xl shadow-xl" />
            <span className="text-white/30 text-4xl font-thin">+</span>
            <img src={ASSETS.telecine} alt="Telecine" className="h-14 md:h-18 bg-white rounded-xl px-5 py-2 object-contain shadow-xl" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-5">
            <span
              className="text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse"
              style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
            >
              🎬 Sinal Aberto — Oferta por Tempo Limitado
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-center leading-tight mb-4">
            Cinema em Casa<br />
            <span style={{ color: '#e50914' }}>Incluso no seu Plano</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 text-center max-w-2xl mx-auto mb-8">
            Assine a <strong className="text-white">Internet Mais</strong> e ganhe <strong className="text-white">GloboPlay Premium</strong> incluso —
            com acesso ao <strong className="text-white">Telecine Sinal Aberto</strong> de 21 a 27 de julho, sem pagar nada a mais.
          </p>

          {/* CTA principal */}
          <div className="flex justify-center mb-10">
            <CTAButton label="Quero Contratar Agora" location="Hero" size="lg" />
          </div>

          {/* Contagem regressiva */}
          <div className="text-center mb-2">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Sinal Aberto encerra em</p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── ESTEIRA DE FILMES ─────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Filmes em destaque</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Disponíveis nesta semana</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {FILMES.map((f, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden shadow-xl"
                style={{ aspectRatio: '2/3' }}
              >
                <img src={f.poster} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-xs leading-tight">{f.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Play size={10} className="text-red-400" fill="currentColor" />
                    <span className="text-white/60 text-xs">{f.genre}</span>
                  </div>
                </div>
                <div
                  className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-black text-xs"
                  style={{ background: 'rgba(229,9,20,0.9)' }}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs mt-4">
            E muito mais no catálogo completo do GloboPlay Premium
          </p>
        </div>
      </section>

      {/* ── BENEFÍCIOS ────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white">Por que escolher a Internet Mais?</h2>
          </div>
          <div className="space-y-4">
            {BENEFICIOS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(229,9,20,0.2)' }}
                >
                  <Icon size={18} style={{ color: '#e50914' }} />
                </div>
                <span className="text-white/85 text-sm md:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS ────────────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Escolha seu plano</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">GloboPlay Premium incluso em todos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {PLANOS.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  p.popular ? 'ring-2 ring-[#e50914] shadow-2xl shadow-red-900/30 scale-105' : ''
                }`}
              >
                {p.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 py-1.5 text-center text-white font-black text-xs uppercase tracking-widest"
                    style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
                  >
                    ⭐ Mais Popular
                  </div>
                )}
                <div
                  className="p-6 flex flex-col items-center text-center h-full"
                  style={{
                    background: p.popular
                      ? 'linear-gradient(160deg, #1a0a0a, #2a0808)'
                      : 'rgba(255,255,255,0.05)',
                    paddingTop: p.popular ? '2.5rem' : '1.5rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Internet Fibra</p>
                  <h3 className="text-3xl font-black text-white mb-1">{p.velocidade}</h3>
                  <p className="text-4xl font-black mb-1" style={{ color: p.popular ? '#e50914' : '#3DD93D' }}>
                    {p.preco}
                  </p>
                  <p className="text-white/40 text-xs mb-5">/mês com desconto de pontualidade</p>

                  <div className="space-y-2 mb-6 w-full text-left">
                    {[
                      'Instalação grátis*',
                      'GloboPlay Premium incluso',
                      'Telecine Sinal Aberto',
                      'MaisTV — 100+ canais',
                      'Suporte 24h',
                    ].map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check size={14} style={{ color: p.popular ? '#e50914' : '#3DD93D', flexShrink: 0 }} />
                        <span className="text-white/80 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini logos */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <img src={ASSETS.globoplay} alt="GloboPlay" className="h-8 w-8 rounded-lg object-contain" />
                    <img src={ASSETS.telecine} alt="Telecine" className="h-6 bg-white rounded px-1.5 py-0.5 object-contain" />
                  </div>

                  <CTAButton
                    label="Quero Este Plano"
                    plan={p.velocidade}
                    location={`Planos - ${p.velocidade}`}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-xs mt-6">*Sem taxa de instalação. Consulte condições de cobertura.</p>
        </div>
      </section>

      {/* ── PROVA SOCIAL ──────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: 'rgba(229,9,20,0.08)', border: '1px solid rgba(229,9,20,0.2)' }}
          >
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="#e50914" style={{ color: '#e50914' }} />
              ))}
            </div>
            <p className="text-white text-lg font-semibold mb-2">
              "Mais de 20.000 clientes satisfeitos em Campo Grande"
            </p>
            <p className="text-white/50 text-sm">
              Internet fibra óptica 100% pura com velocidade real e atendimento humano.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => <FaqItem key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-xl text-center">
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            <img src={ASSETS.globoplay} alt="GloboPlay" className="h-12 w-12 rounded-xl object-contain" />
            <img src={ASSETS.telecine} alt="Telecine" className="h-10 bg-white rounded-lg px-3 py-1 object-contain" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Não perca esta oportunidade
          </h2>
          <p className="text-white/60 mb-8">
            Sinal Aberto encerra em <strong className="text-white">27 de julho</strong>. Contrate agora e assista ainda hoje.
          </p>
          <CTAButton label="Falar com um Consultor Agora" location="CTA Final" size="lg" />
          <p className="text-white/30 text-xs mt-4">
            Atendimento rápido pelo WhatsApp · Sem compromisso
          </p>
        </div>
      </section>

      {/* ── RODAPÉ MÍNIMO ─────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-white/10 text-center">
        <img src={ASSETS.logo} alt="Internet Mais" className="h-20 md:h-24 object-contain mx-auto mb-4 drop-shadow-xl" />
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Internet Mais · Campo Grande, MS · Todos os direitos reservados
        </p>
        <p className="text-white/20 text-xs mt-1">
          GloboPlay e Telecine são marcas de seus respectivos proprietários. Promoção Sinal Aberto válida de 21 a 27/07/2026.
        </p>
      </footer>

    </div>
  );
}
