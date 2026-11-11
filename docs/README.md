# RightsQuest India — Living Story World & Documentation Gateway

Welcome to the architectural, creative, and engineering documentation for **RightsQuest India**, an agency-grade, story-driven gamified children's rights learning platform designed for children aged 8–16 across India.

---

## High-Level System Architecture

```mermaid
flowchart TD
    Intro["00. Kinetic Intro Preloader<br/>(Cormorant Garamond 'RightsQuest')"] --> Hero["01. Scene 01: The Invitation<br/>('Every child has a world of rights')"]
    Hero --> Parallax["02. Scene 02: The World Awakens<br/>(5 Connected Realms)"]
    Parallax --> Metaphor["03. Scene 03: Discover the Meaning<br/>(UNCRC 4 Pillars & Indian Statutes)"]
    Metaphor --> Companion["04. Scene 04: Meet Mitra<br/>(Sun-Fox Guardian & 9 States)"]
    Companion --> MapPortal["05. Scene 05: The Adventure Begins<br/>(Interactive Vector Map Centerpiece)"]
    MapPortal --> FinalCTA["06. Scene 06: Final Invitation<br/>(Age Selection & 1098 Helpline)"]

    MapPortal --> WorldPage["Fullscreen World Map (/world)"]
    WorldPage --> Realms["5 Living Realms<br/>Belonging • Growth • Safety • Voices • Dignity"]
    Realms --> Landmarks["Interactive Landmarks<br/>(Banyan, First Bell, 1098 Beacon, Bal Sansad)"]
    Realms --> Modal["Realm Deep-Dive Modal<br/>(Lore, Principles, Mission Previews)"]
    Modal --> Adventures["Story Quests & Dilemmas (/adventures)"]
    Adventures --> Gameplay["Part 03: Branching Scenario Engine (/play/:scenarioId)"]
    Gameplay --> Choices["Ethical Decision Trees & In-Flow Controls"]
    Choices --> Consequence["Non-Punitive Consequence Feedback (Empathetic vs Learning)"]
    Consequence --> ArticleStamp["Constitutional Article Reveal Stamp (Art. 21A, POCSO, RTE)"]
    ArticleStamp --> Progression["Part 04: Living Progression System (/achievements)<br/>(XP Engine • 12 Badges • Streaks • Cooperative Goals)"]
    Adventures --> Classroom["Part 05: Facilitator-led Classroom (/classroom)<br/>(Ephemeral Rooms • Private Voting • Bal Sansad Debate)"]
    
    subgraph Safeguards ["DPDP 2023 Child Privacy & Safety Layer"]
        Helpline["Childline 1098 Quickbar"]
        ZeroPII["Zero Child PII Storage"]
        MascotSafeguard["Mitra Concerned State (Safe Touch / Abuse)"]
    end
```

---

## Documentation Index

### 1. [Master Parts Roadmap (Parts 01–08)](./ROADMAP_PARTS_01_TO_08.md)
* **Part 01 (Complete):** Foundation, design tokens, kinetic preloader, application shell, and Lenis smooth scroll.
* **Part 02 (Complete):** The Living Story World (*The World of Every Child*), Mitra the Sun-Fox Mascot (9 expressive states & child safeguard behavior), vector interactive adventure map, and 6-scene cinematic landing storytelling.
* **Part 03 (Complete):** Branching scenario gameplay engine (`ScenarioRunner`), ethical decision trees (`ChoicePanel`), non-punitive consequence evaluation (`ConsequencePreview`), constitutional article reveal stamp (`ArticleRevealStamp`), evidence inspector (`EvidenceInspector`), three core demonstration missions + digital safety quest, age adaptation, persistent Childline 1098 modal, and 50-point QA suite.
* **Part 04 (Complete):** Deterministic idempotent XP engine (`rewardEngine`), 7 recognition tiers (`levels`), collectible treasure cabinet (`AchievementCollection`) with 12 tactile medallions, non-punitive 14-day consistency tracker (`StreakCalendar`), cooperative community quests (`CooperativeProgress`), and 67-point QA suite.
* **Part 05 (Complete):** Ephemeral WebSocket classroom rooms, anonymous animal codenames, private student ballots, aggregate consensus reveal, facilitator controls, and Bal Sansad prompts.
* **Parts 06–08 (Planned):** Teacher/parent dashboards, multilingual localization, and offline PWA.

### 2. [Architecture & Codebase Deep Dive](./ARCHITECTURE_AND_CODE.md)
* Comprehensive technical walkthrough of every directory, component, data model, state hook, and safeguard.
* Complete breakdown of `src/features/world/`, `src/features/mascot/`, `src/features/storytelling/`, `src/features/gameplay/`, and `src/features/progression/`.
* Explains how the interactive SVG vector terrain, branching dialogue AST engine, and idempotent reward engine operate with 60fps performance and zero data leakage.
* Documents the existing QA suites (`scripts/verify_foundation.mjs`, `scripts/verify_part03.mjs`, and `scripts/verify_part04.mjs`) and the Part 05 WebSocket relay.

### 3. [Visual Design System & Creative Motion Architecture](./VISUAL_DESIGN_SYSTEM.md)
* Comprehensive agency-grade visual design specification following Creative OS principles (`44_AGENCYLIKE_UI`).
* Design tokens: color palette (obsidian `#070A11`, parchment `#FBF8F3`, saffron `#DE7215`, peacock `#1B6D80`, terracotta `#D04F36`), typography scale (`Cormorant Garamond`, `Fraunces`, `Plus Jakarta Sans`, `Space Mono`).
* Dynamic laser beam cards, photon top-border sweeps, and tactile dossier skeuomorphism.
* Lenis inertia smooth scroll parameters and cubic-bezier easing tokens.

---

## Quick Reference Commands

```bash
# 1. Install project dependencies
npm install

# 2. Run local development server (Vite + React)
npm run dev

# 3. Run all 237 automated QA, legal fidelity & child safety checks (Parts 01–04)
npm test

# Run individual verification suites
npm run test:foundation   # 120 checks (Parts 01 & 02)
npm run test:part03       # 50 checks (Part 03 Scenario Engine)
npm run test:part04       # 67 checks (Part 04 Progression System)

# 4. Build optimized production bundle with dynamic chunk splitting
npm run build
```

---

## Statutory Grounding & Child Safeguarding Principles

RightsQuest India strictly translates real Indian jurisprudence into intuitive child-friendly storybook metaphors:

| Statute / Treaty | Indian & Global Legal Citation | Story World Manifestation |
| :--- | :--- | :--- |
| **Right to Free & Compulsory Education** | **Article 21A & RTE Act 2009** | *The Gardens of Growth* (Free schooling, midday meal cauldron, prohibition of corporal punishment). |
| **Child Labour Prohibition** | **Article 24 & Child Labour Act 2016** | *The Haven of Dignity* (Quenched glass kilns, prohibition of hazardous work under 18). |
| **Child Sexual Abuse Protection** | **POCSO Act 2012 & Safe Touch** | *The Forest of Safety* (Body boundaries, trusted adults, non-punitive confidential disclosures). |
| **Child Data Protection** | **DPDP Act 2023 Section 9** | Zero child PII collected; non-identifying local demo avatars, zero tracking, zero advertising. |
| **Freedom of Expression & Participation** | **UNCRC Article 12 & Article 19(1)(a)** | *The River of Voices* (Bal Sansad children's parliaments, respectful democratic debate). |
| **Emergency Child Helpline** | **Childline 1098 (24/7 Toll-Free)** | Persistent Emergency QuickBar, 1098 Crystal Beacon, and Mitra protective companion guidance. |
