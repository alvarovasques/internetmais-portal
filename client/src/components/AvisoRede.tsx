import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { TELEFONE_EXIBICAO, zap } from '@/data/lojas';

/**
 * Aviso de ocorrência na rede, em cima de qualquer página do site.
 *
 * Quando um temporal derruba parte da rede, o cliente sem conexão abre o site
 * pelo celular procurando explicação, e o que ele encontrava era a página de
 * vendas. Este aviso é a resposta antes da pergunta: diz o que houve, o que
 * está sendo feito e o que ele pode tentar sozinho, com o WhatsApp à mão.
 *
 * ─── COMO DESLIGAR ───────────────────────────────────────────────────────
 * Normalizou? `ativo: false` abaixo, e pronto.
 *
 * Mudou o texto? Troque o texto E o `id`. O `id` é a chave que guarda "esta
 * pessoa já fechou este aviso" no navegador dela; mantendo o id antigo, quem
 * já tinha fechado nunca veria a versão nova.
 *
 * O `ate` é rede de segurança, não agenda: passada essa data o aviso some
 * sozinho. Aviso de tempestade esquecido no ar duas semanas depois diz ao
 * cliente que ninguém olha para este site. Se a recuperação se estender,
 * empurre a data.
 */
const AVISO = {
  id: 'tempestade-2026-09-10',
  ativo: true,
  ate: '2026-09-16T23:59:59-04:00',
};

const CHAVE = `internetmais:aviso:${AVISO.id}`;

function jaFechou(): boolean {
  try {
    return localStorage.getItem(CHAVE) === 'fechado';
  } catch {
    // Navegador com armazenamento bloqueado (aba anônima, política de
    // privacidade). O aviso reaparece a cada visita, que é o lado errado
    // menos ruim: melhor repetir do que esconder.
    return false;
  }
}

function marcarFechado() {
  try {
    localStorage.setItem(CHAVE, 'fechado');
  } catch {
    /* sem armazenamento, sem memória; segue funcionando */
  }
}

export default function AvisoRede() {
  const noPrazo = AVISO.ativo && Date.now() < new Date(AVISO.ate).getTime();
  const [aberto, setAberto] = useState(false);
  const [fechado, setFechado] = useState(true);
  const botaoFechar = useRef<HTMLButtonElement>(null);

  // Só depois da montagem, porque localStorage não existe durante o build.
  useEffect(() => {
    if (!noPrazo) return;
    const fechou = jaFechou();
    setFechado(fechou);
    setAberto(!fechou);
  }, [noPrazo]);

  // Enquanto o aviso está aberto, a página atrás não rola, e Esc fecha.
  useEffect(() => {
    if (!aberto) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    botaoFechar.current?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    document.addEventListener('keydown', tecla);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', tecla);
    };
  }, [aberto]);

  if (!noPrazo) return null;

  function fechar() {
    setAberto(false);
    setFechado(true);
    marcarFechado();
  }

  if (!aberto) {
    // Quem fechou continua com o aviso a um toque de distância. Faz diferença
    // para quem fecha na home e fica sem sinal uma hora depois.
    return (
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="fixed inset-x-0 bottom-0 z-[200] flex items-center justify-center gap-2 border-t border-[#F5C518]/30 bg-[#1B1405] px-4 py-2.5 text-sm text-[#F2E3B5] transition-colors hover:bg-[#241a07]"
      >
        <AlertTriangle size={15} className="shrink-0 text-[#F5C518]" />
        <span>Aviso sobre a rede após a tempestade</span>
        <span className="font-bold text-[#F5C518] underline underline-offset-2">ler</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aviso-rede-titulo"
        className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-2xl border border-white/10 bg-[#0A1730] shadow-[0_34px_90px_-26px_rgba(0,0,0,.95)] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start gap-3 border-b border-white/10 bg-[#1B1405] px-5 py-4">
          <AlertTriangle size={22} className="mt-0.5 shrink-0 text-[#F5C518]" />
          <h2 id="aviso-rede-titulo" className="flex-1 text-lg font-black leading-snug text-[#F2E3B5]">
            Aviso importante aos nossos clientes
          </h2>
          <button
            ref={botaoFechar}
            type="button"
            onClick={fechar}
            aria-label="Fechar aviso"
            className="-mr-1 shrink-0 rounded-full p-1 text-[#F2E3B5]/70 transition-colors hover:bg-white/10 hover:text-[#F2E3B5]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-[#CBD8CE]">
          <p>
            A tempestade de ontem (10/09) atingiu toda a cidade e causou quedas de energia e
            danos à rede em diversas regiões de Campo Grande. Parte dos nossos clientes segue
            sem conexão por causa disso.
          </p>
          <p>
            Nossas equipes estão em campo desde as primeiras horas trabalhando na recuperação
            dos pontos afetados. Estamos priorizando as áreas com maior número de clientes
            impactados e avançando região por região.
          </p>
          <p className="rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/10 px-4 py-3 text-[#F2E3B5]">
            <strong className="font-bold">Atenção:</strong> a Prefeitura emitiu novo alerta de
            tempestade para hoje. Isso pode gerar novas ocorrências e atrasar reparos em
            andamento. Nossas equipes seguem atuando enquanto houver segurança para trabalhar.
          </p>

          <div>
            <p className="font-bold text-[#E8F1E9]">Se você está sem internet:</p>
            <ul className="mt-2 space-y-2">
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-[#3DD93D]">✔️</span>
                <span>Verifique se a energia da sua casa voltou e reinicie o roteador</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-[#3DD93D]">✔️</span>
                <span>
                  Se continuar sem sinal, chame a gente no WhatsApp {TELEFONE_EXIBICAO}
                </span>
              </li>
            </ul>
          </div>

          <p>
            Agradecemos a paciência e a compreensão. Vamos atualizar por aqui conforme as
            regiões forem sendo normalizadas.
          </p>
          <p className="font-bold text-[#E8F1E9]">Internet Mais 💚</p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-[#0A1730] px-5 py-4 sm:flex-row">
          <a
            href={zap('a minha conexão após a tempestade')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-[#3DD93D] px-6 py-3 text-center font-bold text-[#04170A] transition-transform hover:scale-[1.02]"
          >
            Falar no WhatsApp
          </a>
          <button
            type="button"
            onClick={fechar}
            className="rounded-full border border-white/15 px-6 py-3 font-bold text-[#E8F1E9] transition-colors hover:border-white/30"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
