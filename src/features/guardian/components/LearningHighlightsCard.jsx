import React from 'react';
import { useIntelligence } from '../../intelligence/hooks/useIntelligence';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import styles from './LearningHighlightsCard.module.css';

export function LearningHighlightsCard() {
  const { activeAgeBand, activePersona, progression } = useDemoLearner();
  const { aggregateMetrics } = useIntelligence();

  return (
    <section className={styles.card} aria-labelledby="guardian-highlights-title">
      <div className={styles.inner}>
        <div className={styles.profileSection}>
          <div className={styles.avatarCircle}>
            <span className={styles.avatarEmoji}>🦊</span>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.badgeRow}>
              <span className={styles.ageBandPill}>{activeAgeBand?.name || 'Navigators'}</span>
              <span className={styles.ageSpan}>{activeAgeBand?.range || '8–10 yrs'}</span>
            </div>
            <h2 id="guardian-highlights-title" className={styles.personaName}>
              {activePersona?.codename || 'Young Constitutional Explorer'}
            </h2>
            <p className={styles.personaTagline}>
              {activePersona?.tagline || 'Curious, observant, and learning about community dignity.'}
            </p>
          </div>
        </div>

        <div className={styles.statsStrip}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Current Recognition</span>
            <span className={styles.statValue}>Level {progression?.level || 2}</span>
            <span className={styles.statSub}>Story Pathfinder</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Constitutional Wisdom</span>
            <span className={styles.statValue}>{progression?.totalXp || 200} XP</span>
            <span className={styles.statSub}>Earned from thoughtful choices</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Rights Seals Preserved</span>
            <span className={styles.statValue}>
              {progression?.unlockedBadges?.length || 2} <small>/ 13</small>
            </span>
            <span className={styles.statSub}>Core constitutional concepts</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Adventures Completed</span>
            <span className={styles.statValue}>{aggregateMetrics.totalMissionsCompleted}</span>
            <span className={styles.statSub}>Real-world dilemmas navigated</span>
          </div>
        </div>

        <div className={styles.guardianReassurance}>
          <div className={styles.reassuranceIcon}>🌱</div>
          <p className={styles.reassuranceText}>
            <strong>Guardian Guarantee:</strong> RightsQuest never ranks children against each other or uses gamified stress loops. Every milestone reflects your child exploring empathy, human rights, and community dignity.
          </p>
        </div>
      </div>
    </section>
  );
}

