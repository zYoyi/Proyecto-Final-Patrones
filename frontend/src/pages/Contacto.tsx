import { useState } from 'react';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En producción se conectaría a un endpoint real
    setEnviado(true);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div
        className="relative py-28 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10 text-center text-white">
          <p className="section-label text-stone-400 mb-4">Estamos aquí</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light">Contacto</h1>
        </div>
      </div>

      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Información de contacto */}
            <div>
              <p className="section-label mb-4">Información</p>
              <h2 className="font-serif text-4xl font-light text-stone-900 mb-8">
                Siempre disponibles para ti
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: '📍',
                    title: 'Ubicación',
                    lines: ['Av. Costera 1200, Zona Hotelera', 'Cancún, Quintana Roo, México'],
                  },
                  {
                    icon: '📞',
                    title: 'Teléfono',
                    lines: ['+52 998 123 4567', '+52 998 765 4321 (reservaciones)'],
                  },
                  {
                    icon: '✉️',
                    title: 'Correo electrónico',
                    lines: ['reservas@aurumhotel.mx', 'info@aurumhotel.mx'],
                  },
                  {
                    icon: '🕐',
                    title: 'Horario de atención',
                    lines: ['Check-in: 15:00 hrs', 'Check-out: 12:00 hrs', 'Recepción: 24 horas'],
                  },
                ].map(({ icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 mt-1">{icon}</span>
                    <div>
                      <p className="font-medium text-stone-900 mb-1">{title}</p>
                      {lines.map((l) => (
                        <p key={l} className="text-stone-500 text-sm">
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white border border-stone-200 p-8">
              {enviado ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="text-5xl mb-6">✓</div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-3">
                    Mensaje enviado
                  </h3>
                  <p className="text-stone-500">
                    Nos pondremos en contacto contigo en menos de 24 horas. ¡Gracias por
                    elegir Aurum Grand Hotel!
                  </p>
                  <button
                    onClick={() => setEnviado(false)}
                    className="btn-outline mt-8"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <p className="section-label mb-2">Formulario</p>
                  <h3 className="font-serif text-2xl text-stone-900 mb-6">
                    Escríbenos
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full border border-stone-200 px-4 py-3 text-stone-900 text-sm focus:outline-none focus:border-stone-500 transition-colors bg-stone-50"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-stone-200 px-4 py-3 text-stone-900 text-sm focus:outline-none focus:border-stone-500 transition-colors bg-stone-50"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-500 uppercase tracking-widest mb-2">
                        Mensaje
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.mensaje}
                        onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                        className="w-full border border-stone-200 px-4 py-3 text-stone-900 text-sm focus:outline-none focus:border-stone-500 transition-colors bg-stone-50 resize-none"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Enviar mensaje
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
