# RightsQuest India — Project Documentation Inventory

> **Execution Mandate:** Complete repository documentation discovery, requirement traceability, and implementation verification audit.  
> **Status:** Authoritative Repository Inventory (Parts 01–08).  
> **Date:** November 2026

---

## 1. Inventory Summary

An exhaustive audit of all documentation across the repository was conducted. Exactly seven primary documentation artifacts exist within the repository:

1. `README.md` (Root repository overview)
2. `docs/README.md` (Living Story World & Documentation Gateway)
3. `docs/ROADMAP_PARTS_01_TO_08.md` (Master Product & Engineering Roadmap)
4. `docs/ARCHITECTURE_AND_CODE.md` (Architecture & Codebase Deep Dive)
5. `docs/DATABASE_AND_MITRA_AI.md` (Supabase Database & Mitra AI Setup)
6. `docs/VISUAL_DESIGN_SYSTEM.md` (Visual Identity, Typography & Motion Guide)
7. `docs/COMMIT_HISTORY_AND_CHANGELOG.md` (Untracked local commit history audit)

In addition, key configuration specifications (`package.json`, `vite.config.js`, `.env.example`, `supabase/schema.sql`, `public/manifest.webmanifest`) and verification harnesses (`scripts/verify_*.mjs`) establish binding architectural, privacy, and QA requirements.

---

## 2. Exhaustive Documentation Catalogue

### DOC-01: Root Repository Overview (`README.md`)
* **Exact Location:** `README.md`
* **Purpose:** Primary entry point for developers, educators, and evaluators; summarizes platform vision, technology stack, statutory legal grounding, getting started, and verification baseline.
* **Requirements Established:**
  * Node 18+ runtime with standard ESM scripts (`npm run dev`, `npm run dev:classroom`, `npm test`, `npm run build`).
  * DPDP Act 2023 §9 zero-PII compliance (no child identity fields, no phone/email inputs, no tracking cookies).
  * 8 core route experiences (Home, 5 Realms, Scenarios, Live Classroom, Educator Studio, Guardian Chronicle, Child Safety, PWA Offline).
  * 595-test automated QA baseline across 8 milestone test suites.
* **Parts Referenced:** Parts 01 through 08.
* **Dependencies:** `package.json`, `vite.config.js`, all `scripts/verify_*.mjs`.
* **Implementation Status:** Complete. All 8 parts are present and pass 595 automated assertions.
* **Integrity Audit:** Complete. Needs minor updates upon final release to reflect the 9 closure commits and final test numbers.

---

### DOC-02: Documentation Gateway (`docs/README.md`)
* **Exact Location:** `docs/README.md`
* **Purpose:** System architecture map, end-to-end dataflow diagram, and index of technical guides.
* **Requirements Established:**
  * High-level architectural flowchart from Preloader $\to$ 3D Sovereign Gateway $\to$ Living Story World $\to$ Dilemma Engine $\to$ Classroom Relay $\to$ Educator/Guardian Studio $\to$ Child Safety Gateway.
  * DPDP Act 2023 child safeguarding and privacy boundaries.
* **Parts Referenced:** Parts 01 through 07 (with references to offline capabilities).
* **Dependencies:** `docs/ROADMAP_PARTS_01_TO_08.md`, `docs/ARCHITECTURE_AND_CODE.md`.
* **Implementation Status:** Complete. Architecture diagrams accurately reflect current component structure.

---

### DOC-03: Master Product & Engineering Roadmap (`docs/ROADMAP_PARTS_01_TO_08.md`)
* **Exact Location:** `docs/ROADMAP_PARTS_01_TO_08.md`
* **Purpose:** Definitive specification for milestone scope, technical deliverables, and QA acceptance criteria.
* **Requirements Established:**
  * Defines exactly eight milestone parts (Parts 01 through 08).
  * Contains no mentions of Part 09, Part 10, or further numerical parts.
  * Establishes the 150 KiB gzipped initial route bundle budget.
  * Specifies IndexedDB storage for offline scenario scripts.
  * Defines 3-tier age adaptation (Young Navigators 8–10, Pathfinders 11–13, Youth Advocates 14–16).
* **Parts Referenced:** Parts 01, 02, 03, 04, 05, 06, 07, 08.
* **Dependencies:** Entire `src/` codebase, `server/classroom-server.js`.
* **Implementation Status:** Complete for Parts 01–07; Part 08 implemented and functional; field testing and external human reviews noted as future release validation gates.

---

### DOC-04: Architecture & Codebase Deep Dive (`docs/ARCHITECTURE_AND_CODE.md`)
* **Exact Location:** `docs/ARCHITECTURE_AND_CODE.md`
* **Purpose:** In-depth technical review of React 18, Vite 5, Lenis, Framer Motion, Three.js, Node WebSocket relay, and directory organization.
* **Requirements Established:**
  * Code-splitting via manual Rollup chunks (`three-chunk`, `framer-motion-chunk`, `vendor-chunk`, `lenis-chunk`, `icons-chunk`).
  * Ephemeral in-memory WebSocket relay on port 8787.
  * Socratic Mitra AI proxy rejecting prompts > 1,000 characters and rate-limiting to 10 requests/minute/IP.
