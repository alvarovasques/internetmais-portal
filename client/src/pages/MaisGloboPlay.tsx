import { useEffect, useState } from 'react';
import { MessageCircle, Check, Star, Film, Clock, Shield, ChevronDown, Play, Tv, Zap } from 'lucide-react';

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
  poster1:   `${CDN}/bCb5kNiFIqoH_4d788dcc.jpg`,
  poster2:   `${CDN}/EFvDsp8uYaDB_f2eb1b86.jpg`,
  poster3:   `${CDN}/YO6LenMjrQGk_cede9e5f.jpg`,
};

const FILMES = [
  { poster: ASSETS.poster1, title: 'O Retorno', genre: 'Drama' },
  { poster: ASSETS.poster2, title: 'Velozes e Furiosos 9', genre: 'Ação' },
  { poster: ASSETS.poster3, title: 'John Wick 4: Baba Yaga', genre: 'Ação' },
];

const FAQ = [
  {
    q: 'Já sou cliente Internet Mais. Como adiciono o GloboPlay?',
    a: 'Simples! Clique em qualquer botão desta página e fale com nossa equipe pelo WhatsApp. Em minutos adicionamos o GloboPlay Premium ao seu plano sem burocracia.',
  },
  {
    q: 'Preciso pagar algo a mais pelo Telecine Sinal Aberto?',
    a: 'Não. O Telecine Sinal Aberto é uma promoção do próprio Telecine para assinantes do GloboPlay Premium. De 21 a 27 de julho, o canal fica liberado automaticamente — sem custo extra.',
  },
  {
    q: 'O que é o GloboPlay Premium?',
    a: 'É o streaming da Globo com filmes, séries, novelas, reality shows e esportes ao vivo — tudo sem anúncios, em Full HD e 4K, em até 5 telas simultâneas.',
  },
  {
    q: 'Posso assistir em qualquer dispositivo?',
    a: 'Sim! GloboPlay funciona em celular, tablet, Smart TV, computador e Fire Stick. Você também pode baixar conteúdo para assistir offline.',
  },
  {
    q: 'Quanto custa adicionar o GloboPlay Premium ao meu plano?',
    a: 'O valor é acessível e varia conforme o seu plano atual. Fale com nossa equipe pelo WhatsApp para receber uma proposta personalizada.',
  },
];

// ─── Componentes ──────────────────────────────────────────────────────────────

