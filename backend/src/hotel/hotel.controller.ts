import { Body, Controller, Get, Post } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { EnviarReciboDto } from './dto/enviar-recibo.dto';
import { HotelService } from './hotel.service';
import { CotizarHabitacionDto } from './dto/cotizar-habitacion.dto';

@Controller('hotel')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly cotizacionService: CotizacionService,
  ) {}

  /** GET /hotel/habitaciones — catálogo de habitaciones base */
  @Get('habitaciones')
  getHabitaciones() {
    return this.hotelService.getHabitaciones();
  }

  /** GET /hotel/extras — catálogo de servicios adicionales */
  @Get('extras')
  getExtras() {
    return this.hotelService.getExtras();
  }

  @Post('cotizar')
  cotizar(@Body() dto: CotizarHabitacionDto) {
    return this.cotizacionService.cotizar(dto);
  }

  @Post('enviar-recibo')
  enviarRecibo(@Body() dto: EnviarReciboDto) {
    return this.hotelService.enviarRecibo(dto);
  }
}
