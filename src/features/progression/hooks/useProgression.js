/**
 * Hook to access and interact with the Living Progression System.
 */

import { useDemoLearner } from '../../../context/DemoLearnerContext';

export function useProgression() {
  const learner = useDemoLearner();

  return {
    progression: learner.progression,
    totalXp: learner.progression?.totalXp || 0,
    level: learner.progression?.level || {},
    badges: learner.progression?.allBadges || [],
    unlockedBadges: (learner.progression?.allBadges || []).filter((b) => b.unlocked),
    lockedBadges: (learner.progression?.allBadges || []).filter((b) => !b.unlocked),
    streak: learner.progression?.streak || {},
    transactions: learner.progression?.transactions || [],
    completedMissions: learner.progression?.completedMissions || [],
    lastAwardEvent: learner.progression?.lastAwardEvent,
    awardReward: learner.awardReward,
    awardMissionCompletion: learner.awardMissionCompletion,
    inspectEvidenceReward: learner.inspectEvidenceReward,
    contributeToCoop: learner.contributeToCoop,
    recordHelplineAccess: learner.recordHelplineAccess,
    dismissCelebration: learner.dismissCelebration,
    resetProgression: learner.resetProgression,
  };
}

