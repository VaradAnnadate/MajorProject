import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, PhoneCall, ExternalLink, Lock } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';

export default function Footer() {
  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-canvas-dark)',
        color: 'var(--color-ink-inverse)',
        borderTop: '1px solid var(--color-canvas-dark-border)',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: '3rem',
        marginTop: 'clamp(3rem, 6vw, 6rem)'
      }}
    >
      <div className="container">
        {/* Top Editorial Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Brand & Purpose Column */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-4)' }}>
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-canvas-dark-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-saffron-500)',
                  border: '1px solid var(--color-canvas-dark-border)'
                }}
              >
                <Compass size={22} />
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink-inverse)'
                }}
              >
                RightsQuest<span style={{ color: 'var(--color-saffron-500)' }}>.in</span>
              </span>
            </div>

            <p style={{ color: 'var(--color-ink-inverse-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              A story-driven gamified learning adventure empowering children in India to recognize their rights, protect each other, and grow with confidence and dignity.
            </p>

            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(222, 114, 21, 0.15)',
                border: '1px solid rgba(222, 114, 21, 0.3)',
                color: '#F7C693',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-family-mono)'
              }}
            >
              <Lock size={12} />
              <span>DPDP 2023 Child Privacy Compliant</span>
            </div>
          </div>

          {/* Learning Tracks */}
          <div>
            <h2 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-saffron-500)',
                marginBottom: 'var(--space-4)',
                fontWeight: 700
              }}
            >
              Learning Quests
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {FOOTER_LINKS.learning.map(link => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    style={{
                      color: 'var(--color-ink-inverse-muted)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-ink-inverse-muted)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Safety References */}
          <div>
            <h2 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-peacock-border)',
                marginBottom: 'var(--space-4)',
                fontWeight: 700
              }}
            >
              Statutory Safeguards
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {FOOTER_LINKS.legalAndSafety.map(link => (
                <li key={link.label}>
                  <Link 
                    to={link.path}
                    style={{
                      color: 'var(--color-ink-inverse-muted)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-ink-inverse-muted)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Childline Card */}
          <div 
            style={{
              backgroundColor: 'var(--color-canvas-dark-surface)',
              border: '1.5px solid rgba(208, 79, 54, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-2)' }}>
              <PhoneCall size={18} style={{ color: 'var(--color-terracotta-500)' }} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>National Child Helpline</span>
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#F8B5A7',
                lineHeight: 1.1,
                marginBottom: 'var(--space-2)'
              }}
            >
              1098
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-inverse-muted)', lineHeight: 1.45, marginBottom: 'var(--space-3)' }}>
              Toll-free, 24/7 emergency service under Ministry of Women & Child Development for any child in distress.
            </p>
            <Link 
              to="/help"
              className="btn btn-help"
              style={{
                fontSize: '0.8rem',
                padding: '0.4rem 0.85rem',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              View All Helplines
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--color-canvas-dark-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            fontSize: '0.8rem',
            color: 'var(--color-ink-inverse-muted)',
            lineHeight: 1.6
          }}
        >
          <strong style={{ color: '#FBF8F3' }}>Legal & Pedagogical Notice:</strong> RightsQuest India is an interactive educational simulation developed to foster awareness of children's rights under the Constitution of India, the RTE Act 2009, the POCSO Act 2012, the Juvenile Justice Act 2015, and the UNCRC. It is strictly pedagogical and does not constitute formal legal advice, representation, or an emergency dispatch system. For immediate real-world protection or reporting, contact the Childline at <strong>1098</strong> or National Emergency at <strong>112</strong>.
        </div>

        {/* Bottom Bar & Motif Loop Resolution */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-canvas-dark-border)',
            fontSize: '0.78rem',
            color: 'var(--color-ink-inverse-muted)',
            fontFamily: 'var(--font-family-mono)'
          }}
        >
          <div>
            © 2026 RightsQuest India · Built with Creative OS Architecture & Indian Child Safeguarding Principles
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy & Data Shield</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'underline' }}>Legal Accuracy Framework</Link>
            <Link to="/about" style={{ color: 'inherit', textDecoration: 'underline' }}>Architecture & QA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

