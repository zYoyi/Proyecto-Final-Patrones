import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CotizacionService } from './cotizacion.service';
import { CotizarHabitacionDto } from './dto/cotizar-habitacion.dto';
import { EnviarReciboDto } from './dto/enviar-recibo.dto';
import type { ExtraRepository } from './ptrn_repository/extra.repository';
import type { HabitacionRepository } from './ptrn_repository/habitacion.repository';
import { EXTRA_REPOSITORY, HABITACION_REPOSITORY } from './ptrn_repository/repository.tokens';

@Injectable()
export class HotelService {
  constructor(
    @Inject(HABITACION_REPOSITORY)
    private readonly habitacionRepository: HabitacionRepository,
    @Inject(EXTRA_REPOSITORY)
    private readonly extraRepository: ExtraRepository,
    private readonly cotizacionService: CotizacionService,
  ) {}

  /** Devuelve el catálogo de habitaciones base con sus metadatos. */
  getHabitaciones() {
    return this.habitacionRepository.findAll();
  }

  /** Devuelve el catálogo de extras disponibles. */
  getExtras() {
    return this.extraRepository.findAll();
  }

  /**
   * Mantiene compatibilidad con consumidores que aún llamen HotelService.cotizar.
   * La lógica real vive en CotizacionService: Decorator calcula el subtotal y
   * Strategy aplica la regla de precio final.
   */
  cotizar(dto: CotizarHabitacionDto) {
    return this.cotizacionService.cotizar(dto);
  }

  /**
   * PATRÓN BRIDGE — Endpoint de entrega por correo
   *
   * Recibe el HTML ya generado por el Implementador (PDFReciboRenderer)
   * del frontend y lo envía como cuerpo del correo electrónico.
   *
   * Si SMTP_HOST está definido en .env se usa ese servidor; de lo contrario
   * se crea automáticamente una cuenta de prueba en Ethereal para demos,
   * devolviendo una URL de vista previa en la respuesta.
   */
  async enviarRecibo(dto: EnviarReciboDto) {
    let transporter: nodemailer.Transporter;
    let previewUrl: string | undefined;

    if (process.env.SMTP_HOST) {
      // Servidor SMTP real configurado en .env
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Sin configuración SMTP → cuenta de prueba Ethereal (ideal para demos)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    try {
      const info = await transporter.sendMail({
        from: `"Aurum Grand Hotel" <${process.env.SMTP_FROM ?? 'noreply@aurumhotel.mx'}>`,
        to: dto.email,
        subject: `Confirmación de reserva ${dto.numeroReserva} — Aurum Grand Hotel ($${dto.costoTotal.toLocaleString('es-MX')} MXN/noche)`,
        html: dto.htmlBody,
      });

      if (!process.env.SMTP_HOST) {
        previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
      }

      return {
        ok: true,
        mensaje: `Recibo enviado a ${dto.email}`,
        previewUrl,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      throw new InternalServerErrorException(`No se pudo enviar el correo: ${msg}`);
    }
  }
}
