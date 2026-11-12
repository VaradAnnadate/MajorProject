# RightsQuest India

A gamified learning platform that helps children in India understand their rights, recognize unsafe or unfair situations, and learn where to seek help.

> **Project brief:** Development of a gamified platform on Children's Rights to increase legal literacy and awareness among children in India. Source metadata: 2023 · Smart Education · Software · Ministry of Law and Justice.

## About

RightsQuest is designed for children ages 8–16. It turns child-rights topics into approachable, age-appropriate learning experiences using stories, interactive scenarios, and progressive learning modules. The goal is to help children make informed choices and feel more confident standing up for themselves and others.

The platform is intended to be inclusive across gender, language, ability, and socio-economic background. Learning content should use clear language, accessible interactions, and culturally relevant examples. Where a situation calls for real-world help, the experience should direct children to trusted adults and verified support services rather than imply that a game can provide legal representation or emergency assistance.

## Intended features

- **Scenario-based gameplay:** Interactive stories and challenges based on everyday situations involving children's rights.
- **Progressive learning paths:** Modular lessons that can adapt to a learner's age, progress, and needs.
- **Accessible, multilingual experience:** Simple navigation, inclusive multimedia, and language support.
- **Collaboration and community:** Opportunities to learn with peers and, where safely moderated, connect with experts and organizations.
- **Support-service information:** Clear routes to verified child-rights organizations and help services.

These are goals from the project brief. Update this section to distinguish implemented features from planned work as the prototype develops.

## Target audience

Children in India between 8 and 16 years old, with content and interaction patterns appropriate to different ages. Educators, caregivers, and child-rights organizations may also support learning and use of the platform.

## Project status

- **Part 01 Complete:** Application foundation, design system tokens, responsive application shell, Cormorant Garamond kinetic intro, Lenis smooth scroll, age selection prototype, learner home shell, and static catalog routes.
- **Part 02 Complete:** The Living Story World (*The World of Every Child*), 5 constitutional realms, Mitra the Sun-Fox Mascot (9 expressive states & child safeguard behavior), interactive 60fps SVG vector adventure map, and 6-scene cinematic landing storytelling.
- **Part 03 Complete:** Stateful branching scenario dialogue engine (`ScenarioRunner`), ethical decision trees (`ChoicePanel`), non-punitive consequence evaluation (`ConsequencePreview`), constitutional article reveal stamps (`ArticleRevealStamp`), tactile evidence inspector (`EvidenceInspector`), and `/play/:scenarioId` mission routing.
- **Part 04 Complete:** Dignity XP and rights passport, non-punitive streaks, collectible badges, and shared community goals.
- **Part 05 Complete:** Facilitators can host rights dilemmas in a PIN-protected classroom (`RQ-####`), students join with animal codenames, and private ballots reveal only aggregate consensus before a guided Socratic discussion. 64/64 automated test checks pass in `scripts/verify_part05.mjs`.
- **Database & Mitra AI:** Optional Supabase storage for completed anonymous classroom summaries and a server-side Groq chat endpoint for Mitra. The chat transcript scrolls within its panel, with the input kept available on small screens; the external-processing notice remains visible without a blocking acknowledgement checkbox. Learner profiles and AI chats are not saved to the database; see the [setup guide](docs/DATABASE_AND_MITRA_AI.md). Start the app and classroom relay together with `npm run dev:classroom`.
- **Part 06 Complete:** The Educator & Guardian Intelligence System. Educator Studio (`/educator`) provides cohort-level literacy metrics, live session launcher, NCERT Civics & CBSE curriculum alignments, Socratic toolkits, and deliberation archives. Guardian Chronicle (`/guardian`) provides a calm, non-surveillance window with "At the Dinner Table" discussion primers and anti-addiction guarantees compliant with DPDP Act 2023 §9. 104/104 automated test checks pass in `scripts/verify_part06.mjs`.
- **Cinematic 3D Sovereign Portal Tunnel Complete:** A signature 3D world-transition bridge connecting Scene 04 to Scene 05 on the landing page (`LandingScrollGateway.jsx`, `SovereignPortalTunnel.js`). Pinned scroll travel moves the camera straight into the 24-spoke Golden Ashoka Chakra of Child Rights, passes through a glowing dimensional warp tunnel, enters an expanding white-light burst, and seamlessly reveals Scene 05 underneath with zero empty space.
- **Gamified Level Milestones Complete:** High-vibe celebration modal (`GamifiedMilestoneCelebration.jsx`) for level advancement and quest completions with animated XP counters, shield crests, and harmonic sound synthesis. 25/25 checks pass in `scripts/verify_transition.mjs`.
- **Parts 07–08 Planned:** Multilingual localization, child safety emergency quick-exit, and offline PWA.

