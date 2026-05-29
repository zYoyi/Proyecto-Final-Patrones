import { IsEnum, IsArray, IsOptional, IsString } from 'class-validator';

export enum TipoHabitacion {
  ESTANDAR = 'estandar',
  DELUXE = 'deluxe',
  SUITE = 'suite',
}

export enum TipoExtra {
  DESAYUNO = 'desayuno',
  WIFI = 'wifi',
  VISTA_MAR = 'vista_mar',
  JACUZZI = 'jacuzzi',
}

export enum TipoReglaPrecio {
  BASE = 'base',
  TEMPORADA_ALTA = 'temporada_alta',
  CUPON = 'cupon',
  CORPORATIVA = 'corporativa',
  MAESTRO = 'maestro',
}

export class CotizarHabitacionDto {
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
