# RightsQuest India — Master Product & Engineering Roadmap (Parts 01–08)

> **Governing Framework:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `04_TYPOGRAPHY_SYSTEM`, `11_FRONTEND_ARCHITECTURE`, `12_CREATIVE_QA`)  
> **Target Audience:** Children in India aged 8–16 (The Young Navigators 8–10, The Pathfinders 11–13, The Youth Advocates 14–16), along with educators, caregivers, and child-rights organizations.  
> **Core Mandate:** Fostering legal literacy, curiosity, dignity, and real-world safety through interactive storybook adventures while strictly adhering to India's DPDP Act 2023 child safeguarding principles.

---

## Master Parts Matrix

| Part | Milestone Scope | Core Deliverables | Technical & Creative Stack | Status |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **Product foundation, architecture, design system & application shell** | Responsive React shell, design tokens, Cormorant Garamond cinematic intro, Lenis smooth scroll, laser-beam cards, demo state manager, 8 lazy routes, 66-point QA suite. | React 18, Vite 5, Lenis, Framer Motion, Semantic CSS Tokens. | **COMPLETE** |
| **02** | **Story world, mascot, interactive mission map & age-based journeys** | Five living realms (*The World of Every Child*), Mitra the Sun-Fox Mascot (9 expressive states & safeguard behavior), SVG interactive adventure map with connecting trails, 6-scene cinematic landing storytelling, 120-point QA harness. | SVG Terrain, Dynamic Vector Rigging, Parallax Scenes, Lenis Scroll. | **COMPLETE** |
| **03** | **Mission gameplay, scenarios, decisions, learning & rewards** | Stateful scenario dialogue engine, branching ethical decision trees, consequences preview, statutory article reveals, tactile evidence inspection. | State machine, Dialogue AST parser, GSAP & Framer Motion, 38-point QA suite. | **COMPLETE** |
| **04** | **XP, badges, streaks & cooperative progression** | Non-competitive dignity XP, rights passport stamp unlocks, empathy milestones, anti-addiction streak shields, shared community goals. | LocalStorage/IndexedDB sync, Web Audio API sound sprites. | **COMPLETE** |
| **05** | **Live classroom mode, quiz rooms & WebSocket integration** | Teacher-moderated multiplayer quiz rooms, collaborative consensus dilemmas, real-time live room state, zero PII child pseudonyms. | React WebSocket client, Node `ws` relay, in-memory ephemeral rooms. | **COMPLETE** |
| **06** | **Educator & Guardian Intelligence System** | Educator Studio (`/educator`), Guardian Chronicle (`/guardian`), NCERT/CBSE curriculum mapping, Socratic discussion toolkit, "At the Dinner Table" family primers, DPDP Act 2023 §9 compliance, zero child surveillance. | React 18, Tokenized CSS Modules, Shared Intelligence Layer, 104-point QA suite. | **COMPLETE** |
| **07** | **Child safety, help centre, legal resources & multilingual support** | Verified Childline 1098 routing, confidential incident reporting guide, POCSO e-Box info, localized language support (Hindi, Marathi, Tamil, Bengali). | i18n localization engine, emergency quick-dial bridges. | **PLANNED** |
| **08** | **PWA, offline functionality, testing & final polish** | Service worker asset caching, offline mission playback for rural low-connectivity schools, cross-browser audits, final deployment gates. | PWA Manifest, Workbox / SW cache, Lighthouse CI (95+ score). | **PLANNED** |

---

## Detailed Part-by-Part Specifications

### Part 01 — Product Foundation, Architecture, Design System & Application Shell (COMPLETED)
* **Objective:** Establish an agency-tier creative foundation, tokenized CSS architecture, and runnable React application shell without premature backend bloat.
* **Key Achievements:**
  * **Cinetic Intro Choreography:** Pure "RightsQuest" typography in high-fashion *Cormorant Garamond*, fading up into the dark canopy before the curved curtain lifts with a luminous laser streak.
  * **Lenis Smooth Scroll:** Integrated buttery inertia scrolling across all viewports.
  * **Laser Beam Card Effects:** Continuous rotating laser perimeter on the active quest dossier and hover sweeps across all cards and buttons.
  * **Code Splitting & Lazy Loading:** Core bundle dropped to **29.7 kB** with all 8 pages dynamically chunked via `React.lazy()`.
  * **Child Privacy by Design:** No identity fields in learner profiles; non-identifying demo personas for 8–10, 11–13, and 14–16 age bands. The optional Mitra AI feature has its own external-processing notice and does not persist chat content in RightsQuest.
  * **Quality Assurance:** 66/66 automated tests passing in `scripts/verify_foundation.mjs`.

