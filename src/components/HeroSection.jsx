import { Sparkles, Zap } from 'lucide-react'

const floatingMetrics = [
  { label: 'Active users', value: '24k+' },
  { label: 'Venues connected', value: '340+' },
  { label: 'Weekly events', value: '520+' },
]

export function HeroSection() {
  return (
    <section className="section-shell relative overflow-hidden" id="hero">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fadeInUp">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-200">
            <Sparkles className="h-4 w-4" />
            New: AI-powered sport discovery
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Move your body.
            <br />
            <span className="bg-gradient-to-r from-accent-300 via-orange-200 to-cyan-200 bg-clip-text text-transparent">
              Build your tribe.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Komanda Ryžys turns your city into one connected multisport ecosystem. Discover venues, join events, and train
            with people who match your vibe.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 shadow-orange transition hover:-translate-y-0.5 hover:bg-accent-400">
              Start free trial
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-accent-300/50 hover:bg-white/10">
              Watch demo
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {floatingMetrics.map((item) => (
              <article key={item.label} className="glass rounded-2xl p-3 text-center">
                <p className="text-xl font-semibold text-accent-200">{item.value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-300">{item.label}</p>
              </article>
import { CalendarCheck2, Search, Users } from 'lucide-react'

const highlights = [
  { icon: Search, label: 'Find sports instantly' },
  { icon: CalendarCheck2, label: 'Book in 2 taps' },
  { icon: Users, label: 'Play with your community' },
]

const quickSports = ['Padel', 'Basketball', 'Running', 'HIIT']

export function HeroSection({ searchTerm, onSearchTermChange, onGetStarted, onExplore }) {
  return (
    <section className="section-shell" id="hero">
      <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-300">
            Komanda Ryžys · One subscription → All sports in your city
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            One subscription. All sports. One city.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Discover courts, gyms and clubs, reserve your spot, join events, and build your team in one dynamic
            multisport platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onGetStarted}
              className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 shadow-orange transition hover:bg-accent-400"
            >
              Get Started
            </button>
            <button
              onClick={onExplore}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Explore venues
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <label className="text-xs uppercase tracking-[0.15em] text-slate-300">Search activities in your city</label>
            <input
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-accent-400"
              placeholder="Try: padel, gym, courts..."
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {quickSports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => onSearchTermChange(sport)}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200 transition hover:border-accent-400/60 hover:text-accent-200"
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-slate-200">
                <Icon className="h-4 w-4 text-accent-300" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-float relative">
          <div className="glass relative overflow-hidden rounded-[2rem] p-5 shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/15 via-transparent to-blue-400/20" />
            <div className="relative rounded-2xl border border-white/10 bg-primary-900/80 p-4">
              <p className="text-sm text-slate-300">KR Live Feed</p>
              <div className="mt-3 space-y-3">
                {['Padel Night League · 19:00', 'HIIT Team Blast · 18:30', 'Sunrise Run Club · 07:00'].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white">
        <div className="relative">
          <div className="glass animate-float rounded-[2rem] p-5 shadow-glow">
            <div className="rounded-2xl bg-primary-900/80 p-4">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
                <span>KR App Mockup</span>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-emerald-300">Live</span>
              </div>
              <div className="space-y-3">
                {['Basketball @ Downtown Arena', 'Morning HIIT @ Nova Gym', 'Padel social event @ River Club'].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-accent-400/40 bg-accent-500/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-accent-200">AI Match</p>
                <p className="mt-1 text-sm text-slate-100">You + 4 players found nearby for basketball in 12 min.</p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-3 py-2 text-xs font-semibold text-primary-950">
                  <Zap className="h-3.5 w-3.5" />
                  Join instant game
                </button>
              </div>
            </div>
          </div>
              <div className="mt-4 rounded-xl bg-accent-500/90 px-3 py-2 text-center text-sm font-semibold text-primary-950">
                Confirm Booking
              </div>
            </div>
          </div>
          <div className="animate-pulseGlow absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-accent-500/20 blur-2xl" />
          <div className="animate-pulseGlow absolute -right-8 -top-8 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
