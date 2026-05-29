import { Injectable } from '@nestjs/common';
import {
  MetodoPago,
  PagoResultado,
  PagoSolicitud,
  PaymentProvider,
} from './payment-provider.interface';

@Injectable()
export class PaypalPaymentAdapter implements PaymentProvider {
  async pagar(solicitud: PagoSolicitud): Promise<PagoResultado> {
    return {
      ok: true,
      idPago: `paypal_${Date.now()}`,
      estado: 'aprobado',
      mensaje: 'Pago con PayPal aprobado correctamente.',
      proveedor: MetodoPago.PAYPAL,
      monto: solicitud.monto,
      fecha: new Date().toISOString(),
    };
  }

  async reembolsar(idPago: string): Promise<PagoResultado> {
    return {
      ok: true,
      idPago,
      estado: 'reembolsado',
      mensaje: 'Reembolso de PayPal procesado correctamente.',
      proveedor: MetodoPago.PAYPAL,
      monto: 0,
      fecha: new Date().toISOString(),
    };
  }
}
