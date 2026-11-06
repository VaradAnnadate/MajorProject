import React from 'react';
import Mascot from '../../mascot/components/Mascot';
import styles from './ExplorerProfile.module.css';

export default function ExplorerProfile({
  persona,
  ageBand,
  level,
  unlockedBadgeCount = 0,
  totalBadgeCount = 12,
  missionsCount = 0,
}) {
  const mascotState =
    level?.levelNumber >= 5
      ? 'celebrating'
      : level?.levelNumber >= 3
      ? 'encouraging'
      : 'curious';

  return (
    <div className={styles.root} role="region" aria-label="Explorer Identity Dossier">
      <div className={styles.mascotCol}>
        <div className={styles.mascotAnchor}>
          <Mascot size="sm" state={mascotState} interactive={false} showBubble={false} />
        </div>
      </div>

      <div className={styles.infoCol}>
        <div className={styles.tierPills}>
          <span
            className={styles.ageBandPill}
            style={{
              borderColor: ageBand?.accentBorder || 'rgba(222, 114, 21, 0.4)',
              backgroundColor: ageBand?.accentBg || 'rgba(222, 114, 21, 0.1)',
              color: ageBand?.accentColor || 'var(--color-saffron-500)',
            }}
          >
            {ageBand?.title || 'Young Explorer'} · {ageBand?.range || '8–16 years'}
          </span>
          <span className={styles.statusPill}>● LOCAL RECOGNITION DOSSIER</span>
        </div>

        <h1 className={styles.codename}>
          {persona?.symbol || '🧭'} {persona?.codename || 'Curious Navigator'}
        </h1>
        <p className={styles.tagline}>{persona?.tagline || 'Discovering fundamental rights with empathy and courage.'}</p>

        {/* Quick Stats Grid */}
        <div className={styles.statsStrip}>
          <div className={styles.statBox}>
            <span className={styles.statVal}>{unlockedBadgeCount} / {totalBadgeCount}</span>
            <span className={styles.statLabel}>Seals Unlocked</span>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statBox}>
            <span className={styles.statVal}>{missionsCount}</span>
            <span className={styles.statLabel}>Quests Solved</span>
          </div>

          <div className={styles.statDivider} />

          <div className={styles.statBox}>
            <span className={styles.statVal} style={{ color: level?.color || '#DE7215' }}>
              Level {level?.levelNumber || 1}
            </span>
            <span className={styles.statLabel}>{level?.title || 'Explorer'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

