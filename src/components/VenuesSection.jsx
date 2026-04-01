import { useMemo, useState } from 'react'

const venues = [
  { name: 'Vilnius Padel Arena', city: 'Vilnius', type: 'Courts', sport: 'Padel', tags: ['Indoor courts', 'Pro coaching', 'Night league'] },
  { name: 'Kaunas MultiSport Hall', city: 'Kaunas', type: 'Clubs', sport: 'Basketball', tags: ['5v5 courts', 'Locker rooms', 'Weekend cups'] },
  { name: 'Klaipėda Seaside Fitness', city: 'Klaipėda', type: 'Gyms', sport: 'HIIT', tags: ['Functional zone', 'Recovery', 'Group classes'] },
  { name: 'Šiauliai Court Center', city: 'Šiauliai', type: 'Courts', sport: 'Basketball', tags: ['FIBA size', 'Lighting', 'Academy programs'] },
  { name: 'Panevėžys Padel Hub', city: 'Panevėžys', type: 'Courts', sport: 'Padel', tags: ['Social ladder', 'Beginner clinics', 'Café'] },
  { name: 'Alytus Running Dome', city: 'Alytus', type: 'Clubs', sport: 'Running', tags: ['Indoor track', 'VO2 lab', 'Coach support'] },
  { name: 'Marijampolė Active Box', city: 'Marijampolė', type: 'Gyms', sport: 'HIIT', tags: ['Cross-training', 'Mobility room', 'Competition prep'] },
  { name: 'Utena Sports Loft', city: 'Utena', type: 'Clubs', sport: 'Basketball', tags: ['Amateur league', 'Video analysis', 'Team packages'] },
]

const tabs = ['All', 'Clubs', 'Gyms', 'Courts']
const cities = ['All', ...new Set(venues.map((venue) => venue.city))]

export function VenuesSection({ searchTerm, onBook }) {
  const [activeTab, setActiveTab] = useState('All')
  const [activeCity, setActiveCity] = useState('All')

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const tabMatch = activeTab === 'All' || venue.type === activeTab
      const cityMatch = activeCity === 'All' || venue.city === activeCity
      const search = searchTerm.trim().toLowerCase()
      const searchMatch =
        !search ||
        venue.name.toLowerCase().includes(search) ||
        venue.city.toLowerCase().includes(search) ||
        venue.sport.toLowerCase().includes(search) ||
        venue.type.toLowerCase().includes(search) ||
        venue.tags.some((tag) => tag.toLowerCase().includes(search))

      return tabMatch && cityMatch && searchMatch
    })
  }, [activeTab, activeCity, searchTerm])

  return (
    <section className="section-shell" id="venues">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Lithuania venues</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Espacios deportivos en toda Lituania.</h2>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
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

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-300">Ciudad:</label>
        <select value={activeCity} onChange={(event) => setActiveCity(event.target.value)} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {searchTerm && (
        <p className="mb-4 text-sm text-slate-300">
          Buscando: <span className="text-accent-300">{searchTerm}</span>
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {filteredVenues.map((venue) => (
          <article key={venue.name} className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:border-accent-500/50">
            <p className="text-sm text-accent-300">{venue.type} · {venue.city}</p>
            <h3 className="mt-2 text-xl font-semibold">{venue.name}</h3>
            <p className="mt-1 text-sm text-slate-300">Deporte principal: {venue.sport}</p>
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
              Reservar
            </button>
          </article>
        ))}
      </div>

      {!filteredVenues.length && (
        <div className="glass mt-4 rounded-2xl p-5 text-center text-slate-300">
          No hay sedes con esos filtros. Prueba otra ciudad o deporte.
        </div>
      )}
    </section>
  )
}
