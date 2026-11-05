import React, { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  Shield, 
  Compass, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Volume2 
} from 'lucide-react';
import Mascot from '../../mascot/components/Mascot';

/**
 * WorldDetailModal — Deep-Dive Cinematic Realm Explorer
 */
export default function WorldDetailModal({ world, onClose, onSelectMission }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!world) return null;

  return (
    <div 
      className="world-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="world-modal-title"
    >
      <div 
        className="world-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinematic Realm Header Banner */}
        <div 
          style={{
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            background: `linear-gradient(135deg, ${world.accentLight} 0%, #FFFFFF 100%)`,
            borderBottom: '1px solid var(--color-border-subtle)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close realm view"
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span 
              className="badge"
              style={{
                backgroundColor: world.accentColor,
                color: '#FFFFFF',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.72rem'
              }}
            >
              {world.statutoryArticle}
            </span>
            <span 
              className="badge"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                color: 'var(--color-ink-primary)',
                border: '1px solid var(--color-border-subtle)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.72rem'
              }}
            >
              UNCRC Pillar: {world.uncrcPillar}
            </span>
            <span 
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-family-mono)',
                color: 'var(--color-ink-muted)'
              }}
            >
              {world.regionName}
            </span>
          </div>

          <h2 
            id="world-modal-title"
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: 'var(--color-ink-primary)',
              margin: '0 0 8px 0',
              lineHeight: 1.15
            }}
          >
            {world.name}
          </h2>

          <p 
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-ink-secondary)',
              maxWidth: '680px',
              margin: 0,
              fontStyle: 'italic'
            }}
          >
            "{world.tagline}"
          </p>
        </div>

        {/* Modal Scroll Content */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          {/* Environmental Lore */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Environmental Lore & Living History
            </h3>
            <p 
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-ink-primary)',
                backgroundColor: 'var(--color-canvas-card)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: `4px solid ${world.accentColor}`
              }}
            >
              {world.lore}
            </p>
          </div>

          {/* Landmarks of Wisdom */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
                marginBottom: 'var(--space-3)'
              }}
            >
              Discoverable Landmarks in this Realm
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
              {world.landmarks.map((landmark) => (
                <div 
                  key={landmark.id}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--color-canvas-elevated)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MapPin size={14} color={world.accentColor} />
                    <strong style={{ fontFamily: 'var(--font-family-display)', fontSize: '0.95rem' }}>
                      {landmark.name}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-ink-muted)', marginLeft: 'auto' }}>
                      {landmark.type}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {landmark.lore}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Constitutional Wisdom / Outcomes */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Constitutional Understanding
            </h3>
            <div 
              style={{
                backgroundColor: 'var(--color-canvas-card)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {world.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-ink-primary)', lineHeight: 1.5 }}>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming Story Missions Preview (Part 03 Preview) */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <h3 
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-muted)',
                  margin: 0
                }}
              >
                Available Story Quests
              </h3>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-saffron-600)' }}>
                Part 03 Mission Preview
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {world.missions.map((mission) => (
                <div
                  key={mission.id}
                  className="interactive-card"
                  style={{
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-canvas-elevated)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge" style={{ backgroundColor: 'var(--color-canvas-secondary)', color: 'var(--color-ink-primary)', fontSize: '0.68rem' }}>
                        {mission.difficulty}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
                        {mission.targetAge}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.1rem', margin: '0 0 4px 0' }}>
                      {mission.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)', margin: 0, lineHeight: 1.45 }}>
                      {mission.summary}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right', display: 'none', sm: 'block' }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)', display: 'block' }}>
                        REWARD BADGE
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-saffron-600)' }}>
                        {mission.badge}
                      </span>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => onSelectMission && onSelectMission(mission)}
                      style={{
                        padding: '10px 18px',
                        fontSize: '0.85rem',
                        gap: '6px'
                      }}
                    >
                      <span>Prepare Quest</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--color-border-subtle)',
              flexWrap: 'wrap',
              gap: 'var(--space-3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--color-saffron-500)" />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-ink-muted)' }}>
                Atmosphere: {world.ambientAura}
              </span>
            </div>

            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Return to Adventure Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

