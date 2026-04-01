import { Medal } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { FeaturesGrid } from './components/FeaturesGrid'
import { PricingSection } from './components/PricingSection'

export default function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="section-shell pt-6">
        <div className="glass rounded-2xl px-4 py-3 shadow-glow">
          <div className="inline-flex items-center gap-2 font-semibold tracking-wide">
            <span className="rounded-lg bg-accent-500/90 p-2 text-primary-950 shadow-orange">
              <Medal className="h-4 w-4" />
            </span>
            <span className="text-sm sm:text-base">Komanda Ryžys · Victory is born together</span>
          </div>
        </div>
      </header>

      <main className="space-y-20 pb-20 pt-8">
        <HeroSection />
        <FeaturesGrid />
        <PricingSection selectedPlan="3 months" onSelectPlan={() => {}} />

        <section className="section-shell" id="final-cta">
          <div className="glass rounded-3xl p-7 sm:p-10">
            <h2 className="text-3xl font-semibold sm:text-4xl">Stable baseline restored.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              We rolled back to a simpler working version. From here we can reintroduce leagues, bookings and advanced
              interactions in smaller safe steps.
            </p>
            <button className="mt-6 rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 transition hover:bg-accent-400">
              Continue
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
