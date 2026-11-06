import React from 'react';
import styles from './LevelProgress.module.css';

export default function LevelProgress({ level }) {
  if (!level) return null;

  const {
    levelNumber,
    title,
    symbol,
    color,
    tagline,
    milestoneQuote,
    perk,
    progressPercent,
    xpIntoCurrent,
    xpNeededForNext,
    isMaxLevel,
    nextLevelTitle,
    nextLevelSymbol,
  } = level;

  return (
    <div className={styles.root} role="region" aria-label="Level Progress">
      <div className={styles.header}>
        <div className={styles.badgeCol}>
          <div
            className={styles.levelBadge}
            style={{ borderColor: color, backgroundColor: `${color}18` }}
          >
            <span className={styles.levelSymbol}>{symbol}</span>
            <span className={styles.levelNum}>LVL {levelNumber}</span>
          </div>
        </div>

        <div className={styles.titleCol}>
          <div className={styles.levelEyebrow}>CURRENT RECOGNITION TIER</div>
          <h2 className={styles.levelTitle} style={{ color }}>{title}</h2>
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </div>

      {/* Progress Track */}
      <div className={styles.trackWrap}>
        <div className={styles.trackLabels}>
          <span className={styles.trackCurrent}>
            {isMaxLevel ? 'Summit Mastered' : `${xpIntoCurrent} XP into tier`}
          </span>
          <span className={styles.trackNext}>
            {isMaxLevel
              ? 'Maximum Recognition'
              : `${xpNeededForNext} XP to Level ${levelNumber + 1} (${nextLevelTitle})`}
          </span>
        </div>

        <div className={styles.barTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div
            className={styles.barFill}
            style={{
              width: `${progressPercent}%`,
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}80`,
            }}
          />
        </div>
      </div>

      {/* Milestone Perk & Philosophical Quote */}
      <div className={styles.footerRow}>
        <div className={styles.perkBox}>
          <span className={styles.perkLabel}>TIER PERK:</span>
          <span className={styles.perkText}>{perk}</span>
        </div>
        <p className={styles.quote}>"{milestoneQuote}"</p>
      </div>
    </div>
  );
}

