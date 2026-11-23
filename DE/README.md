# RightsQuest — Data Engineering (DE)

This folder documents the database that RightsQuest currently uses for anonymous classroom outcome summaries. It distinguishes the deployed implementation from design recommendations so demonstrations do not overstate what the app currently persists.

## Contents

1. [Database choice and architecture](01_database_choice_and_architecture.md)
2. [Data model and ER diagram](02_data_model_and_er_diagram.md)
3. [Normalization](03_normalization.md)
4. [Implemented schema](schema.sql)
5. [Fictional sample records](sample_classroom_summaries.csv)
6. [Project queries and operations](06_queries_and_operations.sql) and [expected demo outputs](06_expected_outputs.md)
7. [Backend integration evidence](07_backend_integration.md)

## Important demo note

`sample_classroom_summaries.csv` contains fictional demonstration rows, not real classroom outcomes. Import only into a development/demo Supabase table. The IDs are omitted because PostgreSQL generates UUIDs. The app currently persists only aggregate classroom summaries; active votes are in server memory and learner progression is in browser `localStorage`.

The query file includes read-only queries and reversible write examples. Write examples are wrapped in transactions and rolled back. Run those only in a disposable development project, and execute one section at a time.
