import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { ExtraDecoratorFactory } from './ptrn_factory_method/extra-decorator.factory';
import { HabitacionFactory } from './ptrn_factory_method/habitacion.factory';
import { ReservaFactory } from './ptrn_factory_method/reserva.factory';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { MockPaymentAdapter } from './ptrn_adapter_pago/mock-payment.adapter';
import { PaypalPaymentAdapter } from './ptrn_adapter_pago/paypal-payment.adapter';
import { PaymentService } from './ptrn_adapter_pago/payment.service';
import { StripePaymentAdapter } from './ptrn_adapter_pago/stripe-payment.adapter';
import { TransferPaymentAdapter } from './ptrn_adapter_pago/transfer-payment.adapter';
import { CuponDescuentoStrategy } from './ptrn_strategy/cupon-descuento.strategy';
import { DescuentoMaestroStrategy } from './ptrn_strategy/descuento-maestro.strategy';
import { PrecioBaseStrategy } from './ptrn_strategy/precio-base.strategy';
import { PricingContext } from './ptrn_strategy/pricing.context';
import { TarifaCorporativaStrategy } from './ptrn_strategy/tarifa-corporativa.strategy';
import { TemporadaAltaStrategy } from './ptrn_strategy/temporada-alta.strategy';
import { InMemoryExtraRepository } from './ptrn_repository/extra.repository';
import { InMemoryHabitacionRepository } from './ptrn_repository/habitacion.repository';
import {
  EXTRA_REPOSITORY,
  HABITACION_REPOSITORY,
  RESERVA_REPOSITORY,
} from './ptrn_repository/repository.tokens';
import {
  DatabaseReservaRepository,
  InMemoryReservaRepository,
} from './ptrn_repository/reserva.repository';
import { ReservaController } from './reserva/reserva.controller';
import { ReservaService } from './reserva/reserva.service';

@Module({
  controllers: [HotelController, ReservaController],
  providers: [
    HotelService,
    CotizacionService,
    HabitacionFactory,
    ExtraDecoratorFactory,
    ReservaFactory,
    PrecioBaseStrategy,
    TemporadaAltaStrategy,
    CuponDescuentoStrategy,
    TarifaCorporativaStrategy,
    DescuentoMaestroStrategy,
    PricingContext,
    ReservaService,
    PaymentService,
    MockPaymentAdapter,
    StripePaymentAdapter,
    PaypalPaymentAdapter,
    TransferPaymentAdapter,
    DatabaseReservaRepository,
    {
      provide: HABITACION_REPOSITORY,
      useClass: InMemoryHabitacionRepository,
    },
    {
      provide: EXTRA_REPOSITORY,
      useClass: InMemoryExtraRepository,
    },
    {
      provide: RESERVA_REPOSITORY,
      useClass: InMemoryReservaRepository,
    },
  ],
})
export class HotelModule {}
