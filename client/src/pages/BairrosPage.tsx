import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import bairrosData from '@/data/bairros.json';
import locationsData from '@/data/locations.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, MapPin, Search, MessageCircle } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BairroInfo {
  slug: string;
  keywords: string[];
  description: string;
  faq: Array<{ q: string; a: string }>;
}

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaW50ZXJuZXRtYWlzIiwiYSI6ImNtb3N3ZXVpODAzcWMycXB1eml4OHNsdGUifQ.LQjeJXcWF45juASHasbIog';

export default function BairrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBairros, setFilteredBairros] = useState<[string, BairroInfo][]>([]);
  const [mapMode] = useState<'neighborhoods' | 'stores'>('stores');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Update document title and meta tags
  useEffect(() => {
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

    updateMeta('description', 'Conheça todos os bairros atendidos pela InternetMais em Campo Grande. Fibra óptica 100% pura, chip 5G e suporte especializado.');
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

  // Filter bairros based on search term
  useEffect(() => {
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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-54.6, -20.45],
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Add markers when map mode changes
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (mapMode === 'neighborhoods') {
      // Apenas mostrar o mapa sem pins de bairros
      markersRef.current = [];
    } else {
      locationsData.lojas.forEach(loja => {
        const el = document.createElement('div');
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.backgroundColor = '#3DD93D';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '20px';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        el.textContent = '🏪';
        el.title = loja.name;

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(loja.name);
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([loja.lng, loja.lat])
          .setPopup(popup)
          .addTo(map.current!);
        
        el.addEventListener('mouseenter', () => {
          marker.togglePopup();
        });
        el.addEventListener('mouseleave', () => {
          marker.togglePopup();
        });
        
        markersRef.current.push(marker);
      });
    }
  }, [mapMode]);

  const handleWhatsAppClick = useCallback(() => {
    (window as any).dataLayer?.push({
      event: 'Click_Whatsapp',
      button_location: 'Página de Bairros'
    });
    window.location.href = 'https://wa.me/556730272500?text=Olá! Gostaria de informações sobre internet em Campo Grande';
  }, []);

  const toggleMapMode = useCallback(() => {
    // Map mode is always 'stores'
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-4 text-sm">
              <a href="/" className="hover:underline">Home</a>
              <ChevronRight size={16} />
              <span>Bairros</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Internet Fibra nos Bairros
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Conheça todos os bairros de Campo Grande onde a InternetMais oferece fibra óptica 100% pura, chip 5G e suporte especializado.
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
              <p className="text-gray-600 font-semibold">🏪 Nossas Lojas em Campo Grande</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg h-[500px]">
              <div ref={mapContainer} className="w-full h-full" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
              <div className="text-4xl font-bold text-[#3DD93D] mb-2">+39</div>
              <p className="text-gray-600">Bairros Atendidos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
              <div className="text-4xl font-bold text-[#3DD93D] mb-2">100%</div>
              <p className="text-gray-600">Fibra Óptica Pura</p>
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
                <Link key={bairroInfo.slug} href={`/bairro/${bairroInfo.slug}`} className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-[#3DD93D] border-2 border-transparent transition-all duration-300 block">
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
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              Não encontrou seu bairro?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Fale com nosso time e descubra se sua região tem cobertura da InternetMais
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-8 rounded-full hover:bg-[#20ba5a] hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} />
              Falar com um Especialista
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
