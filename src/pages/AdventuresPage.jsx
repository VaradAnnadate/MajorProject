import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Clock, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { ADVENTURES_CATALOG } from '../data/adventuresCatalog';
import { AGE_BANDS } from '../data/demoProfiles';
import { useDemoLearner } from '../context/DemoLearnerContext';

const ADVENTURE_SCENARIO_MAP = {
  'adv-01-schoolbag': 'scenario-01-bench',
  'adv-02-screen': 'scenario-02-screen',
};

export default function AdventuresPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const { activeAgeBand } = useDemoLearner();
  const [filterAgeBand, setFilterAgeBand] = useState('all');

  const filteredAdventures = ADVENTURES_CATALOG.filter(adv => {
    return filterAgeBand === 'all' || adv.ageBandId === filterAgeBand;
  });

  return (
    <div 
      className="adventures-page"
      style={{
        paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div style={{ maxWidth: '680px' }}>
            <span className="editorial-eyebrow">
              Interactive Quest Directory
            </span>
            <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Story Quests & Ethical Adventures
            </h1>
            <p className="text-lead" style={{ margin: 0 }}>
              Every quest is a scenario based on real-world dilemmas faced by children in India. 
              Step into the story, choose your actions, and uncover constitutional safeguards.
            </p>
          </div>

          <a 
            href="/world"
            className="btn btn-primary"
            style={{
              padding: '12px 20px',
              fontSize: '0.9rem',
              gap: '8px'
            }}
          >
            <Compass size={18} />
            <span>Open Living Adventure Map</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Age Band Filter Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-8)'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', marginRight: 'var(--space-2)' }}>
            FILTER BY AGE:
          </span>
          <button
            type="button"
            onClick={() => setFilterAgeBand('all')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-family-mono)',
              fontWeight: 700,
              backgroundColor: filterAgeBand === 'all' ? 'var(--color-ink-primary)' : 'var(--color-canvas-card)',
              color: filterAgeBand === 'all' ? '#FFFFFF' : 'var(--color-ink-secondary)',
              border: '1px solid var(--color-border-medium)',
              cursor: 'pointer'
            }}
          >
            All Age Quests ({ADVENTURES_CATALOG.length})
          </button>
          {AGE_BANDS.map(band => (
            <button
              key={band.id}
              type="button"
              onClick={() => setFilterAgeBand(band.id)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 700,
                backgroundColor: filterAgeBand === band.id ? band.accentBg : 'var(--color-canvas-card)',
                color: filterAgeBand === band.id ? band.accentColor : 'var(--color-ink-secondary)',
                border: `1px solid ${filterAgeBand === band.id ? band.accentBorder : 'var(--color-border-medium)'}`,
                cursor: 'pointer'
              }}
            >
              {band.range} ({band.badge})
            </button>
          ))}
        </div>

        {/* Adventures Grid */}
        <div className="grid-2-col" style={{ marginBottom: 'var(--space-12)' }}>
          {filteredAdventures.map((adv) => (
            <article 
              key={adv.id}
              className="card-story interactive-card"
              style={{
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1.5px solid var(--color-border-medium)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-press)'
              }}
            >
              <div>
                {/* Meta Top Bar */}
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
                  <span className="badge badge-saffron">
                    {adv.ageRange} · {adv.difficulty}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-family-mono)' }}>
                    <Clock size={13} />
                    <span>{adv.estimatedMinutes} mins · {adv.chaptersCount} Chapters</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '1.35rem', marginBottom: 'var(--space-1)' }}>
                  {adv.title}
                </h2>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-saffron-600)', fontWeight: 600, fontStyle: 'italic', marginBottom: 'var(--space-3)' }}>
                  "{adv.tagline}"
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55, marginBottom: 'var(--space-4)' }}>
                  {adv.synopsis}
                </p>

                {/* Milestones Preview */}
                <div 
                  style={{
                    backgroundColor: 'var(--color-canvas-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-3)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                    QUEST MILESTONES:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {adv.milestones.slice(0, 3).map((m, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-ink-primary)' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--color-forest-500)', marginTop: '2px', flexShrink: 0 }} />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div 
                style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: 'var(--space-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>
                  <Award size={15} style={{ color: 'var(--color-amber-badge)' }} />
                  <span>Reward: <strong>{adv.badgeName}</strong></span>
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    const scenarioId = ADVENTURE_SCENARIO_MAP[adv.id];
                    if (scenarioId) {
                      navigate(`/play/${scenarioId}`);
                    } else {
                      alert(`Interactive scenario for "${adv.title}" is coming in Part 04.`);
                    }
                  }}
                  className="btn btn-primary btn-tactile"
                  style={{ fontSize: '0.84rem', padding: '0.4rem 1rem' }}
                >
                  <Play size={14} fill="currentColor" />
                  <span>{ADVENTURE_SCENARIO_MAP[adv.id] ? 'Play Quest' : 'Preview Quest'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Multi-Part Roadmap Note */}
        <div 
          style={{
            backgroundColor: 'var(--color-canvas-card)',
            border: '1px dashed var(--color-border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: 'var(--space-2)' }}>
            <Sparkles size={18} style={{ color: 'var(--color-saffron-500)' }} />
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Part 03 Scenario Engine Active</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-ink-secondary)', lineHeight: 1.55 }}>
            Part 03 branching scenario gameplay is now live! Experience interactive ethical dilemmas, 
            evidence inspection, and constitutional article reveals for <strong>The Mystery of the Empty Bench</strong> and <strong>The Whispering Screen</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

