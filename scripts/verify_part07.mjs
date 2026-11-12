import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { SAFETY_TOPICS } from '../src/features/safety/data/safetyTopics.js';
import { VERIFIED_SUPPORT_SERVICES } from '../src/features/safety/data/verifiedSupportServices.js';
import { scanSensitiveDisclosure } from '../src/features/safety/hooks/useSensitiveDisclosureGuard.js';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA PART 07 CHILD SAFETY QA CHECK');
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

// ----------------------------------------------------
// 1. Part 07 Child Safety File System Verification
// ----------------------------------------------------
const requiredFiles = [
  'src/features/safety/data/safetyTopics.js',
  'src/features/safety/data/verifiedSupportServices.js',
  'src/features/safety/hooks/useSensitiveDisclosureGuard.js',
  'src/features/safety/components/QuickExitButton.jsx',
  'src/features/safety/components/QuickExitButton.module.css',
  'src/features/safety/components/SensitiveDisclosureModal.jsx',
  'src/features/safety/components/SensitiveDisclosureModal.module.css',
  'src/features/safety/components/SafetyTopicCard.jsx',
  'src/features/safety/components/SafetyTopicCard.module.css',
  'src/features/safety/components/AgeBandSafetyView.jsx',
  'src/features/safety/components/AgeBandSafetyView.module.css',
  'src/features/safety/components/TrustedAdultExplainer.jsx',
  'src/features/safety/components/TrustedAdultExplainer.module.css',
  'src/features/safety/components/VerifiedHelplineDirectory.jsx',
  'src/features/safety/components/VerifiedHelplineDirectory.module.css',
  'src/features/safety/pages/SafetyLibraryPage.jsx',
  'src/features/safety/pages/SafetyLibraryPage.module.css',
  'src/features/safety/pages/GetHelpExperiencePage.jsx',
  'src/features/safety/pages/GetHelpExperiencePage.module.css',
];

for (const relPath of requiredFiles) {
  assert(existsSync(resolve(process.cwd(), relPath)), `File exists: ${relPath}`);
}

// ----------------------------------------------------
// 2. Child Safety Library & 3-Tier Age Adaptations
// ----------------------------------------------------
assert(Array.isArray(SAFETY_TOPICS), 'SAFETY_TOPICS is exported as an array');
assert(SAFETY_TOPICS.length === 6, `Expected 6 core safety domains, got ${SAFETY_TOPICS.length}`);

const requiredAgeBands = ['8-10', '11-13', '14-16'];

for (const topic of SAFETY_TOPICS) {
  assert(Boolean(topic.id && topic.category && topic.icon && topic.legalCitation), `Safety topic ${topic.id} has category, icon, and legalCitation`);
  assert(Boolean(topic.ageAdaptations), `Safety topic ${topic.id} defines ageAdaptations`);

  for (const band of requiredAgeBands) {
    const adaptation = topic.ageAdaptations[band];
    assert(Boolean(adaptation), `Topic ${topic.id} has adaptation for age band ${band}`);
    assert(Boolean(adaptation?.title), `Topic ${topic.id} [${band}] provides age-appropriate title`);
    assert(Boolean(adaptation?.concept), `Topic ${topic.id} [${band}] provides concrete conceptual explanation`);
    assert(Array.isArray(adaptation?.scenarios) && adaptation.scenarios.length > 0, `Topic ${topic.id} [${band}] provides scenario examples`);
    assert(Boolean(adaptation?.goldenRule), `Topic ${topic.id} [${band}] provides actionable empowering golden rule`);
  }
}

// ----------------------------------------------------
// 3. Direct 1098 Integration Gateway & Verified Helplines Directory
// ----------------------------------------------------
assert(Array.isArray(VERIFIED_SUPPORT_SERVICES), 'VERIFIED_SUPPORT_SERVICES is exported as an array');
assert(VERIFIED_SUPPORT_SERVICES.length >= 5, 'At least 5 statutory verified services provided in directory');

const childline1098 = VERIFIED_SUPPORT_SERVICES.find(s => s.shortCode === '1098');
assert(Boolean(childline1098), 'Childline 1098 exists in verified support services');
assert(childline1098.cost.includes('Free') || childline1098.cost.includes('Toll-Free'), 'Childline 1098 verified as 100% toll-free');
assert(childline1098.operationalHours.includes('24'), 'Childline 1098 operating hours verified as 24/7');
assert(childline1098.verificationMetadata?.status === 'VERIFIED_ACTIVE', 'Childline 1098 has VERIFIED_ACTIVE metadata status');
assert(childline1098.operatingArrangement.includes('ERSS') || childline1098.operatingArrangement.includes('112') || childline1098.operatingArrangement.includes('Vatsalya'), 'Childline 1098 documents MWCD / ERSS-112 Mission Vatsalya integration');

