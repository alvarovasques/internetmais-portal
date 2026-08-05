import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Film, Star, Clock, Zap } from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP';
const WA_NUMBER = '556730272500';

const filmes = [
  {
    poster: '/manus-storage/poster-charlie-hd_92db6653.jpg',
    title: 'Charlie, o Cão Maravilha',
    genre: 'Animação / Família',
  },
  {
    poster: '/manus-storage/poster-empregada_526f790b.jpg',
    title: 'A Empregada',
    genre: 'Suspense / Thriller',
  },
  {
    poster: '/manus-storage/poster-retorno_23d90d3c.jpg',
    title: 'O Retorno',
    genre: 'Drama',
  },
];

function buildWaLink() {
  const msg = 'Olá! Sou cliente Internet Mais e quero adicionar o Telecine por R$ 9,90/mês. Podem me ajudar?';
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function pushGTM(event: string, extra?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...extra });
  }
}

export default function TelecineCampanha() {
  const ref = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="telecine-campanha"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 40%, #1a0a2e 100%)',
      }}
    >
      {/* Ticker topo */}
      <div
        className="w-full py-2.5 overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
      >
        <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] inline-block">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-white font-black text-xs uppercase tracking-widest mx-10">
              🎬 Telecine no Precinho · R$ 9,90/mês · Até 12 meses · Promoção de Agosto 2026 ·
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-5 flex-wrap">
            <img
              src={`${CDN}/telecine-logo_58f3a687.png`}
              alt="Telecine"
              className="h-12 w-auto object-contain bg-white rounded-xl px-4 py-2 shadow-lg"
            />
            <span
              className="text-white font-black text-xs px-4 py-2 rounded-full uppercase tracking-widest shadow-lg"
              style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
            >
              Promoção de Agosto
            </span>
          </div>

          <p className="text-white/70 text-base font-semibold mb-2">
            Não perca a oportunidade de garantir
          </p>
          <h2 className="font-black text-4xl md:text-6xl leading-tight mb-4">
            <span className="text-white">TELE</span>
            <span style={{ color: '#e50914' }}>CINE</span>
            <span className="text-white"> no precinho!</span>
          </h2>

          {/* Período e preço */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-orange-400" />
              <span className="text-white/80 text-sm font-semibold">01/08/2026 a 31/08/2026</span>
            </div>
            <span className="hidden sm:block text-white/30">|</span>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-orange-400" />
              <span className="text-orange-400 font-black text-base">
                Telecine por apenas{' '}
                <span className="text-white text-lg">R$ 9,90</span>{' '}
                até 12 meses após a ativação!
              </span>
            </div>
          </div>
        </div>

        {/* Esteira de posters */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-10">
          {filmes.map((filme, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer"
              style={{ aspectRatio: '2/3' }}
            >
              <img
                src={filme.poster}
                alt={filme.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Título hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-xs leading-tight">{filme.title}</p>
                <p className="text-white/60 text-xs">{filme.genre}</p>
              </div>
              {/* Badge número */}
              <div
                className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg"
                style={{ background: 'rgba(229,9,20,0.95)' }}
              >
                {i + 1}
              </div>
              {/* Título fixo */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-white font-bold text-xs leading-tight truncate">{filme.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
          {[
            { icon: <Film size={18} />, text: 'Catálogo completo de filmes' },
            { icon: <Star size={18} />, text: 'Lançamentos exclusivos' },
            { icon: <Zap size={18} />, text: 'Sem fidelidade' },
            { icon: <Clock size={18} />, text: 'Cancele quando quiser' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3 text-center"
            >
              <span className="text-orange-400">{item.icon}</span>
              <span className="text-white/80 text-xs font-semibold leading-tight">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={buildWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushGTM('Click_Telecine_Campanha', { button_location: 'Home - Bloco Telecine Agosto' })}
            className="inline-flex items-center gap-3 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Garanta agora!
          </a>
          <p className="text-white/40 text-xs mt-3">
            Promoção válida de 01/08/2026 a 31/08/2026 · Exclusivo para clientes Internet Mais
          </p>
        </div>
      </div>

      {/* Ticker rodapé */}
      <div
        className="w-full py-2.5 overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #e50914, #b81d24)' }}
      >
        <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite_reverse] inline-block">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-white font-black text-xs uppercase tracking-widest mx-10">
              ✨ Garanta agora · Telecine R$ 9,90/mês · Até 12 meses · Oferta por tempo limitado ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
