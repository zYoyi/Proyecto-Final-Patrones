import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CotizacionService } from '../cotizacion.service';
import { CotizarHabitacionDto } from '../dto/cotizar-habitacion.dto';
import { ReservaFactory } from '../ptrn_factory_method/reserva.factory';
import type { Reserva } from '../modelos/reserva.model';
import type { ExtraRepository } from '../ptrn_repository/extra.repository';
import type { HabitacionRepository } from '../ptrn_repository/habitacion.repository';
import type { ReservaRepository } from '../ptrn_repository/reserva.repository';
import {
  EXTRA_REPOSITORY,
  HABITACION_REPOSITORY,
  RESERVA_REPOSITORY,
} from '../ptrn_repository/repository.tokens';
import { CrearReservaDto } from './dto/crear-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    private readonly cotizacionService: CotizacionService,
    private readonly reservaFactory: ReservaFactory,
    @Inject(HABITACION_REPOSITORY)
    private readonly habitacionRepository: HabitacionRepository,
    @Inject(EXTRA_REPOSITORY)
    private readonly extraRepository: ExtraRepository,
    @Inject(RESERVA_REPOSITORY)
    private readonly reservaRepository: ReservaRepository,
  ) {}

  crear(dto: CrearReservaDto): Reserva {
    const cotizacion = this.cotizacionService.cotizar(dto as CotizarHabitacionDto);
    const habitacion = this.habitacionRepository.findById(dto.tipo);

    if (!habitacion) {
      throw new NotFoundException(`No existe la habitación ${dto.tipo}`);
    }

    const extras = this.extraRepository.findByIds(dto.extras ?? []);
    const reserva = this.reservaFactory.crearDesdeCotizacion(
      dto,
      cotizacion,
      habitacion,
      extras,
    );

    return this.reservaRepository.save(reserva);
  }

  buscarPorNumero(numero: string): Reserva {
    const reserva = this.reservaRepository.findByNumero(numero);

    if (!reserva) {
      throw new NotFoundException(`No existe la reserva ${numero}`);
    }

    return reserva;
  }

  listarPorEmail(email: string): Reserva[] {
    return this.reservaRepository.findByEmail(email);
  }
}
