import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/habitaciones', label: 'Habitaciones' },
  { to: '/personalizar', label: 'Reservar' },
  { to: '/reservas', label: 'Historial' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-stone-900">
              Aurum
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 -mt-0.5">
              Grand Hotel
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-stone-900 font-medium'
                      : 'text-stone-500 hover:text-stone-900'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/personalizar"
              className="ml-4 px-5 py-2 bg-stone-900 text-white text-xs tracking-widest uppercase transition-colors duration-200 hover:bg-stone-700"
            >
              Cotizar
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900"
            aria-label="Menú"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`h-px bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`h-px bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-px bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-xs tracking-widest uppercase py-1 ${
                    isActive ? 'text-stone-900 font-medium' : 'text-stone-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
