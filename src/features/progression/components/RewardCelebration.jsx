import React, { useEffect } from 'react';
import styles from './RewardCelebration.module.css';

export default function RewardCelebration({ lastAwardEvent, onDismiss }) {
  useEffect(() => {
    if (!lastAwardEvent) return;
    const timer = setTimeout(() => {
      // Auto-dismiss after 8 seconds if not dismissed
      if (onDismiss) onDismiss();
    }, 8000);
    return () => clearTimeout(timer);
  }, [lastAwardEvent, onDismiss]);

  if (!lastAwardEvent) return null;

  const { transaction, levelUp, newBadges } = lastAwardEvent;
  const hasBadges = Array.isArray(newBadges) && newBadges.length > 0;

  if (!levelUp && !hasBadges) return null;

  return (
    <div
      className={styles.banner}
      role="alert"
      aria-live="polite"
      onClick={onDismiss}
    >
      <div className={styles.innerCard} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle} aria-hidden="true">
          {levelUp ? '🌟' : '🎖️'}
        </div>

        <div className={styles.textCol}>
          <div className={styles.eyebrow}>
            {levelUp ? 'NEW CONSTITUTIONAL RECOGNITION TIER REACHED!' : 'NEW TREASURE UNLOCKED!'}
          </div>

          <h3 className={styles.title}>
            {levelUp
              ? `Congratulations! You are now a ${transaction?.metadata?.levelTitle || 'Guardian'}!`
              : newBadges.map((b) => b.name).join(' & ')}
          </h3>

          <p className={styles.subtext}>
            +{transaction?.amount || 0} Points awarded to your local Rights Passport.
          </p>
        </div>

        <button
          className={styles.dismissBtn}
          onClick={onDismiss}
          aria-label="Dismiss celebration"
        >
          View Passport ›
        </button>
      </div>
    </div>
  );
}

