/**
 * MascotGuide — Floating Mitra companion docked to bottom-right during gameplay.
 * Renders different expressions per mascotState, speech bubble for Mitra dialogue lines,
 * smooth CSS state transition animations.
 */
import React, { useState, useEffect } from 'react';
import styles from './MascotGuide.module.css';

// State → visual config
const STATE_CONFIG = {
  idle: { glowColor: 'rgba(222,114,21,0.3)', eyeType: 'open', earAngle: 0, tailGlow: 0.3 },
  curious: { glowColor: 'rgba(222,114,21,0.5)', eyeType: 'wide', earAngle: 8, tailGlow: 0.5 },
  happy: { glowColor: 'rgba(41,118,82,0.5)', eyeType: 'squint', earAngle: 10, tailGlow: 0.7 },
  thinking: { glowColor: 'rgba(27,109,128,0.4)', eyeType: 'halfclosed', earAngle: -5, tailGlow: 0.3 },
  concerned: { glowColor: 'rgba(208,79,54,0.4)', eyeType: 'sad', earAngle: -10, tailGlow: 0.2 },
  explaining: { glowColor: 'rgba(222,114,21,0.55)', eyeType: 'focused', earAngle: 5, tailGlow: 0.6 },
  discovering: { glowColor: 'rgba(245,166,35,0.6)', eyeType: 'wide', earAngle: 15, tailGlow: 0.9 },
  celebrating: { glowColor: 'rgba(41,118,82,0.7)', eyeType: 'star', earAngle: 12, tailGlow: 1.0 },
  encouraging: { glowColor: 'rgba(222,114,21,0.4)', eyeType: 'warm', earAngle: 3, tailGlow: 0.4 },
};

