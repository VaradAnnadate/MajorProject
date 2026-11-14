import React from 'react';
import { 
  Compass, 
  Scale, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Sparkles, 
  Lock, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div 
      className="about-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container-editorial">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <span className="editorial-eyebrow">
            Architecture, Pedagogy & Safeguarding
          </span>
          <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            About RightsQuest India
          </h1>
          <p className="text-lead">
            A story-driven gamified learning platform engineered to make children in India curious, 
            confident, and legally informed about their constitutional rights and safety.
          </p>
        </div>

        {/* Section 1: The Product Vision */}
        <section 
          id="pedagogy"
          className="card-story"
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1.5px solid var(--color-border-medium)',
            marginBottom: 'var(--space-8)'
          }}
        >
          <h2 style={{ fontSize: '1.45rem', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-family-display)' }}>
            1. Why We Built an Adventure, Not a Textbook
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Legal literacy for children is usually locked inside dry textbooks, complex legal jargon, or scary cautionary lectures. As a result, children rarely know their rights until an unfair or harmful situation has already occurred.
          </p>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6 }}>
            RightsQuest India transforms legal learning into an imaginative, storybook adventure. By putting children into relatable everyday dilemmas — school admissions, playground fairness, online gaming requests, and community support — children build the ethical instincts and constitutional vocabulary needed to stand up for themselves and others.
          </p>
        </section>

        {/* Section 2: Statutory and Constitutional Alignment */}
        <section 
          id="legal"
          className="card-story"
          style={{
            backgroundColor: 'var(--color-canvas-elevated)',
            border: '1.5px solid var(--color-border-medium)',
            marginBottom: 'var(--space-8)'
          }}
        >
          <h2 style={{ fontSize: '1.45rem', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-family-display)' }}>
            2. Grounded in Authoritative Indian Law & UNCRC
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Every scenario and legal badge in RightsQuest is mapped to verified statutory sources:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-canvas-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)', display: 'block', marginBottom: '2px' }}>
                Article 21A & RTE Act 2009
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                Right to Free & Compulsory Education for all children aged 6 to 14.
              </span>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-canvas-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)', display: 'block', marginBottom: '2px' }}>
                Article 24 & Child Labour Act 2016
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                Prohibition of child labor under 14 and hazardous work for adolescents.
              </span>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-canvas-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)', display: 'block', marginBottom: '2px' }}>
                POCSO Act 2012 & JJ Act 2015
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                Protection of children from sexual offenses and care for vulnerable youth.
              </span>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-canvas-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)', display: 'block', marginBottom: '2px' }}>
                UNCRC (1992 Ratification)
              </strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)' }}>
                The 4 pillars: Survival, Development, Protection, and Participation.
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', fontStyle: 'italic' }}>
            [Expert Review Requirement]: All future adventure dialogue and consequence trees are flagged for validation by qualified legal and child-rights educators.
          </div>
        </section>

        {/* Section 3: Digital Personal Data Protection Act 2023 Compliance */}
        <section 
          id="privacy"
          className="card-story"
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1.5px solid var(--color-border-medium)',
            marginBottom: 'var(--space-8)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
            <Lock size={20} style={{ color: 'var(--color-saffron-600)' }} />
            <h2 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-family-display)' }}>
              3. Child Privacy & DPDP 2023 Principles
            </h2>
          </div>
          
          <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            Section 9 of India's Digital Personal Data Protection (DPDP) Act 2023 sets high standards for processing data relating to children:
          </p>

          <ul style={{ paddingLeft: '1.25rem', margin: '0 0 var(--space-4) 0', color: 'var(--color-ink-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <li><strong>Zero Child Identifiers:</strong> We do not collect real names, dates of birth, phone numbers, email addresses, or schools.</li>
            <li><strong>No Behavioral Tracking:</strong> We do not profile children or serve targeted advertisements.</li>
            <li><strong>No Public Exposure:</strong> There are no public leaderboards or unmoderated peer-to-peer chats.</li>
            <li><strong>Client-Side Demonstration State:</strong> Learner progress is stored solely in local demonstration browser memory.</li>
          </ul>
        </section>

        {/* Section 4: Creative OS Architecture */}
        <section 
          id="architecture"
          className="card-story"
          style={{
            backgroundColor: 'var(--color-canvas-elevated)',
            border: '1.5px solid var(--color-border-medium)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
            <Compass size={20} style={{ color: 'var(--color-peacock-500)' }} />
            <h2 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-family-display)' }}>
              4. Built with Creative OS Architecture
            </h2>
          </div>

          <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            This platform is designed using Creative OS principles:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.65rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong>44_AGENCYLIKE_UI:</strong> Persuasion spine, motif loop patterns, and tactile physical-skeuomorphic dossier components.
            </div>
            <div style={{ padding: '0.65rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong>04_TYPOGRAPHY_SYSTEM:</strong> Fluid clamp formulas with Fraunces display serif & Plus Jakarta Sans body.
            </div>
            <div style={{ padding: '0.65rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong>14_DESIGN_ANTI_PATTERNS:</strong> Rejection of generic SaaS bento grids, neon glow borders, and glassmorphism.
            </div>
            <div style={{ padding: '0.65rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <strong>12_CREATIVE_QA:</strong> Mobile-first 375px–1920px responsiveness, WCAG AA contrast, and screen-reader accessibility.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

