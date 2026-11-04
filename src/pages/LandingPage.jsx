import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight, 
  PhoneCall, 
  Heart, 
  Eye, 
  Lock, 
  Users, 
  GraduationCap, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { UNCRC_FOUR_PILLARS } from '../data/rightsCatalog';
import { AGE_BANDS } from '../data/demoProfiles';
import { useDemoLearner } from '../context/DemoLearnerContext';

export default function LandingPage() {
  const { setAgeBand, triggerIntro } = useDemoLearner();

  return (
    <div className="landing-page">
      {/* =========================================================================
          HERO SECTION — Agency-Tier Hook & Persuasion Spine
          ========================================================================= */}
      <section 
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5.5rem)',
          borderBottom: '1px solid var(--color-border-subtle)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div className="grid-asymmetric-hero">
            {/* Left Narrative Column */}
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-4)' 
                }}
              >
                <span className="editorial-eyebrow">
                  RightsQuest India · Interactive Learning Shell
                </span>

                {/* Agency Intro Replay Pill */}
                <button
                  type="button"
                  onClick={triggerIntro}
                  title="Replay cinematic intro experience"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-canvas-secondary)',
                    border: '1px solid var(--color-border-medium)',
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--color-ink-secondary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-canvas-dark)';
                    e.currentTarget.style.color = 'var(--color-saffron-500)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-canvas-secondary)';
                    e.currentTarget.style.color = 'var(--color-ink-secondary)';
                  }}
                >
                  <Sparkles size={12} style={{ color: 'var(--color-saffron-500)' }} />
                  <span>Replay Intro</span>
                </button>
              </div>

              <h1 className="hero-headline" style={{ marginBottom: 'var(--space-5)' }}>
                Step inside the world of <em>children’s rights</em>.
              </h1>

              <p className="text-lead" style={{ marginBottom: 'var(--space-6)', maxWidth: '580px' }}>
                Every child in India has legal rights to safety, education, dignity, and a voice. 
                Explore interactive story quests where your choices uncover the Constitution of India 
                and build courage to stand up for yourself and your peers.
              </p>

              {/* Action Buttons */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-8)'
                }}
              >
                <Link to="/enter" className="btn btn-primary btn-tactile laser-sweep-btn">
                  <span>Begin Quest Experience</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/rights" className="btn btn-secondary btn-tactile">
                  <BookOpen size={17} style={{ color: 'var(--color-peacock-500)' }} />
                  <span>Explore 4 Pillars</span>
                </Link>

                <Link to="/help" className="btn btn-help btn-tactile">
                  <PhoneCall size={16} />
                  <span>Childline 1098</span>
                </Link>
              </div>

              {/* Safety & Pedagogy Credential Strip */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-family-mono)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--color-forest-500)' }} />
                  <span>Zero Child PII Collected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Scale size={16} style={{ color: 'var(--color-peacock-500)' }} />
                  <span>Constitution & UNCRC Grounded</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-saffron-500)' }} />
                  <span>Ages 8–16 Tailored</span>
                </div>
              </div>
            </div>

            {/* Right Storybook Talisman Showcase with Laser Beam Border */}
            <div 
              style={{
                position: 'relative'
              }}
            >
              {/* Laser Beam Quest Dossier Card */}
              <div 
                className="laser-beam-card"
                style={{
                  border: '2px solid var(--color-border-medium)',
                  boxShadow: 'var(--shadow-story-card)',
                  position: 'relative'
                }}
              >
                <div 
                  className="laser-beam-content"
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)'
                  }}
                >
                  {/* Dossier Header */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--color-border-medium)',
                    paddingBottom: 'var(--space-3)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span 
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-saffron-500)'
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                      ACTIVE QUEST DOSSIER #01
                    </span>
                  </div>
                  <span className="badge badge-saffron">Article 21A</span>
                </div>

                {/* Adventure Preview Content */}
                <h2 
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: '1.45rem',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  The Mystery of the Empty Bench
                </h2>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.55 }}>
                  Standard 4 has a missing classmate. Chintu was asked to work in the tea stall instead of learning fractions. Can you investigate and protect his right to free education?
                </p>

                {/* Decision Branch Demonstration */}
                <div 
                  style={{
                    backgroundColor: 'var(--color-canvas-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-3)',
                    border: '1px dashed var(--color-border-strong)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.72rem', color: 'var(--color-saffron-600)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                    DECISION POINT 02:
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink-primary)', marginBottom: 'var(--space-2)' }}>
                    "What should you tell the tea stall owner who says Chintu must earn for his family?"
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div 
                      style={{
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border-medium)',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--color-forest-500)' }}>A</span>
                      <span>Remind him about the Midday Meal & RTE Act support.</span>
                    </div>
                  </div>
                </div>

                {/* Footer of Dossier */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-ink-muted)'
                  }}
                >
                  <span>Reward: Seal of the School Bell</span>
                  <Link 
                    to="/enter"
                    style={{
                      color: 'var(--color-saffron-600)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>Try Demo Mode</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

              {/* Decorative Accent Seal */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-12px',
                  backgroundColor: 'var(--color-canvas-dark)',
                  color: 'var(--color-saffron-500)',
                  border: '2px solid var(--color-saffron-border)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  boxShadow: 'var(--shadow-tactile)',
                  transform: 'rotate(4deg)'
                }}
              >
                PROTOTYPE V1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 2: THE FOUR PILLARS OF CHILD RIGHTS (UNCRC & INDIAN CONSTITUTION)
          ========================================================================= */}
      <section 
        style={{
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10) auto' }}>
            <span className="editorial-eyebrow" style={{ justifyContent: 'center' }}>
              Universal & Constitutional Foundations
            </span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              The Four Pillars of Every Child’s Rights
            </h2>
            <p className="text-lead">
              In 1992, India ratified the UN Convention on the Rights of the Child, reinforcing rights guaranteed by the Indian Constitution.
            </p>
          </div>

          <div className="grid-4-col">
            {UNCRC_FOUR_PILLARS.map((pillar) => (
              <div 
                key={pillar.id}
                className="interactive-card"
                style={{
                  backgroundColor: 'var(--color-canvas-card)',
                  border: `1.5px solid ${pillar.border}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: pillar.bg,
                      color: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-4)',
                      border: `1px solid ${pillar.border}`
                    }}
                  >
                    <BookOpen size={20} />
                  </div>

                  <h3 
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: '1.25rem',
                      marginBottom: 'var(--space-1)',
                      color: 'var(--color-ink-primary)'
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <div 
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '0.72rem',
                      color: pillar.color,
                      fontWeight: 700,
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    {pillar.slogan}
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
                    {pillar.description}
                  </p>
                </div>

                <div 
                  style={{
                    paddingTop: 'var(--space-3)',
                    marginTop: 'var(--space-3)',
                    borderTop: '1px dashed var(--color-border-subtle)',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-ink-muted)'
                  }}
                >
                  {pillar.constitutionalAnchor}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/rights" className="btn btn-outline btn-tactile">
              <span>View Full Rights & Constitutional Articles Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 3: HOW ADVENTURES WORK — The Paced Method
          ========================================================================= */}
      <section 
        style={{
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          backgroundColor: 'var(--color-canvas-secondary)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
            <span className="editorial-eyebrow" style={{ justifyContent: 'center' }}>
              Interactive Story Methodology
            </span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              How You Journey Through an Adventure
            </h2>
            <p className="text-lead">
              We replace dense legalese with relatable everyday dilemmas, empowering children to think, decide, and act with empathy.
            </p>
          </div>

          <div className="grid-3-col">
            {/* Step 1 */}
            <div 
              className="card-story"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-medium)'
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--color-saffron-500)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                Step into Everyday Stories
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55 }}>
                Encounter realistic scenarios in schoolyards, bus stands, and online gaming rooms. Meet characters facing unfairness or uncertainty.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              className="card-story"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-medium)'
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--color-peacock-500)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                Make Choices with Empathy
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55 }}>
                Choose how to respond. Explore consequences in a safe, non-judgmental space where learning from mistakes carries zero punishment.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              className="card-story"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-medium)'
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--color-forest-500)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-3)'
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                Unlock Statutory Safeguards
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55 }}>
                Discover real legal articles like Article 21A, POCSO, and the 1098 Childline, earning dignity badges for your knowledge passport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 4: AGE-AWARE EXPERIENCE ENTRY
          ========================================================================= */}
      <section 
        style={{
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-10) auto' }}>
            <span className="editorial-eyebrow" style={{ justifyContent: 'center' }}>
              Adaptive Learning Pathways
            </span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Tailored for Every Stage of Growing Up
            </h2>
            <p className="text-lead">
              An 8-year-old and a 16-year-old see the world differently. RightsQuest adapts its language, dilemmas, and visual pacing accordingly.
            </p>
          </div>

          <div className="grid-3-col">
            {AGE_BANDS.map((band) => (
              <div 
                key={band.id}
                className="interactive-card"
                style={{
                  backgroundColor: 'var(--color-canvas-card)',
                  border: `2px solid ${band.accentBorder}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                    <span 
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: band.accentBg,
                        color: band.accentColor,
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}
                    >
                      {band.range}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)' }}>
                      {band.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: 'var(--space-2)' }}>
                    {band.title}
                  </h3>

                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink-primary)', marginBottom: 'var(--space-3)' }}>
                    {band.theme}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55, marginBottom: 'var(--space-4)' }}>
                    {band.description}
                  </p>
                </div>

                <div>
                  <div 
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-canvas-secondary)',
                      fontSize: '0.78rem',
                      color: 'var(--color-ink-secondary)',
                      marginBottom: 'var(--space-4)',
                      fontStyle: 'italic'
                    }}
                  >
                    Tone: {band.tone}
                  </div>

                  <Link 
                    to="/enter"
                    onClick={() => setAgeBand(band.id)}
                    className="btn btn-secondary btn-tactile"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      borderColor: band.accentBorder,
                      fontSize: '0.88rem'
                    }}
                  >
                    <span>Choose {band.range} Path</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 5: CHILD SAFETY & DATA PROTECTION MANIFESTO
          ========================================================================= */}
      <section 
        style={{
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          backgroundColor: 'var(--color-canvas-dark)',
          color: 'var(--color-ink-inverse)'
        }}
      >
        <div className="container">
          <div 
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              backgroundColor: 'var(--color-canvas-dark-surface)',
              border: '1.5px solid var(--color-canvas-dark-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              boxShadow: 'var(--shadow-floating)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-4)' }}>
              <Lock size={24} style={{ color: 'var(--color-saffron-500)' }} />
              <span 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron-500)',
                  fontWeight: 700
                }}
              >
                Safe Harbor & Non-Negotiable Child Safeguards
              </span>
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: 'var(--space-4)'
              }}
            >
              Safety is built into our product architecture, not added later.
            </h2>

            <p style={{ color: 'var(--color-ink-inverse-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              In strict adherence to India’s Digital Personal Data Protection (DPDP) Act 2023 principles for children, RightsQuest India operates with zero behavioral tracking, no public leaderboards exposing identities, and no collection of personal disclosures.
            </p>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>No real names, phone numbers, or addresses collected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>No direct messaging or unmoderated peer contact</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>No gamified streaks or punishment for missed days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-forest-500)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#FFFFFF' }}>Verified real-world emergency support via Childline 1098</span>
              </div>
            </div>

            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                paddingTop: 'var(--space-5)',
                borderTop: '1px solid var(--color-canvas-dark-border)'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-inverse-muted)', fontFamily: 'var(--font-family-mono)' }}>
                Demonstration State: Local Browser Sandbox Only
              </div>

              <Link to="/enter" className="btn btn-primary btn-tactile">
                <span>Enter Demonstration Experience</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

