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
| **03** | **Mission gameplay, scenarios, decisions, learning & rewards** | Stateful scenario dialogue engine, branching ethical decision trees, consequences preview, statutory article reveals, tactile evidence inspection. | State machine, Dialogue AST parser, Consequence evaluation engine. | **PLANNED** |
| **04** | **XP, badges, streaks & cooperative progression** | Non-competitive dignity XP, rights passport stamp unlocks, empathy milestones, anti-addiction streak shields, shared community goals. | LocalStorage/IndexedDB sync, Web Audio API sound sprites. | **PLANNED** |
| **05** | **Live classroom mode, quiz rooms & WebSocket integration** | Teacher-moderated multiplayer quiz rooms, collaborative consensus dilemmas, real-time live room state, zero PII child pseudonyms. | WebSockets / Socket.io client, ephemeral room channels. | **PLANNED** |
| **06** | **Teacher and parent dashboards** | Classroom legal literacy insights, discussion guides, curriculum mapping (NCERT / CBSE / State Boards), consent & safeguarding controls. | Analytical charts (accessible SVG), lesson plan export. | **PLANNED** |
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
  * **Child Privacy by Design:** Zero PII inputs; non-identifying demo profiles for 8–10, 11–13, and 14–16 age bands.
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
    * Scene 05: The Adventure Begins (Live embedded map)
    * Scene 06: Final Invitation (High-conviction closing CTA)
  * **Verification:** 120/120 automated test assertions passing cleanly.

---

### Part 03 — Mission Gameplay, Scenarios, Decisions, Learning & Rewards
* **Objective:** Build the core branching story engine where children make impactful ethical decisions in everyday situations.
* **Components to Build:**
  * **Dialogue & Scenario Runner:** Interactive visual novel / scenario layout with character dialog bubbles, scene illustrations, and mood indicators.
  * **Branching Choice Engine:** Multi-choice decision nodes where children can weigh immediate impulses against fairness, empathy, and statutory protection.
  * **Consequence Preview System:** Shows how decisions affect characters without punitive "Game Over" screens. A mistake is treated as a learning moment.
  * **Constitutional Article Reveal Moment:** When a dilemma is resolved, the relevant Indian law (e.g., Section 16 of RTE Act or Article 24) unlocks with a dramatic stamp animation.
  * **Tactile Evidence Inspection Overlay:** Magnifying glass inspection of notebooks, letters, or digital chat logs.

---

### Part 04 — XP, Badges, Streaks & Cooperative Progression
* **Objective:** Motivate learning through positive behavioral reinforcement while avoiding toxic dark patterns or competitive anxiety.
* **Components to Build:**
  * **Dignity XP (Knowledge Sparks):** Points earned through thoughtful choices and completing legal quests.
  * **Rights Passport & Stamp Seals:** Tactile physical stamps rendered with wax seal and embossed paper effects that unlock inside the child’s local passport.
  * **Anti-Addiction Streak Protectors:** If a child misses a day, their progress is never wiped or penalized.
  * **Cooperative Community Milestones:** Collective goals (e.g., "1,000 children across India learned about cyber safety this week") fostering shared unity.
  * **Audio Sprites:** Subtle interactive acoustic sounds (page turns, stamp thud, gentle chime) using Howler.js or Web Audio API.

---

### Part 05 — Live Classroom Mode, Quiz Rooms & WebSocket Integration
* **Objective:** Enable teachers and workshop facilitators to host live interactive rights sessions in schools and community centers.
* **Components to Build:**
  * **Teacher Room Creator:** Facilitators can generate a 6-character room PIN (e.g., `RQ-7890`) and select a scenario quest.
  * **Child Quick Join (No Account Required):** Students enter the PIN, choose a fun anonymous animal codename (e.g., *Brave Tiger*, *Clever Falcon*), and join the lobby.
  * **Simultaneous Group Voting:** When a dilemma appears on the classroom projector, students vote on their individual mobile or tablet screens.
  * **Classroom Consensus Graphs:** Real-time visualization of classroom choices triggering group debate on fairness, laws, and empathy.
  * **WebSocket Infrastructure:** Lightweight real-time server using Socket.io or WebSockets with automatic room disconnection cleanups.

---

### Part 06 — Teacher & Parent Dashboards
* **Objective:** Provide adults with tools, discussion primers, and learning insights to support children’s legal literacy without surveillance.
* **Components to Build:**
  * **Curriculum Alignment Matrix:** Mappings of RightsQuest adventures to CBSE, ICSE, NCERT, and State Board Social Science / Civics standards.
  * **Printable Discussion Facilitation Cards:** PDF export of classroom debate prompts and roleplay exercises for offline school periods.
  * **Aggregated Literacy Metrics:** High-level classroom comprehension summaries (e.g., "85% of students understood how to report cyber harassment") with zero individual student tracking.
  * **Caregiver Safeguarding Guide:** Tips for parents on handling sensitive disclosures and recognizing distress signs.

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
