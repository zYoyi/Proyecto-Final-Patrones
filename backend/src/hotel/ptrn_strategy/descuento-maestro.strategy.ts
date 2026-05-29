import { Injectable } from '@nestjs/common';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import type { PricingStrategy } from './pricing-strategy.interface';

@Injectable()
export class DescuentoMaestroStrategy implements PricingStrategy {
  private readonly porcentajeDescuento = 0.15;
  private readonly mesMayo = 4;

  calcular(contexto: PricingInput): PrecioResultado {
    const aplicaDescuento = this.esMayo(new Date());
    const descuento = aplicaDescuento
      ? Math.round(contexto.subtotal * this.porcentajeDescuento)
      : 0;

    return {
      subtotal: contexto.subtotal,
      descuento,
      recargo: 0,
      total: Math.max(0, contexto.subtotal - descuento),
      reglaAplicada: aplicaDescuento
        ? 'Descuento para maestros en mayo (-15%)'
        : 'Descuento para maestros disponible solo en mayo',
    };
  }

  private esMayo(fecha: Date): boolean {
    return fecha.getMonth() === this.mesMayo;
  }
}
