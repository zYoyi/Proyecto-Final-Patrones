/**
 * PATRÓN DECORATOR — Componente abstracto
 *
 * Define la interfaz común que comparten tanto las habitaciones base
 * (componentes concretos) como todos los decoradores de servicio.
 * Esto garantiza que los decoradores sean intercambiables con las
 * habitaciones base sin romper el código que los consume.
 */
export interface HabitacionComponent {
  getDescripcion(): string;
  getCosto(): number;
}
