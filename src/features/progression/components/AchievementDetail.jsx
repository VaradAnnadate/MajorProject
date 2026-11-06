import React, { useEffect } from 'react';
import styles from './AchievementDetail.module.css';

export default function AchievementDetail({ badge, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!badge) return null;

  const isUnlocked = badge.unlocked;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="badgeDetailTitle"
      onClick={onClose}
    >
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close badge inspection"
        >
          ✕
        </button>

        {/* Large Tactile Medallion */}
        <div className={styles.medallionHero}>
          <div
            className={`${styles.largeMedallion} ${isUnlocked ? styles.medallionGlow : ''}`}
            style={{
              borderColor: isUnlocked ? badge.color : 'rgba(255, 255, 255, 0.2)',
              backgroundColor: isUnlocked ? badge.bg : 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <span className={styles.largeSymbol}>{badge.symbol}</span>
          </div>
        </div>

        <div className={styles.categoryPill} style={{ color: badge.color }}>
          {badge.categoryLabel} Artifact · {badge.tagline}
        </div>

        <h2 id="badgeDetailTitle" className={styles.badgeTitle}>
          {badge.name}
        </h2>

        <div className={styles.constitutionalRef}>
          <span className={styles.lawIcon} aria-hidden="true">⚖️</span>
          <span>{badge.constitutionalArticle}</span>
        </div>

        <p className={styles.fullDescription}>{badge.description}</p>

        {/* Learning Outcome Box */}
        <div className={styles.outcomeBox}>
          <div className={styles.outcomeHeader}>CIVIC & EMOTIONAL INSIGHT</div>
          <p className={styles.outcomeText}>{badge.learningOutcome}</p>
        </div>

        {/* Status Strip */}
        <div className={styles.statusSection}>
          <div className={styles.statusRow}>
            <span className={styles.statusLabel}>Passport Status:</span>
            <span className={isUnlocked ? styles.statusUnlocked : styles.statusLocked}>
              {isUnlocked ? '✓ Unlocked & Recorded' : '🔒 Locked Discovery'}
            </span>
          </div>
          {isUnlocked && badge.unlockedAt && (
            <div className={styles.timestampRow}>
              <span className={styles.timestampLabel}>Discovered:</span>
              <span className={styles.timestampVal}>
                {new Date(badge.unlockedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>

        <button className={styles.returnBtn} onClick={onClose} autoFocus>
          Return to Treasure Cabinet
        </button>
      </div>
    </div>
  );
}

