import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MaisVelocidade from '@/components/MaisVelocidade';
import MaisAplicativos from '@/components/MaisAplicativos';
import MaisGloboPlay from '@/components/MaisGloboPlay';
import Diferenciais from '@/components/Diferenciais';

import PlanosResidenciais from '@/components/PlanosResidenciais';
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

/**
 * Home Page - InternetMais Portal
 * 
 * Design Philosophy: Modern Tech Minimalism
 * - Verde vibrante (#3DD93D) como cor primária
 * - Azul navy (#0D1B3E) para fundos escuros
 * - Tipografia Poppins bold e moderna
 * - Animações suaves ao scroll
 * - Responsivo mobile-first
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        <HeroSection />
        <MaisVelocidade />
        <MaisAplicativos />
        <MaisGloboPlay />
        <Empresarial />
        <Diferenciais />
        <Planos5G />
        <TelefoniaFixa />
        <Aplicativos />
        <AreaAssinante />
        <Lojas />
        <ProvaSocial />
        <FAQ />
        <BannerCTAFinal />
      </main>
      <Footer />
    </div>
  );
}
