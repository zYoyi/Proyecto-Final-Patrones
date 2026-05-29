import { Injectable } from '@nestjs/common';
import type { Reserva } from '../modelos/reserva.model';

export interface ReservaRepository {
  save(reserva: Reserva): Reserva;
  findByNumero(numero: string): Reserva | undefined;
  findByEmail(email: string): Reserva[];
}

@Injectable()
export class InMemoryReservaRepository implements ReservaRepository {
  private readonly reservas = new Map<string, Reserva>();

  save(reserva: Reserva): Reserva {
    this.reservas.set(reserva.numero, reserva);
    return reserva;
  }

  findByNumero(numero: string): Reserva | undefined {
    return this.reservas.get(numero);
  }

  findByEmail(email: string): Reserva[] {
    const normalizedEmail = email.trim().toLowerCase();
    return [...this.reservas.values()].filter(
      (reserva) => reserva.cliente.email.toLowerCase() === normalizedEmail,
    );
  }
}

@Injectable()
export class DatabaseReservaRepository implements ReservaRepository {
  save(): Reserva {
    throw new Error('BD');
  }

  findByNumero(): Reserva | undefined {
    throw new Error('BD');
  }

  findByEmail(): Reserva[] {
    throw new Error('BD');
  }
}

