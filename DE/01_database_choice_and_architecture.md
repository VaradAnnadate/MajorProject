# 1. Database choice and architecture

## Choice

RightsQuest uses **Supabase PostgreSQL**, a relational SQL database, for completed classroom session summaries. These summary records have a fixed structure: quest identifier, participant count, submitted vote count, winning option identifier and count, rounded majority percentage, and session date. PostgreSQL provides typed columns, constraints, row-level security, and indexed sorting for the educator's recent-session view.

## Current data flow

```text
Browser -- WebSocket --> Node classroom backend -- Supabase REST/PostgREST --> PostgreSQL
   |                           |                                      |
   |                           +-- active room/votes in memory        +-- aggregate summaries only
   +-- learner progression in localStorage
```

The backend writes one aggregate row when a facilitator finishes a room if there are at least five student participants and five submitted votes. The educator interface reads the newest 50 summaries. Votes are not individually persisted. Learner progression also remains in browser local storage. Mitra chat messages are not written to this database.

## Access and consistency

The Supabase key stays on the Node backend. The browser roles `anon` and `authenticated` have no direct table privileges; RLS is enabled. This prototype has no educator sign-in, so allowed-origin checks are not user authentication. Summaries are ordinary PostgreSQL rows and reads are expected to reflect committed inserts. The application does not use a multi-row transaction for saving a summary: each summary is a single insert.

## Alternative considered

Browser local storage would avoid a backend database but would make educator summaries browser-specific and unavailable centrally. PostgreSQL was selected for the shared, structured aggregate records. A document database would add flexibility that this fixed summary shape does not currently need.

## Scale and current limits

The date index supports recent-summary sorting; the API limits results to 50 and the browser caches them for 15 seconds. Live room state is in one Node process's memory. At much higher concurrent classroom usage, room state and process availability would need a shared real-time/state service and horizontal-scaling design. Authentication and institution-scoped authorization are also prerequisites before exposing private school data.
