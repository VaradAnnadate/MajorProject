import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Menu, 
  X, 
  ShieldAlert, 
  Sparkles, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { useDemoLearner } from '../../context/DemoLearnerContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeAgeBand, activePersona, triggerIntro, progression } = useDemoLearner();
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header 
      style={{
        backgroundColor: 'var(--color-canvas-primary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        transition: 'background-color 0.2s ease'
      }}
    >
      <div 
        className="container navbar-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          gap: 'var(--space-4)'
        }}
      >
        {/* Brand Lockup */}
        <Link 
          to="/" 
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
          aria-label="RightsQuest India Home"
        >
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-canvas-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-saffron-500)',
              border: '1.5px solid var(--color-border-medium)',
              boxShadow: 'var(--shadow-press)'
            }}
          >
            <Compass size={24} className="motif-gentle-sway" />
          </div>
          <div>
            <span 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: 'var(--color-ink-primary)',
                display: 'block',
                lineHeight: 1.1
              }}
            >
              RightsQuest<span style={{ color: 'var(--color-saffron-500)' }}>.in</span>
            </span>
            <span 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.68rem',
                color: 'var(--color-ink-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                display: 'block'
              }}
            >
              Children’s Rights Adventure
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav 
          aria-label="Primary Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-1)',
            // Shown on desktop via media query or inline flex on larger screens
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.filter(l => !l.isAction).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                padding: '0.5rem 0.85rem',
                fontSize: '0.92rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: isActive ? 'var(--color-canvas-secondary)' : 'transparent',
                transition: 'all var(--duration-fast) ease',
                display: 'inline-flex',
                alignItems: 'center'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div 
          className="desktop-actions"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-3)'
          }}
        >
          {/* Replay Intro Button */}
          <button
            type="button"
            onClick={triggerIntro}
            title="Watch cinematic storytelling intro"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-border-medium)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-family-mono)',
              color: 'var(--color-ink-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-canvas-dark)';
              e.currentTarget.style.color = 'var(--color-saffron-500)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-ink-secondary)';
            }}
          >
            <Sparkles size={13} style={{ color: 'var(--color-saffron-500)' }} />
            <span>Intro</span>
          </button>

          {/* Active Demo Profile Pill */}
          <Link
            to="/enter"
            title="Change Demo Profile & Age Band"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-canvas-secondary)',
              border: '1px solid var(--color-border-medium)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-family-mono)'
            }}
          >
            <span style={{ fontSize: '1rem' }}>{activePersona.symbol}</span>
            <span style={{ color: 'var(--color-ink-primary)', fontWeight: 600 }}>
              {activeAgeBand.range}
            </span>
            <span 
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-canvas-elevated)',
                color: 'var(--color-ink-muted)'
              }}
            >
              Demo
            </span>
          </Link>

          {/* Rights Passport & XP Badge */}
          <Link
            to="/achievements"
            title="View Constitutional Rights Passport & Badges"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(222, 114, 21, 0.1)',
              border: '1px solid rgba(222, 114, 21, 0.35)',
              color: 'var(--color-saffron-600)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-family-mono)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>✨</span>
            <span>{progression?.totalXp || 80} XP</span>
          </Link>

          {/* Learner Dashboard Link */}
          <Link 
            to="/home" 
            className="btn btn-dark btn-tactile"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.86rem'
            }}
          >
            <Sparkles size={15} style={{ color: 'var(--color-saffron-500)' }} />
            <span>Learner Shell</span>
          </Link>

          {/* Responsible Help Button */}
          <Link 
            to="/help" 
            className="btn btn-help btn-tactile"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.86rem'
            }}
          >
            <ShieldAlert size={15} />
            <span>Get Help (1098)</span>
          </Link>
        </div>

        {/* Compact desktop help action while the full navigation is collapsed */}
        <Link to="/help" className="btn btn-help compact-help">
          <ShieldAlert size={15} />
          <span>Get Help (1098)</span>
        </Link>

        {/* Mobile Menu Hamburger Toggle */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="mobile-toggle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border-medium)',
            backgroundColor: 'var(--color-canvas-secondary)',
            color: 'var(--color-ink-primary)'
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer"
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-canvas-primary)',
            padding: 'var(--space-6) var(--gutter)',
            boxShadow: 'var(--shadow-floating)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {/* Active Demo Profile in Mobile */}
            <div 
              style={{
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-canvas-secondary)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{activePersona.symbol}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{activePersona.codename}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)' }}>{activeAgeBand.title} ({activeAgeBand.range})</div>
                </div>
              </div>
              <Link 
                to="/enter" 
                onClick={closeMenu}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: 'var(--color-saffron-600)',
                  textDecoration: 'underline',
                  fontWeight: 700
                }}
              >
                Change
              </Link>
            </div>

            {/* Nav links */}
            {NAV_LINKS.filter(l => !l.isAction).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                style={({ isActive }) => ({
                  padding: '0.75rem 1rem',
                  fontSize: '1.05rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-saffron-600)' : 'var(--color-ink-primary)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-canvas-secondary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                })}
              >
                <span>{link.label}</span>
                <ArrowRight size={16} style={{ opacity: 0.5 }} />
              </NavLink>
            ))}

            <div style={{ height: '1px', backgroundColor: 'var(--color-border-subtle)', margin: 'var(--space-2) 0' }} />

            <Link 
              to="/home" 
              onClick={closeMenu}
              className="btn btn-dark"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} style={{ color: 'var(--color-saffron-500)' }} />
              <span>Learner Home Shell</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                triggerIntro();
              }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
            >
              <Sparkles size={15} style={{ color: 'var(--color-saffron-500)' }} />
              <span>Replay Storytelling Intro</span>
            </button>

            <Link 
              to="/help" 
              onClick={closeMenu}
              className="btn btn-help"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <ShieldAlert size={16} />
              <span>Emergency Help (Dial 1098)</span>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}

