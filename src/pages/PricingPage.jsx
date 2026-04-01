import { useState } from 'react'
import { PricingSection } from '../components/PricingSection'

export function PricingPage({ selectedPlan, onSelectPlan, notify, onActivateSubscription }) {
  const [leadForm, setLeadForm] = useState({ email: '', city: '', sport: 'Padel' })

  const submitLead = (event) => {
    event.preventDefault()

    if (!leadForm.email || !leadForm.city) {
      notify('Completa email y ciudad.')
      return
    }

    notify(`Suscripción activada para ${leadForm.city} (${selectedPlan}). Ya puedes usar Social Feed.`)
    onActivateSubscription()
    setLeadForm({ email: '', city: '', sport: 'Padel' })
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
            <button className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 transition hover:bg-accent-400 sm:col-span-3">
              Obtener acceso prioritario
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
