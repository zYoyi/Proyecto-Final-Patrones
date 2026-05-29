import { ServicioDecorator } from './servicio.decorator';

/**
 * Decorador concreto: Vista al Mar
 * Agrega $350 al costo y extiende la descripción.
 */
export class VistaMarDecorator extends ServicioDecorator {
  getDescripcion(): string {
    return `${this.habitacion.getDescripcion()}, Vista al Mar`;
  }

  getCosto(): number {
    return this.habitacion.getCosto() + 350;
  }
}
