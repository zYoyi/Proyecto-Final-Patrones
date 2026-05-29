import { ServicioDecorator } from './servicio.decorator';

/**
 * Decorador concreto: WiFi Premium
 * Agrega $120 al costo y extiende la descripción.
 *
 * Ejemplo de composición:
 *   new WifiPremiumDecorator(new DesayunoDecorator(new HabitacionEstandar()))
 */
export class WifiPremiumDecorator extends ServicioDecorator {
  getDescripcion(): string {
    return `${this.habitacion.getDescripcion()}, WiFi Premium`;
  }

  getCosto(): number {
    return this.habitacion.getCosto() + 120;
  }
}
