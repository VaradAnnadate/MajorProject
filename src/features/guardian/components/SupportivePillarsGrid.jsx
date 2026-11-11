import React from 'react';
import styles from './SupportivePillarsGrid.module.css';

const PILLARS = [
  {
    icon: '⏳',
    title: 'Zero Streak Penalties',
    description: 'We believe learning should never feel punitive. Missing a day never wipes out achievements or deducts wisdom XP.',
  },
  {
    icon: '🛑',
    title: 'No Infinite Feeds or Dark Patterns',
    description: 'Every chapter has an intentional concluding point and reflection pause. We never employ dopamine-trapping infinite scrolls.',
  },
  {
    icon: '🛡️',
    title: 'DPDP Act 2023 §9 Compliance',
    description: 'Zero tracking of child PII. No child profiles are monetized, shared with data brokers, or used for behavioral profiling.',
  },
  {
    icon: '📶',
    title: 'Designed for Offline Resilience',
    description: 'Content loads swiftly and caches locally, ensuring uninterrupted educational access even on slow or intermittent home networks.',
  },
];

export function SupportivePillarsGrid() {
  return (
    <section className={styles.section} aria-labelledby="supportive-pillars-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Ethical Technology Guarantees</span>
        <h2 id="supportive-pillars-title" className={styles.title}>
          Built with Respect for Childhood & Family Life
        </h2>
        <p className={styles.subtitle}>
          How RightsQuest India differs fundamentally from commercial gaming and ad-supported educational platforms.
        </p>
      </div>

      <div className={styles.grid}>
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className={styles.card}>
            <div className={styles.icon}>{pillar.icon}</div>
            <h3 className={styles.cardTitle}>{pillar.title}</h3>
            <p className={styles.cardDesc}>{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

