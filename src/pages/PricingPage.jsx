import { useState } from 'react'
import { PricingSection } from '../components/PricingSection'
import { activateSubscription } from '../lib/supabaseRest'

export function PricingPage({ selectedPlan, onSelectPlan, notify, onActivateSubscription, session }) {
  const [leadForm, setLeadForm] = useState({ email: '', city: '', sport: 'Padel' })
  const [loading, setLoading] = useState(false)

  const submitLead = async (event) => {
    event.preventDefault()

    if (!session?.user || !session?.access_token) {
      notify('Debes iniciar sesión para activar una suscripción real.')
      return
    }

    if (!leadForm.email || !leadForm.city) {
      notify('Completa email y ciudad.')
      return
    }

    setLoading(true)
    try {
      await activateSubscription(session.user.id, selectedPlan, session.access_token)
      notify(`Suscripción activada para ${leadForm.city} (${selectedPlan}). Ya puedes usar todo el contenido premium.`)
      onActivateSubscription()
      setLeadForm({ email: '', city: '', sport: 'Padel' })
    } catch {
      notify('No se pudo activar la suscripción. Revisa políticas de Supabase y sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <PricingSection selectedPlan={selectedPlan} onSelectPlan={onSelectPlan} />

      <section className="section-shell" id="final-cta">
        <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-300">Lanzamiento KR</p>
          <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">Activa tu plan y empieza con tu comunidad.</h2>
          <p className="mt-4 max-w-xl text-slate-300">Plan seleccionado: {selectedPlan}</p>

          <form onSubmit={submitLead} className="mt-6 grid gap-3 sm:max-w-2xl sm:grid-cols-3">
            <input
              value={leadForm.email}
              onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="Email"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
            />
            <input
              value={leadForm.city}
              onChange={(event) => setLeadForm((prev) => ({ ...prev, city: event.target.value }))}
              placeholder="Ciudad"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
            />
            <select
              value={leadForm.sport}
              onChange={(event) => setLeadForm((prev) => ({ ...prev, sport: event.target.value }))}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
            >
              <option>Padel</option>
              <option>Basketball</option>
              <option>Running</option>
              <option>HIIT</option>
            </select>
            <button disabled={loading} className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 transition hover:bg-accent-400 disabled:opacity-60 sm:col-span-3">
              {loading ? 'Activando…' : 'Activar suscripción'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
