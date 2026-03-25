import { useState } from 'react'

const communityBlocks = [
  { title: 'Group chats', text: 'Coordinate sessions and keep your team active.' },
  { title: 'Weekly challenges', text: 'Compete, earn badges, and celebrate progress.' },
  { title: 'Local events', text: 'Join pop-up tournaments and social runs.' },
  { title: 'Accountability circles', text: 'Stay motivated with your sports crew.' },
]

const starterEvents = [
  { id: 'event-1', name: 'Friday Padel Ladder', joined: false },
  { id: 'event-2', name: 'Sunrise Running Club', joined: false },
  { id: 'event-3', name: 'Sunday 3v3 Basketball', joined: false },
]

export function CommunitySection({ onJoinEvent }) {
  const [events, setEvents] = useState(starterEvents)

  const toggleJoin = (eventId) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event

        const updated = { ...event, joined: !event.joined }
        if (updated.joined) {
          onJoinEvent(updated.name)
        }
        return updated
      }),
    )
  }

  return (
    <section className="section-shell" id="community">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Community-first</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">More than bookings. A sports network.</h2>
          <p className="mt-4 text-slate-300">
            Join interest groups, challenge friends, attend local meetups, and stay consistent with a supportive community
            layer built into every activity.
          </p>

          <div className="mt-6 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-sm text-slate-100">{event.name}</p>
                <button
                  onClick={() => toggleJoin(event.id)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                    event.joined
                      ? 'bg-emerald-400/20 text-emerald-200 hover:bg-emerald-400/30'
                      : 'bg-accent-500 text-primary-950 hover:bg-accent-400'
                  }`}
                >
                  {event.joined ? 'Joined' : 'Join event'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {communityBlocks.map((item) => (
            <article key={item.title} className="glass rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
