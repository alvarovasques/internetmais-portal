import { useParams, Link } from 'wouter';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import { LOJAS, HORARIO, zap } from '@/data/lojas';
import bairrosData from '@/data/bairros.json';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, Zap, Phone } from 'lucide-react';

interface BairroData {
  slug: string;
  keywords: string[];
  description: string;
  faq: Array<{ q: string; a: string }>;
}

export default function BairroPage() {
  const { slug } = useParams<{ slug: string }>();
  const [bairroName, setBairroName] = useState<string>('');
  const [bairroData, setBairroData] = useState<BairroData | null>(null);
  const [artigo, setArtigo] = useState<string>('no');

  // Mapeamento de gênero dos bairros
  const generoMap: Record<string, string> = {
    "Aero Rancho": "m",
    "Alves Pereira": "m",
    "Bandeirantes": "m",
    "Batistão": "m",
    "Caiçara": "m",
    "Caiobá": "m",
    "Vila Carvalho": "f",
    "Centenário": "m",
    "Centro": "m",
    "Centro Oeste": "m",
    "Cophavila II": "f",
    "Cruzeiro": "m",
    "Guanandi": "m",
    "Vila Jacy": "f",
    "Jardim dos Estados": "m",
    "Jockey Club": "m",
    "José Abrão": "m",
    "Lageado": "m",
    "Leblon": "m",
    "Los Angeles": "m",
    "Moreninha": "f",
    "Vila Nasser": "f",
    "Nova Campo Grande": "f",
    "Núcleo Industrial": "m",
    "Panamá": "m",
    "Popular": "f",
    "Rita Vieira": "m",
    "Santo Amaro": "m",
    "Santo Antônio": "m",
    "São Conrado": "m",
    "Seminário": "m",
    "Vila Sobrinho": "f",
    "Taquarussu": "m",
    "Tarumã": "m",
    "Taveiropólis": "m",
    "Tijuca": "m",
    "Tiradentes": "m",
    "União": "m",
    "Universitário": "m",
  };

  useEffect(() => {
    // Find bairro by slug
    const found = Object.entries(bairrosData).find(
      ([_, data]) => (data as BairroData).slug === slug
    );

    if (found) {
      setBairroName(found[0]);
      setBairroData(found[1] as BairroData);
      // Atualizar artigo conforme o gênero do bairro
      const genero = generoMap[found[0]] || 'm';
      setArtigo(genero === 'f' ? 'na' : 'no');
    }
  }, [slug, generoMap]);

  const handleWhatsAppClick = () => {
    (window as any).dataLayer?.push({
      event: 'Click_Whatsapp',
      button_location: `Bairro - ${bairroName}`
    });
    window.location.href = 'https://wa.me/556730272500?text=Olá! Gostaria de informações sobre internet em ' + bairroName;
  };

  useEffect(() => {
    if (!bairroData) return;

    // Update document title and meta tags
    document.title = `Internet Fibra em ${bairroName} - InternetMais`;
    
    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', bairroData.description);
    updateMeta('keywords', bairroData.keywords.join(', '));

    // O JSON-LD desta rota é gerado em build por scripts/gerar-heads.py e vai
    // no HTML servido, não injetado aqui. Havia dois motivos para tirar daqui:
    // robô de IA não executa JavaScript, então para eles este bloco não existia;
    // e o que era emitido declarava `LocalBusiness` com CEP 79000-000, afirmando
    // um estabelecimento comercial no bairro. Não existe: são quatro lojas.
    // A rota agora declara `Service` com `areaServed`, que é a verdade.
  }, [bairroName, bairroData]);

  // Slug fora da lista responde a página de erro, e não uma casca com HTTP 200:
  // URL inexistente que responde 200 é soft-404 e polui o índice.
  if (!bairroData) return <NotFound />;

  // Quatro outros bairros, para o visitante que caiu aqui pela busca não ficar
  // num beco: página de bairro sem ligação interna é ilha, e o Google trata
  // ilha de 39 páginas parecidas como conteúdo raso.
  const outros = Object.entries(bairrosData)
    .filter(([nome]) => nome !== bairroName)
    .slice(0, 4) as [string, BairroData][];

  return (
    <div className="min-h-screen bg-[#04060A] text-[#E8F1E9]">
      <Header />

      <div className="border-b border-white/10 bg-[#0A1730] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Você está aqui" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#93A69B]">
            <Link href="/" className="text-[#3DD93D] hover:underline">Início</Link>
            <ChevronRight size={14} className="opacity-50" />
            <Link href="/bairros" className="text-[#3DD93D] hover:underline">Bairros</Link>
            <ChevronRight size={14} className="opacity-50" />
            <span aria-current="page">{bairroName}</span>
          </nav>
          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
            Internet de fibra óptica {artigo} {bairroName}, Campo Grande
          </h1>
          <p className="mb-7 max-w-2xl text-lg text-[#C8D6CC]">{bairroData.description}</p>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-[#3DD93D] font-bold text-[#04170A] hover:bg-[#2ba82a]"
          >
            Ver se tem fibra na minha rua
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-14 grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border-l-4 border-[#3DD93D] bg-[#060E1E] p-6">
            <Zap className="mb-4 text-[#3DD93D]" size={30} />
            <h2 className="mb-2 text-lg font-bold">Fibra até o roteador</h2>
            <p className="text-sm text-[#93A69B]">
              Sem trecho de cabo metálico no caminho: a velocidade contratada é a que
              chega no aparelho.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-[#3DD93D] bg-[#060E1E] p-6">
            <MapPin className="mb-4 text-[#3DD93D]" size={30} />
            <h2 className="mb-2 text-lg font-bold">Rede própria desde 2017</h2>
            <p className="text-sm text-[#93A69B]">
              {bairroName} está entre os 39 bairros de Campo Grande atendidos pela nossa
              rede, cerca de 70% da cidade.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-[#3DD93D] bg-[#060E1E] p-6">
            <Phone className="mb-4 text-[#3DD93D]" size={30} />
            <h2 className="mb-2 text-lg font-bold">Atendimento com gente</h2>
            <p className="text-sm text-[#93A69B]">
              Suporte por WhatsApp e quatro lojas na cidade, de segunda a sábado.
            </p>
          </div>
        </div>

        <section className="mb-14">
          <h2 className="mb-3 text-2xl font-black md:text-3xl">
            Quanto custa a internet {artigo} {bairroName}?
          </h2>
          <p className="max-w-2xl text-[#CBD8CE]">
            Os planos residenciais vão de R$ 89,90 a R$ 169,90 por mês, conforme a
            velocidade e os aplicativos inclusos. O de entrada é o 400 Mega por R$ 89,90
            com desconto de pontualidade, e o mais procurado é o 600 Mega por R$ 99,90.
            Todos incluem MaisTV com mais de 160 canais e a instalação do Wi-Fi sem custo.
            Para empresa, os planos começam em R$ 229,90 com suporte técnico em até 12 horas.
          </p>
          <p className="mt-4 max-w-2xl text-[#CBD8CE]">
            A cobertura é confirmada rua a rua. Mande o endereço completo no WhatsApp e a
            gente responde na hora se já tem fibra disponível e qual o prazo de instalação.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Perguntas frequentes</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {bairroData.faq.map((item, idx) => (
              <details key={idx} className="group py-1">
                <summary className="flex cursor-pointer items-center justify-between gap-5 py-4 text-base font-bold">
                  {item.q}
                  <ChevronRight
                    size={18}
                    className="shrink-0 text-[#3DD93D] transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="pb-4 text-[#93A69B]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Onde resolver presencialmente</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {LOJAS.map((loja) => (
              <Link
                key={loja.slug}
                href={`/lojas/${loja.slug}`}
                className="block rounded-lg border border-white/10 bg-[#060E1E] p-5 transition hover:border-[#3DD93D]/50"
              >
                <h3 className="font-bold">{loja.curto}</h3>
                <p className="mt-1 text-sm text-[#93A69B]">{loja.logradouro}</p>
                <p className="mt-2 text-xs text-[#93A69B]">{HORARIO}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 text-2xl font-black md:text-3xl">Outros bairros atendidos</h2>
          <div className="flex flex-wrap gap-2">
            {outros.map(([nome, dados]) => (
              <Link
                key={dados.slug}
                href={`/bairro/${dados.slug}`}
                className="rounded border border-white/12 px-4 py-2 text-sm text-[#CBD8CE] transition hover:border-[#3DD93D] hover:text-[#3DD93D]"
              >
                {nome}
              </Link>
            ))}
            <Link
              href="/bairros"
              className="rounded border border-[#3DD93D]/40 px-4 py-2 text-sm font-bold text-[#3DD93D] transition hover:bg-[#3DD93D]/10"
            >
              Ver os 39 bairros
            </Link>
          </div>
        </section>

        <div className="rounded-lg border border-[#3DD93D]/25 bg-[#3DD93D]/5 p-10 text-center">
          <h2 className="mb-4 text-2xl font-black md:text-3xl">
            Pronto para ter fibra {artigo} {bairroName}?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[#CBD8CE]">
            Planos residenciais a partir de R$ 89,90 por mês, com Wi-Fi instalado sem custo
          </p>
          <a
            href={zap(`a cobertura ${artigo} ${bairroName}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#3DD93D] px-8 py-4 text-lg font-bold text-[#04170A] transition hover:bg-[#2ba82a]"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
