import { IsArray, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import {
  TipoExtra,
  TipoHabitacion,
  TipoReglaPrecio,
} from '../../dto/cotizar-habitacion.dto';

export class CrearReservaDto {
  @IsString()
  @MinLength(2, { message: 'nombre debe tener al menos 2 caracteres.' })
  nombre: string;

  @IsEmail({}, { message: 'Debes proporcionar un correo electrónico válido.' })
  email: string;

  @IsEnum(TipoHabitacion, {
    message: 'tipo debe ser: estandar, deluxe o suite',
  })
  tipo: TipoHabitacion;

  @IsOptional()
  @IsArray()
  @IsEnum(TipoExtra, {
    each: true,
    message: 'extras deben ser: desayuno, wifi, vista_mar o jacuzzi',
  })
  extras?: TipoExtra[];

  @IsOptional()
  @IsEnum(TipoReglaPrecio, {
    message: 'reglaPrecio debe ser: base, temporada_alta, cupon, corporativa o maestro',
  })
  reglaPrecio?: TipoReglaPrecio;

  @IsOptional()
  @IsString()
  cupon?: string;

  @IsOptional()
  @IsString()
  codigoCorporativo?: string;
}
