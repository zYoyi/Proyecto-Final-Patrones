import { useState } from 'react';
import { hotelApi } from '../services/hotelApi';
import type { Reserva } from '../types/hotel';

export default function HistorialReservas() {
  const [email, setEmail] = useState('');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buscado, setBuscado] = useState(false);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBuscado(true);

    try {
      const resultado = await hotelApi.listarReservas(email.trim());
      setReservas(resultado);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo consultar el historial.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      <div className="bg-white border-b border-stone-100 py-12 px-6 text-center">
        <p className="section-label mb-3">Reservas</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-stone-900">
          Historial de reservaciones
        </h1>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-stone-200 p-8">
          <form onSubmit={handleBuscar} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="flex-1 border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 p-4 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {buscado && !loading && reservas.length === 0 && !error && (
            <div className="bg-white border border-stone-200 p-8 text-center">
              <p className="text-stone-500 text-sm">
                No hay reservaciones registradas para ese correo.
              </p>
            </div>
          )}

          {reservas.map((reserva) => (
            <article key={reserva.numero} className="bg-white border border-stone-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="section-label mb-2">{reserva.estado.replace(/_/g, ' ')}</p>
                  <h2 className="font-serif text-2xl text-stone-900">{reserva.numero}</h2>
                  <p className="text-stone-500 text-sm mt-1">
                    {reserva.habitacion.nombre} · {new Date(reserva.fechaCreacion).toLocaleString('es-MX')}
                  </p>
                </div>
                <p className="font-serif text-3xl text-stone-900">
                  ${reserva.total.toLocaleString()}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="border border-stone-100 p-4">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">
                    Cliente
                  </p>
                  <p className="text-stone-800">{reserva.cliente.nombre}</p>
                  <p className="text-stone-500 text-xs">{reserva.cliente.email}</p>
                </div>
                <div className="border border-stone-100 p-4">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">
                    Precio
                  </p>
                  <p className="text-stone-800">{reserva.cotizacion.reglaAplicada}</p>
                  <p className="text-stone-500 text-xs">
                    Subtotal ${reserva.cotizacion.subtotal.toLocaleString()}
                  </p>
                </div>
                <div className="border border-stone-100 p-4">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">
                    Pagos
                  </p>
                  <p className="text-stone-800">{reserva.pagos.length}</p>
                  <p className="text-stone-500 text-xs">
                    {reserva.pagos[reserva.pagos.length - 1]?.mensaje ?? 'Sin pagos registrados'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
