# 6. Query explanations and expected demo outputs

The outputs below assume the five rows in `sample_classroom_summaries.csv` are the only rows in the table. In Supabase Table Editor, import the CSV and run each SELECT in SQL Editor. Supabase may show rows in a different display order unless the query has `ORDER BY`.

1. **INSERT / RETURNING (rolled back):** returns `playground-partition | 10 | 9 | share | 67`; the transaction is rolled back so the demo row is not retained.
2. **Filter participant count ≥ 20:** three rows: playground-partition (24, 22, 2026-11-20), midday-meal (30, 27, 2026-11-18), classroom-meme (20, 19, 2026-11-16).
3. **Most recent three:** dates 2026-11-20, 2026-11-19, 2026-11-18, with the matching seeded quest and winning option IDs.
4. **Overall aggregate:** `sessions = 5`, `submitted_votes = 95`, `avg_participants = 20.8`.
5. **GROUP BY:** `classroom-meme: 2 sessions, 63.0%`; `midday-meal: 1 session, 67.0%`; `playground-partition: 2 sessions, 64.0%`.
6. **HAVING count ≥ 2:** classroom-meme (2), playground-partition (2).
7. **JOIN to catalog snapshot:** five rows, showing each quest title and winning option label. This is a SQL `VALUES` catalog snapshot for demonstration; the production app's catalog is in source code, not a database table.
8. **Subquery above average class size:** midday-meal (30), playground-partition (24); the average is 20.8.
9. **UPDATE / RETURNING (rolled back):** returns `midday-meal | adult-help | 7 | 70`; both the inserted demo row and update are rolled back.
10. **DELETE / RETURNING (rolled back):** returns `classroom-meme | 2026-11-13`; the inserted test row is rolled back.

These are expected results computed from the supplied sample CSV, not captured database screenshots. If other rows are present, clear the demo table first in a development project or adjust expectations. Never delete production classroom data just to match these outputs.