function CTAButton({ label, location, size = 'lg' }: {
  label: string;
  location: string;
  size?: 'sm' | 'lg';
}) {
  const msg = `Olá! Sou cliente Internet Mais e quero adicionar o GloboPlay Premium ao meu plano para ter acesso ao Telecine Sinal Aberto. Podem me ajudar?`;

  return (
    <a
      href={buildWaLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => pushGTM('Click_Whatsapp_LP', { button_location: location })}
      className={`inline-flex items-center justify-center gap-3 font-black rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl ${
        size === 'lg' ? 'px-8 py-5 text-lg' : 'px-5 py-3 text-sm'
      } bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-green-500/40`}
    >
      <MessageCircle size={size === 'lg' ? 24 : 18} />
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
            style={{ background: 'rgba(229,9,20,0.9)', minWidth: '3.5rem', textAlign: 'center' }}
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
        <span className="text-white font-semibold text-sm md:text-base pr-4">{q}</span>
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

  useEffect(() => {
    document.title = 'Assine GloboPlay e ganhe Telecine Sinal Aberto — Internet Mais';
    pushGTM('LP_MaisGloboPlay_View');
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'linear-gradient(160deg, #07070f 0%, #100718 50%, #07070f 100%)' }}
    >

      {/* ── BARRA URGÊNCIA ────────────────────────────────────────────── */}
      <div
        className="w-full py-2.5 px-4 text-center text-sm font-bold tracking-wide"
        style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
      >
        ⏰ Oferta válida apenas de 21 a 27 de julho — Não perca!
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Fundo: posters desfocados */}
        <div className="absolute inset-0 flex opacity-10">
          {FILMES.map((f, i) => (
            <img key={i} src={f.poster} alt="" className="flex-1 h-full object-cover" style={{ filter: 'blur(14px)' }} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(7,7,15,0.75) 0%, rgba(7,7,15,0.97) 100%)' }} />
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
              className="text-white font-black text-xs px-5 py-2 rounded-full uppercase tracking-widest"
              style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
            >
              🎬 Exclusivo para clientes Internet Mais
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-center leading-tight mb-5">
            Assine o GloboPlay<br />
            <span style={{ color: '#e50914' }}>e ganhe o Telecine</span><br />
            <span className="text-white/90">Sinal Aberto</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 text-center max-w-2xl mx-auto mb-8">
            Você já é cliente <strong className="text-white">Internet Mais</strong>. Agora adicione o <strong className="text-white">GloboPlay Premium</strong> ao seu plano
            e aproveite o <strong className="text-white">Telecine Sinal Aberto</strong> — filmes liberados de <strong className="text-white">21 a 27 de julho</strong>, sem pagar nada a mais.
          </p>

          {/* CTA principal */}
          <div className="flex justify-center mb-10">
            <CTAButton label="Quero Adicionar GloboPlay Agora" location="Hero" size="lg" />
          </div>

          {/* Countdown */}
          <div className="text-center">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Sinal Aberto encerra em</p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white">Como funciona?</h2>
            <p className="text-white/50 mt-2 text-sm">É simples. São apenas 3 passos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', icon: MessageCircle, title: 'Fale conosco', desc: 'Clique no botão e mande mensagem pelo WhatsApp. Nossa equipe responde rapidinho.' },
              { step: '2', icon: Tv, title: 'Adicione o GloboPlay', desc: 'Adicionamos o GloboPlay Premium ao seu plano atual. Sem burocracia, sem fidelidade.' },
              { step: '3', icon: Film, title: 'Assista ao Telecine', desc: 'Com o GloboPlay Premium ativo, o Telecine Sinal Aberto fica liberado automaticamente de 21 a 27/jul.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, #e50914, #8b0000)' }}
                >
                  {step}
                </div>
                <Icon size={28} className="mx-auto mb-3 text-red-400" />
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILMES EM DESTAQUE ────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Telecine Sinal Aberto</p>
            <h2 className="text-2xl md:text-3xl font-black text-white">Filmes liberados esta semana</h2>
            <p className="text-white/50 text-sm mt-2">21 a 27 de julho — disponível com GloboPlay Premium</p>
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

      {/* ── O QUE VOCÊ GANHA ─────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white">O que você ganha com o GloboPlay Premium</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: Film,    text: 'Filmes, séries e novelas — catálogo completo sem anúncios' },
              { icon: Star,    text: 'Telecine Sinal Aberto: filmes liberados de 21 a 27/jul' },
              { icon: Tv,      text: 'Esportes ao vivo: Campeonato Brasileiro, NFL e mais' },
              { icon: Zap,     text: 'Resolução Full HD e 4K — até 5 telas simultâneas' },
              { icon: Clock,   text: 'Baixe e assista offline quando quiser' },
              { icon: Shield,  text: 'Até 5 perfis personalizados para toda a família' },
            ].map(({ icon: Icon, text }, i) => (
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
                <Check size={16} className="ml-auto flex-shrink-0 text-green-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA MEIO ──────────────────────────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-xl text-center">
          <div
            className="rounded-2xl p-8"
            style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)' }}
          >
            <p className="text-white/60 text-sm mb-2 uppercase tracking-widest">Oferta por tempo limitado</p>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              Sinal Aberto encerra em <span style={{ color: '#e50914' }}>27 de julho</span>
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Adicione o GloboPlay agora e aproveite os filmes liberados ainda hoje.
            </p>
            <CTAButton label="Adicionar GloboPlay ao Meu Plano" location="CTA Meio" size="lg" />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white">Dúvidas frequentes</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => <FaqItem key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-xl text-center">
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <img src={ASSETS.globoplay} alt="GloboPlay" className="h-14 w-14 rounded-xl object-contain shadow-xl" />
            <img src={ASSETS.telecine} alt="Telecine" className="h-12 bg-white rounded-xl px-4 py-2 object-contain shadow-xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Você já tem a melhor internet.<br />
            <span style={{ color: '#e50914' }}>Agora complete com o GloboPlay.</span>
          </h2>
          <p className="text-white/60 mb-8 text-sm">
            Fale agora com nossa equipe e adicione o GloboPlay Premium ao seu plano Internet Mais.
          </p>
          <CTAButton label="Falar com um Consultor Agora" location="CTA Final" size="lg" />
          <p className="text-white/30 text-xs mt-4">
            Atendimento rápido pelo WhatsApp · Sem compromisso
          </p>
        </div>
      </section>

      {/* ── RODAPÉ ────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-white/10 text-center">
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
