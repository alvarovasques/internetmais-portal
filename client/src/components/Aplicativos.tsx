import { useState } from 'react';
import { MessageCircle, Tv } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AppWithPlan {
  name: string;
  logo: string;
  type: 'standard' | 'premium' | 'incluso';
  plans: string[];
}

export default function Aplicativos() {
  const ref = useScrollAnimation();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const apps: AppWithPlan[] = [
    // Apps Standard
    { name: 'Ubook Plus', logo: '/images/apps/ubook-plus.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Zen', logo: '/images/apps/zen.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Leitura 360', logo: '/images/apps/leitura-360.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Estuda+', logo: '/images/apps/estuda-mais.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Pequenos Leitores', logo: '/images/apps/pequenos-leitores.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'O Jornalista', logo: '/images/apps/o-jornalista.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Playlist', logo: '/images/apps/playlist.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Kiddle Pass', logo: '/images/apps/kiddle-pass.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'PlayKids+', logo: '/images/apps/playkids-plus.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Sky+ Light', logo: '/images/apps/sky-plus-light.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Deezer', logo: '/images/apps/deezer.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Social Comics', logo: '/images/apps/social-comics.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Kaspersky Standard (3 lic.)', logo: '/images/apps/kaspersky-standard.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Qnutri', logo: '/images/apps/qnutri.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Looke', logo: '/images/apps/looke.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Curtaon', logo: '/images/apps/curtaon.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Revistaria', logo: '/images/apps/revistaria.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Fluid', logo: '/images/apps/fluid.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Hub Vantagens', logo: '/images/apps/hub-vantagens.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },

    // Apps Premium
    { name: 'Smart Content', logo: '/images/apps/smart-content.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Ritual Fit', logo: '/images/apps/ritual-fit.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Kaspersky Plus (5 licenças)', logo: '/images/apps/kaspersky-plus.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Docway', logo: '/images/apps/docway.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'HotGo', logo: '/images/apps/hotgo.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Queima Diária', logo: '/images/apps/queima-diaria.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'HBO Max', logo: '/images/apps/hbo-max.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Disney+', logo: '/images/apps/disney-plus.png', type: 'premium', plans: ['600MB', '800MB'] },

    // Apps Inclusos
    { name: 'Ubook Go', logo: '/images/apps/ubook-go.png', type: 'incluso', plans: ['Todos'] },
    { name: 'Kaspersky', logo: '/images/apps/kaspersky.png', type: 'incluso', plans: ['Todos'] },
    { name: 'MaisTV', logo: '', type: 'incluso', plans: ['Todos'] },
  ];

  const standardApps = apps.filter(app => app.type === 'standard');
  const premiumApps = apps.filter(app => app.type === 'premium');
  const inclusoApps = apps.filter(app => app.type === 'incluso');

  return (
    <section ref={ref} id="aplicativos" className="py-20 md:py-32 bg-[#0D1B3E]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Muito além da internet
            <br />
            <span className="text-[#3DD93D]">Um mundo de conteúdo</span> no seu plano
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Escolha seus apps favoritos e aproveite conteúdo premium inclusos em todos os planos
          </p>
        </div>

        {/* Apps by Category */}
        <div className="space-y-12 mb-16">
          {/* Standard Apps */}
          <div className="animate-fade-in-up animate-delay-100">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3DD93D] rounded-full"></span>
              Apps Standard (1 app incluso nos planos "Internet + Aplicativos" de 400MB, 600MB e 800MB)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {standardApps.map((app, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedApp(app.name)}
                  className={`bg-white border-2 rounded-lg p-1 text-center hover:shadow-lg transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
                    selectedApp === app.name ? 'border-[#3DD93D] ring-2 ring-[#3DD93D]' : 'border-gray-300'
                  }`}
                  title={app.name}
                >
                  <img
                    src={app.logo}
                    alt={`${app.name} - App incluso em planos InternetMais`}
                    className="h-24 w-24 object-contain mx-auto mb-1"
                    loading="lazy"
                  />
                  <p className="text-black font-semibold text-xs text-center line-clamp-2">{app.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Apps */}
          <div className="animate-fade-in-up animate-delay-200">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF1744] rounded-full"></span>
              Apps Premium (Apps exclusivos para planos "Internet + Aplicativos" de 600MB e 800MB)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {premiumApps.map((app, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedApp(app.name)}
                  className={`bg-white border-2 rounded-lg p-1 text-center hover:shadow-lg transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
                    selectedApp === app.name ? 'border-[#FF1744] ring-2 ring-[#FF1744]' : 'border-gray-300'
                  }`}
                  title={app.name}
                >
                  <img
                    src={app.logo}
                    alt={`${app.name} - App incluso em planos InternetMais`}
                    className="h-24 w-24 object-contain mx-auto mb-1"
                    loading="lazy"
                  />
                  <p className="text-black font-semibold text-xs text-center line-clamp-2">{app.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Incluso Apps */}
          <div className="animate-fade-in-up animate-delay-300">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
              Apps Inclusos em Todos os Planos
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
              {inclusoApps.map((app, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-300 rounded-lg p-1 text-center hover:shadow-lg transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center min-h-[140px]"
                  title={app.name}
                >
                  {app.name === 'MaisTV' ? (
                    <Tv size={56} className="text-[#3DD93D] mx-auto mb-1" />
                  ) : (
                    <img
                      src={app.logo}
                      alt={app.name}
                      className="h-24 w-24 object-contain mx-auto mb-1"
                    />
                  )}
                  <p className="text-black font-semibold text-xs text-center line-clamp-2">{app.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up animate-delay-400">
          <a
            href={`https://wa.me/556730272500?text=${encodeURIComponent(
              selectedApp
                ? `Olá! Gostaria de contratar um plano com o app ${selectedApp} incluso.`
                : 'Olá! Gostaria de saber mais sobre os planos com aplicativos inclusos.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  'event': 'Click_Whatsapp',
                  'button_location': 'Aplicativos'
                });
              }
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#3DD93D] hover:bg-[#2BA82A] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <MessageCircle size={20} />
            Assine Agora {selectedApp && `- ${selectedApp}`}
          </a>
        </div>
      </div>
    </section>
  );
}
