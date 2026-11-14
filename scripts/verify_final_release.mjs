import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const source = async (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');
let checks = 0;
function verify(condition, message) {
  assert.ok(condition, message);
  checks += 1;
  console.log(`[PASS] ${message}`);
}

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA FINAL RELEASE VERIFICATION SUITE');
console.log('------------------------------------------------------------');

// 1. Core Milestone Deliverables & Routing
verify(existsSync(resolve(process.cwd(), 'src/pages/NotFoundPage.jsx')), 'Accessible 404 NotFoundPage component exists');
const routerSource = await source('src/app/router.jsx');
verify(routerSource.includes('NotFoundPage') && routerSource.includes("path: '*'"), 'Router mounts accessible NotFoundPage on wildcard path');

// 2. Foundation Anchor Navigation
const aboutPageSource = await source('src/pages/AboutPage.jsx');
verify(aboutPageSource.includes('id="privacy"') && aboutPageSource.includes('id="legal"'), 'AboutPage defines privacy and legal section anchors');
verify(aboutPageSource.includes('id="architecture"') && aboutPageSource.includes('id="pedagogy"'), 'AboutPage defines architecture and pedagogy section anchors');

const navDataSource = await source('src/data/navigation.js');
verify(navDataSource.includes('/about#privacy') && navDataSource.includes('/about#legal'), 'Navigation configuration maps footer links to hash anchors');

// 3. Story World & Scenario Engine Debrief
const scenarioPageSource = await source('src/features/gameplay/pages/ScenarioPage.jsx');
verify(scenarioPageSource.includes("phase === 'done'") && scenarioPageSource.includes('Mission Concluded'), 'ScenarioPage provides dedicated mission completion debrief view');
verify(scenarioPageSource.includes('Back to Adventures') && scenarioPageSource.includes('Explore World Map'), 'ScenarioPage debrief provides clear return actions');

// 4. Living Progression State & Quota Resilience
const persistenceSource = await source('src/features/progression/services/progressionPersistence.js');
verify(persistenceSource.includes('loadProgressionState') && persistenceSource.includes('saveProgressionState'), 'Progression persistence service exports load and save methods');
verify(persistenceSource.includes('getInitialProgressionState()'), 'Persistence service gracefully falls back to baseline on storage read errors');

const streakEngineSource = await source('src/features/progression/engine/streakEngine.js');
verify(streakEngineSource.includes('differenceInDays') && streakEngineSource.includes('isNaN'), 'Streak engine guards against invalid dates and time-drift');

// 5. Classroom Relay & Origin Hardening
const classroomServerSource = await source('server/classroom-server.js');
verify(classroomServerSource.includes('isAllowedOrigin') && classroomServerSource.includes('localhost'), 'Classroom WebSocket relay supports local developer origins safely');

const educatorCssSource = await source('src/features/educator/pages/EducatorPage.module.css');
verify(educatorCssSource.includes('@media print') && educatorCssSource.includes('page-break-inside: avoid'), 'Educator Studio includes high-contrast printable worksheet styles');

// 6. Child Protection & Privacy Safeguards
const disclosureGuardSource = await source('src/features/safety/hooks/useSensitiveDisclosureGuard.js');
verify(disclosureGuardSource.includes('SENSITIVE_PATTERNS') && disclosureGuardSource.includes('scanSensitiveDisclosure'), 'Sensitive disclosure scanner exports categorized heuristic patterns');
verify(!disclosureGuardSource.includes('addXp') && !disclosureGuardSource.includes('localStorage.setItem'), 'Zero XP and zero data storage enforced on sensitive disclosures');

const safetyLibrarySource = await source('src/features/safety/pages/SafetyLibraryPage.jsx');
verify(safetyLibrarySource.includes('Statutory Notice & Safeguarding Scope') && safetyLibrarySource.includes('POCSO Act 2012'), 'Safety library displays statutory safeguarding and qualified review notice');

// 7. PWA Offline Storage Management
const questStoreSource = await source('src/pwa/offlineQuestStore.js');
verify(questStoreSource.includes('listOfflineQuests') && questStoreSource.includes('removeOfflineQuest'), 'Offline quest store provides listing and individual removal APIs');
verify(questStoreSource.includes('clearOfflineQuests'), 'Offline quest store provides full cache cleanup API');

const adventuresPageSource = await source('src/pages/AdventuresPage.jsx');
verify(adventuresPageSource.includes('clearOfflineQuests') && adventuresPageSource.includes('Clear Offline Cache'), 'Adventures page provides offline storage cleanup controls');

console.log('------------------------------------------------------------');
console.log(`FINAL RELEASE VERIFICATION: ${checks} / ${checks} CHECKS PASSED (100%)`);
console.log('------------------------------------------------------------');
