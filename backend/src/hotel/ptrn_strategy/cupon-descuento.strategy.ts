import { Injectable } from '@nestjs/common';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import type { PricingStrategy } from './pricing-strategy.interface';

const CUPONES: Record<string, number> = {
  AURUM10: 0.1,
  AURUM15: 0.15,
};

@Injectable()
export class CuponDescuentoStrategy implements PricingStrategy {
  calcular(contexto: PricingInput): PrecioResultado {
    const codigo = contexto.cupon?.trim().toUpperCase() ?? '';
    const porcentajeDescuento = CUPONES[codigo] ?? 0;
    const descuento = Math.round(contexto.subtotal * porcentajeDescuento);

    return {
      subtotal: contexto.subtotal,
      descuento,
      recargo: 0,
      total: Math.max(0, contexto.subtotal - descuento),
      reglaAplicada:
        porcentajeDescuento > 0
          ? `Cupón ${codigo} (-${Math.round(porcentajeDescuento * 100)}%)`
          : 'Cupón no aplicado',
    };
  }
}

