import emailjs from '@emailjs/browser';
import { EntregaRecibo } from './EntregaRecibo';
import type { ReciboRenderer } from './ReciboRenderer';
import type { DatosRecibo, EntregaResultado } from './recibo.types';

/**
 * PATRÓN BRIDGE — Abstracción refinada: Correo electrónico (EmailJS)
 *
 * Utiliza el mismo Implementador (ReciboRenderer) para generar el HTML
 * del recibo y lo envía directamente desde el navegador mediante EmailJS,
 * sin necesidad de pasar por el backend.
 *
 * ImprimirEntrega y CorreoEntrega
 * comparten exactamente el mismo renderer (mismo formato visual) pero
 * difieren solo en cómo lo entregan al usuario final.
 */
export class CorreoEntrega extends EntregaRecibo {
  private readonly email: string;

  constructor(renderer: ReciboRenderer, email: string) {
    super(renderer);
    this.email = email;
  }

  async entregar(datos: DatosRecibo): Promise<EntregaResultado> {
    // Genera el mismo HTML que usaría la impresión (Implementador compartido)
    const htmlBody = this.renderer.generarHTML(datos);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: this.email,
          numero_reserva: datos.numeroReserva,
          html_body: htmlBody,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
    } catch (err: unknown) {
      // EmailJS devuelve { status, text } en los errores
      const msg =
        err && typeof err === 'object' && 'text' in err
          ? String((err as { text: string }).text)
          : err instanceof Error
            ? err.message
            : JSON.stringify(err);
      throw new Error(`EmailJS: ${msg}`);
    }

    return {
      ok: true,
      mensaje: `Recibo enviado a ${this.email}. Revisa tu bandeja de entrada.`,
    };
  }
}
