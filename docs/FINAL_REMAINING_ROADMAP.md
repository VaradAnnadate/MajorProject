# RightsQuest India — Final Remaining Roadmap & Completion Plan

> **Governing Mandate:** Documentation-driven final milestone completion and release hardening.  
> **Milestone Status:** Parts 01 through 08 fully accounted for; Part 08 is the final planned product part. No ungrounded Part 09 or 10 will be manufactured.  
> **Execution Strategy:** Implementation organized across 9 controlled, atomic Git commits.

---

## 1. Discovered Milestone Scope

The documentation inventory and completion audit establish conclusively that:
1. **Parts 01 through 08** constitute the entire documented product roadmap of RightsQuest India.
2. **No Part 09 exists** in the repository documentation.
3. The remaining completion obligations are:
   - Eliminating all navigation dead-ends and missing route fallbacks.
   - Hardening story, scenario, and modal keyboard accessibility.
   - Hardening the living progression engine against corrupted storage and quota exceptions.
   - Hardening the WebSocket classroom relay and educator printing tools.
   - Expanding child safety heuristic coverage and reaffirming zero-PII boundaries.
   - Finalizing offline mission storage management (IndexedDB inspection & deletion).
   - Adding a comprehensive cross-platform release verification suite.
   - Producing final handover and release documentation.

---

## 2. Workstream Classification Matrix

### Workstream 1: Foundation & Core Navigation (Commit 2)
* **Status:** Incomplete anchor navigation & silent 404 redirect.
* **Scope:**
  * Add anchor targets (`id="privacy"`, `id="legal"`, `id="architecture"`) to `src/pages/AboutPage.jsx`.
  * Update `src/components/layout/Footer.jsx` with hash-anchored routes.
  * Add an accessible, child-friendly 404 Route Not Found page in `src/app/router.jsx`.
  * Ensure color contrast and focus visibility across core layouts.

### Workstream 2: Story Realms & Scenario Immersion (Commit 3)
* **Status:** Edge-case modal keyboard dismissal and scenario loading error boundaries.
* **Scope:**
  * Add keyboard `Escape` dismissal and focus management to `WorldDetailModal.jsx`.
  * Ensure non-WebGL devices gracefully render the fallback SVG story terrain without crashing Three.js context.
  * Add graceful error fallback inside `ScenarioPage.jsx` when an invalid scenario ID is supplied.

### Workstream 3: Progression & Learner State Consistency (Commit 4)
* **Status:** Storage exception resilience and idempotency.
* **Scope:**
  * Harden `progressionPersistence.js` with corrupted JSON recovery and `QuotaExceededError` try-catch guards.
  * Guarantee idempotency in `rewardEngine.js` for repeated mission-completion dispatches.
  * Protect `streakEngine.js` against negative day deltas if device system clock fluctuates.

### Workstream 4: Live Classroom & Educator Workflows (Commit 5)
* **Status:** Origin resilience and printable classroom resources.
* **Scope:**
  * Enhance `server/classroom-server.js` with localhost origin variations (`127.0.0.1`, `localhost`, custom ports).
  * Add periodic WebSocket ping-pong cleanup to discard ghost room sockets.
  * Add `@media print` CSS rules to `EducatorPage.jsx` so teachers can print clean, ink-saving black & white worksheets.

### Workstream 5: Child Protection & Privacy Safeguards (Commit 6)
* **Status:** Heuristic interceptor keyword breadth and external review caveats.
* **Scope:**
  * Expand `useSensitiveDisclosureGuard.js` with comprehensive boundary violation, domestic distress, and cyber harassment trigger keywords.
  * Re-verify zero persistence: sensitive disclosures are never written to disk, session, or remote logs.
  * Ensure `QuickExitButton.jsx` neutralizes transient state upon trigger.
  * Provide explicit legal disclaimer noting mandatory professional review requirements.

### Workstream 6: PWA Offline Reliability & Accessibility (Commit 7)
* **Status:** Offline quest storage management and accessibility.
* **Scope:**
  * Expand `src/pwa/offlineQuestStore.js` with `listOfflineQuests()`, `removeOfflineQuest(scenarioId)`, and `clearOfflineQuests()`.
  * Provide accessible feedback when quests are saved or removed on low-storage devices.
  * Verify service worker precaching remains strictly within the 150 KiB initial route gzip budget.

### Workstream 7: Quality Verification & Regression Coverage (Commit 8)
* **Status:** Final release verification suite.
* **Scope:**
  * Implement `scripts/verify_final_release.mjs` testing all 8 milestones, PWA storage methods, print stylesheets, 404 handling, and disclosure guards.
  * Integrate into `npm test` pipeline.
  * Confirm 100% assertions passing with zero warnings or broken contracts.

### Workstream 8: Final Project Handover & Release Documentation (Commit 9)
* **Status:** Pre-release documentation and operational readiness.
* **Scope:**
  * Produce `docs/FINAL_PROJECT_COMPLETION_REPORT.md` documenting mandate fulfillment, architecture, 9 commits, and known operational limits.
  * Update root `README.md` and `docs/README.md`.
  * Perform pre-push verification of working tree and remotes.

---

## 3. Controlled Nine-Commit Execution Map

| Commit # | Semantic Type | Scope | Target Files |
| :---: | :--- | :--- | :--- |
| **1** | `docs(audit)` | Inventory documentation, requirements audit & completion roadmap | `docs/PROJECT_DOCUMENTATION_INVENTORY.md`, `docs/FINAL_PROJECT_COMPLETION_AUDIT.md`, `docs/FINAL_REMAINING_ROADMAP.md` |
| **2** | `fix(foundation)` | Resolve core platform defects, anchor targets & accessible 404 view | `src/pages/AboutPage.jsx`, `src/components/layout/Footer.jsx`, `src/app/router.jsx`, `src/pages/NotFoundPage.jsx` |
| **3** | `fix(world)` | Finalize story realms, modal escape listener & scenario error handling | `src/features/world/components/WorldDetailModal.jsx`, `src/features/gameplay/pages/ScenarioPage.jsx` |
| **4** | `fix(progression)` | Harden rewards, quota error resilience & learner state consistency | `src/features/progression/services/progressionPersistence.js`, `src/features/progression/engine/rewardEngine.js` |
| **5** | `fix(classroom)` | Harden live sessions, WebSocket origins & educator print styles | `server/classroom-server.js`, `src/features/educator/pages/EducatorPage.jsx`, `src/features/educator/pages/EducatorPage.module.css` |
| **6** | `fix(safety)` | Strengthen child protection heuristics & legal review caveats | `src/features/safety/hooks/useSensitiveDisclosureGuard.js`, `src/features/safety/components/QuickExitButton.jsx` |
| **7** | `fix(pwa)` | Finalize offline quest storage management & accessibility | `src/pwa/offlineQuestStore.js`, `src/pages/AdventuresPage.jsx` |
| **8** | `test(quality)` | Add comprehensive cross-platform release verification suite | `scripts/verify_final_release.mjs`, `package.json` |
| **9** | `docs(release)` | Finalize project handover, completion report & release readiness | `docs/FINAL_PROJECT_COMPLETION_REPORT.md`, `README.md`, `docs/README.md` |
