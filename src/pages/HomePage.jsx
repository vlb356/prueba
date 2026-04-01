import { HeroSection } from '../components/HeroSection'
import { HowItWorks } from '../components/HowItWorks'
import { FeaturesGrid } from '../components/FeaturesGrid'
import { AIShowcase } from '../components/AIShowcase'
import { CommunitySection } from '../components/CommunitySection'

export function HomePage({ notify, navigate }) {
  return (
    <div className="space-y-24 sm:space-y-28">
      <HeroSection
        onStart={() => navigate('/pricing')}
        onDemo={() => navigate('/chat')}
      />
      <HowItWorks />
      <FeaturesGrid />
      <AIShowcase />
      <CommunitySection onJoinEvent={(eventName) => notify(`Te has unido a ${eventName}.`)} />
    </div>
  )
}
