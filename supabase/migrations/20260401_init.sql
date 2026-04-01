-- Komanda Ryžys - Initial Supabase schema
-- Run this in Supabase SQL Editor or via Supabase CLI migrations.

create extension if not exists "pgcrypto";

-- Profiles linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  city text,
  favorite_sport text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subscription state
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_name text not null,
  status text not null check (status in ('active', 'inactive', 'canceled')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists subscriptions_user_active_idx
  on public.subscriptions(user_id)
  where status = 'active';

-- Social graph
create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint no_self_follow check (follower_id <> following_id)
);

-- Feed posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  tag text,
  visibility text not null default 'public' check (visibility in ('public', 'followers_only')),
  created_at timestamptz not null default now()
);

create index if not exists posts_author_created_idx on public.posts(author_id, created_at desc);

-- Chat
create table if not exists public.chat_rooms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  topic text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_members (
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_room_created_idx on public.chat_messages(room_id, created_at desc);

-- Venues and bookings
create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  sport text not null,
  price_per_hour numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'canceled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_user_created_idx on public.bookings(user_id, created_at desc);

-- Leagues
create table if not exists public.leagues (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  sport text not null,
  city text,
  season text,
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.leagues(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.fixtures (
  id uuid primary key default gen_random_uuid(),
  league_id uuid not null references public.leagues(id) on delete cascade,
  home_team_id uuid not null references public.teams(id) on delete cascade,
  away_team_id uuid not null references public.teams(id) on delete cascade,
  kickoff_at timestamptz,
  home_score int,
  away_score int,
  status text not null default 'scheduled' check (status in ('scheduled', 'played', 'canceled')),
  created_at timestamptz not null default now(),
  constraint different_teams check (home_team_id <> away_team_id)
);

create index if not exists fixtures_league_created_idx on public.fixtures(league_id, created_at desc);

-- Updated-at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.follows enable row level security;
alter table public.posts enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_members enable row level security;
alter table public.chat_messages enable row level security;
alter table public.venues enable row level security;
alter table public.bookings enable row level security;
alter table public.leagues enable row level security;
alter table public.teams enable row level security;
alter table public.fixtures enable row level security;

-- Policies: profiles
create policy "Profiles are readable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Policies: subscriptions
create policy "Users read own subscriptions"
  on public.subscriptions for select using (auth.uid() = user_id);

create policy "Users manage own subscriptions"
  on public.subscriptions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Policies: follows
create policy "Users read follows"
  on public.follows for select using (true);

create policy "Users manage own follows"
  on public.follows for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);

-- Policies: posts
create policy "Anyone can read public posts"
  on public.posts for select using (
    visibility = 'public'
    or author_id = auth.uid()
    or (
      visibility = 'followers_only'
      and exists (
        select 1 from public.follows f
        where f.follower_id = auth.uid() and f.following_id = posts.author_id
      )
    )
  );

create policy "Users create own posts"
  on public.posts for insert with check (auth.uid() = author_id);

create policy "Users update own posts"
  on public.posts for update using (auth.uid() = author_id);

create policy "Users delete own posts"
  on public.posts for delete using (auth.uid() = author_id);

-- Policies: chat
create policy "Members can read rooms"
  on public.chat_rooms for select using (
    exists (
      select 1 from public.chat_members m
      where m.room_id = chat_rooms.id and m.user_id = auth.uid()
    )
  );

create policy "Admins can manage rooms"
  on public.chat_rooms for all using (
    created_by = auth.uid()
  ) with check (created_by = auth.uid());

create policy "Members can read members"
  on public.chat_members for select using (
    exists (
      select 1 from public.chat_members self
      where self.room_id = chat_members.room_id and self.user_id = auth.uid()
    )
  );

create policy "Users join self to rooms"
  on public.chat_members for insert with check (auth.uid() = user_id);

create policy "Members read messages"
  on public.chat_messages for select using (
    exists (
      select 1 from public.chat_members m
      where m.room_id = chat_messages.room_id and m.user_id = auth.uid()
    )
  );

create policy "Members write messages"
  on public.chat_messages for insert with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.chat_members m
      where m.room_id = chat_messages.room_id and m.user_id = auth.uid()
    )
  );

-- Policies: venues/bookings
create policy "Anyone can read venues"
  on public.venues for select using (true);

create policy "Users read own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Users create own bookings"
  on public.bookings for insert with check (auth.uid() = user_id);

create policy "Users update own bookings"
  on public.bookings for update using (auth.uid() = user_id);

-- Policies: leagues
create policy "Anyone can read leagues"
  on public.leagues for select using (true);

create policy "Owners manage leagues"
  on public.leagues for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Anyone can read teams"
  on public.teams for select using (true);

create policy "League owner manage teams"
  on public.teams for all using (
    exists (
      select 1 from public.leagues l
      where l.id = teams.league_id and l.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.leagues l
      where l.id = teams.league_id and l.owner_id = auth.uid()
    )
  );

create policy "Anyone can read fixtures"
  on public.fixtures for select using (true);

create policy "League owner manage fixtures"
  on public.fixtures for all using (
    exists (
      select 1 from public.leagues l
      where l.id = fixtures.league_id and l.owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.leagues l
      where l.id = fixtures.league_id and l.owner_id = auth.uid()
    )
  );
