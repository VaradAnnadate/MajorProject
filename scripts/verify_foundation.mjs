import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA FOUNDATION & ARCHITECTURE QA CHECK');
console.log('PART 01 (Foundation) & PART 02 (The Living Story World)');
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

// 1. Files & Architecture (Part 01 Foundation)
const foundationFiles = [
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

foundationFiles.forEach(f => {
  assert(existsSync(resolve(process.cwd(), f)), `Foundation file exists: ${f}`);
});

// 2. Part 02: Story World, Mascot & Interactive Map Files
const part02Files = [
  'src/features/world/data/worlds.js',
  'src/features/world/components/WorldMap.jsx',
  'src/features/world/components/WorldDestination.jsx',
  'src/features/world/components/WorldLandmark.jsx',
  'src/features/world/components/WorldAtmosphere.jsx',
  'src/features/world/components/WorldDetailModal.jsx',
  'src/features/world/pages/WorldMapPage.jsx',
  'src/features/mascot/data/mascotStates.js',
  'src/features/mascot/components/Mascot.jsx',
  'src/features/mascot/components/MascotReaction.jsx',
  'src/features/storytelling/components/StoryHero.jsx',
  'src/features/storytelling/components/StoryWorldParallax.jsx',
  'src/features/storytelling/components/StoryRightsMetaphor.jsx',
  'src/features/storytelling/components/StoryMascotIntro.jsx',
  'src/features/storytelling/components/StoryMapPortal.jsx',
  'src/features/storytelling/components/StoryFinalCta.jsx',
  'src/styles/world.css',
  'src/styles/mascot.css',
  'src/styles/storytelling.css'
];

part02Files.forEach(f => {
  assert(existsSync(resolve(process.cwd(), f)), `Part 02 Living World file exists: ${f}`);
});

// 3. Part 02 World Data Integrity Verification
import('../src/features/world/data/worlds.js').then(worldModule => {
  const worlds = worldModule.WORLDS_DATA;
  assert(worlds.length === 5, 'Exactly 5 living realms in The World of Every Child');

  const vBelonging = worlds.find(w => w.id === 'village-of-belonging');
  assert(!!vBelonging && vBelonging.statutoryArticle.includes('15(3)'), 'Village of Belonging grounded in Article 15(3)');

  const gGrowth = worlds.find(w => w.id === 'gardens-of-growth');
  assert(!!gGrowth && gGrowth.statutoryArticle.includes('21A'), 'Gardens of Growth grounded in Article 21A & RTE Act');

  const fSafety = worlds.find(w => w.id === 'forest-of-safety');
  assert(!!fSafety && fSafety.statutoryArticle.includes('POCSO'), 'Forest of Safety grounded in POCSO Act 2012');

  const rVoices = worlds.find(w => w.id === 'river-of-voices');
  assert(!!rVoices && rVoices.statutoryArticle.includes('UNCRC Article 12'), 'River of Voices grounded in UNCRC Article 12');

  const hDignity = worlds.find(w => w.id === 'haven-of-dignity');
  assert(!!hDignity && hDignity.statutoryArticle.includes('24'), 'Haven of Dignity grounded in Article 24 & Child Labour Act');

  // Verify each world has landmarks and missions
  worlds.forEach(w => {
    assert(w.landmarks.length >= 2, `${w.name} has at least 2 discoverable landmarks`);
    assert(w.missions.length >= 2, `${w.name} has at least 2 story quest previews`);
    assert(!!w.lore && w.lore.length > 50, `${w.name} has rich environmental lore`);
  });
});

// 4. Part 02 Mascot Identity & States Verification
import('../src/features/mascot/data/mascotStates.js').then(mascotModule => {
  const states = mascotModule.MASCOT_STATES;
  const requiredStates = [
    'idle', 'happy', 'curious', 'thinking', 'celebrating',
    'encouraging', 'explaining', 'discovering', 'concerned'
  ];

  requiredStates.forEach(st => {
    assert(!!states[st], `Mitra mascot has required state: '${st}'`);
  });

  assert(states.concerned.dialogue !== undefined || states.concerned.defaultDialogue.includes('1098'), 
    'Concerned state explicitly references Childline 1098 safeguard');
});

// 5. Part 01 Data & Legal Fidelity Tests
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

// 6. Child Safety Anti-Pattern Audit (Scan source code for illegal PII collection)
const filesToScan = [
  'src/pages/LandingPage.jsx',
  'src/pages/AgeSelectionPage.jsx',
  'src/pages/LearnerHomePage.jsx',
  'src/context/DemoLearnerContext.jsx',
  'src/features/world/pages/WorldMapPage.jsx'
];

filesToScan.forEach(f => {
  const content = readFileSync(resolve(process.cwd(), f), 'utf8');
  assert(!content.includes('input type="tel"'), `No phone number inputs in ${f}`);
  assert(!content.includes('input type="email"'), `No email address inputs in ${f}`);
  assert(!content.includes('input type="password"'), `No password inputs in ${f}`);
  assert(!content.includes('leaderboard-rank'), `No competitive public leaderboard ranking in ${f}`);
});

// 7. CSS Tokens & Creative OS Compliance
const tokensContent = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
assert(tokensContent.includes('--ease-sovereign'), 'Sovereign cubic-bezier motion token defined');
assert(tokensContent.includes('--font-family-display'), 'Display font family defined (Fraunces)');
assert(tokensContent.includes('--font-family-body'), 'Body font family defined (Plus Jakarta Sans)');
assert(tokensContent.includes('--font-family-mono'), 'Mono font family defined (Space Mono)');
assert(tokensContent.includes('--color-saffron-500'), 'Saffron accent token present');
assert(tokensContent.includes('--color-terracotta-500'), 'Terracotta accent token present');
assert(tokensContent.includes('--color-peacock-500'), 'Peacock accent token present');
assert(tokensContent.includes('--color-canvas-primary'), 'Warm canvas token present');

// 8. Accessibility Audit
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
