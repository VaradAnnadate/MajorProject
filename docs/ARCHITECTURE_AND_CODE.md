# RightsQuest India — Architecture & Codebase Deep Dive

> **Governing Framework:** Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `02_ART_DIRECTION`, `04_TYPOGRAPHY_SYSTEM`, `05_MOTION_SYSTEM`, `11_FRONTEND_ARCHITECTURE`, `12_CREATIVE_QA`)  
> **Status:** Parts 01 & 02 Implemented & Verified · 120/120 QA Tests Passing  
> **Core Mission:** An agency-grade, story-driven gamified children's rights learning platform designed for children aged 8–16 across India.

---

## 1. Architectural Philosophy & Technology Stack

RightsQuest India is built using **clean, standard React.js (JavaScript)** without heavy TypeScript scaffolding, external database dependencies, or premature backend bloat. It prioritizes **aesthetic wonder, child psychology, legal fidelity, and 60fps performance**.

### Technology Stack Decisions:

| Technology | Version | Purpose in Architecture | Technical Rationale |
| :--- | :---: | :--- | :--- |
| **React.js** | `^18.3.1` | Component-based UI layer | Standard modern JavaScript (no TypeScript compilation overhead). Fast declarative state rendering. |
| **Vite** | `^5.4.11` | ESM build tool & dev server | Sub-second HMR, Rollup production bundling, and fine-grained code splitting. |
| **React Router DOM** | `^6.28.0` | Client-side routing engine | Declarative route tree (`createBrowserRouter`) with dynamic `React.lazy()` chunking and fallback boundaries. |
| **Lenis** | `^1.3.27` | Inertia smooth scrolling | Creative OS buttery smooth scrolling that eliminates jitter without scroll hijacking. |
| **Framer Motion** | `^11.11.17` | Motion & spring physics | Smooth layout transitions, modal fade-ins, and companion gestures. |
| **Lucide React** | `^0.460.0` | Vector interface iconography | Scalable, tree-shakeable SVG icons adhering to WCAG accessibility rules. |
| **Custom Tokenized CSS** | Pure CSS | Design system & styling | Zero Tailwind or CSS-in-JS runtime overhead; tokenized HSL variables and fluid clamp equations. |

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
│   └── verify_foundation.mjs                 # 120-point automated QA, legal fidelity & safety test suite
├── public/                                   # Static public assets (favicons, manifest)
├── index.html                                # Accessible HTML5 document shell with font preconnects
├── vite.config.js                            # Manual chunk splitting (vendor, motion, icons, features)
├── package.json                              # Project manifest and scripts
├── .gitignore                                # Strict exclusion of node_modules, dist, and local caches
└── src/
    ├── main.jsx                              # Application entrypoint with React.StrictMode
    ├── app/
    │   ├── App.jsx                           # Root component wrapping DemoLearnerProvider & Router
    │   └── router.jsx                        # React Router v6 route definitions with dynamic lazy loading
    ├── context/
    │   └── DemoLearnerContext.jsx            # DPDP-compliant local state manager (profiles, intro, age bands)
    ├── data/
    │   ├── demoProfiles.js                   # 3 age bands & non-identifying learner personas
    │   ├── rightsCatalog.js                  # UNCRC 4 pillars, statutory articles, verified helplines
    │   ├── adventuresCatalog.js              # Curated everyday scenario quests
    │   └── navigation.js                     # Header navigation items & footer sitemap
    ├── features/                             # Modular feature domains
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
    │   └── storytelling/                     # Part 02: 6-Scene Cinematic Persuasion Spine
    │       └── components/
    │           ├── StoryHero.jsx             # Scene 01: The Invitation
    │           ├── StoryWorldParallax.jsx    # Scene 02: The World Awakens (5 connected realms)
    │           ├── StoryRightsMetaphor.jsx   # Scene 03: Discover the Meaning (Constitutional pillars)
    │           ├── StoryMascotIntro.jsx      # Scene 04: The Companion Stage (Interactive emotions)
    │           ├── StoryMapPortal.jsx        # Scene 05: The Adventure Begins (Live embedded map)
    │           └── StoryFinalCta.jsx         # Scene 06: Final Invitation & emergency 1098 assurance
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
    │   ├── AdventuresPage.jsx                # Story quest directory with world map switcher
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
  introPlaying: false,                   // Kinetic preloader controller
  isDemoMode: true                       // Safe offline prototype flag
}
```

---

## 5. Automated Verification & QA Harness (`scripts/verify_foundation.mjs`)

A custom Node.js verification test suite audits **120 automated assertions** covering every layer of the platform:

```bash
node scripts/verify_foundation.mjs
```

### Audit Categories:
1. **Foundation & Living World Files (44 checks):** Verifies all core components, pages, data files, and stylesheets exist.
2. **Child Safety Anti-Pattern Audit (20 checks):** Scans source code to ensure **zero** `<input type="tel">`, `<input type="email">`, `<input type="password">`, or competitive leaderboard rankings exist.
3. **Five Realms & Statutory Fidelity (21 checks):** Confirms all 5 realms are grounded in Articles 14, 15(3), 21A, 24, POCSO, and UNCRC Article 12, each with at least 2 landmarks and 2 mission previews.
4. **Mascot Integrity & Safeguards (10 checks):** Confirms all 9 mascot states exist and verifies the `concerned` state provides protective 1098 guidance.
5. **Creative OS Tokens & Accessibility (17 checks):** Audits `--ease-sovereign`, fluid font scales, HSL tokens, `:focus-visible` outlines, `.skip-to-content`, and $44\times 44\text{px}$ minimum button targets.
6. **Age Bands & Verified Helplines (8 checks):** Verifies 3 age bands and Childline 1098 marked as primary.

---

## 6. Handoff for Part 03 (Branching Scenario Engine)

With Part 02 complete, the application provides a seamless bridge into **Part 03 — Mission Gameplay, Scenarios, Decisions, Learning & Rewards**:
* **Mission Entry Points:** Preview cards inside `WorldDetailModal.jsx` and `AdventuresPage.jsx` are ready to dispatch into the Part 03 Scenario Engine.
* **Companion Reactions:** Mitra's state machine is ready to react to learner decisions during ethical dilemmas.
* **Progress Tracking:** `DemoLearnerContext.jsx` is primed to store completed chapters and unlocked constitutional stamps without requiring backend accounts.
