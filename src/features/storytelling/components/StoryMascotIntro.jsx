import React, { useState } from 'react';
import Mascot from '../../mascot/components/Mascot';
import { Sparkles, HeartHandshake, ShieldAlert, Compass } from 'lucide-react';
import { MASCOT_STATES } from '../../mascot/data/mascotStates';

/**
 * Scene 04 — The Companion Stage
 * Introduces Mitra, the Sun-Fox Guardian
 */
export default function StoryMascotIntro() {
  const [activeMascotState, setActiveMascotState] = useState('curious');

  const sampleStates = ['curious', 'happy', 'thinking', 'celebrating', 'encouraging', 'concerned'];

  return (
    <section className="story-scene" style={{ backgroundColor: 'var(--color-canvas-secondary)' }}>
      <div className="container">
        <div className="story-companion-stage">
          {/* Narrative Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <span className="editorial-eyebrow">
                Scene 04 · Meet Your Companion
              </span>
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                lineHeight: 1.15,
                margin: '0 0 var(--space-3) 0',
                color: 'var(--color-ink-primary)'
              }}
            >
              Meet Mitra. The Sun-Fox Guardian of the Map.
            </h2>

            <p className="text-lead" style={{ color: 'var(--color-ink-secondary)', marginBottom: 'var(--space-4)' }}>
              Mitra walks beside you across every realm. With a luminous lantern tail that lights dark paths 
              and an empathetic heart that listens, Mitra helps you understand difficult dilemmas without judging.
            </p>

            {/* Trait Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={16} color="var(--color-saffron-500)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)' }}>
                  <strong>Supportive, not authoritative:</strong> Encourages you to think critically, rather than telling you what to think.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={16} color="var(--color-terracotta-500)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)' }}>
                  <strong>Protective & Compassionate:</strong> Serious and empathetic during sensitive safety scenarios; connects you directly to trusted adults and 1098.
                </span>
              </div>
            </div>

            {/* Emotion Switcher Buttons */}
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', display: 'block', marginBottom: '8px' }}>
                TEST MITRA’S EXPRESSIONS & STATES:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleStates.map((stKey) => {
                  const isSelected = activeMascotState === stKey;
                  return (
                    <button
                      key={stKey}
                      onClick={() => setActiveMascotState(stKey)}
                      className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-family-mono)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {stKey}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mitra Interactive Character Display */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Mascot
              size="hero"
              state={activeMascotState}
              showBubble={true}
              interactive={true}
              onStateChange={setActiveMascotState}
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', marginTop: '8px', fontStyle: 'italic' }}>
              Tap Mitra to trigger companion reactions
            </span>
          </div>
        </div>

        {/* Editorial Terminus — End of the Introduction */}
        <div className="story-scene-terminus">
          <div className="terminus-divider">
            <span className="terminus-line" />
            <span className="terminus-gem">☸</span>
            <span className="terminus-line" />
          </div>
          <div className="terminus-badge">
            <span className="terminus-dot" />
            <span>THE THRESHOLD OF SOVEREIGN RIGHTS · END OF PROLOGUE</span>
          </div>
          <h3 className="terminus-title">
            The Introduction Ends Here. The Living Journey Awaits.
          </h3>
          <p className="terminus-desc">
            You have discovered your rights and met your guardian companion. Ahead lies the living universe.
            Travel through the golden Sovereign Seal below to cross into the 5 Constitutional Realms.
          </p>
          <div className="terminus-indicator">
            <span className="terminus-arrow-text">SCROLL TO TRAVEL INSIDE THE 3D SOVEREIGN SEAL</span>
            <span className="terminus-chevron">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

