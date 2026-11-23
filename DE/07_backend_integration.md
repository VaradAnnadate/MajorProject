# 7. Backend integration evidence

## Implemented integration path

1. The facilitator uses the classroom UI to finish a room.
2. `server/classroom-server.js` handles the `finish-room` action and calls `persistClassroomSummary(room)`.
3. The backend counts student participants and submitted votes from the in-memory room state. It saves nothing if either count is below five.
4. It calculates the winning option and rounded percentage, then sends one `POST` to Supabase REST (`/rest/v1/classroom_session_summaries`) using the server-only `SUPABASE_SECRET_KEY`.
5. The educator API handler reads up to 50 records ordered by `session_date` descending, maps quest/option IDs to labels from `CLASSROOM_QUESTS`, and returns aggregate data.
6. `src/features/classroom/engine/classroomApi.js` calls `/api/classroom/summaries`, coalesces an in-flight request, and caches the result for 15 seconds.

## Files to show as evidence

- `supabase/schema.sql`: table, constraints, index, RLS and grants.
- `server/classroom-server.js`: `persistClassroomSummary`, `listClassroomSummaries`, and `castVote`.
- `src/features/classroom/engine/classroomApi.js`: educator summary fetch and cache.
- `src/features/classroom/data/classroomQuests.js`: quest and option labels used when shaping the educator response.
- `src/features/educator/components/RecentSessionsAudit.jsx`: rendering of the returned recent summaries.

## Scope and limitations to state clearly

The implemented database integration demonstrates aggregate **insert** and **select**. It does not provide application-level update/delete flows for persisted summaries. Individual ballot CRUD is intentionally absent: active votes are in server memory and are not written to Supabase. Learner progression uses `localStorage`, not Supabase. The SQL file in this DE folder documents the implemented schema. The supplied CSV is for temporary demonstration only. The write examples in `06_queries_and_operations.sql` are independent SQL demonstrations and are rolled back; they do not mean the application exposes update/delete features.

There is no multi-row database transaction for summary persistence. A failed summary insert is logged and does not prevent the live room from finishing. The prototype has no educator authentication; origin checks alone are not authentication. Before using this for private school-specific records, add authentication, institution scoping, and appropriate RLS policies.
