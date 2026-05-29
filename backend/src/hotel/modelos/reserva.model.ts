import { TipoExtra, TipoHabitacion } from '../dto/cotizar-habitacion.dto';
import type { PagoResultado } from '../ptrn_adapter_pago/payment-provider.interface';

export enum EstadoReserva {
  PENDIENTE_PAGO = 'pendiente_pago',
  RESERVADA_PENDIENTE_CONFIRMACION = 'reservada_pendiente_confirmacion',
  RESERVA_CONFIRMADA = 'reserva_confirmada',
  PAGO_RECHAZADO = 'pago_rechazado',
  PAGO_PENDIENTE = 'pago_pendiente',
}

export interface Cliente {
  nombre: string;
  email: string;
}

export interface HabitacionSnapshot {
  id: TipoHabitacion;
  nombre: string;
  descripcion: string;
  costo: number;
}

export interface ExtraSnapshot {
  id: TipoExtra;
  nombre: string;
  descripcion: string;
  costo: number;
  icono: string;
}

export interface CotizacionSnapshot {
  descripcion: string;
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  reglaAplicada: string;
}

export interface Reserva {
  numero: string;
  fechaCreacion: string;
  cliente: Cliente;
  habitacion: HabitacionSnapshot;
  extras: ExtraSnapshot[];
  cotizacion: CotizacionSnapshot;
  total: number;
  estado: EstadoReserva;
  pagos: PagoResultado[];
}
