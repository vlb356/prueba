import { LeaguesSection } from '../components/LeaguesSection'

export function LeaguesPage({ notify }) {
  return (
    <div className="space-y-8">
      <section className="section-shell">
        <div className="glass rounded-3xl p-7">
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Leagues hub</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Organiza torneos completos en minutos</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Configura ligas, equipos, fixtures, bracket y clasificaciones con persistencia local.
          </p>
        </div>
      </section>

      <LeaguesSection onJoinLeague={(leagueName) => notify(leagueName)} />
    </div>
  )
}
