import { Injectable } from '@nestjs/common';
import {
  MetodoPago,
  PagoResultado,
  PagoSolicitud,
  PaymentProvider,
} from './payment-provider.interface';

@Injectable()
export class MockPaymentAdapter implements PaymentProvider {
  async pagar(solicitud: PagoSolicitud): Promise<PagoResultado> {
    return {
      ok: true,
      idPago: `recepcion_${Date.now()}`,
      estado: 'pendiente_confirmacion',
      mensaje: 'Pago en recepción seleccionado. Liquida el total al llegar al hotel.',
      proveedor: MetodoPago.DEMO,
      monto: solicitud.monto,
      fecha: new Date().toISOString(),
    };
  }

  async reembolsar(idPago: string): Promise<PagoResultado> {
    return {
      ok: true,
      idPago,
      estado: 'reembolsado',
      mensaje: 'Reembolso procesado correctamente.',
      proveedor: MetodoPago.DEMO,
      monto: 0,
      fecha: new Date().toISOString(),
    };
  }
}
