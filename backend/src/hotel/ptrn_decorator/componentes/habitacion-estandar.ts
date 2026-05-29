import { HabitacionComponent } from './habitacion.component';

/**
 * Componente concreto: Habitación Estándar
 * Precio base: $1,200 MXN / noche
 */
export class HabitacionEstandar implements HabitacionComponent {
  getDescripcion(): string {
    return 'Habitación Estándar';
  }

  getCosto(): number {
    return 1200;
  }
}
