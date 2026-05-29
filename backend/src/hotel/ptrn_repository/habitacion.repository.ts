import { Injectable } from '@nestjs/common';
import { TipoHabitacion } from '../dto/cotizar-habitacion.dto';
import type { HabitacionCatalogo } from '../modelos/catalogo.model';

export interface HabitacionRepository {
  findAll(): HabitacionCatalogo[];
  findById(id: TipoHabitacion): HabitacionCatalogo | undefined;
}

@Injectable()
export class InMemoryHabitacionRepository implements HabitacionRepository {
  private readonly habitaciones: HabitacionCatalogo[] = [
    {
      id: TipoHabitacion.ESTANDAR,
      nombre: 'Habitación Estándar',
      descripcion:
        'Confort y funcionalidad para una estancia perfecta. Cama king, baño privado y todas las comodidades esenciales.',
      costo: 1200,
      imagen: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      amenidades: ['Cama King', 'Baño privado', 'Aire acondicionado', 'TV 43"'],
    },
    {
      id: TipoHabitacion.DELUXE,
      nombre: 'Habitación Deluxe',
      descripcion:
        'Espacio ampliado con sala de estar y detalles de lujo. Ideal para estancias más largas o viajes en pareja.',
      costo: 1800,
      imagen: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
      amenidades: ['Cama King Deluxe', 'Sala de estar', 'Bañera y ducha', 'TV 55"'],
    },
    {
      id: TipoHabitacion.SUITE,
      nombre: 'Suite',
      descripcion:
        'La máxima expresión del lujo. Suite completa con comedor privado, terraza y servicio personalizado.',
      costo: 2800,
      imagen: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      amenidades: [
        'Cama California King',
        'Comedor privado',
        'Terraza exclusiva',
        'TV 65" + sistema de sonido',
      ],
    },
  ];

  findAll(): HabitacionCatalogo[] {
    return [...this.habitaciones];
  }

  findById(id: TipoHabitacion): HabitacionCatalogo | undefined {
    return this.habitaciones.find((habitacion) => habitacion.id === id);
  }
}

