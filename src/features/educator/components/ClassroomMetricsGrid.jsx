import React from 'react';
import { useIntelligence } from '../../intelligence/hooks/useIntelligence';
import styles from './ClassroomMetricsGrid.module.css';

export function ClassroomMetricsGrid() {
  const { aggregateMetrics } = useIntelligence();

  const cards = [
    {
      id: 'xp',
      label: 'Cohort Wisdom Generated',
      value: `${aggregateMetrics.totalXp} XP`,
      detail: 'Earned through collaborative ethical dilemmas & rights discovery',
      icon: '✨',
      tone: 'saffron',
    },
    {
      id: 'missions',
      label: 'Classroom Missions Solved',
      value: aggregateMetrics.totalMissionsCompleted,
      detail: 'Real-world story adventures completed by learners',
      icon: '📜',
      tone: 'navy',
    },
    {
      id: 'badges',
      label: 'Constitutional Seals Unlocked',
      value: aggregateMetrics.unlockedBadgesCount,
      detail: 'Core articles preserved in Rights Passports',
      icon: '🏛️',
      tone: 'emerald',
    },
    {
      id: 'sessions',
      label: 'Consensus Quests Facilitated',
      value: aggregateMetrics.activeSessionsCount,
      detail: 'Live classroom debriefs with zero individual scorecards',
      icon: '🤝',
      tone: 'purple',
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="classroom-metrics-title">
      <div className={styles.headerRow}>
        <div>
          <span className={styles.sectionEyebrow}>Cohort Collective Intelligence</span>
          <h2 id="classroom-metrics-title" className={styles.sectionTitle}>
            Classroom Rights Engagement
          </h2>
        </div>
        <div className={styles.privacyNote}>
          <span className={styles.privacyIcon} aria-hidden="true">🔒</span>
          <span>DPDP §9 Compliant: Aggregates Only — Zero Individual Child Tracking</span>
        </div>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.id} className={`${styles.card} ${styles[card.tone]}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <span className={styles.cardLabel}>{card.label}</span>
            </div>
            <div className={styles.cardValue}>{card.value}</div>
            <p className={styles.cardDetail}>{card.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