const emergency112 = VERIFIED_SUPPORT_SERVICES.find(s => s.shortCode === '112');
assert(Boolean(emergency112), 'National Emergency Helpline 112 exists in directory');

const cyberCrime1930 = VERIFIED_SUPPORT_SERVICES.find(s => s.shortCode === '1930');
assert(Boolean(cyberCrime1930), 'National Cyber Crime Helpline 1930 exists in directory');

const pocsoEBox = VERIFIED_SUPPORT_SERVICES.find(s => s.id === 'ncpcr-pocso-ebox');
assert(Boolean(pocsoEBox), 'NCPCR POCSO e-Box official digital reporting portal exists in directory');

// ----------------------------------------------------
// 4. Child Safety Safe-Exit Button & Safeguards
// ----------------------------------------------------
// Test heuristic scanner with safe inputs
const safeInput1 = 'What is Article 21A in the Constitution?';
const safeInput2 = 'Tell me about the five realms map!';
assert(scanSensitiveDisclosure(safeInput1) === null, 'Safe civics query passes scanner without trigger');
assert(scanSensitiveDisclosure(safeInput2) === null, 'Safe map query passes scanner without trigger');

// Test heuristic scanner with sensitive distress disclosures
const sensitiveInput1 = 'someone is touching my body and told me not to tell';
const trigger1 = scanSensitiveDisclosure(sensitiveInput1);
assert(Boolean(trigger1), 'Scanner intercepts inappropriate touch / bad secret disclosure');
assert(trigger1?.category === 'boundaries' || trigger1?.category === 'abuse', 'Trigger categorized appropriately');

const sensitiveInput2 = 'someone hit me and beat me';
const trigger2 = scanSensitiveDisclosure(sensitiveInput2);
assert(Boolean(trigger2), 'Scanner intercepts physical abuse / violence disclosure');

const sensitiveInput3 = 'someone asked for private photo';
const trigger3 = scanSensitiveDisclosure(sensitiveInput3);
assert(Boolean(trigger3), 'Scanner intercepts digital exploitation disclosure');

// Verify ZERO gamification / XP on sensitive disclosure code
const guardHookSource = readFileSync(resolve(process.cwd(), 'src/features/safety/hooks/useSensitiveDisclosureGuard.js'), 'utf-8');
assert(!guardHookSource.includes('addXp') && !guardHookSource.includes('awardBadge'), 'Zero XP or badges awarded for sensitive disclosures');
assert(!guardHookSource.includes('localStorage.setItem(\'disclosure'), 'Sensitive disclosures are never persisted to disk');

// Quick Exit component checks
const quickExitSource = readFileSync(resolve(process.cwd(), 'src/features/safety/components/QuickExitButton.jsx'), 'utf-8');
assert(quickExitSource.includes('maskScreen') || quickExitSource.includes('isMasked'), 'QuickExitButton contains decoy mask screen capability');
assert(quickExitSource.includes('CBSE') || quickExitSource.includes('NCERT'), 'QuickExitButton provides realistic curriculum study decoy notes');

// ----------------------------------------------------
// 5. Navigation, Router & Shell Integration
// ----------------------------------------------------
const routerSource = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
assert(routerSource.includes('path: \'safety\''), 'Router includes /safety path');
assert(routerSource.includes('path: \'safety/get-help\''), 'Router includes /safety/get-help path');
assert(routerSource.includes('SafetyLibraryPage'), 'Router mounts SafetyLibraryPage');
assert(routerSource.includes('GetHelpExperiencePage'), 'Router mounts GetHelpExperiencePage');

const navbarSource = readFileSync(resolve(process.cwd(), 'src/components/navigation/Navbar.jsx'), 'utf-8');
assert(navbarSource.includes('QuickExitButton'), 'Navbar renders QuickExitButton safety escape latch');

const navDataSource = readFileSync(resolve(process.cwd(), 'src/data/navigation.js'), 'utf-8');
assert(navDataSource.includes('/safety'), 'NAV_LINKS includes /safety navigation item');

console.log('------------------------------------------------------------');
console.log(`TOTAL PART 07 CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
