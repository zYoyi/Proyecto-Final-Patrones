import { ServicioDecorator } from './servicio.decorator';

/**
 * Decorador concreto: Desayuno incluido
 * Agrega $250 al costo y extiende la descripción.
 *
 * Ejemplo de composición:
 *   new DesayunoDecorator(new HabitacionEstandar())
 */
export class DesayunoDecorator extends ServicioDecorator {
  getDescripcion(): string {
    return `${this.habitacion.getDescripcion()}, Desayuno`;
  }

  getCosto(): number {
    return this.habitacion.getCosto() + 250;
  }
}
