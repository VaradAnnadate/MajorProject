/**
 * Deterministic Transactional Reward Engine
 *
 * Implements idempotent XP processing, level evaluation, badge evaluation,
 * and immutable audit transaction records.
 */

import { REWARD_CONFIG, generateEventId } from '../data/rewardConfig.js';
import { calculateLevel } from '../data/levels.js';
import { evaluateBadges } from '../data/achievements.js';
import { recordLearningActivity, toLocalDateString } from './streakEngine.js';
import { INITIAL_ACTIVITY_LOG } from '../data/demoActivity.js';

/**
 * Initial progression state.
 */
export function getInitialProgressionState() {
  const initialXp = 80; // Baseline exploration points from onboarding
  const levelInfo = calculateLevel(initialXp);
  const initialBadges = evaluateBadges({
    completedMissions: [],
    unlockedArticles: [],
    empatheticChoicesCount: 0,
    inspectedEvidenceCount: 0,
    helplineAccessCount: 0,
    coopContributionsCount: 0,
  });

  return {
    totalXp: initialXp,
    level: levelInfo,
    completedMissions: [],
    unlockedArticles: [],
    empatheticChoicesCount: 0,
    inspectedEvidenceCount: 0,
    helplineAccessCount: 0,
    coopContributionsCount: 0,
    realmsVisited: ['gardens-of-growth'],
    pillarsExplored: ['survival', 'development'],
    hasPerfectEmpathyMission: false,
    unlockedBadgeIds: [],
    badgeUnlockTimestamps: {},
    allBadges: initialBadges,
    transactions: [...INITIAL_ACTIVITY_LOG],
    streak: {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: toLocalDateString(),
      activeDates: [toLocalDateString()],
    },
    lastAwardEvent: null,
  };
}

/**
 * Process a reward event deterministically.
 *
 * @param {object} currentState - Current progression state
 * @param {object} event - { eventType, sourceId, learnerId, metadata }
 * @returns {{ newState: object, transaction: object|null, error: string|null, isDuplicate: boolean }}
 */
