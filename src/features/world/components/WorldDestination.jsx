import React from 'react';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Volume2, 
  Scale, 
  ArrowRight, 
  Lock, 
  Sparkles 
} from 'lucide-react';

const ICONS = {
  'village-of-belonging': Users,
  'gardens-of-growth': BookOpen,
  'forest-of-safety': ShieldCheck,
  'river-of-voices': Volume2,
  'haven-of-dignity': Scale
};

/**
 * WorldDestination — Interactive Realm Node on Adventure Map
 */
export default function WorldDestination({ 
  world, 
  isSelected, 
  isHovered, 
  onSelect, 
  onHover, 
  onLeave 
}) {
  const IconComponent = ICONS[world.id] || Sparkles;
  const { mapCoordinates, accentColor, accentLight, isLocked, name, statutoryArticle, shortDescription } = world;

  return (
    <div
      className={`world-destination-node ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
      style={{
        left: `${mapCoordinates.x}%`,
        top: `${mapCoordinates.y}%`
      }}
      onMouseEnter={() => onHover(world)}
      onMouseLeave={() => onLeave(world)}
      onClick={() => onSelect(world)}
      onFocus={() => onHover(world)}
      onBlur={() => onLeave(world)}
      tabIndex={0}
      role="button"
      aria-label={`${name} — ${statutoryArticle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(world);
        }
      }}
    >
      {/* Pulsing Aura Ring */}
      {!isLocked && (
        <div 
          className="destination-pulse-ring" 
          style={{ color: accentColor }} 
        />
      )}

      {/* Illustrated Crest */}
      <div 
        className="destination-crest"
        style={{
          border: `2.5px solid ${accentColor}`,
          color: accentColor
        }}
      >
        {isLocked ? (
          <Lock size={22} color="var(--color-ink-muted)" />
        ) : (
          <IconComponent size={26} strokeWidth={2.2} />
        )}
      </div>

      {/* Floating Realm Label */}
      <div 
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(6px)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: '0 4px 12px rgba(18, 25, 39, 0.08)',
          pointerEvents: 'none'
        }}
      >
        <span 
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-ink-primary)'
          }}
        >
          {name}
        </span>
      </div>

      {/* Hover Preview Tooltip Card */}
      <div className="destination-tooltip">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span 
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '0.68rem',
              color: accentColor,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            {statutoryArticle}
          </span>
          <span 
            style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-family-mono)',
              color: 'var(--color-ink-muted)'
            }}
          >
            {world.uncrcPillar}
          </span>
        </div>
        <h4 
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: '1rem',
            margin: '0 0 4px 0',
            color: 'var(--color-ink-primary)'
          }}
        >
          {name}
        </h4>
        <p 
          style={{
            fontSize: '0.78rem',
            lineHeight: 1.4,
            color: 'var(--color-ink-secondary)',
            margin: '0 0 8px 0'
          }}
        >
          {shortDescription}
        </p>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: accentColor
          }}
        >
          <span>Step Inside</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
}

