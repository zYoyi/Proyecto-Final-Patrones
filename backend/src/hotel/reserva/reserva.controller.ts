import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentService } from '../ptrn_adapter_pago/payment.service';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { PagarReservaDto } from './dto/pagar-reserva.dto';
import { ReservaService } from './reserva.service';

@Controller('hotel/reservas')
export class ReservaController {
  constructor(
    private readonly reservaService: ReservaService,
    private readonly paymentService: PaymentService,
  ) {}

  /** POST /hotel/reservas — crea una reserva formal desde una cotización. */
  @Post()
  crearReserva(@Body() dto: CrearReservaDto) {
    return this.reservaService.crear(dto);
  }

  /** GET /hotel/reservas?email=... — historial de reservaciones por correo. */
  @Get()
  listarReservas(@Query('email') email?: string) {
    if (!email) return [];
    return this.reservaService.listarPorEmail(email);
  }

  /** GET /hotel/reservas/:numero — consulta una reserva específica. */
  @Get(':numero')
  obtenerReserva(@Param('numero') numero: string) {
    return this.reservaService.buscarPorNumero(numero);
  }

  /** POST /hotel/reservas/:numero/pagar — procesa pago mediante Adapter. */
  @Post(':numero/pagar')
  pagarReserva(@Param('numero') numero: string, @Body() dto: PagarReservaDto) {
    return this.paymentService.procesarPago(numero, dto);
  }
}
