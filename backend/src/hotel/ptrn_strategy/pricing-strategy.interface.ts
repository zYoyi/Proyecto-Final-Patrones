import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';

export interface PricingStrategy {
  calcular(contexto: PricingInput): PrecioResultado;
}

