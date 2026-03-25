import { ChevronRight, Medal } from 'lucide-react'
import { HeroSection } from './components/HeroSection'
import { HowItWorks } from './components/HowItWorks'
import { FeaturesGrid } from './components/FeaturesGrid'
import { VenuesSection } from './components/VenuesSection'
import { CommunitySection } from './components/CommunitySection'
import { PricingSection } from './components/PricingSection'
import { AIShowcase } from './components/AIShowcase'
import { LeaguesSection } from './components/LeaguesSection'

const navItems = ['How it works', 'Features', 'AI visuals', 'Venues', 'Community', 'Leagues', 'Pricing']

export default function App() {
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
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <AIShowcase />
        <VenuesSection searchTerm="" onBook={() => {}} />
        <CommunitySection onJoinEvent={() => {}} />
        <LeaguesSection />
        <PricingSection selectedPlan="3 months" onSelectPlan={() => {}} />

        <section className="section-shell" id="final-cta">
          <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" />
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-300">Victory is born together</p>
            <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
              Your city has never been this connected. Start your KR journey today.
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Discover venues, join events, and train with people who push you forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-xl bg-accent-500 px-6 py-3 font-semibold text-primary-950 transition hover:bg-accent-400">
                Register now
              </button>
              <button className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/35">
                Login
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
