import { HabitacionComponent } from '../componentes/habitacion.component';

/**
 * PATRÓN DECORATOR — Decorador abstracto
 *
 * Mantiene una referencia al componente que envuelve e implementa
 * la misma interfaz HabitacionComponent. Todos los decoradores concretos
 * extienden esta clase y delegan al componente envuelto antes de
 * agregar su propio comportamiento (costo y descripción).
 */
export abstract class ServicioDecorator implements HabitacionComponent {
  protected habitacion: HabitacionComponent;

  constructor(habitacion: HabitacionComponent) {
    this.habitacion = habitacion;
  }

  abstract getDescripcion(): string;
  abstract getCosto(): number;
}
