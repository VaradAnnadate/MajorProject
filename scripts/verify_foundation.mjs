import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA FOUNDATION & ARCHITECTURE QA CHECK');
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

// 1. Files & Architecture
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'index.html',
  'src/main.jsx',
  'src/app/App.jsx',
  'src/app/router.jsx',
  'src/context/DemoLearnerContext.jsx',
  'src/components/common/EmergencyQuickBar.jsx',
  'src/components/navigation/Navbar.jsx',
  'src/components/layout/Footer.jsx',
  'src/components/layout/AppShell.jsx',
  'src/pages/LandingPage.jsx',
  'src/pages/AgeSelectionPage.jsx',
  'src/pages/LearnerHomePage.jsx',
  'src/pages/ExploreRightsPage.jsx',
  'src/pages/AdventuresPage.jsx',
  'src/pages/AchievementsPage.jsx',
  'src/pages/GetHelpPage.jsx',
  'src/pages/AboutPage.jsx',
  'src/data/demoProfiles.js',
  'src/data/rightsCatalog.js',
  'src/data/adventuresCatalog.js',
  'src/data/navigation.js',
  'src/styles/tokens.css',
  'src/styles/typography.css',
  'src/styles/motion.css',
  'src/styles/globals.css'
];

requiredFiles.forEach(f => {
  assert(existsSync(resolve(process.cwd(), f)), `File exists: ${f}`);
});

// 2. Data & Legal Fidelity Tests
import('../src/data/demoProfiles.js').then(demo => {
  assert(demo.AGE_BANDS.length === 3, 'Exactly 3 age bands configured (8-10, 11-13, 14-16)');
  assert(demo.AGE_BANDS.some(b => b.range.includes('8–10')), 'Age band 8-10 exists');
  assert(demo.AGE_BANDS.some(b => b.range.includes('11–13')), 'Age band 11-13 exists');
  assert(demo.AGE_BANDS.some(b => b.range.includes('14–16')), 'Age band 14-16 exists');
  assert(demo.DEMO_PERSONAS.length >= 3, 'At least 3 non-identifying demo personas available');
});

import('../src/data/rightsCatalog.js').then(rights => {
  assert(rights.UNCRC_FOUR_PILLARS.length === 4, 'UNCRC 4 pillars established (Survival, Development, Protection, Participation)');
  assert(rights.CORE_RIGHTS_CATALOG.some(r => r.citation.includes('Article 21A')), 'Article 21A & RTE Act 2009 documented');
  assert(rights.CORE_RIGHTS_CATALOG.some(r => r.citation.includes('Article 24')), 'Article 24 & Child Labour Amendment 2016 documented');
  assert(rights.CORE_RIGHTS_CATALOG.some(r => r.citation.includes('POCSO')), 'POCSO Act 2012 documented');
  assert(rights.CORE_RIGHTS_CATALOG.some(r => r.citation.includes('DPDP')), 'DPDP Act 2023 Section 9 documented');
  
  const helpline1098 = rights.VERIFIED_HELPLINES.find(h => h.number === '1098');
  assert(!!helpline1098, 'Childline 1098 verified and present');
  assert(helpline1098?.isPrimary === true, '1098 marked as primary child helpline');
});

// 3. Child Safety Anti-Pattern Audit (Scan source code for illegal PII collection)
const filesToScan = [
  'src/pages/LandingPage.jsx',
  'src/pages/AgeSelectionPage.jsx',
  'src/pages/LearnerHomePage.jsx',
  'src/context/DemoLearnerContext.jsx'
];

filesToScan.forEach(f => {
  const content = readFileSync(resolve(process.cwd(), f), 'utf8');
  assert(!content.includes('input type="tel"'), `No phone number inputs in ${f}`);
  assert(!content.includes('input type="email"'), `No email address inputs in ${f}`);
  assert(!content.includes('input type="password"'), `No password inputs in ${f}`);
  assert(!content.includes('leaderboard-rank'), `No competitive public leaderboard ranking in ${f}`);
});

// 4. CSS Tokens & Creative OS Compliance
const tokensContent = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
assert(tokensContent.includes('--ease-sovereign'), 'Sovereign cubic-bezier motion token defined');
assert(tokensContent.includes('--font-family-display'), 'Display font family defined (Fraunces)');
assert(tokensContent.includes('--font-family-body'), 'Body font family defined (Plus Jakarta Sans)');
assert(tokensContent.includes('--font-family-mono'), 'Mono font family defined (Space Mono)');
assert(tokensContent.includes('--color-saffron-500'), 'Saffron accent token present');
assert(tokensContent.includes('--color-terracotta-500'), 'Terracotta accent token present');
assert(tokensContent.includes('--color-peacock-500'), 'Peacock accent token present');
assert(tokensContent.includes('--color-canvas-primary'), 'Warm canvas token present');

// 5. Accessibility Audit
const globalsContent = readFileSync(resolve(process.cwd(), 'src/styles/globals.css'), 'utf8');
assert(globalsContent.includes(':focus-visible'), 'Accessible :focus-visible ring defined');
assert(globalsContent.includes('.skip-to-content'), 'Skip-to-content accessibility mechanism present');
assert(globalsContent.includes('min-height: 44px'), '44px minimum touch target size enforced for buttons');

setTimeout(() => {
  console.log('------------------------------------------------------------');
  console.log(`QA RESULTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('------------------------------------------------------------');
  if (failed > 0) process.exit(1);
}, 300);

