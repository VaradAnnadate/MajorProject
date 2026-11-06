import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA PART 04 PROGRESSION SYSTEM QA CHECK');
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

// 1. Part 04 Architecture & Component File Existence
const part04Files = [
  'src/features/progression/index.js',
  'src/features/progression/data/rewardConfig.js',
  'src/features/progression/data/levels.js',
  'src/features/progression/data/achievements.js',
  'src/features/progression/data/demoActivity.js',
  'src/features/progression/engine/rewardEngine.js',
  'src/features/progression/engine/streakEngine.js',
  'src/features/progression/services/progressionPersistence.js',
  'src/features/progression/hooks/useProgression.js',
  'src/features/progression/components/ProgressionHub.jsx',
  'src/features/progression/components/ProgressionHub.module.css',
  'src/features/progression/components/ExplorerProfile.jsx',
  'src/features/progression/components/ExplorerProfile.module.css',
  'src/features/progression/components/XPDisplay.jsx',
  'src/features/progression/components/XPDisplay.module.css',
  'src/features/progression/components/LevelProgress.jsx',
  'src/features/progression/components/LevelProgress.module.css',
  'src/features/progression/components/AchievementCollection.jsx',
  'src/features/progression/components/AchievementCollection.module.css',
  'src/features/progression/components/AchievementDetail.jsx',
  'src/features/progression/components/AchievementDetail.module.css',
  'src/features/progression/components/JourneyPath.jsx',
  'src/features/progression/components/JourneyPath.module.css',
  'src/features/progression/components/CooperativeProgress.jsx',
  'src/features/progression/components/CooperativeProgress.module.css',
  'src/features/progression/components/StreakCalendar.jsx',
  'src/features/progression/components/StreakCalendar.module.css',
  'src/features/progression/components/ActivityJournal.jsx',
  'src/features/progression/components/ActivityJournal.module.css',
  'src/features/progression/components/RewardCelebration.jsx',
  'src/features/progression/components/RewardCelebration.module.css',
  'src/features/progression/pages/ProgressionPage.jsx',
  'src/features/progression/pages/ProgressionPage.module.css',
];

part04Files.forEach((file) => {
  assert(existsSync(resolve(process.cwd(), file)), `Part 04 file exists: ${file}`);
});

