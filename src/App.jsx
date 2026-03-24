import { useMemo, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Trophy, X } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { HowItWorks } from './components/HowItWorks'
import { FeaturesGrid } from './components/FeaturesGrid'
import { VenuesSection } from './components/VenuesSection'
import { CommunitySection } from './components/CommunitySection'
import { PricingSection } from './components/PricingSection'

const navItems = ['How it works', 'Features', 'Venues', 'Community', 'Pricing']

function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-lg -translate-x-1/2 rounded-xl border border-emerald-300/30 bg-emerald-500/15 p-3 text-sm text-emerald-100 backdrop-blur">
      <div className="flex items-start gap-2">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="flex-1">{message}</p>
        <button className="rounded p-0.5 text-emerald-100/80 transition hover:bg-emerald-100/15" onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function AuthPanel({ mode, selectedPlan, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const title = mode === 'register' ? 'Create your KR account' : 'Welcome back'
  const buttonLabel = mode === 'register' ? 'Create account' : 'Login'

  const updateField = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      onSubmit({ ok: false, message: 'Please complete all required fields.' })
      return
    }

    onSubmit({
      ok: true,
      message:
        mode === 'register'
          ? `Welcome ${form.name.split(' ')[0]}! Your ${selectedPlan} plan is almost ready.`
          : `Great to see you again. Your ${selectedPlan} dashboard is ready.`,
    })
    setForm({ name: '', email: '', password: '' })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-sm text-slate-300">Plan selected: {selectedPlan}</p>

      {mode === 'register' && (
        <label className="block text-sm text-slate-300">
          Full name
          <input
            className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-accent-400"
            placeholder="Alex Kim"
            name="name"
            value={form.name}
            onChange={updateField}
          />
        </label>
      )}

      <label className="block text-sm text-slate-300">
        Email
        <input
          className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-accent-400"
          type="email"
          name="email"
          placeholder="you@email.com"
          value={form.email}
          onChange={updateField}
        />
      </label>

      <label className="block text-sm text-slate-300">
        Password
        <input
          className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-slate-100 outline-none transition focus:border-accent-400"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={updateField}
        />
      </label>

      <button className="w-full rounded-xl bg-accent-500 px-5 py-2.5 font-semibold text-primary-950 transition hover:bg-accent-400">
        {buttonLabel}
      </button>
    </form>
  )
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('3 months')
  const [authMode, setAuthMode] = useState('register')
  const [toastMessage, setToastMessage] = useState('')
  const toastTimerRef = useRef(null)

  const planPrice = useMemo(() => {
    const prices = { Monthly: '€29', '3 months': '€75', Annual: '€249' }
    return prices[selectedPlan]
  }, [selectedPlan])

  const notify = (message) => {
    setToastMessage(message)
    window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToastMessage(''), 3600)
  }

  return (
    <div className="overflow-hidden text-slate-100">
      <header className="section-shell sticky top-3 z-40 pt-3">
        <div className="glass rounded-2xl px-4 py-3 shadow-glow">
          <div className="flex items-center justify-between gap-3">
            <a href="#" className="inline-flex items-center gap-2 font-semibold tracking-wide">
              <span className="rounded-lg bg-accent-500/90 p-2 text-primary-950 shadow-orange">
                <Trophy className="h-4 w-4" />
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
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-3 py-2 text-xs font-semibold text-primary-950 transition hover:bg-accent-400 sm:text-sm"
              onClick={() => {
                setAuthMode('register')
                document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Join KR
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-24 pb-24 pt-8 sm:space-y-28">
        <HeroSection
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onExplore={() => document.getElementById('venues')?.scrollIntoView({ behavior: 'smooth' })}
          onGetStarted={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <HowItWorks />
        <FeaturesGrid />
        <VenuesSection searchTerm={searchTerm} onBook={(venue) => notify(`Booking request sent for ${venue}.`)} />
        <CommunitySection onJoinEvent={(eventName) => notify(`You joined ${eventName}. Let's play!`)} />
        <PricingSection
          selectedPlan={selectedPlan}
          onSelectPlan={(planName) => {
            setSelectedPlan(planName)
            notify(`${planName} selected. Total: ${planName === 'Monthly' ? '€29' : planName === '3 months' ? '€75' : '€249'}.`)
          }}
        />

        <section className="section-shell" id="final-cta">
          <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-300">Victory is born together</p>
            <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
              Your city has never been this connected. Start your KR journey today.
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">Continue with {selectedPlan} ({planPrice}) and unlock all sports in your city.</p>

            <div className="mt-8 flex gap-2 rounded-xl bg-white/5 p-1 sm:w-fit">
              <button
                onClick={() => setAuthMode('register')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  authMode === 'register' ? 'bg-accent-500 text-primary-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setAuthMode('login')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  authMode === 'login' ? 'bg-accent-500 text-primary-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                Login
              </button>
            </div>

            <div className="mt-6 max-w-md">
              <AuthPanel
                mode={authMode}
                selectedPlan={selectedPlan}
                onSubmit={(result) => {
                  if (!result.ok) {
                    notify(result.message)
                    return
                  }

                  notify(result.message)
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  )
}
