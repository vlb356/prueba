const steps = [
  {
    step: '01',
    title: 'Subscribe',
    description: 'Pick a plan that fits your rhythm and unlock a multisport pass for your city.',
  },
  {
    step: '02',
    title: 'Explore',
    description: 'Browse trending venues, classes and events with smart recommendations.',
  },
  {
    step: '03',
    title: 'Play',
    description: 'Reserve a spot, show up, connect with people and keep your momentum going.',
  },
]

export function HowItWorks() {
  return (
    <section className="section-shell" id="how-it-works">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">From signup to game in minutes.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((item) => (
          <article key={item.step} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-accent-500/40">
            <span className="text-sm font-semibold text-accent-300">{item.step}</span>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
