# 3. Normalization (implemented table)

## Starting point and anomalies

A denormalized report might store one row per session *and per vote*, repeating the quest name, option label, and participant count for every ballot. That creates update anomalies (renaming a quest requires many updates), insertion anomalies (a quest cannot be recorded until a vote exists), and deletion anomalies (deleting the last vote could erase the only copy of quest details). RightsQuest avoids persisting individual ballots and stores one aggregate row per completed session.

## 1NF

The implemented table is in **First Normal Form (1NF)**: each row is one session summary, each field is a single scalar value, and `id` uniquely identifies the row. There are no repeating vote or participant columns.

## 2NF

The table is in **Second Normal Form (2NF)**: the primary key is the single attribute `id`, so no non-key attribute depends on only part of a composite key. There is no composite primary key.

## Functional dependencies and 3NF

The row-identity dependency is `id → quest_id, participant_count, vote_count, winning_option_id, winning_vote_count, majority_percentage, session_date`. With the implemented single-column primary key, there are no partial dependencies, so the table reaches **2NF**.

However, the current table is **not strictly in 3NF**: `vote_count, winning_vote_count → majority_percentage`, because the backend calculates `round(winning_vote_count / vote_count * 100)`. Those two non-key fields determine another non-key field, creating a transitive dependency from `id` to the stored percentage. The application stores the rounded percentage to simplify the educator summary response, so this is deliberate denormalization. The backend computes the value from the counts on insert, but the database does not enforce that mathematical relationship; manual edits or other writers could make it inconsistent.

To reach 3NF, remove `majority_percentage` from the stored table and calculate it in the read query/API response as `round(winning_vote_count::numeric * 100 / vote_count)`. That is a proposed normalization improvement, not the current deployed schema, and would require updating the backend insert and summary-read mapping. The quest names and option labels remain in the source catalog rather than being duplicated into this table. The quest allowlist CHECK prevents unsupported quest IDs, but it is not a foreign key.

The quest names and option labels remain in the source catalog, not duplicated into this table. The quest allowlist CHECK prevents unsupported quest IDs, but it is not a foreign key. A future database-owned catalog would allow a normalized lookup table and foreign key.
