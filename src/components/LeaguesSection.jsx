import { useMemo, useState } from 'react'
import { CalendarDays, Medal, ShieldCheck, Swords, Trophy, Users } from 'lucide-react'

const leaguesSeed = [
  {
    id: 'padel-spring-26',
    name: 'Padel Spring League 2026',
    sport: 'Padel',
    level: 'Intermediate',
    format: '2v2 league + finals',
    status: 'live',
    startsOn: '2026-03-18',
    prize: '500€ + KR trophies',
    teams: [
      { id: 't1', name: 'Orange Smash', played: 4, wins: 4, losses: 0, points: 12 },
      { id: 't2', name: 'KR Flyers', played: 4, wins: 3, losses: 1, points: 9 },
      { id: 't3', name: 'Downtown Padel', played: 4, wins: 2, losses: 2, points: 6 },
      { id: 't4', name: 'Net Ninjas', played: 4, wins: 1, losses: 3, points: 3 },
    ],
    fixtures: [
      { id: 'f1', date: '2026-03-27', home: 'Orange Smash', away: 'KR Flyers', court: 'North Dome', done: false },
      { id: 'f2', date: '2026-03-28', home: 'Net Ninjas', away: 'Downtown Padel', court: 'River Court', done: true },
      { id: 'f3', date: '2026-04-01', home: 'Orange Smash', away: 'Downtown Padel', court: 'Urban Club', done: false },
    ],
    bracket: {
      semifinals: [
        { id: 's1', label: 'SF1', a: 'Orange Smash', b: 'Net Ninjas' },
        { id: 's2', label: 'SF2', a: 'KR Flyers', b: 'Downtown Padel' },
      ],
      final: { id: 'f', label: 'Final', a: 'TBD', b: 'TBD' },
    },
  },
  {
    id: 'city-hoops-26',
    name: 'City Hoops 3v3 Tournament',
    sport: 'Basketball',
    level: 'All levels',
    format: 'Single elimination',
    status: 'upcoming',
    startsOn: '2026-04-10',
    prize: 'KR medals + sponsor packs',
    teams: [
      { id: 'b1', name: 'South Block', played: 0, wins: 0, losses: 0, points: 0 },
      { id: 'b2', name: 'Fast Breakers', played: 0, wins: 0, losses: 0, points: 0 },
      { id: 'b3', name: 'No Rim No Win', played: 0, wins: 0, losses: 0, points: 0 },
      { id: 'b4', name: 'Skyline Dunkers', played: 0, wins: 0, losses: 0, points: 0 },
    ],
    fixtures: [
      { id: 'h1', date: '2026-04-10', home: 'South Block', away: 'Skyline Dunkers', court: 'Central Arena', done: false },
      { id: 'h2', date: '2026-04-10', home: 'Fast Breakers', away: 'No Rim No Win', court: 'Central Arena', done: false },
    ],
    bracket: {
      semifinals: [
        { id: 'bs1', label: 'QF1', a: 'South Block', b: 'Skyline Dunkers' },
        { id: 'bs2', label: 'QF2', a: 'Fast Breakers', b: 'No Rim No Win' },
      ],
      final: { id: 'bf', label: 'Final', a: 'Winner QF1', b: 'Winner QF2' },
    },
  },
  {
    id: 'hiit-clash-26',
    name: 'HIIT Clash Winter Cup',
    sport: 'HIIT',
    level: 'Advanced',
    format: 'Points across 5 workouts',
    status: 'finished',
    startsOn: '2026-02-01',
    prize: 'Season champion title',
    teams: [
      { id: 'h1', name: 'Pulse Unit', played: 5, wins: 5, losses: 0, points: 25 },
      { id: 'h2', name: 'Iron Pack', played: 5, wins: 3, losses: 2, points: 18 },
      { id: 'h3', name: 'Burn Mode', played: 5, wins: 2, losses: 3, points: 14 },
      { id: 'h4', name: 'Core Rebels', played: 5, wins: 0, losses: 5, points: 6 },
    ],
    fixtures: [
      { id: 'c1', date: '2026-02-03', home: 'Pulse Unit', away: 'Iron Pack', court: 'KR Box', done: true },
      { id: 'c2', date: '2026-02-07', home: 'Burn Mode', away: 'Core Rebels', court: 'KR Box', done: true },
    ],
    bracket: {
      semifinals: [
        { id: 'hs1', label: 'Heat A', a: 'Pulse Unit', b: 'Burn Mode' },
        { id: 'hs2', label: 'Heat B', a: 'Iron Pack', b: 'Core Rebels' },
      ],
      final: { id: 'hf', label: 'Winner', a: 'Pulse Unit', b: '-' },
    },
  },
]

const leagueTabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'live', label: 'Live now' },
  { id: 'finished', label: 'Finished' },
]

const views = ['overview', 'standings', 'fixtures', 'tournament']

function StatBadge({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
      <p className="inline-flex items-center gap-1 text-xs text-slate-300">
        <Icon className="h-3.5 w-3.5 text-accent-300" />
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  )
}

export function LeaguesSection({ onJoinLeague }) {
  const [statusTab, setStatusTab] = useState('live')
  const [activeView, setActiveView] = useState('overview')
  const [leagues, setLeagues] = useState(leaguesSeed)
  const [selectedLeagueId, setSelectedLeagueId] = useState(leaguesSeed[0].id)
  const [teamDraft, setTeamDraft] = useState('')

  const statusLeagues = useMemo(() => leagues.filter((league) => league.status === statusTab), [leagues, statusTab])

  const selectedLeague = useMemo(() => {
    const found = statusLeagues.find((league) => league.id === selectedLeagueId)
    return found || statusLeagues[0] || null
  }, [statusLeagues, selectedLeagueId])

  const setDone = (fixtureId) => {
    if (!selectedLeague) return

    setLeagues((prev) =>
      prev.map((league) => {
        if (league.id !== selectedLeague.id) return league
        return {
          ...league,
          fixtures: league.fixtures.map((fixture) =>
            fixture.id === fixtureId ? { ...fixture, done: !fixture.done } : fixture,
          ),
        }
      }),
    )
  }

  const registerTeam = () => {
    if (!selectedLeague || !teamDraft.trim()) return

    const newTeam = {
      id: `${selectedLeague.id}-${Date.now()}`,
      name: teamDraft.trim(),
      played: 0,
      wins: 0,
      losses: 0,
      points: 0,
    }

    setLeagues((prev) =>
      prev.map((league) => {
        if (league.id !== selectedLeague.id) return league
        return { ...league, teams: [...league.teams, newTeam] }
      }),
    )

    setTeamDraft('')
    onJoinLeague?.(`${newTeam.name} joined ${selectedLeague.name}`)
  }

  const standings = selectedLeague ? [...selectedLeague.teams].sort((a, b) => b.points - a.points) : []

  return (
    <section className="section-shell" id="leagues">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Leagues & tournaments</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Complete league hub: standings, fixtures and brackets.</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          Verified match results
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {leagueTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setStatusTab(tab.id)
              setSelectedLeagueId('')
            }}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              statusTab === tab.id
                ? 'bg-accent-500 text-primary-950'
                : 'border border-white/15 text-slate-300 hover:border-accent-400/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!selectedLeague && (
        <div className="glass rounded-2xl p-5 text-slate-300">No leagues available in this status yet.</div>
      )}

      {selectedLeague && (
        <div className="grid gap-4 lg:grid-cols-[0.37fr_0.63fr]">
          <aside className="glass rounded-2xl p-4">
            <p className="mb-3 text-sm font-semibold text-slate-100">Leagues list</p>
            <div className="space-y-2">
              {statusLeagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => setSelectedLeagueId(league.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    selectedLeague.id === league.id
                      ? 'border-accent-400/70 bg-accent-500/15 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-accent-400/40'
                  }`}
                >
                  <p className="font-semibold">{league.name}</p>
                  <p className="text-xs text-slate-300">{league.format}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-300">Register team</p>
              <input
                value={teamDraft}
                onChange={(event) => setTeamDraft(event.target.value)}
                placeholder="Team name"
                className="w-full rounded-lg border border-white/15 bg-primary-950/70 px-3 py-2 text-sm outline-none focus:border-accent-300"
              />
              <button
                onClick={registerTeam}
                className="mt-2 w-full rounded-lg bg-accent-500 px-3 py-2 text-sm font-semibold text-primary-950 transition hover:bg-accent-400"
              >
                Join current league
              </button>
            </div>
          </aside>

          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent-300">{selectedLeague.sport}</p>
                <h3 className="text-2xl font-semibold">{selectedLeague.name}</h3>
                <p className="text-sm text-slate-300">
                  {selectedLeague.level} · {selectedLeague.format}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatBadge icon={Users} label="Teams" value={selectedLeague.teams.length} />
                <StatBadge icon={CalendarDays} label="Starts" value={selectedLeague.startsOn} />
                <StatBadge icon={Medal} label="Prize" value={selectedLeague.prize} />
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {views.map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${
                    activeView === view
                      ? 'bg-accent-500 text-primary-950'
                      : 'border border-white/15 text-slate-300 hover:border-accent-300/60'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            {activeView === 'overview' && (
              <div className="space-y-3">
                <p className="text-sm text-slate-300">
                  This competition combines regular-season matches with knockout intensity. Teams earn points to reach finals.
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedLeague.fixtures.slice(0, 2).map((fixture) => (
                    <div key={fixture.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                      <p className="font-medium">{fixture.home} vs {fixture.away}</p>
                      <p className="text-xs text-slate-300">{fixture.date} · {fixture.court}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'standings' && (
              <div className="space-y-2">
                {standings.map((team, index) => (
                  <div key={team.id} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm">
                    <span className="text-accent-200">#{index + 1}</span>
                    <span>{team.name}</span>
                    <span className="text-slate-300">PJ {team.played}</span>
                    <span className="text-slate-300">W {team.wins}</span>
                    <span className="text-slate-300">L {team.losses}</span>
                    <span className="font-semibold text-accent-200">{team.points} pts</span>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'fixtures' && (
              <div className="space-y-2">
                {selectedLeague.fixtures.map((fixture) => (
                  <div key={fixture.id} className="rounded-lg bg-white/5 px-3 py-2 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">
                        {fixture.home} vs {fixture.away}
                      </p>
                      <button
                        onClick={() => setDone(fixture.id)}
                        className={`rounded-md px-2 py-1 text-xs ${
                          fixture.done ? 'bg-emerald-400/20 text-emerald-200' : 'bg-accent-500 text-primary-950'
                        }`}
                      >
                        {fixture.done ? 'Played' : 'Mark played'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300">
                      {fixture.date} · {fixture.court}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'tournament' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="mb-2 text-sm font-semibold">Semifinals / qualifiers</p>
                  {selectedLeague.bracket.semifinals.map((match) => (
                    <div key={match.id} className="mb-2 rounded-lg bg-primary-950/70 px-3 py-2 text-sm">
                      <p className="text-xs text-slate-400">{match.label}</p>
                      <p>{match.a} vs {match.b}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="mb-2 text-sm font-semibold">Grand final</p>
                  <div className="rounded-lg bg-primary-950/70 px-3 py-3 text-sm">
                    <p className="text-xs text-slate-400">{selectedLeague.bracket.final.label}</p>
                    <p className="inline-flex items-center gap-2">
                      <Swords className="h-4 w-4 text-accent-300" />
                      {selectedLeague.bracket.final.a} vs {selectedLeague.bracket.final.b}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
