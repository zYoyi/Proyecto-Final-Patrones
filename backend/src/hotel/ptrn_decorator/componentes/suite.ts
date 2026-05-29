import { HabitacionComponent } from './habitacion.component';

/**
 * Componente concreto: Suite
 * Precio base: $2,800 MXN / noche
 */
export class Suite implements HabitacionComponent {
  getDescripcion(): string {
    return 'Suite';
  }

  getCosto(): number {
    return 2800;
  }
}
