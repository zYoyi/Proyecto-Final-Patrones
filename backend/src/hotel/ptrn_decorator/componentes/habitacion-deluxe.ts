import { HabitacionComponent } from './habitacion.component';

/**
 * Componente concreto: Habitación Deluxe
 * Precio base: $1,800 MXN / noche
 */
export class HabitacionDeluxe implements HabitacionComponent {
  getDescripcion(): string {
    return 'Habitación Deluxe';
  }

  getCosto(): number {
    return 1800;
  }
}
