const plans = [
  {
    name: 'Monthly',
    price: '€29',
    description: 'Perfect to start and explore your multisport routine.',
    featured: false,
  },
  {
    name: '3 months',
    price: '€75',
    description: 'Best for building consistency and joining events weekly.',
    featured: true,
  },
  {
    name: 'Annual',
    price: '€249',
    description: 'Maximum value for committed athletes and social players.',
    featured: false,
  },
]

export function PricingSection({ selectedPlan, onSelectPlan }) {
export function PricingSection() {
  return (
    <section className="section-shell" id="pricing">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Simple plans. Full-city access.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name
          return (
            <article
              key={plan.name}
              className={`rounded-2xl p-6 transition ${
                plan.featured
                  ? 'border border-accent-500/70 bg-gradient-to-b from-accent-500/20 to-accent-500/5 shadow-orange'
                  : 'glass'
              } ${isSelected ? 'ring-2 ring-accent-400/60' : ''}`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-3 text-4xl font-semibold">{plan.price}</p>
              <p className="mt-2 text-slate-300">{plan.description}</p>
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-emerald-400/20 text-emerald-100'
                    : plan.featured
                      ? 'bg-accent-500 text-primary-950 hover:bg-accent-400'
                      : 'border border-white/20 hover:border-accent-500/60'
                }`}
              >
                {isSelected ? 'Selected' : 'Select plan'}
              </button>
            </article>
          )
        })}
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl p-6 transition ${
              plan.featured
                ? 'border border-accent-500/70 bg-gradient-to-b from-accent-500/20 to-accent-500/5 shadow-orange'
                : 'glass'
            }`}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-3 text-4xl font-semibold">{plan.price}</p>
            <p className="mt-2 text-slate-300">{plan.description}</p>
            <button
              className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                plan.featured
                  ? 'bg-accent-500 text-primary-950 hover:bg-accent-400'
                  : 'border border-white/20 hover:border-accent-500/60'
              }`}
            >
              Select plan
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
