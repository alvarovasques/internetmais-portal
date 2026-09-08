import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useHashNavigation } from "./hooks/useHashNavigation";

/**
 * Só a home entra no pacote inicial. As outras páginas viram pedaços separados,
 * baixados quando alguém realmente navega até elas.
 *
 * O motivo é concreto: /bairros carrega o mapbox-gl, que sozinho pesa mais que
 * todo o resto do site. Sem essa divisão, quem abre a home baixa o mapa, a tela
 * de admin e a página de vagas antes de ver o primeiro preço. Numa cidade onde
 * boa parte do tráfego é Android intermediário em 4G, isso custa venda, e não
 * adianta o site ter movimento bonito se ele demora a aparecer.
 */
const SobreNos = lazy(() => import("./pages/SobreNos"));
const BairroPage = lazy(() => import("./pages/BairroPage"));
const BairrosPage = lazy(() => import("./pages/BairrosPage"));
const Vagas = lazy(() => import("./pages/Vagas"));
const MaisTV = lazy(() => import("./pages/MaisTV"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const MaisGloboPlay = lazy(() => import("./pages/MaisGloboPlay"));

/** O que aparece enquanto o pedaço da página está sendo baixado. */
function Carregando() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-[#070E22]"
    >
      <span className="sr-only">Carregando</span>
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#3DD93D]" />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  useHashNavigation();

  useEffect(() => {
    // Definir títulos dinâmicos por página
    // As páginas que dependem de dado carregado (bairro, MaisTV, GloboPlay) e
    // a de 404 definem o próprio título; aqui ficam as de conteúdo fixo, que
    // sem isto caíam no genérico "Internet Mais".
    const titles: Record<string, string> = {
      '/': 'Internet Mais - Fibra Óptica, 5G e Internet Empresarial',
      '/sobre-nos': 'Sobre Nós - Internet Mais | Missão, Visão e Valores',
      '/vagas': 'Trabalhe Conosco - Internet Mais | Vagas em Campo Grande',
      '/admin/entrar': 'Acesso restrito - Internet Mais',
    };
    // Só sobrescreve quando a rota está mapeada aqui. O efeito do App roda
    // depois do da página filha, então um fallback genérico apagaria o título
    // que a própria página acabou de definir, e era isso que fazia /blog e
    // qualquer URL errada aparecerem como "Internet Mais".
    const titulo = titles[location];
    if (titulo) document.title = titulo;
  }, [location]);

  return (
    <Suspense fallback={<Carregando />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre-nos" component={SobreNos} />
        <Route path="/bairros" component={BairrosPage} />
        <Route path="/bairro/:slug" component={BairroPage} />
        <Route path="/vagas" component={Vagas} />
        <Route path="/maistv" component={MaisTV} />
        <Route path="/admin/entrar" component={AdminLogin} />
        <Route path="/maisgloboplay" component={MaisGloboPlay} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
