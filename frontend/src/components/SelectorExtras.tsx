import type { Extra } from '../types/hotel';

interface Props {
  extras: Extra[];
  seleccionados: string[];
  onChange: (id: string) => void;
}

export default function SelectorExtras({ extras, seleccionados, onChange }: Props) {
  return (
    <div className="space-y-3">
      {extras.map((extra) => {
        const activo = seleccionados.includes(extra.id);
        return (
          <label
            key={extra.id}
            className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-200 ${
              activo
                ? 'border-stone-900 bg-stone-50'
                : 'border-stone-200 bg-white hover:border-stone-400'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox custom */}
              <span
                className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-all duration-200 ${
                  activo ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
                }`}
              >
                {activo && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={activo}
                onChange={() => onChange(extra.id)}
                className="sr-only"
              />
              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{extra.icono}</span>
                  <span className="font-medium text-stone-900 text-sm">{extra.nombre}</span>
                </div>
                <p className="text-stone-500 text-xs mt-0.5">{extra.descripcion}</p>
              </div>
            </div>

            {/* Precio */}
            <span className="font-serif text-stone-900 text-lg flex-shrink-0 ml-4">
              +${extra.costo.toLocaleString()}
            </span>
          </label>
        );
      })}
    </div>
  );
}
