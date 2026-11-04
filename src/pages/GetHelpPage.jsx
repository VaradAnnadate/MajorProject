import React from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartHandshake, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { VERIFIED_HELPLINES } from '../data/rightsCatalog';

export default function GetHelpPage() {
  return (
    <div 
      className="get-help-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container-editorial">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="editorial-eyebrow" style={{ color: 'var(--color-terracotta-600)', justifyContent: 'center' }}>
            Immediate Child Safeguarding & Safety
          </span>
          <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Get Help & Reach Verified Support
          </h1>
          <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto' }}>
            If you or someone you know is in trouble, facing danger, abuse, or feels scared, 
            you are never alone. Real help is free, safe, and available right now.
          </p>
        </div>

        {/* Primary National Helpline Spotlight — 1098 */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-dark)',
            color: 'var(--color-ink-inverse)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            marginBottom: 'var(--space-8)',
            border: '2px solid var(--color-terracotta-500)',
            boxShadow: 'var(--shadow-floating)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
            <PhoneCall size={22} style={{ color: 'var(--color-terracotta-500)' }} />
            <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-terracotta-500)', fontWeight: 700 }}>
              Official National Child Helpline (MWCD / ERSS-112)
            </span>
          </div>

          <div 
            style={{
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-3)'
            }}
          >
            <div 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                fontWeight: 800,
                color: '#F8B5A7',
                lineHeight: 1
              }}
            >
              1098
            </div>
            <div style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
              Toll-Free · 24 Hours / 7 Days a Week · Anywhere in India
            </div>
          </div>

          <p style={{ color: 'var(--color-ink-inverse-muted)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: 'var(--space-5)', maxWidth: '680px' }}>
            Childline 1098 is the official national 24-hour emergency phone outreach service for children in need of care and protection. It connects directly with the Ministry of Women and Child Development and Emergency Response Support System (112).
          </p>

          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-3)'
            }}
          >
            <a 
              href="tel:1098" 
              className="btn btn-primary btn-tactile"
              style={{
                backgroundColor: 'var(--color-terracotta-500)',
                color: '#FFFFFF',
                padding: '0.75rem 1.6rem'
              }}
            >
              <PhoneCall size={18} />
              <span>Tap to Call 1098</span>
            </a>

            <a 
              href="tel:112" 
              className="btn btn-secondary btn-tactile"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>National Emergency: 112</span>
            </a>
          </div>
        </div>

        {/* Directory of Verified Helplines */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontSize: '1.45rem', marginBottom: 'var(--space-4)', fontFamily: 'var(--font-family-display)' }}>
            All Verified National Emergency Numbers
          </h2>

          <div className="grid-2-col">
            {VERIFIED_HELPLINES.map((help) => (
              <div 
                key={help.id}
                className="card-story"
                style={{
                  backgroundColor: 'var(--color-canvas-card)',
                  border: '1.5px solid var(--color-border-medium)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-ink-primary)' }}>
                    {help.name}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--color-saffron-600)'
                    }}
                  >
                    {help.number}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-3)' }}>
                  {help.hours} · {help.cost}
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                  {help.description}
                </p>

                <a 
                  href={`tel:${help.number.replace(/[^0-9]/g, '')}`}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.85rem',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <PhoneCall size={14} />
                  <span>Call {help.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Child Safety Principles: How to Recognize Unfair or Unsafe Situations */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            border: '1px solid var(--color-border-medium)',
            marginBottom: 'var(--space-10)'
          }}
        >
          <h2 style={{ fontSize: '1.35rem', marginBottom: 'var(--space-4)', fontFamily: 'var(--font-family-display)' }}>
            Remember These Core Safety Truths
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-ink-primary)' }}>
                  1. It is never your fault
                </strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
                  If an adult, peer, or stranger touches you inappropriately, hurts you, or asks for secret photos, you did nothing wrong.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-ink-primary)' }}>
                  2. Good adults never ask you to keep unsafe secrets
                </strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
                  Any secret that makes you feel uneasy, scared, or ashamed is an unsafe secret. Tell someone you trust right away.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-ink-primary)' }}>
                  3. Who is a "Trusted Adult"?
                </strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
                  A parent, grandparent, aunt or uncle who listens; a school teacher or principal; a school counselor; a doctor or nurse; a Child Welfare Officer.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Legal Disclaimer */}
        <div 
          style={{
            borderLeft: '4px solid var(--color-saffron-500)',
            backgroundColor: 'var(--color-canvas-card)',
            padding: 'var(--space-4) var(--space-5)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--color-ink-secondary)',
            lineHeight: 1.6
          }}
        >
          <strong style={{ color: 'var(--color-ink-primary)' }}>Mandatory Disclosure:</strong> RightsQuest India is an educational technology prototype. It is not an emergency response provider or legal representation service. If someone is in immediate physical danger, please contact local emergency authorities (112), Childline (1098), or visit the nearest police station immediately.
        </div>
      </div>
    </div>
  );
}

