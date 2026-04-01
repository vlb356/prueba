-- Events module for community leagues

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  city text,
  event_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists events_date_idx on public.events(event_at asc);

alter table public.events enable row level security;

create policy "Anyone can read events"
  on public.events for select using (true);

create policy "Users create own events"
  on public.events for insert with check (auth.uid() = created_by);

create policy "Owners update own events"
  on public.events for update using (auth.uid() = created_by);

create policy "Owners delete own events"
  on public.events for delete using (auth.uid() = created_by);
