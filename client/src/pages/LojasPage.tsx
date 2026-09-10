import { Link } from 'wouter';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  LOJAS,
  HORARIO,
  TELEFONE_E164,
  TELEFONE_EXIBICAO,
  EMAIL,
  zap,
} from '@/data/lojas';

/**
 * /lojas — índice das quatro lojas.
 *
 * Existia só como âncora `#lojas` na home, e âncora o Google não indexa como
 * página. Sem página por loja não há para onde cada ficha do Google Meu
 * Negócio apontar, e as quatro acabavam mandando todo mundo para a home.
 */
export default function LojasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#04060A] text-[#E8F1E9]">
      <Header />
      <main className="flex-1">
        <section className="border-b border-white/10 bg-[#0A1730] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Você está aqui" className="mb-5 text-sm text-[#93A69B]">
              <Link href="/" className="text-[#3DD93D] hover:underline">
                Início
              </Link>
              <span aria-hidden="true" className="px-2 opacity-50">
                ›
              </span>
              <span aria-current="page">Lojas</span>
            </nav>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Lojas da Internet Mais em Campo Grande
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-[#C8D6CC]">
              Quatro lojas na cidade para contratar, pegar segunda via, trocar de plano ou
              resolver suporte técnico pessoalmente. Todas abrem de segunda a sábado.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {LOJAS.map((loja) => (
              <article
                key={loja.slug}
                className="rounded-lg border border-white/10 border-t-2 border-t-[#3DD93D] bg-[#060E1E] p-6"
              >
                <h2 className="text-xl font-bold">{loja.curto}</h2>
                <p className="mt-2 flex items-start gap-2 text-sm text-[#93A69B]">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#3DD93D]" />
                  <span>
                    {loja.logradouro}
                    <br />
                    {loja.bairro}, Campo Grande — MS
                  </span>
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm text-[#CBD8CE]">
                  <Clock size={16} className="mt-0.5 shrink-0 text-[#3DD93D]" />
                  {HORARIO}
                </p>
                <Link
                  href={`/lojas/${loja.slug}`}
                  className="mt-5 inline-block font-bold text-[#3DD93D] hover:underline"
                >
                  Endereço, mapa e contato
                </Link>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-[#060E1E] p-6">
              <h3 className="mb-2 font-bold">Telefone único</h3>
              <p className="text-sm text-[#93A69B]">
                <a href={`tel:${TELEFONE_E164}`} className="text-[#3DD93D] hover:underline">
                  {TELEFONE_EXIBICAO}
                </a>{' '}
                atende as quatro lojas.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#060E1E] p-6">
              <h3 className="mb-2 font-bold">Horário</h3>
              <p className="text-sm text-[#93A69B]">
                Segunda a sexta das 8h às 18h, sábado das 8h às 12h. Não abrimos aos domingos
                e feriados.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#060E1E] p-6">
              <h3 className="mb-2 font-bold">Prefere não sair de casa?</h3>
              <p className="text-sm text-[#93A69B]">
                Segunda via, PIX da fatura e suporte também saem pelo WhatsApp.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
            <a
              href={zap('as lojas')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#3DD93D] px-6 py-3 font-bold text-[#04170A] transition hover:bg-[#2BA82A]"
            >
              Falar no WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#3DD93D]/40 px-6 py-3 font-bold text-[#3DD93D] transition hover:bg-[#3DD93D]/10"
            >
              <Mail size={18} />
              {EMAIL}
            </a>
            <a
              href={`tel:${TELEFONE_E164}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#3DD93D]/40 px-6 py-3 font-bold text-[#3DD93D] transition hover:bg-[#3DD93D]/10"
            >
              <Phone size={18} />
              {TELEFONE_EXIBICAO}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
