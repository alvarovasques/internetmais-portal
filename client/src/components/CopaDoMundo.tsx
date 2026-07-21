import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GraduationCap, Wifi, Tv, Smartphone, Star, Zap, Gift } from 'lucide-react';

const beneficios = [
  {
    icon: <Gift size={22} className="text-[#3DD93D]" />,
    texto: '50% de desconto nos 3 primeiros meses — após esse período, o valor volta ao preço de tabela',
  },
  {
    icon: <Tv size={22} className="text-[#3DD93D]" />,
    texto: '1 aplicativo Standard incluso (PlayKids Learning ou Ubook Plus) + 1 aplicativo Premium (Disney+ ou Globoplay)',
  },
  {
    icon: <Wifi size={22} className="text-[#3DD93D]" />,
    texto: 'Extensor WiFi disponível por apenas + R$ 29,90 — sinal em todos os cômodos da casa',
  },
  {
    icon: <Smartphone size={22} className="text-[#3DD93D]" />,
    texto: 'Acesso à MaisTV com mais de 160 canais ao vivo incluso em todos os planos',
  },
  {
    icon: <Zap size={22} className="text-[#3DD93D]" />,
    texto: 'Fibra óptica 100% pura — velocidade simétrica, upload e download iguais',
  },
  {
    icon: <Star size={22} className="text-[#3DD93D]" />,
    texto: 'Promoção válida para novos assinantes ou para upgrade. Plano com fidelidade.',
  },
];

const apps = [
  {
    nome: 'PlayKids Learning',
    descricao: 'Educação e diversão para crianças',
    cor: 'from-[#7B2D8B] to-[#9B3DBA]',
    icone: 'PK',
    tipo: 'Standard',
  },
  {
    nome: 'Ubook Plus',
    descricao: 'Audiobooks e podcasts',
    cor: 'from-[#FF6B00] to-[#FF8C00]',
    icone: 'U+',
    tipo: 'Standard',
  },
  {
    nome: 'Disney+',
    descricao: 'Filmes, séries e animações',
    cor: 'from-[#0D3B8C] to-[#1A5FBF]',
    icone: 'D+',
    tipo: 'Premium',
  },
  {
    nome: 'Globoplay',
    descricao: 'Novelas, séries e esportes',
    cor: 'from-[#E30613] to-[#FF1A2B]',
    icone: 'GP',
    tipo: 'Premium',
  },
];

