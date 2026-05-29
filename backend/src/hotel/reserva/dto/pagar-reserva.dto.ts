import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { MetodoPago } from '../../ptrn_adapter_pago/payment-provider.interface';

export class PagarReservaDto {
  @IsEnum(MetodoPago, {
    message: 'metodo debe ser: demo, tarjeta, paypal o transferencia',
  })
  metodo: MetodoPago;

  @IsOptional()
  @IsBoolean()
  aprobar?: boolean;

  @IsOptional()
  @IsString()
  referencia?: string;
}
