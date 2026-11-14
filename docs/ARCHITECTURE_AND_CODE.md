# RightsQuest India — Architecture & Codebase Deep Dive

> **Governing Framework:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `02_ART_DIRECTION`, `04_TYPOGRAPHY_SYSTEM`, `05_MOTION_SYSTEM`, `11_FRONTEND_ARCHITECTURE`, `12_CREATIVE_QA`)  
> **Status:** Parts 01–08 implemented · 8 dedicated test suites with 595/595 passing checks; field performance and assistive-technology audits remain pending.
> **Core Mission:** An agency-grade, story-driven gamified children's rights learning platform designed for children aged 8–16 across India.

---

## 1. Architectural Philosophy & Technology Stack

RightsQuest India is built using **standard React.js (JavaScript)** with a small Node backend for classroom WebSockets, anonymous aggregate storage, and the optional Mitra AI proxy. Learner profiles and progression remain local to the browser. It prioritizes **aesthetic wonder, child psychology, legal fidelity, and privacy by design**.

### Technology Stack Decisions:

| Technology | Version | Purpose in Architecture | Technical Rationale |
| :--- | :---: | :--- | :--- |
| **React.js** | `^18.3.1` | Component-based UI layer | Standard modern JavaScript. Fast declarative state rendering with zero compile friction. |
| **Vite** | `^5.4.11` | ESM build tool & dev server | Sub-second HMR, Rollup production bundling, and manual chunk code-splitting. |
| **React Router DOM** | `^6.28.0` | Client-side routing engine | Declarative route tree (`createBrowserRouter`) with dynamic `React.lazy()` chunking and fallback boundaries. |
| **Lenis** | `^1.3.27` | Inertia smooth scrolling | Creative OS buttery smooth scrolling that eliminates scroll jitter without scroll hijacking. |
| **GSAP** | `^3.15.1` | Timeline choreography & typewriter | High-precision typewriter text streams and dramatic multi-stage constitutional article reveals. |
| **Framer Motion** | `^11.11.17` | Motion & spring physics | Staggered choice card reveals, modal in-flow transitions, and sovereign spring physics. |
| **Lucide React** | `^0.460.0` | Vector interface iconography | Scalable, tree-shakeable SVG icons adhering to WCAG accessibility rules. |
| **Custom Tokenized CSS** | Pure CSS | Design system & styling | Zero Tailwind or CSS-in-JS runtime overhead; tokenized HSL variables and fluid clamp equations. |
| **@creative-os/core** | `^3.1.1` | Creative OS foundation tokens | Agency-grade sovereign easing curves, motion principles, and design system benchmarks. |
| **ws** | `^8.22.2` | Node classroom WebSocket relay | Small server-side transport for ephemeral facilitator-led rooms; browser clients use the native WebSocket API. |
| **Node Fetch API** | Node 18+ | Supabase PostgREST requests from the backend | Uses a server-only secret key without raising the project's Node runtime requirement. |
| **dotenv** | `^18.0.10` | Local Node environment loading | Loads backend credentials from `.env` without exposing server values to Vite. |

---

## 2. Master Directory Architecture

