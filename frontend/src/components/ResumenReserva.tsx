import type { CotizarResponse, Extra, Habitacion } from '../types/hotel';

interface Props {
  habitacion: Habitacion | null;
  extras: Extra[];
  cotizacion: CotizarResponse | null;
  loading?: boolean;
}

export default function ResumenReserva({ habitacion, extras, cotizacion, loading }: Props) {
  if (!habitacion) {
    return (
      <div className="p-6 border border-stone-200 bg-stone-50 text-center">
        <p className="text-stone-400 text-sm">Selecciona una habitación para ver el resumen.</p>
      </div>
    );
  }

  return (
    <div className="border border-stone-200 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-100">
        <p className="section-label">Resumen de cotización</p>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        {/* Habitación base */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Habitación base</p>
            <p className="text-stone-900 font-medium">{habitacion.nombre}</p>
          </div>
          <span className="font-serif text-stone-900">${habitacion.costo.toLocaleString()}</span>
        </div>

        {/* Extras seleccionados */}
        {extras.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Servicios adicionales</p>
            {extras.map((extra) => (
              <div key={extra.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{extra.icono}</span>
                  <span className="text-stone-700 text-sm">{extra.nombre}</span>
                </div>
                <span className="text-stone-600 text-sm">+${extra.costo.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        {/* Descripción */}
        {cotizacion && (
          <div className="pt-4 border-t border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">
              Descripción
            </p>
            <p className="text-stone-600 text-sm italic leading-relaxed">
              "{cotizacion.descripcion}"
            </p>
          </div>
        )}

        {/* Total */}
        {cotizacion && (
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <p className="text-xs text-stone-400 uppercase tracking-wider">
              Detalle del precio
            </p>
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span>${cotizacion.subtotal.toLocaleString()}</span>
            </div>
            {cotizacion.recargo > 0 && (
              <div className="flex justify-between text-sm text-stone-500">
                <span>Recargo</span>
                <span>+${cotizacion.recargo.toLocaleString()}</span>
              </div>
            )}
            {cotizacion.descuento > 0 && (
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Descuento</span>
                <span>-${cotizacion.descuento.toLocaleString()}</span>
              </div>
            )}
            <p className="text-[11px] text-stone-400 leading-relaxed">
              {cotizacion.reglaAplicada}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
          <span className="font-medium text-stone-900">Total / noche</span>
          {loading ? (
            <span className="text-stone-400 text-sm animate-pulse">Calculando...</span>
          ) : (
            <span className="font-serif text-2xl text-stone-900">
              ${(cotizacion?.total ?? cotizacion?.costo ?? habitacion.costo).toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-[11px] text-stone-400 leading-relaxed">
          * Precio por noche, impuestos no incluidos. Sujeto a disponibilidad.
        </p>
      </div>
    </div>
  );
}