---

### Part 02 — Story World, Mascot, Interactive Mission Map & Age-Based Journeys (COMPLETED)
* **Objective:** Transport the child into an imaginative digital story world (*The World of Every Child*) where India’s constitutional rights and UNCRC pillars become a living, explorable adventure terrain.
* **Key Achievements:**
  * **Five Living Illustrated Realms:**
    1. *The Village of Belonging* (Article 14 & 15(3) — Non-discrimination, inclusion, community circle)
    2. *The Gardens of Growth* (Article 21A & RTE Act 2009 — Free compulsory education, midday nutrition)
    3. *The Forest of Safety* (POCSO Act 2012 & Helpline 1098 — Safe touch, boundaries, trusted adults)
    4. *The River of Voices* (UNCRC Article 12 & Article 19(1)(a) — Freedom of expression, Bal Sansad)
    5. *The Haven of Dignity* (Article 24 & Child Labour Act 2016 — Freedom from exploitation, fair treatment)
  * **Mitra the Guardian Companion:**
    * Original vector illustrated Sun-Fox / Lantern companion with dynamic eyes, ear twitches, and glowing tail.
    * 9 emotional states: `idle`, `happy`, `curious`, `thinking`, `celebrating`, `encouraging`, `explaining`, `discovering`, and `concerned`.
    * Strict child safeguarding: Never trivializes violence/abuse; compassionate and serious in helpline and distress contexts.
  * **Interactive Illustrated Adventure Map:**
    * Living vector topography with winding connecting trails, compass rose, floating atmosphere spores, interactive destination crests, and discoverable golden landmark beacons.
    * Detailed realm modal view with environmental lore, constitutional wisdom, discoverable landmarks, and story quest previews.
    * Mobile responsive duality: interactive SVG canvas + accessible Expedition List trail.
  * **6-Scene Cinematic Persuasion Spine:**
    * Scene 01: The Invitation ("Every child has a world of rights. Come discover yours.")
    * Scene 02: The World Awakens (Five connected realms)
    * Scene 03: Discover the Meaning (Constitutional & UNCRC metaphors)
    * Scene 04: The Companion (Interactive Mitra Showcase)
    * Signature 3D Gateway Moment: Procedural Three.js 24-spoke Golden Ashoka Chakra fly-through with concentric warp tunnel and expanding white-light threshold
    * Scene 05: The Adventure Begins (Live embedded map)
    * Scene 06: Final Invitation (High-conviction closing CTA)
  * **Cinematic 3D Sovereign Portal Tunnel & Gamified Level Milestones:**
    * Three.js procedural 3D engine (`SovereignPortalTunnel.js`) featuring the 24-spoke Golden Ashoka Chakra of Child Rights & Constitutional Justice, 4 cardinal rights medallions, 11 glowing warp tunnel rings, and 250 golden sparks.
    * Pinned sticky scroll choreography (`LandingScrollGateway.jsx`): camera POV glides through the open central aperture ($R = 0.85$), travels down the dimensional tunnel ($Z = 9.5 \to -31.8$), enters a pure white-light burst, and fades out cleanly into Scene 05 with zero empty space.
    * Prologue Terminus Horizon (`.story-scene-terminus`): marks the end of Scene 04 so the introductory landing page appears to conclude right before the 3D Sovereign Seal.
    * Realm Emergence Banner (`.realm-emergence-banner`): marks entry into Scene 05 (*"DIMENSIONAL PASSAGE COMPLETE · ARRIVED IN THE FIVE REALMS"*), presenting the map as an unlocked second world.
    * Web Audio API ambient chime synthesis (A4, C#5, E5, A5) triggered on threshold entry.
    * High-vibe gamified milestone celebration modals (`GamifiedMilestoneCelebration.jsx`) integrated into Journey Path and Scenario completions with particle fountains, XP surge animations, and constitutional crests.
    * 25 dedicated QA checks in `scripts/verify_transition.mjs` (430 total project assertions across 6 test suites).
  * **Verification:** 120/120 foundation checks + 25/25 3D gateway & milestone checks passing cleanly.

---

### Part 03 — Mission Gameplay, Scenarios, Decisions, Learning & Rewards (COMPLETED)
* **Objective:** Build the core branching story engine where children make impactful ethical decisions in everyday situations.
* **Key Achievements:**
  * **Dialogue & Scenario Runner (`ScenarioRunner.jsx`):** Interactive visual novel layout with chapter progress, scene setting contextual strip, speaker labeling, and GSAP typewriter reveal text.
  * **Persistent Child Safeguarding Modal (`ScenarioRunner.jsx`):** One-click persistent access to India's 24/7 Childline 1098 protocol, emergency reassurance, and DPDP Act 2023 §9 zero-PII privacy guarantees.
  * **Age-Band Adaptation System (`DialogueBox.jsx`):** In-flow text adaptation rendering dynamic vocabulary according to explorer age group (`8-10`, `11-13`, `14-16`) alongside full `prefers-reduced-motion` compliance.
  * **Branching Choice Engine (`ChoicePanel.jsx` & `useScenarioEngine.js`):** Staggered Framer Motion decision cards allowing children to weigh immediate impulses against empathy and child rights.
  * **Consequence Preview System (`ConsequencePreview.jsx`):** Non-punitive feedback system categorizing choices into empathetic victories and thoughtful learning moments with Mitra emotional reactions.
  * **Constitutional Article Reveal Stamp (`ArticleRevealStamp.jsx`):** Full-screen celebration with dramatic GSAP stamp drop, rotation wobble, and radial gold shimmer unlocking Articles 21A, 14, 15(3), 24, RTE Act 2009, and POCSO Act 2012.
  * **Tactile Evidence Inspection Overlay (`EvidenceInspector.jsx`):** Cursor-tracking magnifying glass inspection for critical story documents and exhibits.
  * **Three Core Demonstration Missions + Digital Safety Quest:**
    1. *Mission A: The Mystery of the Empty Bench* (`scenario-01-bench`, Article 21A & RTE Act 2009).
    2. *Mission B: The Forest of Unkind Words* (`scenario-02-words`, Articles 14 & 15(3) Dignity & Equality).
    3. *Mission C: The Silent Workshop* (`scenario-03-workshop`, Article 24 & Child Labour Amendment Act 2016).
    4. *Special Mission: The Whispering Screen* (`scenario-02-screen`, POCSO Act 2012 & Online Safety).
  * **Direct Map & Catalog Routing:** World Map and Adventures catalog seamlessly launch directly into `/play/:scenarioId`.
  * **Verification:** 50/50 dedicated automated Part 03 test assertions passing cleanly in `scripts/verify_part03.mjs` (170/170 assertions overall).

---

### Part 04 — XP, Badges, Streaks & Cooperative Progression (COMPLETED)
* **Objective:** Motivate learning through positive behavioral reinforcement while avoiding toxic dark patterns, manipulative urgency, or competitive anxiety.
* **Key Achievements:**
  * **Deterministic Transactional XP Engine (`rewardEngine.js` & `rewardConfig.js`):** Centralized rule engine processing qualifying events (`MISSION_COMPLETED`, `EVIDENCE_INSPECTED`, `RIGHTS_DISCOVERY`, `HELPLINE_ACCESSED`, `COOP_CONTRIBUTED`, `DAILY_BONUS`). Pure idempotency checks prevent duplicate awards on reloads or re-opens.
  * **Narrative Recognition Tiers (`levels.js`):** 7 progression levels celebrating engagement and curiosity without false legal credentialing (Level 1: *Curious Explorer* through Level 7: *Guardian of Tomorrow*).
  * **Treasure Cabinet & Tactile Medallions (`AchievementCollection.jsx` & `achievements.js`):** 12 collectible artifacts with custom silhouettes, category filters (*Explorer*, *Constitutional*, *Kindness*, *Discovery*), and modal inspector (`AchievementDetail.jsx`).
  * **Non-Punitive Consistency Tracker (`streakEngine.js` & `StreakCalendar.jsx`):** 14-day participation grid that celebrates regular exploration while strictly guaranteeing zero loss of XP, badges, or passport stamps on days taken off to rest or study.
  * **Shared Community Quests (`CooperativeProgress.jsx`):** Collective milestones (*Pan-India Rights Grove*, *Kindness Bench*, *Safe Digital Village*) rewarding mutual progress with zero public child rankings or individual leaderboards (DPDP Act 2023 §9).
  * **Master Progression Hub (`ProgressionHub.jsx` & `ProgressionPage.jsx`):** Illustrated adventure archive mounted at `/achievements` and `/progression`, featuring the Explorer Profile, Journey Path, and real-time activity journal.
  * **Creative OS Agency UI & Quality Refinements:**
    * *Minimal White Scenario Briefing:* Redesigned `/play/:scenarioId` briefing screen with high-contrast minimal white editorial art direction (`#FFFFFF`), replacing AI gradient noise with Apple/Linear-level craft.
    * *Realm Detail Modal Containment:* Fixed flexbox clipping and nested scroll conflicts on `WorldDetailModal`, guaranteeing smooth scroll to story quests and action buttons across desktop and mobile.
    * *Mascot Speech Bubble Guard:* Enforced strict `showBubble` prop synchronization on `Mascot.jsx`, eliminating overlapping text in learner dossiers.
    * *AppShell Full-Screen Gameplay Isolation:* Removed bottom-gap translation bugs during `/play` routes, isolating story immersion with 100% viewport coverage.
  * **Full Mission & Navbar Integration:** Completing missions in Part 03 seamlessly grants XP, updates levels, logs transactions, and reflects live in the navigation bar and learner home.
  * **Automated QA Verification:** 67/67 dedicated automated Part 04 test assertions passing cleanly in `scripts/verify_part04.mjs` (237/237 total across all project suites).

---

### Part 05 — Live Classroom Mode, Quiz Rooms & WebSocket Integration
* **Objective:** Enable teachers and workshop facilitators to host live interactive rights sessions in schools and community centers.
* **Key Achievements:**
  * **Teacher Room Creator (`TeacherConsole.jsx`):** Creates an `RQ-####` PIN, selects one of three civics dilemmas, shows connected animal codenames, and guides each room stage.
  * **Child Quick Join (`ClassroomLobby.jsx`):** Students enter a PIN and choose one of eight animal codenames without providing a name, email, phone number, or account.
  * **Private Group Voting (`StudentVotingView.jsx`):** Students can update a vote until the facilitator closes the ballot. Option totals stay hidden until the facilitator reveals them.
  * **Consensus & Deliberation (`ConsensusChart.jsx`, `DebateGuide.jsx`):** Projector-ready aggregate results lead into a Bal Sansad listening guide with links to the Constitution of India and Right to Education Act.
  * **Ephemeral WebSocket Relay (`server/classroom-server.js`):** Validates room messages, keeps room membership and votes in process memory, supports up to 40 students per room, and deletes a room when the teacher leaves or its three-hour lifetime expires.
  * **Accessible Classroom Route:** `/classroom` hosts or joins a room, and `/classroom/:roomPin` opens the join screen with the PIN filled in. The responsive flow supports keyboard focus, reduced-motion preferences, and small screens.
  * **Local Development:** `npm run dev:classroom` starts the Vite app and classroom relay together. Set `CLASSROOM_ALLOWED_ORIGINS` to the exact Vite origin when testing from another device on the local network.
  * **Privacy boundary:** Individual votes and codenames are temporary and are not written to a database. After the facilitator completes a session with at least five submitted votes, Supabase stores only aggregate class size, vote count, winning option/count, rounded majority percentage, dilemma ID, and calendar date. Student clients receive only the class count, while the facilitator sees animal codenames during a live room. The relay is single-process; restarting it clears active rooms.
  * **Storage and AI setup:** `supabase/schema.sql` creates the restricted summary table. The optional Groq-powered Mitra chat is disabled by default, and RightsQuest does not store its conversation content. See `docs/DATABASE_AND_MITRA_AI.md` for server environment setup and Groq data-handling limits.

---

### Part 06 — Educator & Guardian Intelligence System (COMPLETED)
* **Objective:** Provide educators and guardians with curriculum-mapped tools, Socratic discussion primers, and non-surveillance learning insights without tracking child behavior or introducing competitive ranking.
* **Key Achievements:**
  * **Shared Intelligence Data & Hooks (`useIntelligence.js`, `intelligenceData.js`):** Unified data layer computing cohort-level metrics, chronological narrative learning timelines, and family prompts from actual progression transactions.
  * **Role-Aware Permission Gateway (`PermissionGateway.jsx`):** Non-punitive role boundaries between `learner` (default), `educator`, and `guardian` modes, with explicit DPDP Act 2023 §9 compliance guarantees.
  * **Educator Studio (`/educator`):**
    * *ClassroomMetricsGrid:* Cohort-level aggregates for Wisdom XP, completed adventures, unlocked constitutional seals, and facilitated deliberation sessions with zero individual scorecards.
    * *LiveSessionManager:* Direct bridge to launch Part 05 synchronous classroom dilemmas with instant room PIN display (`RQ-####`) and blind-voting workflows.
    * *TopicExplorationChart:* Deep mappings of the 5 Constitutional Realms to middle-school NCERT Civics (Grades 6–8) and CBSE learning competencies, complete with offline classroom exercises.
    * *DiscussionToolkitView:* Socratic inquiry protocols, active bystander de-escalation, and fishbowl deliberation methods for teachers.
    * *RecentSessionsAudit:* Anonymized collaborative consensus audit trail preserving majority outcome percentages without student names.
    * *Educator Legal Compendium:* RTE 2009 Section 17, POCSO mandatory reporting protocols, Childline 1098 escalation, and NCERT civics indicators.
  * **Guardian Chronicle (`/guardian`):**
    * *LearningHighlightsCard:* Warm parental window celebrating curiosity and empathy rather than screen time or competitive ranks.
    * *LearningTimelineView:* Editorial narrative timeline documenting tactile evidence inspected and constitutional articles discovered.
    * *FamilyConversationStarters:* "At the Dinner Table" prompts and screen-free household activities mapped to child rights.
    * *SupportivePillarsGrid:* Anti-addiction guarantees including zero streak penalties, no infinite feeds, and DPDP Act 2023 §9 protection.
    * *GuardianResourcesAccordion:* Plain-language explainers on RTE Act, POCSO, Childline 1098, and digital privacy rights.
  * **Automated QA Verification:** 104/104 dedicated automated Part 06 test assertions passing cleanly in `scripts/verify_part06.mjs` (405/405 total passing assertions across the master test harness).

---

### Part 07 — Child Safety, Help Centre, Legal Resources & Multilingual Support
* **Objective:** Ground the platform in real-world protection, regional inclusivity, and authoritative legal assistance.
* **Components to Build:**
  * **Direct 1098 Integration Gateway:** Clear, accessible emergency action paths connecting directly to the National Childline 1098 and 112 emergency services.
  * **Child Safety Safe-Exit Button:** A discreet emergency "Quick Exit" button that instantly replaces the screen with a neutral educational search page if a child feels unsafe.
  * **Multilingual Localization Engine (i18n):** Full support for major Indian languages:
    * Hindi (हिन्दी)
    * Marathi (मराठी)
    * Tamil (தமிழ்)
    * Bengali (বাংলা)
    * Kannada (ಕನ್ನಡ)
  * **Authoritative Legal Review Registry:** Verification documentation stamped by qualified legal experts, Child Welfare Committees, and child psychologists.

---

### Part 08 — PWA, Offline Functionality, Testing & Final Polish
* **Objective:** Deliver a resilient, production-ready Progressive Web App accessible on low-end hardware and spotty internet across rural India.
* **Components to Build:**
  * **Progressive Web App (PWA):** Web manifest, responsive app icons, standalone launch mode, and service worker caching.
  * **Full Offline Quest Playback:** IndexedDB caching allowing children in remote schools without active Wi-Fi to play adventures offline.
  * **Accessibility & Screen Reader Audit:** WCAG 2.1 AA compliance verification, full screen-reader keyboard tab navigation, and high-contrast color validation.
  * **Performance & Bundle Optimization:** Under 150 kB core bundle, sub-second First Contentful Paint (<0.8s) on 4G mobile devices.
  * **Awwwards / Creative OS Final Sign-Off:** Verification against the Creative OS 25-point pre-release gate.
