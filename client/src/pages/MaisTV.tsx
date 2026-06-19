import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useViewPlanTracker } from '@/hooks/useViewPlanTracker';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-hero-bg-QcfMNYobdStguEKndYQ39H.webp';
const DEVICES_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-devices-bg-7AJkm38Ki3GKsN2JunujVH.webp';
const CTA_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/maistv-cta-bg-4wScCupAo5gLak8oTGvn98.webp';

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

const canais = [
  { cat: '📡 Canais Abertos', lista: ['TV Globo', 'SBT', 'Record TV', 'Band', 'Rede TV!', 'TV Brasil', 'RBS TV'] },
  { cat: '📰 Notícias', lista: ['BandNews TV', 'TV Senado', 'TV Câmara', 'TV Justiça'] },
  { cat: '⚽ Esportes', lista: ['BandSports'] },
  { cat: '✝️ Religioso', lista: ['Aparecida', 'Rede Vida', 'Canção Nova TV', 'RIT', 'Ulbra TV'] },
  { cat: '📚 Educação', lista: ['Canal Futura', 'Canal Educação', 'TVE', 'TV Câmara'] },
  { cat: '🎭 Entretenimento', lista: ['ChefTV+', 'Clipstation', 'CNB', 'Adesso TV', 'Agro+', 'Agro Canal'] },
  { cat: '🎵 Música', lista: ['Clipstation Radio', 'Clipstation Rock', 'Clipstation Metal', 'Clipstation Trap'] },
];

const estudios = ['Columbia Pictures', 'Orion Pictures', 'Sony Pictures Animation', 'Marvel Studios', 'Universal Pictures'];

const dispositivos = [
  { icon: '📱', nome: 'Celular', sub: 'Android & iOS' },
  { icon: '📺', nome: 'Smart TV', sub: 'Principais marcas' },
  { icon: '🔥', nome: 'Fire Stick', sub: 'Amazon' },
  { icon: '📡', nome: 'Set Top Box', sub: 'Incluso no plano' },
  { icon: '💻', nome: 'Navegador', sub: 'Qualquer browser' },
  { icon: '📺', nome: 'Roku', sub: 'Streaming stick' },
  { icon: '📺', nome: 'Century', sub: 'AndroidTV' },
];

const passos = [
  { num: '01', titulo: 'Escolha seu plano', desc: 'Fale com nossa equipe pelo WhatsApp e escolha o plano de internet ideal para sua casa ou empresa. Atendemos toda Campo Grande - MS.' },
  { num: '02', titulo: 'Instale e configure', desc: 'Após a instalação da fibra óptica, nossa equipe te orienta a baixar o app MaisTV e configurar em qualquer dispositivo que você já tem.' },
  { num: '03', titulo: 'Assista a tudo', desc: 'Acesse +160 canais ao vivo e o catálogo completo de filmes e séries. Tudo incluso no seu plano, sem custo adicional.' },
];

const comparativo = [
  { item: 'Fibra óptica de alta velocidade', nos: true, outros: true },
  { item: '+160 canais ao vivo inclusos', nos: true, outros: false },
  { item: 'Catálogo de filmes e séries incluso', nos: true, outros: false },
  { item: 'Apps de streaming opcionais', nos: true, outros: false },
  { item: 'Suporte local e humanizado', nos: true, outros: false },
  { item: 'Sem fidelização com multa abusiva', nos: true, outros: false },
];

const faq = [
  { p: 'A MaisTV tem custo adicional?', r: 'Não. A MaisTV já está inclusa em todos os planos da Internet Mais, sem nenhum custo adicional. Você assina a internet e já tem acesso completo.' },
  { p: 'Quais canais estão disponíveis?', r: 'São mais de 160 canais ao vivo, incluindo canais abertos, notícias, esportes, entretenimento, religioso e música. A grade pode variar conforme a região.' },
  { p: 'Preciso de algum equipamento especial?', r: 'Não. A MaisTV funciona no seu celular, Smart TV, Fire Stick, Set Top Box ou navegador. Basta baixar o app e fazer login.' },
  { p: 'Posso assistir fora de casa?', r: 'Sim! Com qualquer conexão à internet, você acessa a MaisTV de qualquer lugar, em qualquer dispositivo.' },
  { p: 'O catálogo de filmes é atualizado?', r: 'Sim. Novos títulos são adicionados regularmente ao catálogo on demand, incluindo lançamentos dos maiores estúdios do mundo.' },
  { p: 'Como faço para assinar a Internet Mais?', r: 'Entre em contato com nossa equipe pelo WhatsApp. Atendemos toda Campo Grande - MS e realizamos a instalação rapidamente.' },
];

