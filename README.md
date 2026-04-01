# Komanda Ryžys web app

Aplicación React + Vite conectada a Supabase, con acceso real por autenticación y suscripción.

## Estado funcional

- **Inicio**: landing pública (solo spoiler genérico, sin datos de base de datos).
- **Autenticación**: login/signup con Supabase Auth obligatorio para usar datos reales.
- **Suscripción**: activación real en tabla `subscriptions`.
- **Social**: perfiles, follows y feed cargados desde Supabase (sin datos mock).
- **Rutas premium** (`/venues`, `/leagues`, `/chat`, `/social`): bloqueadas si no hay suscripción activa.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Supabase

- Esquema inicial en `supabase/migrations/20260401_init.sql`.
- Guía de despliegue en `supabase/README.md`.
- Configura `.env.local` usando `env.frontend.example`.

## Seguridad de claves

- Frontend: **solo** `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- Nunca uses `service_role`, `sb_secret` ni tokens secretos en cliente.
- Si una clave secreta fue compartida, rótala inmediatamente en Supabase Dashboard.
