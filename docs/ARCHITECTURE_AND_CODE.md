# RightsQuest India — Architecture & Codebase Deep Dive

> **Governing Framework:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `02_ART_DIRECTION`, `04_TYPOGRAPHY_SYSTEM`, `05_MOTION_SYSTEM`, `11_FRONTEND_ARCHITECTURE`, `12_CREATIVE_QA`)  
> **Status:** Parts 01–06 Implemented & Verified · 5 dedicated test suites with 405/405 passing checks.
> **Core Mission:** An agency-grade, story-driven gamified children's rights learning platform designed for children aged 8–16 across India.

---

## 1. Architectural Philosophy & Technology Stack

RightsQuest India is built using **clean, standard React.js (JavaScript)** without heavy TypeScript compilation overhead, external database dependencies, or premature backend bloat. It prioritizes **aesthetic wonder, child psychology, legal fidelity, and 60fps performance**.

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
│   └── verify_part06.mjs                     # 104-point automated QA suite (Part 06 Intelligence System)
├── server/
│   └── classroom-server.js                    # Part 05 in-memory WebSocket room relay
├── public/                                   # Static public assets (favicons, manifest)
├── index.html                                # Accessible HTML5 document shell with font preconnects
├── vite.config.js                            # Manual chunk splitting (vendor, motion, icons, features)
├── package.json                              # Project manifest, scripts & dependencies
├── .gitignore                                # Strict exclusion of node_modules, dist, and local caches
└── src/
    ├── main.jsx                              # Application entrypoint with React.StrictMode
    ├── app/
    │   ├── App.jsx                           # Root component wrapping DemoLearnerProvider & Router
    │   └── router.jsx                        # React Router v6 definitions with dynamic lazy loading & /play/:scenarioId
    ├── context/
    │   └── DemoLearnerContext.jsx            # DPDP-compliant local state manager (profiles, intro, missionProgress)
    ├── data/
    │   ├── demoProfiles.js                   # 3 age bands & non-identifying learner personas
    │   ├── rightsCatalog.js                  # UNCRC 4 pillars, statutory articles, verified helplines
    │   ├── adventuresCatalog.js              # Curated everyday scenario quests
    │   └── navigation.js                     # Header navigation items & footer sitemap
    ├── features/                             # Modular feature domains
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

To uphold **Section 9 of India's Digital Personal Data Protection (DPDP) Act 2023**, RightsQuest collects **zero personal data**:
* No phone numbers, no email addresses, no passwords, and no real names.
* Learner data is stored strictly in browser `localStorage` under `rightsquest_demo_state_v1`.

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

The platform includes three automated test suites verifying **237 total assertions** across all layers of code:

```bash
# Run all 237 checks across Parts 01, 02, 03 & 04
npm test

# Run individual verification suites
npm run test:foundation   # 120 checks (Parts 01 & 02)
npm run test:part03       # 50 checks (Part 03 Scenario Engine)
npm run test:part04       # 67 checks (Part 04 Progression System)
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

---

## 7. Part 05 — Live Classroom Rooms

The Part 05 experience uses a browser-native WebSocket client and a small Node `ws` relay. Start both local processes with `npm run dev:classroom`; the room relay listens on port `8787` by default.

* **Room lifecycle:** The teacher selects one of three curated dilemmas. The relay creates an `RQ-####` room, accepts up to 40 students during the lobby, and advances through voting, result reveal, discussion, and completion.
* **Vote privacy:** The relay keeps each current vote in memory and sends only a vote count until the facilitator reveals results. After reveal, every client receives aggregate option counts. Individual vote-to-codename mappings are never included in room snapshots.
* **Child privacy:** The join form collects no account details or free-text name. The relay holds only a random participant token, an animal codename, and the current vote for the lifetime of the room. Student snapshots receive only a participant count; the facilitator alone sees animal codenames. The relay writes no room data to disk.
* **Disconnect handling:** If the teacher leaves, the relay closes the student connections and removes the room. Rooms expire after three hours; a relay restart clears all active rooms.
* **Deployment boundary:** This is a single-process prototype with in-memory state. Production hosting must provide a persistent WebSocket process and configure `CLASSROOM_ALLOWED_ORIGINS`; multi-process scaling or room recovery is not implemented.
