import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CopaDoMundo from '@/components/CopaDoMundo';
import MaisVelocidade from '@/components/MaisVelocidade';
import MaisAplicativos from '@/components/MaisAplicativos';
import MaisGloboPlay from '@/components/MaisGloboPlay';
import Diferenciais from '@/components/Diferenciais';

import Planos5G from '@/components/Planos5G';
import TelefoniaFixa from '@/components/TelefoniaFixa';
import Aplicativos from '@/components/Aplicativos';
import Empresarial from '@/components/Empresarial';
import AreaAssinante from '@/components/AreaAssinante';
import Lojas from '@/components/Lojas';
import ProvaSocial from '@/components/ProvaSocial';
import BannerCTAFinal from '@/components/BannerCTAFinal';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Palco, Faixa } from '@/components/cinema';

/**
 * Home — Portal Internet Mais
 *
 * A página inteira é uma cena só. O Palco é um fundo fixo que nunca reinicia
 * entre as seções, e cada seção pousa sobre ele de uma de duas formas:
 *
 * - `plena` para as seções escuras e de imagem, que sangram de ponta a ponta e
 *   deixam o Palco aparecer por trás;
 * - `clara` para as seções de leitura densa (planos, preço, FAQ, lojas), que
 *   viram painéis flutuantes e mantêm o próprio fundo claro. Contraste de
 *   número não se negocia por causa de efeito.
 *
 * O conteúdo das seções não mudou: a alternância acontece toda no wrapper.
 */
export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Palco />
      <Header sobrePalco />
      <main className="relative z-10">
        <HeroSection />

        <Faixa variante="plena">
          <CopaDoMundo />
        </Faixa>

        <Faixa variante="plena">
          <MaisVelocidade />
        </Faixa>

        <Faixa variante="plena">
          <MaisAplicativos />
        </Faixa>

        <Faixa variante="plena">
          <MaisGloboPlay />
        </Faixa>

        <Faixa variante="clara">
          <Empresarial />
        </Faixa>

        <Faixa variante="clara">
          <Diferenciais />
        </Faixa>

        <Faixa variante="clara">
          <Planos5G />
        </Faixa>

        <Faixa variante="clara">
          <TelefoniaFixa />
        </Faixa>

        <Faixa variante="plena">
          <Aplicativos />
        </Faixa>

        <Faixa variante="clara">
          <AreaAssinante />
        </Faixa>

        <Faixa variante="clara">
          <Lojas />
        </Faixa>

        <Faixa variante="clara">
          <ProvaSocial />
        </Faixa>

        <Faixa variante="clara">
          <FAQ />
        </Faixa>

        <Faixa variante="plena">
          <BannerCTAFinal />
        </Faixa>
      </main>
      <Footer />
    </div>
  );
}