```
MajorProject/
├── docs/                                     # Comprehensive Technical Documentation
│   ├── README.md                             # Documentation index & system architecture diagram
│   ├── ROADMAP_PARTS_01_TO_08.md             # Master parts roadmap (Parts 01 to 08)
│   ├── ARCHITECTURE_AND_CODE.md              # This deep-dive codebase architecture guide
│   └── VISUAL_DESIGN_SYSTEM.md               # Visual identity, typography & motion guide
├── scripts/
│   ├── dev-classroom.mjs                     # Starts Vite and the Part 05 room relay together
│   ├── verify_foundation.mjs                 # 120-point automated QA suite (Parts 01 & 02)
│   ├── verify_part03.mjs                     # 50-point automated QA suite (Part 03 Scenario Engine)
│   ├── verify_part04.mjs                     # 67-point automated QA suite (Part 04 Progression System)
│   ├── verify_part05.mjs                     # 64-point automated QA suite (Part 05 Classroom System)
│   ├── verify_part06.mjs                     # 104-point automated QA suite (Part 06 Intelligence System)
│   ├── verify_transition.mjs                 # 25-point automated QA suite (3D World Transitions)
│   ├── verify_part07.mjs                     # 149-point automated QA suite (Part 07 Child Safety & Safeguards)
│   ├── verify_part08.mjs                     # 14-point automated QA suite (PWA & accessibility contracts)
│   ├── generate-service-worker.mjs            # Injects production precache assets and cache version
│   └── check-initial-bundle.mjs               # Enforces the initial route gzip budget
├── server/
│   └── classroom-server.js                    # Part 05 in-memory WebSocket room relay
├── supabase/
│   └── schema.sql                             # Aggregate classroom summary table with RLS
├── .env.example                               # Server and Vite configuration template
├── public/                                   # Static app icons, web manifest, and service-worker template
├── index.html                                # Accessible HTML5 document shell with font preconnects
├── vite.config.js                            # Build manifest and manual vendor/feature chunk splitting
├── package.json                              # Project manifest, scripts & dependencies
├── .gitignore                                # Strict exclusion of node_modules, dist, and local caches
└── src/
    ├── main.jsx                              # Application entrypoint with React.StrictMode
    ├── app/
    │   ├── App.jsx                           # Root component wrapping DemoLearnerProvider & Router
    │   └── router.jsx                        # React Router v6 definitions with dynamic lazy loading
    ├── pwa/                                  # Part 08 registration, install/offline UI, IndexedDB quest store
    ├── context/
    │   └── DemoLearnerContext.jsx            # DPDP-compliant local state manager (profiles, intro, missionProgress)
    ├── data/
    │   ├── demoProfiles.js                   # 3 age bands & non-identifying learner personas
    │   ├── rightsCatalog.js                  # UNCRC 4 pillars, statutory articles, verified helplines
    │   ├── adventuresCatalog.js              # Curated everyday scenario quests
    │   └── navigation.js                     # Header navigation items & footer sitemap
    ├── features/                             # Modular feature domains
    │   ├── safety/                           # Part 07: Child Safety, Help & Sensitive Disclosure Safeguards
    │   │   ├── components/                   # QuickExitButton, SafetyTopicCard, AgeBandSafetyView, VerifiedHelplineDirectory
    │   │   ├── hooks/                        # useSensitiveDisclosureGuard (non-gamified safety scanner)
    │   │   ├── data/                         # safetyTopics (3-tier age adaptation), verifiedSupportServices
    │   │   └── pages/                        # SafetyLibraryPage (/safety), GetHelpExperiencePage (/safety/get-help)
    │   ├── gameplay/                         # Part 03: Branching Scenario Engine & Decision Trees
    │   │   ├── index.js                      # Barrel export of gameplay components
    │   │   ├── data/
    │   │   │   └── scenarioScripts.js        # Branching dialogue AST scripts (Empty Bench, Whispering Screen)
    │   │   ├── engine/
    │   │   │   └── useScenarioEngine.js      # Core scenario state machine, chapter transitions & choices
    │   │   ├── components/
    │   │   │   ├── ScenarioRunner.jsx        # Full-screen gameplay orchestrator & in-flow controls
    │   │   │   ├── ScenarioRunner.module.css # In-flow dialogue layout & responsive controls
    │   │   │   ├── DialogueBox.jsx           # GSAP typewriter reveal & speaker variants
    │   │   │   ├── DialogueBox.module.css    # Typography, speaker badges & advance hints
    │   │   │   ├── ChoicePanel.jsx           # Staggered decision cards with sovereign easing
    │   │   │   ├── ChoicePanel.module.css    # Selected badges & hover photon borders
    │   │   │   ├── ConsequencePreview.jsx    # In-flow empathetic vs learning reflection feedback
    │   │   │   ├── ConsequencePreview.module.css # In-flow consequence card styling
    │   │   │   ├── ArticleRevealStamp.jsx    # Dramatic GSAP stamp drop & gold shimmer unlock
    │   │   │   ├── ArticleRevealStamp.module.css # Fullscreen obsidian celebration overlay
    │   │   │   ├── EvidenceInspector.jsx     # Cursor-tracking magnifying glass exhibit viewer
    │   │   │   ├── EvidenceInspector.module.css # Parchment document modal styling
    │   │   │   ├── MascotGuide.jsx           # Floating Mitra companion with 9 expressions & 1098 tag
    │   │   │   ├── MascotGuide.module.css    # Dynamic facial expressions & speech bubbles
    │   │   │   ├── ChapterProgress.jsx       # Linear saffron chapter progress indicator
    │   │   │   └── ChapterProgress.module.css # Saffron progress track styling
    │   │   └── pages/
    │   │       ├── ScenarioPage.jsx          # Route page (/play/:scenarioId) with pre-mission briefing
    │   │       └── ScenarioPage.module.css   # Briefing dossier styling & completion screens
    │   ├── world/                            # Part 02: Living Story World & Adventure Map
    │   │   ├── data/
    │   │   │   └── worlds.js                 # Data models for the 5 constitutional realms & landmarks
    │   │   ├── components/
    │   │   │   ├── WorldMap.jsx              # Central interactive SVG vector terrain & compass
    │   │   │   ├── WorldDestination.jsx      # Realm crest pins with pulsing auras & preview cards
    │   │   │   ├── WorldLandmark.jsx         # Discoverable landmark beacons granting secret lore
    │   │   │   ├── WorldAtmosphere.jsx       # Floating ambient spores & fireflies
    │   │   │   └── WorldDetailModal.jsx      # Deep-dive realm modal (lore, principles, mission previews)
    │   │   └── pages/
    │   │       └── WorldMapPage.jsx          # Dedicated fullscreen world map view (/world)
    │   ├── mascot/                           # Part 02: Mitra Companion System
    │   │   ├── data/
    │   │   │   └── mascotStates.js           # State definitions for Mitra across 9 emotional expressions
    │   │   └── components/
    │   │       ├── Mascot.jsx                # Expressive vector Sun-Fox character with speech bubble
    │   │       └── MascotReaction.jsx        # Docked floating companion widget for real-time guidance
    │   ├── storytelling/                     # Part 02: 6-Scene Cinematic Persuasion Spine
    │   │   └── components/
    │   │       ├── StoryHero.jsx             # Scene 01: The Invitation
    │   │       ├── StoryWorldParallax.jsx    # Scene 02: The World Awakens (5 connected realms)
    │   │       ├── StoryRightsMetaphor.jsx   # Scene 03: Discover the Meaning (Constitutional pillars)
    │   │       ├── StoryMascotIntro.jsx      # Scene 04: The Companion Stage (Interactive emotions)
    │   │       ├── StoryMapPortal.jsx        # Scene 05: The Adventure Begins (Live embedded map)
    │   │       └── StoryFinalCta.jsx         # Scene 06: Final Invitation & emergency 1098 assurance
    │   ├── progression/                      # Part 04: Living Progression System & Rights Passport
    │       ├── index.js                      # Barrel export of progression hooks, components & engine
    │       ├── data/                         # Progression constants, tiers, achievements & levels
    │       │   ├── rewardConfig.js           # XP reward values, multipliers, repeat policies
    │       │   ├── levels.js                 # 7 narrative recognition tiers (Level 1 to 7)
    │       │   ├── achievements.js           # 12 collectible tactile badges across 4 categories
    │       │   └── demoActivity.js           # Non-PII demo activity log seed data
    │       ├── engine/                       # Deterministic calculation engines
    │       │   ├── rewardEngine.js           # Idempotent XP event processing & transaction ledger
    │       │   └── streakEngine.js           # Non-punitive consistency tracking & streak shields
    │       ├── services/
    │       │   └── progressionPersistence.js # LocalStorage sync with safe fallback
    │       ├── hooks/
    │       │   └── useProgression.js         # Unified progression hook with real-time level & badge state
    │       ├── components/                   # Progression UI components
    │       │   ├── ProgressionHub.jsx        # Master tabbed progression container
    │       │   ├── ExplorerProfile.jsx       # Learner recognition dossier & stats strip
    │       │   ├── XPDisplay.jsx             # Level rank, XP points, and streak counter
    │       │   ├── LevelProgress.jsx         # Progress bar to next narrative recognition tier
    │       │   ├── AchievementCollection.jsx # Treasure cabinet & badge grid with category filters
    │       │   ├── AchievementDetail.jsx     # Tactile modal inspector for wax seal medallions
    │       │   ├── JourneyPath.jsx           # Vertical visual milestone path through Level 7
    │       │   ├── CooperativeProgress.jsx   # Shared national community quests & milestones
    │       │   ├── StreakCalendar.jsx        # 14-day consistency grid without punitive loss
    │       │   ├── ActivityJournal.jsx       # Immutable chronological activity audit trail
    │       │   └── RewardCelebration.jsx     # Fullscreen modal celebration on level-up or new badge
    │       └── pages/
    │           ├── ProgressionPage.jsx       # Dedicated /achievements & /progression route view
    │           └── ProgressionPage.module.css # Rights Passport page styling & typography
    │   ├── classroom/                        # Part 05: Facilitator-led live civics rooms
    │   │   ├── data/                          # Animal codenames and three discussion dilemmas
    │   │   ├── engine/                        # WebSocket transport and room-state definitions
    │   │   ├── hooks/useClassroomRoom.js      # Room connection, voting, and facilitator actions
    │   │   ├── components/                    # Student lobby, ballot, results, guide, and console
    │   │   └── pages/ClassroomPage.jsx        # /classroom and /classroom/:roomPin
    │   ├── mitra/                             # Optional Groq-backed child-safe guide chat
    │   │   └── MitraChat.jsx                  # Floating UI; messages stay in page memory
    │   ├── intelligence/                     # Part 06: Shared Intelligence & Permission Gateway
    │   │   ├── data/intelligenceData.js      # NCERT/CBSE alignments, dinner primers, session logs
    │   │   ├── hooks/useIntelligence.js      # Aggregated metrics & narrative timeline hooks
    │   │   └── components/
    │   │       ├── PermissionGateway.jsx     # Non-surveillance role gateway & persona switcher
    │   │       └── PermissionGateway.module.css
    │   ├── educator/                         # Part 06: Educator & Facilitator Studio
    │   │   ├── pages/EducatorPage.jsx        # /educator route workspace
    │   │   ├── pages/EducatorPage.module.css
    │   │   └── components/
    │   │       ├── ClassroomMetricsGrid.jsx  # Cohort-level aggregate metrics (zero individual ranks)
    │   │       ├── LiveSessionManager.jsx    # Bridge to launch Part 05 dilemmas with RQ-#### PIN
    │   │       ├── TopicExplorationChart.jsx # NCERT Civics (Grades 6–8) & CBSE unit mappings
    │   │       ├── DiscussionToolkitView.jsx # Socratic inquiry, bystander protocols & fishbowl guides
    │   │       └── RecentSessionsAudit.jsx   # Consensus outcome percentages & deliberation records
    │   └── guardian/                         # Part 06: Guardian Chronicle & Family Window
    │       ├── pages/GuardianPage.jsx        # /guardian route workspace
    │       ├── pages/GuardianPage.module.css
    │       └── components/
    │           ├── LearningHighlightsCard.jsx# Child recognition tier, wisdom XP & empathy focus
    │           ├── LearningTimelineView.jsx  # Chronological narrative learning milestones
    │           ├── FamilyConversationStarters.jsx # "At the Dinner Table" prompts & offline activities
    │           ├── SupportivePillarsGrid.jsx # Zero streak penalties & anti-addiction commitments
    │           └── GuardianResourcesAccordion.jsx # Plain-language RTE, POCSO & DPDP §9 guides
    │   └── transition/                       # Cinematic 3D World Transitions & Gateways
    │       ├── data/transitionWorlds.js      # 5 realm configurations, architecture & lighting presets
    │       ├── engine/WorldTransitionScene.js# Three.js 3D procedural architecture & camera flight
    │       ├── hooks/useWorldTransition.js   # Transition state, harmonic chimes & act milestones
    │       ├── components/
    │       │   ├── CinematicWorldTransition.jsx # Fullscreen 5-act 3D portal with white burst overlay
    │       │   └── LandingGatewayScene.jsx   # Pinned scroll-scrubbed gateway on landing page
    │       └── pages/TransitionPage.jsx      # /transition interactive gateway studio
    ├── components/
    │   ├── common/
    │   │   ├── EmergencyQuickBar.jsx         # Persistent 1098 Childline emergency quickbar
    │   │   └── IntroPreloader.jsx            # Kinetic Cormorant Garamond preloader
    │   ├── navigation/
    │   │   └── Navbar.jsx                    # Sticky navigation with mobile drawer & persona badge
    │   └── layout/
    │       ├── AppShell.jsx                  # Main application shell with Lenis scroll & outlet
    │       └── Footer.jsx                    # Editorial footer with 1098 callout & statutory index
    ├── pages/
    │   ├── LandingPage.jsx                   # Part 02 upgraded 6-scene cinematic landing page
    │   ├── AgeSelectionPage.jsx              # Age band switcher (8-10, 11-13, 14-16)
    │   ├── LearnerHomePage.jsx               # Personalized learner dashboard & world map banner
    │   ├── ExploreRightsPage.jsx             # Searchable catalog of articles & UNCRC pillars
    │   ├── AdventuresPage.jsx                # Story quest directory with direct quest launcher
    │   ├── AchievementsPage.jsx              # Rights passport & non-competitive dignity badges
    │   ├── GetHelpPage.jsx                   # Childline 1098, POCSO rules & safety guides
    │   └── AboutPage.jsx                     # Mission, DPDP 2023 compliance & pedagogy
    └── styles/
        ├── tokens.css                        # Color tokens, fluid clamp equations, sovereign easing
        ├── typography.css                    # Cormorant Garamond, Fraunces, Plus Jakarta Sans, Space Mono
        ├── motion.css                        # Laser beam animations, Lenis styles, reduced-motion rules
        ├── world.css                         # Part 02 map topography, beacon pulses, realm modal styles
        ├── mascot.css                        # Part 02 Mitra animations, ear twitches, lantern glow
        ├── storytelling.css                  # Part 02 parallax scenes, editorial cards, horizon gradients
        └── globals.css                       # Base resets, container tokens, skip link, accessible buttons
```

