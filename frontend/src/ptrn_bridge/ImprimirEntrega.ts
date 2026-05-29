import { EntregaRecibo } from './EntregaRecibo';
import type { DatosRecibo, EntregaResultado } from './recibo.types';

/**
 * PATRÓN BRIDGE — Abstracción refinada: Impresión / PDF
 *
 * Utiliza el Implementador para generar el HTML del recibo y lo abre
 * en un iframe oculto, disparando el diálogo de impresión del navegador.
 * El usuario puede elegir "Guardar como PDF" para obtener el archivo.
 *
 * Al usar un iframe se evitan los bloqueadores de ventanas emergentes
 * y no se interfiere con los estilos de la página principal.
 */
export class ImprimirEntrega extends EntregaRecibo {
  async entregar(datos: DatosRecibo): Promise<EntregaResultado> {
    const html = this.renderer.generarHTML(datos);

    return new Promise((resolve, reject) => {
      try {
        // Crear iframe oculto para imprimir sin afectar la página
        const iframe = document.createElement('iframe');
        iframe.style.cssText =
          'position:fixed;top:-9999px;left:-9999px;width:0;height:0;border:0;visibility:hidden;';
        document.body.appendChild(iframe);

        // Usar srcdoc para inyectar el HTML de forma segura
        iframe.srcdoc = html;

        iframe.onload = () => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();

            // Limpiar el iframe después de un breve tiempo
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 2000);

            resolve({
              ok: true,
              mensaje:
                'Diálogo de impresión abierto. Selecciona "Guardar como PDF" en las opciones de destino.',
            });
          } catch (err) {
            reject(err);
          }
        };

        iframe.onerror = () =>
          reject(new Error('No se pudo cargar el recibo para impresión.'));
      } catch (err) {
        reject(err);
      }
    });
  }
}
