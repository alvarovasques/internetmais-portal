import { useParams } from 'wouter';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

  useEffect(() => {
    // Find bairro by slug
    const found = Object.entries(bairrosData).find(
      ([_, data]) => (data as BairroData).slug === slug
    );

    if (found) {
      setBairroName(found[0]);
      setBairroData(found[1] as BairroData);
    }
  }, [slug]);

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

    // Add JSON-LD schemas
    const schemaLocalBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `InternetMais - ${bairroName}`,
      description: bairroData.description,
      url: `https://internetmais.net/bairro/${bairroData.slug}`,
      telephone: '+556730272500',
      address: {
        '@type': 'PostalAddress',
        addressLocality: bairroName,
        addressRegion: 'MS',
        postalCode: '79000-000',
        addressCountry: 'BR'
      },
      areaServed: {
        '@type': 'City',
        name: bairroName,
        containedInPlace: {
          '@type': 'City',
          name: 'Campo Grande',
          containedInPlace: {
            '@type': 'State',
            name: 'Mato Grosso do Sul'
          }
        }
      },
      priceRange: 'R$ 99,90 - R$ 499,90',
      image: 'https://internetmais.net/og-image.jpg'
    };

    const schemaBreadcrumb = {
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
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: bairroName,
          item: `https://internetmais.net/bairro/${bairroData.slug}`
        }
      ]
    };

    const removeScript = (id: string) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    };

    removeScript('schema-local-business');
    removeScript('schema-breadcrumb');

    const script1 = document.createElement('script');
    script1.id = 'schema-local-business';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(schemaLocalBusiness);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.id = 'schema-breadcrumb';
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(schemaBreadcrumb);
    document.head.appendChild(script2);
  }, [bairroName, bairroData]);

  if (!bairroData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Bairro não encontrado</h1>
          <p className="text-gray-600">O bairro que você procura não está em nossa cobertura.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" itemScope itemType="https://schema.org/LocalBusiness">
      <Header />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <ChevronRight size={16} />
            <span>{bairroName}</span>
          </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" itemProp="name">
            Internet Fibra {bairroName}
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            {bairroData.description}
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-[#3DD93D] hover:bg-[#2ba82a] text-black font-bold"
          >
            Contratar Agora
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <Zap className="text-[#3DD93D] mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">100% Fibra Óptica</h3>
            <p className="text-gray-600">Conexão pura e estável com velocidades até 1Gbps</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <MapPin className="text-[#3DD93D] mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Cobertura Local</h3>
            <p className="text-gray-600">Atendimento especializado no {bairroName}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3DD93D]">
            <Phone className="text-[#3DD93D] mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Suporte Técnico</h3>
            <p className="text-gray-600">Atendimento humanizado sempre disponível</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {bairroData.faq.map((item, idx) => (
              <details key={idx} className="bg-white p-6 rounded-lg shadow-md cursor-pointer">
                <summary className="font-bold text-lg flex items-center justify-between">
                  {item.q}
                  <ChevronRight size={20} />
                </summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#0D1B3E] to-[#1a2d5a] text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para ter a melhor internet no {bairroName}?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Planos a partir de R$ 99,90 com fibra óptica 100% pura
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-[#3DD93D] hover:bg-[#2ba82a] text-black font-bold text-lg px-8 py-6"
          >
            Contratar Agora
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