---

## 3. Deep Dive into Part 02 Features

### A. The Living World & Interactive Adventure Map (`src/features/world/`)

The centerpiece of Part 02 is **The World of Every Child**, an explorable illustrated territory mapping the constitutional rights of Indian children into five living realms:

#### 1. The Five Constitutional Realms (`src/features/world/data/worlds.js`):
1. **The Village of Belonging**
   * *Constitutional Basis:* Article 14 & 15(3) (Equality Before Law & Special Provisions for Children).
   * *UNCRC Pillar:* Participation & Survival.
   * *Visual Theme:* Warm Saffron (`#DE7215`) & Terracotta Ridge.
   * *Lore:* Built on the principle that no child sits outside the circle. Differences in mother tongue, disability, gender, or background enrich the community.
   * *Landmarks:* *The Whispering Banyan* (sanctuary for empathetic conflict resolution) and *The Inclusive Courtyard* (paved with ramps for all mobility aids).
2. **The Gardens of Growth**
   * *Constitutional Basis:* Article 21A & Right to Education (RTE) Act 2009.
   * *UNCRC Pillar:* Development.
   * *Visual Theme:* Forest Green (`#297652`) & Terraced Orchards.
   * *Lore:* Open-air reading pavilions where education, books, and midday meals are the birthright of every child aged 6–14.
   * *Landmarks:* *The Bell of the First Lesson* (fee barriers strictly prohibited) and *The Great Midday Cauldron* (nutritional support).
3. **The Forest of Safety**
   * *Constitutional Basis:* Protection of Children from Sexual Offences (POCSO) Act 2012 & Helpline 1098.
   * *UNCRC Pillar:* Protection.
   * *Visual Theme:* Peacock Blue (`#1B6D80`) & Cedar Pine Groves.
   * *Lore:* A protective canopy teaching body autonomy: "My body belongs to me alone," the power of "NO," and immediate access to trusted adults.
   * *Landmarks:* *The Guardian Boundary Stone* (safe vs. unsafe touch indicator) and *The 1098 Crystal Beacon* (toll-free confidential lifeline).
4. **The River of Voices**
   * *Constitutional Basis:* UNCRC Article 12 & Article 19(1)(a) (Freedom of Expression & Participation).
   * *UNCRC Pillar:* Participation.
   * *Visual Theme:* Deep Indigo (`#2C3E6B`) & Sparkling Waterways.
   * *Lore:* Carries wooden origami boats inscribed with children’s ideas to council tables, proving young age never means zero voice.
   * *Landmarks:* *The Bal Sansad Council Rock* (children’s democratic forum) and *The Bridge of Attentive Ears* (mutual respect bridge).
