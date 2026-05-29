import { IsEmail, IsString, IsNumber, MinLength } from 'class-validator';

/**
 * DTO para el endpoint POST /hotel/enviar-recibo.
 *
 * El campo htmlBody contiene el recibo completo generado en el
 * frontend mediante el Implementador (PDFReciboRenderer) del patrón Bridge.
 * El backend simplemente lo usa como cuerpo del correo electrónico,
 * evitando duplicar la lógica de formato.
 */
export class EnviarReciboDto {
  @IsEmail({}, { message: 'Debes proporcionar un correo electrónico válido.' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'htmlBody no puede estar vacío.' })
  htmlBody: string;

  @IsString()
  numeroReserva: string;

  @IsNumber()
  costoTotal: number;
}
