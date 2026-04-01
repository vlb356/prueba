import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Database, Sparkles, UserPlus, Users } from 'lucide-react'
import { dbFetch, fetchPublicPosts, fetchPublicProfiles } from '../lib/supabaseRest'

export function SocialPage({ isSubscribed, notify, session }) {
  const [following, setFollowing] = useState([])
  const [feedMode, setFeedMode] = useState('following')
  const [creators, setCreators] = useState([])
  const [posts, setPosts] = useState([])
  const [syncError, setSyncError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      if (!session?.access_token || !session?.user) return

      try {
        const [dbProfiles, dbPosts, dbFollows] = await Promise.all([
          fetchPublicProfiles(session.access_token),
          fetchPublicPosts(session.access_token),
          dbFetch(`follows?select=following_id&follower_id=eq.${session.user.id}`, { method: 'GET' }, session.access_token),
        ])

        if (!mounted) return

        setCreators(
          dbProfiles.map((profile) => ({
            id: profile.id,
            name: profile.full_name || profile.username || 'User KR',
            sport: profile.favorite_sport || 'Sport',
            city: profile.city || 'Unknown city',
          })),
        )

        setPosts(
          dbPosts.map((post) => ({
            id: post.id,
            authorId: post.author?.id,
            title: post.title,
            body: post.body,
            tag: post.tag || 'General',
          })),
        )

        setFollowing(dbFollows.map((follow) => follow.following_id))
      } catch {
        if (!mounted) return
        setSyncError('No se pudieron cargar datos de Supabase. Revisa que existan perfiles/posts y políticas válidas.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [session])

  const toggleFollow = async (profileId) => {
    if (!session?.access_token || !session?.user) return

    try {
      const isFollowing = following.includes(profileId)

      if (isFollowing) {
        await dbFetch(
          `follows?follower_id=eq.${session.user.id}&following_id=eq.${profileId}`,
          { method: 'DELETE', headers: { Prefer: 'return=minimal' } },
          session.access_token,
        )
      } else {
        await dbFetch(
          'follows',
          {
            method: 'POST',
            body: JSON.stringify([{ follower_id: session.user.id, following_id: profileId }]),
          },
          session.access_token,
        )
      }

      const next = isFollowing ? following.filter((id) => id !== profileId) : [...following, profileId]
      setFollowing(next)
      notify(isFollowing ? 'Has dejado de seguir este perfil.' : 'Ahora sigues este perfil.')
    } catch {
      notify('No se pudo actualizar el seguimiento. Revisa RLS/policies de follows.')
    }
  }

  const feed = useMemo(() => {
    if (feedMode === 'featured') return posts
    return posts.filter((post) => following.includes(post.authorId))
  }, [feedMode, following, posts])

  if (!isSubscribed) {
    return null
  }

  return (
    <div className="section-shell space-y-8">
      <section className="glass rounded-3xl p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent-300">KR Social</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Sigue perfiles y crea tu feed especial</h1>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">
            <p className="inline-flex items-center gap-2">
              <Database className="h-4 w-4 text-accent-300" />
              {loading ? 'Sincronizando...' : 'Supabase conectado'}
            </p>
          </div>
        </div>

        {syncError ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-300/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" /> {syncError}
          </p>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-accent-300" />
            <h2 className="text-xl font-semibold">Perfiles</h2>
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
            <button onClick={() => setFeedMode('following')} className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'following' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}>
              Solo seguidos
            </button>
            <button onClick={() => setFeedMode('featured')} className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'featured' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}>
              Destacados
            </button>
          </div>

          <div className="space-y-3">
            {feed.map((post) => {
              const author = creators.find((profile) => profile.id === post.authorId)
              return (
                <article key={post.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-accent-300">{post.tag}</p>
                  <h3 className="mt-1 font-semibold">{post.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">por {author?.name || 'Perfil KR'}</p>
                  <p className="mt-2 text-sm">{post.body}</p>
                </article>
              )
            })}

            {!loading && feed.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-slate-300">No hay posts para tu filtro actual.</div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