5. **The Haven of Dignity**
   * *Constitutional Basis:* Article 24 & Child Labour (Prohibition and Regulation) Amendment Act 2016.
   * *UNCRC Pillar:* Protection & Survival.
   * *Visual Theme:* Terracotta Red (`#D04F36`) & Sandstone Fortresses.
   * *Lore:* Decommissioned kilns and workshops proving children belong in classrooms and playgrounds, never behind factory looms.
   * *Landmarks:* *The Quenched Glass Furnace* (memorial of rescued child laborers) and *The Balanced Scales of Youth* (prioritizing childhood over commercial profit).

#### 2. Vector Map Technical Implementation (`WorldMap.jsx`):
* **60fps Native Vector Canvas:** Built using responsive `<svg viewBox="0 0 1000 650">` geometry without heavy WebGL/Three.js bundles.
* **Animated Dash Flow Trails (`world-trail-path`):** Connecting paths animate with continuous CSS stroke dash offsets, indicating navigable routes.
* **Ambient Atmosphere (`WorldAtmosphere.jsx`):** Spores and fireflies float across the canvas with randomized stagger, paused automatically under `prefers-reduced-motion`.
* **Mobile-Responsive Duality:** On screens $\le 768\text{px}$, users can toggle between the touch-pan map and a streamlined **Expedition Trail** list.

---

### B. Mitra the Guardian Companion (`src/features/mascot/`)

**Mitra** is the learner’s guide throughout RightsQuest. Designed with child psychologists and Creative OS principles in mind:
* **Character Archetype:** A mythical Indian Sun-Fox / Lantern Companion with terracotta fur, cream chest, and an arched fox tail holding a glowing lantern jewel.
* **Supportive, Not Authoritarian:** Mitra never tells the learner what to think; instead, Mitra asks reflective questions (*"How would you feel if you were in their shoes?"*).
* **Child Safeguard State Machine (`mascotStates.js`):**
  * Expresses 9 states: `idle`, `happy`, `curious`, `thinking`, `celebrating`, `encouraging`, `explaining`, `discovering`, and `concerned`.
  * **Critical Safeguard:** In the `concerned` state (during scenarios involving abuse, bullying, or exploitation), Mitra becomes calm, solemn, and protective. Mitra never jokes or plays upbeat animations during distress contexts, explicitly reassuring the child: *"You are never at fault. Dial 1098 toll-free anytime."*
* **Vector Animation (`Mascot.jsx` & `mascot.css`):**
  * Dynamic eye geometry (open catchlights, happy arcs, thoughtful glances, star sparkles).
  * Natural companion blink interval ($4.2\text{s}$) and subtle head bobbing.
  * Ears twitch independently (`earTwitchLeft`, `earTwitchRight`).
  * Lantern tail tip pulsates with warm radial glow.

---

### C. 6-Scene Cinematic Persuasion Spine (`src/features/storytelling/`)

Governed by Creative OS `44_AGENCYLIKE_UI`, the landing page is orchestrated as a continuous narrative rather than disconnected cards:
* **Scene 01 — The Invitation (`StoryHero.jsx`):** Editorial serif headline (*"Every child has a world of rights. Come discover yours."*), hero character placement, and instant map access.
* **Scene 02 — The World Awakens (`StoryWorldParallax.jsx`):** Five connected realms revealed across the terrain with key landmark previews.
* **Scene 03 — Discover the Meaning (`StoryRightsMetaphor.jsx`):** Translates the 4 UNCRC pillars (Survival, Development, Protection, Participation) into approachable visual metaphors.
* **Scene 04 — The Companion Stage (`StoryMascotIntro.jsx`):** Interactive Mitra character test bench where learners can test companion expressions.
* **Scene 05 — The Adventure Begins (`StoryMapPortal.jsx`):** Directly embeds the explorable world map as an interactive centerpiece.
* **Scene 06 — Final Invitation (`StoryFinalCta.jsx`):** High-conviction conclusion with age selection and emergency 1098 reassurance.

---

## 4. State Management & Privacy Architecture

### `src/context/DemoLearnerContext.jsx`

The learner prototype avoids identity fields and keeps the learner profile local to the browser:
* No phone numbers, email addresses, passwords, or real-name fields are part of the learner profile.
* Learner demo profiles and progression remain in browser `localStorage` under `rightsquest_demo_state_v1`.
* Completed classroom sessions are stored in Supabase only as anonymous cohort summaries after at least five votes; no room PINs, participant identifiers, codenames, or individual ballots are persisted.
* Mitra chat content is sent from the Node backend to Groq only when enabled and is not stored by RightsQuest. Groq's retention controls are external and documented in `docs/DATABASE_AND_MITRA_AI.md`.

```javascript
// State structure in DemoLearnerContext
{
  selectedAgeBand: 'band-11-13',         // 'band-8-10' | 'band-11-13' | 'band-14-16'
  activePersonaId: 'persona-kabir',      // Fictional non-identifying persona
  savedMissions: [],                     // In-progress story quests
  completedChapters: [],                 // Unlocked story milestones
  missionProgress: {},                   // In-progress checkpoints & completed scenarios
  introPlaying: false,                   // Kinetic preloader controller
  isDemoMode: true                       // Safe offline prototype flag
}
```

---

## 4. Deep Dive into Part 03 Features: Branching Scenario Engine (`src/features/gameplay/`)

Part 03 introduces the core interactive storytelling and branching dilemma engine of RightsQuest India:

### A. Scenario AST & Dialogue Parser (`src/features/gameplay/data/scenarioScripts.js`)
* **Stateful Dialogue Tree:** Scenarios are modeled as declarative abstract syntax trees (AST) containing chapters, speaker roles (`narrator`, `mitra`, character names), text strings, emotion states, interactive decision branches, and age-band adaptation (`textByAge`).
* **Production Scripts Authored & Runnable:**
  1. **Mission A: The Mystery of the Empty Bench (`scenario-01-bench`):**
     * *World Realm:* Gardens of Growth (Article 21A & RTE Act 2009).
     * *Storyline:* Chintu stops attending Standard 4 class due to economic distress. Classmates investigate, uncover the tea stall at the bus stand, learn about government midday meal schemes and free books, and help him return with dignity.
  2. **Mission B: The Forest of Unkind Words (`scenario-02-words`):**
     * *World Realm:* Village of Belonging (Articles 14 & 15(3) — Right to Equality & Dignity).
     * *Storyline:* A new student, Priya, faces teasing and exclusion in the schoolyard. Learners make active bystander interventions, defuse cyber/verbal harassment, and champion inclusive classroom environments.
  3. **Mission C: The Silent Workshop (`scenario-03-workshop`):**
     * *World Realm:* Haven of Dignity (Article 24 & Child Labour Prohibition and Regulation Amendment Act 2016).
     * *Storyline:* Exploring an unmonitored glassware and brickyard workshop where underage youth perform hazardous labour. Learners collect evidence, discover safe rehabilitation pathways, and learn how to alert local child welfare committees without endangering the child.
  4. **Digital Safety: The Whispering Screen & The Unknown Request (`scenario-02-screen`):**
     * *World Realm:* Haven of Dignity (POCSO Act 2012 & DPDP Act 2023 §9).
     * *Storyline:* Navigating online gaming chats, recognizing predatory manipulation, preserving privacy without guilt, and confiding in trusted guardians and Childline 1098.

