import { useMemo, useState } from 'react'
import { Lock, Sparkles, UserPlus, Users } from 'lucide-react'

const creators = [
  { id: 'nora', name: 'Nora Plays', sport: 'Padel', city: 'Madrid' },
  { id: 'javi', name: 'Javi Matchday', sport: 'Basket', city: 'Valencia' },
  { id: 'lina', name: 'Lina Runner', sport: 'Running', city: 'Barcelona' },
  { id: 'tomas', name: 'Tomás Coach', sport: 'HIIT', city: 'Sevilla' },
]

const posts = [
  { id: 'p1', authorId: 'nora', title: 'Reto de volea cruzada', body: '20 repeticiones por lado + vídeo en cámara lenta.', tag: 'Técnica' },
  { id: 'p2', authorId: 'javi', title: 'Playbook rápido 3x3', body: 'Sistema para subir ritmo con bloqueos cortos.', tag: 'Estrategia' },
  { id: 'p3', authorId: 'lina', title: 'Rodaje base de miércoles', body: '40 min zona 2 + 8 rectas progresivas.', tag: 'Entrenamiento' },
  { id: 'p4', authorId: 'tomas', title: 'Circuito full body KR', body: '4 rondas, 6 estaciones, descanso 60 segundos.', tag: 'Fitness' },
]

export function SocialPage({ isSubscribed, notify }) {
  const [following, setFollowing] = useState(() => {
    const saved = window.localStorage.getItem('kr-social-following-v1')
    return saved ? JSON.parse(saved) : []
  })
  const [feedMode, setFeedMode] = useState('following')

  const toggleFollow = (profileId) => {
    const next = following.includes(profileId)
      ? following.filter((id) => id !== profileId)
      : [...following, profileId]

    setFollowing(next)
    window.localStorage.setItem('kr-social-following-v1', JSON.stringify(next))
    notify(next.includes(profileId) ? 'Ahora sigues este perfil.' : 'Has dejado de seguir este perfil.')
  }

  const feed = useMemo(() => {
    if (feedMode === 'featured') return posts
    return posts.filter((post) => following.includes(post.authorId))
  }, [feedMode, following])

  if (!isSubscribed) {
    return (
      <section className="section-shell">
        <div className="glass rounded-3xl p-8 text-center">
          <Lock className="mx-auto h-8 w-8 text-accent-300" />
          <h1 className="mt-4 text-3xl font-semibold">Activa tu suscripción para desbloquear Social Feed</h1>
          <p className="mt-3 text-slate-300">Cuando te suscribes, puedes seguir perfiles y crear un feed personalizado.</p>
        </div>
      </section>
    )
  }

  return (
    <div className="section-shell space-y-8">
      <section className="glass rounded-3xl p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">KR Social</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Sigue perfiles y crea tu feed especial</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Tu feed se adapta automáticamente a la gente que sigues.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-accent-300" />
            <h2 className="text-xl font-semibold">Perfiles recomendados</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {creators.map((profile) => {
              const isFollowing = following.includes(profile.id)
              return (
                <article key={profile.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-slate-300">{profile.sport} · {profile.city}</p>
                  <button
                    onClick={() => toggleFollow(profile.id)}
                    className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isFollowing ? 'bg-white/15 hover:bg-white/25' : 'bg-accent-500 text-primary-950 hover:bg-accent-400'
                    }`}
                  >
                    <UserPlus className="h-4 w-4" /> {isFollowing ? 'Siguiendo' : 'Seguir'}
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-300" />
            <h2 className="text-xl font-semibold">Feed especial</h2>
          </div>

          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setFeedMode('following')}
              className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'following' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}
            >
              Solo seguidos
            </button>
            <button
              onClick={() => setFeedMode('featured')}
              className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'featured' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}
            >
              Destacados
            </button>
          </div>

          <div className="space-y-3">
            {feed.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-slate-300">
                Aún no sigues a nadie. Sigue perfiles para construir tu feed personalizado.
              </div>
            ) : (
              feed.map((post) => {
                const author = creators.find((profile) => profile.id === post.authorId)
                return (
                  <article key={post.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-accent-300">{post.tag}</p>
                    <h3 className="mt-1 font-semibold">{post.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">por {author?.name}</p>
                    <p className="mt-2 text-sm">{post.body}</p>
                  </article>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
