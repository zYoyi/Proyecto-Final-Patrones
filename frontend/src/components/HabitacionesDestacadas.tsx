import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hotelApi } from '../services/hotelApi';
import type { Habitacion } from '../types/hotel';

export default function HabitacionesDestacadas() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    hotelApi.getHabitaciones().then(setHabitaciones).catch(console.error);
  }, []);

  const handlePersonalizar = (id: string) => {
    navigate('/personalizar', { state: { habitacionId: id } });
  };

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Nuestras estancias</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-900">
            Habitaciones & Suites
          </h2>
        </div>

        {/* Grid de habitaciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {habitaciones.map((hab) => (
            <div key={hab.id} className="card group">
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hab.imagen}
                  alt={hab.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="section-label mb-2">Desde</p>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif text-xl text-stone-900">{hab.nombre}</h3>
                  <span className="font-serif text-2xl text-stone-900">
                    ${hab.costo.toLocaleString()}
                  </span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {hab.descripcion}
                </p>
                <button
                  onClick={() => handlePersonalizar(hab.id)}
                  className="btn-outline w-full text-center"
                >
                  Personalizar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/habitaciones" className="btn-primary">
            Ver todas las habitaciones
          </Link>
        </div>
      </div>
    </section>
  );
}