### B. In-Flow Dialogue & Decision UI (`DialogueBox.jsx` & `ChoicePanel.jsx`)
* **GSAP Typewriter Stream & Reduced-Motion:** Dialogues render smoothly using a character stream ticker with full click-to-skip capabilities and speaker badge differentiation. Respects `prefers-reduced-motion` by displaying instantly without animation.
* **Age-Band Adaptation:** Automatically renders age-tailored vocabulary (`textByAge`) dynamically according to the active explorer profile (`8-10`, `11-13`, `14-16`).
* **In-Flow Action Controls:** The primary **Continue ›** and **Skip ››** buttons are located directly down from the active dialogue or question in natural reading order, adjusting responsively across mobile and desktop.
* **Staggered Decision Trees:** Choices animate into view using Framer Motion with Creative OS sovereign easing (`[0.16, 1, 0.3, 1]`). Cards highlight the chosen option (`✓ Your choice`) and dim unselected options without punitive "Game Over" states.

### C. In-Flow Consequence Evaluation (`ConsequencePreview.jsx`)
* **Empathetic vs. Learning Reflection:** Instead of punitive red fail screens, mistakes are framed as thoughtful learning moments with terracotta borders, while empathetic choices glow forest green.
* **Mitra Emotional Sync:** The companion immediately expresses appropriate emotional reactions (e.g. `concerned`, `happy`, `encouraging`) with custom SVG face rigs.
* **In-Place Feedback Card:** The consequence panel renders directly beneath the choice question, containing detailed story outcomes, dignity mastery scores, and an embedded **"Understand & Continue →"** button.

### D. Constitutional Article Reveal Stamp (`ArticleRevealStamp.jsx`)
* **Agency-Tier Celebration:** When a statutory milestone is resolved, a full-screen obsidian overlay drops a dramatic circular wax seal stamp with rotational wobble (`gsap.to(scale: 1.15, rotation: 0, ease: 'back.out(1.4)')`).
* **Statute Unlock:** Displays the unlocked constitutional article (e.g. Article 21A, Article 14, Article 24, or POCSO Act 2012), official title, legal summary, and golden radial shimmer before returning to the questline.

### E. Tactile Evidence Inspection Overlay (`EvidenceInspector.jsx`)
* **Interactive Document Inspection:** Triggered by dialogue nodes marked `type: 'evidence'`.
* **Cursor-Tracking Magnifying Glass:** An interactive SVG lens tracks pointer movement across parchment exhibits (such as attendance registers, handwritten notes, wage slips, and digital chat logs), letting children uncover clues firsthand.

### F. Persistent Safeguarding & Privacy Harbor (`ScenarioRunner.jsx`)
* **Childline 1098 Quick Bar:** A persistent top-bar button provides instant access to India's 24/7 toll-free Childline (1098) protocol at any moment during gameplay.
* **DPDP Act 2023 §9 Child Privacy Guarantee:** Strict architectural guarantee of zero personal identification inputs (no password, telephone, email, or biometric fields).
* **Dignity Milestones Over Arcade XP:** Completion screens celebrate constitutional knowledge, empathetic decision milestones, and safe harbor awareness rather than competitive arcade scoring.

## 5. Deep Dive into Part 04 Features: The Living Progression System (`src/features/progression/`)

Part 04 introduces a deterministic, non-punitive, and cooperative progression architecture designed to motivate continuous civic discovery without competitive anxiety:

### A. Central Reward Configuration & Idempotent XP Engine (`rewardConfig.js` & `rewardEngine.js`)
* **Single Source of Truth:** Centralized in `src/features/progression/data/rewardConfig.js`:
  - `MISSION_COMPLETION_XP`: 120 XP
  - `EMPATHETIC_CHOICE_XP`: 15 XP (per empathetic decision)
  - `EVIDENCE_INSPECT_XP`: 25 XP (tactile document inspection)
  - `RIGHTS_DISCOVERY_XP`: 30 XP (statutory rights topic)
  - `DAILY_LEARNING_BONUS`: 40 XP (calendar day activation)
  - `REPEAT_MISSION_XP`: 25 XP (anti-inflation replay policy)
* **Deterministic Idempotency:** Every transaction requires a unique event ID (`generateEventId(learnerId, eventType, sourceId, qualifier)`). Re-processing identical events (via reloads or page refreshes) is automatically rejected with zero duplicate XP awarded.
* **Audit Transaction Ledger:** Every point granted generates an immutable transaction object containing `id`, `learnerId`, `eventId`, `eventType`, `sourceId`, `amount`, `title`, `description`, `category`, and ISO `awardedAt` timestamp.

### B. Level & Journey Progression (`levels.js` & `LevelProgress.jsx`)
* **Civic Recognition Tiers:** 7 narrative milestones celebrating engagement and curiosity without implying formal legal certification:
  1. *Curious Explorer* (0–150 XP) — 🧭
  2. *Story Pathfinder* (151–350 XP) — 🗺️
  3. *Dignity Scout* (351–650 XP) — ⚖️
  4. *Rights Champion* (651–1050 XP) — 🛡️
  5. *Kindness Guardian* (1051–1550 XP) — 🌿
  6. *Voice of Change* (1551–2200 XP) — 📢
  7. *Guardian of Tomorrow* (2201+ XP) — 🌟
* **Real-time Level Calculation:** Pure calculation function computes level boundaries, current tier progress bar percentage, and remaining XP needed for the next recognition tier.

### C. Collectible Badges & Treasure Cabinet (`achievements.js`, `AchievementCollection.jsx`, `AchievementDetail.jsx`)
* **Tactile Skeuomorphism:** Badges resemble physical wax seal medallions and embossed story artifacts with custom silhouettes (`bell-seal`, `book-beacon`, `harmony-shield`, `scale-dignity`, `lock-hexagon`, etc.).
* **Four Artifact Categories:**
  - *Explorer Badges:* Seal of the First Bell, Wanderer of Realms, Keen Investigator.
  - *Constitutional Badges:* Beacon of the Classroom (Art 21A), Seal of Equal Ground (Arts 14 & 15(3)), Protector of Childhood (Art 24), Guardian of Safe Boundaries (POCSO Act).
  - *Kindness & Empathy Badges:* Courageous Ally (Active Bystander), Helpline Harbinger (1098), Heart of Compassion (100% Empathy).
  - *Discovery & Digital Safety:* Cyber Sentinel (DPDP Act §9), Harmony Builder (Cooperative Quests), Constitution Archivist (UNCRC 4 Pillars).
* **Tactile Detail Inspector:** Interactive modal dialog showcasing the enlarged wax seal with glowing radial aura, statutory legal references, learning outcomes, and discovery timestamps.

### D. Streaks Without Punishment (`streakEngine.js` & `StreakCalendar.jsx`)
* **Creative OS Anti-Addiction Policy:**
  - Missing a day **never** deducts XP.
  - Missing a day **never** removes unlocked badges or seals.
  - Zero guilt-inducing notifications or manipulative countdown timers.
  - Friendly welcome back: *"Welcome back, explorer! Your adventure was waiting for you."*
