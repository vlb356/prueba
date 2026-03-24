import { api } from './lib/api'
import { CalendarCheck2, Compass, LoaderCircle, MessageCircleMore, Search, UserRound } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const tabs = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck2 },
  { id: 'community', label: 'Community', icon: MessageCircleMore },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

function StatusPill({ source }) {
  const connected = source === 'supabase'

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        connected ? 'bg-emerald-400/20 text-emerald-200' : 'bg-amber-400/20 text-amber-200'
      }`}
    >
      {connected ? 'Supabase connected' : 'Mock mode'}
    </span>
  )
}

function AppHeader({ source }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-primary-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-300">Komanda Ryžys</p>
          <h1 className="text-xl font-semibold">Victory is born together</h1>
        </div>
        <StatusPill source={source} />
      </div>
    </header>
  )
}

function DiscoverTab({ venues, search, setSearch, onBook, bookingForm, setBookingForm }) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return venues
    return venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(term) ||
        venue.sport.toLowerCase().includes(term) ||
        venue.zone.toLowerCase().includes(term),
    )
  }, [venues, search])

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <label className="text-xs uppercase tracking-[0.15em] text-slate-300">Search venues and sports</label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-primary-950/70 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Padel, Basketball, North..."
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((venue) => (
          <article key={venue.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{venue.name}</h3>
                <p className="text-sm text-slate-300">
                  {venue.sport} · {venue.zone}
                </p>
              </div>
              <span className="rounded-full bg-accent-500/20 px-2 py-1 text-xs text-accent-200">{venue.slots} slots</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <input
                type="date"
                value={bookingForm.date}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, date: event.target.value }))}
                className="rounded-lg border border-white/10 bg-primary-950/80 px-3 py-2 text-sm"
              />
              <select
                value={bookingForm.slot}
                onChange={(event) => setBookingForm((prev) => ({ ...prev, slot: event.target.value }))}
                className="rounded-lg border border-white/10 bg-primary-950/80 px-3 py-2 text-sm"
              >
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
              </select>
            </div>

            <button
              onClick={() => onBook(venue)}
              className="mt-3 w-full rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-primary-950 hover:bg-accent-400"
            >
              Book venue
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function BookingsTab({ bookings }) {
  return (
    <section className="space-y-3">
      {!bookings.length && <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-slate-300">No bookings yet.</div>}

      {bookings.map((booking) => (
        <article key={booking.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold">{booking.venue_name}</h3>
          <p className="text-sm text-slate-300">
            {booking.date} · {booking.slot}
          </p>
        </article>
      ))}
    </section>
  )
}

function CommunityTab({ events, onToggleEvent }) {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {events.map((event) => (
        <article key={event.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-semibold">{event.name}</h3>
          <p className="text-sm text-slate-300">
            {event.sport} · {event.attendees} players
          </p>
          <button
            onClick={() => onToggleEvent(event)}
            className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
              event.joined ? 'bg-emerald-400/20 text-emerald-100' : 'bg-accent-500 text-primary-950 hover:bg-accent-400'
            }`}
          >
            {event.joined ? 'Joined' : 'Join event'}
          </button>
        </article>
      ))}
    </section>
  )
}

function ProfileTab({ source, selectedPlan, setSelectedPlan }) {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="font-semibold">Membership</h3>
        <p className="mt-1 text-sm text-slate-300">Choose your active plan.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Monthly', '3 months', 'Annual'].map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                selectedPlan === plan
                  ? 'bg-accent-500 text-primary-950'
                  : 'border border-white/15 text-slate-300 hover:border-accent-400/60'
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="font-semibold">Data source</h3>
        <p className="mt-1 text-sm text-slate-300">
          Current mode: <strong>{source}</strong>. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to switch to real DB.
        </p>
      </div>
    </section>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('discover')
  const [source, setSource] = useState('mock')
  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])
  const [bookings, setBookings] = useState([])
  const [selectedPlan, setSelectedPlan] = useState('3 months')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [bookingForm, setBookingForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    slot: '19:00',
  })

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.getBootstrapData()
        setSource(data.source)
        setVenues(data.venues)
        setEvents(data.events)
        setBookings(data.bookings)
      } catch (fetchError) {
        setError(fetchError.message || 'Could not load app data')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const handleBook = async (venue) => {
    try {
      const booking = await api.bookVenue({
        venueId: venue.id,
        venueName: venue.name,
        date: bookingForm.date,
        slot: bookingForm.slot,
      })

      setBookings((prev) => [booking, ...prev])
      setActiveTab('bookings')
      showToast(`${venue.name} booked for ${bookingForm.date} at ${bookingForm.slot}`)
    } catch (bookError) {
      showToast(bookError.message || 'Booking failed')
    }
  }

  const handleToggleEvent = async (event) => {
    try {
      const updatedEvent = await api.toggleEventJoin(event.id, event.joined)
      setEvents((prev) => prev.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)))
      showToast(updatedEvent.joined ? `Joined ${updatedEvent.name}` : `Left ${updatedEvent.name}`)
    } catch (joinError) {
      showToast(joinError.message || 'Event update failed')
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 text-slate-100">
      <AppHeader source={source} />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6">
        {loading && (
          <div className="flex items-center gap-2 text-slate-300">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Loading app data...
          </div>
        )}

        {error && <div className="rounded-xl border border-rose-400/30 bg-rose-500/15 p-3 text-sm text-rose-100">{error}</div>}

        {!loading && !error && (
          <>
            {activeTab === 'discover' && (
              <DiscoverTab
                venues={venues}
                search={search}
                setSearch={setSearch}
                onBook={handleBook}
                bookingForm={bookingForm}
                setBookingForm={setBookingForm}
              />
            )}
            {activeTab === 'bookings' && <BookingsTab bookings={bookings} />}
            {activeTab === 'community' && <CommunityTab events={events} onToggleEvent={handleToggleEvent} />}
            {activeTab === 'profile' && <ProfileTab source={source} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />}
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-primary-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl justify-between px-2 py-2 sm:px-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex min-w-20 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs transition ${
                activeTab === id ? 'bg-accent-500 text-primary-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {toast && (
        <div className="fixed bottom-20 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-xl border border-emerald-400/20 bg-emerald-500/15 p-3 text-sm text-emerald-100 backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  )
}
