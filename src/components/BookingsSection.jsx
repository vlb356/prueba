export function BookingsSection({ bookings }) {
  return (
    <section className="section-shell" id="bookings">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Bookings</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Your latest reservations</h2>
      </div>

      {!bookings.length && <div className="glass rounded-2xl p-5 text-slate-300">No bookings yet. Reserve your first venue above.</div>}

      {bookings.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <article key={booking.id} className="glass rounded-2xl p-4">
              <h3 className="font-semibold">{booking.venue}</h3>
              <p className="mt-1 text-sm text-slate-300">Booked at {booking.when}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
