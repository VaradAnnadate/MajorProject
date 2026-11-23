-- RightsQuest queries for public.classroom_session_summaries.
-- Expected outputs are documented for the five rows in sample_classroom_summaries.csv.
-- Import that CSV first for the SELECT examples. Run each numbered query separately.
-- Write examples are wrapped in transactions and rolled back. Use a development DB.

-- 1. INSERT: demonstrate the same aggregate shape the backend writes.
BEGIN;
INSERT INTO public.classroom_session_summaries
  (quest_id, participant_count, vote_count, winning_option_id,
   winning_vote_count, majority_percentage, session_date)
VALUES ('playground-partition', 10, 9, 'share', 6, 67, DATE '2026-11-15')
RETURNING quest_id, participant_count, vote_count, winning_option_id, majority_percentage;
ROLLBACK;

-- 2. SELECT with filtering: sessions with at least 20 participants.
SELECT quest_id, participant_count, vote_count, session_date
FROM public.classroom_session_summaries
WHERE participant_count >= 20
ORDER BY session_date DESC;

-- 3. SELECT with sorting and limit: educator's recent-session pattern.
SELECT quest_id, winning_option_id, majority_percentage, session_date
FROM public.classroom_session_summaries
ORDER BY session_date DESC
LIMIT 3;

-- 4. Aggregate functions: overall number of sample sessions and mean class size.
SELECT count(*) AS sessions, sum(vote_count) AS submitted_votes,
       round(avg(participant_count), 1) AS avg_participants
FROM public.classroom_session_summaries;

-- 5. GROUP BY: session counts and average majority by dilemma.
SELECT quest_id, count(*) AS sessions,
       round(avg(majority_percentage), 1) AS avg_majority_percent
FROM public.classroom_session_summaries
GROUP BY quest_id
ORDER BY quest_id;

-- 6. HAVING: show dilemmas with at least two recorded sessions.
SELECT quest_id, count(*) AS sessions
FROM public.classroom_session_summaries
GROUP BY quest_id
HAVING count(*) >= 2
ORDER BY quest_id;

-- 7. JOIN: attach application-catalog labels to stored quest/option IDs.
-- The catalog is a VALUES snapshot of src/features/classroom/data/classroomQuests.js;
-- it is not a second database table in the current implementation.
WITH quest_options(quest_id, quest_title, option_id, option_label) AS (
  VALUES
    ('playground-partition', 'The Great Playground Partition', 'share', 'Make a fair schedule so everyone gets a turn.'),
    ('playground-partition', 'The Great Playground Partition', 'listen', 'Ask classmates what would help them join in.'),
    ('playground-partition', 'The Great Playground Partition', 'keep-rule', 'Keep the rule because it is already in place.'),
    ('classroom-meme', 'The Viral Classroom Meme', 'stop-share', 'Stop forwarding it and ask others to do the same.'),
    ('classroom-meme', 'The Viral Classroom Meme', 'check-in', 'Check privately with the classmate and a trusted adult.'),
    ('classroom-meme', 'The Viral Classroom Meme', 'ignore', 'Ignore it and hope the messages stop by themselves.'),
    ('midday-meal', 'The Great Midday Stew Question', 'adult-help', 'Tell a trusted teacher and ask them to check the serving plan.'),
    ('midday-meal', 'The Great Midday Stew Question', 'class-meeting', 'Ask the class to listen to everyone and make a shared plan.'),
    ('midday-meal', 'The Great Midday Stew Question', 'blame', 'Publicly blame the person serving lunch.')
)
SELECT s.session_date, q.quest_title, q.option_label AS winning_option,
       s.vote_count, s.winning_vote_count, s.majority_percentage
FROM public.classroom_session_summaries AS s
JOIN quest_options AS q
  ON q.quest_id = s.quest_id AND q.option_id = s.winning_option_id
ORDER BY s.session_date DESC;

-- 8. Subquery: find sessions whose class size is above the overall average.
SELECT quest_id, participant_count, session_date
FROM public.classroom_session_summaries
WHERE participant_count > (
  SELECT avg(participant_count) FROM public.classroom_session_summaries
)
ORDER BY participant_count DESC;

-- 9. UPDATE: reversible demonstration of correcting a summary value.
BEGIN;
WITH inserted AS (
  INSERT INTO public.classroom_session_summaries
    (quest_id, participant_count, vote_count, winning_option_id,
     winning_vote_count, majority_percentage, session_date)
  VALUES ('midday-meal', 10, 10, 'adult-help', 6, 60, DATE '2026-11-14')
  RETURNING id
)
UPDATE public.classroom_session_summaries AS s
SET majority_percentage = 70, winning_vote_count = 7
FROM inserted
WHERE s.id = inserted.id
RETURNING s.quest_id, s.winning_option_id, s.winning_vote_count, s.majority_percentage;
ROLLBACK;

-- 10. DELETE: reversible cleanup demonstration for a temporary test row.
BEGIN;
WITH inserted AS (
  INSERT INTO public.classroom_session_summaries
    (quest_id, participant_count, vote_count, winning_option_id,
     winning_vote_count, majority_percentage, session_date)
  VALUES ('classroom-meme', 8, 8, 'stop-share', 5, 63, DATE '2026-11-13')
  RETURNING id
)
DELETE FROM public.classroom_session_summaries AS s
USING inserted
WHERE s.id = inserted.id
RETURNING s.quest_id, s.session_date;
ROLLBACK;
