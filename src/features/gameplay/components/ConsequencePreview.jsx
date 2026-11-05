/**
 * ConsequencePreview — Consequence panel that slides up after a choice.
 * Green for empathetic choices, terracotta for learning moments.
 * Includes Mitra reaction and "Understand & Continue" button.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConsequencePreview.module.css';

// Mini inline Mitra face for the consequence panel
function MiniMitraFace({ reaction }) {
  const faceColor = reaction === 'happy' ? '#DE7215' : reaction === 'concerned' ? '#D04F36' : '#F28B36';
  // Eye shape by reaction
  const eyeShape =
    reaction === 'happy'
      ? <><path d="M12 17 Q14 15 16 17" stroke="#151A26" strokeWidth="1.5" fill="none" strokeLinecap="round" /><path d="M20 17 Q22 15 24 17" stroke="#151A26" strokeWidth="1.5" fill="none" strokeLinecap="round" /></>
      : reaction === 'concerned'
      ? <><ellipse cx="14" cy="17" rx="2" ry="2.2" fill="#151A26" /><ellipse cx="22" cy="17" rx="2" ry="2.2" fill="#151A26" /></>
      : <><circle cx="14" cy="17" r="2" fill="#151A26" /><circle cx="22" cy="17" r="2" fill="#151A26" /></>;

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className={styles.mitraFace}>
      <circle cx="18" cy="18" r="17" fill={faceColor} />
      <polygon points="8,14 13,6 16,14" fill={faceColor === '#DE7215' ? '#B34C1B' : faceColor} />
      <polygon points="28,14 23,6 20,14" fill={faceColor === '#DE7215' ? '#B34C1B' : faceColor} />
      <ellipse cx="18" cy="21" rx="5" ry="4" fill="#FBF4E4" />
      {eyeShape}
      <ellipse cx="18" cy="22.5" rx="1.2" ry="0.8" fill="#B34C1B" />
      {reaction === 'happy' && <path d="M14 24 Q18 27 22 24" stroke="#B34C1B" strokeWidth="1.3" fill="none" strokeLinecap="round" />}
    </svg>
  );
}

export default function ConsequencePreview({ choice, visible, onContinue }) {
  if (!choice) return null;

  const isPositive = choice.isEmpathetic;
  const reaction = choice.mascotReaction || (isPositive ? 'happy' : 'concerned');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`${styles.root} ${isPositive ? styles.positive : styles.learning}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label="Consequence of your choice"
          aria-live="polite"
        >
          <div className={styles.inner}>
            {/* Header */}
            <div className={styles.header}>
              <MiniMitraFace reaction={reaction} />
              <div className={styles.headerText}>
                <span className={styles.headerLabel}>
                  {isPositive ? '✦ Empathetic Choice' : '◈ Learning Moment'}
                </span>
                <span className={styles.xpBadge}>+{choice.xpGain ?? 0} XP</span>
              </div>
            </div>

            {/* Consequence text */}
            <div className={styles.heading}>This choice leads to...</div>
            <p className={styles.text}>{choice.consequenceText}</p>

            {/* CTA */}
            <button className={styles.cta} onClick={onContinue} aria-label="Understand and continue">
              Understand & Continue
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