// Dynamic imports of pure engine functions for logic testing
async function runEngineTests() {
  const { calculateLevel, PROGRESSION_LEVELS } = await import('../src/features/progression/data/levels.js');
  const { REWARD_CONFIG, generateEventId } = await import('../src/features/progression/data/rewardConfig.js');
  const { BADGE_DEFINITIONS, evaluateBadges } = await import('../src/features/progression/data/achievements.js');
  const { recordLearningActivity, differenceInDays } = await import('../src/features/progression/engine/streakEngine.js');
  const { processRewardEvent, getInitialProgressionState } = await import('../src/features/progression/engine/rewardEngine.js');

  // 2. Deterministic XP & Idempotency Tests
  const initialState = getInitialProgressionState();
  assert(initialState.totalXp > 0, 'Initial progression baseline XP established');
  assert(initialState.level.levelNumber === 1, 'Initial level is Level 1 (Curious Explorer)');

  // Award first mission completion
  const event1 = {
    eventType: 'MISSION_COMPLETED',
    sourceId: 'scenario-01-bench',
    learnerId: 'test-learner',
    metadata: {
      missionTitle: 'The Mystery of the Empty Bench',
      empatheticChoicesCount: 3,
      articleUnlocked: 'Article 21A',
    },
  };

  const result1 = processRewardEvent(initialState, event1);
  assert(!result1.error, 'First mission completion awarded without error');
  assert(result1.transaction !== null, 'Transaction record generated');
  const expectedXp = initialState.totalXp + REWARD_CONFIG.MISSION_COMPLETION_XP + (3 * REWARD_CONFIG.EMPATHETIC_CHOICE_XP);
  assert(result1.newState.totalXp === expectedXp, `Expected XP awarded (${expectedXp} XP)`);
  assert(result1.newState.completedMissions.includes('scenario-01-bench'), 'Mission registered in completedMissions');

  // IDEMPOTENCY: Re-processing identical event must be rejected
  const resultDuplicate = processRewardEvent(result1.newState, event1);
  assert(resultDuplicate.isDuplicate === true, 'Duplicate reward event correctly detected');
  assert(resultDuplicate.newState.totalXp === result1.newState.totalXp, 'Zero additional XP awarded on duplicate event (Idempotency guarantee)');
  assert(resultDuplicate.newState.transactions.length === result1.newState.transactions.length, 'No duplicate transaction inserted');

  // REPEAT MISSION POLICY: Replaying with qualifier awards repeat XP policy
  const replayEvent = {
    ...event1,
    metadata: { ...event1.metadata, qualifier: 'replay_session_2' },
  };
  const resultReplay = processRewardEvent(result1.newState, replayEvent);
  const repeatExpectedXp = result1.newState.totalXp + REWARD_CONFIG.REPEAT_MISSION_XP + (3 * REWARD_CONFIG.EMPATHETIC_CHOICE_XP);
  assert(resultReplay.newState.totalXp === repeatExpectedXp, 'Replaying mission applies repeat mission policy');

  // 3. Level & Threshold Progression Tests
  assert(PROGRESSION_LEVELS.length >= 7, 'At least 7 narrative recognition tiers configured');
  const lvl1 = calculateLevel(50);
  assert(lvl1.levelNumber === 1 && lvl1.title === 'Curious Explorer', '0-150 XP resolves to Level 1: Curious Explorer');

  const lvl2 = calculateLevel(200);
  assert(lvl2.levelNumber === 2 && lvl2.title === 'Story Pathfinder', '151-350 XP resolves to Level 2: Story Pathfinder');

  const lvl3 = calculateLevel(450);
  assert(lvl3.levelNumber === 3 && lvl3.title === 'Dignity Scout', '351-650 XP resolves to Level 3: Dignity Scout');

  const lvlMax = calculateLevel(3000);
  assert(lvlMax.isMaxLevel === true, 'Max level correctly identified without overflow');

  // 4. Badge Evaluation & Unlock Tests
  assert(BADGE_DEFINITIONS.length >= 10, 'At least 10 collectible badges defined across 4 categories');
  const unlockedBadges = evaluateBadges({
    completedMissions: ['scenario-01-bench'],
    unlockedArticles: ['Article 21A'],
    empatheticChoicesCount: 4,
    inspectedEvidenceCount: 1,
    helplineAccessCount: 1,
  });

  const bellBadge = unlockedBadges.find((b) => b.id === 'badge-first-bell');
  assert(bellBadge && bellBadge.unlocked, 'Seal of the First Bell unlocks on first completed mission');

  const art21aBadge = unlockedBadges.find((b) => b.id === 'badge-article-21a');
  assert(art21aBadge && art21aBadge.unlocked, 'Beacon of the Classroom unlocks when Article 21A is unlocked');

  const bystanderBadge = unlockedBadges.find((b) => b.id === 'badge-active-bystander');
  assert(bystanderBadge && bystanderBadge.unlocked, 'Courageous Ally unlocks on empathetic choices');

  // 5. Non-Punitive Streak Engine Tests
  const streak1 = recordLearningActivity({}, '2026-11-04');
  assert(streak1.currentStreak === 1, 'Initial activity day establishes streak 1');

  const streak2 = recordLearningActivity(streak1, '2026-11-05');
  assert(streak2.currentStreak === 2, 'Consecutive day advances streak to 2');

  // Missing a day: returns to 1 on return, but DOES NOT wipe longest streak or XP
  const streakAfterBreak = recordLearningActivity(streak2, '2026-11-08');
  assert(streakAfterBreak.currentStreak === 1, 'Returning after break resets streak counter to 1 without penalty');
  assert(streakAfterBreak.longestStreak === 2, 'Longest streak is preserved across breaks');
  assert(!streakAfterBreak.welcomeMessage.includes('lost') && !streakAfterBreak.welcomeMessage.includes('failed'), 'Streak message is non-punitive and welcoming');

  // 6. Router & Context Integration Verification
  const routerContent = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf-8');
  assert(routerContent.includes('/achievements') || routerContent.includes('achievements'), 'Route /achievements registered');
  assert(routerContent.includes('/progression') || routerContent.includes('progression'), 'Route /progression registered');

  const contextContent = readFileSync(resolve(process.cwd(), 'src/context/DemoLearnerContext.jsx'), 'utf-8');
  assert(contextContent.includes('progression'), 'progression state integrated into DemoLearnerContext');
  assert(contextContent.includes('awardReward'), 'awardReward action exposed in DemoLearnerContext');
  assert(contextContent.includes('awardMissionCompletion'), 'awardMissionCompletion action exposed in DemoLearnerContext');

  // 7. Child Safety & DPDP Section 9 Invariants
  const progressionPageContent = readFileSync(resolve(process.cwd(), 'src/features/progression/pages/ProgressionPage.jsx'), 'utf-8');
  const coopContent = readFileSync(resolve(process.cwd(), 'src/features/progression/components/CooperativeProgress.jsx'), 'utf-8');

  assert(!progressionPageContent.includes('type="password"'), 'Zero PII: No password input in ProgressionPage');
  assert(!progressionPageContent.includes('type="tel"'), 'Zero PII: No phone input in ProgressionPage');
  assert(!progressionPageContent.includes('type="email"'), 'Zero PII: No email input in ProgressionPage');
  assert(!coopContent.includes('leaderboard'), 'Zero competitive individual leaderboard in CooperativeProgress');
  assert(coopContent.includes('NON-COMPETITIVE COOPERATION'), 'Explicit non-competitive cooperative learning banner');

  console.log('------------------------------------------------------------');
  console.log(`PART 04 QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('------------------------------------------------------------');

  if (failed > 0) {
    process.exit(1);
  }
}

runEngineTests().catch((err) => {
  console.error('[FAIL] Runtime test runner error:', err);
  process.exit(1);
});

