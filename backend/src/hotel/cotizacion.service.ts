import { Injectable } from '@nestjs/common';
import { CotizarHabitacionDto } from './dto/cotizar-habitacion.dto';
import { ExtraDecoratorFactory } from './ptrn_factory_method/extra-decorator.factory';
import { HabitacionFactory } from './ptrn_factory_method/habitacion.factory';
import type { Cotizacion, DecoratorSubtotal } from './modelos/cotizacion.model';
import { PricingContext } from './ptrn_strategy/pricing.context';

@Injectable()
export class CotizacionService {
  constructor(
    private readonly habitacionFactory: HabitacionFactory,
    private readonly extraDecoratorFactory: ExtraDecoratorFactory,
    private readonly pricingContext: PricingContext,
  ) {}

  cotizar(dto: CotizarHabitacionDto): Cotizacion {
    const subtotalDecorator = this.calcularSubtotalConDecorator(dto);
    const precio = this.pricingContext.calcular({
      subtotal: subtotalDecorator.subtotal,
      reglaPrecio: dto.reglaPrecio,
      cupon: dto.cupon,
      codigoCorporativo: dto.codigoCorporativo,
    });

    return {
      tipo: dto.tipo,
      extras: dto.extras ?? [],
      descripcion: subtotalDecorator.descripcion,
      subtotal: precio.subtotal,
      descuento: precio.descuento,
      recargo: precio.recargo,
      total: precio.total,
      costo: precio.total,
      reglaAplicada: precio.reglaAplicada,
      precio,
    };
  }

  private calcularSubtotalConDecorator(dto: CotizarHabitacionDto): DecoratorSubtotal {
    const habitacionBase = this.habitacionFactory.crear(dto.tipo);
    const habitacionDecorada = this.extraDecoratorFactory.aplicar(
      habitacionBase,
      dto.extras ?? [],
    );

    return {
      descripcion: habitacionDecorada.getDescripcion(),
      subtotal: habitacionDecorada.getCosto(),
    };
  }
}
