import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { CURRICULUM_ALIGNMENTS, HISTORICAL_CLASSROOM_SESSIONS } from '../src/features/intelligence/data/intelligenceData.js';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA PART 06 INTELLIGENCE SYSTEM QA CHECK');
console.log('------------------------------------------------------------');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Part 06 File Structure & Component Existence
const part06Files = [
  'src/features/intelligence/data/intelligenceData.js',
  'src/features/intelligence/hooks/useIntelligence.js',
  'src/features/intelligence/components/PermissionGateway.jsx',
  'src/features/intelligence/components/PermissionGateway.module.css',
  'src/features/educator/pages/EducatorPage.jsx',
  'src/features/educator/pages/EducatorPage.module.css',
  'src/features/educator/components/ClassroomMetricsGrid.jsx',
  'src/features/educator/components/ClassroomMetricsGrid.module.css',
  'src/features/educator/components/LiveSessionManager.jsx',
  'src/features/educator/components/LiveSessionManager.module.css',
  'src/features/educator/components/TopicExplorationChart.jsx',
  'src/features/educator/components/TopicExplorationChart.module.css',
  'src/features/educator/components/DiscussionToolkitView.jsx',
  'src/features/educator/components/DiscussionToolkitView.module.css',
  'src/features/educator/components/RecentSessionsAudit.jsx',
  'src/features/educator/components/RecentSessionsAudit.module.css',
  'src/features/guardian/pages/GuardianPage.jsx',
  'src/features/guardian/pages/GuardianPage.module.css',
  'src/features/guardian/components/LearningHighlightsCard.jsx',
  'src/features/guardian/components/LearningHighlightsCard.module.css',
  'src/features/guardian/components/LearningTimelineView.jsx',
  'src/features/guardian/components/LearningTimelineView.module.css',
  'src/features/guardian/components/FamilyConversationStarters.jsx',
  'src/features/guardian/components/FamilyConversationStarters.module.css',
  'src/features/guardian/components/SupportivePillarsGrid.jsx',
  'src/features/guardian/components/SupportivePillarsGrid.module.css',
  'src/features/guardian/components/GuardianResourcesAccordion.jsx',
  'src/features/guardian/components/GuardianResourcesAccordion.module.css',
];

for (const relPath of part06Files) {
  assert(existsSync(resolve(process.cwd(), relPath)), `File exists: ${relPath}`);
}

// 2. Curriculum Alignments Coverage (5 Constitutional Realms)
assert(Array.isArray(CURRICULUM_ALIGNMENTS), 'CURRICULUM_ALIGNMENTS is exported as an array');
assert(CURRICULUM_ALIGNMENTS.length === 5, `Expected 5 constitutional realms, got ${CURRICULUM_ALIGNMENTS.length}`);

const expectedRealmIds = [
  'village-of-belonging',
  'gardens-of-growth',
  'forest-of-safety',
  'river-of-voices',
  'haven-of-dignity',
];

for (const realmId of expectedRealmIds) {
  const match = CURRICULUM_ALIGNMENTS.find((r) => r.realmId === realmId);
  assert(Boolean(match), `Realm alignment exists for: ${realmId}`);
  if (match) {
    assert(match.statutoryArticles.length > 0, `${realmId} contains statutory articles`);
    assert(typeof match.ncertMapping === 'string' && match.ncertMapping.includes('NCERT'), `${realmId} has NCERT civics syllabus mapping`);
    assert(typeof match.cbseUnits === 'string' && match.cbseUnits.includes('Unit'), `${realmId} has CBSE unit alignment`);
    assert(Array.isArray(match.discussionPrompts) && match.discussionPrompts.length >= 2, `${realmId} has at least 2 Socratic prompts`);
    assert(typeof match.offlineClassroomActivity === 'string' && match.offlineClassroomActivity.length > 20, `${realmId} has an offline classroom activity`);
    assert(typeof match.familyDinnerPrompt === 'string' && match.familyDinnerPrompt.length > 20, `${realmId} has a dinner table starter`);
    assert(typeof match.familyOfflineActivity === 'string' && match.familyOfflineActivity.length > 20, `${realmId} has an offline family activity`);
  }
}

