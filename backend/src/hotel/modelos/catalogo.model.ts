import { TipoExtra, TipoHabitacion } from '../dto/cotizar-habitacion.dto';

export interface HabitacionCatalogo {
  id: TipoHabitacion;
  nombre: string;
  descripcion: string;
  costo: number;
  imagen: string;
  amenidades: string[];
}

export interface ExtraCatalogo {
  id: TipoExtra;
  nombre: string;
  descripcion: string;
  costo: number;
  icono: string;
}

