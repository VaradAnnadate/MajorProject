/**
 * RightsQuest India — Gameplay Feature Barrel Export
 * Public API for src/features/gameplay
 */

// Pages
export { default as ScenarioPage } from './pages/ScenarioPage';

// Components
export { default as ScenarioRunner } from './components/ScenarioRunner';
export { default as DialogueBox } from './components/DialogueBox';
export { default as ChoicePanel } from './components/ChoicePanel';
export { default as ConsequencePreview } from './components/ConsequencePreview';
export { default as ArticleRevealStamp } from './components/ArticleRevealStamp';
export { default as MascotGuide } from './components/MascotGuide';
export { default as ChapterProgress } from './components/ChapterProgress';
export { default as EvidenceInspector } from './components/EvidenceInspector';

// Engine
export { useScenarioEngine } from './engine/useScenarioEngine';

// Data
export {
  SCENARIO_01_BENCH,
  SCENARIO_02_SCREEN,
  SCENARIO_REGISTRY,
  getScenarioById,
  listScenarioIds,
} from './data/scenarioScripts';

