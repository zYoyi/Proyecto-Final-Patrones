import { Injectable } from '@nestjs/common';
import {
  MetodoPago,
  PagoResultado,
  PagoSolicitud,
  PaymentProvider,
} from './payment-provider.interface';

@Injectable()
export class TransferPaymentAdapter implements PaymentProvider {
  async pagar(solicitud: PagoSolicitud): Promise<PagoResultado> {
    return {
      ok: true,
      idPago: `transfer_${Date.now()}`,
      estado: 'pendiente_confirmacion',
      mensaje:
        'Transferencia registrada. La reserva queda pendiente hasta confirmar el pago.',
      proveedor: MetodoPago.TRANSFERENCIA,
      monto: solicitud.monto,
      fecha: new Date().toISOString(),
    };
  }

  async reembolsar(idPago: string): Promise<PagoResultado> {
    return {
      ok: false,
      idPago,
      estado: 'requiere_revision',
      mensaje: 'El reembolso por transferencia requiere revisión administrativa.',
      proveedor: MetodoPago.TRANSFERENCIA,
      monto: 0,
      fecha: new Date().toISOString(),
    };
  }
}

