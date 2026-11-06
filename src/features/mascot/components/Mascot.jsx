import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';
import { MASCOT_STATES } from '../data/mascotStates';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import '../../../styles/mascot.css';

/**
 * Mitra the Guardian Companion — Animated Character Component
 * Renders an original illustrated vector character with dynamic facial expressions,
 * lantern tail glow, interactive dialogue bubbles, and emotional attunement.
 */
export default function Mascot({ 
  state = 'idle', 
  dialogue = null, 
  size = 'md', // 'sm', 'md', 'lg', 'hero'
  showBubble = true,
  interactive = true,
  onStateChange = null,
  className = ''
}) {
  const { activeAgeBand } = useDemoLearner();
  const [currentState, setCurrentState] = useState(state);
  const [isWinking, setIsWinking] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(showBubble);

  useEffect(() => {
    setBubbleOpen(showBubble);
  }, [showBubble]);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  // Periodic natural companion blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 240);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  const stateData = MASCOT_STATES[currentState] || MASCOT_STATES.idle;
  const currentDialogue = dialogue || 
    (activeAgeBand && stateData.dialoguesByAge?.[activeAgeBand.id]) || 
    stateData.defaultDialogue;

  const handleNextState = () => {
    if (!interactive) return;
    const states = Object.keys(MASCOT_STATES);
    const currentIndex = states.indexOf(currentState);
    const nextState = states[(currentIndex + 1) % states.length];
    setCurrentState(nextState);
    if (onStateChange) onStateChange(nextState);
  };

  // Dimensional sizes
  const dimensions = {
    sm: { width: 90, height: 90, scale: 0.65 },
    md: { width: 140, height: 140, scale: 0.95 },
    lg: { width: 190, height: 190, scale: 1.25 },
    hero: { width: 260, height: 260, scale: 1.6 }
  }[size] || { width: 140, height: 140, scale: 0.95 };

  return (
    <div 
      className={`mitra-mascot-container size-${size} state-${currentState} ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Interactive Speech Bubble */}
      {showBubble && bubbleOpen && (
        <div 
          className="mitra-speech-bubble"
          role="status"
          aria-live="polite"
        >
          <div className="mitra-bubble-header">
            <span className="mitra-name-tag">
              <Sparkles size={12} className="mitra-sparkle-icon" />
              Mitra · Companion
            </span>
            <span className="mitra-mood-pill">
              {stateData.label}
            </span>
          </div>
          <p className="mitra-bubble-text">
            "{currentDialogue}"
          </p>
          <div className="mitra-bubble-arrow" />
        </div>
      )}

      {/* Illustrated SVG Character */}
      <div 
        className="mitra-avatar-wrap"
        onClick={handleNextState}
        title={interactive ? "Click Mitra to explore companion expressions!" : "Mitra your Guide"}
        style={{
          cursor: interactive ? 'pointer' : 'default',
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: 'relative'
        }}
        role="img"
        aria-label={`Mitra the Sun-Fox Mascot in ${stateData.label} state`}
      >
        <svg 
          viewBox="0 0 200 200" 
          width="100%" 
          height="100%" 
          className="mitra-svg"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Luminous Lantern Gradient */}
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" stopOpacity="1" />
              <stop offset="45%" stopColor="#FFB834" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#DE7215" stopOpacity="0" />
            </radialGradient>
            
            {/* Fur Depth Gradients */}
            <linearGradient id="terracottaFur" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F28B36" />
              <stop offset="60%" stopColor="#DE7215" />
              <stop offset="100%" stopColor="#B34C1B" />
            </linearGradient>

            <linearGradient id="chestParchment" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FBF4E4" />
            </linearGradient>

            {/* Ambient Shadow */}
            <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(21, 26, 38, 0.28)" />
              <stop offset="100%" stopColor="rgba(21, 26, 38, 0)" />
            </radialGradient>
          </defs>

          {/* Ground Contact Shadow */}
          <ellipse cx="100" cy="184" rx="55" ry="10" fill="url(#groundShadow)" />

          {/* Bushy Arched Fox Tail with Lantern Tip */}
          <g className="mitra-tail-group">
            {/* Tail Body */}
            <path 
              d="M 68 142 C 40 155 12 120 22 85 C 28 65 52 58 64 74 C 75 90 74 125 68 142 Z" 
              fill="url(#terracottaFur)" 
            />
            {/* Tail Fluff Highlight */}
            <path 
              d="M 28 78 C 36 68 50 64 58 76 C 48 88 38 98 28 78 Z" 
              fill="url(#chestParchment)" 
              opacity="0.95" 
            />

            {/* Glowing Lantern Jewel at Tail Tip */}
            <circle cx="24" cy="74" r="22" fill="url(#lanternGlow)" className="mitra-lantern-pulse" />
            <circle cx="24" cy="74" r="7" fill="#FFFBE6" stroke="#DE7215" strokeWidth="1.5" />
            <circle cx="24" cy="74" r="3" fill="#FFFFFF" />
            {/* Sparkle rays */}
            <line x1="24" y1="62" x2="24" y2="58" stroke="#FFE366" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="86" x2="24" y2="90" stroke="#FFE366" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="74" x2="8" y2="74" stroke="#FFE366" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="74" x2="40" y2="74" stroke="#FFE366" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Body & Torso */}
          <path 
            d="M 65 130 C 65 110 80 95 100 95 C 120 95 135 110 135 130 C 135 160 125 175 100 175 C 75 175 65 160 65 130 Z" 
            fill="url(#terracottaFur)" 
          />
          {/* Luminous Chest Fur Bib */}
          <path 
            d="M 82 105 C 92 105 108 105 118 105 C 122 125 114 148 100 156 C 86 148 78 125 82 105 Z" 
            fill="url(#chestParchment)" 
          />

          {/* Paws */}
          <ellipse cx="84" cy="174" rx="10" ry="7" fill="url(#terracottaFur)" stroke="#9E3B10" strokeWidth="1" />
          <ellipse cx="116" cy="174" rx="10" ry="7" fill="url(#terracottaFur)" stroke="#9E3B10" strokeWidth="1" />

          {/* Head & Ears Group */}
          <g className="mitra-head-group">
            {/* Left Ear */}
            <path 
              d="M 66 70 C 52 35 60 15 76 28 C 88 38 90 62 86 74 Z" 
              fill="url(#terracottaFur)" 
              className="mitra-ear-left"
            />
            {/* Left Ear Inner Peach Blush */}
            <path 
              d="M 68 62 C 60 38 66 26 74 34 C 80 42 80 58 78 66 Z" 
              fill="#FDCFB3" 
            />

            {/* Right Ear */}
            <path 
              d="M 134 70 C 148 35 140 15 124 28 C 112 38 110 62 114 74 Z" 
              fill="url(#terracottaFur)" 
              className="mitra-ear-right"
            />
            {/* Right Ear Inner Peach Blush */}
            <path 
              d="M 132 62 C 140 38 134 26 126 34 C 120 42 120 58 122 66 Z" 
              fill="#FDCFB3" 
            />

            {/* Head Silhouette */}
            <ellipse cx="100" cy="74" rx="38" ry="32" fill="url(#terracottaFur)" />
            {/* Cheeks Fluff */}
            <path d="M 64 78 C 54 82 54 94 68 96 C 68 88 64 82 64 78 Z" fill="url(#terracottaFur)" />
            <path d="M 136 78 C 146 82 146 94 132 96 C 132 88 136 78 136 78 Z" fill="url(#terracottaFur)" />

            {/* White Muzzle Cheek Patches */}
            <path 
              d="M 72 74 C 72 64 84 56 100 56 C 116 56 128 64 128 74 C 128 88 116 98 100 98 C 84 98 72 88 72 74 Z" 
              fill="url(#chestParchment)" 
            />

            {/* Forehead Sun Jewel / Star Marking */}
            <path 
              d="M 100 52 L 102 57 L 107 59 L 102 61 L 100 66 L 98 61 L 93 59 L 98 57 Z" 
              fill="#DE7215" 
              opacity="0.9"
            />

            {/* Dynamic Eyes per State */}
            {currentState === 'celebrating' ? (
              // Star Sparkle Eyes
              <g className="mitra-eyes">
                <path d="M 86 66 L 88 72 L 94 74 L 88 76 L 86 82 L 84 76 L 78 74 L 84 72 Z" fill="#151A26" />
                <path d="M 114 66 L 116 72 L 122 74 L 116 76 L 114 82 L 112 76 L 106 74 L 112 72 Z" fill="#151A26" />
              </g>
            ) : currentState === 'happy' || isWinking ? (
              // Happy Arc Eyes (winking or overjoyed)
              <g className="mitra-eyes">
                <path d="M 80 75 C 84 68 92 68 96 75" stroke="#151A26" strokeWidth="3" strokeLinecap="round" />
                <path d="M 104 75 C 108 68 116 68 120 75" stroke="#151A26" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : currentState === 'concerned' ? (
              // Caring, Compassionate Eyes
              <g className="mitra-eyes">
                <ellipse cx="88" cy="74" rx="4.5" ry="5.5" fill="#151A26" />
                <circle cx="86" cy="72" r="1.5" fill="#FFFFFF" />
                <path d="M 82 66 C 86 68 92 67 94 65" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" />

                <ellipse cx="112" cy="74" rx="4.5" ry="5.5" fill="#151A26" />
                <circle cx="110" cy="72" r="1.5" fill="#FFFFFF" />
                <path d="M 106 65 C 108 67 114 68 118 66" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : currentState === 'thinking' ? (
              // Thinking Upward Glance
              <g className="mitra-eyes">
                <ellipse cx="89" cy="71" rx="4.5" ry="5" fill="#151A26" />
                <circle cx="87" cy="69" r="1.5" fill="#FFFFFF" />
                <path d="M 82 66 C 86 64 92 65 94 67" stroke="#151A26" strokeWidth="2" strokeLinecap="round" />

                <ellipse cx="113" cy="71" rx="4.5" ry="5" fill="#151A26" />
                <circle cx="111" cy="69" r="1.5" fill="#FFFFFF" />
                <path d="M 106 67 C 108 65 114 64 118 66" stroke="#151A26" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              // Open Inquisitive Eyes with Catchlight
              <g className="mitra-eyes">
                <ellipse cx="88" cy="73" rx="5" ry="6" fill="#151A26" />
                <circle cx="86.5" cy="70.5" r="2" fill="#FFFFFF" />
                <circle cx="90" cy="75" r="1" fill="#FFFFFF" />

                <ellipse cx="112" cy="73" rx="5" ry="6" fill="#151A26" />
                <circle cx="110.5" cy="70.5" r="2" fill="#FFFFFF" />
                <circle cx="114" cy="75" r="1" fill="#FFFFFF" />
              </g>
            )}

            {/* Little Snout / Nose */}
            <path d="M 97 81 C 98.5 79.5 101.5 79.5 103 81 L 100 84 Z" fill="#4A1806" />

            {/* Mouth */}
            {currentState === 'happy' || currentState === 'celebrating' ? (
              <path d="M 94 86 C 97 91 103 91 106 86" stroke="#4A1806" strokeWidth="2" strokeLinecap="round" fill="#F06A6A" />
            ) : currentState === 'concerned' ? (
              <path d="M 96 87 C 98 85 102 85 104 87" stroke="#4A1806" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M 95 85 C 97 88 103 88 105 85" stroke="#4A1806" strokeWidth="1.8" strokeLinecap="round" />
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="78" cy="79" rx="5" ry="3" fill="#FFA585" opacity="0.6" />
            <ellipse cx="122" cy="79" rx="5" ry="3" fill="#FFA585" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Quick State Toggle for Demo & Testing */}
      {interactive && (
        <div className="mitra-quick-states" aria-label="Mitra emotion switcher">
          {['idle', 'happy', 'curious', 'thinking', 'celebrating', 'concerned'].map((stKey) => (
            <button
              key={stKey}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentState(stKey);
                if (onStateChange) onStateChange(stKey);
              }}
              className={`mitra-state-dot ${currentState === stKey ? 'active' : ''}`}
              title={`Switch expression: ${MASCOT_STATES[stKey].label}`}
              aria-label={MASCOT_STATES[stKey].label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

