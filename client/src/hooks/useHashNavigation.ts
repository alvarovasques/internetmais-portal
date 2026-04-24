import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useHashNavigation() {
  const [location] = useLocation();

  useEffect(() => {
    // Extrair hash da URL
    const hash = window.location.hash.slice(1);
    
    if (hash) {
      // Pequeno delay para garantir que o DOM foi renderizado
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Se não há hash, scroll para o topo
      window.scrollTo(0, 0);
    }
  }, [location]);
}
