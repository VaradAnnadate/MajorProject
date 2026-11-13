# Supabase Database & Mitra AI Setup

This prototype connects the Node classroom backend to Supabase and Groq. The current database scope is deliberately narrow: it stores completed classroom outcomes only when at least five students submitted a vote. It does not cloud-sync learner profiles, progression records, or AI chats.

## Data flow

```text
Browser ── WebSocket ──> Node classroom backend ──> Supabase (aggregate session summary)
   │                           │
   └── HTTP chat request ──────┴──> Groq Chat Completions API
```

The Supabase secret and Groq API key are read only by the Node process. Do not name either key with a `VITE_` prefix; Vite embeds prefixed values into browser code. The public browser API has no authentication in this prototype. The classroom summary endpoint exposes only aggregate records and is restricted by allowed browser origins, which is not a substitute for authentication. Add educator sign-in, institution membership, and row-level access policies before using the dashboard for private or school-specific records.

## 1. Run the database SQL in Supabase

1. Open the Supabase project and go to **SQL Editor**.
2. Open [`../supabase/schema.sql`](../supabase/schema.sql), copy the full file, and run it.
3. Confirm that `public.classroom_session_summaries` exists with RLS enabled.

The table stores the dilemma ID, class size, number of submitted votes, winning option ID/count, rounded majority percentage, and calendar date. It does not store a room PIN, exact event time, student identifier, codename, ballot-by-student, school, or free-text note. Sessions with fewer than five submitted votes are not saved. Browser roles `anon` and `authenticated` have no table grants; the backend uses the Supabase secret key.

## 2. Add local environment values

Copy `.env.example` to `.env` and replace the placeholders:

```dotenv
CLASSROOM_PORT=8787
CLASSROOM_HOST=0.0.0.0
CLASSROOM_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SECRET_KEY=sb_secret_your_server_key

GROQ_API_KEY=gsk_your_groq_key
GROQ_MODEL=openai/gpt-oss-20b
MITRA_AI_ENABLED=false

VITE_CLASSROOM_WS_URL=ws://localhost:8787/classroom
VITE_API_BASE_URL=
VITE_MITRA_AI_ENABLED=false
```

Keep the Supabase secret and Groq key in server environment variables in production. Set `VITE_API_BASE_URL` to the backend's HTTPS origin when the app and backend have different origins, and set `CLASSROOM_ALLOWED_ORIGINS` to the exact frontend origin. The same-origin `/api` calls are proxied to the classroom backend during local Vite development.

## 3. Start the app and backend

```sh
npm install
npm run dev:classroom
```

The frontend is available at the Vite URL, and the Node backend listens on port `8787` by default. `npm run dev` starts only Vite; use `npm run dev:classroom` to run the backend too.

## 4. Mitra AI configuration

Mitra's small floating chat widget is disabled by default. After adding a Groq API key, set both `MITRA_AI_ENABLED=true` and `VITE_MITRA_AI_ENABLED=true`, then restart both processes. `GROQ_MODEL` selects the server-side model and defaults to `openai/gpt-oss-20b`.

The backend sends the current in-memory conversation (up to eight short messages) to Groq's Chat Completions endpoint. RightsQuest does not write prompts or replies to Supabase, local storage, or server logs. The chat clears when the page reloads. The backend rejects long inputs, limits requests per source IP in memory, checks the browser Origin against `CLASSROOM_ALLOWED_ORIGINS`, and times out slow requests. Origin checks and this basic rate limit do not provide user authentication or production abuse protection.

Mitra is scoped to children's rights and the Constitution of India, fairness and dignity, child safety and wellbeing, classroom dilemmas, and using RightsQuest. The system prompt tells it to decline unrelated requests (for example, recipes such as making pasta), offer a short reminder of its role, and answer only the in-scope part of mixed questions. This is a model instruction, so it reduces off-topic answers but cannot guarantee perfect topic enforcement.

The chat transcript scrolls within the fixed-height widget so the composer stays available on short screens and long conversations. The large privacy warning box and separate Groq acknowledgement checkbox are removed; a compact AI and safety notice remains in the footer. Opening the widget moves focus to the message input. The heading uses a high-contrast color against the dark header.

The widget tells children not to share identifying or private details, and provides a 1098 / 112 escalation instruction for urgent safety concerns. It also explains that responses can be wrong and that Mitra is not an emergency or counselling service. Prompt instructions are safeguards, not a guarantee that every model response will be safe or accurate; review the feature before making it available to children.

Groq is an external processor: its current documentation says inference requests are not retained by default, but inputs and outputs may be temporarily logged for reliability or suspected abuse for up to 30 days unless Zero Data Retention is enabled. Review the current [Groq data controls](https://console.groq.com/docs/your-data) and the applicable agreements before sending children's messages. RightsQuest does not control Groq's retention settings.

## Current boundaries

- Learner demo profiles and progression stay in browser `localStorage`; they are not synced to Supabase.
- The educator route currently shows global aggregate summaries, not school-separated data. Its role selector is a prototype permission boundary, not authenticated access control.
- Classroom summaries are inserted only after the facilitator completes a room and at least five votes are present. Failed database writes leave the live room flow running and do not save an individual ballot.
- Mitra conversation content is never written to the Supabase schema.
- Before private educator accounts or school-specific data are added, implement Supabase Auth, institution membership, and tested RLS policies. Do not solve access errors by granting browser roles unrestricted table access.
