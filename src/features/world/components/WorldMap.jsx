import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  X, 
  Info, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { WORLDS_DATA } from '../data/worlds';
import WorldDestination from './WorldDestination';
import WorldLandmark from './WorldLandmark';
import WorldAtmosphere from './WorldAtmosphere';
import WorldDetailModal from './WorldDetailModal';
import Mascot from '../../mascot/components/Mascot';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import '../../../styles/world.css';

/**
 * WorldMap — The Central Interactive Adventure Map
 * Living storybook canvas illustrating the Five Realms of Children's Rights
 */
export default function WorldMap({ onOpenMission = null }) {
  const { activeAgeBand, activePersona } = useDemoLearner();
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [hoveredWorld, setHoveredWorld] = useState(null);
  const [activeLandmark, setActiveLandmark] = useState(null);
  const [discoveredLandmarks, setDiscoveredLandmarks] = useState([]);
  const [mobileViewMode, setMobileViewMode] = useState('canvas'); // 'canvas' or 'trail'

  const handleLandmarkSelect = (landmark) => {
    setActiveLandmark(landmark);
    if (!discoveredLandmarks.includes(landmark.id)) {
      setDiscoveredLandmarks(prev => [...prev, landmark.id]);
    }
  };

  const handleWorldSelect = (world) => {
    setSelectedWorld(world);
    setActiveLandmark(null);
  };

  // Collect all landmarks across all worlds
  const allLandmarks = WORLDS_DATA.flatMap(w => w.landmarks);

  // Active dialogue for companion based on interaction state
  let mascotState = 'idle';
  let mascotDialogue = null;
  if (activeLandmark) {
    mascotState = 'discovering';
    mascotDialogue = `You discovered ${activeLandmark.name}! Its ancient story is recorded in your explorer notes.`;
  } else if (hoveredWorld) {
    if (hoveredWorld.id === 'forest-of-safety') mascotState = 'concerned';
    else if (hoveredWorld.id === 'gardens-of-growth') mascotState = 'happy';
    else if (hoveredWorld.id === 'village-of-belonging') mascotState = 'curious';
    else if (hoveredWorld.id === 'river-of-voices') mascotState = 'explaining';
    else if (hoveredWorld.id === 'haven-of-dignity') mascotState = 'thinking';
    mascotDialogue = `Inspecting ${hoveredWorld.name}: "${hoveredWorld.shortDescription}"`;
  }

  return (
    <div className="world-map-section" style={{ position: 'relative' }}>
      {/* Map Card Canvas */}
      <div className="world-map-wrapper">
        {/* Topographic Background Texture */}
        <div className="world-map-texture" />

        {/* Ambient Floating Spores & Fireflies */}
        <WorldAtmosphere />

        {/* HUD Top Bar */}
        <div className="world-hud-bar">
          <div className="world-hud-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="var(--color-saffron-500)" />
              <span 
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--color-ink-primary)'
                }}
              >
                The World of Every Child
              </span>
              <span 
                className="badge"
                style={{
                  backgroundColor: 'var(--color-canvas-secondary)',
                  color: 'var(--color-ink-muted)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.65rem'
                }}
              >
                5 Living Realms
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-secondary)', marginTop: '2px' }}>
              Click any realm crest to step inside the story, or inspect golden landmark sparks.
            </div>
          </div>

          {/* Mobile Layout Switcher */}
          <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }} className="mobile-only-control">
            <button
              onClick={() => setMobileViewMode(mobileViewMode === 'canvas' ? 'trail' : 'canvas')}
              className="btn btn-secondary"
              style={{
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-family-mono)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {mobileViewMode === 'canvas' ? 'View as Expedition List' : 'View Illustrated Map'}
            </button>
          </div>
        </div>

        {/* Compass Rose */}
        <div className="world-compass-rose" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(222, 114, 21, 0.25)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="36" fill="rgba(255, 255, 255, 0.6)" stroke="rgba(222, 114, 21, 0.4)" strokeWidth="1" />
            <g className="compass-dial-spin">
              {/* North Pointer */}
              <polygon points="50,14 56,50 50,46" fill="#DE7215" />
              <polygon points="50,14 44,50 50,46" fill="#BF5E0C" />
              {/* South Pointer */}
              <polygon points="50,86 56,50 50,54" fill="#ACB5C8" />
              <polygon points="50,86 44,50 50,54" fill="#7A869E" />
              {/* East & West Points */}
              <polygon points="86,50 50,56 54,50" fill="#7A869E" />
              <polygon points="14,50 50,44 46,50" fill="#ACB5C8" />
            </g>
            <circle cx="50" cy="50" r="4" fill="#DE7215" />
            <text x="50" y="10" textAnchor="middle" fill="#DE7215" fontSize="8" fontWeight="bold" fontFamily="monospace">N</text>
          </svg>
        </div>

        {/* Vector Terrain SVG Layer (Topography, Rivers & Trails) */}
        <svg 
          viewBox="0 0 1000 650" 
          className="world-terrain-svg"
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Terracotta Hills Gradient */}
            <linearGradient id="terracottaHills" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDEEEA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F8B5A7" stopOpacity="0.3" />
            </linearGradient>

            {/* River Gradient */}
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9E6ED" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#9BC7D3" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6DAAB9" stopOpacity="0.85" />
            </linearGradient>

            {/* Forest Canopy Fill */}
            <radialGradient id="forestCanopy" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E4F6ED" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A1DCBE" stopOpacity="0.25" />
            </radialGradient>
          </defs>

          {/* Region 1: Terracotta Ridge (Village of Belonging - Left Top) */}
          <path 
            d="M -20,180 Q 120,140 240,190 T 360,260 Q 240,380 140,320 T -20,280 Z" 
            fill="url(#terracottaHills)" 
          />

          {/* Region 2: Terraced Orchards (Gardens of Growth - Center Top) */}
          <path 
            d="M 380,80 Q 520,50 640,120 T 680,240 Q 540,280 440,240 T 340,160 Z" 
            fill="url(#forestCanopy)" 
          />

          {/* Region 3: Deep Cedar Canopy (Forest of Safety - Right Top/Mid) */}
          <path 
            d="M 680,180 Q 860,160 980,240 T 1020,380 Q 880,420 740,360 T 660,250 Z" 
            fill="url(#forestCanopy)" 
          />

          {/* Winding River of Voices (Flowing from mountains down across canvas) */}
          <path 
            d="M 520,0 C 490,140 340,260 360,400 C 380,520 450,560 370,650" 
            stroke="url(#riverGradient)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Inner River Wave Highlights */}
          <path 
            d="M 520,0 C 490,140 340,260 360,400 C 380,520 450,560 370,650" 
            stroke="#FFFFFF" 
            strokeWidth="4" 
            strokeDasharray="16 28" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.8" 
          />

          {/* Region 4 & 5: Sandstone Haven of Dignity (Right Bottom) */}
          <path 
            d="M 620,440 Q 780,410 920,480 T 1000,600 Q 840,660 680,600 T 580,510 Z" 
            fill="url(#terracottaHills)" 
          />

          {/* Connecting Winding Trails between realms */}
          {/* Trail: Village of Belonging (220, 208) -> Gardens of Growth (500, 156) */}
          <path 
            d="M 220,208 C 300,160 400,140 500,156" 
            className="world-trail-path" 
          />
          {/* Trail: Gardens of Growth (500, 156) -> Forest of Safety (760, 260) */}
          <path 
            d="M 500,156 C 600,160 680,200 760,260" 
            className="world-trail-path" 
          />
          {/* Trail: Village of Belonging (220, 208) -> River of Voices (380, 468) */}
          <path 
            d="M 220,208 C 240,320 300,400 380,468" 
            className="world-trail-path active" 
          />
          {/* Trail: River of Voices (380, 468) -> Haven of Dignity (720, 494) */}
          <path 
            d="M 380,468 C 500,520 620,530 720,494" 
            className="world-trail-path" 
          />
          {/* Trail: Forest of Safety (760, 260) -> Haven of Dignity (720, 494) */}
          <path 
            d="M 760,260 C 790,340 760,420 720,494" 
            className="world-trail-path" 
          />
        </svg>

        {/* Interactive Destination Nodes */}
        {WORLDS_DATA.map((world) => (
          <WorldDestination
            key={world.id}
            world={world}
            isSelected={selectedWorld?.id === world.id}
            isHovered={hoveredWorld?.id === world.id}
            onSelect={handleWorldSelect}
            onHover={setHoveredWorld}
            onLeave={() => setHoveredWorld(null)}
          />
        ))}

        {/* Interactive Discoverable Landmarks */}
        {allLandmarks.map((landmark) => (
          <WorldLandmark
            key={landmark.id}
            landmark={landmark}
            onSelect={handleLandmarkSelect}
          />
        ))}

        {/* Mitra Companion in bottom-right corner of Map */}
        <div 
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '24px',
            zIndex: 35
          }}
          className="desktop-mascot-dock"
        >
          <Mascot
            state={mascotState}
            dialogue={mascotDialogue}
            size="md"
            showBubble={true}
            interactive={true}
          />
        </div>
      </div>

      {/* Mobile Expedition Trail List (Shown when switched or on small screens) */}
      {mobileViewMode === 'trail' && (
        <div 
          style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}
        >
          <div style={{ padding: '0 var(--space-2)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.2rem', margin: '0 0 4px 0' }}>
              Expedition Trail — 5 Living Realms
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-secondary)', margin: 0 }}>
              Select any realm to read its story and prepare story quests.
            </p>
          </div>

          {WORLDS_DATA.map((world, idx) => (
            <div
              key={world.id}
              onClick={() => handleWorldSelect(world)}
              className="interactive-card"
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--color-canvas-elevated)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xl)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: world.accentLight,
                    border: `2px solid ${world.accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: world.accentColor,
                    fontWeight: 700,
                    fontFamily: 'var(--font-family-mono)'
                  }}
                >
                  0{idx + 1}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-family-mono)', color: world.accentColor, fontWeight: 700 }}>
                      {world.statutoryArticle}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-ink-muted)' }}>
                      • {world.uncrcPillar}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.05rem', margin: '2px 0' }}>
                    {world.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-secondary)', margin: 0 }}>
                    {world.shortDescription}
                  </p>
                </div>
              </div>

              <ChevronRight size={18} color="var(--color-ink-muted)" />
            </div>
          ))}
        </div>
      )}

      {/* Active Landmark Discovery Lore Sheet */}
      {activeLandmark && (
        <div className="landmark-lore-sheet" role="alert">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={14} color="var(--color-saffron-500)" />
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-saffron-600)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Landmark Uncovered
                </span>
                <span className="badge" style={{ backgroundColor: 'var(--color-canvas-secondary)', fontSize: '0.65rem' }}>
                  {activeLandmark.type}
                </span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.25rem', margin: '0 0 6px 0', color: 'var(--color-ink-primary)' }}>
                {activeLandmark.name}
              </h4>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--color-ink-secondary)', margin: '0 0 10px 0' }}>
                {activeLandmark.lore}
              </p>
              <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-ink-muted)' }}>
                💡 {activeLandmark.hint}
              </div>
            </div>

            <button
              onClick={() => setActiveLandmark(null)}
              className="btn btn-secondary"
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
              aria-label="Dismiss landmark note"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Realm Deep-Dive Detail Modal */}
      {selectedWorld && (
        <WorldDetailModal
          world={selectedWorld}
          onClose={() => setSelectedWorld(null)}
          onSelectMission={(mission) => {
            setSelectedWorld(null);
            if (onOpenMission) onOpenMission(mission);
          }}
        />
      )}
    </div>
  );
}

