export interface Habitacion {
  id: string;
  nombre: string;
  descripcion: string;
  costo: number;
  imagen: string;
  amenidades: string[];
}

export interface Extra {
  id: string;
  nombre: string;
  descripcion: string;
  costo: number;
  icono: string;
}

export interface CotizarRequest {
  tipo: string;
  extras: string[];
  reglaPrecio?: ReglaPrecio;
  cupon?: string;
  codigoCorporativo?: string;
}

export interface CotizarResponse {
  tipo: string;
  extras: string[];
  descripcion: string;
  costo: number;
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  reglaAplicada: string;
  precio: PrecioResultado;
}

export type ReglaPrecio = 'base' | 'temporada_alta' | 'cupon' | 'corporativa' | 'maestro';

export interface PrecioResultado {
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  reglaAplicada: string;
}

export interface OpcionesPrecio {
  reglaPrecio: ReglaPrecio;
  cupon?: string;
  codigoCorporativo?: string;
}

export interface EstadoReserva {
  habitacion: Habitacion | null;
  extrasSeleccionados: Extra[];
  cotizacion: CotizarResponse | null;
}

// ── Envío de recibo ─────────────────────────────────────────────────────────

export interface EnviarReciboRequest {
  /** Dirección de correo destino */
  email: string;
  /** HTML completo generado por el ReciboRenderer (PDFReciboRenderer) */
  htmlBody: string;
  /** Número de reserva para el asunto del correo */
  numeroReserva: string;
  /** Costo total para el asunto del correo */
  costoTotal: number;
}

export interface EnviarReciboResponse {
  ok: boolean;
  mensaje: string;
  /** URL de vista previa Ethereal */
  previewUrl?: string;
}

// ── Reservas reales ─────────────────────────────────────────────────────────

export interface CrearReservaRequest extends CotizarRequest {
  nombre: string;
  email: string;
}

export type EstadoReservaBackend =
  | 'pendiente_pago'
  | 'reservada_pendiente_confirmacion'
  | 'reserva_confirmada'
  | 'pago_rechazado'
  | 'pago_pendiente';

export interface Cliente {
  nombre: string;
  email: string;
}

export interface HabitacionSnapshot {
  id: string;
  nombre: string;
  descripcion: string;
  costo: number;
}

export interface ExtraSnapshot {
  id: string;
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
  estado: EstadoReservaBackend;
  pagos: PagoResultado[];
}

// ── Pagos ───────────────────────────────────────────────────────────────────

export type MetodoPago = 'demo' | 'tarjeta' | 'paypal' | 'transferencia';

export interface PagarReservaRequest {
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