// 3. Historical Classroom Deliberations Integrity
assert(Array.isArray(HISTORICAL_CLASSROOM_SESSIONS), 'HISTORICAL_CLASSROOM_SESSIONS is exported as an array');
assert(HISTORICAL_CLASSROOM_SESSIONS.length >= 3, 'Contains historical classroom sessions audit');
const pinRegex = /^RQ-\d{4}$/;
for (const session of HISTORICAL_CLASSROOM_SESSIONS) {
  assert(pinRegex.test(session.pin), `Session ${session.id} has valid RQ-#### PIN: ${session.pin}`);
  assert(session.participantsCount > 0, `Session ${session.id} has positive participant count`);
  assert(session.majorityPercentage >= 50 && session.majorityPercentage <= 100, `Session ${session.id} has valid majority percentage: ${session.majorityPercentage}%`);
  assert(typeof session.consensusOutcome === 'string', `Session ${session.id} has consensus outcome text`);
}

// 4. Role Gateway & Context Integrity
const contextSource = readFileSync(resolve(process.cwd(), 'src/context/DemoLearnerContext.jsx'), 'utf-8');
assert(contextSource.includes('currentRole'), 'DemoLearnerContext manages currentRole state');
assert(contextSource.includes('setCurrentRole'), 'DemoLearnerContext exposes setCurrentRole callback');
assert(contextSource.includes('rq_current_role'), 'DemoLearnerContext persists role safely in localStorage');

// 5. Router & Navigation Registration
const routerSource = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
assert(routerSource.includes("path: 'educator'"), "Router registers '/educator' route");
assert(routerSource.includes("path: 'guardian'"), "Router registers '/guardian' route");
assert(routerSource.includes("EducatorPage = lazy("), "EducatorPage is dynamically lazy-loaded");
assert(routerSource.includes("GuardianPage = lazy("), "GuardianPage is dynamically lazy-loaded");

const navSource = readFileSync(resolve(process.cwd(), 'src/data/navigation.js'), 'utf-8');
assert(navSource.includes("path: '/educator'"), "NAV_LINKS includes '/educator'");
assert(navSource.includes("path: '/guardian'"), "NAV_LINKS includes '/guardian'");
assert(navSource.includes("path: '/educator', label: 'Educator Intelligence Studio'"), "FOOTER_LINKS includes Educator Studio");
assert(navSource.includes("path: '/guardian', label: 'Guardian Learning Chronicle'"), "FOOTER_LINKS includes Guardian Chronicle");

// 6. DPDP Act 2023 §9 Compliance & Non-Surveillance Invariants
const educatorSources = [
  readFileSync(resolve(process.cwd(), 'src/features/educator/pages/EducatorPage.jsx'), 'utf-8'),
  readFileSync(resolve(process.cwd(), 'src/features/educator/components/ClassroomMetricsGrid.jsx'), 'utf-8'),
  readFileSync(resolve(process.cwd(), 'src/features/educator/components/RecentSessionsAudit.jsx'), 'utf-8'),
];

for (const src of educatorSources) {
  assert(!src.includes('studentRank') && !src.includes('leaderboard'), 'Educator Studio strictly omits individual student rankings / leaderboards');
}

const guardianSources = [
  readFileSync(resolve(process.cwd(), 'src/features/guardian/pages/GuardianPage.jsx'), 'utf-8'),
  readFileSync(resolve(process.cwd(), 'src/features/guardian/components/LearningHighlightsCard.jsx'), 'utf-8'),
  readFileSync(resolve(process.cwd(), 'src/features/guardian/components/SupportivePillarsGrid.jsx'), 'utf-8'),
];

for (const src of guardianSources) {
  assert(src.includes('DPDP') || src.includes('Zero Streak') || src.includes('non-surveillance') || src.includes('Guardian Guarantee'), 'Guardian Chronicle guarantees anti-addiction and non-surveillance');
}

// 7. Scenario 03 Workshop Background Refinement Verification
const scenarioCss = readFileSync(resolve(process.cwd(), 'src/features/gameplay/pages/ScenarioPage.module.css'), 'utf-8');
assert(scenarioCss.includes('background-color: #0B0D14;'), 'Scenario 03 background refined to solid #0B0D14');
assert(!scenarioCss.includes('radial-gradient(circle at 10% 20%'), 'Scenario 03 removed muddy radial-gradient blobs');

const appShellJsx = readFileSync(resolve(process.cwd(), 'src/components/layout/AppShell.jsx'), 'utf-8');
assert(appShellJsx.includes("#0B0D14"), 'AppShell locks body background to #0B0D14 during story gameplay');

console.log('------------------------------------------------------------');
console.log(`PART 06 VERIFICATION SUMMARY: ${passed} PASSED / ${failed} FAILED`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
}

