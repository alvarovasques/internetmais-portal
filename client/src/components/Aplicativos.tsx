import { Tv, Star, Film, Music, Play, Dumbbell, Trophy, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Aplicativos() {
  const ref = useScrollAnimation();
  const apps = [
    { icon: Tv, name: 'MaisTV', category: '+100 canais ao vivo' },
    { icon: Star, name: 'Play Kids', category: 'Infantil' },
    { icon: Film, name: 'Looke', category: 'Filmes e séries' },
    { icon: Music, name: 'Deezer', category: 'Música' },
    { icon: Play, name: 'HBO Max', category: 'Streaming' },
    { icon: Play, name: 'Disney+', category: 'Streaming' },
    { icon: Zap, name: 'Sky Light', category: 'TV' },
    { icon: Dumbbell, name: 'Queima Diária', category: 'Fitness' },
    { icon: Dumbbell, name: 'Ritual Fit', category: 'Fitness' },
    { icon: Trophy, name: 'Premiere', category: 'Esportes' },
    { icon: Film, name: 'Telecine', category: 'Cinema' },
    { icon: Trophy, name: 'Combate', category: 'Lutas' },
  ];

  return (
    <section ref={ref} id="aplicativos" className="py-20 md:py-32 bg-[#0D1B3E] opacity-0">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
          Muito além da internet.
          <br />
          <span className="text-[#3DD93D]">Um mundo de conteúdo</span> no seu plano.
        </h2>
        <p className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Acesso a mais de 12 aplicativos premium inclusos nos nossos planos
        </p>

        {/* Apps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {apps.map((app, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-[#3DD93D] transition-all duration-300 card-hover"
            >
              <app.icon size={40} className="text-[#3DD93D] mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">{app.name}</h3>
              <p className="text-gray-300 text-sm">{app.category}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/556730272500?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20representante%20sobre%20quais%20aplicativos%20est%C3%A3o%20inclusos%20em%20cada%20plano%20da%20InternetMais."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Ver qual plano inclui esses apps
          </a>
        </div>
      </div>
    </section>
  );
}
