import { Injectable } from '@nestjs/common';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import type { PricingStrategy } from './pricing-strategy.interface';

@Injectable()
export class PrecioBaseStrategy implements PricingStrategy {
  calcular(contexto: PricingInput): PrecioResultado {
    return {
      subtotal: contexto.subtotal,
      descuento: 0,
      recargo: 0,
      total: contexto.subtotal,
      reglaAplicada: 'Precio base',
    };
  }
}

