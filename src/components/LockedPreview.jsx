import { EyeOff } from 'lucide-react'

export function LockedPreview({ title = 'Contenido premium', message = 'Suscríbete para desbloquear esta sección.' }) {
  return (
    <section className="section-shell">
      <div className="glass rounded-3xl p-10 text-center">
        <EyeOff className="mx-auto h-8 w-8 text-accent-300" />
        <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">{message}</p>
      </div>
    </section>
  )
}
