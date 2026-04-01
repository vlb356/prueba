const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)
const sessionKey = 'kr-supabase-session-v1'

function ensureConfig() {
  if (!hasSupabaseConfig) throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

async function apiFetch(path, init = {}, token) {
  ensureConfig()

  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token || supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Supabase error ${response.status}`)
  }

  return response.status === 204 ? null : response.json()
}

export function saveSession(session) {
  window.localStorage.setItem(sessionKey, JSON.stringify(session))
}

export function getSavedSession() {
  const raw = window.localStorage.getItem(sessionKey)
  return raw ? JSON.parse(raw) : null
}

export function clearSavedSession() {
  window.localStorage.removeItem(sessionKey)
}

export async function signUpWithEmail(email, password) {
  return apiFetch('/auth/v1/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function signInWithEmail(email, password) {
  return apiFetch('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getAuthUser(token) {
  return apiFetch('/auth/v1/user', { method: 'GET' }, token)
}

export async function dbFetch(path, init = {}, token) {
  const headers = { Prefer: 'return=representation', ...(init.headers || {}) }
  return apiFetch(`/rest/v1/${path}`, { ...init, headers }, token)
}

export async function ensureProfile(user, token) {
  const username = `${(user.email?.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_]/g, '_')}_${user.id.slice(0, 6)}`
  return dbFetch(
    'profiles',
    {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify([
        {
          id: user.id,
          username,
          full_name: user.user_metadata?.full_name || username,
        },
      ]),
    },
    token,
  )
}

export async function fetchMyActiveSubscription(userId, token) {
  const rows = await dbFetch(
    `subscriptions?select=id,status,plan_name&user_id=eq.${userId}&status=eq.active&limit=1`,
    { method: 'GET' },
    token,
  )
  return rows[0] || null
}

export async function activateSubscription(userId, planName, token) {
  return dbFetch(
    'subscriptions',
    {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify([
        {
          user_id: userId,
          plan_name: planName,
          status: 'active',
          starts_at: new Date().toISOString(),
        },
      ]),
    },
    token,
  )
}

export async function fetchPublicPosts(token) {
  return dbFetch(
    'posts?select=id,title,body,tag,created_at,author:profiles!posts_author_id_fkey(id,username,full_name,favorite_sport,city)&order=created_at.desc',
    { method: 'GET' },
    token,
  )
}

export async function fetchPublicProfiles(token) {
  return dbFetch('profiles?select=id,username,full_name,city,favorite_sport&order=created_at.desc&limit=40', { method: 'GET' }, token)
}

export async function fetchLeagues(token) {
  return dbFetch('leagues?select=id,name,sport,city,season,owner_id,created_at&order=created_at.desc', { method: 'GET' }, token)
}

export async function createLeague(payload, token) {
  return dbFetch('leagues', { method: 'POST', body: JSON.stringify([payload]) }, token)
}

export async function fetchTeams(leagueId, token) {
  return dbFetch(`teams?select=id,league_id,name,created_at&league_id=eq.${leagueId}&order=created_at.asc`, { method: 'GET' }, token)
}

export async function createTeam(payload, token) {
  return dbFetch('teams', { method: 'POST', body: JSON.stringify([payload]) }, token)
}

export async function fetchFixtures(leagueId, token) {
  return dbFetch(`fixtures?select=id,league_id,home_team_id,away_team_id,kickoff_at,home_score,away_score,status,created_at&league_id=eq.${leagueId}&order=created_at.asc`, { method: 'GET' }, token)
}

export async function createFixture(payload, token) {
  return dbFetch('fixtures', { method: 'POST', body: JSON.stringify([payload]) }, token)
}

export async function updateFixtureResult(fixtureId, payload, token) {
  return dbFetch(`fixtures?id=eq.${fixtureId}`, { method: 'PATCH', body: JSON.stringify(payload) }, token)
}

export async function fetchEvents(token) {
  return dbFetch('events?select=id,title,description,event_at,city,created_by,created_at&order=event_at.asc', { method: 'GET' }, token)
}

export async function createEvent(payload, token) {
  return dbFetch('events', { method: 'POST', body: JSON.stringify([payload]) }, token)
}

export async function fetchFollowing(token, userId) {
  return dbFetch(`follows?select=follower_id,following_id,created_at&or=(follower_id.eq.${userId},following_id.eq.${userId})`, { method: 'GET' }, token)
}

export async function createPost(payload, token) {
  return dbFetch('posts', { method: 'POST', body: JSON.stringify([payload]) }, token)
}