* **14-Day Calendar Window:** Visual participation strip displaying active quest days alongside a persistent child safety guarantee.

### E. Cooperative Community Progression (`CooperativeProgress.jsx`)
* **Product Differentiator:** Eliminates toxic individual leaderboards in favor of shared community milestones:
  - *The Pan-India Rights Grove:* Collective goal of 5,000 discovered rights.
  - *The Kindness Bench Initiative:* Collective goal of 2,500 active bystander interventions.
  - *The Safe Digital Village:* Collective goal of 2,000 cyber safety protections.
* **Child Safety Invariant:** Zero public usernames, zero personal ratings, and complete DPDP Act 2023 §9 compliance.

---

## 6. Automated Verification & QA Harness (`npm test`)

The platform includes eight automated test suites verifying **595 total assertions** across all layers of code:

```bash
# Run all 595 checks across Parts 01–08 and 3D Gateway
npm test

# Run individual verification suites
npm run test:foundation   # 120 checks (Parts 01 & 02)
npm run test:part03       # 50 checks (Part 03 Scenario Engine)
npm run test:part04       # 67 checks (Part 04 Progression System)
npm run test:part05       # 64 checks (Part 05 Classroom System)
npm run test:part06       # 104 checks (Part 06 Intelligence System)
npm run test:transition   # 25 checks (3D Sovereign Portal Tunnel & Milestones)
npm run test:part07       # 149 checks (Part 07 Child Safety & Safeguards)
npm run test:part08       # 16 checks (Part 08 PWA & Accessibility)
```

### Audit Categories:
1. **Foundation & Living World Files (44 checks):** Verifies all core components, pages, data files, and stylesheets exist.
2. **Child Safety Anti-Pattern Audit (20 checks):** Scans source code to ensure **zero** `<input type="tel">`, `<input type="email">`, `<input type="password">`, or competitive leaderboard rankings exist.
3. **Five Realms & Statutory Fidelity (21 checks):** Confirms all 5 realms are grounded in Articles 14, 15(3), 21A, 24, POCSO, and UNCRC Article 12, each with at least 2 landmarks and 2 mission previews.
4. **Mascot Integrity & Safeguards (10 checks):** Confirms all 9 mascot states exist and verifies the `concerned` state provides protective 1098 guidance.
5. **Creative OS Tokens & Accessibility (17 checks):** Audits `--ease-sovereign`, fluid font scales, HSL tokens, `:focus-visible` outlines, `.skip-to-content`, and $44\times 44\text{px}$ minimum button targets.
6. **Age Bands & Verified Helplines (8 checks):** Verifies 3 age bands and Childline 1098 marked as primary.
7. **Part 03 Scenario Engine Architecture (50 checks):** Verifies all 21 gameplay components, AST data fidelity for Missions A, B, and C, age adaptation hooks, GSAP typewriter animations, reduced-motion accessibility, route registration, `DemoLearnerContext` progress actions, and child data safety boundaries.
8. **Part 04 Progression System Architecture (67 checks):** Verifies 33 progression files, deterministic XP processing, strict event idempotency, repeat replay policies, level threshold calculations, badge evaluations across 4 categories, non-punitive streak logic, cooperative quest contributions, route registrations (`/achievements` and `/progression`), and DPDP Act 2023 §9 child privacy invariants.
9. **Part 05 Live Classroom Rooms Architecture (64 checks):** Verifies ephemeral WebSocket relay, PIN generation, animal codename selection, private secret voting, aggregate-only results reveal, Bal Sansad deliberation guides, and zero persistent storage of student votes.
10. **Part 06 Educator & Guardian Intelligence Architecture (104 checks):** Verifies shared curriculum mappings for NCERT Grades 6–8 Civics and CBSE units, Socratic inquiry questions, offline classroom/dinner table activities, cohort-level aggregate metrics, and strict DPDP Act 2023 §9 anti-surveillance compliance.
11. **3D Sovereign Portal Tunnel & Gamified Milestones (25 checks):** Verifies procedural Three.js 24-spoke Ashoka Chakra geometry, concentric glowing warp tunnel, luminous white-light threshold burst, harmonic Web Audio chime synthesis, sticky viewport pinning, and high-vibe milestone celebrations.
12. **Part 08 PWA & Accessibility Contracts (16 checks):** Verifies standalone manifest and install icons, app-shell offline fallback, network-only API behavior, IndexedDB quest caching, install/offline announcements, keyboard focus, and reduced-motion styles.

---

## 7. Part 05 — Live Classroom Rooms

The Part 05 experience uses a browser-native WebSocket client and a small Node `ws` relay. Start both local processes with `npm run dev:classroom`; the room relay listens on port `8787` by default. When Supabase credentials are configured, the backend writes a cohort summary at facilitator completion only when at least five votes were submitted.

* **Room lifecycle:** The teacher selects one of three curated dilemmas. The relay creates an `RQ-####` room, accepts up to 40 students during the lobby, and advances through voting, result reveal, discussion, and completion.
* **Vote privacy:** The relay keeps each current vote in memory and sends only a vote count until the facilitator reveals results. After reveal, every client receives aggregate option counts. Individual vote-to-codename mappings are never included in room snapshots.
* **Child privacy:** The join form collects no account details or free-text name. The relay holds only a random participant token, an animal codename, and the current vote for the lifetime of the room. Student snapshots receive only a participant count; the facilitator alone sees animal codenames. Supabase receives only the dilemma ID, class size, vote count, winning option and count, rounded percentage, and calendar date. It receives no room PIN, codenames, participant IDs, individual ballots, or free text.
* **Disconnect handling:** If the teacher leaves, the relay closes the student connections and removes the room. Rooms expire after three hours; a relay restart clears all active rooms.
* **Deployment boundary:** Live room state is still in a single process. Supabase persists anonymous aggregate summaries, but does not provide room recovery or multi-process WebSocket scaling. The educator summary endpoint is globally accessible and aggregate-only because educator login and institution-specific RLS are not implemented yet. Configure `CLASSROOM_ALLOWED_ORIGINS` and keep Supabase/Groq secret keys server-side.

---

## 8. Part 06 — Educator Studio & Guardian Intelligence System

Mounted at `/educator` and `/guardian`, Part 06 translates learner progress into actionable educational insight and familial dialogue without introducing child surveillance.

### A. Non-Surveillance Role Gateway (`PermissionGateway.jsx` & `useIntelligence.js`)
* Provides role switching between `learner`, `educator`, and `guardian`.
* Operates on aggregate local transactions without collecting personal tracking tokens or cloud analytics.
* Grounded in DPDP Act 2023 §9: no behavioral profiling, no tracking of minors, no individual surveillance.

