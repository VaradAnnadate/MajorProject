/**
 * Progression Persistence Service
 *
 * Provides safe local storage persistence with schema versioning and fallback.
 */

import { getInitialProgressionState } from '../engine/rewardEngine.js';

export const PROGRESSION_STORAGE_KEY = 'rq_progression_state_v1';

export function loadProgressionState() {
  try {
    const raw = localStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) {
      return getInitialProgressionState();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.totalXp !== 'number') {
      return getInitialProgressionState();
    }
    const baseline = getInitialProgressionState();
    return {
      ...baseline,
      ...parsed,
      completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions : baseline.completedMissions,
      unlockedArticles: Array.isArray(parsed.unlockedArticles) ? parsed.unlockedArticles : baseline.unlockedArticles,
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : baseline.unlockedBadgeIds,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : baseline.transactions,
      streak: (parsed.streak && typeof parsed.streak === 'object') ? { ...baseline.streak, ...parsed.streak } : baseline.streak,
    };
  } catch (err) {
    console.warn('Could not read progression state from localStorage, using initial baseline:', err);
    return getInitialProgressionState();
  }
}

export function saveProgressionState(state) {
  if (!state || typeof state !== 'object') return;
  try {
    localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not persist progression state to localStorage:', err);
  }
}

export function clearProgressionState() {
  try {
    localStorage.removeItem(PROGRESSION_STORAGE_KEY);
  } catch (err) {
    console.warn('Could not reset progression state:', err);
  }
}
