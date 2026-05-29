import { Injectable } from '@nestjs/common';
import { TipoExtra } from '../dto/cotizar-habitacion.dto';
import type { ExtraCatalogo } from '../modelos/catalogo.model';

export interface ExtraRepository {
  findAll(): ExtraCatalogo[];
  findByIds(ids: TipoExtra[]): ExtraCatalogo[];
}

@Injectable()
export class InMemoryExtraRepository implements ExtraRepository {
  private readonly extras: ExtraCatalogo[] = [
    {
      id: TipoExtra.DESAYUNO,
      nombre: 'Desayuno',
      descripcion: 'Desayuno buffet completo para dos personas cada mañana.',
      costo: 250,
      icono: '☕',
    },
    {
      id: TipoExtra.WIFI,
      nombre: 'WiFi Premium',
      descripcion: 'Conexión de fibra óptica de alta velocidad, sin límites.',
      costo: 120,
      icono: '📶',
    },
    {
      id: TipoExtra.VISTA_MAR,
      nombre: 'Vista al Mar',
      descripcion: 'Habitación con vista panorámica al océano.',
      costo: 350,
      icono: '🌊',
    },
    {
      id: TipoExtra.JACUZZI,
      nombre: 'Jacuzzi',
      descripcion: 'Jacuzzi privado en habitación o terraza.',
      costo: 500,
      icono: '🛁',
    },
  ];

  findAll(): ExtraCatalogo[] {
    return [...this.extras];
  }

  findByIds(ids: TipoExtra[]): ExtraCatalogo[] {
    return ids
      .map((id) => this.extras.find((extra) => extra.id === id))
      .filter((extra): extra is ExtraCatalogo => Boolean(extra));
  }
}

