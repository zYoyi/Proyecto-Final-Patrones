import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitacionComponent } from '../ptrn_decorator/componentes/habitacion.component';
import { HabitacionDeluxe } from '../ptrn_decorator/componentes/habitacion-deluxe';
import { HabitacionEstandar } from '../ptrn_decorator/componentes/habitacion-estandar';
import { Suite } from '../ptrn_decorator/componentes/suite';
import { TipoHabitacion } from '../dto/cotizar-habitacion.dto';

@Injectable()
export class HabitacionFactory {
  crear(tipo: TipoHabitacion): HabitacionComponent {
    switch (tipo) {
      case TipoHabitacion.ESTANDAR:
        return new HabitacionEstandar();
      case TipoHabitacion.DELUXE:
        return new HabitacionDeluxe();
      case TipoHabitacion.SUITE:
        return new Suite();
      default:
        throw new BadRequestException(`Tipo de habitación no reconocido: ${tipo}`);
    }
  }
}
