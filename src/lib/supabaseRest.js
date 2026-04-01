const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

async function dbFetch(path, init = {}) {
  if (!hasSupabaseConfig) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {}),
    },
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Supabase error ${response.status}`)
  }

  return response.status === 204 ? null : response.json()
}

export async function fetchPublicPosts() {
  return dbFetch('posts?select=id,title,body,tag,created_at,author:profiles!posts_author_id_fkey(id,username,full_name,favorite_sport,city)&order=created_at.desc')
}

export async function fetchPublicProfiles() {
  return dbFetch('profiles?select=id,username,full_name,city,favorite_sport&order=created_at.desc&limit=20')
}
