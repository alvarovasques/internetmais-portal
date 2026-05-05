import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import BairroPage from "./pages/BairroPage";
import { useHashNavigation } from "./hooks/useHashNavigation";


function Router() {
  const [location] = useLocation();
  useHashNavigation();

  useEffect(() => {
    // Definir títulos dinâmicos por página
    const titles: Record<string, string> = {
      '/': 'InternetMais - Fibra Óptica, 5G e Internet Empresarial',
      '/sobre-nos': 'Sobre Nós - InternetMais | Missão, Visão e Valores',
    };
    document.title = titles[location] || 'InternetMais';
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre-nos" component={SobreNos} />
      <Route path="/bairro/:slug" component={BairroPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
