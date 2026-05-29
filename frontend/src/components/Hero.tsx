import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80)',
        }}
      />
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="section-label text-white/60 mb-6">Bienvenido a</p>
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight">
          Aurum Grand Hotel
        </h1>
        <p className="text-stone-300 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Lujo atemporal frente al mar. Cada detalle diseñado para una experiencia
          que perdura en la memoria.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/habitaciones"
            className="px-10 py-3.5 bg-white text-stone-900 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:bg-stone-100"
          >
            Ver habitaciones
          </Link>
          <Link
            to="/personalizar"
            className="px-10 py-3.5 border border-white/60 text-white text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Cotizar ahora
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] tracking-widest uppercase">Descubrir</span>
        <div className="w-px h-10 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
