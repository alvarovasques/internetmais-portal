import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import bairrosData from '@/data/bairros.json';
import locationsData from '@/data/locations.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, MapPin, Search } from 'lucide-react';
import { MapView } from '@/components/Map';

interface BairroInfo {
  slug: string;
  keywords: string[];
  description: string;
  faq: Array<{ q: string; a: string }>;
}

export default function BairrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBairros, setFilteredBairros] = useState<[string, BairroInfo][]>([]);
  const [mapMode, setMapMode] = useState<'neighborhoods' | 'stores'>('neighborhoods');
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  useEffect(() => {
    // Update document title and meta tags
    document.title = 'Bairros Atendidos - InternetMais | Fibra Óptica em Campo Grande';
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', 'Conheça todos os 39 bairros atendidos pela InternetMais em Campo Grande. Fibra óptica 100% pura, chip 5G e suporte especializado.');
    updateMeta('keywords', 'internet campo grande, fibra óptica bairros, chip 5g campo grande, internet por bairro');

    // Add JSON-LD schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://internetmais.net'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Bairros',
          item: 'https://internetmais.net/bairros'
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    // Filter bairros based on search term
    const bairrosArray = Object.entries(bairrosData) as [string, BairroInfo][];
    
    if (searchTerm.trim() === '') {
      setFilteredBairros(bairrosArray);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredBairros(
        bairrosArray.filter(([name, data]) => 
          name.toLowerCase().includes(term) ||
          data.keywords.some(k => k.toLowerCase().includes(term)) ||
          data.description.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm]);

  const handleWhatsAppClick = () => {
    (window as any).dataLayer?.push({
      event: 'Click_Whatsapp',
      button_location: 'Página de Bairros'
    });
    window.location.href = 'https://wa.me/5567999999999?text=Olá! Gostaria de informações sobre internet em Campo Grande';
  };

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    addMarkers(map, mapMode);
  };

  const addMarkers = (map: google.maps.Map, mode: 'neighborhoods' | 'stores') => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (mode === 'neighborhoods') {
      // Add neighborhood markers
      locationsData.bairros.forEach(bairro => {
        if (window.google?.maps?.marker?.AdvancedMarkerElement) {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: bairro.lat, lng: bairro.lng },
            title: bairro.name,
            content: createMarkerContent(bairro.name, 'neighborhood'),
          });
          markersRef.current.push(marker);
        }
      });
    } else {
      // Add store markers
      locationsData.lojas.forEach(loja => {
        if (window.google?.maps?.marker?.AdvancedMarkerElement) {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: loja.lat, lng: loja.lng },
            title: loja.name,
            content: createMarkerContent(loja.name, 'store'),
          });
          markersRef.current.push(marker);
        }
      });
    }
  };

  const createMarkerContent = (name: string, type: 'neighborhood' | 'store') => {
    const div = document.createElement('div');
    div.className = `marker-content ${type}`;
    div.innerHTML = `
      <div style="
        background-color: ${type === 'store' ? '#3DD93D' : '#0D1B3E'};
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-weight: bold;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      ">
        ${type === 'store' ? '🏪' : '📍'} ${name}
      </div>
    `;
    return div;
  };

  const toggleMapMode = (mode: 'neighborhoods' | 'stores') => {
    setMapMode(mode);
    if (mapRef.current) {
      addMarkers(mapRef.current, mode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <ChevronRight size={16} />
            <span>Bairros</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bairros Atendidos
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Conheça todos os 39 bairros de Campo Grande onde a InternetMais oferece fibra óptica 100% pura, chip 5G e suporte especializado.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Buscar bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 bg-white text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Mapa Interativo</h2>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => toggleMapMode('neighborhoods')}
              className={`${
                mapMode === 'neighborhoods'
                  ? 'bg-[#3DD93D] text-black hover:bg-[#2ba82a]'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              📍 Bairros
            </Button>
            <Button
              onClick={() => toggleMapMode('stores')}
              className={`${
                mapMode === 'stores'
                  ? 'bg-[#3DD93D] text-black hover:bg-[#2ba82a]'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              🏪 Lojas
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <MapView
              initialCenter={{ lat: -20.4697, lng: -55.4944 }}
              initialZoom={13}
              onMapReady={handleMapReady}
              className="h-[500px]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <div className="text-4xl font-bold text-[#3DD93D] mb-2">39</div>
            <p className="text-gray-600">Bairros Atendidos</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <div className="text-4xl font-bold text-[#3DD93D] mb-2">100%</div>
            <p className="text-gray-600">Fibra Óptica Pura</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <div className="text-4xl font-bold text-[#3DD93D] mb-2">24/7</div>
            <p className="text-gray-600">Suporte Técnico</p>
          </div>
        </div>

        {/* Bairros Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {filteredBairros.length === 0 
              ? 'Nenhum bairro encontrado' 
              : `${filteredBairros.length} bairro${filteredBairros.length !== 1 ? 's' : ''} encontrado${filteredBairros.length !== 1 ? 's' : ''}`}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBairros.map(([bairroName, bairroInfo]) => (
              <Link key={bairroInfo.slug} href={`/bairro/${bairroInfo.slug}`}>
                <a className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-[#3DD93D] border-2 border-transparent transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#3DD93D] transition-colors">
                        {bairroName}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin size={14} />
                        Campo Grande, MS
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {bairroInfo.description}
                  </p>
                  
                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bairroInfo.keywords.slice(0, 2).map((keyword, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                    {bairroInfo.keywords.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{bairroInfo.keywords.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-[#3DD93D] font-semibold group-hover:gap-3 transition-all">
                    Ver Detalhes
                    <ChevronRight size={16} />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Seu bairro não está listado?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Entre em contato conosco e saiba mais sobre a cobertura em sua região
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-[#3DD93D] hover:bg-[#2ba82a] text-black font-bold text-lg px-8 py-6"
          >
            Solicitar Informações
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
              <summary className="font-bold text-lg flex items-center justify-between">
                Como verifico se meu bairro é atendido?
                <ChevronRight size={20} />
              </summary>
              <p className="mt-4 text-gray-600">
                Você pode verificar a disponibilidade do seu bairro consultando nossa lista completa acima ou entrando em contato conosco via WhatsApp. Também pode acessar a página específica do seu bairro para mais informações.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
              <summary className="font-bold text-lg flex items-center justify-between">
                Qual é a velocidade de internet em cada bairro?
                <ChevronRight size={20} />
              </summary>
              <p className="mt-4 text-gray-600">
                A InternetMais oferece planos com velocidades de até 1Gbps em todos os bairros atendidos. A velocidade específica pode variar conforme o plano contratado. Consulte a página do seu bairro para conhecer os planos disponíveis.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
              <summary className="font-bold text-lg flex items-center justify-between">
                Há taxa de instalação?
                <ChevronRight size={20} />
              </summary>
              <p className="mt-4 text-gray-600">
                A taxa de instalação varia conforme o bairro e a complexidade da obra. Entre em contato conosco para receber um orçamento personalizado para sua região.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
