import { Injectable } from '@nestjs/common';
import type { CrearReservaDto } from '../reserva/dto/crear-reserva.dto';
import type { Cotizacion } from '../modelos/cotizacion.model';
import type { ExtraCatalogo, HabitacionCatalogo } from '../modelos/catalogo.model';
import { EstadoReserva, Reserva } from '../modelos/reserva.model';

@Injectable()
export class ReservaFactory {
  crearDesdeCotizacion(
    dto: CrearReservaDto,
    cotizacion: Cotizacion,
    habitacion: HabitacionCatalogo,
    extras: ExtraCatalogo[],
  ): Reserva {
    return {
      numero: this.generarNumeroReserva(),
      fechaCreacion: new Date().toISOString(),
      cliente: {
        nombre: dto.nombre,
        email: dto.email,
      },
      habitacion: {
        id: habitacion.id,
        nombre: habitacion.nombre,
        descripcion: habitacion.descripcion,
        costo: habitacion.costo,
      },
      extras: extras.map((extra) => ({
        id: extra.id,
        nombre: extra.nombre,
        descripcion: extra.descripcion,
        costo: extra.costo,
        icono: extra.icono,
      })),
      cotizacion: {
        descripcion: cotizacion.descripcion,
        subtotal: cotizacion.subtotal,
        descuento: cotizacion.descuento,
        recargo: cotizacion.recargo,
        total: cotizacion.total,
        reglaAplicada: cotizacion.reglaAplicada,
      },
      total: cotizacion.total,
      estado: this.crearEstadoInicial(),
      pagos: [],
    };
  }

  private generarNumeroReserva(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `AURUM-${year}-${Date.now().toString(36).toUpperCase()}-${random}`;
  }

  private crearEstadoInicial(): EstadoReserva {
    return EstadoReserva.PENDIENTE_PAGO;
  }
}

