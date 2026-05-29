import { Injectable } from '@nestjs/common';
import { TipoReglaPrecio } from '../dto/cotizar-habitacion.dto';
import type { PrecioResultado, PricingInput } from '../modelos/cotizacion.model';
import { CuponDescuentoStrategy } from './cupon-descuento.strategy';
import { DescuentoMaestroStrategy } from './descuento-maestro.strategy';
import { PrecioBaseStrategy } from './precio-base.strategy';
import type { PricingStrategy } from './pricing-strategy.interface';
import { TarifaCorporativaStrategy } from './tarifa-corporativa.strategy';
import { TemporadaAltaStrategy } from './temporada-alta.strategy';

@Injectable()
export class PricingContext {
  private strategy: PricingStrategy;

  constructor(
    private readonly precioBaseStrategy: PrecioBaseStrategy,
    private readonly temporadaAltaStrategy: TemporadaAltaStrategy,
    private readonly cuponDescuentoStrategy: CuponDescuentoStrategy,
    private readonly tarifaCorporativaStrategy: TarifaCorporativaStrategy,
    private readonly descuentoMaestroStrategy: DescuentoMaestroStrategy,
  ) {
    this.strategy = this.precioBaseStrategy;
  }

  setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
  }

  seleccionar(reglaPrecio?: TipoReglaPrecio): void {
    switch (reglaPrecio) {
      case TipoReglaPrecio.TEMPORADA_ALTA:
        this.setStrategy(this.temporadaAltaStrategy);
        break;
      case TipoReglaPrecio.CUPON:
        this.setStrategy(this.cuponDescuentoStrategy);
        break;
      case TipoReglaPrecio.CORPORATIVA:
        this.setStrategy(this.tarifaCorporativaStrategy);
        break;
      case TipoReglaPrecio.MAESTRO:
        this.setStrategy(this.descuentoMaestroStrategy);
        break;
      case TipoReglaPrecio.BASE:
      default:
        this.setStrategy(this.precioBaseStrategy);
        break;
    }
  }

  calcular(contexto: PricingInput): PrecioResultado {
    this.seleccionar(contexto.reglaPrecio);
    return this.strategy.calcular(contexto);
  }
}
