import { Injectable } from '@nestjs/common';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import type { PricingStrategy } from './pricing-strategy.interface';

@Injectable()
export class TemporadaAltaStrategy implements PricingStrategy {
  private readonly porcentajeRecargo = 0.2;

  calcular(contexto: PricingInput): PrecioResultado {
    const recargo = Math.round(contexto.subtotal * this.porcentajeRecargo);

    return {
      subtotal: contexto.subtotal,
      descuento: 0,
      recargo,
      total: contexto.subtotal + recargo,
      reglaAplicada: 'Temporada alta (+20%)',
    };
  }
}

