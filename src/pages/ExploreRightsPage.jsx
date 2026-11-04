import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  Search, 
  ArrowRight, 
  PhoneCall, 
  AlertCircle, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';
import { CORE_RIGHTS_CATALOG, UNCRC_FOUR_PILLARS } from '../data/rightsCatalog';
import { useDemoLearner } from '../context/DemoLearnerContext';

export default function ExploreRightsPage() {
  const { activeAgeBand } = useDemoLearner();
  const [selectedAgeBand, setSelectedAgeBand] = useState(activeAgeBand.id);
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRights = CORE_RIGHTS_CATALOG.filter(right => {
    const matchesPillar = selectedPillar === 'all' || right.pillarId === selectedPillar;
    const matchesSearch = right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          right.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          right.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <div 
      className="explore-rights-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-8)' }}>
          <span className="editorial-eyebrow">
            Statutory Safeguards & Constitutional Principles
          </span>
          <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            Explore Children’s Legal Rights in India
          </h1>
          <p className="text-lead">
            Every right listed here is backed by the Constitution of India, special child protection statutes, and the UN Convention on the Rights of the Child.
          </p>
        </div>

        {/* Filters and Age Explainer Selector */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1.5px solid var(--color-border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)'
          }}
        >
          {/* Age Explanation Selector */}
          <div>
            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', marginBottom: 'var(--space-2)' }}>
              EXPLAIN RIGHTS FOR AGE BAND:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {[
                { id: 'band-8-10', label: '8–10 Years (Story & Play)' },
                { id: 'band-11-13', label: '11–13 Years (Comics & Peer Safety)' },
                { id: 'band-14-16', label: '14–16 Years (Legal Literacy & Dossiers)' }
              ].map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedAgeBand(b.id)}
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.4rem 0.9rem',
                    backgroundColor: selectedAgeBand === b.id ? 'var(--color-canvas-dark)' : 'var(--color-canvas-elevated)',
                    color: selectedAgeBand === b.id ? '#FFFFFF' : 'var(--color-ink-primary)',
                    border: selectedAgeBand === b.id ? '1px solid var(--color-canvas-dark)' : '1px solid var(--color-border-medium)'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Pillar Bar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--color-border-subtle)'
            }}
          >
            {/* Search Input */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.45rem 1rem',
                minWidth: '260px'
              }}
            >
              <Search size={16} style={{ color: 'var(--color-ink-muted)' }} />
              <input
                type="text"
                placeholder="Search articles, RTE, POCSO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            {/* Pillar Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedPillar('all')}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-family-mono)',
                  fontWeight: 700,
                  backgroundColor: selectedPillar === 'all' ? 'var(--color-ink-primary)' : 'var(--color-canvas-elevated)',
                  color: selectedPillar === 'all' ? '#FFFFFF' : 'var(--color-ink-secondary)',
                  border: '1px solid var(--color-border-medium)',
                  cursor: 'pointer'
                }}
              >
                All Pillars
              </button>
              {UNCRC_FOUR_PILLARS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPillar(p.id)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-family-mono)',
                    fontWeight: 700,
                    backgroundColor: selectedPillar === p.id ? p.bg : 'var(--color-canvas-elevated)',
                    color: selectedPillar === p.id ? p.color : 'var(--color-ink-secondary)',
                    border: `1px solid ${selectedPillar === p.id ? p.border : 'var(--color-border-medium)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {p.title.replace('Right to ', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rights Catalog Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {filteredRights.map((right) => (
            <article 
              key={right.id}
              className="card-story interactive-card"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1.5px solid var(--color-border-medium)',
                boxShadow: 'var(--shadow-press)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-3)'
                }}
              >
                <span className="legal-citation">
                  {right.citation}
                </span>

                <span 
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-saffron-600)',
                    fontWeight: 700
                  }}
                >
                  Verified Official Statute
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', marginBottom: 'var(--space-2)' }}>
                {right.title}
              </h2>

              <p style={{ fontSize: '0.94rem', color: 'var(--color-ink-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                {right.summary}
              </p>

              {/* Age-Adapted Explanation Box */}
              <div 
                style={{
                  backgroundColor: 'var(--color-canvas-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-saffron-600)', fontWeight: 700, marginBottom: '4px' }}>
                  AGE ADAPTATION ({selectedAgeBand.replace('band-', '').replace('-', '–')} YEARS):
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-ink-primary)', lineHeight: 1.55 }}>
                  {right.ageExplanations[selectedAgeBand]}
                </div>
              </div>

              {/* Actionable Guidance & Referral */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-3)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: 'var(--space-3)',
                  fontSize: '0.82rem',
                  color: 'var(--color-ink-muted)'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--color-ink-primary)' }}>Action Guide:</strong> {right.actionableGuidance}
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-terracotta-600)', fontWeight: 700 }}>
                  Contact: {right.relatedHelpline}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

