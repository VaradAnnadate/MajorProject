import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AGE_BANDS,
  DEMO_PERSONAS,
  DEMO_STORAGE_KEY,
  getInitialDemoState
} from '../data/demoProfiles';

const DemoLearnerContext = createContext(null);

export function DemoLearnerProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Local storage unavailable or restricted
    }
    return getInitialDemoState();
  });

  // ── Mission progress (Part 03 — additive) ─────────────────────────────────
  const [missionProgress, setMissionProgress] = useState(() => {
    try {
      const stored = localStorage.getItem('rq_mission_progress');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rq_mission_progress', JSON.stringify(missionProgress));
    } catch {
      // Storage write error handled gracefully
    }
  }, [missionProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage write error handled gracefully
    }
  }, [state]);

  const activeAgeBand = AGE_BANDS.find(b => b.id === state.selectedAgeBand) || AGE_BANDS[1];
  const activePersona = DEMO_PERSONAS.find(p => p.id === state.activePersonaId) || DEMO_PERSONAS[1];

  const setAgeBand = (bandId) => {
    const band = AGE_BANDS.find(b => b.id === bandId);
    if (!band) return;

    // Pick a matching persona for the newly selected band
    const matchingPersona = DEMO_PERSONAS.find(p => p.ageBandId === bandId) || DEMO_PERSONAS[0];

    setState(prev => ({
      ...prev,
      selectedAgeBand: bandId,
      activePersonaId: matchingPersona.id
    }));
  };

  const setPersona = (personaId) => {
    const persona = DEMO_PERSONAS.find(p => p.id === personaId);
    if (!persona) return;

    setState(prev => ({
      ...prev,
      activePersonaId: personaId,
      selectedAgeBand: persona.ageBandId
    }));
  };

  const resetDemoState = () => {
    setState(getInitialDemoState());
  };

  // ── Mission progress actions (Part 03 — additive) ─────────────────────────

  /**
   * Persist mid-mission checkpoint for a scenario.
   * @param {string} scenarioId
   * @param {{ currentChapter: string, choicesMade: Array, completed: boolean }} progress
   */
  const saveMissionProgress = useCallback((scenarioId, progress) => {
    setMissionProgress((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        ...progress,
        lastUpdated: new Date().toISOString(),
      },
    }));
  }, []);

  /**
   * Mark a mission as fully completed and record the article unlocked.
   * @param {string} scenarioId
   * @param {string|null} articleUnlocked
   */
  const completeMission = useCallback((scenarioId, articleUnlocked) => {
    setMissionProgress((prev) => ({
      ...prev,
      [scenarioId]: {
        ...prev[scenarioId],
        completed: true,
        articleUnlocked: articleUnlocked || null,
        completedAt: new Date().toISOString(),
      },
    }));
    // Also add to savedMissions list if not already there
    setState((prev) => ({
      ...prev,
      savedMissions: prev.savedMissions.includes(scenarioId)
        ? prev.savedMissions
        : [...prev.savedMissions, scenarioId],
    }));
  }, []);

  // Cinematic Intro Orchestration
  const [introPlaying, setIntroPlaying] = useState(true);
  const [introCurtainLifting, setIntroCurtainLifting] = useState(false);

  const triggerIntro = () => {
    setIntroCurtainLifting(false);
    setIntroPlaying(true);
  };

  const finishIntro = () => {
    setIntroPlaying(false);
    setIntroCurtainLifting(false);
  };

  const value = {
    state,
    activeAgeBand,
    activePersona,
    ageBands: AGE_BANDS,
    demoPersonas: DEMO_PERSONAS,
    setAgeBand,
    setPersona,
    resetDemoState,
    introPlaying,
    introCurtainLifting,
    setIntroCurtainLifting,
    triggerIntro,
    finishIntro,
    // Part 03 — mission progress
    missionProgress,
    saveMissionProgress,
    completeMission,
  };

  return (
    <DemoLearnerContext.Provider value={value}>
      {children}
    </DemoLearnerContext.Provider>
  );
}

export function useDemoLearner() {
  const context = useContext(DemoLearnerContext);
  if (!context) {
    throw new Error('useDemoLearner must be used within a DemoLearnerProvider');
  }
  return context;
}

