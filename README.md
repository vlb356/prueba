# Komanda Ryžys web app

Aplicación React + Vite conectada a Supabase, con acceso real por autenticación y suscripción.

## Estado funcional

- **Inicio**: landing pública (solo spoiler genérico, sin datos de base de datos).
- **Autenticación**: login/signup con Supabase Auth obligatorio para usar datos reales.
- **Suscripción**: activación real en tabla `subscriptions`.
- **Leagues & Events**: creación de ligas/eventos, equipos, fixtures y edición de resultados con clasificación dinámica.
- **Buscador social**: búsqueda en perfiles y actividad (posts, tags, ciudades, jugadores).
- **Venues Lituania**: catálogo inventado con sedes en Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys, Alytus, Marijampolė y Utena.
- **Social (estilo Insta)**: actividad propia, seguidores/siguiendo, publicación de actividad y feed personalizado.
- **Rutas premium** (`/venues`, `/leagues`, `/chat`, `/social`): bloqueadas si no hay suscripción activa.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Supabase

- Esquema base en `supabase/migrations/20260401_init.sql`.
- Módulo de eventos en `supabase/migrations/20260401_events.sql`.
- Guía de despliegue en `supabase/README.md`.
- Configura `.env.local` usando `env.frontend.example`.

## Seguridad de claves

- Frontend: **solo** `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
- Nunca uses `service_role`, `sb_secret` ni tokens secretos en cliente.
- Si una clave secreta fue compartida, rótala inmediatamente en Supabase Dashboard.
