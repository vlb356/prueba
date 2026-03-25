import { useMemo, useState } from 'react'
import { ShieldCheck, Trophy, X } from 'lucide-react'

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
    standings: [
      { team: 'Orange Smash', points: 9 },
      { team: 'Downtown Padel', points: 7 },
      { team: 'KR Flyers', points: 6 },
    ],
    fixtures: ['Apr 06 · Orange Smash vs KR Flyers', 'Apr 08 · Downtown Padel vs Net Ninjas'],
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
    standings: [
      { team: 'South Block', points: 14 },
      { team: 'Fast Breakers', points: 12 },
      { team: 'No Rim No Win', points: 10 },
    ],
    fixtures: ['Mar 28 · South Block vs Fast Breakers', 'Mar 29 · Street Kings vs No Rim No Win'],
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
    standings: [
      { team: 'North Pace', points: 22 },
      { team: 'City Striders', points: 20 },
      { team: 'Sunrise Crew', points: 17 },
    ],
    fixtures: ['Mar 30 · 5K Time Trial @ River Park', 'Apr 01 · Hill Sprints @ Skyline'],
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
    standings: [
      { team: 'Pulse Unit', points: 18 },
      { team: 'Iron Pack', points: 15 },
      { team: 'Burn Mode', points: 12 },
    ],
    fixtures: ['Season complete'],
  },
]

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'live', label: 'Live now' },
  { id: 'finished', label: 'Finished' },
]

export function LeaguesSection({ onJoinLeague }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [joinedLeagues, setJoinedLeagues] = useState([])
  const [selectedLeague, setSelectedLeague] = useState(null)

  const visibleLeagues = useMemo(() => leagueData.filter((league) => league.status === activeTab), [activeTab])

  const toggleJoin = (league) => {
    setJoinedLeagues((prev) => {
      const exists = prev.includes(league.id)
      if (!exists) {
        onJoinLeague?.(league.name)
      }
      return exists ? prev.filter((id) => id !== league.id) : [...prev, league.id]
    })
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

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => toggleJoin(league)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
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
                <button
                  onClick={() => setSelectedLeague(league)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:border-accent-300/60"
                >
                  View table
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {selectedLeague && (
        <div className="glass fixed inset-x-3 bottom-3 z-50 rounded-2xl p-5 shadow-glow md:inset-auto md:bottom-6 md:left-1/2 md:w-[42rem] md:-translate-x-1/2">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-accent-300">{selectedLeague.sport}</p>
              <h3 className="text-lg font-semibold">{selectedLeague.name}</h3>
            </div>
            <button onClick={() => setSelectedLeague(null)} className="rounded p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-100">Standings</p>
              <div className="space-y-2">
                {selectedLeague.standings.map((row, index) => (
                  <div key={row.team} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                    <span>
                      #{index + 1} {row.team}
                    </span>
                    <span className="text-accent-200">{row.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-100">Next fixtures</p>
              <div className="space-y-2">
                {selectedLeague.fixtures.map((fixture) => (
                  <div key={fixture} className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-200">
                    {fixture}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