function MitraFaceSVG({ mascotState, isWinking }) {
  const cfg = STATE_CONFIG[mascotState] || STATE_CONFIG.idle;

  // Eye rendering
  const renderEyes = () => {
    switch (cfg.eyeType) {
      case 'squint':
        return (
          <>
            <path d="M73 88 Q80 83 87 88" stroke="#151A26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M113 88 Q120 83 127 88" stroke="#151A26" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'wide':
        return (
          <>
            <ellipse cx="80" cy="90" rx="9" ry="10" fill="#151A26" />
            <ellipse cx="120" cy="90" rx="9" ry="10" fill="#151A26" />
            <circle cx="82" cy="87" r="3" fill="white" />
            <circle cx="122" cy="87" r="3" fill="white" />
          </>
        );
      case 'star':
        return (
          <>
            <text x="68" y="97" fontSize="18" fill="#DE7215">★</text>
            <text x="108" y="97" fontSize="18" fill="#DE7215">★</text>
          </>
        );
      case 'sad':
        return (
          <>
            <ellipse cx="80" cy="90" rx="8" ry="8.5" fill="#151A26" />
            <ellipse cx="120" cy="90" rx="8" ry="8.5" fill="#151A26" />
            <circle cx="82" cy="88" r="2.5" fill="white" />
            <circle cx="122" cy="88" r="2.5" fill="white" />
            {/* Worried brow lines */}
            <path d="M72 80 Q80 76 87 80" stroke="#B34C1B" strokeWidth="2" fill="none" />
            <path d="M113 80 Q120 76 127 80" stroke="#B34C1B" strokeWidth="2" fill="none" />
          </>
        );
      case 'halfclosed':
        return (
          <>
            <ellipse cx="80" cy="91" rx="8" ry="6" fill="#151A26" />
            <ellipse cx="120" cy="91" rx="8" ry="6" fill="#151A26" />
            <line x1="72" y1="88" x2="88" y2="88" stroke="#151A26" strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="88" x2="128" y2="88" stroke="#151A26" strokeWidth="3" strokeLinecap="round" />
          </>
        );
      case 'warm':
        return (
          <>
            <ellipse cx="80" cy="90" rx="8" ry="8" fill="#151A26" />
            <ellipse cx="120" cy="90" rx="8" ry="8" fill="#151A26" />
            <circle cx="82" cy="88" r="2.8" fill="white" />
            <circle cx="122" cy="88" r="2.8" fill="white" />
            <path d="M72 97 Q80 102 88 97" stroke="#B34C1B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M112 97 Q120 102 128 97" stroke="#B34C1B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </>
        );
      default: // open / focused
        return (
          <>
            {isWinking ? (
              <line x1="72" y1="90" x2="88" y2="90" stroke="#151A26" strokeWidth="3" strokeLinecap="round" />
            ) : (
              <>
                <ellipse cx="80" cy="90" rx="8" ry="8.5" fill="#151A26" />
                <circle cx="82" cy="88" r="2.5" fill="white" />
              </>
            )}
            <ellipse cx="120" cy="90" rx="8" ry="8.5" fill="#151A26" />
            <circle cx="122" cy="88" r="2.5" fill="white" />
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <defs>
        <radialGradient id="mgLantern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2A3" stopOpacity="1" />
          <stop offset="60%" stopColor="#DE7215" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#DE7215" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mgFur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F28B36" />
          <stop offset="60%" stopColor="#DE7215" />
          <stop offset="100%" stopColor="#B34C1B" />
        </linearGradient>
      </defs>

      {/* Ambient glow halo */}
      <circle cx="100" cy="110" r="85" fill={cfg.glowColor} style={{ filter: 'blur(28px)' }} />

      {/* Ears */}
      <g style={{ transform: `rotate(${cfg.earAngle}deg)`, transformOrigin: '100px 60px', transition: 'transform 0.4s ease' }}>
        <polygon points="52,80 65,38 82,76" fill="url(#mgFur)" />
        <polygon points="148,80 135,38 118,76" fill="url(#mgFur)" />
        <polygon points="58,76 65,50 76,74" fill="#F5B08B" opacity="0.7" />
        <polygon points="142,76 135,50 124,74" fill="#F5B08B" opacity="0.7" />
      </g>

      {/* Body / head */}
      <ellipse cx="100" cy="108" rx="58" ry="62" fill="url(#mgFur)" />

      {/* Chest patch */}
      <ellipse cx="100" cy="124" rx="32" ry="30" fill="#FBF4E4" />

      {/* Eyes */}
      {renderEyes()}

      {/* Nose */}
      <ellipse cx="100" cy="108" rx="6" ry="4.5" fill="#B34C1B" />

      {/* Mouth */}
      {cfg.eyeType === 'squint' || cfg.eyeType === 'star' || cfg.eyeType === 'warm'
        ? <path d="M88 118 Q100 126 112 118" stroke="#B34C1B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        : cfg.eyeType === 'sad'
        ? <path d="M88 122 Q100 118 112 122" stroke="#B34C1B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        : <path d="M90 118 Q100 124 110 118" stroke="#B34C1B" strokeWidth="2" fill="none" strokeLinecap="round" />
      }

      {/* Lantern tail tip */}
      <ellipse
        cx="156"
        cy="148"
        rx="12"
        ry="12"
        fill="url(#mgLantern)"
        opacity={cfg.tailGlow}
        style={{ transition: 'opacity 0.4s ease' }}
      />
      <circle cx="156" cy="148" r="5" fill="#FFF2A3" opacity="0.9" />
    </svg>
  );
}

export default function MascotGuide({ mascotState = 'idle', dialogue = null, isMitraSpeaking = false }) {
  const [isWinking, setIsWinking] = useState(false);
  const [displayState, setDisplayState] = useState(mascotState);

  // Animate state change
  useEffect(() => {
    setDisplayState(mascotState);
  }, [mascotState]);

  // Natural blink
  useEffect(() => {
    const id = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 220);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const isConcerned = mascotState === 'concerned';

  return (
    <div className={`${styles.root} ${styles[`state_${displayState}`]}`} aria-label="Mitra companion">
      {/* Speech bubble — shown when mitra is speaker */}
      {isMitraSpeaking && dialogue && (
        <div className={styles.bubble} role="status" aria-live="polite">
          <p className={styles.bubbleText}>{dialogue}</p>
          <div className={styles.bubbleTail} aria-hidden="true" />
        </div>
      )}

      {/* Mascot avatar */}
      <div className={`${styles.avatar} ${isConcerned ? styles.concern : ''}`}>
        <MitraFaceSVG mascotState={displayState} isWinking={isWinking} />
      </div>

      {/* State label */}
      <span className={styles.stateLabel} aria-hidden="true">{displayState}</span>
    </div>
  );
}

