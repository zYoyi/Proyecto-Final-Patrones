import { Injectable } from '@nestjs/common';
import {
  MetodoPago,
  PagoResultado,
  PagoSolicitud,
  PaymentProvider,
} from './payment-provider.interface';

@Injectable()
export class StripePaymentAdapter implements PaymentProvider {
  async pagar(solicitud: PagoSolicitud): Promise<PagoResultado> {
    return {
      ok: true,
      idPago: `card_${Date.now()}`,
      estado: 'aprobado',
      mensaje: 'Pago con tarjeta aprobado correctamente.',
      proveedor: MetodoPago.TARJETA,
      monto: solicitud.monto,
      fecha: new Date().toISOString(),
    };
  }

  async reembolsar(idPago: string): Promise<PagoResultado> {
    return {
      ok: true,
      idPago,
      estado: 'reembolsado',
      mensaje: 'Reembolso de tarjeta procesado correctamente.',
      proveedor: MetodoPago.TARJETA,
      monto: 0,
      fecha: new Date().toISOString(),
    };
  }
}