### Navigation layout

The navigation keeps the **Get Help (1098)** action visible at intermediate desktop widths, where the full link row would otherwise overflow. At those widths, the header shows the compact help action and menu toggle; the full desktop navigation appears at viewport widths of 2000px and above. On smaller screens, the existing menu toggle provides access to navigation links.

## Getting started

### Requirements
- Node.js (v18+ recommended)
- npm

### Installation & Run Commands
```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Start the app and the Part 05 WebSocket relay together
npm run dev:classroom

# Run all master automated QA, legal fidelity & child safety checks (Parts 01–06 + 3D Gateway: 430 checks)
npm test

# Run individual verification suites
npm run test:foundation   # 120 checks (Parts 01 & 02)
npm run test:part03       # 50 checks (Part 03 Scenario Engine)
npm run test:part04       # 67 checks (Part 04 Progression System)
npm run test:part05       # 64 checks (Part 05 Classroom System)
npm run test:part06       # 104 checks (Part 06 Intelligence System)
npm run test:transition   # 25 checks (3D Sovereign Portal Tunnel & Milestones)

# Build for production
npm run build
```

### Classroom relay

`npm run dev:classroom` starts the Vite app and a separate WebSocket relay on port `8787`. The browser connects to the same hostname as the app; set `VITE_CLASSROOM_WS_URL` at build time to use a different relay URL. For local-network devices, allow the exact Vite origin in the relay, for example:

```bash
CLASSROOM_ALLOWED_ORIGINS=http://192.168.1.40:5173 npm run dev:classroom
```

In production, run `node server/classroom-server.js` as a long-lived Node process, expose WebSockets through `wss://`, and set `CLASSROOM_ALLOWED_ORIGINS` to the app origin. Live room state remains in relay memory, while eligible completed rooms can save anonymous aggregates to Supabase. A relay restart closes active rooms and clears their codenames and votes.

### Supabase and Mitra AI

Copy `.env.example` to `.env`, add the Supabase and Groq server credentials, run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor, and start the frontend/backend with `npm run dev:classroom`. Mitra AI remains disabled until `MITRA_AI_ENABLED` and `VITE_MITRA_AI_ENABLED` are both set to `true`. Read the [database and Mitra setup guide](docs/DATABASE_AND_MITRA_AI.md) for the stored fields, privacy limits, and production configuration.

## Safety, privacy, and accessibility

Because the intended users are children, safety and privacy need to shape the product from the start:

- Collect as little personal information as possible and explain data use in child-friendly language.
- Avoid exposing children's identities, locations, or contact details to other users.
- Design any social features with strong moderation, reporting, and safeguarding procedures; do not enable unsupervised contact by default.
- Classroom sessions are facilitator-led: students cannot message one another. Room codenames and individual votes are kept only in relay memory and removed when the room closes or expires; only completed sessions with at least five votes may save an aggregate summary.
- Have child-rights content and support-service details reviewed by qualified, local experts and keep referrals current.
- Make clear that educational content is not a substitute for advice from a qualified professional or help from a trusted adult.
- Test with children only through an appropriate, safeguarded process, with informed consent and assent as applicable.
- Check the experience with accessibility guidance and children with varied language, literacy, and access needs.

## Deliverables in the project brief

1. A functional prototype demonstrating key features.
2. User-testing and feedback data about effectiveness and usability.
3. A report and presentation covering the development process, design decisions, technical challenges, and ethical considerations.

## Contributing

Contributions should prioritize child safety, factual accuracy, accessibility, and inclusive language. Please include evidence or expert review for changes to legal-rights content and support-service referrals.

## License

No license has been specified yet. Add a `LICENSE` file and update this section before distributing or reusing the project.
