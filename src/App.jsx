import { useState } from 'react'
import { ChevronRight, Medal, X } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { HowItWorks } from './components/HowItWorks'
import { FeaturesGrid } from './components/FeaturesGrid'
import { VenuesSection } from './components/VenuesSection'
import { CommunitySection } from './components/CommunitySection'
import { PricingSection } from './components/PricingSection'
import { AIShowcase } from './components/AIShowcase'
import { LeaguesSection } from './components/LeaguesSection'

const navItems = ['How it works', 'Features', 'AI visuals', 'Venues', 'Community', 'Leagues', 'Pricing']

function Toast({ message, onClose }) {
  if (!message) return null

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-xl border border-emerald-300/30 bg-emerald-500/15 p-3 text-sm text-emerald-100 backdrop-blur">
      <div className="flex items-start gap-2">
        <p className="flex-1">{message}</p>
        <button onClick={onClose} className="rounded p-0.5 hover:bg-emerald-200/10">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('3 months')
  const [toast, setToast] = useState('')
  const [leadForm, setLeadForm] = useState({ email: '', city: '', sport: 'Padel' })

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__kr_toast_timer)
    window.__kr_toast_timer = window.setTimeout(() => setToast(''), 3000)
  }

  const submitLead = (event) => {
    event.preventDefault()

    if (!leadForm.email || !leadForm.city) {
      notify('Please complete email and city to continue.')
      return
    }

    notify(`Great! We saved your pre-registration for ${leadForm.city} (${selectedPlan}).`)
    setLeadForm({ email: '', city: '', sport: 'Padel' })
  }

  return (
    <div className="overflow-hidden text-slate-100">
      <header className="section-shell sticky top-3 z-40 pt-3">
        <div className="glass rounded-2xl px-4 py-3 shadow-glow">
          <div className="flex items-center justify-between gap-3">
            <a href="#" className="inline-flex items-center gap-2 font-semibold tracking-wide">
              <span className="rounded-lg bg-accent-500/90 p-2 text-primary-950 shadow-orange">
                <Medal className="h-4 w-4" />
              </span>
              <span className="text-sm sm:text-base">Komanda Ryžys</span>
            </a>
            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
            <button className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-3 py-2 text-xs font-semibold text-primary-950 transition hover:bg-accent-400 sm:text-sm">
              Join KR
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-24 pb-24 pt-8 sm:space-y-28">
        <section className="section-shell">
          <div className="glass flex flex-wrap gap-2 rounded-2xl p-3">
            {['Hero', 'Leagues', 'Venues', 'Community', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200 transition hover:border-accent-300/60 hover:text-accent-200"
              >
                {item}
              </a>
            ))}
          </div>
        </section>
        <HeroSection />
        <LeaguesSection onJoinLeague={(leagueName) => notify(`League joined: ${leagueName}`)} />
        <HowItWorks />
        <FeaturesGrid />
        <AIShowcase />
        <VenuesSection searchTerm={searchTerm} onBook={(venue) => notify(`Booking request sent for ${venue}.`)} />
        <CommunitySection onJoinEvent={(eventName) => notify(`Joined ${eventName}. Team up!`)} />
        <PricingSection
          selectedPlan={selectedPlan}
          onSelectPlan={(planName) => {
            setSelectedPlan(planName)
            notify(`${planName} plan selected.`)
          }}
        />

        <section className="section-shell" id="final-cta">
          <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-300">Victory is born together</p>
            <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">Launch your KR account and get city-wide access.</h2>
            <p className="mt-4 max-w-xl text-slate-300">Selected plan: {selectedPlan}</p>

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
                placeholder="City"
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
                Get priority access
              </button>
            </form>
          </div>
        </section>
      </main>

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}
