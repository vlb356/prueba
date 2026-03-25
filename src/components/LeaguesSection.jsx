import { useMemo, useState } from 'react'
import { ShieldCheck, Trophy } from 'lucide-react'

const leagueData = [
  {
    id: 'league-padel-spring',
    name: 'Padel Spring Ladder',
    sport: 'Padel',
    level: 'Intermediate',
    format: '2v2 · 8 teams',
    status: 'upcoming',
    startDate: '2026-04-06',
    teamsRegistered: 5,
    maxTeams: 8,
  },
  {
    id: 'league-basket-city',
    name: 'City Hoops League',
    sport: 'Basketball',
    level: 'All levels',
    format: '3v3 · 12 teams',
    status: 'live',
    startDate: '2026-03-20',
    teamsRegistered: 12,
    maxTeams: 12,
  },
  {
    id: 'league-run-club',
    name: 'Urban Running Club Series',
    sport: 'Running',
    level: 'Beginner friendly',
    format: 'Weekly ranking',
    status: 'live',
    startDate: '2026-03-10',
    teamsRegistered: 38,
    maxTeams: 60,
  },
  {
    id: 'league-hiit-open',
    name: 'HIIT Team Challenge',
    sport: 'HIIT',
    level: 'Advanced',
    format: '4 squads',
    status: 'finished',
    startDate: '2026-02-05',
    teamsRegistered: 4,
    maxTeams: 4,
  },
]

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'live', label: 'Live now' },
  { id: 'finished', label: 'Finished' },
]

export function LeaguesSection() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [joinedLeagues, setJoinedLeagues] = useState([])

  const visibleLeagues = useMemo(() => leagueData.filter((league) => league.status === activeTab), [activeTab])

  const toggleJoin = (leagueId) => {
    setJoinedLeagues((prev) => (prev.includes(leagueId) ? prev.filter((id) => id !== leagueId) : [...prev, leagueId]))
  }

  return (
    <section className="section-shell" id="leagues">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Leagues & tournaments</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Compete, track progress, and climb your city ranking.</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          Verified match results
        </span>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              activeTab === tab.id
                ? 'bg-accent-500 text-primary-950'
                : 'border border-white/15 text-slate-300 hover:border-accent-400/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleLeagues.map((league) => {
          const isJoined = joinedLeagues.includes(league.id)
          const fill = Math.round((league.teamsRegistered / league.maxTeams) * 100)

          return (
            <article key={league.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-accent-300">{league.sport}</p>
                  <h3 className="mt-1 text-xl font-semibold">{league.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {league.level} · {league.format}
                  </p>
                </div>
                <Trophy className="h-5 w-5 text-accent-300" />
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                  <span>Teams registered</span>
                  <span>
                    {league.teamsRegistered}/{league.maxTeams}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-accent-500" style={{ width: `${fill}%` }} />
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-300">Start date: {league.startDate}</p>

              <button
                onClick={() => toggleJoin(league.id)}
                className={`mt-4 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isJoined
                    ? 'bg-emerald-400/20 text-emerald-100'
                    : activeTab === 'finished'
                      ? 'border border-white/20 text-slate-300'
                      : 'bg-accent-500 text-primary-950 hover:bg-accent-400'
                }`}
                disabled={activeTab === 'finished'}
              >
                {activeTab === 'finished' ? 'Season ended' : isJoined ? 'Joined' : 'Join league'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