* **Parts Referenced:** Parts 01 through 08.
* **Dependencies:** `vite.config.js`, `server/classroom-server.js`, `src/features/`.
* **Implementation Status:** Complete and verified.

---

### DOC-05: Database & Mitra AI Setup (`docs/DATABASE_AND_MITRA_AI.md`)
* **Exact Location:** `docs/DATABASE_AND_MITRA_AI.md`
* **Purpose:** Setup instructions for optional Supabase classroom aggregates and Groq Mitra AI completions.
* **Requirements Established:**
  * Supabase table `public.classroom_session_summaries` storing only aggregated classroom votes (minimum 5 votes required to record).
  * Zero storage of student identities, room PINs, or raw chat messages.
  * Strict origin validation via `CLASSROOM_ALLOWED_ORIGINS`.
* **Parts Referenced:** Parts 05, 06, 07.
* **Dependencies:** `supabase/schema.sql`, `server/classroom-server.js`.
* **Implementation Status:** Complete and verified against code.

---

### DOC-06: Visual Design System Guide (`docs/VISUAL_DESIGN_SYSTEM.md`)
* **Exact Location:** `docs/VISUAL_DESIGN_SYSTEM.md`
* **Purpose:** Art direction, semantic color tokens, typography scales, motion physics, and anti-pattern restrictions based on Creative OS (`44_AGENCYLIKE_UI`, `01_DESIGN_OS`, `04_TYPOGRAPHY_SYSTEM`).
* **Requirements Established:**
  * HSL color tokens (`--color-saffron-500`, `--color-canvas-base`, `--color-ink-primary`, etc.).
  * Fluid typography clamp formulas.
  * High-contrast accessibility (WCAG 2.1 AA).
* **Parts Referenced:** Parts 01, 02.
* **Dependencies:** `src/styles/tokens.css`, `src/styles/typography.css`, `src/styles/motion.css`.
* **Implementation Status:** Complete.

---

### DOC-07: Untracked Commit History & Changelog (`docs/COMMIT_HISTORY_AND_CHANGELOG.md`)
* **Exact Location:** `docs/COMMIT_HISTORY_AND_CHANGELOG.md`
* **Purpose:** Exhaustive local audit of all historical commits (Commits 1 through 65) and test evolution metrics.
* **Requirements Established:** Kept as detailed development audit trail across Parts 01–08 and the AR extension.
* **Parts Referenced:** Parts 01 through 08 + AR Explorer.
* **Implementation Status:** Fully audited through Commit 65.

---

### DOC-08: Classroom Wall-Mounted Augmented Reality Experience (`docs/AR_EXPLORER.md`)
* **Exact Location:** `docs/AR_EXPLORER.md`
* **Purpose:** Complete spatial architecture guide for WebXR AR (Mode A) and Universal 3D Classroom Simulation (Mode B).
* **Requirements Established:**
  * Mode A: WebXR `immersive-ar` session with vertical wall plane detection and pose normal alignment; camera passthrough showing real physical classroom.
  * Mode B: Universal 3D Classroom Fallback with slim wall mounting frame, brass identification plaque, secondary student desk, dynamic chalk blackboard, and Mitra companion on wall perch.
  * Compact scale calibration across all 6 constitutional stations (~35–45 cm display scale).
  * On-screen inspection toolbar (rotate, zoom/scale, reset, reposition).
  * DPDP Act 2023 §9 zero-PII camera compliance (zero video/photos saved, recorded, or uploaded).
* **Parts Referenced:** AR Explorer (`src/features/ar/`).
* **Dependencies:** `three`, `src/features/ar/engine/ArSceneEngine.js`, `src/features/ar/pages/ArExplorerPage.jsx`, `scripts/verify_ar_explorer.mjs`.
* **Implementation Status:** Complete, tested (44/44 automated checks pass in `scripts/verify_ar_explorer.mjs`), and released.

---

## 3. Discovered Conflicts & Resolutions

| Conflict / Ambiguity | Authoritative Decision | Code State |
| :--- | :--- | :--- |
| **Multilingual vs Plain English** | In previous sprints, multilingual localization was explored but generated complex, broken UI states. The user explicitly directed: *"remove multi lang its complicated asf"*. | Localization removed; plain English established across all routes with accessible readability. |
| **Part 09 / Future Milestones** | The user prompt inquired whether Part 09 or beyond exists in the documentation. | Audit confirms **no Part 09 or subsequent parts exist** in any document. Part 08 is the final planned product milestone. Remaining work constitutes hardening, verification, and release readiness. |
| **Helpline Gamification vs Safe Harbor** | Safeguarding rules mandate zero XP for sensitive abuse disclosures. `rewardEngine.js` contained a historical `HELPLINE_ACCESSED` (20 XP) event for educational helpline discovery. | Clarified: Voluntary distress disclosures in `useSensitiveDisclosureGuard.js` yield strictly **0 XP, 0 badges, 0 storage**. Educational reading of the emergency directory in Part 04 is non-sensitive safe harbor learning. |
