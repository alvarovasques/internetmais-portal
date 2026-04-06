export default function BannerCTAFinal() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-green-navy"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Fibra Óptica + Chip 5G.
            <br />
            <span className="text-[#F5C518]">Instale hoje, sem burocracia.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-12">
            Atendimento pelo WhatsApp, rápido e sem enrolação.
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/556730272500?text=Olá!%20Quero%20contratar%20a%20InternetMais"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3DD93D] font-black py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            📲 Contratar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
