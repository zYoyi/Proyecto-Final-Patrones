import type { ReciboRenderer } from './ReciboRenderer';
import type { DatosRecibo, EntregaResultado } from './recibo.types';

/**
 * PATRÓN BRIDGE — Abstracción
 *
 * Clase base que define la interfaz de alto nivel para entregar un recibo.
 * Mantiene una referencia al Implementador (ReciboRenderer) pero no
 * sabe cómo genera el contenido; solo sabe cómo "entregar".
 *
 * La separación clave:
 *   Eje de abstracción  → cómo se entrega (imprimir, correo…)
 *   Eje de implementación → cómo se formatea el recibo (PDF elegante, texto…)
 *
 * Así ambos ejes pueden evolucionar de forma independiente.
 */
export abstract class EntregaRecibo {
  constructor(protected readonly renderer: ReciboRenderer) {}

  /**
   * Entrega el recibo utilizando el Implementador inyectado.
   * Cada clase refinada define su canal de entrega específico.
   */
  abstract entregar(datos: DatosRecibo): Promise<EntregaResultado>;
}
