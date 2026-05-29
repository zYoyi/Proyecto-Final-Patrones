import type {
  CrearReservaRequest,
  CotizarRequest,
  CotizarResponse,
  EnviarReciboRequest,
  EnviarReciboResponse,
  Extra,
  Habitacion,
  PagarReservaRequest,
  PagoResultado,
  Reserva,
} from '../types/hotel';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de conexión con el servidor' }));
    const message = Array.isArray(error.message)
      ? error.message.join(' ')
      : error.message ?? `HTTP ${res.status}`;
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export const hotelApi = {
  getHabitaciones: (): Promise<Habitacion[]> => request('/hotel/habitaciones'),

  getExtras: (): Promise<Extra[]> => request('/hotel/extras'),

  cotizar: (data: CotizarRequest): Promise<CotizarResponse> =>
    request('/hotel/cotizar', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /** Envía el recibo generado por el frontend por correo */
  enviarRecibo: (data: EnviarReciboRequest): Promise<EnviarReciboResponse> =>
    request('/hotel/enviar-recibo', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  crearReserva: (data: CrearReservaRequest): Promise<Reserva> =>
    request('/hotel/reservas', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  obtenerReserva: (numero: string): Promise<Reserva> =>
    request(`/hotel/reservas/${encodeURIComponent(numero)}`),

  listarReservas: (email: string): Promise<Reserva[]> =>
    request(`/hotel/reservas?email=${encodeURIComponent(email)}`),

  pagarReserva: (numero: string, data: PagarReservaRequest): Promise<PagoResultado> =>
    request(`/hotel/reservas/${encodeURIComponent(numero)}/pagar`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
