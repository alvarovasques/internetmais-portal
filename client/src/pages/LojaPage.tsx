import { useParams, Link } from 'wouter';
import { MapPin, Clock, Phone, Mail, MessageCircle, Navigation } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import {
  LOJAS,
  acharLoja,
  comoChegar,
  HORARIO,
  TELEFONE_E164,
  TELEFONE_EXIBICAO,
  EMAIL,
  zap,
} from '@/data/lojas';

/**
 * /lojas/:slug — a página de uma loja.
 *
 * É o destino que cada ficha do Google Meu Negócio deve apontar no campo Site.
 * Por isso ela repete nome, endereço, telefone e horário exatamente como estão
 * na ficha: é essa coincidência literal que o Google usa para casar a página
 * com o perfil. O `hasMap` e o `sameAs` do JSON-LD entram junto com o link do
 * perfil, que ainda falta — está marcado no `data/lojas.ts`.
 */
export default function LojaPage() {
  const { slug } = useParams<{ slug: string }>();
  const loja = acharLoja(slug);

  // Slug desconhecido responde 404 de verdade, não uma página vazia com 200.
  if (!loja) return <NotFound />;

  const outras = LOJAS.filter((l) => l.slug !== loja.slug);

  return (
    <div className="flex min-h-screen flex-col bg-[#04060A] text-[#E8F1E9]">
      <Header />
      <main className="flex-1">
        <section className="border-b border-white/10 bg-[#0A1730] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#3DD93D]">
              <span className="h-px w-5 bg-[#3DD93D] opacity-70" aria-hidden="true" />
              Loja
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Internet Mais {loja.curto}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[#C8D6CC]">
              Loja da Internet Mais {loja.curto}, em Campo Grande. Contratação de internet de
              fibra, chip 5G e telefonia fixa, segunda via de fatura, troca de plano e suporte
              técnico presencial.
            </p>
          </div>
        </section>

        <nav
          aria-label="Você está aqui"
          className="mx-auto max-w-5xl px-4 py-6 text-sm text-[#93A69B]"
        >
          <Link href="/" className="text-[#3DD93D] hover:underline">
            Início
          </Link>
          <span aria-hidden="true" className="px-2 opacity-50">
            ›
          </span>
          <Link href="/lojas" className="text-[#3DD93D] hover:underline">
            Lojas
          </Link>
          <span aria-hidden="true" className="px-2 opacity-50">
            ›
          </span>
          <span aria-current="page">{loja.curto}</span>
        </nav>

        <section className="px-4 pb-16 md:pb-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Onde fica e quando abre</h2>

              <dl className="mt-6 divide-y divide-white/10 text-[0.95rem]">
                <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-sm text-[#93A69B]">Endereço</dt>
                  <dd className="flex items-start gap-2">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[#3DD93D]" />
                    <span>
                      {loja.logradouro}
                      <br />
                      {loja.bairro}, Campo Grande — MS
                      {loja.cep ? <> — CEP {loja.cep}</> : null}
                    </span>
                  </dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-sm text-[#93A69B]">Horário</dt>
                  <dd className="flex items-start gap-2">
                    <Clock size={17} className="mt-0.5 shrink-0 text-[#3DD93D]" />
                    {HORARIO}
                  </dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-sm text-[#93A69B]">Telefone</dt>
                  <dd>
                    <a href={`tel:${TELEFONE_E164}`} className="text-[#3DD93D] hover:underline">
                      {TELEFONE_EXIBICAO}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-sm text-[#93A69B]">E-mail</dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`} className="text-[#3DD93D] hover:underline">
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <dt className="text-sm text-[#93A69B]">O que resolve</dt>
                  <dd className="text-[#CBD8CE]">
                    Contratação, segunda via e PIX da fatura, troca de plano, mudança de
                    endereço, entrega e troca de equipamento, suporte técnico.
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={comoChegar(loja)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3DD93D] px-6 py-3 font-bold text-[#04170A] transition hover:bg-[#2BA82A]"
                >
                  <Navigation size={18} />
                  Como chegar
                </a>
                <a
                  href={`tel:${TELEFONE_E164}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3DD93D]/40 px-6 py-3 font-bold text-[#3DD93D] transition hover:bg-[#3DD93D]/10"
                >
                  <Phone size={18} />
                  Ligar para a loja
                </a>
                <a
                  href={zap(`a loja ${loja.curto}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3DD93D]/40 px-6 py-3 font-bold text-[#3DD93D] transition hover:bg-[#3DD93D]/10"
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-[#3DD93D]/25 bg-[#3DD93D]/5 p-6 lg:sticky lg:top-24">
              <h2 className="mb-3 text-lg font-bold">Contratar nesta loja</h2>
              <p className="text-sm text-[#93A69B]">
                Leve um documento com foto e um comprovante de endereço. A instalação costuma
                ser agendada no mesmo atendimento.
              </p>
              <dl className="mt-5 divide-y divide-white/10 text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-[#93A69B]">Entrada</dt>
                  <dd className="text-right">400 Mega por R$ 89,90/mês</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-[#93A69B]">Mais procurado</dt>
                  <dd className="text-right">600 Mega por R$ 99,90/mês</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-[#93A69B]">Empresarial</dt>
                  <dd className="text-right">a partir de R$ 229,90/mês</dd>
                </div>
              </dl>
              <a
                href={zap(`a contratação na loja ${loja.curto}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3DD93D] px-5 py-3 font-bold text-[#04170A] transition hover:bg-[#2BA82A]"
              >
                <MessageCircle size={18} />
                Falar com esta loja
              </a>
            </aside>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0A1730] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-black md:text-3xl">
              Outras lojas em Campo Grande
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {outras.map((o) => (
                <article
                  key={o.slug}
                  className="rounded-lg border border-white/10 border-t-2 border-t-[#3DD93D] bg-[#060E1E] p-5"
                >
                  <h3 className="font-bold">{o.curto}</h3>
                  <p className="mt-2 text-sm text-[#93A69B]">{o.logradouro}</p>
                  <Link
                    href={`/lojas/${o.slug}`}
                    className="mt-4 inline-block text-sm font-bold text-[#3DD93D] hover:underline"
                  >
                    Ver esta loja
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
