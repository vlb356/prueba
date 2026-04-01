import { Sparkles, Zap } from 'lucide-react'

const floatingMetrics = [
  { label: 'Active users', value: '24k+' },
  { label: 'Venues connected', value: '340+' },
  { label: 'Weekly events', value: '520+' },
]

export function HeroSection({ onStart, onDemo }) {
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
            <button
              onClick={onStart}
              className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 shadow-orange transition hover:-translate-y-0.5 hover:bg-accent-400"
            >
              Start free trial
            </button>
            <button
              onClick={onDemo}
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-accent-300/50 hover:bg-white/10"
            >
              Watch demo
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {floatingMetrics.map((item) => (
              <article key={item.label} className="glass rounded-2xl p-3 text-center">
                <p className="text-xl font-semibold text-accent-200">{item.value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-300">{item.label}</p>
              </article>
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
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-accent-400/40 bg-accent-500/15 p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-accent-200">AI MATCH</p>
                <p className="mt-1 text-sm text-slate-100">You + 4 players found nearby for basketball in 12 min.</p>
                <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-3 py-2 text-xs font-semibold text-primary-950">
                  <Zap className="h-3.5 w-3.5" />
                  Join instant game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
