import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="font-serif text-white text-xl font-light">Aurum</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500">Grand Hotel</p>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              Lujo atemporal frente al mar. Donde cada estancia se convierte en un recuerdo
              permanente.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-300 mb-4">Navegación</p>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/habitaciones', label: 'Habitaciones' },
                { to: '/personalizar', label: 'Cotizar' },
                { to: '/reservas', label: 'Historial' },
                { to: '/contacto', label: 'Contacto' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-300 mb-4">Servicios</p>
            <ul className="space-y-2 text-sm text-stone-500">
              <li>Desayuno incluido</li>
              <li>WiFi Premium</li>
              <li>Vista al Mar</li>
              <li>Jacuzzi privado</li>
              <li>Spa & Wellness</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-300 mb-4">Contacto</p>
            <ul className="space-y-3 text-sm text-stone-500">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Av. Costera 1200, Cancún, México</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+52 998 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>reservas@aurumhotel.mx</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} Aurum Grand Hotel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
