# Komanda Ryžys web app

Aplicación React + Vite para comunidad deportiva con experiencia multipágina:

- **Inicio**: propuesta de valor, features y comunidad.
- **Venues**: búsqueda y reservas rápidas con historial de bookings.
- **Leagues**: gestión de torneos, equipos, fixtures, standings y bracket.
- **Chats**: canales por contexto (capitanes, matchday, AI coach), respuestas rápidas y persistencia local.
- **Planes**: selección de pricing y activación de suscripción.
- **Social**: seguimiento de perfiles + feed especial personalizado por suscripciones.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notas

- La navegación entre páginas se hace en cliente usando `history.pushState`.
- El módulo de chats guarda mensajes en `localStorage` bajo la clave `kr-chat-rooms-v1`.
- Leagues mantiene persistencia local para no perder estado al recargar.

- El feed social guarda seguidos en `localStorage` con la clave `kr-social-following-v1`.


## Supabase

- Esquema inicial en `supabase/migrations/20260401_init.sql`.
- Guía de despliegue en `supabase/README.md`.
