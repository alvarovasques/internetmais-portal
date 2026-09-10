import { Network, MapPin, Headset } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Aqui havia três depoimentos assinados por "Carlos Silva", "Maria Santos" e
 * "João Costa" — pessoas que não existem — e a mesma invenção aparecia como
 * `review` no JSON-LD da home. Avaliação inventada em dados estruturados é
 * candidata a ação manual por spam, não a estrela no resultado de busca.
 *
 * No lugar entram três fatos verificáveis sobre a rede. Para trazer depoimento
 * de verdade de volta: use avaliações reais do perfil do Google Meu Negócio,
 * com autorização de quem escreveu, e nunca as declare em `aggregateRating` do
 * próprio site — quem publica nota agregada é a plataforma de avaliação.
 */
export default function ProvaSocial() {
  const ref = useScrollAnimation();

  const fatos = [
    {
      icone: <Network size={26} />,
      titulo: 'Rede própria desde 2017',
      texto:
        'Construímos e mantemos a nossa própria fibra em Campo Grande. Quando dá problema, ' +
        'o time que resolve é o nosso, não o de um terceiro.',
    },
    {
      icone: <MapPin size={26} />,
      titulo: '39 bairros atendidos',
      texto:
        'Cerca de 70% da cidade já tem cobertura de fibra da InternetMais, e a rede ' +
        'continua crescendo todo mês.',
    },
    {
      icone: <Headset size={26} />,
      titulo: 'Atendimento presencial',
      texto:
        'Quatro lojas na cidade, de segunda a sábado, para contratar, resolver a fatura ' +
        'ou pedir suporte olhando no olho.',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#3DD93D] opacity-0">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
          +20 mil clientes conectados em Campo Grande
        </h2>
        <p className="text-lg text-white/90 text-center mb-16 max-w-2xl mx-auto">
          Campo Grande é a nossa casa: a rede é nossa, e quem atende também.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fatos.map((fato) => (
            <div
              key={fato.titulo}
              className="bg-[#0A1730] rounded-2xl p-8 shadow-[0_18px_50px_-20px_rgba(0,0,0,.85)] hover:shadow-[0_26px_70px_-24px_rgba(0,0,0,.9)] card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3DD93D]/15 text-[#3DD93D] flex items-center justify-center mb-5">
                {fato.icone}
              </div>
              <h3 className="font-bold text-[#E8F1E9] text-lg mb-3">{fato.titulo}</h3>
              <p className="text-[#CBD8CE] leading-relaxed">{fato.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
