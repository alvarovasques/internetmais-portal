import { useEffect } from 'react';
import { Link } from 'wouter';
import { MapPin, Store, Wifi } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TELEFONE_EXIBICAO, TELEFONE_E164, zap } from '@/data/lojas';

/**
 * Esta é a página que recebe quem errou o endereço, quem veio de um link
 * velho e quem pediu um bairro ou uma loja que não existe — e desde que o
 * servidor passou a devolver 404 de verdade, é também o que o Google vê.
 *
 * Estava em inglês ("Page Not Found", "Go Home"), com botão azul que não é da
 * paleta e "404" em cinza escuro sobre fundo escuro, ilegível. Pior: era um
 * cartão solto, sem cabeçalho nem rodapé, então a única saída era o botão.
 * Beco sem saída em página de erro é visita perdida; o caminho de volta tem
 * que estar à mão.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada — Internet Mais';
  }, []);

  const saidas = [
    { href: '/', icone: Wifi, titulo: 'Planos de internet',
      desc: 'Fibra de 400 a 800 Mega, empresarial, chip 5G e telefonia fixa.' },
    { href: '/bairros', icone: MapPin, titulo: 'Cobertura por bairro',
      desc: 'Os 39 bairros de Campo Grande onde a rede já chega.' },
    { href: '/lojas', icone: Store, titulo: 'Nossas lojas',
      desc: 'Endereço, horário e telefone das quatro unidades.' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#04060A] text-[#E8F1E9]">
      <Header />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3DD93D]">
              Erro 404
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              Essa página não existe
            </h1>
            <p className="mt-4 text-[#CBD8CE]">
              O endereço pode ter mudado de lugar, ou tem um caractere a mais na
              barra do navegador. Abaixo está o que as pessoas costumam procurar.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
            {saidas.map(({ href, icone: Icone, titulo, desc }) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-white/10 bg-[#0A1730] p-6 transition-colors hover:border-[#3DD93D]/50"
              >
                <Icone className="mb-3 text-[#3DD93D]" size={26} />
                <h2 className="text-lg font-bold leading-snug">{titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#93A69B]">{desc}</p>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-[#060E1E] p-6 text-center">
            <p className="text-[#CBD8CE]">
              Se você procurava alguma coisa específica, fale com a gente.
            </p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={zap('os planos')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#3DD93D] px-6 py-2.5 font-bold text-[#04170A] transition-transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
              <a
                href={`tel:${TELEFONE_E164}`}
                className="rounded-full border border-white/15 px-6 py-2.5 font-bold transition-colors hover:border-[#3DD93D]/50"
              >
                {TELEFONE_EXIBICAO}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
