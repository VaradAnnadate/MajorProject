import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Check, 
  RotateCcw,
  UserCheck
} from 'lucide-react';
import { useDemoLearner } from '../context/DemoLearnerContext';
import { AGE_BANDS, DEMO_PERSONAS } from '../data/demoProfiles';

export default function AgeSelectionPage() {
  const { 
    state, 
    activeAgeBand, 
    activePersona, 
    setAgeBand, 
    setPersona, 
    resetDemoState 
  } = useDemoLearner();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div 
      className="age-selection-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container-editorial">
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="editorial-eyebrow" style={{ justifyContent: 'center' }}>
            Learner Entry Shell · Demonstration Mode
          </span>
          <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Choose Your Learning Adventure
          </h1>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Select your age group below. Stories, visual pacing, and rights scenarios adapt 
            to your level of curiosity and maturity.
          </p>
        </div>

        {/* DPDP 2023 Child Privacy Safe Harbor Banner */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1.5px solid var(--color-forest-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4) var(--space-5)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            boxShadow: 'var(--shadow-press)'
          }}
        >
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-forest-100)',
              color: 'var(--color-forest-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Lock size={18} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--color-ink-primary)' }}>Child Privacy Promise:</strong> We never collect your real name, phone number, location, or school. You explore through fictional demonstration avatars stored only on your current device.
          </div>
        </div>

        {/* Step 1: Age Band Selection Cards */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)' }}>
              1. Select Age Band
            </h2>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
              Step 1 of 2
            </span>
          </div>

          <div className="grid-3-col" style={{ paddingTop: '10px' }}>
            {AGE_BANDS.map((band) => {
              const isSelected = band.id === state.selectedAgeBand;

              return (
                <div
                  key={band.id}
                  onClick={() => setAgeBand(band.id)}
                  className="interactive-card"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setAgeBand(band.id);
                    }
                  }}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-canvas-card)' : 'var(--color-canvas-primary)',
                    border: isSelected ? `2.5px solid ${band.accentColor}` : '1.5px solid var(--color-border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5)',
                    paddingTop: isSelected ? 'calc(var(--space-5) + 4px)' : 'var(--space-5)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'visible',
                    boxShadow: isSelected ? 'var(--shadow-story-card)' : 'var(--shadow-press)'
                  }}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '-13px',
                        right: '12px',
                        backgroundColor: band.accentColor,
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-pill)',
                        padding: '3px 12px 3px 10px',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-family-mono)',
                        fontWeight: 800,
                        letterSpacing: '0.07em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        whiteSpace: 'nowrap',
                        zIndex: 2
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                      <span>SELECTED</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                    <span 
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: band.accentColor,
                        backgroundColor: band.accentBg,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    >
                      {band.range}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)' }}>
                      {band.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                    {band.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                    {band.description}
                  </p>

                  <div 
                    style={{
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: 'var(--color-ink-muted)',
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: 'var(--space-3)'
                    }}
                  >
                    Theme: {band.theme}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Demo Persona Selection */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-4)'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)' }}>
              2. Choose Your Demo Persona
            </h2>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
              Non-identifying Avatar
            </span>
          </div>

          <div className="grid-3-col">
            {DEMO_PERSONAS.map((persona) => {
              const isSelected = persona.id === state.activePersonaId;
              const matchesBand = persona.ageBandId === state.selectedAgeBand;

              return (
                <div
                  key={persona.id}
                  onClick={() => setPersona(persona.id)}
                  className="interactive-card"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setPersona(persona.id);
                    }
                  }}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-canvas-card)' : 'var(--color-canvas-primary)',
                    border: isSelected ? '2px solid var(--color-ink-primary)' : '1px solid var(--color-border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    opacity: matchesBand ? 1 : 0.65
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-3)' }}>
                    <div 
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--color-canvas-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        border: '1px solid var(--color-border-medium)'
                      }}
                    >
                      {persona.symbol}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>
                        {persona.codename}
                      </h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>
                        {persona.focusTopic}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-secondary)', fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                    "{persona.tagline}"
                  </p>

                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: 'var(--color-ink-muted)'
                    }}
                  >
                    <span>{persona.stats.rightsDiscovered} Rights Discovered</span>
                    <span>{persona.stats.dignityShields} Shields</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmation & Entry Action Box */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-dark)',
            color: 'var(--color-ink-inverse)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            boxShadow: 'var(--shadow-story-card)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: '1.4rem' }}>{activePersona.symbol}</span>
              <span 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  color: 'var(--color-saffron-500)',
                  fontWeight: 700
                }}
              >
                READY AS: {activePersona.codename.toUpperCase()}
              </span>
            </div>

            <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF' }}>
              Entering {activeAgeBand.title} ({activeAgeBand.range})
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-inverse-muted)', marginTop: '4px' }}>
              Your initial quest: <em>"{activePersona.activeAdventure.title}"</em>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button 
              type="button"
              onClick={resetDemoState}
              className="btn btn-outline"
              style={{
                color: 'var(--color-ink-inverse-muted)',
                borderColor: 'var(--color-canvas-dark-border)',
                fontSize: '0.85rem'
              }}
              title="Reset demonstration state"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button 
              type="button"
              onClick={handleContinue}
              className="btn btn-primary btn-tactile"
              style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}
            >
              <span>Enter Learner Home</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

