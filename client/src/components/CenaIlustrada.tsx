/**
 * Cena — a ilustração que abre uma seção de produto.
 *
 * São quatro desenhos feitos para este site, em `public/images/cenas`: garoto
 * jogando, família com os aparelhos, família diante da TV e home office.
 * Não são foto de banco de imagem, e não são enfeite: cada uma diz de quem é
 * o plano daquela seção antes de a pessoa ler o preço.
 *
 * Ficaram em SVG por dois motivos: pesam 5 KB cada, contra centenas de uma
 * foto, e escalam sem borrar em tela de alta densidade. Quando houver
 * fotografia de verdade, é trocar o `src` — o resto do layout não muda.
 */
type Props = {
  /** nome do arquivo em /images/cenas, sem extensão */
  nome: 'garoto' | 'familia' | 'familia-apps' | 'escritorio';
  /** descrição para leitor de tela; o SVG também traz um <title> interno */
  alt: string;
  className?: string;
};

export default function CenaIlustrada({ nome, alt, className = '' }: Props) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#03060C] ${className}`}
    >
      <img
        src={`/images/cenas/${nome}.svg`}
        alt={alt}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}