export default function MaisTV() {
  const [activeCat, setActiveCat] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useViewPlanTracker(sectionRef, 'MaisTV', 'TV Digital Inclusa');

  useEffect(() => {
    document.title = 'MaisTV — Entretenimento Completo Incluso | Internet Mais';
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1B3E] text-white">
      <Header />

      {/* HERO */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/95 via-[#0D1B3E]/80 to-[#0D1B3E]/40" />
        <div className="relative z-10 container mx-auto px-4 py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#3DD93D]/20 border border-[#3DD93D]/50 text-[#3DD93D] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              ✦ Incluso em todos os planos
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Assine internet.<br />
              <span className="text-[#3DD93D]">Ganhe uma TV completa.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Na Internet Mais, todos os planos já incluem a <strong className="text-white">MaisTV</strong>: mais de 160 canais ao vivo + catálogo de filmes e séries dos maiores estúdios do mundo. Sem custo adicional. <strong className="text-[#3DD93D]">Incluso.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => openWA('Hero', 'Olá! Quero assinar a Internet Mais e aproveitar a MaisTV inclusa. Podem me ajudar?')}
                className="flex items-center justify-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#0D1B3E] font-black text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/30 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Quero assinar agora
              </button>
              <a
                href="#canais"
                className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#3DD93D] text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:text-[#3DD93D]"
              >
                Ver o que está incluso ↓
              </a>
            </div>
            {/* Dispositivos */}
            <div className="flex flex-wrap gap-3">
              {['📱 Celular', '📺 Smart TV', '🔥 Fire Stick', '💻 Navegador', '📡 Set Top Box'].map(d => (
                <span key={d} className="bg-white/10 border border-white/20 text-white/80 text-sm px-3 py-1 rounded-full">{d}</span>
              ))}
            </div>
          </div>
          {/* Stats card */}
          <div className="hidden md:flex flex-col gap-4">
            {[
              { num: '+160', label: 'Canais ao vivo', icon: '📡' },
              { num: 'Milhares', label: 'Títulos on demand', icon: '🎬' },
              { num: '7', label: 'Dispositivos compatíveis', icon: '📱' },
              { num: 'R$ 0', label: 'Custo adicional — já incluso', icon: '✅' },
            ].map(s => (
              <div key={s.num} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="text-3xl font-black text-[#3DD93D]">{s.num}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS — mobile */}
      <section className="bg-[#3DD93D] py-8 md:hidden">
        <div className="container mx-auto px-4 grid grid-cols-2 gap-4">
          {[
            { num: '+160', label: 'Canais ao vivo' },
            { num: 'Milhares', label: 'Títulos on demand' },
            { num: '7', label: 'Dispositivos' },
            { num: 'R$ 0', label: 'Custo adicional' },
          ].map(s => (
            <div key={s.num} className="text-center">
              <p className="text-3xl font-black text-[#0D1B3E]">{s.num}</p>
              <p className="text-[#0D1B3E]/80 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O PROBLEMA */}
      <section className="py-20 bg-[#0D1B3E]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Você está pagando por tudo <span className="text-[#3DD93D]">separado?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Com a Internet Mais, tudo que você precisa está em um único plano.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Antes */}
            <div className="bg-red-950/40 border border-red-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">😤</span>
                <h3 className="text-xl font-black text-red-400">Antes — Tudo separado</h3>
              </div>
              {[
                'Internet de um provedor comum',
                'Streaming de filmes à parte',
                'TV por assinatura separada',
                'Suporte que não resolve',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <span className="text-red-500 font-bold text-xl">✗</span>
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-red-500/30">
                <p className="text-red-400 font-bold text-lg">Múltiplas contas. Múltiplos boletos.</p>
              </div>
            </div>
            {/* Com Internet Mais */}
            <div className="bg-[#3DD93D]/10 border border-[#3DD93D]/40 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🚀</span>
                <h3 className="text-xl font-black text-[#3DD93D]">Com Internet Mais</h3>
              </div>
              {[
                'Fibra óptica de alta velocidade',
                '+160 canais ao vivo inclusos',
                'Filmes e séries on demand inclusos',
                'Suporte local e humanizado',
              ].map(item => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <span className="text-[#3DD93D] font-bold text-xl">✓</span>
                  <span className="text-white">{item}</span>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t border-[#3DD93D]/30">
                <p className="text-[#3DD93D] font-bold text-lg">Tudo em um único plano. Incluso.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => openWA('Problema', 'Olá! Quero simplificar e assinar a Internet Mais com MaisTV inclusa.')}
              className="inline-flex items-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#0D1B3E] font-black text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/30 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Quero simplificar — Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* CANAIS AO VIVO */}
      <section id="canais" className="py-20 bg-[#060f24]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#3DD93D]/20 text-[#3DD93D] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">TV Ao Vivo</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              +160 canais ao vivo. <span className="text-[#3DD93D]">Incluso.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Dos canais abertos que você conhece às atrações exclusivas que vai descobrir — tudo incluso no seu plano Internet Mais.</p>
          </div>
          {/* Abas de categorias */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {canais.map((c, i) => (
              <button
                key={c.cat}
                onClick={() => setActiveCat(i)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeCat === i ? 'bg-[#3DD93D] text-[#0D1B3E]' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                {c.cat}
              </button>
            ))}
          </div>
          {/* Grid de canais */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {canais[activeCat].lista.map(canal => (
              <div key={canal} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-[#3DD93D]/50 hover:bg-[#3DD93D]/5 transition-all duration-200">
                <p className="text-white font-semibold text-sm">{canal}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs mt-6">*Grade sujeita a alterações. Canais locais e afiliadas conforme disponibilidade regional.</p>
        </div>
      </section>

      {/* VOD */}
      <section className="py-20 bg-[#0D1B3E]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#3DD93D]/20 text-[#3DD93D] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">On Demand</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Filmes e séries dos <span className="text-[#3DD93D]">maiores estúdios</span> do mundo.
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Milhares de títulos para assistir quando e onde quiser. Sem precisar de outra assinatura.</p>
          </div>
          {/* Estúdios */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {estudios.map(e => (
              <div key={e} className="bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white font-bold text-sm hover:border-[#3DD93D]/50 transition-all">
                {e}
              </div>
            ))}
          </div>
          {/* Categorias VOD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: '🎬', cat: 'Filmes', sub: 'Ação, Drama, Comédia, Terror' },
              { icon: '📺', cat: 'Séries', sub: 'Nacionais e internacionais' },
              { icon: '👶', cat: 'Kids', sub: 'Conteúdo seguro para crianças' },
              { icon: '🎵', cat: 'Música', sub: 'Videoclipes e shows' },
            ].map(v => (
              <div key={v.cat} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#3DD93D]/50 hover:bg-[#3DD93D]/5 transition-all duration-200">
                <span className="text-4xl mb-3 block">{v.icon}</span>
                <p className="text-white font-black text-lg">{v.cat}</p>
                <p className="text-white/50 text-xs mt-1">{v.sub}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => openWA('VOD', 'Olá! Quero assinar a Internet Mais e ter acesso à MaisTV com filmes e séries inclusos.')}
              className="inline-flex items-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#0D1B3E] font-black text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/30 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Quero assinar e ter acesso
            </button>
          </div>
        </div>
      </section>

      {/* DISPOSITIVOS */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundImage: `url(${DEVICES_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#3DD93D]/90" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#0D1B3E] mb-4">
              Assista em qualquer tela, de qualquer lugar.
            </h2>
            <p className="text-[#0D1B3E]/80 text-lg max-w-2xl mx-auto">A MaisTV funciona nos principais dispositivos. Você escolhe onde e quando assistir.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {dispositivos.map(d => (
              <div key={d.nome} className="bg-[#0D1B3E]/20 backdrop-blur-sm border border-[#0D1B3E]/30 rounded-2xl p-5 text-center hover:bg-[#0D1B3E]/30 transition-all duration-200">
                <span className="text-4xl mb-3 block">{d.icon}</span>
                <p className="text-[#0D1B3E] font-black text-sm">{d.nome}</p>
                <p className="text-[#0D1B3E]/70 text-xs mt-1">{d.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 bg-[#060f24]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#3DD93D]/20 text-[#3DD93D] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">Simples assim</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Assine e já está <span className="text-[#3DD93D]">incluso.</span>
            </h2>
            <p className="text-white/60 text-lg">Leva menos de 5 minutos para você começar a assistir.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {passos.map((p, i) => (
              <div key={p.num} className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#3DD93D]/50 transition-all duration-300">
                <div className="text-6xl font-black text-[#3DD93D]/20 mb-4">{p.num}</div>
                <h3 className="text-xl font-black text-white mb-3">{p.titulo}</h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
                {i < passos.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-[#3DD93D] text-2xl font-black z-10">→</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => openWA('Como Funciona', 'Olá! Quero assinar a Internet Mais e ativar a MaisTV. Como funciona?')}
              className="inline-flex items-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#0D1B3E] font-black text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#3DD93D]/30 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Quero assinar agora
            </button>
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section className="py-20 bg-[#0D1B3E]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Por que escolher a <span className="text-[#3DD93D]">Internet Mais?</span>
            </h2>
            <p className="text-white/60 text-lg">Compare e veja a diferença.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-0 mb-4">
              <div className="col-span-1" />
              <div className="text-center bg-[#3DD93D] text-[#0D1B3E] font-black py-3 rounded-t-2xl text-sm">Internet Mais</div>
              <div className="text-center bg-white/10 text-white/60 font-bold py-3 rounded-t-2xl text-sm">Outros provedores</div>
            </div>
            {comparativo.map((row, i) => (
              <div key={row.item} className={`grid grid-cols-3 gap-0 ${i % 2 === 0 ? 'bg-white/5' : 'bg-white/[0.02]'} ${i === comparativo.length - 1 ? 'rounded-b-2xl' : ''}`}>
                <div className="px-4 py-4 text-white/80 text-sm font-medium border-r border-white/10">{row.item}</div>
                <div className={`flex items-center justify-center py-4 border-r border-white/10 ${row.nos ? 'text-[#3DD93D]' : 'text-red-400'}`}>
                  <span className="text-xl font-black">{row.nos ? '✓' : '✗'}</span>
                </div>
                <div className={`flex items-center justify-center py-4 ${row.outros ? 'text-[#3DD93D]' : 'text-red-400'}`}>
                  {row.outros ? <span className="text-xl font-black text-[#3DD93D]">✓</span> : <span className="text-sm text-red-400 font-bold">Cobra à parte</span>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-6">Com a Internet Mais, você paga por um serviço e recebe muito mais.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#060f24]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Perguntas <span className="text-[#3DD93D]">frequentes</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#3DD93D]/30 transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-bold pr-4">{item.p}</span>
                  <span className={`text-[#3DD93D] text-xl font-black transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/70 leading-relaxed">{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B3E]/95 via-[#0D1B3E]/85 to-[#3DD93D]/40" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3DD93D]/20 border border-[#3DD93D]/50 text-[#3DD93D] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            ✦ Incluso em todos os planos
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Não assine só internet.<br />
            <span className="text-[#3DD93D]">Assine entretenimento completo.</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Fibra óptica de alta velocidade + MaisTV com +160 canais ao vivo + filmes e séries on demand. Tudo incluso em um único plano.
          </p>
          <button
            onClick={() => openWA('CTA Final', 'Olá! Quero assinar a Internet Mais e aproveitar a MaisTV inclusa. Podem me ajudar?')}
            className="inline-flex items-center gap-3 bg-[#3DD93D] hover:bg-[#2bc42b] text-[#0D1B3E] font-black text-xl px-12 py-5 rounded-2xl transition-all duration-300 shadow-2xl shadow-[#3DD93D]/40 hover:scale-105"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Quero assinar a Internet Mais
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
