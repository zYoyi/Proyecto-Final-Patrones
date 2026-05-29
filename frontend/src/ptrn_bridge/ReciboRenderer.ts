import type { DatosRecibo } from './recibo.types';

export interface ReciboRenderer {
  /**
   * @param datos  Información de la reserva.
   * @returns      Cadena con el documento HTML.
   */
  generarHTML(datos: DatosRecibo): string;
}
