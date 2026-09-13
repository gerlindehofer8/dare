-- Couple Dare: optional Supabase schema. Run this in the Supabase SQL editor.
create table if not exists public.games (
  id uuid primary key default gen_random_uuid(), game_code text unique not null,
  current_player smallint not null default 0, current_round integer not null default 1,
  spice_score integer not null default 0 check (spice_score between 0 and 100),
  mode text not null, settings jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(), game_id uuid references public.games(id) on delete cascade not null,
  position smallint not null check (position in (0,1)), display_name text not null check (char_length(display_name) between 1 and 24),
  gender text not null, skips smallint not null default 3, unique(game_id, position)
);
create table if not exists public.custom_dares (
  id uuid primary key default gen_random_uuid(), owner_id uuid references auth.users(id) on delete cascade,
  text text not null check (char_length(text) between 1 and 280), category text not null, spice_level smallint not null check (spice_level between 1 and 5),
  target text not null default 'Beliebig', duration integer check (duration is null or duration between 1 and 3600), description text,
  is_special boolean not null default false, active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.game_dares (
  id uuid primary key default gen_random_uuid(), game_id uuid references public.games(id) on delete cascade not null,
  dare_id text not null, round integer not null, completed boolean, created_at timestamptz not null default now()
);
alter table public.games enable row level security;
alter table public.players enable row level security;
alter table public.custom_dares enable row level security;
alter table public.game_dares enable row level security;
-- Users can only manage their own synced dare library. Game sharing needs a server-side invite flow later.
create policy "Users manage their own custom dares" on public.custom_dares for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
