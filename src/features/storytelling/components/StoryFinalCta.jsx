import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';

/**
 * Scene 06 — Final Invitation
 * High-conviction conclusion with clear entry into learner adventure
 */
export default function StoryFinalCta() {
  return (
    <section className="story-scene" style={{ backgroundColor: 'var(--color-canvas-secondary)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
      <div className="container">
        <div className="story-final-card">
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
            <span 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.74rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-saffron-500)',
                fontWeight: 700,
                display: 'inline-block',
                marginBottom: 'var(--space-3)'
              }}
            >
              Scene 06 · The Journey Awaits
            </span>

            <h2 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: 'var(--space-4)'
              }}
            >
              Step inside. The Constitution is your shield and story.
            </h2>

            <p 
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                color: 'var(--color-ink-inverse-muted)',
                lineHeight: 1.6,
                marginBottom: 'var(--space-8)'
              }}
            >
              Whether you are an 8-year-old learning about playground fairness, 
              or a 16-year-old mastering constitutional legal safeguards, 
              RightsQuest is built to give you courage, knowledge, and dignity.
            </p>

            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap'
              }}
            >
              <Link 
                to="/world" 
                className="btn btn-primary"
                style={{
                  padding: '16px 32px',
                  fontSize: '1.05rem',
                  gap: '8px',
                  backgroundColor: 'var(--color-saffron-500)',
                  color: '#FFFFFF'
                }}
              >
                <Compass size={20} />
                <span>Launch Adventure Map</span>
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/enter" 
                className="btn"
                style={{
                  padding: '16px 28px',
                  fontSize: '1.05rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}
              >
                <span>Select Age Mode</span>
              </Link>
            </div>

            {/* Emergency & Safety Reminder */}
            <div 
              style={{
                marginTop: 'var(--space-8)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-6)',
                flexWrap: 'wrap',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-ink-inverse-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneCall size={14} color="var(--color-saffron-500)" />
                <span>Childline: Dial 1098 (Toll-Free, 24/7)</span>
              </div>
              <div>•</div>
              <div>DPDP Act 2023 Sec 9 Compliant</div>
              <div>•</div>
              <div>Non-Profit Educational Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

