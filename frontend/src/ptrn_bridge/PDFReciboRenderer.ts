import type { ReciboRenderer } from './ReciboRenderer';
import type { DatosRecibo } from './recibo.types';

export class PDFReciboRenderer implements ReciboRenderer {
  generarHTML(datos: DatosRecibo): string {
    const { numeroReserva, fecha, habitacion, extrasSeleccionados, cotizacion } = datos;

    const extrasRows = extrasSeleccionados
      .map(
        (e) => `
        <tr class="extra-item">
          <td class="extra-icon">${e.icono}</td>
          <td>
            <p class="extra-nombre">${e.nombre}</p>
            <p class="extra-desc">${e.descripcion}</p>
          </td>
          <td class="extra-precio">+$${e.costo.toLocaleString('es-MX')}</td>
        </tr>`,
      )
      .join('');

    const totalRows = extrasSeleccionados
      .map(
        (e) => `
        <div class="total-row">
          <span>${e.nombre}</span>
          <span>+$${e.costo.toLocaleString('es-MX')}</span>
        </div>`,
      )
      .join('');

    const extrasSection =
      extrasSeleccionados.length > 0
        ? `
        <div class="section">
          <p class="section-label">Servicios adicionales</p>
          <table class="extras-table" cellpadding="0" cellspacing="0">
            ${extrasRows}
          </table>
        </div>`
        : '';

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibo de Reserva — Aurum Grand Hotel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #f5f3f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px 60px;
      color: #1c1917;
      -webkit-font-smoothing: antialiased;
    }

    .recibo {
      background: white;
      width: 100%;
      max-width: 680px;
      position: relative;
      box-shadow: 0 4px 40px rgba(0,0,0,.10);
    }

    .gold-bar {
      height: 4px;
      background: linear-gradient(90deg, #b8a485 0%, #d4b896 50%, #b8a485 100%);
    }

    .recibo-body { padding: 56px 60px 48px; }

    /* ── Hotel header ── */
    .hotel-header {
      text-align: center;
      padding-bottom: 32px;
      border-bottom: 1px solid #e7e5e4;
      margin-bottom: 36px;
    }
    .hotel-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 30px;
      letter-spacing: 10px;
      text-transform: uppercase;
      color: #1c1917;
      margin-bottom: 5px;
    }
    .hotel-tagline {
      font-size: 9px;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: #a8a29e;
    }

    /* ── Confirmation title ── */
    .conf-title {
      text-align: center;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #c4a87a;
      margin-bottom: 28px;
    }

    /* ── Reservation meta ── */
    .meta-grid {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      padding-bottom: 28px;
      border-bottom: 1px solid #e7e5e4;
    }
    .meta-group { }
    .meta-group.right { text-align: right; }
    .meta-label {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #a8a29e;
      margin-bottom: 5px;
    }
    .meta-value {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 17px;
      color: #1c1917;
    }

    /* ── Sections ── */
    .section { margin-bottom: 28px; }
    .section-label {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #a8a29e;
      margin-bottom: 14px;
    }

