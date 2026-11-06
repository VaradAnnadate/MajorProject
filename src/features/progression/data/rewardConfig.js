/**
 * Central Reward Configuration for RightsQuest India
 *
 * Deterministic XP rewards and anti-inflation policies.
 * No hardcoded reward numbers scattered across components.
 */

export const REWARD_CONFIG = {
  // Base event rewards
  MISSION_COMPLETION_XP: 120,       // Full scenario story completion
  EMPATHETIC_CHOICE_XP: 15,         // Per empathetic decision chosen during chapter
  EVIDENCE_INSPECT_XP: 25,          // Interactive document / evidence inspection
  RIGHTS_DISCOVERY_XP: 30,          // Unlocking a constitutional article or statute
  DAILY_LEARNING_BONUS: 40,         // First active quest on any given calendar day

  // Replay & anti-inflation policy
  REPEAT_MISSION_XP: 25,            // Replaying a mission grants insight without inflating progression
  MAX_DAILY_REPEAT_REWARD: 50,      // Maximum repeat XP awardable in a single calendar day

  // Category multipliers for age-bands
  AGE_BAND_MULTIPLIERS: {
    'band-8-10': 1.0,
    'band-11-13': 1.0,
    'band-14-16': 1.0,
  },
};

/**
 * Generate a deterministic, idempotent event identifier.
 * Prevents awarding XP twice for the exact same event.
 *
 * @param {string} learnerId - The learner's anonymous persona or device ID
 * @param {string} eventType - e.g. 'MISSION_COMPLETED', 'EVIDENCE_INSPECTED', 'DAILY_BONUS'
 * @param {string} sourceId - e.g. 'scenario-01-bench', 'evidence-ch-02'
 * @param {string} [qualifier=''] - Optional qualifier e.g. 'replay_2026-11-06'
 * @returns {string} Unique event ID
 */
export function generateEventId(learnerId, eventType, sourceId, qualifier = '') {
  const base = `${learnerId || 'anon'}_${eventType}_${sourceId}`;
  return qualifier ? `${base}_${qualifier}` : base;
}

