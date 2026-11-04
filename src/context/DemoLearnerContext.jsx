import React, { createContext, useContext, useState, useEffect } from 'react';
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
    finishIntro
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

