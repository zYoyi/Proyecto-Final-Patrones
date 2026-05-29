import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hotelApi } from '../services/hotelApi';
import SelectorExtras from '../components/SelectorExtras';
import ResumenReserva from '../components/ResumenReserva';
import type { CotizarResponse, Extra, Habitacion, OpcionesPrecio, ReglaPrecio } from '../types/hotel';

const reglasPrecio: { id: ReglaPrecio; titulo: string; descripcion: string }[] = [
  {
    id: 'base',
    titulo: 'Precio base',
    descripcion: 'Mantiene el total exacto de habitación + extras.',
  },
  {
    id: 'temporada_alta',
    titulo: 'Temporada alta',
    descripcion: 'Aplica un recargo del 20% al subtotal decorado.',
  },
  {
    id: 'cupon',
    titulo: 'Cupón',
    descripcion: 'Aplica cupones como AURUM10 o AURUM15.',
  },
  {
    id: 'corporativa',
    titulo: 'Corporativa',
    descripcion: 'Aplica descuento corporativo con código de empresa.',
  },
  {
    id: 'maestro',
    titulo: 'Maestros-Mayo',
    descripcion: 'Aplica 15% de descuento para maestros durante mayo.',
  },
];

const usaCupon = (regla: ReglaPrecio) => regla === 'cupon';
const usaCodigoCorporativo = (regla: ReglaPrecio) => regla === 'corporativa';

export default function PersonalizarHabitacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedId: string | undefined = (location.state as { habitacionId?: string })?.habitacionId;

  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedId, setSelectedId] = useState<string>(preselectedId ?? '');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [reglaPrecio, setReglaPrecio] = useState<ReglaPrecio>('base');
  const [cupon, setCupon] = useState('');
  const [codigoCorporativo, setCodigoCorporativo] = useState('');
  const [cotizacion, setCotizacion] = useState<CotizarResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCotizar, setLoadingCotizar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial de catálogos
  useEffect(() => {
    Promise.all([hotelApi.getHabitaciones(), hotelApi.getExtras()])
      .then(([habs, exts]) => {
        setHabitaciones(habs);
        setExtras(exts);
        if (!preselectedId && habs.length > 0) {
          setSelectedId(habs[0].id);
        }
      })
      .catch(() => setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'))
      .finally(() => setLoadingData(false));
  }, [preselectedId]);

  // Recalcula la cotización cada vez que cambia la selección.
  const cotizar = useCallback(async () => {
    if (!selectedId) return;
    setLoadingCotizar(true);
    setError(null);
    try {
      const result = await hotelApi.cotizar({
        tipo: selectedId,
        extras: selectedExtras,
        reglaPrecio,
        cupon: usaCupon(reglaPrecio) ? cupon : undefined,
        codigoCorporativo: usaCodigoCorporativo(reglaPrecio) ? codigoCorporativo : undefined,
      });
      setCotizacion(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular cotización');
    } finally {
      setLoadingCotizar(false);
    }
  }, [selectedId, selectedExtras, reglaPrecio, cupon, codigoCorporativo]);

  useEffect(() => {
    if (selectedId) cotizar();
  }, [selectedId, selectedExtras, cotizar]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const habitacionSeleccionada = habitaciones.find((h) => h.id === selectedId) ?? null;
  const extrasSeleccionados = extras.filter((e) => selectedExtras.includes(e.id));

  const handleVerResumen = () => {
    if (!cotizacion || !habitacionSeleccionada) return;
    const opcionesPrecio: OpcionesPrecio = {
      reglaPrecio,
      cupon: usaCupon(reglaPrecio) ? cupon : undefined,
      codigoCorporativo: usaCodigoCorporativo(reglaPrecio) ? codigoCorporativo : undefined,
    };
    navigate('/resumen', {
      state: { cotizacion, habitacion: habitacionSeleccionada, extrasSeleccionados, opcionesPrecio },
    });
  };

  if (loadingData) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16 bg-stone-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 py-12 px-6 text-center">
        <p className="section-label mb-3">Diseña tu estancia</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-stone-900">
          Personalizar habitación
        </h1>
      </div>

      {error && (
        <div className="max-w-3xl mx-auto mt-6 px-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Columna izquierda: selección */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selector de habitación base */}
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">
                1. Elige tu habitación base
              </h2>
              <p className="text-stone-400 text-sm mb-5">
                Selecciona el tipo de habitación como punto de partida.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {habitaciones.map((hab) => (
                  <button
                    key={hab.id}
                    onClick={() => setSelectedId(hab.id)}
                    className={`text-left border transition-all duration-200 overflow-hidden ${
                      selectedId === hab.id
                        ? 'border-stone-900 shadow-sm'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={hab.imagen}
                        alt={hab.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-stone-900 text-sm">{hab.nombre}</p>
                        {selectedId === hab.id && (
                          <span className="w-4 h-4 bg-stone-900 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-stone-900 text-lg">
                        ${hab.costo.toLocaleString()}
                        <span className="text-xs font-sans text-stone-400">/noche</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de extras */}
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">
                2. Agrega servicios extras
              </h2>
              <SelectorExtras
                extras={extras}
                seleccionados={selectedExtras}
                onChange={toggleExtra}
              />
            </div>

            {/* Selector de estrategia de precio */}
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-1">
                3. Selecciona regla de precio
              </h2>
              <p className="text-stone-400 text-sm mb-5">
                Ajusta tu cotización con temporada, cupón, tarifa corporativa o descuento para maestros.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reglasPrecio.map((regla) => {
                  const activo = reglaPrecio === regla.id;
                  return (
                    <button
                      key={regla.id}
                      onClick={() => setReglaPrecio(regla.id)}
                      className={`text-left border p-5 transition-all duration-200 ${
                        activo
                          ? 'border-stone-900 bg-white shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-stone-900 text-sm">{regla.titulo}</p>
                          <p className="text-stone-500 text-xs leading-relaxed mt-1">
                            {regla.descripcion}
                          </p>
                        </div>
                        <span
                          className={`w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 ${
                            activo ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {usaCupon(reglaPrecio) && (
                <div className="mt-4 bg-white border border-stone-200 p-5">
                  <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">
                    Código de cupón
                  </label>
                  <input
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                    placeholder="AURUM10"
                    className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                  />
                </div>
              )}

              {usaCodigoCorporativo(reglaPrecio) && (
                <div className="mt-4 bg-white border border-stone-200 p-5">
                  <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">
                    Código corporativo
                  </label>
                  <input
                    value={codigoCorporativo}
                    onChange={(e) => setCodigoCorporativo(e.target.value)}
                    placeholder="EMPRESA-2026"
                    className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha: resumen sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <ResumenReserva
                habitacion={habitacionSeleccionada}
                extras={extrasSeleccionados}
                cotizacion={cotizacion}
                loading={loadingCotizar}
              />

              <button
                onClick={handleVerResumen}
                disabled={!cotizacion || loadingCotizar}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ver resumen completo →
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
