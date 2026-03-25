# Komanda Ryžys (Baseline estable)

He dejado el proyecto en una versión **estable y funcional** para retomar desde aquí.

## Ejecutar
# Komanda Ryžys App (Vite + React + Tailwind)

Esta versión está enfocada como **app** (no solo landing):
- Discover de venues con búsqueda.
- Reserva de espacios con fecha/hora.
- Comunidad con join/leave de eventos.
- Bookings en tiempo real en la UI.
- Perfil y selección de plan.
- Capa de datos preparada para **Supabase** con fallback mock.

## 1) Instalar y ejecutar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estado actual

- UI base de la landing funcionando.
- Componentes principales activos: Hero, How it works, Features, AI visuals, Venues, Community, Leagues y Pricing.
- Ligas/Torneos como módulo completo: filtros por estado, listado de ligas, inscripción de equipos, clasificación, calendario y bracket.
- Sin automatismos extra ni scripts de reparación, para evitar complejidad y errores de merge.

## Próximo paso recomendado

A partir de esta base estable, podemos reintroducir funcionalidades de app (estado, bookings, eventos, Supabase) en pasos pequeños y validados.


## Troubleshooting

Si sólo ves la vista tipo app con tabs inferiores (Discover/Bookings/Community/Profile), estás en una versión antigua o con conflictos sin resolver en `src/App.jsx`.
Asegúrate de quedarte con la versión que renderiza todas las secciones de la landing (Hero, Leagues, Venues, Community, Pricing).
## 2) Conectar Supabase

Copia `.env.example` a `.env` y configura:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Si faltan estas variables, la app funciona en modo `mock`.

## 3) Tablas esperadas en Supabase

- `venues`: `id`, `name`, `sport`, `zone`, `slots`
- `events`: `id`, `name`, `sport`, `joined`, `attendees`
- `bookings`: `id`, `venue_id`, `venue_name`, `date`, `slot`, `created_at`

## 4) Arquitectura

- `src/App.jsx`: shell app-style con tabs, estado y flujos.
- `src/lib/supabaseClient.js`: cliente Supabase y detección de env.
- `src/lib/api.js`: capa de acceso a datos (Supabase + mock fallback).

## 5) Resolución rápida de conflictos

Si ves imports duplicados o errores de merge en `src/App.jsx`:

```bash
git checkout -- src/App.jsx
```

Luego aplica tus cambios encima del archivo limpio.
