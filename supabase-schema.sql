-- Execute este arquivo no SQL Editor do painel do Supabase uma única vez.
create table if not exists public.app_state (
  id bigint primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

drop policy if exists "app_state_select_publishable" on public.app_state;
drop policy if exists "app_state_insert_publishable" on public.app_state;
drop policy if exists "app_state_update_publishable" on public.app_state;
drop policy if exists "app_state_delete_publishable" on public.app_state;

create policy "app_state_select_publishable" on public.app_state
  for select to anon using (true);
create policy "app_state_insert_publishable" on public.app_state
  for insert to anon with check (id = 1);
create policy "app_state_update_publishable" on public.app_state
  for update to anon using (id = 1) with check (id = 1);
create policy "app_state_delete_publishable" on public.app_state
  for delete to anon using (id = 1);

grant select, insert, update, delete on public.app_state to anon;