    /* ── Room row ── */
    .room-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }
    .room-nombre {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      color: #1c1917;
      margin-bottom: 6px;
    }
    .room-desc {
      font-size: 13px;
      color: #78716c;
      line-height: 1.6;
      max-width: 380px;
    }
    .room-precio {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
      color: #1c1917;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Extras table ── */
    .extras-table { width: 100%; border-collapse: collapse; }
    .extra-item td { padding: 10px 0; border-bottom: 1px solid #f5f5f4; vertical-align: middle; }
    .extra-icon { font-size: 18px; width: 32px; padding-right: 10px !important; }
    .extra-nombre { font-size: 13px; font-weight: 500; color: #1c1917; margin-bottom: 2px; }
    .extra-desc { font-size: 11px; color: #a8a29e; }
    .extra-precio { font-size: 13px; color: #57534e; text-align: right; white-space: nowrap; }

    /* ── Reservation description ── */
    .quote-box {
      background: #fafaf9;
      border-left: 3px solid #d4b896;
      padding: 14px 18px;
      margin-bottom: 28px;
    }
    .quote-label {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #a8a29e;
      margin-bottom: 8px;
    }
    .quote-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14px;
      color: #78716c;
      font-style: italic;
      line-height: 1.6;
    }

    /* ── Total section ── */
    .total-box {
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      padding: 26px;
      margin-bottom: 32px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #78716c;
      margin-bottom: 8px;
    }
    .total-divider { border: none; border-top: 1px solid #e7e5e4; margin: 14px 0; }
    .total-final {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-final-label {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #1c1917;
      font-weight: 600;
    }
    .total-final-precio {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 34px;
      color: #1c1917;
    }
    .total-nota {
      font-size: 10px;
      color: #a8a29e;
      margin-top: 12px;
      line-height: 1.7;
    }

    /* ── Footer ── */
    .recibo-footer {
      padding-top: 24px;
      border-top: 1px solid #e7e5e4;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .footer-hotel-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15px;
      color: #1c1917;
      margin-bottom: 6px;
    }
    .footer-info {
      font-size: 10px;
      color: #a8a29e;
      line-height: 1.9;
    }
    .footer-thanks {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13px;
      color: #a8a29e;
      font-style: italic;
      text-align: right;
    }

    /* ── Print button (hidden when printing) ── */
    .btn-print-wrap { text-align: center; margin-top: 28px; }
    .btn-print {
      padding: 13px 48px;
      background: #1c1917;
      color: white;
      border: none;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      transition: background .2s;
    }
    .btn-print:hover { background: #44403c; }

    /* ── Print media ── */
    @media print {
      body { background: white; padding: 0; }
      .recibo { box-shadow: none; max-width: 100%; }
      .btn-print-wrap { display: none; }
      @page { margin: 12mm; size: A4; }
    }
  </style>
</head>
<body>

  <div class="recibo">
    <div class="gold-bar"></div>
    <div class="recibo-body">

      <!-- Hotel header -->
      <div class="hotel-header">
        <h1 class="hotel-name">Aurum</h1>
        <p class="hotel-tagline">Grand Hotel</p>
      </div>

      <p class="conf-title">✦ &nbsp; Confirmación de Reserva &nbsp; ✦</p>

      <!-- Meta -->
      <div class="meta-grid">
        <div class="meta-group">
          <p class="meta-label">N° de Reserva</p>
          <p class="meta-value">${numeroReserva}</p>
        </div>
        <div class="meta-group right">
          <p class="meta-label">Fecha</p>
          <p class="meta-value">${fecha}</p>
        </div>
      </div>

      <!-- Room -->
      <div class="section">
        <p class="section-label">Habitación</p>
        <div class="room-row">
          <div>
            <p class="room-nombre">${habitacion.nombre}</p>
            <p class="room-desc">${habitacion.descripcion}</p>
          </div>
          <p class="room-precio">$${habitacion.costo.toLocaleString('es-MX')}</p>
        </div>
      </div>

      <!-- Extras -->
      ${extrasSection}

      <!-- Reservation description -->
      <div class="quote-box">
        <p class="quote-label">Descripción de la estancia</p>
        <p class="quote-text">"${cotizacion.descripcion}"</p>
      </div>

      <!-- Total -->
      <div class="total-box">
        <div class="total-row">
          <span>Habitación base</span>
          <span>$${habitacion.costo.toLocaleString('es-MX')}</span>
        </div>
        ${totalRows}
        <hr class="total-divider">
        <div class="total-final">
          <span class="total-final-label">Total por noche</span>
          <span class="total-final-precio">$${cotizacion.costo.toLocaleString('es-MX')}</span>
        </div>
        <p class="total-nota">
          * Impuestos no incluidos. Sujeto a disponibilidad en las fechas seleccionadas.
          Este documento es una cotización y no constituye una reserva confirmada
          hasta recibir el pago correspondiente.
        </p>
      </div>

      <!-- Footer -->
      <div class="recibo-footer">
        <div>
          <p class="footer-hotel-name">Aurum Grand Hotel</p>
          <p class="footer-info">
            Blvd. Kukulcán Km 9, Zona Hotelera<br>
            Cancún, Quintana Roo, México 77500<br>
            +52 998 800 0000 &nbsp;·&nbsp; reservas@aurumhotel.mx
          </p>
        </div>
        <p class="footer-thanks">Gracias por elegirnos</p>
      </div>

    </div><!-- /.recibo-body -->
  </div><!-- /.recibo -->

  <div class="btn-print-wrap">
    <button class="btn-print" onclick="window.print()">Imprimir / Guardar como PDF</button>
  </div>

</body>
</html>`;
  }
}
