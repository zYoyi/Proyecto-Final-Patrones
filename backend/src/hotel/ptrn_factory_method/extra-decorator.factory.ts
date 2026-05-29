import { BadRequestException, Injectable } from '@nestjs/common';
import { HabitacionComponent } from '../ptrn_decorator/componentes/habitacion.component';
import { DesayunoDecorator } from '../ptrn_decorator/decoradores/desayuno.decorator';
import { JacuzziDecorator } from '../ptrn_decorator/decoradores/jacuzzi.decorator';
import { VistaMarDecorator } from '../ptrn_decorator/decoradores/vista-mar.decorator';
import { WifiPremiumDecorator } from '../ptrn_decorator/decoradores/wifi-premium.decorator';
import { TipoExtra } from '../dto/cotizar-habitacion.dto';

@Injectable()
export class ExtraDecoratorFactory {
  aplicar(habitacion: HabitacionComponent, extras: TipoExtra[] = []): HabitacionComponent {
    return extras.reduce(
      (habitacionDecorada, extra) => this.aplicarUno(habitacionDecorada, extra),
      habitacion,
    );
  }

  private aplicarUno(habitacion: HabitacionComponent, extra: TipoExtra): HabitacionComponent {
    switch (extra) {
      case TipoExtra.DESAYUNO:
        return new DesayunoDecorator(habitacion);
      case TipoExtra.WIFI:
        return new WifiPremiumDecorator(habitacion);
      case TipoExtra.VISTA_MAR:
        return new VistaMarDecorator(habitacion);
      case TipoExtra.JACUZZI:
        return new JacuzziDecorator(habitacion);
      default:
        throw new BadRequestException(`Extra no reconocido: ${extra}`);
    }
  }
}
