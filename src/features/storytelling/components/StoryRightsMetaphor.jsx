import React from 'react';
import { ShieldCheck, BookOpen, HeartHandshake, Sparkles, Scale, Lock } from 'lucide-react';

/**
 * Scene 03 — Discover the Meaning
 * Translates statutory protections into intuitive visual metaphors
 */
export default function StoryRightsMetaphor() {
  const PILLARS = [
    {
      title: 'Right to Survival',
      icon: HeartHandshake,
      article: 'Article 21 & Midday Meal',
      color: '#D04F36',
      bg: '#FDEEEA',
      metaphor: 'The Warm Hearth',
      description: 'Clean drinking water, wholesome nutrition, shelter, and medical care so every girl and boy grows strong without vulnerability.'
    },
    {
      title: 'Right to Development',
      icon: BookOpen,
      article: 'Article 21A & RTE Act 2009',
      color: '#297652',
      bg: '#E4F6ED',
      metaphor: 'The Open Garden Gate',
      description: 'Free, quality schooling, library access, play, and emotional enrichment without discriminatory fees or fear of corporal punishment.'
    },
    {
      title: 'Right to Protection',
      icon: ShieldCheck,
      article: 'POCSO Act 2012 & Article 24',
      color: '#1B6D80',
      bg: '#E4F3F6',
      metaphor: 'The Guardian Shield',
      description: 'Absolute safeguard from violence, hazardous labour, sexual exploitation, and neglect, backed by Childline 1098 toll-free help.'
    },
    {
      title: 'Right to Participation',
      icon: Scale,
      article: 'UNCRC Article 12 & Article 19',
      color: '#DE7215',
      bg: '#FDF1E3',
      metaphor: 'The Clear Echo River',
      description: 'Freedom to ask questions, share creative ideas, be consulted in decisions affecting one’s life, and join peaceful student councils.'
    }
  ];

  return (
    <section className="story-scene" style={{ backgroundColor: 'var(--color-canvas-primary)' }}>
      <div className="container">
        <div style={{ maxWidth: '740px', marginBottom: 'var(--space-6)' }}>
          <span className="editorial-eyebrow">
            Scene 03 · Discover the Meaning
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
            Rights Are Not Gifts. They Are Unshakable Pillars.
          </h2>
          <p className="text-lead" style={{ color: 'var(--color-ink-secondary)', margin: 0 }}>
            Under the Constitution of India and the UN Convention on the Rights of the Child (UNCRC), 
            these four pillars stand tall to protect childhood from harm and empower young voices.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="story-meaning-grid">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="pillar-story-card interactive-card"
                style={{
                  borderLeft: `3.5px solid ${pillar.color}`
                }}
              >
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: pillar.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: pillar.color,
                    marginBottom: 'var(--space-3)'
                  }}
                >
                  <Icon size={22} />
                </div>

                <div 
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-ink-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '2px'
                  }}
                >
                  METAPHOR: {pillar.metaphor}
                </div>

                <h3 
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: '1.25rem',
                    margin: '0 0 6px 0',
                    color: 'var(--color-ink-primary)'
                  }}
                >
                  {pillar.title}
                </h3>

                <span 
                  className="badge"
                  style={{
                    backgroundColor: 'var(--color-canvas-secondary)',
                    color: pillar.color,
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.68rem',
                    marginBottom: 'var(--space-2)',
                    display: 'inline-block'
                  }}
                >
                  {pillar.article}
                </span>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

