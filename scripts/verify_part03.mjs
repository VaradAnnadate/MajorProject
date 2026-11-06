import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA PART 03 SCENARIO ENGINE QA CHECK');
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

// 1. Part 03 File Existence
const part03Files = [
  'src/features/gameplay/index.js',
  'src/features/gameplay/data/scenarioScripts.js',
  'src/features/gameplay/engine/useScenarioEngine.js',
  'src/features/gameplay/components/ScenarioRunner.jsx',
  'src/features/gameplay/components/ScenarioRunner.module.css',
  'src/features/gameplay/components/DialogueBox.jsx',
  'src/features/gameplay/components/DialogueBox.module.css',
  'src/features/gameplay/components/ChoicePanel.jsx',
  'src/features/gameplay/components/ChoicePanel.module.css',
  'src/features/gameplay/components/ArticleRevealStamp.jsx',
  'src/features/gameplay/components/ArticleRevealStamp.module.css',
  'src/features/gameplay/components/ConsequencePreview.jsx',
  'src/features/gameplay/components/ConsequencePreview.module.css',
  'src/features/gameplay/components/MascotGuide.jsx',
  'src/features/gameplay/components/MascotGuide.module.css',
  'src/features/gameplay/components/ChapterProgress.jsx',
  'src/features/gameplay/components/ChapterProgress.module.css',
  'src/features/gameplay/components/EvidenceInspector.jsx',
  'src/features/gameplay/components/EvidenceInspector.module.css',
  'src/features/gameplay/pages/ScenarioPage.jsx',
  'src/features/gameplay/pages/ScenarioPage.module.css',
];

part03Files.forEach((file) => {
  assert(existsSync(resolve(process.cwd(), file)), `Part 03 file exists: ${file}`);
});

// 2. Scenario Scripts Fidelity & Content Mandate
const scriptsContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/data/scenarioScripts.js'), 'utf-8');
assert(scriptsContent.includes('SCENARIO_01_BENCH'), 'Mission A: The Missing Classroom (Bench) scenario script present');
assert(scriptsContent.includes('SCENARIO_02_WORDS'), 'Mission B: The Forest of Unkind Words scenario script present');
assert(scriptsContent.includes('SCENARIO_03_WORKSHOP'), 'Mission C: The Silent Workshop scenario script present');
assert(scriptsContent.includes('SCENARIO_02_SCREEN'), 'Digital Safety Mission (Whispering Screen) scenario script present');
assert(scriptsContent.includes('Article 21A'), 'Mission A grounded in Article 21A & RTE Act');
assert(scriptsContent.includes('Article 14') && scriptsContent.includes('Article 15(3)'), 'Mission B grounded in Article 14 & 15(3)');
assert(scriptsContent.includes('Article 24'), 'Mission C grounded in Article 24 (Hazardous Labour Prohibition)');
assert(scriptsContent.includes('POCSO Act'), 'Digital safety grounded in POCSO Act 2012');
assert(scriptsContent.includes('1098'), 'Childline 1098 safety helpline referenced in scenario scripts');
assert(scriptsContent.includes('concerned'), 'Mitra concerned state utilized in scenario safeguarding');
assert(scriptsContent.includes('textByAge'), 'Age-band adapted dialogues configured in scenario scripts');

// 3. Router & Navigation Integration
const routerContent = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
const adventuresContent = readFileSync(resolve(process.cwd(), 'src/pages/AdventuresPage.jsx'), 'utf-8');
const worldMapPageContent = readFileSync(resolve(process.cwd(), 'src/features/world/pages/WorldMapPage.jsx'), 'utf-8');
assert(routerContent.includes('play/:scenarioId'), 'Scenario route registered in router.jsx (/play/:scenarioId)');
assert(routerContent.includes('ScenarioPage'), 'ScenarioPage lazy-loaded in router.jsx');
assert(adventuresContent.includes('scenario-02-words') && adventuresContent.includes('scenario-03-workshop'), 'All demonstration missions mapped in AdventuresPage');
assert(worldMapPageContent.includes('/play/'), 'Direct play route navigation implemented in WorldMapPage');

// 4. DemoLearnerContext Integration & Design Tokens
const contextContent = readFileSync(resolve(process.cwd(), 'src/context/DemoLearnerContext.jsx'), 'utf-8');
const tokensContent = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf-8');
assert(contextContent.includes('missionProgress'), 'missionProgress state registered in DemoLearnerContext');
assert(contextContent.includes('saveMissionProgress'), 'saveMissionProgress action exposed in DemoLearnerContext');
assert(contextContent.includes('completeMission'), 'completeMission action exposed in DemoLearnerContext');
assert(tokensContent.includes('--font-family-serif') && tokensContent.includes('--font-family-sans'), 'Design tokens: serif and sans font variables resolved');

// 5. Child Safety & DPDP Anti-Pattern Verification in Gameplay
const scenarioPageContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/pages/ScenarioPage.jsx'), 'utf-8');
const runnerContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/ScenarioRunner.jsx'), 'utf-8');

assert(!scenarioPageContent.includes('type="password"'), 'Zero PII: No password input in ScenarioPage');
assert(!scenarioPageContent.includes('type="tel"'), 'Zero PII: No phone number input in ScenarioPage');
assert(!scenarioPageContent.includes('type="email"'), 'Zero PII: No email input in ScenarioPage');
assert(!runnerContent.includes('leaderboard'), 'No competitive leaderboard in ScenarioRunner');
assert(runnerContent.includes('Childline 1098'), 'Persistent Childline 1098 safeguard accessible in ScenarioRunner');
assert(runnerContent.includes('DPDP Act 2023 §9'), 'DPDP Act 2023 §9 child privacy guarantee present in safeguard modal');
assert(runnerContent.includes('Constitutional Insight Milestone'), 'Dignity milestone presentation replaces raw arcade XP');

// 6. Creative OS, Motion Integration & Accessibility
const dialogueBoxContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/DialogueBox.jsx'), 'utf-8');
const stampContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/ArticleRevealStamp.jsx'), 'utf-8');

assert(dialogueBoxContent.includes('gsap'), 'GSAP animation utilized in DialogueBox');
assert(dialogueBoxContent.includes('prefers-reduced-motion'), 'prefers-reduced-motion respected in DialogueBox');
assert(stampContent.includes('gsap'), 'GSAP dramatic timeline utilized in ArticleRevealStamp');

console.log('------------------------------------------------------------');
console.log(`PART 03 QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
}

