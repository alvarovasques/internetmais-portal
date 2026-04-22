import { MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AppWithPlan {
  name: string;
  logo: string;
  type: 'standard' | 'premium' | 'incluso';
  plans: string[];
}

export default function Aplicativos() {
  const ref = useScrollAnimation();

  const apps: AppWithPlan[] = [
    // Apps Standard
    { name: 'Ubook', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ubook_97728dfb.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Zen', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/zen_836e97dc.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Leitura 360', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/leitura-360_3b7cd0c8.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Estuda', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/estuda_1b6b23ea.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Pequenos Leitores', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/pequenos-leitores_08202ef5.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Playlist', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/playlist_4a584bda.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },
    { name: 'Jornalista', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/jornalista_a4f9c11d.png', type: 'standard', plans: ['400MB', '600MB', '800MB'] },

    // Apps Premium
    { name: 'Smart Content', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/smart-content_369ea140.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'HBO Max', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/hbo-max_8983f5f2.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Disney+', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/disney-plus_e2b45e97.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Globo Play', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/globoplay-hq_5eefcb22.png', type: 'premium', plans: ['600MB', '800MB'] },
    { name: 'Kaspersky', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/kaspersky_a4e6e712.png', type: 'premium', plans: ['600MB', '800MB'] },

    // Apps Inclusos
    { name: 'MaisTV', logo: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028749933/QrZSp3M6QVWAMUgvwA5jWP/ubook_bdab405a.png', type: 'incluso', plans: ['Todos'] },
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
              Apps Standard (Escolha 1 em 400MB | Escolha 1 em 600MB e 800MB)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {standardApps.map((app, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 hover:border-[#3DD93D] transition-all duration-300 hover:scale-110"
                  title={app.name}
                >
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="h-12 w-12 object-contain mx-auto mb-2"
                  />
                  <p className="text-white font-semibold text-xs">{app.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Apps */}
          <div className="animate-fade-in-up animate-delay-200">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF1744] rounded-full"></span>
              Apps Premium (Escolha 1 em 600MB e 800MB)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {premiumApps.map((app, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 hover:border-[#FF1744] transition-all duration-300 hover:scale-110"
                  title={app.name}
                >
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="h-12 w-12 object-contain mx-auto mb-2"
                  />
                  <p className="text-white font-semibold text-xs">{app.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Incluso Apps */}
          <div className="animate-fade-in-up animate-delay-300">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
              Apps Inclusos em Todos os Planos
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-4">
              {inclusoApps.map((app, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 hover:border-[#4CAF50] transition-all duration-300 hover:scale-110"
                  title={app.name}
                >
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="h-12 w-12 object-contain mx-auto mb-2"
                  />
                  <p className="text-white font-semibold text-xs">{app.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up animate-delay-400">
          <a
            href="https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20planos%20com%20aplicativos%20inclusos%20e%20escolher%20meus%20apps%20favoritos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#3DD93D] hover:bg-[#2BA82A] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <MessageCircle size={20} />
            Assine Agora
          </a>
        </div>
      </div>
    </section>
  );
}
