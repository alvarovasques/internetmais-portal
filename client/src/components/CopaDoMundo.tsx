import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Trophy, Tv, Download, Users, Monitor, Play, Star, Zap, Shield } from 'lucide-react';

const canais = [
  '25 canais Globo ao vivo',
  'Canal Futura', 'Canal Gefast', 'Canal Receitas', 'Canal DPA',
  'Canal Malhação', 'Canal CBN RJ', 'Canal CBN SP',
  'Globoplay Novelas', 'Canal MultiShow', 'Canal GloboNews',
  'Canal GNT', 'Canal Off', 'Canal Bis', 'Canal Gloob',
  'Canal Gloobinho', 'Canal SportTV', 'Canal SportTV 2',
  'Canal SportTV 3', 'Canal Brasil', 'Canal Modo Viagem',
  'Canal Megapix', 'Canal Universal', 'Canal Studios', 'Canal Usa',
];

const vantagens = [
  {
    icon: <Play size={22} className="text-[#FFD700]" />,
    texto: 'Todo o conteúdo sem anúncios e a maior cobertura de esportes, shows, entretenimento e muito mais',
  },
  {
    icon: <Trophy size={22} className="text-[#FFD700]" />,
    texto: 'A maior cobertura do esporte no SporTV com Copa do Brasil, Campeonatos Estaduais, NFL, Olimpíadas de Inverno e mais',
  },
  {
    icon: <Users size={22} className="text-[#FFD700]" />,
    texto: 'Crie até 5 perfis — 1 titular e 4 adicionais — para pessoas que moram com você, cada um com experiência personalizada',
  },
  {
    icon: <Download size={22} className="text-[#FFD700]" />,
    texto: 'Baixe e assista offline onde quiser',
  },
  {
    icon: <Monitor size={22} className="text-[#FFD700]" />,
    texto: 'Assista em até 5 telas simultâneas',
  },
  {
    icon: <Zap size={22} className="text-[#FFD700]" />,
    texto: 'Curta com resolução Full HD e 4K',
  },
];

export default function CopaDoMundo() {
  const ref = useScrollAnimation();

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'Click_Whatsapp',
        'button_location': 'CopaDoMundo - GloboPlay Premium R$22,90'
      });
    }
    const msg = encodeURIComponent(
      'Olá! Sou assinante Internet Mais e quero adicionar o GloboPlay Premium por R$22,90 para assistir à Copa do Mundo. Podem me ajudar?'
    );
    window.open(`https://wa.me/556730272500?text=${msg}`, '_blank');
  };

  return (
    <section
      ref={ref}
      id="copa-do-mundo"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'url(https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/copa-dobra-bg-8t8x9xmSYGxcMUW8AE6auw.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay escuro degradê */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#0D1B3E]/95" />

      {/* Faixa superior Copa */}
      <div className="relative z-10 bg-gradient-to-r from-[#006400] via-[#FFD700] to-[#006400] py-2 text-center">
        <p className="text-[#0D1B3E] font-black text-sm tracking-widest uppercase">
          ⚽ Promoção Copa do Mundo · Válida até 31/07/2026 · ⚽
        </p>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Cabeçalho */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-3 bg-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/40 px-6 py-3 rounded-full mb-6">
            <Trophy className="text-[#FFD700]" size={22} />
            <span className="text-[#FFD700] font-black text-sm tracking-wide uppercase">
              Exclusivo para Assinantes InternetMais
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Assista à{' '}
            <span className="text-[#FFD700]">Copa do Mundo</span>
            <br />
            com qualidade máxima
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Você já é assinante InternetMais? Adicione o{' '}
            <span className="text-[#FFD700] font-bold">GloboPlay Premium</span> à sua assinatura
            e acompanhe cada jogo ao vivo, sem anúncios e em 4K.
          </p>

          {/* Preço destaque */}
          <div className="mt-8 inline-flex flex-col items-center bg-gradient-to-br from-[#FFD700] to-[#FF8C00] rounded-3xl px-10 py-6 shadow-2xl">
            <p className="text-[#0D1B3E] font-bold text-sm uppercase tracking-wider mb-1">
              Adicione ao seu plano por apenas
            </p>
            <p className="text-[#0D1B3E] font-black text-6xl leading-none">
              R$<span className="text-7xl">22</span>,90
            </p>
            <p className="text-[#0D1B3E]/70 text-xs mt-1 font-semibold">/mês · GloboPlay Premium</p>
          </div>
        </div>

        {/* Layout 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Coluna esquerda — Vantagens */}
          <div className="animate-fade-in-left">
            <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
              <Star className="text-[#FFD700]" size={24} fill="currentColor" />
              O que está incluso
            </h3>
            <div className="space-y-4">
              {vantagens.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="shrink-0 mt-0.5 bg-[#FFD700]/10 rounded-lg p-2">
                    {v.icon}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{v.texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita — Canais + CTA */}
          <div className="animate-fade-in-right">
            <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
              <Tv className="text-[#FFD700]" size={24} />
              Canais inclusos
            </h3>

            {/* Grid de canais */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-8">
              <div className="grid grid-cols-2 gap-2">
                {canais.map((canal, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0" />
                    <span className="text-white/80 text-xs font-medium">{canal}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-4">
                *Disponibilidade sujeita à região e ao plano contratado.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1a2f5e] border border-[#FFD700]/30 rounded-2xl p-6 text-center">
              <Shield className="text-[#FFD700] mx-auto mb-3" size={32} />
              <p className="text-white font-black text-lg mb-1">
                Já sou assinante InternetMais
              </p>
              <p className="text-white/60 text-sm mb-5">
                Quero adicionar o GloboPlay Premium por R$22,90/mês
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black py-4 rounded-xl text-base hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero adicionar agora via WhatsApp
              </button>
              <p className="text-white/40 text-xs mt-3">
                Promoção válida até 31/07/2026 · Sujeito à disponibilidade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa inferior */}
      <div className="relative z-10 bg-gradient-to-r from-[#006400] via-[#FFD700] to-[#006400] py-2 text-center">
        <p className="text-[#0D1B3E] font-black text-sm tracking-widest uppercase">
          🏆 Copa do Mundo 2026 · Assista com a melhor internet do Brasil · 🏆
        </p>
      </div>
    </section>
  );
}
