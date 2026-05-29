import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EstadoReserva } from '../modelos/reserva.model';
import type { ReservaRepository } from '../ptrn_repository/reserva.repository';
import { RESERVA_REPOSITORY } from '../ptrn_repository/repository.tokens';
import { PagarReservaDto } from '../reserva/dto/pagar-reserva.dto';
import { MockPaymentAdapter } from './mock-payment.adapter';
import { PaypalPaymentAdapter } from './paypal-payment.adapter';
import {
  MetodoPago,
  PagoResultado,
  PaymentProvider,
} from './payment-provider.interface';
import { StripePaymentAdapter } from './stripe-payment.adapter';
import { TransferPaymentAdapter } from './transfer-payment.adapter';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: ReservaRepository,
    private readonly mockPaymentAdapter: MockPaymentAdapter,
    private readonly stripePaymentAdapter: StripePaymentAdapter,
    private readonly paypalPaymentAdapter: PaypalPaymentAdapter,
    private readonly transferPaymentAdapter: TransferPaymentAdapter,
  ) {}

  async procesarPago(numeroReserva: string, dto: PagarReservaDto): Promise<PagoResultado> {
    const reserva = this.reservaRepository.findByNumero(numeroReserva);

    if (!reserva) {
      throw new NotFoundException(`No existe la reserva ${numeroReserva}`);
    }

    const adapter = this.seleccionarAdapter(dto.metodo);
    const resultado = await adapter.pagar({
      reservaNumero: reserva.numero,
      monto: reserva.total,
      metodo: dto.metodo,
      aprobar: dto.aprobar,
      referencia: dto.referencia,
    });

    reserva.pagos.push(resultado);
    reserva.estado = this.resolverEstadoReserva(resultado);
    this.reservaRepository.save(reserva);

    return resultado;
  }

  private seleccionarAdapter(metodo: MetodoPago): PaymentProvider {
    switch (metodo) {
      case MetodoPago.TARJETA:
        return this.stripePaymentAdapter;
      case MetodoPago.PAYPAL:
        return this.paypalPaymentAdapter;
      case MetodoPago.TRANSFERENCIA:
        return this.transferPaymentAdapter;
      case MetodoPago.DEMO:
      default:
        return this.mockPaymentAdapter;
    }
  }

  private resolverEstadoReserva(resultado: PagoResultado): EstadoReserva {
    if (resultado.estado === 'pendiente_confirmacion') {
      return EstadoReserva.PAGO_PENDIENTE;
    }

    return resultado.ok ? EstadoReserva.RESERVA_CONFIRMADA : EstadoReserva.PAGO_RECHAZADO;
  }
}
