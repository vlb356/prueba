import { useState } from 'react'
import { VenuesSection } from '../components/VenuesSection'
import { BookingsSection } from '../components/BookingsSection'

export function VenuesPage({ bookings, onBookVenue }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="section-shell space-y-10">
      <section className="glass rounded-3xl p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Venues & reservas</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Gestiona espacios deportivos por ciudad</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Busca sedes, reserva en un clic y mantén historial de solicitudes para tu equipo.
        </p>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar ciudad o venue"
          className="mt-5 w-full max-w-lg rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
        />
      </section>

      <VenuesSection searchTerm={searchTerm} onBook={onBookVenue} />
      <BookingsSection bookings={bookings} />
    </div>
  )
}
