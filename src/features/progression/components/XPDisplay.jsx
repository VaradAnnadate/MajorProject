import React from 'react';
import styles from './XPDisplay.module.css';

export default function XPDisplay({ totalXp, level, streakCount = 1 }) {
  return (
    <div className={styles.root} role="region" aria-label="Explorer XP Summary">
      <div className={styles.haloGlow} aria-hidden="true" />
      <div className={styles.xpCard}>
        <div className={styles.topRow}>
          <span className={styles.eyebrow}>CONSTITUTIONAL WISDOM</span>
          <span className={styles.streakPill} title="Learning consistency streak">
            🔥 {streakCount} {streakCount === 1 ? 'Day Explorer' : 'Days Active'}
          </span>
        </div>

        <div className={styles.amountRow}>
          <span className={styles.sparkleIcon} aria-hidden="true">✨</span>
          <span className={styles.amount}>{totalXp.toLocaleString()}</span>
          <span className={styles.unit}>Points</span>
        </div>

        <div className={styles.subtext}>
          Current Rank: <strong style={{ color: level.color || 'var(--color-saffron-500)' }}>{level.title}</strong>
        </div>
      </div>
    </div>
  );
}

