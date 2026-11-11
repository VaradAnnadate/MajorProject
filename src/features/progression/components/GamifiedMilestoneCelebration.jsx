import React, { useEffect, useState, useRef } from 'react';
import styles from './GamifiedMilestoneCelebration.module.css';

/**
 * Realm milestone configuration for gamified celebrations
 */
const REALM_CELEBRATIONS = {
  'village-of-belonging': {
    name: 'Village of Belonging',
    badgeIcon: '🏛️',
    badgeTitle: 'Pillar of Equality',
    article: 'Articles 14 & 15(3) — Right to Equality & Special Provisions',
    quote: 'Every child is born equal under the Constitution of India.',
    colorAccent: '#FF9933',
    tier: 'Civic Navigator',
    bonusXp: 150,
  },
  'gardens-of-growth': {
    name: 'Gardens of Growth',
    badgeIcon: '🏫',
    badgeTitle: 'Sprout of Education',
    article: 'Article 21A & RTE Act 2009 — Right to Free & Compulsory Education',
    quote: 'No boundary, fees, or poverty can shut a classroom door.',
    colorAccent: '#10B981',
    tier: 'Knowledge Seeker',
    bonusXp: 175,
  },
  'forest-of-safety': {
    name: 'Forest of Safety',
    badgeIcon: '🛡️',
    badgeTitle: 'Shield of Sanctuary',
    article: 'POCSO Act 2012 & DPDP Act 2023 §9 — Personal Boundaries & Privacy',
    quote: 'Your body, personal boundary, and digital privacy belong to you alone.',
    colorAccent: '#3B82F6',
    tier: 'Sanctuary Guardian',
    bonusXp: 200,
  },
  'river-of-voices': {
    name: 'River of Voices',
    badgeIcon: '🛶',
    badgeTitle: 'Beacon of Expression',
    article: 'UNCRC Article 12 & Article 19(1)(a) — Child’s Right to be Heard',
    quote: 'Children are active citizens whose voices shape the school and nation.',
    colorAccent: '#06B6D4',
    tier: 'Voice Advocate',
    bonusXp: 225,
  },
  'haven-of-dignity': {
    name: 'Haven of Dignity',
    badgeIcon: '⚖️',
    badgeTitle: 'Crest of Sovereignty',
    article: 'Article 24 & Child Labour (Prohibition) Act — Abolition of Exploitation',
    quote: 'Childhood is sacred: no hazardous furnace or brickyard can steal youth.',
    colorAccent: '#8B5CF6',
    tier: 'Constitutional Sentinel',
    bonusXp: 250,
  },
};

/**
 * Play a gamified triumph chime using Web Audio API
 */
function playTriumphChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    // Uplifting major triad arpeggio: C5, E5, G5, C6
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.35 },
      { freq: 659.25, time: 0.12, dur: 0.35 },
      { freq: 783.99, time: 0.24, dur: 0.40 },
      { freq: 1046.50, time: 0.36, dur: 0.70 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur + 0.05);
    });

    setTimeout(() => {
      try { ctx.close(); } catch (_) {}
    }, 1500);
  } catch (_) {
    // Silent fail if audio is blocked
  }
}

/**
 * GamifiedMilestoneCelebration
 * High-vibe, gamified celebration modal for level progression, realm unlock, and mission completion
 */
export function GamifiedMilestoneCelebration({
  worldId = 'village-of-belonging',
  scenarioTitle,
  earnedXp = 150,
  onClose,
  onContinue,
}) {
  const data = REALM_CELEBRATIONS[worldId] || REALM_CELEBRATIONS['village-of-belonging'];
  const [xpDisplay, setXpDisplay] = useState(0);
  const [stars, setStars] = useState([]);
  const modalRef = useRef(null);

  // Triumph sound and particle generation
  useEffect(() => {
    playTriumphChime();

    // Generate celebratory confetti particles
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 0.6}s`,
      duration: `${1.2 + Math.random() * 1.2}s`,
      size: `${12 + Math.random() * 14}px`,
      color: ['#FF9933', '#10B981', '#38BDF8', '#F59E0B', '#EC4899', '#A855F7'][i % 6],
    }));
    setStars(generated);

    // Animated XP counter
    const targetXp = earnedXp || data.bonusXp;
    const duration = 1000;
    const steps = 30;
    const increment = targetXp / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetXp) {
        setXpDisplay(targetXp);
        clearInterval(timer);
      } else {
        setXpDisplay(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [worldId, earnedXp, data.bonusXp]);

  const handleAction = () => {
    if (onContinue) onContinue();
    else if (onClose) onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Realm Milestone Achieved">
      {/* Celebratory floating particles */}
      <div className={styles.particlesContainer} aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className={styles.particle}
            style={{
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
              fontSize: s.size,
              color: s.color,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className={styles.modal} ref={modalRef} style={{ '--realm-accent': data.colorAccent }}>
        <div className={styles.glowAura} aria-hidden="true" />

        {/* Milestone Header Badge */}
        <div className={styles.badgeShowcase}>
          <div className={styles.badgeRing}>
            <span className={styles.badgeIcon} aria-hidden="true">{data.badgeIcon}</span>
          </div>
          <span className={styles.badgeTierPill}>{data.tier}</span>
        </div>

        {/* Celebratory Titles */}
        <div className={styles.headingSection}>
          <span className={styles.celebrateEyebrow}>✨ REALM MILESTONE UNLOCKED ✨</span>
          <h2 className={styles.celebrateTitle}>{data.name}</h2>
          <p className={styles.badgeName}>{data.badgeTitle}</p>
        </div>

        {/* Gamified Rewards Card */}
        <div className={styles.rewardCard}>
          <div className={styles.xpRow}>
            <div className={styles.xpLabelGroup}>
              <span className={styles.xpIcon}>⚡</span>
              <span className={styles.xpText}>Civic Wisdom XP Earned</span>
            </div>
            <span className={styles.xpCounter}>+{xpDisplay} XP</span>
          </div>

          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBarFill} />
          </div>

          <div className={styles.constitutionalCard}>
            <div className={styles.articleTag}>
              <span className={styles.shieldIcon}>🛡️</span>
              <span>{data.article}</span>
            </div>
            <p className={styles.wisdomQuote}>"{data.quote}"</p>
          </div>
        </div>

        {scenarioTitle && (
          <p className={styles.scenarioContext}>
            Completed Mission: <strong>{scenarioTitle}</strong>
          </p>
        )}

        {/* Gamified Action Buttons */}
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.primaryClaimBtn}
            onClick={handleAction}
          >
            <span>Claim Rewards & Continue Journey 🚀</span>
          </button>
          {onClose && (
            <button
              type="button"
              className={styles.secondaryCloseBtn}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamifiedMilestoneCelebration;

