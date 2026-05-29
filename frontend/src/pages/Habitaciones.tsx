import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hotelApi } from '../services/hotelApi';
import type { Habitacion } from '../types/hotel';

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    hotelApi
      .getHabitaciones()
      .then(setHabitaciones)
      .finally(() => setLoading(false));
  }, []);

  const handlePersonalizar = (id: string) => {
    navigate('/personalizar', { state: { habitacionId: id } });
  };

  return (
    <div className="pt-16">
      {/* Header de sección */}
      <div
        className="relative py-28 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-stone-900/65" />
        <div className="relative z-10 text-center text-white">
          <p className="section-label text-stone-400 mb-4">Catálogo</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light">Habitaciones & Suites</h1>
        </div>
      </div>

      {/* Listado */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-12">
              {habitaciones.map((hab, i) => (
                <div
                  key={hab.id}
                  className={`card flex flex-col ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } overflow-hidden`}
                >
                  {/* Imagen */}
                  <div className="lg:w-1/2 h-72 lg:h-auto overflow-hidden">
                    <img
                      src={hab.imagen}
                      alt={hab.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="lg:w-1/2 p-10 flex flex-col justify-center">
                    <p className="section-label mb-3">Habitación</p>
                    <h2 className="font-serif text-3xl text-stone-900 mb-4">{hab.nombre}</h2>
                    <p className="text-stone-500 leading-relaxed mb-6">{hab.descripcion}</p>

                    {/* Amenidades */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {hab.amenidades.map((a) => (
                        <span
                          key={a}
                          className="px-3 py-1 text-xs tracking-wide border border-stone-200 text-stone-600 bg-stone-50"
                        >
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-stone-400 uppercase tracking-wider">Desde</p>
                        <p className="font-serif text-3xl text-stone-900">
                          ${hab.costo.toLocaleString()}
                          <span className="text-sm font-sans text-stone-400 ml-1">/noche</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handlePersonalizar(hab.id)}
                        className="btn-primary"
                      >
                        Personalizar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
