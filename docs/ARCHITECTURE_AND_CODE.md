# RightsQuest India — Architecture & Codebase Deep Dive

This document provides a comprehensive technical walkthrough of the architecture, folder structure, data models, state management, and code decisions implemented in **Part 01**.

---

## 1. Technical Stack Decisions

| Tool / Library | Version | Purpose in Architecture |
| :--- | :--- | :--- |
| **React.js** | `^18.3.1` | Declarative, component-based UI layer (Standard JavaScript, NOT TypeScript). |
| **Vite** | `^5.4.11` | High-speed ESM development server and Rollup production bundler. |
| **React Router DOM** | `^6.28.0` | Client-side routing with code-splitting via `createBrowserRouter`. |
| **Lenis** | `^1.1.20` | Smooth inertia scroll engine adhering to Creative OS motion standards. |
| **Framer Motion** | `^11.11.17` | Physics-based spring animations and micro-interactions. |
| **Lucide React** | `^0.460.0` | Accessible, tree-shakeable SVG interface iconography. |
| **Custom Semantic CSS** | Pure CSS | Zero Tailwind bloat; token-driven CSS architecture with fluid clamp scales. |

---

## 2. Directory Architecture & File Tree

```
MajorProject/
├── docs/                                # Technical & design documentation
│   ├── ROADMAP_PARTS_01_TO_08.md        # Master milestone roadmap for Parts 01–08
│   ├── ARCHITECTURE_AND_CODE.md         # This technical codebase architecture guide
│   └── VISUAL_GOAT_DESIGN_SYSTEM.md     # Visual identity, typography & laser motion guide
├── scripts/
│   └── verify_foundation.mjs            # 66-point automated architecture & safety QA runner
├── public/                              # Static public assets
├── index.html                           # Accessible HTML shell with typography preconnects
├── vite.config.js                       # Manual chunk splitting (vendor, motion, icons)
├── package.json                         # Dependencies and scripts manifest
├── .gitignore                           # Strict exclusion of node_modules, dist, and cache
└── src/
    ├── main.jsx                         # React StrictMode entrypoint
    ├── app/
    │   ├── App.jsx                      # App root with DemoLearnerProvider
    │   └── router.jsx                   # React Router v6 tree with React.lazy code splitting
    ├── components/
    │   ├── common/
    │   │   ├── EmergencyQuickBar.jsx    # Persistent 1098 Childline emergency quickbar
    │   │   └── IntroPreloader.jsx       # Kinetic Cormorant Garamond storytelling preloader
    │   ├── navigation/
    │   │   └── Navbar.jsx               # Sticky responsive nav with mobile drawer & demo avatar badge
    │   └── layout/
    │       ├── AppShell.jsx             # Shell with skip link, Lenis scroll, outlet & footer
    │       └── Footer.jsx               # Editorial footer with 1098 callout & statutory index
    ├── context/
    │   └── DemoLearnerContext.jsx       # Privacy-first local demonstration state manager
    ├── data/
    │   ├── demoProfiles.js              # 3 age bands & non-identifying demo personas
    │   ├── rightsCatalog.js             # UNCRC 4 pillars, constitutional articles, verified helplines
    │   ├── adventuresCatalog.js         # Curated everyday scenario quests
    │   └── navigation.js                # Nav items & footer sitemap
    ├── pages/
    │   ├── LandingPage.jsx              # Editorial welcome experience & storybook hero
    │   ├── AgeSelectionPage.jsx         # Prototype age band selector (8-10, 11-13, 14-16)
    │   ├── LearnerHomePage.jsx          # Foundational learner dashboard shell
    │   ├── ExploreRightsPage.jsx        # Searchable rights catalog with age adaptation
    │   ├── AdventuresPage.jsx           # Interactive adventure directory
    │   ├── AchievementsPage.jsx         # Rights passport & non-competitive dignity badges
    │   ├── GetHelpPage.jsx              # Childline 1098 & verified emergency helplines
    │   └── AboutPage.jsx                # Mission, DPDP 2023 compliance & pedagogy
    └── styles/
        ├── tokens.css                   # Fluid clamp scales, HSL tokens, sovereign curves
        ├── typography.css               # Editorial serif & mono hierarchy
        ├── motion.css                   # Laser beam effects, Lenis classes, reduced motion
        └── globals.css                  # Semantic HTML resets, container & button tokens
```

---

## 3. Routing & Dynamic Lazy Loading Architecture (`src/app/router.jsx`)

Every route view is dynamically imported via `React.lazy()` to satisfy the Creative OS performance budget (<150 kB initial bundle):

