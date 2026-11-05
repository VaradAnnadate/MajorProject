import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../components/WorldMap';
import { Compass, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useDemoLearner } from '../../../context/DemoLearnerContext';

/**
 * WorldMapPage — Fullscreen Interactive Adventure Map Page
 * Route: /world
 */
export default function WorldMapPage() {
  const navigate = useNavigate();
  const { activeAgeBand, activePersona } = useDemoLearner();

  const handleOpenMission = (mission) => {
    // Navigates to adventures catalog with target mission query
    navigate(`/adventures?highlight=${mission.id}`);
  };

  return (
    <div 
      className="world-map-page"
      style={{
        paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)'
      }}
    >
      <div className="container">
        {/* Header Breadcrumb & Persona HUD */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-4)',
            flexWrap: 'wrap',
            gap: 'var(--space-3)'
          }}
        >
          <div>
            <span className="editorial-eyebrow">
              Interactive Story Universe · Part 02
            </span>
            <h1 
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                margin: '4px 0 6px 0',
                color: 'var(--color-ink-primary)',
                lineHeight: 1.15
              }}
            >
              The World of Every Child
            </h1>
            <p className="text-lead" style={{ maxWidth: '640px', margin: 0 }}>
              Five living realms representing India's constitutional protections for children. 
              Step into any realm to discover its landmarks, wisdom, and story quests.
            </p>
          </div>

          {/* Active Explorer Persona Pill */}
          <div 
            style={{
              padding: '12px 18px',
              backgroundColor: 'var(--color-canvas-card)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-saffron-100)',
                color: 'var(--color-saffron-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontFamily: 'var(--font-family-mono)'
              }}
            >
              {activePersona.avatar}
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
                ACTIVE EXPLORER · {activeAgeBand.range}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-ink-primary)' }}>
                {activePersona.name}
              </div>
            </div>
          </div>
        </div>

        {/* The Living Adventure Map */}
        <WorldMap onOpenMission={handleOpenMission} />
      </div>
    </div>
  );
}

