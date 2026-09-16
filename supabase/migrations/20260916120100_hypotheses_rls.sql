-- RLS policy for a single-team internal tool without authentication.
-- Anyone holding the anon/publishable key can read and write hypotheses.
-- Replace these policies with auth.uid()-based rules before exposing the app publicly.

alter table public.hypotheses enable row level security;

drop policy if exists "hypotheses are readable by anyone" on public.hypotheses;
create policy "hypotheses are readable by anyone"
  on public.hypotheses
  for select
  to anon, authenticated
  using (true);

drop policy if exists "hypotheses are insertable by anyone" on public.hypotheses;
create policy "hypotheses are insertable by anyone"
  on public.hypotheses
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "hypotheses are updatable by anyone" on public.hypotheses;
create policy "hypotheses are updatable by anyone"
  on public.hypotheses
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "hypotheses are deletable by anyone" on public.hypotheses;
create policy "hypotheses are deletable by anyone"
  on public.hypotheses
  for delete
  to anon, authenticated
  using (true);
