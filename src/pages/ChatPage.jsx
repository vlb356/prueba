import { useMemo, useState } from 'react'
import { Bot, MessageCircle, Send, Sparkles } from 'lucide-react'

const starterRooms = [
  { id: 'captains', name: 'Capitanes', topic: 'Coordinación semanal', messages: [] },
  { id: 'matchday', name: 'Matchday', topic: 'Convocatorias y alineaciones', messages: [] },
  { id: 'ai-coach', name: 'AI Coach', topic: 'Estrategia y preparación', messages: [] },
]

const quickReplies = [
  '¿Quién confirma para hoy?',
  'Compartid disponibilidad para el sábado',
  'Necesito 2 suplentes para las 20:00',
]

function aiCoachReply(input) {
  const lower = input.toLowerCase()
  if (lower.includes('alineación') || lower.includes('lineup')) {
    return 'Sugerencia: usa un 2-1-1 equilibrado y rota cada 10 minutos para mantener intensidad.'
  }
  if (lower.includes('entreno') || lower.includes('training')) {
    return 'Plan express (45 min): 10 min movilidad + 20 min posesión + 15 min finalizaciones.'
  }

  return 'Tip KR: define objetivo del partido, rol por jugador y un plan B antes de iniciar.'
}

export function ChatPage({ notify }) {
  const [rooms, setRooms] = useState(() => {
    const stored = window.localStorage.getItem('kr-chat-rooms-v1')
    return stored ? JSON.parse(stored) : starterRooms
  })
  const [activeRoomId, setActiveRoomId] = useState('captains')
  const [draft, setDraft] = useState('')

  const activeRoom = useMemo(() => rooms.find((room) => room.id === activeRoomId) ?? rooms[0], [rooms, activeRoomId])

  const persistRooms = (nextRooms) => {
    setRooms(nextRooms)
    window.localStorage.setItem('kr-chat-rooms-v1', JSON.stringify(nextRooms))
  }

  const pushMessage = (roomId, message) => {
    const nextRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, messages: [...room.messages, message] } : room,
    )
    persistRooms(nextRooms)
  }

  const sendMessage = (value) => {
    const clean = value.trim()
    if (!clean) return

    pushMessage(activeRoom.id, {
      id: `${Date.now()}-user`,
      author: 'Tú',
      role: 'user',
      text: clean,
      at: new Date().toLocaleTimeString(),
    })

    if (activeRoom.id === 'ai-coach') {
      window.setTimeout(() => {
        pushMessage('ai-coach', {
          id: `${Date.now()}-ai`,
          author: 'Coach AI',
          role: 'assistant',
          text: aiCoachReply(clean),
          at: new Date().toLocaleTimeString(),
        })
      }, 300)
    }

    setDraft('')
  }

  return (
    <div className="section-shell">
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="glass rounded-3xl p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-300">Canales</p>
          <div className="mt-3 space-y-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                  room.id === activeRoomId
                    ? 'border-accent-300 bg-accent-500/15'
                    : 'border-white/10 bg-white/5 hover:border-white/25'
                }`}
              >
                <p className="font-medium">{room.name}</p>
                <p className="text-xs text-slate-400">{room.topic}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="glass flex min-h-[520px] flex-col rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h1 className="text-2xl font-semibold">{activeRoom.name}</h1>
              <p className="text-sm text-slate-300">{activeRoom.topic}</p>
            </div>
            <button
              onClick={() => notify('Invitación enviada al equipo.')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" /> Invitar
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {activeRoom.messages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300">
                No hay mensajes todavía. Usa respuestas rápidas o escribe el primero.
              </div>
            ) : (
              activeRoom.messages.map((msg) => (
                <article
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'assistant'
                      ? 'border border-violet-300/40 bg-violet-500/15'
                      : 'ml-auto border border-accent-300/40 bg-accent-500/20'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2 text-xs text-slate-300">
                    {msg.role === 'assistant' ? <Bot className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    <span>{msg.author}</span>
                    <span>·</span>
                    <span>{msg.at}</span>
                  </div>
                  <p>{msg.text}</p>
                </article>
              ))
            )}
          </div>

          <div className="mt-4 space-y-3 border-t border-white/10 pt-3">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200 hover:border-accent-300"
                >
                  {reply}
                </button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                sendMessage(draft)
              }}
              className="flex gap-2"
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
              />
              <button className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-primary-950 hover:bg-accent-400">
                Enviar <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
