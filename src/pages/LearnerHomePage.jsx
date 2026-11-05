import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  PhoneCall, 
  Flame, 
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { useDemoLearner } from '../context/DemoLearnerContext';
import { ADVENTURES_CATALOG } from '../data/adventuresCatalog';
import { UNCRC_FOUR_PILLARS } from '../data/rightsCatalog';
import MascotReaction from '../features/mascot/components/MascotReaction';

export default function LearnerHomePage() {
  const { activeAgeBand, activePersona } = useDemoLearner();

  const currentAdventure = activePersona.activeAdventure;
  const filteredAdventures = ADVENTURES_CATALOG.filter(a => a.ageBandId === activeAgeBand.id);

  return (
    <div 
      className="learner-home-page"
      style={{
        paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container">
        {/* Top Greeting & Persona Bar */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1.5px solid var(--color-border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.25rem, 2.5vw, 2rem)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            boxShadow: 'var(--shadow-press)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: activeAgeBand.accentBg,
                border: `2px solid ${activeAgeBand.accentBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: 'var(--shadow-press)'
              }}
            >
              {activePersona.symbol}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span className="badge" style={{ backgroundColor: activeAgeBand.accentBg, color: activeAgeBand.accentColor, border: `1px solid ${activeAgeBand.accentBorder}` }}>
                  {activeAgeBand.range}
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
                  {activeAgeBand.badge}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontFamily: 'var(--font-family-display)', marginBottom: '2px' }}>
                Welcome back, {activePersona.codename}!
              </h1>

              <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)' }}>
                Focus Track: <strong>{activePersona.focusTopic}</strong> · Ready to continue your journey?
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Stack */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
              backgroundColor: 'var(--color-canvas-primary)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-saffron-600)' }}>
                {activePersona.stats.adventuresCompleted}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Quests Done
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--color-border-medium)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-peacock-500)' }}>
                {activePersona.stats.rightsDiscovered}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Articles Unlocked
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--color-border-medium)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-500)' }}>
                {activePersona.stats.dignityShields}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Dignity Shields
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard 2-Column Asymmetric Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.1fr)',
            gap: 'var(--space-8)',
            alignItems: 'start'
          }}
          className="dashboard-layout"
        >
          {/* Main Left Column: Current Adventure & Journey Map */}
          <div>
            {/* Part 02: World Adventure Map Portal Banner */}
            <div
              className="interactive-card laser-beam-card"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1.5px solid var(--color-saffron-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-5)',
                marginBottom: 'var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                boxShadow: '0 12px 30px rgba(18, 25, 39, 0.07)'
              }}
            >
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Compass size={18} color="var(--color-saffron-500)" />
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-saffron-600)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Living Adventure Map · Part 02
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.35rem', margin: '0 0 4px 0', color: 'var(--color-ink-primary)' }}>
                  The World of Every Child
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)', margin: 0, lineHeight: 1.45 }}>
                  Traverse 5 illustrated constitutional realms, discover ancient story landmarks, and explore scenarios.
                </p>
              </div>

              <Link
                to="/world"
                className="btn btn-primary"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  gap: '6px'
                }}
              >
                <Compass size={16} />
                <span>Open Adventure Map</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Active Adventure Card — Agency-Grade Shared Element */}
            <div 
              className="card-story interactive-card"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '2px solid var(--color-saffron-border)',
                boxShadow: 'var(--shadow-story-card)',
                marginBottom: 'var(--space-8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-saffron">
                  IN PROGRESS · {currentAdventure.chapter}
                </span>
                <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
                  {currentAdventure.relatedRight}
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)', marginBottom: 'var(--space-2)' }}>
                {currentAdventure.title}
              </h2>

              <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.55 }}>
                <strong>Current Mission:</strong> {currentAdventure.currentObjective}
              </p>

              {/* Progress Bar Container */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'var(--font-family-mono)', marginBottom: '6px' }}>
                  <span>Chapter Completion</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-saffron-600)' }}>{currentAdventure.progressPercent}%</span>
                </div>
                <div 
                  style={{
                    width: '100%',
                    height: '10px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-canvas-secondary)',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      width: `${currentAdventure.progressPercent}%`,
                      height: '100%',
                      backgroundColor: 'var(--color-saffron-500)',
                      borderRadius: 'var(--radius-pill)',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>

              {/* Action Strip */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: 'var(--space-4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-ink-muted)' }}>
                  <Award size={16} style={{ color: 'var(--color-amber-badge)' }} />
                  <span>On completion: <strong>{currentAdventure.badgeReward}</strong></span>
                </div>

                <Link to="/adventures" className="btn btn-primary btn-tactile">
                  <Play size={16} fill="currentColor" />
                  <span>Continue Adventure</span>
                </Link>
              </div>
            </div>

            {/* Learning Journey Roadmap (Sequential Quests) */}
            <div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-family-display)' }}>
                    Your Learning Pathway
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                    Sequential adventures crafted for {activeAgeBand.range}
                  </p>
                </div>

                <Link 
                  to="/adventures"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-saffron-600)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>All Quests</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {ADVENTURES_CATALOG.map((adv, idx) => {
                  const isCurrent = adv.id === currentAdventure.id;

                  return (
                    <div 
                      key={adv.id}
                      className="interactive-card"
                      style={{
                        backgroundColor: isCurrent ? 'var(--color-canvas-card)' : 'var(--color-canvas-elevated)',
                        border: isCurrent ? '1.5px solid var(--color-saffron-500)' : '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--space-4)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div 
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            backgroundColor: isCurrent ? 'var(--color-saffron-100)' : 'var(--color-canvas-secondary)',
                            color: isCurrent ? 'var(--color-saffron-600)' : 'var(--color-ink-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            flexShrink: 0
                          }}
                        >
                          0{idx + 1}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                            <h3 style={{ fontSize: '1.02rem' }}>{adv.title}</h3>
                            {isCurrent && (
                              <span className="badge badge-saffron" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                                Active
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)' }}>
                            {adv.legalArticle} · {adv.estimatedMinutes} mins
                          </div>
                        </div>
                      </div>

                      <Link 
                        to="/adventures"
                        className="btn btn-secondary"
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.35rem 0.75rem',
                          flexShrink: 0
                        }}
                      >
                        {isCurrent ? 'Play' : 'Details'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Child Safety Sidebar */}
          <div>
            {/* Achievements & Passport Stamps Area */}
            <div 
              className="card-story"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-medium)',
                marginBottom: 'var(--space-6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} style={{ color: 'var(--color-saffron-500)' }} />
                  <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-family-display)' }}>
                    Rights Passport Stamps
                  </h2>
                </div>
                <Link to="/achievements" style={{ fontSize: '0.78rem', color: 'var(--color-saffron-600)', fontWeight: 700 }}>
                  View All
                </Link>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                Badges and seals earned through empathetic decisions in your story quests.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {activePersona.recentBadges.map((badge) => (
                  <div 
                    key={badge.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-canvas-secondary)',
                      border: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-saffron-100)',
                        color: 'var(--color-saffron-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 700
                      }}
                    >
                      ★
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{badge.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)' }}>
                        Unlocked on {badge.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Safety & Real-World Help Box */}
            <div 
              style={{
                backgroundColor: 'var(--color-terracotta-100)',
                border: '1.5px solid var(--color-terracotta-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-2)' }}>
                <PhoneCall size={18} style={{ color: 'var(--color-terracotta-500)' }} />
                <h3 style={{ fontSize: '1rem', color: 'var(--color-terracotta-600)', fontWeight: 800 }}>
                  Need Help Right Now?
                </h3>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--color-ink-primary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                If you or a friend is in danger, facing abuse, or feels unsafe, remember: <strong>Dial 1098</strong>. It is free, confidential, and open 24/7 anywhere in India.
              </p>

              <Link 
                to="/help"
                className="btn btn-help"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                <span>Trusted Adults & Helpline Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Responsive Dashboard CSS */}
        <style>{`
          @media (max-width: 900px) {
            .dashboard-layout {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* Mitra Floating Companion Widget */}
        <MascotReaction />
      </div>
    </div>
  );
}

