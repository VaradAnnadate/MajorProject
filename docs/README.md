# RightsQuest India — Documentation Directory

Welcome to the architectural, creative, and engineering documentation for **RightsQuest India**, an agency-grade, story-driven gamified children's rights learning platform.

---

## Documentation Index

### 1. [Master Parts Roadmap (Parts 01–08)](./ROADMAP_PARTS_01_TO_08.md)
* Comprehensive breakdown of all 8 project development parts.
* Detailed scopes, technical stacks, statutory frameworks, and creative deliverables for each milestone.
* Maps what was built in Part 01 and what will be built in Parts 02 through 08.

### 2. [Architecture & Codebase Deep Dive](./ARCHITECTURE_AND_CODE.md)
* Complete guide to understanding the code implemented in Part 01.
* Technical stack: Vite 5, React 18, React Router v6 with dynamic `React.lazy()` code splitting.
* State management: `DemoLearnerContext.jsx` for privacy-first local demonstration profiles.
* Data layer: Statutory articles, UNCRC 4 pillars, demo personas, and emergency helplines.
* Automated testing: 66-point QA verification harness (`scripts/verify_foundation.mjs`).

### 3. [Visual Design System & Creative Motion Architecture](./VISUAL_DESIGN_SYSTEM.md)
* Comprehensive agency-grade visual design specification following Creative OS principles.
* Design tokens: color palette (obsidian `#070A11`, parchment `#FBF8F3`, saffron, peacock), typography scale (`Cormorant Garamond`, `Fraunces`, `Plus Jakarta Sans`, `Space Mono`).
* Dynamic laser beam cards, photon top-border sweeps, and tactile dossier skeuomorphism.
* Lenis inertia smooth scroll parameters and cubic-bezier easing tokens.

---

## Quick Reference Commands

```bash
# Run local development server
npm run dev

# Run 66-point automated architecture & safety QA check
node scripts/verify_foundation.mjs

# Build production bundle with lazy chunk splitting
npm run build
```

