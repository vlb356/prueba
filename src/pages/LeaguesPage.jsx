import { useEffect, useMemo, useState } from 'react'
import { createEvent, createFixture, createLeague, createTeam, fetchEvents, fetchFixtures, fetchLeagues, fetchTeams, updateFixtureResult } from '../lib/supabaseRest'

export function LeaguesPage({ notify, session }) {
  const [leagues, setLeagues] = useState([])
  const [events, setEvents] = useState([])
  const [selectedLeagueId, setSelectedLeagueId] = useState('')
  const [teams, setTeams] = useState([])
  const [fixtures, setFixtures] = useState([])

  const [leagueForm, setLeagueForm] = useState({ name: '', sport: 'Padel', city: '', season: '' })
  const [teamName, setTeamName] = useState('')
  const [fixtureForm, setFixtureForm] = useState({ home_team_id: '', away_team_id: '', kickoff_at: '' })
  const [eventForm, setEventForm] = useState({ title: '', city: '', event_at: '', description: '' })

  const token = session?.access_token
  const user = session?.user

  const loadLeagues = async () => {
    if (!token) return
    const rows = await fetchLeagues(token)
    setLeagues(rows)
    if (!selectedLeagueId && rows[0]) setSelectedLeagueId(rows[0].id)
  }

  const loadEvents = async () => {
    if (!token) return
    const rows = await fetchEvents(token)
    setEvents(rows)
  }

  useEffect(() => {
    loadLeagues()
    loadEvents()
  }, [token])

  useEffect(() => {
    async function loadLeagueDetails() {
      if (!token || !selectedLeagueId) return
      const [teamRows, fixtureRows] = await Promise.all([fetchTeams(selectedLeagueId, token), fetchFixtures(selectedLeagueId, token)])
      setTeams(teamRows)
      setFixtures(fixtureRows)
    }

    loadLeagueDetails()
  }, [selectedLeagueId, token])

  const standings = useMemo(() => {
    const map = new Map(teams.map((team) => [team.id, { team, pts: 0, played: 0, gf: 0, ga: 0 }]))

    fixtures.forEach((fixture) => {
      if (fixture.status !== 'played') return
      const home = map.get(fixture.home_team_id)
      const away = map.get(fixture.away_team_id)
      if (!home || !away) return
      const hs = fixture.home_score ?? 0
      const as = fixture.away_score ?? 0

      home.played += 1
      away.played += 1
      home.gf += hs
      home.ga += as
      away.gf += as
      away.ga += hs

      if (hs > as) home.pts += 3
      else if (hs < as) away.pts += 3
      else {
        home.pts += 1
        away.pts += 1
      }
    })

    return [...map.values()].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga))
  }, [teams, fixtures])

  const submitLeague = async (event) => {
    event.preventDefault()
    try {
      await createLeague({ ...leagueForm, owner_id: user.id }, token)
      setLeagueForm({ name: '', sport: 'Padel', city: '', season: '' })
      notify('Liga creada en Supabase.')
      loadLeagues()
    } catch {
      notify('No se pudo crear la liga.')
    }
  }

  const submitTeam = async (event) => {
    event.preventDefault()
    if (!selectedLeagueId || !teamName.trim()) return
    try {
      await createTeam({ league_id: selectedLeagueId, name: teamName.trim() }, token)
      setTeamName('')
      notify('Equipo añadido.')
      setTeams(await fetchTeams(selectedLeagueId, token))
    } catch {
      notify('No se pudo crear el equipo.')
    }
  }

  const submitFixture = async (event) => {
    event.preventDefault()
    if (!selectedLeagueId || !fixtureForm.home_team_id || !fixtureForm.away_team_id) return

    try {
      await createFixture({ ...fixtureForm, league_id: selectedLeagueId, status: 'scheduled' }, token)
      setFixtureForm({ home_team_id: '', away_team_id: '', kickoff_at: '' })
      notify('Partido programado.')
      setFixtures(await fetchFixtures(selectedLeagueId, token))
    } catch {
      notify('No se pudo crear el partido.')
    }
  }

  const saveResult = async (fixtureId, homeScore, awayScore) => {
    try {
      await updateFixtureResult(fixtureId, { home_score: Number(homeScore), away_score: Number(awayScore), status: 'played' }, token)
      notify('Resultado actualizado.')
      setFixtures(await fetchFixtures(selectedLeagueId, token))
    } catch {
      notify('No se pudo actualizar el resultado.')
    }
  }

  const submitEvent = async (event) => {
    event.preventDefault()
    try {
      await createEvent({ ...eventForm, created_by: user.id }, token)
      setEventForm({ title: '', city: '', event_at: '', description: '' })
      notify('Evento creado.')
      loadEvents()
    } catch {
      notify('No se pudo crear el evento.')
    }
  }

  return (
    <div className="section-shell space-y-8">
      <section className="glass rounded-3xl p-6">
        <h1 className="text-3xl font-semibold">Ligas y eventos interactivos</h1>
        <p className="mt-2 text-slate-300">Crea ligas, añade equipos, programa partidos y modifica resultados en tiempo real.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submitLeague} className="glass rounded-3xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">Crear liga</h2>
          <input value={leagueForm.name} onChange={(e) => setLeagueForm((p) => ({ ...p, name: e.target.value }))} placeholder="Nombre liga" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" required />
          <input value={leagueForm.city} onChange={(e) => setLeagueForm((p) => ({ ...p, city: e.target.value }))} placeholder="Ciudad" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
          <input value={leagueForm.season} onChange={(e) => setLeagueForm((p) => ({ ...p, season: e.target.value }))} placeholder="Temporada" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
          <select value={leagueForm.sport} onChange={(e) => setLeagueForm((p) => ({ ...p, sport: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2">
            <option>Padel</option><option>Basketball</option><option>Running</option><option>HIIT</option>
          </select>
          <button className="rounded-xl bg-accent-500 px-4 py-2 font-semibold text-primary-950">Crear liga</button>
        </form>

        <form onSubmit={submitEvent} className="glass rounded-3xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">Crear evento</h2>
          <input value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} placeholder="Título" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" required />
          <input value={eventForm.city} onChange={(e) => setEventForm((p) => ({ ...p, city: e.target.value }))} placeholder="Ciudad" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
          <input type="datetime-local" value={eventForm.event_at} onChange={(e) => setEventForm((p) => ({ ...p, event_at: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" required />
          <textarea value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} placeholder="Descripción" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
          <button className="rounded-xl bg-accent-500 px-4 py-2 font-semibold text-primary-950">Publicar evento</button>
        </form>
      </section>

      <section className="glass rounded-3xl p-5 space-y-4">
        <h2 className="text-xl font-semibold">Tus ligas</h2>
        <div className="flex flex-wrap gap-2">
          {leagues.map((league) => (
            <button key={league.id} onClick={() => setSelectedLeagueId(league.id)} className={`rounded-lg px-3 py-2 text-sm ${selectedLeagueId === league.id ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}>
              {league.name}
            </button>
          ))}
        </div>

        {selectedLeagueId ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <form onSubmit={submitTeam} className="space-y-2">
                <h3 className="font-semibold">Equipos</h3>
                <div className="flex gap-2">
                  <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Nombre equipo" className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
                  <button className="rounded-xl bg-white/15 px-3">Añadir</button>
                </div>
              </form>

              <ul className="space-y-2 text-sm">
                {teams.map((team) => (
                  <li key={team.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">{team.name}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <form onSubmit={submitFixture} className="space-y-2">
                <h3 className="font-semibold">Programar partido</h3>
                <select value={fixtureForm.home_team_id} onChange={(e) => setFixtureForm((p) => ({ ...p, home_team_id: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                  <option value="">Local</option>
                  {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                </select>
                <select value={fixtureForm.away_team_id} onChange={(e) => setFixtureForm((p) => ({ ...p, away_team_id: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                  <option value="">Visitante</option>
                  {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                </select>
                <input type="datetime-local" value={fixtureForm.kickoff_at} onChange={(e) => setFixtureForm((p) => ({ ...p, kickoff_at: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
                <button className="rounded-xl bg-white/15 px-3 py-2">Crear partido</button>
              </form>
            </div>
          </div>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5">
          <h2 className="mb-3 text-xl font-semibold">Resultados editables</h2>
          <div className="space-y-3">
            {fixtures.map((fixture) => {
              const home = teams.find((team) => team.id === fixture.home_team_id)
              const away = teams.find((team) => team.id === fixture.away_team_id)
              let homeScore = fixture.home_score ?? ''
              let awayScore = fixture.away_score ?? ''

              return (
                <div key={fixture.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm">{home?.name} vs {away?.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input defaultValue={homeScore} onChange={(e) => { homeScore = e.target.value }} className="w-16 rounded border border-white/20 bg-transparent px-2 py-1" />
                    <span>-</span>
                    <input defaultValue={awayScore} onChange={(e) => { awayScore = e.target.value }} className="w-16 rounded border border-white/20 bg-transparent px-2 py-1" />
                    <button onClick={() => saveResult(fixture.id, homeScore, awayScore)} className="rounded bg-accent-500 px-2 py-1 text-primary-950">Guardar</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <h2 className="mb-3 text-xl font-semibold">Clasificación</h2>
          <div className="space-y-2 text-sm">
            {standings.map((row, index) => (
              <div key={row.team.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <span>{index + 1}. {row.team.name}</span>
                <span>{row.pts} pts · {row.gf}:{row.ga}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl p-5">
        <h2 className="mb-3 text-xl font-semibold">Eventos publicados</h2>
        <div className="space-y-2">
          {events.map((event) => (
            <article key={event.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-slate-300">{event.city} · {new Date(event.event_at).toLocaleString()}</p>
              <p className="mt-1 text-sm">{event.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
