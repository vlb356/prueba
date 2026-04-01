import { useMemo, useState } from 'react'

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
  {
    name: 'North Padel Dome',
    type: 'Courts',
    tags: ['Padel', 'Social ladder', 'Pro coaching'],
  },
]

const tabs = ['All', 'Clubs', 'Gyms', 'Courts']

export function VenuesSection({ searchTerm, onBook }) {
  const [activeTab, setActiveTab] = useState('All')

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const tabMatch = activeTab === 'All' || venue.type === activeTab
      const search = searchTerm.trim().toLowerCase()
      const searchMatch =
        !search ||
        venue.name.toLowerCase().includes(search) ||
        venue.type.toLowerCase().includes(search) ||
        venue.tags.some((tag) => tag.toLowerCase().includes(search))

      return tabMatch && searchMatch
    })
  }, [activeTab, searchTerm])

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

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              activeTab === tab
                ? 'bg-accent-500 text-primary-950'
                : 'border border-white/15 text-slate-300 hover:border-accent-400/60 hover:text-accent-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {searchTerm && (
        <p className="mb-4 text-sm text-slate-300">
          Showing results for: <span className="text-accent-300">{searchTerm}</span>
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {filteredVenues.map((venue) => (
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
            <button
              onClick={() => onBook(venue.name)}
              className="mt-5 w-full rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-950 transition hover:bg-accent-400"
            >
              Book now
            </button>
          </article>
        ))}
      </div>

      {!filteredVenues.length && (
        <div className="glass mt-4 rounded-2xl p-5 text-center text-slate-300">
          No venues match your search yet. Try another sport or remove filters.
        </div>
      )}
    </section>
  )
}