### B. Educator Studio (`EducatorPage.jsx`)
* **ClassroomMetricsGrid:** Cohort-level aggregates for Wisdom XP, completed adventures, and deliberation sessions with zero individual scorecards.
* **LiveSessionManager:** Synchronous classroom dilemma launcher with instant PIN generation (`RQ-####`) and blind-voting workflows.
* **TopicExplorationChart:** Mappings of all 5 Constitutional Realms to middle-school NCERT Civics (Grades 6–8) and CBSE competencies, complete with offline classroom exercises.
* **DiscussionToolkitView:** Socratic inquiry protocols, active bystander de-escalation, and fishbowl deliberation methods.
* **RecentSessionsAudit:** Displays anonymous summaries read from Supabase for completed rooms with at least five submitted votes; records contain no PINs, names, codenames, or individual ballots.

### C. Guardian Chronicle (`GuardianPage.jsx`)
* **LearningHighlightsCard:** Warm parental window celebrating curiosity and empathy rather than screen time or competitive ranks.
* **LearningTimelineView:** Editorial narrative timeline documenting inspected evidence and discovered constitutional seals.
* **FamilyConversationStarters:** "At the Dinner Table" discussion prompts and screen-free household activities mapped to child rights.
* **SupportivePillarsGrid:** Anti-addiction guarantees including zero streak penalties, no infinite feeds, and child privacy protection.
* **GuardianResourcesAccordion:** Plain-language explainers on RTE Act, POCSO, Childline 1098, and digital privacy rights.

---

## 9. 3D Sovereign Portal Tunnel Transition Engine

Mounted on the landing page between Scene 04 (*Mitra the Companion*) and Scene 05 (*The 5 Realms Map*), this feature transforms scrolling into an immersive 3D fly-through.

### A. Procedural Three.js 3D Geometry (`SovereignPortalTunnel.js`)
* **Front Sovereign Seal ($Z = 0$):** 24 golden Ashoka spokes, dual gold rims, 4 cardinal rights medallions (*Survival, Protection, Development, Participation*), and wide central aperture ($R = 0.85$).
* **Dimensional Warp Tunnel ($Z = 0 \to -32$):** 11 concentric glowing golden rings, 8 longitudinal speed warp ribs, and 250 golden sparks.
* **Luminous End Beacon ($Z = -32$):** Expanding white beacon sphere and golden halo corona.
* **POV Camera Flight Path:** Driven continuously by user scroll progress ($t \in [0, 1]$), moving the camera from $(0, 0, 9.5)$ through the open seal hub down to $(0, 0, -31.8)$.
* **Memory & WebGL Lifecycle Management:** Deep mesh and material traversal with geometry disposal on unmount, avoiding context leaks or `forceContextLoss()` exceptions.

