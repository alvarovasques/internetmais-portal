import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Bloco5G from '@/components/Bloco5G';
import Diferenciais from '@/components/Diferenciais';
import MissaoVisaoValores from '@/components/MissaoVisaoValores';
import PlanosResidenciais from '@/components/PlanosResidenciais';
import Planos5G from '@/components/Planos5G';
import TelefoniaFixa from '@/components/TelefoniaFixa';
import Aplicativos from '@/components/Aplicativos';
import Empresarial from '@/components/Empresarial';
import Adicionais from '@/components/Adicionais';
import Lojas from '@/components/Lojas';
import ProvaSocial from '@/components/ProvaSocial';
import BannerCTAFinal from '@/components/BannerCTAFinal';
import Footer from '@/components/Footer';
import Cobertura from '@/components/Cobertura';
import AreaAssinante from '@/components/AreaAssinante';

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
        <Bloco5G />
        <Diferenciais />
        <MissaoVisaoValores />
        <PlanosResidenciais />
        <Planos5G />
        <TelefoniaFixa />
        <Aplicativos />
        <Empresarial />
        <Adicionais />
        <Cobertura />
        <AreaAssinante />
        <Lojas />
        <ProvaSocial />
        <BannerCTAFinal />
      </main>
      <Footer />
    </div>
  );
}
