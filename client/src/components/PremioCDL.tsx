import { Award, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * Prêmio Melhores do Varejo 2026, da CDL Campo Grande.
 *
 * A arte oficial vem da CDL, então ela entra como imagem e não é redesenhada
 * aqui: logo e identidade do prêmio são deles. Mas arte 16:9 com texto chapado
 * fica ilegível num celular — a linha do endereço do site some a 390px —, por
 * isso o que importa (categoria e o convite para votar) aparece também como
 * texto de verdade, que o leitor de tela lê e o Google indexa.
 *
 * O bloco inteiro é um link, e ainda assim tem botão: numa peça de campanha,
 * quem não percebe que a imagem clica é quem mais precisa do botão.
 *
 * A arte manda a pessoa para `cdlcampogrande.com.br`, a home da CDL; o link
 * aqui vai direto para a página de votação, que é um passo a menos.
 *
 * Campanha com prazo: quando a votação encerrar, é tirar o `<PremioCDL />` do
 * `Home.tsx`. O resto do site não depende dele.
 */
const URL_VOTACAO = 'https://melhores.cdlcampogrande.com.br/votar';

export default function PremioCDL() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} id="premio-cdl" className="py-16 md:py-24 opacity-0">
      <div className="container mx-auto px-4">
        <a
          href={URL_VOTACAO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Votar na Internet Mais no Prêmio Melhores do Varejo 2026 da CDL Campo Grande"
          className="group mx-auto block max-w-4xl overflow-hidden rounded-3xl border border-[#D9A441]/35 bg-[#0B1537] shadow-[0_26px_70px_-24px_rgba(0,0,0,.9)] transition-colors hover:border-[#D9A441]/70"
        >
          <img
            src="/images/campanha/premio-cdl-2026.webp"
            srcSet="/images/campanha/premio-cdl-2026-800.webp 800w, /images/campanha/premio-cdl-2026.webp 1600w"
            sizes="(max-width: 896px) 100vw, 896px"
            alt="Prêmio Melhores do Varejo 2026 da CDL Campo Grande. A Internet Mais concorre na categoria Provedor de Internet."
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />

          <div className="border-t border-[#D9A441]/25 px-6 py-8 text-center md:px-10 md:py-10">
            <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D9A441] md:text-sm">
              <Award size={16} className="shrink-0" />
              Prêmio Melhores do Varejo 2026 · CDL Campo Grande
            </p>

            <h2 className="mt-4 text-2xl font-black leading-tight text-white md:text-4xl">
              Estamos concorrendo a Provedor de Internet
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              O voto é aberto e leva menos de um minuto. Se a Internet Mais chega
              na sua casa, esse voto é da rede que é daqui.
            </p>

            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D9A441] px-8 py-4 text-base font-black text-[#0B1537] transition-transform group-hover:scale-105 md:text-lg">
              Votar na Internet Mais
              <ExternalLink size={18} className="shrink-0" />
            </span>

            <p className="mt-4 text-xs text-white/60">
              A votação acontece no site da CDL Campo Grande
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}
