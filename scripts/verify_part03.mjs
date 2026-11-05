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
assert(scriptsContent.includes('SCENARIO_01_BENCH'), 'Mission 1: Empty Bench scenario script present');
assert(scriptsContent.includes('SCENARIO_02_SCREEN'), 'Mission 2: Whispering Screen scenario script present');
assert(scriptsContent.includes('Article 21A'), 'Scenario 1 grounded in Article 21A');
assert(scriptsContent.includes('POCSO Act'), 'Scenario 2 grounded in POCSO Act');
assert(scriptsContent.includes('1098'), 'Childline 1098 safety helpline referenced in scenario scripts');
assert(scriptsContent.includes('concerned'), 'Mitra concerned state utilized in scenario safeguarding');

// 3. Router Integration
const routerContent = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
assert(routerContent.includes('play/:scenarioId'), 'Scenario route registered in router.jsx (/play/:scenarioId)');
assert(routerContent.includes('ScenarioPage'), 'ScenarioPage lazy-loaded in router.jsx');

// 4. DemoLearnerContext Integration
const contextContent = readFileSync(resolve(process.cwd(), 'src/context/DemoLearnerContext.jsx'), 'utf-8');
assert(contextContent.includes('missionProgress'), 'missionProgress state registered in DemoLearnerContext');
assert(contextContent.includes('saveMissionProgress'), 'saveMissionProgress action exposed in DemoLearnerContext');
assert(contextContent.includes('completeMission'), 'completeMission action exposed in DemoLearnerContext');

// 5. Child Safety & DPDP Anti-Pattern Verification in Gameplay
const scenarioPageContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/pages/ScenarioPage.jsx'), 'utf-8');
const runnerContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/ScenarioRunner.jsx'), 'utf-8');

assert(!scenarioPageContent.includes('type="password"'), 'No password input in ScenarioPage');
assert(!scenarioPageContent.includes('type="tel"'), 'No phone number input in ScenarioPage');
assert(!scenarioPageContent.includes('type="email"'), 'No email input in ScenarioPage');
assert(!runnerContent.includes('leaderboard'), 'No competitive leaderboard in ScenarioRunner');

// 6. Creative OS & Motion Integration
const dialogueBoxContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/DialogueBox.jsx'), 'utf-8');
const stampContent = readFileSync(resolve(process.cwd(), 'src/features/gameplay/components/ArticleRevealStamp.jsx'), 'utf-8');

assert(dialogueBoxContent.includes('gsap'), 'GSAP animation utilized in DialogueBox');
assert(stampContent.includes('gsap'), 'GSAP dramatic timeline utilized in ArticleRevealStamp');

console.log('------------------------------------------------------------');
console.log(`PART 03 QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
}

