# Supabase setup

## 1) Crear proyecto
1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Copia `Project URL` y `anon public key` desde **Project Settings → API**.

## 2) Ejecutar la base de datos
Tienes dos opciones:

### Opción A: SQL Editor (rápida)
- Abre **SQL Editor**.
- Pega el contenido de `supabase/migrations/20260401_init.sql`.
- Ejecuta el script.

### Opción B: Supabase CLI (recomendada)
```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3) Variables de entorno frontend
Crea `.env.local` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## 4) Qué crea este esquema
- `profiles` y `subscriptions`
- `follows` y `posts` (feed social)
- `chat_rooms`, `chat_members`, `chat_messages`
- `venues`, `bookings`
- `leagues`, `teams`, `fixtures`

También incluye:
- RLS habilitado en todas las tablas
- Políticas base para lectura/escritura por usuario autenticado
- Trigger para `updated_at` en `profiles`
