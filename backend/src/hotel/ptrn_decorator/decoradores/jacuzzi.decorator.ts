import { ServicioDecorator } from './servicio.decorator';

/**
 * Decorador concreto: Jacuzzi privado
 * Agrega $500 al costo y extiende la descripción.
 */
export class JacuzziDecorator extends ServicioDecorator {
  getDescripcion(): string {
    return `${this.habitacion.getDescripcion()}, Jacuzzi`;
  }

  getCosto(): number {
    return this.habitacion.getCosto() + 500;
  }
}
