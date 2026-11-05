import React from 'react';
import { Link } from 'react-router-dom';
import { WORLDS_DATA } from '../../world/data/worlds';
import { Compass, ArrowRight, Sparkles, MapPin } from 'lucide-react';

/**
 * Scene 02 — The World Awakens
 * Seamless revelation of the 5 realms connected across the landscape
 */
export default function StoryWorldParallax() {
  return (
    <section className="story-scene story-awakens-section">
      <div className="container">
        {/* Section Heading */}
        <div style={{ maxWidth: '720px', marginBottom: 'var(--space-6)' }}>
          <span className="editorial-eyebrow">
            Scene 02 · The World Awakens
          </span>
          <h2 
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.15,
              margin: 'var(--space-2) 0 var(--space-3) 0',
              color: 'var(--color-ink-primary)'
            }}
          >
            Five Living Realms. One Sacred Promise.
          </h2>
          <p className="text-lead" style={{ color: 'var(--color-ink-secondary)', margin: 0 }}>
            The world does not separate rights into dry textbook paragraphs. It maps them as living habitats 
            where every child can flourish, learn, speak, and stay safe.
          </p>
        </div>

        {/* Five Realms Grid */}
        <div className="story-realms-track">
          {WORLDS_DATA.map((world, idx) => (
            <div 
              key={world.id}
              className="realm-story-card interactive-card"
              style={{
                borderTop: `4px solid ${world.accentColor}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <span className="realm-card-number">
                  REALM 0{idx + 1}
                </span>
                <span 
                  className="badge"
                  style={{
                    backgroundColor: world.accentLight,
                    color: world.accentColor,
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700
                  }}
                >
                  {world.statutoryArticle}
                </span>
              </div>

              <h3 
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: '1.4rem',
                  lineHeight: 1.25,
                  margin: '0 0 8px 0',
                  color: 'var(--color-ink-primary)'
                }}
              >
                {world.name}
              </h3>

              <p 
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: 'var(--color-ink-secondary)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                {world.shortDescription}
              </p>

              {/* Landmark Highlights */}
              <div 
                style={{
                  backgroundColor: 'var(--color-canvas-card)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-4)',
                  fontSize: '0.78rem',
                  color: 'var(--color-ink-primary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)', fontSize: '0.68rem' }}>
                  <MapPin size={10} color={world.accentColor} />
                  KEY LANDMARK:
                </div>
                <strong>{world.landmarks[0].name}</strong> — {world.landmarks[0].hint}
              </div>

              <Link 
                to="/world" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-family-mono)',
                  fontWeight: 700,
                  color: world.accentColor,
                  textDecoration: 'none'
                }}
              >
                <span>Explore Realm on Map</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

