import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Database, Heart, Sparkles, UserPlus, Users } from 'lucide-react'
import { createPost, dbFetch, fetchFollowing, fetchPublicPosts, fetchPublicProfiles } from '../lib/supabaseRest'

export function SocialPage({ isSubscribed, notify, session }) {
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [feedMode, setFeedMode] = useState('following')
  const [creators, setCreators] = useState([])
  const [posts, setPosts] = useState([])
  const [syncError, setSyncError] = useState('')
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState({ title: '', body: '', tag: 'General' })

  const token = session?.access_token
  const user = session?.user

  const loadSocial = async () => {
    if (!token || !user) return

    try {
      const [dbProfiles, dbPosts, relations] = await Promise.all([
        fetchPublicProfiles(token),
        fetchPublicPosts(token),
        fetchFollowing(token, user.id),
      ])

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
          createdAt: post.created_at,
        })),
      )

      setFollowing(relations.filter((row) => row.follower_id === user.id).map((row) => row.following_id))
      setFollowers(relations.filter((row) => row.following_id === user.id).map((row) => row.follower_id))
      setSyncError('')
    } catch {
      setSyncError('No se pudieron cargar datos de Supabase. Revisa que existan perfiles/posts y políticas válidas.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSocial()
  }, [token, user?.id])

  const toggleFollow = async (profileId) => {
    if (!token || !user) return

    try {
      const isFollowing = following.includes(profileId)

      if (isFollowing) {
        await dbFetch(
          `follows?follower_id=eq.${user.id}&following_id=eq.${profileId}`,
          { method: 'DELETE', headers: { Prefer: 'return=minimal' } },
          token,
        )
      } else {
        await dbFetch(
          'follows',
          { method: 'POST', body: JSON.stringify([{ follower_id: user.id, following_id: profileId }]) },
          token,
        )
      }

      await loadSocial()
      notify(isFollowing ? 'Has dejado de seguir este perfil.' : 'Ahora sigues este perfil.')
    } catch {
      notify('No se pudo actualizar el seguimiento. Revisa RLS/policies de follows.')
    }
  }

  const publishPost = async (event) => {
    event.preventDefault()
    if (!newPost.title.trim() || !newPost.body.trim()) return

    try {
      await createPost({ author_id: user.id, title: newPost.title.trim(), body: newPost.body.trim(), tag: newPost.tag, visibility: 'public' }, token)
      setNewPost({ title: '', body: '', tag: 'General' })
      notify('Actividad publicada.')
      await loadSocial()
    } catch {
      notify('No se pudo publicar la actividad.')
    }
  }

  const feed = useMemo(() => {
    if (feedMode === 'featured') return posts
    return posts.filter((post) => following.includes(post.authorId) || post.authorId === user?.id)
  }, [feedMode, following, posts, user?.id])

  const myPosts = posts.filter((post) => post.authorId === user?.id)

  if (!isSubscribed) return null

  return (
    <div className="section-shell space-y-8">
      <section className="glass rounded-3xl p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent-300">KR Social</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Perfil estilo Insta + actividad real</h1>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">
            <p className="inline-flex items-center gap-2">
              <Database className="h-4 w-4 text-accent-300" />
              {loading ? 'Sincronizando...' : 'Supabase conectado'}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xs text-slate-400">Publicaciones</p><p className="text-xl font-semibold">{myPosts.length}</p></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xs text-slate-400">Seguidores</p><p className="text-xl font-semibold">{followers.length}</p></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"><p className="text-xs text-slate-400">Siguiendo</p><p className="text-xl font-semibold">{following.length}</p></div>
        </div>

        {syncError ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-300/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" /> {syncError}
          </p>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <div className="space-y-6">
          <form onSubmit={publishPost} className="glass rounded-3xl p-5 space-y-2">
            <h2 className="text-lg font-semibold">Publicar actividad</h2>
            <input value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} placeholder="Título" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
            <textarea value={newPost.body} onChange={(e) => setNewPost((p) => ({ ...p, body: e.target.value }))} placeholder="¿Qué hiciste hoy?" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2" />
            <select value={newPost.tag} onChange={(e) => setNewPost((p) => ({ ...p, tag: e.target.value }))} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2">
              <option>General</option><option>Entrenamiento</option><option>Partido</option><option>Fitness</option>
            </select>
            <button className="rounded-xl bg-accent-500 px-4 py-2 font-semibold text-primary-950">Publicar</button>
          </form>

          <div className="glass rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-accent-300" /><h2 className="text-xl font-semibold">Perfiles</h2></div>
            <div className="space-y-2">
              {creators.filter((profile) => profile.id !== user?.id).map((profile) => {
                const isFollowing = following.includes(profile.id)
                return (
                  <article key={profile.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-xs text-slate-300">{profile.sport} · {profile.city}</p>
                    <button onClick={() => toggleFollow(profile.id)} className={`mt-2 rounded-lg px-3 py-1.5 text-sm ${isFollowing ? 'bg-white/15' : 'bg-accent-500 text-primary-950'}`}>
                      <UserPlus className="mr-1 inline h-3.5 w-3.5" /> {isFollowing ? 'Siguiendo' : 'Seguir'}
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent-300" /><h2 className="text-xl font-semibold">Actividad</h2></div>
            <div className="flex gap-2">
              <button onClick={() => setFeedMode('following')} className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'following' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}>Mi feed</button>
              <button onClick={() => setFeedMode('featured')} className={`rounded-lg px-3 py-2 text-sm ${feedMode === 'featured' ? 'bg-accent-500 text-primary-950' : 'bg-white/10'}`}>Global</button>
            </div>
          </div>

          <div className="space-y-3">
            {feed.map((post) => {
              const author = creators.find((profile) => profile.id === post.authorId)
              return (
                <article key={post.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span>{author?.name || 'Perfil KR'}</span>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-accent-300">{post.tag}</p>
                  <h3 className="mt-1 font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm">{post.body}</p>
                  <button className="mt-3 inline-flex items-center gap-1 text-xs text-slate-300"><Heart className="h-3.5 w-3.5" /> Me gusta</button>
                </article>
              )
            })}
            {!loading && feed.length === 0 ? <div className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-slate-300">Aún no hay actividad para mostrar.</div> : null}
          </div>
        </div>
      </section>
    </div>
  )
}
