import { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'
import { signInWithEmail, signUpWithEmail } from '../lib/supabaseRest'

export function AuthPanel({ onAuthSuccess, notify }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = mode === 'login' ? await signInWithEmail(email, password) : await signUpWithEmail(email, password)

      const session = response.session || response
      if (!session?.access_token || !session?.user) {
        notify('Revisa tu email para confirmar el registro antes de iniciar sesión.')
        return
      }

      onAuthSuccess(session)
      notify('Sesión iniciada correctamente.')
      setEmail('')
      setPassword('')
    } catch (error) {
      notify('Error de autenticación. Revisa credenciales y configuración Supabase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-shell">
      <div className="glass rounded-3xl p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Acceso obligatorio</p>
        <h2 className="mt-2 text-2xl font-semibold">Inicia sesión para usar datos reales</h2>
        <p className="mt-2 text-sm text-slate-300">Sin sesión no se muestran datos de base de datos.</p>

        <form onSubmit={submit} className="mt-5 grid gap-3 sm:max-w-md">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            required
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Contraseña"
            required
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-accent-300"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 font-semibold text-primary-950 hover:bg-accent-400 disabled:opacity-60" disabled={loading}>
            {mode === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />} {loading ? 'Cargando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        <button onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))} className="mt-3 text-sm text-accent-300 hover:text-accent-200">
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </section>
  )
}