export default function CopaDoMundo() {
  const ref = useScrollAnimation();

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'Click_Whatsapp',
        'button_location': 'FeriasEscolares - Plano 800MB R$84,95'
      });
    }
    const msg = encodeURIComponent(
      'Olá! Quero aproveitar a promoção de Férias Escolares: plano 800 MB a partir de R$ 84,95/mês com 50% de desconto nos 3 primeiros meses. Podem me ajudar?'
    );
    window.open(`https://wa.me/556730272500?text=${msg}`, '_blank');
  };

  return (
    <section
      ref={ref}
      id="ferias-escolares"
      className="relative overflow-hidden bg-gradient-to-br from-[#0D1B3E] via-[#0a1628] to-[#0D1B3E]"
    >
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3DD93D]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3DD93D]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1a3a6e]/20 rounded-full blur-3xl" />
      </div>

      {/* Faixa superior Férias */}
      <div className="relative z-10 bg-gradient-to-r from-[#3DD93D] via-[#2bc42b] to-[#3DD93D] py-2.5 text-center">
        <p className="text-[#0D1B3E] font-black text-sm tracking-widest uppercase">
          🎒 Férias Escolares com a Internet Mais · Promoção por tempo limitado · 🎒
        </p>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

        {/* Cabeçalho */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 bg-[#3DD93D]/15 backdrop-blur-md border border-[#3DD93D]/30 px-6 py-3 rounded-full mb-6">
            <GraduationCap className="text-[#3DD93D]" size={22} />
            <span className="text-[#3DD93D] font-black text-sm tracking-wide uppercase">
              Férias Escolares é com a Internet Mais
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Menos Tédio{' '}
            <span className="text-[#3DD93D]">nas Férias!</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Férias é tempo de brincar — e brincar também pode ensinar.{' '}
            <span className="text-white font-semibold">Dê o Play na diversão!</span>
          </p>
        </div>

        {/* Card de plano destaque */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1a2f5e] border border-[#3DD93D]/30 rounded-3xl overflow-hidden shadow-2xl">

            {/* Badge Assine */}
            <div className="bg-[#3DD93D] text-[#0D1B3E] text-center py-3 font-black text-sm tracking-widest uppercase">
              ASSINE AGORA
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Velocidade + Preço */}
                <div className="text-center md:text-left">
                  <div className="flex items-end justify-center md:justify-start gap-2 mb-2">
                    <span className="text-white font-black text-8xl leading-none">800</span>
                    <span className="text-white/60 font-bold text-2xl mb-3">mb</span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-4" />
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">A partir de</p>
                  <div className="flex items-end justify-center md:justify-start gap-1">
                    <span className="text-white/70 font-bold text-xl">R$</span>
                    <span className="text-white font-black text-6xl leading-none">84</span>
                    <span className="text-white font-black text-3xl mb-1">,95</span>
                    <span className="text-white/50 font-semibold text-sm mb-1">/mês</span>
                  </div>
                  <p className="text-[#3DD93D] font-bold text-sm mt-2">
                    50% OFF nos 3 primeiros meses
                  </p>
                </div>

                {/* Benefícios do plano */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DD93D] shrink-0" />
                    <span className="text-white/90 text-sm font-medium">50% desconto nos 3 primeiros meses</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DD93D] shrink-0" />
                    <span className="text-white/90 text-sm font-medium">+ 1 Aplicativo Standard incluso</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DD93D] shrink-0" />
                    <span className="text-white/90 text-sm font-medium">+ 1 Aplicativo Premium incluso</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DD93D] shrink-0" />
                    <span className="text-white/90 text-sm font-medium">Extensor WiFi por + R$ 29,90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apps disponíveis */}
        <div className="mb-14">
          <h3 className="text-white font-black text-2xl text-center mb-8 flex items-center justify-center gap-3">
            <Tv className="text-[#3DD93D]" size={24} />
            Escolha seus aplicativos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {apps.map((app, i) => (
              <div
                key={i}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-[#3DD93D]/30 transition-all duration-300 group"
              >
                {/* Badge tipo */}
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-white text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${app.cor}`}>
                  {app.tipo}
                </div>
                {/* Ícone */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.cor} flex items-center justify-center mx-auto mb-3 font-black text-white text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {app.icone}
                </div>
                <p className="text-white font-bold text-sm leading-tight">{app.nome}</p>
                <p className="text-white/50 text-xs mt-1">{app.descricao}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mt-4">
            * Escolha 1 aplicativo Standard + 1 aplicativo Premium ao contratar
          </p>
        </div>

        {/* Benefícios + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* Benefícios */}
          <div>
            <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
              <Star className="text-[#3DD93D]" size={24} fill="currentColor" />
              Tudo incluso na promoção
            </h3>
            <div className="space-y-3">
              {beneficios.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="shrink-0 mt-0.5 bg-[#3DD93D]/10 rounded-lg p-2">
                    {b.icon}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1a2f5e] border border-[#3DD93D]/30 rounded-2xl p-8 text-center">
            <GraduationCap className="text-[#3DD93D] mx-auto mb-4" size={40} />
            <h4 className="text-white font-black text-xl mb-2">
              Férias Escolares com a Internet Mais
            </h4>
            <p className="text-white/60 text-sm mb-2">
              800 MB a partir de R$ 84,95/mês
            </p>
            <p className="text-[#3DD93D] font-bold text-sm mb-6">
              50% OFF nos 3 primeiros meses
            </p>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black py-4 rounded-xl text-base hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 mb-4"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quero contratar via WhatsApp
            </button>

            {/* Apps base */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-2">
                <div className="w-6 h-6 rounded bg-[#1B5E20] flex items-center justify-center text-white text-[9px] font-black">K</div>
                <span className="text-white/60 text-xs">Kinvo</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-2">
                <div className="w-6 h-6 rounded bg-[#FF6B00] flex items-center justify-center text-white text-[9px] font-black">U+</div>
                <span className="text-white/60 text-xs">Ubook Plus</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-2">
                <div className="w-6 h-6 rounded bg-[#1a3a6e] flex items-center justify-center text-[#3DD93D] text-[9px] font-black">TV</div>
                <span className="text-white/60 text-xs">MaisTV</span>
              </div>
            </div>

            <p className="text-white/30 text-xs leading-relaxed">
              Promoção válida para novos assinantes ou para upgrade. Plano com fidelidade.
              Após 3 meses os valores voltam ao valor de tabela. Consulte condições.
            </p>
          </div>
        </div>
      </div>

      {/* Faixa inferior */}
      <div className="relative z-10 bg-gradient-to-r from-[#3DD93D] via-[#2bc42b] to-[#3DD93D] py-2.5 text-center">
        <p className="text-[#0D1B3E] font-black text-sm tracking-widest uppercase">
          🎒 Férias Escolares · 800 MB a partir de R$ 84,95/mês · 50% OFF nos 3 primeiros meses 🎒
        </p>
      </div>
    </section>
  );
}