```javascript
// Dynamic Lazy Loading
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AgeSelectionPage = lazy(() => import('../pages/AgeSelectionPage'));
const LearnerHomePage = lazy(() => import('../pages/LearnerHomePage'));
const ExploreRightsPage = lazy(() => import('../pages/ExploreRightsPage'));
const AdventuresPage = lazy(() => import('../pages/AdventuresPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const GetHelpPage = lazy(() => import('../pages/GetHelpPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
```

### Resulting Production Chunks:
* Initial Core JS: **`30.38 kB`** (gzip: `9.00 kB`)
* `LandingPage.jsx`: `18.34 kB` (gzip: `4.12 kB`)
* `LearnerHomePage.jsx`: `11.24 kB` (gzip: `2.60 kB`)
* `ExploreRightsPage.jsx`: `6.24 kB` (gzip: `1.89 kB`)
* `AdventuresPage.jsx`: `6.08 kB` (gzip: `1.93 kB`)
* `AchievementsPage.jsx`: `5.77 kB` (gzip: `2.07 kB`)
* `GetHelpPage.jsx`: `7.44 kB` (gzip: `2.25 kB`)
* `AboutPage.jsx`: `8.18 kB` (gzip: `2.36 kB`)

---

## 4. State Management (`src/context/DemoLearnerContext.jsx`)

The application avoids backend database authentication in Part 01 to prevent collecting real children's data, strictly upholding **India's DPDP Act 2023**:

```javascript
// State shape managed in DemoLearnerContext
{
  selectedAgeBand: 'band-11-13',          // 'band-8-10' | 'band-11-13' | 'band-14-16'
  activePersonaId: 'persona-kabir',       // Non-identifying avatar
  savedMissions: ['adv-02-screen'],
  completedChapters: ['adv-02-screen-ch1', 'adv-02-screen-ch2'],
  isDemoMode: true
}
```

### Key Context Methods:
* `setAgeBand(bandId)`: Switches the active age band and auto-selects a compatible demo persona.
* `setPersona(personaId)`: Changes the active non-identifying explorer.
* `resetDemoState()`: Clears localStorage and resets demo data to factory defaults.
* `triggerIntro()` / `finishIntro()`: Orchestrates the full-screen cinematic intro animation.

---

## 5. Data Layer Architecture (`src/data/`)

1. **`demoProfiles.js`**:
   * Declares three age bands:
     * `band-8-10`: *The Young Navigators* (Theme: Curiosity & Schoolyard Fairness)
     * `band-11-13`: *The Pathfinders* (Theme: Peer Safety, Equality & Digital Sense)
     * `band-14-16`: *The Youth Advocates* (Theme: Constitutional Articles & Legal Remedies)
   * Three non-identifying personas (*Ananya the Keen Observer*, *Kabir the Digital Scout*, *Priya the Constitution Voice*).
2. **`rightsCatalog.js`**:
   * Anchors content in the **UNCRC 4 Pillars** (Survival, Development, Protection, Participation).
   * Verified Indian statutes:
     * **Article 21A & RTE Act 2009** (Free & compulsory elementary education).
     * **Article 24 & Child Labour Amendment Act 2016** (Complete ban on labor under 14; hazardous work ban for adolescents).
     * **POCSO Act 2012** (Gender-neutral protection from sexual abuse with confidential reporting).
     * **Article 15(3)** (Special affirmative provisions for women and children).
     * **DPDP Act 2023 Section 9** (Strict ban on tracking, profiling, or targeted ads targeting children).
   * Verified emergency helplines: **Childline 1098** (MWCD / ERSS-112), **112**, **Tele-MANAS 14416**, **Cyber Crime 1930**.
3. **`adventuresCatalog.js`**:
   * Pre-configured realistic scenario quests (e.g., *"The Mystery of the Empty Bench"*, *"The Whispering Screen"*).
4. **`navigation.js`**:
   * Centralized routes, labels, and footer taxonomy.

---

## 6. Automated QA & Verification Harness (`scripts/verify_foundation.mjs`)

An automated testing suite validates 66 architectural, structural, and child-safeguarding rules:

```bash
node scripts/verify_foundation.mjs
```

### What It Audits:
1. **File Existence:** Confirms all 26 core component, layout, page, data, and token files exist.
2. **Child Safety Anti-Patterns:** Scans source code to ensure **zero** `<input type="tel">`, `<input type="email">`, `<input type="password">`, or competitive leaderboard rankings exist in learner views.
3. **Legal Fidelity:** Verifies Article 21A, Article 24, POCSO, DPDP Section 9, and Childline 1098 are properly declared.
4. **Creative OS Tokens:** Checks presence of sovereign curves, font scales, and HSL variables.
5. **Accessibility:** Verifies `:focus-visible`, `.skip-to-content`, and $44\times 44\text{px}$ minimum button targets.
