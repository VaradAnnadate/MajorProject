import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Heart, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Star,
  Users
} from 'lucide-react';
import { useDemoLearner } from '../context/DemoLearnerContext';

const BADGE_COLLECTION = [
  {
    id: 'badge-01',
    title: 'Seal of the School Bell',
    category: 'Right to Education (Article 21A)',
    description: 'Recognized that economic hardship must never bar a child from attending primary school.',
    tier: 'Constitutional Seal',
    unlocked: true,
    symbol: '🔔',
    bg: 'var(--color-saffron-100)',
    border: 'var(--color-saffron-border)',
    color: 'var(--color-saffron-600)'
  },
  {
    id: 'badge-02',
    title: 'Cyber Shield Emblem',
    category: 'Digital Safety & DPDP',
    description: 'Refused to disclose personal home address or private photos to an unknown online gamer.',
    tier: 'Safety Emblem',
    unlocked: true,
    symbol: '🛡️',
    bg: 'var(--color-peacock-100)',
    border: 'var(--color-peacock-border)',
    color: 'var(--color-peacock-600)'
  },
  {
    id: 'badge-03',
    title: 'Fair Play Champion',
    category: 'Non-Discrimination (Article 15)',
    description: 'Stood up for equal ground access for girls in community sports.',
    tier: 'Empathy Medal',
    unlocked: true,
    symbol: '🤝',
    bg: 'var(--color-forest-100)',
    border: 'var(--color-forest-border)',
    color: 'var(--color-forest-600)'
  },
  {
    id: 'badge-04',
    title: 'Dignity Advocate Seal',
    category: 'Freedom from Exploitation (Article 24)',
    description: 'Identified unlawful hazardous labor conditions affecting adolescent workers in a brick kiln.',
    tier: 'Legal Literacy',
    unlocked: false,
    symbol: '⚖️',
    bg: 'var(--color-canvas-secondary)',
    border: 'var(--color-border-medium)',
    color: 'var(--color-ink-muted)'
  },
  {
    id: 'badge-05',
    title: 'Voice of the Circle',
    category: 'Participation & Free Expression (UNCRC Art 12)',
    description: 'Helped classmates present their safety ideas to the school management committee.',
    tier: 'Participation',
    unlocked: false,
    symbol: '📢',
    bg: 'var(--color-canvas-secondary)',
    border: 'var(--color-border-medium)',
    color: 'var(--color-ink-muted)'
  },
  {
    id: 'badge-06',
    title: 'Guardian of Bodily Integrity',
    category: 'Personal Safety & POCSO Safeguards',
    description: 'Understood safe and unsafe boundaries and knew which trusted adults to alert.',
    tier: 'Safety Seal',
    unlocked: false,
    symbol: '⭐',
    bg: 'var(--color-canvas-secondary)',
    border: 'var(--color-border-medium)',
    color: 'var(--color-ink-muted)'
  }
];

export default function AchievementsPage() {
  const { activePersona, activeAgeBand } = useDemoLearner();

  return (
    <div 
      className="achievements-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-8)' }}>
          <span className="editorial-eyebrow">
            Dignity Passport & Learning Badges
          </span>
          <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Your Rights Passport
          </h1>
          <p className="text-lead">
            Every badge in your passport represents an empathetic choice, a recognized legal article, 
            or an action taken to protect dignity.
          </p>
        </div>

        {/* Safeguarding Anti-Pattern Notice */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1px solid var(--color-border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4) var(--space-5)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)'
          }}
        >
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-forest-100)',
              color: 'var(--color-forest-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ShieldCheck size={18} />
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--color-ink-primary)' }}>Healthy Learning Design:</strong> RightsQuest India rejects competitive public leaderboards, stress-inducing streaks, and punitive point systems. Badges celebrate personal understanding and empathy.
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid-3-col">
          {BADGE_COLLECTION.map((badge) => (
            <div
              key={badge.id}
              className="card-story interactive-card"
              style={{
                backgroundColor: badge.unlocked ? 'var(--color-canvas-elevated)' : 'var(--color-canvas-secondary)',
                border: `1.5px solid ${badge.border}`,
                opacity: badge.unlocked ? 1 : 0.72,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: badge.unlocked ? 'var(--shadow-press)' : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: badge.color,
                      backgroundColor: badge.bg,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    {badge.tier}
                  </span>

                  <span 
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: badge.unlocked ? 'var(--color-forest-500)' : 'var(--color-ink-muted)',
                      fontWeight: 700
                    }}
                  >
                    {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-3)' }}>
                  <div 
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: badge.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      border: `1px solid ${badge.border}`
                    }}
                  >
                    {badge.symbol}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem' }}>{badge.title}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{badge.category}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                  {badge.description}
                </p>
              </div>

              <div 
                style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: 'var(--space-3)',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: 'var(--color-ink-muted)'
                }}
              >
                {badge.unlocked ? `Recorded in Demo Profile: ${activePersona.codename}` : 'Complete upcoming adventure to earn'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