### B. Viewport Pinning & White-Light Threshold (`LandingScrollGateway.jsx`)
* **Sticky Viewport:** Embedded in a `260vh` scroll track with `position: sticky; top: 0; height: 100vh; height: 100dvh;`.
* **Zero Seam Canvas:** Rendered with `alpha: true` over `var(--color-canvas-primary, #FBF8F3)` background, completely eliminating dark boxes or color seams.
* **White-Light Screen Burst:** Overlay opacity ramps from $0 \to 1.0$ ($t \in [0.82, 0.94]$), holds at $1.0$, and clears smoothly ($1.0 \to 0$) by $t = 1.0$, seamlessly revealing Scene 05 underneath with zero empty space.
* **Harmonic Chime Synthesis:** Synthesizes an ambient four-note harmonic chord (A4, C#5, E5, A5) via native Web Audio API upon entering the white light core.

### C. Prologue Terminus Horizon & Realm Emergence
* **Prologue Terminus (`StoryMascotIntro.jsx` & `storytelling.css`):** At the end of Scene 04, an editorial terminus marks the apparent conclusion of the introductory landing page (*"The Introduction Ends Here. The Living Journey Awaits."*), giving the feeling that the page reaches an edge with only the 3D Sovereign Seal standing ahead.
* **Dimensional Emergence (`StoryMapPortal.jsx`):** As the white light clears, Scene 05 is revealed with a glowing emergence badge (*"✦ DIMENSIONAL PASSAGE COMPLETE · ARRIVED IN THE FIVE REALMS"*), presenting the interactive map not as a simple continuation, but as an unlocked second world.

---

## 10. Gamified Milestone Celebration System

Implemented in `GamifiedMilestoneCelebration.jsx`, this engine delivers high-vibe celebratory feedback for level advancement and quest completion.

* **Modal Overlay:** Semi-transparent frosted backdrop with sovereign spring entrance.
* **Animated Particle Fountains:** 32 radial celebration bursts with randomized golden trajectories and gravity decay.
* **Animated XP Surge Counter:** Smooth numeric interpolation from previous XP to newly awarded XP.
* **Constitutional Shield Crests:** Dynamic vector crests for the 5 Constitutional Realms.
* **Triumph Audio Fanfare:** Synthesizes an arpeggiated brass-and-bell chime chord on reveal.

---

## 11. Part 07 — Child Safety, Help & Sensitive Disclosure Safeguards

Mounted at `/safety` and `/safety/get-help`, Part 07 anchors RightsQuest India in statutory protection, child psychological safety, sensitive disclosure safeguards, and emergency reassurance.

### A. Child Safety & Rights Education Library (`SafetyLibraryPage.jsx` & `safetyTopics.js`)
* **Curriculum Coverage:** 6 comprehensive topics including *Personal Boundaries & Safe Touch*, *The Trusted Adult Network*, *Digital Safety & Privacy*, *Bullying & Digital Exclusion*, *The Right to Education*, and *Protection from Exploitative Labour*.
* **Three-Tier Age Adaptation Engine (`AgeBandSafetyView.jsx`):**
  * *Ages 8–10 (The Young Navigators):* Gentle, concrete definitions, physical world scenarios, and clear 3-step action rules.
  * *Ages 11–13 (The Pathfinders):* Nuanced peer dynamics, school and social-media scenarios, and active bystander strategies.
  * *Ages 14–16 (The Youth Advocates):* Statutory grounding under POCSO Act 2012, IT Act §67B, and Article 21A, legal rights of minors, and institutional accountability.

### B. Get Help Experience & Verified Statutory Directory (`GetHelpExperiencePage.jsx` & `verifiedSupportServices.js`)
* **Fact-Checked Helpline Registry:**
  * **Childline 1098:** Officially verified as 100% toll-free, 24/7 national service, operated by the Ministry of Women and Child Development (MWCD) under Mission Vatsalya, seamlessly integrated with ERSS-112.
  * **National Emergency Helpline 112:** Unified all-India emergency response.
  * **National Cyber Crime Reporting Helpline 1930:** Digital financial fraud and child sexual exploitation reporting.
  * **NCPCR POCSO e-Box:** Official direct digital complaint latch for child protection.
* **Trusted Adult Explainer (`TrustedAdultExplainer.jsx`):** A step-by-step guidance system teaching children who qualifies as a trusted adult, how to initiate conversation, and what to do if the first adult does not listen.

### C. Discreet Emergency Quick Exit Latch (`QuickExitButton.jsx`)
* **Immediate Privacy Shield:** Present on the global navbar and safety pages to allow a child to leave instantly if someone approaches their device.
* **Decoy Study Screen (`DecoyStudyScreen`):** Shows an authentic, neutral educational page (*"NCERT Class 7 Science — Chapter 11: Transportation in Animals and Plants"*) with realistic study notes and review questions.
* **Resume Capability:** Allows learners to cleanly resume their lesson with one click once in a safe space.

### D. Sensitive Disclosure Safeguard Scanner (`useSensitiveDisclosureGuard.js` & `SensitiveDisclosureModal.jsx`)
* **Non-Gamified Protective Scanner:** In-memory heuristic scanner that intercepts potential disclosures of abuse, violence, or distress.
* **Zero XP & Non-Exploitation Guarantee:** Strictly prohibits awarding XP, streaks, or badges for personal trauma disclosures.
* **Zero Persistence:** Disclosed text is never stored in localStorage, IndexedDB, or transmitted to any analytics endpoint or remote server.
* **Calm Reassurance:** Immediately interrupts gameplay or conversation to display gentle, non-judgmental guidance and direct contact bridges to Childline 1098 and trusted adults.

### E. Automated Verification Harness (`scripts/verify_part07.mjs`)
* 149 automated checks covering component mounting, age band calibration, statutory metadata, scanner heuristics, and Quick Exit latching.
* Total platform test baseline: **8 test suites with 595/595 passing assertions**.

---

## 12. Part 08 — Installable PWA, Offline Quests & Performance

### A. PWA shell and cache generation
* `public/manifest.webmanifest` declares the standalone app, shortcuts, SVG brand mark, and 192px/512px PNG icons.
* `src/pwa/registerServiceWorker.js` registers the root-scoped worker in production only.
* `scripts/generate-service-worker.mjs` builds a content-versioned precache from Vite output. The worker returns the cached HTML shell for offline SPA navigation, serves first-party static assets from cache, and bypasses `/api` and non-GET requests.
* The large Three.js vendor chunk is omitted from install-time precaching; its module is requested when the landing page's 3D section approaches the viewport and has a CSS fallback.

### B. Offline quest storage and learner controls
* `src/pwa/offlineQuestStore.js` stores fictional quest scripts in IndexedDB; it does not store learner profiles, progress, or chat transcripts.
* `AdventuresPage.jsx` provides a save action and status, and `ScenarioPage.jsx` reads the saved quest when offline.
* `PwaStatus.jsx` announces offline state and provides the native browser install prompt when that event is supported.

### C. Accessibility and performance verification
* `scripts/verify_part08.mjs` checks 16 source-level manifest, cache, IndexedDB, keyboard, and reduced-motion contracts.
* `scripts/check-initial-bundle.mjs` measures the gzip size of the initial shell plus landing route and fails production builds above 150 KiB; the current build is **130.8 KiB gzipped**.
* FCP on a 4G device, browser Lighthouse results, full screen-reader compatibility, and the Creative OS human sign-off still require manual release validation.

---

## 13. Immersive AR Explorer & Classroom Wall-Mounted Exhibits (`src/features/ar/`)

The **AR Explorer** (`/ar-explorer`) extends RightsQuest India into physical and spatial augmented reality learning, transforming constitutional education through compact, museum-grade educational exhibits mounted on classroom walls.

### A. Dual Experience Modes (Honest Architectural Distinction)
* **Mode A: Live Camera WebXR AR (Wall Placement):**
  - Uses standard WebXR `immersive-ar` with camera passthrough displaying the student's real physical room.
  - Detects vertical real-world surfaces (walls) via hit-test with pose normal alignment.
  - Mounts a compact 35–45 cm constitutional exhibit flush against the real classroom wall.
  - Zero raw camera video or photos are saved, recorded, or transmitted (DPDP Act 2023 §9 compliance).
* **Mode B: Virtual Classroom 3D Simulation (Wall Exhibit Fallback):**
  - Renders a complete 3D simulation of a modern Indian classroom with plaster rear wall, dynamic chalk blackboard, student study desk, and window daylight.
  - The constitutional artifact is mounted at eye level inside an architectural wall mounting frame with corner brackets, subtle wall contact drop-shadow, and an engraved brass identification plaque.
  - Mitra the Sun-Fox companion sits on an architectural wall display perch beside the exhibit.

### B. Scaled Constitutional Wall Exhibits Catalog (`arConstitutionalObjects.js`)
* **1. The Sovereign Ashoka Chakra:** ~43.6 cm diameter circular exhibit with 24 Dharma spokes and cardinal medallions (Preamble & Article 51A).
* **2. The Balance of Equality:** ~42.5 cm wide classical balance scale with calibrated equilibrium gauge and weighted tokens (Articles 14–18).
* **3. The Beacon of Expression:** ~35.4 cm tall Bal Sansad forum tower broadcasting concentric soundwaves (Article 19 & UNCRC 12).
* **4. The Shield of Bodily Safety:** ~37.7 cm tall protective shield deploying a translucent emerald sanctuary dome and 1098 beacon (Articles 21, 24 & POCSO).
* **5. The Scroll of Free Learning:** ~35.4 cm tall schoolhouse portal with swinging gates and unrolling Article 21A parchment (Article 21A & RTE Act).
* **6. The Crest of Legal Remedies:** ~37.7 cm tall pillar with 5 crystal writ facets firing light rays to the Apex Court crystal (Article 32).

### C. Three.js Spatial Engine Architecture (`ArSceneEngine.js`)
* **Wall Mounting Backplate (`buildWallMountingFrame`):** Slim dark slate-bronze panel (`0.88m x 0.88m x 0.032m`) with beveled trim, brass corner brackets with hex bolts, and contact drop-shadow plane.
* **Dynamic Canvas Textures:**
  - `renderBlackboardCanvas`: Dynamic chalk text on the teacher's blackboard with lesson numbers, article references, and core principles.
  - `renderPlaqueCanvas`: Dynamic brushed brass identification plaque beneath the artifact.
* **On-Screen Inspection Controls:**
  - `rotateExhibit(deltaAngle)`: Smooth rotational inspection around local Y axis.
  - `zoomExhibit(deltaScale)`: Proportional scale/zoom adjustment clamped safely between 0.45 and 2.2.
  - `resetExhibitTransform()`: Resets orientation and scale to default for the current mode.
  - `repositionExhibit()`: Allows re-scanning and placing the exhibit on another wall surface in AR mode.
* **Mitra Companion Integration:** Animated eye-blinking cycles, breathing, tail sway, and dynamic wisdom lantern light shifting across emotional states (`celebrating`, `thinking`, `concerned`, `explaining`).

### D. Quality Assurance & Automated Verification
* `scripts/verify_ar_explorer.mjs` enforces 44 source-level and behavioral assertions:
  - WebXR `immersive-ar` capability detection and session management.
  - Wall mounting frame and dynamic brass plaque canvas rendering.
  - On-screen inspection controls and AR repositioning.
  - Scale calibration across all 6 stations (~35–45 cm).
  - 3-tier age adaptation (8–10, 11–13, 14–16) with dilemma branching and physical consequence triggers.
  - DPDP Act 2023 §9 zero-PII camera compliance.
* Master platform automated QA score: **10 test suites with 657 / 657 passing assertions (100% pass rate)**.
