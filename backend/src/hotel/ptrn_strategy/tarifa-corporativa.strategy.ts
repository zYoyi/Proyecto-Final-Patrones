import { Injectable } from '@nestjs/common';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import type { PricingStrategy } from './pricing-strategy.interface';

@Injectable()
export class TarifaCorporativaStrategy implements PricingStrategy {
  private readonly porcentajeDescuento = 0.15;

  calcular(contexto: PricingInput): PrecioResultado {
    const tieneCodigo = Boolean(contexto.codigoCorporativo?.trim());
    const descuento = tieneCodigo
      ? Math.round(contexto.subtotal * this.porcentajeDescuento)
      : 0;

    return {
      subtotal: contexto.subtotal,
      descuento,
      recargo: 0,
      total: Math.max(0, contexto.subtotal - descuento),
      reglaAplicada: tieneCodigo
        ? 'Tarifa corporativa (-15%)'
        : 'Tarifa corporativa no aplicada',
    };
  }
}

