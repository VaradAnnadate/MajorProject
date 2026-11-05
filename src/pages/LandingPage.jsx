import React from 'react';
import StoryHero from '../features/storytelling/components/StoryHero';
import StoryWorldParallax from '../features/storytelling/components/StoryWorldParallax';
import StoryRightsMetaphor from '../features/storytelling/components/StoryRightsMetaphor';
import StoryMascotIntro from '../features/storytelling/components/StoryMascotIntro';
import StoryMapPortal from '../features/storytelling/components/StoryMapPortal';
import StoryFinalCta from '../features/storytelling/components/StoryFinalCta';
import { useDemoLearner } from '../context/DemoLearnerContext';
import '../styles/storytelling.css';

/**
 * LandingPage — Cinematic Living Story World Experience (Part 02)
 * Orchestrates the 6-Scene Persuasion Spine governed by Creative OS 44_AGENCYLIKE_UI
 */
export default function LandingPage() {
  const { triggerIntro } = useDemoLearner();

  return (
    <div className="landing-page-v2">
      {/* Replay Intro Floating Header Trigger */}
      <div 
        style={{
          backgroundColor: 'var(--color-canvas-secondary)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '8px 0',
          fontSize: '0.75rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
            RIGHTSQUEST INDIA · PART 02: THE LIVING STORY WORLD
          </span>
          <button
            onClick={triggerIntro}
            className="btn"
            style={{
              padding: '2px 10px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-family-mono)',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-canvas-elevated)',
              border: '1px solid var(--color-border-medium)',
              cursor: 'pointer'
            }}
          >
            ✨ Replay Kinetic Intro
          </button>
        </div>
      </div>

      {/* Scene 01 — The Invitation */}
      <StoryHero />

      {/* Scene 02 — The World Awakens (Five Realms) */}
      <StoryWorldParallax />

      {/* Scene 03 — Discover the Meaning (Constitutional & UNCRC Metaphors) */}
      <StoryRightsMetaphor />

      {/* Scene 04 — The Companion (Mitra the Sun-Fox) */}
      <StoryMascotIntro />

      {/* Scene 05 — The Adventure Begins (Interactive Map Centerpiece) */}
      <StoryMapPortal />

      {/* Scene 06 — Final Invitation */}
      <StoryFinalCta />
    </div>
  );
}
