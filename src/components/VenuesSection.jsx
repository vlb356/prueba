const venues = [
  {
    name: 'Urban Club District',
    type: 'Clubs',
    tags: ['Indoor courts', 'Sauna', 'Coaching'],
  },
  {
    name: 'Pulse Factory Gym',
    type: 'Gyms',
    tags: ['24/7 access', 'HIIT', 'Recovery zone'],
  },
  {
    name: 'Skyline Court Hub',
    type: 'Courts',
    tags: ['Basketball', 'Padel', 'Night lights'],
  },
]

export function VenuesSection() {
  return (
    <section className="section-shell" id="venues">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Explore venues</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Play where your city comes alive.</h2>
        </div>
        <button className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent-400/60 hover:text-accent-200">
          View all locations
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {venues.map((venue) => (
          <article key={venue.name} className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:border-accent-500/50">
            <p className="text-sm text-accent-300">{venue.type}</p>
            <h3 className="mt-2 text-xl font-semibold">{venue.name}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {venue.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
