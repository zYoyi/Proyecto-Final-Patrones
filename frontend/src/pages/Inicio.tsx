import Hero from '../components/Hero';
import HabitacionesDestacadas from '../components/HabitacionesDestacadas';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <>
      <Hero />

      {/* Franja de filosofía */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-6">Nuestra filosofía</p>
          <blockquote className="font-serif text-3xl md:text-4xl font-light text-stone-800 leading-relaxed">
            "El lujo no es tener más cosas. Es tener más tiempo para lo que verdaderamente importa."
          </blockquote>
          <div className="mt-8 w-16 h-px bg-stone-300 mx-auto" />
        </div>
      </section>

      {/* Habitaciones destacadas */}
      <HabitacionesDestacadas />

      {/* Sección de experiencia */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagen */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
                alt="Spa y bienestar"
                className="w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-stone-900 text-white p-8 hidden lg:block">
                <p className="font-serif text-3xl font-light">15+</p>
                <p className="text-xs tracking-widest uppercase text-stone-400 mt-1">
                  Años de excelencia
                </p>
              </div>
            </div>

            {/* Texto */}
            <div className="lg:pl-8">
              <p className="section-label mb-4">La experiencia Aurum</p>
              <h2 className="font-serif text-4xl font-light text-stone-900 mb-6 leading-snug">
                Más allá de la hospitalidad,<br />una experiencia única
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6">
                Desde el momento en que llegas, cada detalle del Aurum Grand Hotel está
                diseñado para envolverte en una experiencia sensorial única. Nuestros espacios
                combinan arquitectura contemporánea con materiales naturales seleccionados.
              </p>
              <p className="text-stone-500 leading-relaxed mb-10">
                Personaliza tu estadía con nuestros servicios premium: desayuno gourmet,
                conexión de alta velocidad, habitaciones con vista al mar y jacuzzi privado.
              </p>
              <Link to="/habitaciones" className="btn-primary">
                Explorar habitaciones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="relative py-28 px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto">
          <p className="section-label text-stone-400 mb-4">Reserva ahora</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Tu estancia perfecta te espera
          </h2>
          <p className="text-stone-300 mb-10">
            Personaliza cada detalle de tu habitación y recibe una cotización instantánea.
          </p>
          <Link to="/personalizar" className="btn-primary bg-white text-stone-900 hover:bg-stone-100">
            Diseñar mi estancia
          </Link>
        </div>
      </section>
    </>
  );
}
