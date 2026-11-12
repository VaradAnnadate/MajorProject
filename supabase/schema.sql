-- RightsQuest classroom summaries.
-- Stores only coarse results from completed rooms with at least five submitted votes.
-- Never store room PINs, codenames, participant IDs, individual ballots, school names,
-- free-text notes, learner profiles, or Mitra AI messages in this table.

create table if not exists public.classroom_session_summaries (
  id uuid primary key default gen_random_uuid(),
  quest_id text not null check (
    quest_id in ('playground-partition', 'classroom-meme', 'midday-meal')
  ),
  participant_count integer not null check (participant_count between 5 and 40),
  vote_count integer not null check (vote_count between 5 and participant_count),
  winning_option_id text not null,
  winning_vote_count integer not null check (winning_vote_count between 1 and vote_count),
  majority_percentage integer not null check (majority_percentage between 1 and 100),
  session_date date not null default current_date
);

create index if not exists classroom_session_summaries_date_idx
  on public.classroom_session_summaries (session_date desc);

alter table public.classroom_session_summaries enable row level security;

-- This prototype has no educator sign-in yet. Deny direct browser access and let
-- only the Node backend's server-side Supabase secret key perform these operations.
revoke all on table public.classroom_session_summaries from public, anon, authenticated;
grant select, insert on table public.classroom_session_summaries to service_role;

comment on table public.classroom_session_summaries is
  'Anonymous aggregate classroom outcomes only; no individual student or room identifiers.';
