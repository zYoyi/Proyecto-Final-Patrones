import { TipoExtra, TipoHabitacion, TipoReglaPrecio } from '../dto/cotizar-habitacion.dto';

export interface DecoratorSubtotal {
  descripcion: string;
  subtotal: number;
}

export interface PrecioResultado {
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  reglaAplicada: string;
}

export interface PricingInput {
  subtotal: number;
  reglaPrecio?: TipoReglaPrecio;
  cupon?: string;
  codigoCorporativo?: string;
}

export interface Cotizacion {
  tipo: TipoHabitacion;
  extras: TipoExtra[];
  descripcion: string;
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  costo: number;
  reglaAplicada: string;
  precio: PrecioResultado;
}

