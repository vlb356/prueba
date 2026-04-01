import { useEffect, useMemo, useRef, useState } from 'react'
import { Medal, X } from 'lucide-react'
import { HomePage } from './pages/HomePage'
import { VenuesPage } from './pages/VenuesPage'
import { LeaguesPage } from './pages/LeaguesPage'
import { ChatPage } from './pages/ChatPage'
import { PricingPage } from './pages/PricingPage'

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/venues', label: 'Venues' },
  { path: '/leagues', label: 'Leagues' },
  { path: '/chat', label: 'Chats' },
  { path: '/pricing', label: 'Planes' },
]

function Toast({ message, onClose }) {
  if (!message) return null

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-xl border border-emerald-300/30 bg-emerald-500/15 p-3 text-sm text-emerald-100 backdrop-blur">
      <div className="flex items-start gap-2">
        <p className="flex-1">{message}</p>
        <button onClick={onClose} className="rounded p-0.5 hover:bg-emerald-200/10" aria-label="Cerrar notificación">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('3 months')
  const [toast, setToast] = useState('')
  const [bookings, setBookings] = useState([])
  const [path, setPath] = useState(window.location.pathname)
  const timerRef = useRef(null)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (nextPath) => {
    if (nextPath === path) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setToast(''), 3000)
  }

  const handleBookVenue = (venueName) => {
    setBookings((prev) => [
      { id: `${venueName}-${Date.now()}`, venue: venueName, when: new Date().toLocaleString() },
      ...prev,
    ])
    notify(`Reserva enviada para ${venueName}.`)
  }

  const sharedProps = useMemo(
    () => ({
      selectedPlan,
      onSelectPlan: (plan) => {
        setSelectedPlan(plan)
        notify(`Plan ${plan} seleccionado.`)
      },
      notify,
    }),
    [selectedPlan],
  )

  const renderPage = () => {
    switch (path) {
      case '/venues':
        return <VenuesPage bookings={bookings} onBookVenue={handleBookVenue} notify={notify} />
      case '/leagues':
        return <LeaguesPage notify={notify} />
      case '/chat':
        return <ChatPage notify={notify} />
      case '/pricing':
        return <PricingPage selectedPlan={selectedPlan} onSelectPlan={sharedProps.onSelectPlan} notify={notify} />
      case '/':
      default:
        return <HomePage {...sharedProps} navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen overflow-hidden text-slate-100">
      <header className="section-shell sticky top-3 z-40 pt-3">
        <div className="glass rounded-2xl px-4 py-3 shadow-glow">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 font-semibold tracking-wide">
              <span className="rounded-lg bg-accent-500/90 p-2 text-primary-950 shadow-orange">
                <Medal className="h-4 w-4" />
              </span>
              <span className="text-sm sm:text-base">Komanda Ryžys · Victory is born together</span>
            </button>
            <nav className="flex items-center gap-2 sm:gap-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`rounded-lg px-3 py-1.5 text-xs transition sm:text-sm ${
                    path === item.path ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="pb-20 pt-8">{renderPage()}</main>

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}