export function processRewardEvent(currentState, event) {
  if (!event || !event.eventType || !event.sourceId) {
    return {
      newState: currentState,
      transaction: null,
      error: 'Invalid reward event payload: eventType and sourceId are required.',
      isDuplicate: false,
    };
  }

  const { eventType, sourceId, learnerId = 'learner-local', metadata = {} } = event;
  const qualifier = metadata.qualifier || '';
  const eventId = generateEventId(learnerId, eventType, sourceId, qualifier);

  // Idempotency check: Reject duplicate transactions
  const isDuplicate = (currentState.transactions || []).some((t) => t.eventId === eventId);
  if (isDuplicate) {
    return {
      newState: currentState,
      transaction: null,
      error: `Duplicate event rejected: Event ${eventId} was already awarded.`,
      isDuplicate: true,
    };
  }

  // Determine XP amount based on event type and repetition policy
  let amount = 0;
  let title = 'Learning Milestone';
  let description = 'Constitutional discovery completed.';
  let category = 'explorer';

  switch (eventType) {
    case 'MISSION_COMPLETED': {
      const isRepeat = (currentState.completedMissions || []).includes(sourceId);
      amount = isRepeat ? REWARD_CONFIG.REPEAT_MISSION_XP : REWARD_CONFIG.MISSION_COMPLETION_XP;
      
      // Add empathetic choice bonus if provided
      const empatheticChoices = metadata.empatheticChoicesCount || 0;
      const empatheticBonus = empatheticChoices * REWARD_CONFIG.EMPATHETIC_CHOICE_XP;
      amount += empatheticBonus;

      title = isRepeat ? 'Mission Replay & Deepened Insight' : 'Constitutional Mission Completed';
      description = metadata.missionTitle
        ? `Completed story quest: "${metadata.missionTitle}" (${empatheticChoices} empathetic choices)`
        : `Completed quest: ${sourceId}`;
      category = 'learning';
      break;
    }

    case 'EVIDENCE_INSPECTED': {
      amount = REWARD_CONFIG.EVIDENCE_INSPECT_XP;
      title = 'Evidence Dossier Examined';
      description = metadata.evidenceTitle
        ? `Inspected tactile exhibit: "${metadata.evidenceTitle}"`
        : `Inspected evidence document in ${sourceId}`;
      category = 'explorer';
      break;
    }

    case 'RIGHTS_DISCOVERY': {
      amount = REWARD_CONFIG.RIGHTS_DISCOVERY_XP;
      title = 'Constitutional Right Unlocked';
      description = metadata.articleName
        ? `Studied legal protection under ${metadata.articleName}`
        : `Discovered rights topic: ${sourceId}`;
      category = 'learning';
      break;
    }

    case 'HELPLINE_ACCESSED': {
      amount = 20;
      title = 'Safe Harbor Protocol Explored';
      description = 'Accessed Childline 1098 confidential emergency helpline information.';
      category = 'kindness';
      break;
    }

    case 'COOP_CONTRIBUTED': {
      amount = 30;
      title = 'Community Quest Contribution';
      description = metadata.projectName
        ? `Contributed to collective community goal: "${metadata.projectName}"`
        : `Contributed to community milestone: ${sourceId}`;
      category = 'discovery';
      break;
    }

    case 'DAILY_BONUS': {
      amount = REWARD_CONFIG.DAILY_LEARNING_BONUS;
      title = 'Daily Explorer Bonus';
      description = 'Returned to the World of Every Child for continued exploration.';
      category = 'explorer';
      break;
    }

    default: {
      amount = Number(metadata.customXp) || 20;
      title = metadata.customTitle || 'Exploration Event';
      description = metadata.customDesc || `Exploration event logged for ${sourceId}`;
    }
  }

  // Calculate new total XP
  const newTotalXp = (currentState.totalXp || 0) + amount;
  const newLevel = calculateLevel(newTotalXp);

  // Update learner metrics
  const updatedCompletedMissions =
    eventType === 'MISSION_COMPLETED' && !currentState.completedMissions.includes(sourceId)
      ? [...currentState.completedMissions, sourceId]
      : [...(currentState.completedMissions || [])];

  const updatedUnlockedArticles =
    metadata.articleUnlocked && !currentState.unlockedArticles.includes(metadata.articleUnlocked)
      ? [...currentState.unlockedArticles, metadata.articleUnlocked]
      : [...(currentState.unlockedArticles || [])];

  const updatedEmpatheticChoicesCount =
    (currentState.empatheticChoicesCount || 0) + (metadata.empatheticChoicesCount || 0);

  const updatedInspectedEvidenceCount =
    eventType === 'EVIDENCE_INSPECTED'
      ? (currentState.inspectedEvidenceCount || 0) + 1
      : (currentState.inspectedEvidenceCount || 0);

  const updatedHelplineAccessCount =
    eventType === 'HELPLINE_ACCESSED'
      ? (currentState.helplineAccessCount || 0) + 1
      : (currentState.helplineAccessCount || 0);

  const updatedCoopContributionsCount =
    eventType === 'COOP_CONTRIBUTED'
      ? (currentState.coopContributionsCount || 0) + 1
      : (currentState.coopContributionsCount || 0);

  const updatedRealmsVisited = metadata.realmId && !currentState.realmsVisited.includes(metadata.realmId)
    ? [...currentState.realmsVisited, metadata.realmId]
    : [...(currentState.realmsVisited || ['gardens-of-growth'])];

  const updatedPillarsExplored = metadata.pillarId && !currentState.pillarsExplored.includes(metadata.pillarId)
    ? [...currentState.pillarsExplored, metadata.pillarId]
    : [...(currentState.pillarsExplored || ['survival', 'development'])];

  const hasPerfectEmpathyMission =
    currentState.hasPerfectEmpathyMission || Boolean(metadata.isPerfectEmpathy);

  // Evaluate badges
  const evaluationContext = {
    completedMissions: updatedCompletedMissions,
    unlockedArticles: updatedUnlockedArticles,
    empatheticChoicesCount: updatedEmpatheticChoicesCount,
    inspectedEvidenceCount: updatedInspectedEvidenceCount,
    helplineAccessCount: updatedHelplineAccessCount,
    coopContributionsCount: updatedCoopContributionsCount,
    realmsVisited: updatedRealmsVisited,
    pillarsExplored: updatedPillarsExplored,
    hasPerfectEmpathyMission,
    badgeUnlockTimestamps: currentState.badgeUnlockTimestamps || {},
  };

  const currentUnlockedIds = currentState.unlockedBadgeIds || [];
  const evaluatedBadges = evaluateBadges(evaluationContext, currentUnlockedIds);

  const newlyUnlockedBadges = evaluatedBadges.filter(
    (b) => b.unlocked && !currentUnlockedIds.includes(b.id)
  );

  const updatedUnlockedBadgeIds = [
    ...currentUnlockedIds,
    ...newlyUnlockedBadges.map((b) => b.id),
  ];

  const updatedBadgeTimestamps = { ...(currentState.badgeUnlockTimestamps || {}) };
  newlyUnlockedBadges.forEach((b) => {
    updatedBadgeTimestamps[b.id] = new Date().toISOString();
  });

  // Update streaks
  const updatedStreak = recordLearningActivity(currentState.streak);

  // Create immutable transaction record
  const transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    learnerId,
    eventId,
    eventType,
    sourceId,
    amount,
    title,
    description,
    category,
    awardedAt: new Date().toISOString(),
    badgesUnlocked: newlyUnlockedBadges.map((b) => b.name),
    metadata,
  };

  const newState = {
    ...currentState,
    totalXp: newTotalXp,
    level: newLevel,
    completedMissions: updatedCompletedMissions,
    unlockedArticles: updatedUnlockedArticles,
    empatheticChoicesCount: updatedEmpatheticChoicesCount,
    inspectedEvidenceCount: updatedInspectedEvidenceCount,
    helplineAccessCount: updatedHelplineAccessCount,
    coopContributionsCount: updatedCoopContributionsCount,
    realmsVisited: updatedRealmsVisited,
    pillarsExplored: updatedPillarsExplored,
    hasPerfectEmpathyMission,
    unlockedBadgeIds: updatedUnlockedBadgeIds,
    badgeUnlockTimestamps: updatedBadgeTimestamps,
    allBadges: evaluatedBadges,
    transactions: [transaction, ...(currentState.transactions || [])],
    streak: updatedStreak,
    lastAwardEvent: {
      transaction,
      levelUp: newLevel.levelNumber > (currentState.level?.levelNumber || 1),
      newBadges: newlyUnlockedBadges,
    },
  };

  return {
    newState,
    transaction,
    error: null,
    isDuplicate: false,
    levelUp: newLevel.levelNumber > (currentState.level?.levelNumber || 1),
    newlyUnlockedBadges,
  };
}
