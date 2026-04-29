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
    { name: 'Ubook Plus', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ubook_plus_cb4505d6.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Zen', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/zen_5fe6a424.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Leitura 360', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/leitura_360_dcb38301.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Estuda+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/estuda_5da0ea5e.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Pequenos Leitores', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/pequenos_leitores_bd05c71e.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'O Jornalista', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/jornalista_72f92588.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Playlist', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/playlist_ae5a8f2c.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Kiddle Pass', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kiddle_pass_83480f5f.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'PlayKids+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/playkids_plus_0edcb760.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Sky+ Light', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/sky_plus_light_correct_5bb1bc0f.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Deezer', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/deezer_c80f6c93.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Social Comics', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/social_comics_73989f43.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Kaspersky Standard (3 lic.)', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_standard_91009e85.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Qnutri', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/qnutri_f742a5e2.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Looke', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/looke_16394443.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Curtaon', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/curtaon_b85cae88.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Revistaria', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/revistaria_correct_2fc8ef73.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Fluid', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/fluid_6672ee02.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Hub Vantagens', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hub_vantagens_f70aaea4.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },

    // Apps Premium
    { name: 'Smart Content', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/pasted_file_rhmkSC_image_9113653c.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Ritual Fit', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ritual_fit_229a350c.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Kaspersky Plus (5 licenças)', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_plus_83f4dd88.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Docway', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/docway_27238b63.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'HotGo', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hotgo_bc8647a1.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Queima Diária', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/queima_diaria_correct_9b9e6828.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'HBO Max', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hbo-max_8983f5f2.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Disney+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/disney-plus_e2b45e97.png', type: 'premium', plans: ['600MB', '800MB'] },

    // Apps Inclusos
    { name: 'Ubook Go', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ubook_97728dfb.png', type: 'incluso', plans: ['Todos'] },
    { name: 'Kaspersky', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_a4e6e712.png', type: 'incluso', plans: ['Todos'] },
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
            Muito além da internet.
            <br />
            <span className="text-[#3DD93D]">Um mundo de conteúdo</span> no seu plano.
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
