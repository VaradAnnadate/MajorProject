import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';
import Mascot from '../../mascot/components/Mascot';

/**
 * Scene 01 — The Invitation
 * Immersive hero scene introducing The World of Every Child
 */
export default function StoryHero() {
  return (
    <section className="story-scene story-hero-scene">
      <div className="container">
        <div className="story-hero-grid">
          {/* Editorial Headline & Mission Spine */}
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-canvas-card)',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: 'var(--space-3)'
              }}
            >
              <Compass size={14} color="var(--color-saffron-500)" />
              <span 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron-600)',
                  fontWeight: 700
                }}
              >
                The Living Story World · Part 02
              </span>
            </div>

            <h1 className="story-hero-headline">
              Every child has a world of rights. <em>Come discover yours.</em>
            </h1>

            <p 
              className="text-lead"
              style={{
                maxWidth: '560px',
                marginBottom: 'var(--space-6)',
                color: 'var(--color-ink-secondary)'
              }}
            >
              Step into an illustrated universe where the Constitution of India comes alive. 
              Traverse five enchanted realms, uncover ancient landmarks of justice, and stand up for fairness with Mitra your guardian guide.
            </p>

            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap'
              }}
            >
              <Link to="/world" className="btn btn-primary" style={{ padding: '14px 26px', fontSize: '1rem' }}>
                <Compass size={18} />
                <span>Explore the World Map</span>
                <ArrowRight size={16} />
              </Link>

              <Link to="/enter" className="btn btn-secondary" style={{ padding: '14px 22px' }}>
                <span>Choose Age Mode</span>
              </Link>
            </div>

            {/* Safeguarding Trust Indicators */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-5)',
                marginTop: 'var(--space-8)',
                flexWrap: 'wrap',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-ink-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} color="var(--color-forest-500)" />
                <span>No Learner Identity Fields</span>
              </div>
              <div>•</div>
              <div>Constitution of India Grounded</div>
              <div>•</div>
              <div>Ages 8–16 Tailored</div>
            </div>
          </div>

          {/* Illustrated Hero Scene & Mitra Placement */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Luminous Glow Halo */}
            <div 
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(222, 114, 21, 0.18) 0%, rgba(251, 248, 243, 0) 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }}
            />

            {/* Mitra in Hero Size */}
            <Mascot 
              size="hero" 
              state="curious" 
              dialogue="I am Mitra, your companion on this journey! Together, we will uncover five magical realms of rights."
              interactive={true} 
            />

            {/* Quick Map Teaser Pill */}
            <Link
              to="/world"
              className="interactive-card laser-beam-card"
              style={{
                marginTop: 'var(--space-4)',
                padding: '10px 18px',
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-saffron-border)',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(18, 25, 39, 0.08)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-saffron-500)', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-ink-primary)' }}>
                5 Realms Ready to Explore
              </span>
              <ArrowRight size={14} color="var(--color-saffron-600)" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

