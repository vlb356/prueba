import { CalendarRange, Medal, Shapes, UsersRound } from 'lucide-react'

const features = [
  {
    icon: Shapes,
    title: 'Multi-sport access',
    description: 'Switch from gym to court to field without juggling multiple memberships.',
  },
  {
    icon: CalendarRange,
    title: 'Events & bookings',
    description: 'Real-time availability, frictionless booking and instant confirmations.',
  },
  {
    icon: UsersRound,
    title: 'Community & social',
    description: 'Find teammates, chat in groups and discover people at your level.',
  },
  {
    icon: Medal,
    title: 'Leagues & tournaments',
    description: 'Compete in structured formats, track results and climb the local ranking.',
  },
]

export function FeaturesGrid() {
  return (
    <section className="section-shell" id="features">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Features</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Built for the next generation of sports communities.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="glass group rounded-2xl p-6 transition hover:border-accent-500/40">
            <div className="mb-4 inline-flex rounded-lg bg-accent-500/15 p-2 text-accent-300 transition group-hover:bg-accent-500 group-hover:text-primary-950">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-slate-300">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
