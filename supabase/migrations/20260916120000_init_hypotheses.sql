-- Hypothesis tracker: single table holding every hypothesis and its lifecycle.

create table if not exists public.hypotheses (
  id uuid primary key default gen_random_uuid(),
  text text not null check (length(btrim(text)) > 0),
  channel text not null check (length(btrim(channel)) > 0),
  status text not null default 'new'
    check (status in ('new', 'testing', 'validated', 'invalidated')),
  result text,
  conclusion text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The list is always "newest first", optionally narrowed by status.
create index if not exists hypotheses_created_at_idx
  on public.hypotheses (created_at desc);

create index if not exists hypotheses_status_created_at_idx
  on public.hypotheses (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists hypotheses_set_updated_at on public.hypotheses;
create trigger hypotheses_set_updated_at
  before update on public.hypotheses
  for each row
  execute function public.set_updated_at();
