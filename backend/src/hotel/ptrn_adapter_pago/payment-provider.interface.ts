export enum MetodoPago {
  DEMO = 'demo',
  TARJETA = 'tarjeta',
  PAYPAL = 'paypal',
  TRANSFERENCIA = 'transferencia',
}

export interface PagoSolicitud {
  reservaNumero: string;
  monto: number;
  metodo: MetodoPago;
  aprobar?: boolean;
  referencia?: string;
}

export interface PagoResultado {
  ok: boolean;
  idPago: string;
  estado: string;
  mensaje: string;
  proveedor: string;
  monto: number;
  fecha: string;
}

export interface PaymentProvider {
  pagar(solicitud: PagoSolicitud): Promise<PagoResultado>;
}

